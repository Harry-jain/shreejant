@echo off
setlocal
set "PATH=%~dp0.node;%PATH%"
if exist "%~dp0.node\node.exe" (
  "%~dp0.node\node.exe" "%~dp0node_modules\next\dist\bin\next" build
) else (
  npx next build
)
