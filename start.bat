@echo off
REM SHREEJAN AI SOLUTIONS - Windows Launch Script
title Shreejan AI Solutions

echo ==================================================
echo  Starting SHREEJAN AI SOLUTIONS Development Server
echo ==================================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not found. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    echo Found pnpm. Installing dependencies if needed...
    call pnpm install
    echo Starting Next.js...
    call pnpm dev
) else (
    echo pnpm not found. Using npm...
    call npm install --legacy-peer-deps
    echo Starting Next.js...
    call npm run dev
)

pause
