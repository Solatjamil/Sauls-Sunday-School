@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo          Upload Project to GitHub
echo ===================================================
echo.

:: Ensure we run inside the script's directory
cd /d "%~dp0"

:: 1. Verify Git is installed
where git >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Initialize Git repository if needed
if not exist ".git" (
    echo [1/5] Initializing new Git repository...
    git init
    if errorlevel 1 (
        echo [ERROR] Failed to initialize Git repository.
        pause
        exit /b 1
    )
) else (
    echo [1/5] Git repository ready.
)

:: 3. Set branch to main
echo [2/5] Setting branch to main...
git branch -M main

:: 4. Configure GitHub remote URL
set "EXISTING_REMOTE="
for /f "tokens=*" %%a in ('git remote get-url origin 2^>nul') do set "EXISTING_REMOTE=%%a"

if not defined EXISTING_REMOTE (
    echo.
    echo [3/5] Configure GitHub Remote URL
    set /p REPO_URL="Enter your GitHub repository URL: "
    if "!REPO_URL!"=="" (
        echo [ERROR] No URL entered. Upload aborted.
        pause
        exit /b 1
    )
    git remote add origin !REPO_URL!
    if errorlevel 1 (
        echo [ERROR] Failed to set remote URL.
        pause
        exit /b 1
    )
    echo [OK] Remote set to !REPO_URL!
) else (
    echo [3/5] Remote origin is currently: !EXISTING_REMOTE!
    set /p CHANGE="Do you want to change this URL? (y/N): "
    if /i "!CHANGE!"=="y" (
        set /p REPO_URL="Enter new GitHub repository URL: "
        if not "!REPO_URL!"=="" (
            git remote set-url origin !REPO_URL!
            echo [OK] Remote updated.
        )
    )
)

:: 5. Stage and commit files
echo.
echo [4/5] Staging files and creating commit...
set /p COMMIT_MSG="Enter commit message (Press Enter for 'Update project files'): "
if "!COMMIT_MSG!"=="" set "COMMIT_MSG=Update project files"

git add .
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo (Working tree clean or no changes to commit)
)

:: 6. Push to GitHub
echo.
echo [5/5] Pushing to GitHub...

:: First try direct push
git push -u origin main
if errorlevel 1 (
    echo.
    echo [NOTICE] Direct push was rejected. This usually happens when the GitHub repo
    echo was created with an initial README or license file.
    echo Attempting to sync and push...
    git pull origin main --rebase --allow-unrelated-histories
    git push -u origin main
)

if errorlevel 1 (
    echo.
    echo ===================================================
    echo  [!] Push could not be completed automatically.
    echo  Common causes:
    echo   - GitHub requires login/credential authorization.
    echo   - Remote repository permissions.
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo  SUCCESS: Your project has been uploaded to GitHub!
    echo ===================================================
)

echo.
pause
