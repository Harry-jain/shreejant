#!/usr/bin/env bash
# SHREEJAN AI SOLUTIONS - Quick Launch Script

echo "=================================================="
echo " Starting SHREEJAN AI SOLUTIONS Development Server"
echo "=================================================="

# Check for node
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check for pnpm or fallback to npm
if command -v pnpm &> /dev/null; then
    echo "Found pnpm. Installing dependencies if needed..."
    pnpm install
    echo "Starting Next.js..."
    pnpm dev
else
    echo "pnpm not found. Using npm..."
    npm install --legacy-peer-deps
    echo "Starting Next.js..."
    npm run dev
fi
