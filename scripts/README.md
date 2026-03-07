# Scripts

## make-25-commits.ps1

Creates **25 commits** (one per file) and pushes to `origin main`. Use this to get 25 commits on GitHub in one go.

### Before running

1. **Remove the lock file** (if Git says "index.lock exists"):
   ```powershell
   Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue
   ```
2. **Close** any IDE or Git GUI that has the repo open.
3. **Ensure** all 25 files are present (README, ROADMAP, package.json, contracts, src/lib, etc.).

### Run

From the repo root (or from `scripts/` as in the script):

```powershell
.\scripts\make-25-commits.ps1
```

Or from repo root:

```powershell
cd c:\Users\aahil\OneDrive\Documents\ErgoFund-Labs
.\scripts\make-25-commits.ps1
```

You’ll get 25 commits with messages like `docs: add License section to README`, then a push to `origin main`. Check GitHub to see the 25 new commits.
