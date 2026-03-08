@echo off
echo Testing MySQL Connection...
echo.

mysql -u root -pskvasan -e "SHOW DATABASES;" 2>nul

if errorlevel 1 (
    echo ERROR: Cannot connect to MySQL
    echo.
    echo Possible issues:
    echo 1. MySQL service is not running
    echo 2. Password is incorrect
    echo 3. MySQL is not installed
    echo.
    echo To fix:
    echo - Check if MySQL service is running in Services
    echo - Verify password in application.properties
    pause
    exit /b 1
) else (
    echo SUCCESS: MySQL connection works!
    echo.
    echo Checking for task_management_db...
    mysql -u root -pskvasan -e "USE task_management_db; SHOW TABLES;" 2>nul
    
    if errorlevel 1 (
        echo.
        echo Database task_management_db does not exist!
        echo Creating it now...
        mysql -u root -pskvasan -e "CREATE DATABASE task_management_db;"
        echo Database created successfully!
    ) else (
        echo Database exists and is accessible!
    )
)

echo.
pause
