@echo off
echo ========================================
echo BetterLife - Import des donnees MySQL
echo ========================================
echo.

cd /d "%~dp0\backend"

echo [INFO] Assurez-vous que XAMPP et MySQL sont demarres
echo.

node import_data.js

echo.
pause
