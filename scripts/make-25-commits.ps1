# Run this script to create 25 commits and push to GitHub.
# Prereq: Delete .git/index.lock if it exists, and close any app using the repo.
# Usage: .\scripts\make-25-commits.ps1

Set-Location (Join-Path $PSScriptRoot "..")

$pairs = @(
  @("README.md", "docs: add License section to README"),
  @("ROADMAP.md", "docs: add Last updated to ROADMAP"),
  @("package.json", "chore: add keywords to package.json"),
  @("vite.config.ts", "docs: add comment to vite.config"),
  @("svelte.config.js", "docs: add comment to svelte.config"),
  @("contracts/README.md", "docs: contracts README compile note"),
  @("contracts/BeneCampaign.ergo", "docs: BeneCampaign register comment"),
  @("contracts/BeneRefund.ergo", "docs: BeneRefund placeholder comment"),
  @("src/lib/ergo/wallet.ts", "docs: wallet.ts header comment"),
  @("src/lib/ergo/tokens.ts", "docs: tokens.ts header comment"),
  @("src/lib/ergo/explorer.ts", "docs: explorer.ts header comment"),
  @("src/lib/ergo/index.ts", "docs: ergo index header comment"),
  @("src/lib/referral.ts", "docs: referral.ts header comment"),
  @("src/lib/stores/wallet.ts", "docs: wallet store comment"),
  @("eslint.config.js", "docs: eslint config comment"),
  @("docker-compose.yml", "docs: docker-compose comment"),
  @("Dockerfile", "docs: Dockerfile comment"),
  @(".dockerignore", "docs: dockerignore comment"),
  @(".github/workflows/ci.yml", "docs: CI workflow comment"),
  @(".github/COMMIT_DAILY.md", "docs: COMMIT_DAILY goal note"),
  @("src/app.css", "docs: app.css theme comment"),
  @("CHANGELOG.md", "docs: add CHANGELOG.md"),
  @("CONTRIBUTING.md", "docs: add CONTRIBUTING.md"),
  @(".editorconfig", "chore: add .editorconfig"),
  @("docs/development.md", "docs: add development guide")
)

foreach ($p in $pairs) {
  $f = $p[0]
  $m = $p[1]
  git add $f
  git commit -m $m
  if ($LASTEXITCODE -ne 0) { Write-Host "Failed at $f"; exit 1 }
}

Write-Host "25 commits created. Pushing to origin main..."
git push -u origin main
