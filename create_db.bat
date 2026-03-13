@echo off
echo ========================================
echo CREATION BASE DE DONNEES BetterLife
echo ========================================
echo.

REM Créer la base de données si elle n'existe pas
echo Création de la base betterlife_db...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS betterlife_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %errorlevel% equ 0 (
    echo ✅ Base de données betterlife_db créée avec succès !
    echo.
    echo 🚀 Maintenant vous pouvez :
    echo    1. Ouvrir phpMyAdmin
    echo    2. Sélectionner betterlife_db
    echo    3. Importer migration_script.sql
    echo    4. Démarrer le backend avec start_backend.bat
) else (
    echo ❌ Erreur lors de la création de la base
    echo.
    echo 💡 Vérifications :
    echo    - XAMPP est-il démarré ?
    echo    - MySQL est-il en cours d'exécution ?
    echo    - Les credentials sont-ils corrects ?
    echo.
    echo 🔧 Alternatives :
    echo    - Créer manuellement via phpMyAdmin
    echo    - Vérifier les services XAMPP
)

echo.
pause