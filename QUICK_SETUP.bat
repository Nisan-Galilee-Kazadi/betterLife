@echo off
echo ========================================
echo BetterLife - SETUP EXPRESS
echo ========================================
echo.

echo Étape 1: Création de la base de données...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS betterlife_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %errorlevel% neq 0 (
    echo ❌ Échec création DB
    goto :error
)

echo ✅ Base betterlife_db créée
echo.

echo Étape 2: Import des données...
echo ⚠️ IMPORTANT: Ouvrez maintenant phpMyAdmin et importez migration_script.sql
echo.
echo INSTRUCTIONS phpMyAdmin:
echo 1. Aller sur: http://localhost/phpmyadmin
echo 2. Sélectionner betterlife_db (menu gauche)
echo 3. Onglet "Importer"
echo 4. Sélectionner migration_script.sql
echo 5. Cliquer "Exécuter"
echo.

:wait_import
set /p done="Avez-vous terminé l'import dans phpMyAdmin ? (o/n): "
if /i "%done%"=="o" goto :test_db
if /i "%done%"=="n" goto :wait_import

echo Annulé par l'utilisateur.
goto :end

:test_db
echo.
echo Étape 3: Test de la base de données...
node check_db.js

if %errorlevel% neq 0 (
    echo ❌ Base de données non prête
    goto :error
)

echo.
echo Étape 4: Démarrage du backend...
start cmd /k "cd backend && node index.js"

echo.
echo 🎉 SETUP TERMINÉ !
echo.
echo APIs disponibles sur: http://localhost:5000
echo Testez avec: node test_api.js
echo.
goto :end

:error
echo.
echo ❌ ERREUR LORS DU SETUP
echo Vérifiez que XAMPP est démarré et MySQL fonctionne.
echo.

:end
pause