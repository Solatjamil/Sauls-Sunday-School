# How to Upload This Project to GitHub

You have two easy ways to upload this project to GitHub:

---

## Option 1: Double-Click the Upload Script (Easiest)

1. Go to [GitHub.com](https://github.com/new) and create a new repository:
   - Give it a name (e.g. `sauls-sunday-school`).
   - **Do not** check "Add a README file" or "Add .gitignore" (the project already has them).
   - Click **Create repository**.
   - Copy the repository URL (e.g. `https://github.com/your-username/sauls-sunday-school.git`).

2. In Windows File Explorer, double-click:
   - [`upload-to-github.bat`](file:///c:/Users/HP/Downloads/Sauls%20Sunday%20School/upload-to-github.bat) (or inside the [`sauls-sunday-school`](file:///c:/Users/HP/Downloads/Sauls%20Sunday%20School/sauls-sunday-school/upload-to-github.bat) folder)

3. When prompted, paste your GitHub repository URL and press **Enter**.
4. The script will automatically initialize Git, stage files, make the commit, and push everything to GitHub!

---

## Option 2: Run Using Git Commands (Terminal)

Open PowerShell or Command Prompt in this folder and run:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Set default branch to main
git branch -M main

# 3. Add all project files
git add .

# 4. Commit files
git commit -m "Initial commit"

# 5. Connect to your GitHub repository (replace with your repository URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```
