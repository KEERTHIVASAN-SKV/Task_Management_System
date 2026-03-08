@echo off
echo ========================================
echo Testing MySQL Connection...
echo ========================================
echo.
echo This script requires MySQL command line tools.
echo.
echo To test MySQL connection manually:
echo 1. Open MySQL Workbench
echo 2. Or run: mysql -u your_username -p
echo 3. Enter your password when prompted
echo 4. Run: SHOW DATABASES;
echo 5. Run: CREATE DATABASE IF NOT EXISTS task_management_db;
echo.
echo Make sure to update credentials in:
echo backend/src/main/resources/application.properties
echo.
pause
