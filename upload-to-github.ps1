# Upload Project to GitHub PowerShell Script
$ErrorActionPreference = "Stop"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "          Upload Project to GitHub" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location -Path $PSScriptRoot

# 2. Check / Initialize Git
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Initializing new Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/5] Existing Git repository detected." -ForegroundColor Green
}

# 3. Branch naming
Write-Host "[2/5] Setting branch name to 'main'..." -ForegroundColor Yellow
git branch -M main

# 4. Remote configuration
$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remoteUrl)) {
    Write-Host ""
    Write-Host "[3/5] Configure GitHub Remote URL" -ForegroundColor Yellow
    Write-Host "Step A: Create a repository on GitHub (https://github.com/new)."
    Write-Host "Step B: Copy the repository URL (e.g., https://github.com/username/repo-name.git)."
    Write-Host ""
    $inputUrl = Read-Host "Enter your GitHub repository URL"
    if ([string]::IsNullOrWhiteSpace($inputUrl)) {
        Write-Host "[ERROR] No URL provided. Upload aborted." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    git remote add origin $inputUrl.Trim()
} else {
    Write-Host "[3/5] Current remote origin: $remoteUrl" -ForegroundColor Green
    $change = Read-Host "Do you want to change this URL? (y/N)"
    if ($change -eq 'y' -or $change -eq 'Y') {
        $inputUrl = Read-Host "Enter new GitHub repository URL"
        if (-not [string]::IsNullOrWhiteSpace($inputUrl)) {
            git remote set-url origin $inputUrl.Trim()
        }
    }
}

# 5. Staging & Committing
Write-Host ""
Write-Host "[4/5] Staging files and creating commit..." -ForegroundColor Yellow
$commitMsg = Read-Host "Enter commit message (Press Enter for 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Initial commit"
}

git add .
try {
    git commit -m "$commitMsg"
} catch {
    Write-Host "(No new changes to commit or commit succeeded)" -ForegroundColor Gray
}

# 6. Pushing
Write-Host ""
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host " SUCCESS: Your project has been uploaded to GitHub!" -ForegroundColor Green
    Write-Host "===================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "-------------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "[!] Push failed. If the repository already has commits on GitHub," -ForegroundColor Yellow
    Write-Host "    such as a README or LICENSE file, try pulling first." -ForegroundColor Yellow
    Write-Host "-------------------------------------------------------------" -ForegroundColor Yellow
    $retry = Read-Host "Would you like to pull with rebase and push again? (y/N)"
    if ($retry -eq 'y' -or $retry -eq 'Y') {
        git pull origin main --rebase
        git push -u origin main
    }
}

Write-Host ""
Read-Host "Press Enter to exit"
