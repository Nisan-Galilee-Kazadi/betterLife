@echo off
echo Export de la base de donnees locale BetterLife...
mysqldump -u root -p betterlife_db > betterlife_local_export.sql
echo Export termine : betterlife_local_export.sql
pause
