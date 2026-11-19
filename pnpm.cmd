@echo off
set "PATH=%~dp0.node;%PATH%"
if exist "%~dp0.node\node.exe" (
  "%~dp0.node\node.exe" "%~dp0.node\node_modules\pnpm\bin\pnpm.cjs" %*
) else (
  "%APPDATA%\npm\pnpm.cmd" %*
)
