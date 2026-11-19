$nodeExe = Join-Path $PSScriptRoot ".node\node.exe"
$pnpmCjs = Join-Path $PSScriptRoot ".node\node_modules\pnpm\bin\pnpm.cjs"
$env:PATH = "$(Join-Path $PSScriptRoot '.node');$env:PATH"
if (Test-Path $nodeExe) {
  & $nodeExe $pnpmCjs @args
} else {
  & "$env:APPDATA\npm\pnpm.ps1" @args
}
