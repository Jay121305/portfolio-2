# Helper script to run the development server
# This bypasses issues with special characters in the folder name

Write-Host "Starting Vite development server..." -ForegroundColor Green
node "./node_modules/vite/bin/vite.js"
