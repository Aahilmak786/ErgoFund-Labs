# Sync docs/github-wiki/*.md to the GitHub Wiki git repository.
# Prerequisites: Wikis enabled on the repo (Settings > General > Features > Wikis),
# and git push access (HTTPS with credential manager or SSH).
param(
  [string]$WikiRemote = "https://github.com/Aahilmak786/ErgoFund-Labs.wiki.git"
)

$ErrorActionPreference = "Stop"
$startDir = Get-Location
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$wikiSrc = Join-Path $root "docs\github-wiki"
if (-not (Test-Path $wikiSrc)) {
  Write-Error "Missing folder: $wikiSrc"
}

$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("ergofund-wiki-" + [guid]::NewGuid().ToString("N"))
try {
  git clone $WikiRemote $tmp 2>$null
  if ($LASTEXITCODE -ne 0) {
    New-Item -ItemType Directory -Path $tmp | Out-Null
    Set-Location $tmp
    git init
    git branch -M master
    git remote add origin $WikiRemote
    Set-Location $startDir
  }

  Get-ChildItem -Path $wikiSrc -Filter "*.md" | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $tmp $_.Name) -Force
  }

  Set-Location $tmp
  git add -A
  git diff --staged --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Host "No wiki changes to commit."
  } else {
    git commit -m "Sync wiki from docs/github-wiki"
    git push -u origin master
  }
} finally {
  Set-Location $startDir
  if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
}
