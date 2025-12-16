# Helper script to build the project
# This bypasses issues with special characters in the folder name

Write-Host "Building project..." -ForegroundColor Green
node "./node_modules/vite/bin/vite.js" build
