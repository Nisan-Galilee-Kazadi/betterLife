@echo off
echo ========================================
echo BetterLife Backend - MySQL Only
echo ========================================
echo.

cd backend

if not exist node_modules (
    echo Installing dependencies...
    npm install mysql2
    echo.
)

REM Créer .env si nécessaire
if not exist .env (
    echo Creating .env file...
    copy ..\env_start.txt .env >nul
    echo.
)

echo Starting BetterLife API Server...
echo.
echo Make sure:
echo - XAMPP is running
echo - betterlife_db exists in MySQL
echo.
echo APIs available at: http://localhost:5000
echo.
echo Translation: DISABLED (will be enabled later)
echo Press Ctrl+C to stop the server
echo.

node index.js

pause