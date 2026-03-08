@echo off
echo ========================================
echo Task Management System - Setup Verification
echo ========================================
echo.

echo [1/4] Checking Java...
java -version 2>&1 | findstr "version"
if errorlevel 1 (
    echo    ERROR: Java not found
    set JAVA_OK=0
) else (
    echo    OK: Java is installed
    set JAVA_OK=1
)
echo.

echo [2/4] Checking Maven...
mvn --version 2>&1 | findstr "Apache Maven"
if errorlevel 1 (
    echo    ERROR: Maven not found
    set MAVEN_OK=0
) else (
    echo    OK: Maven is installed
    set MAVEN_OK=1
)
echo.

echo [3/4] Checking MySQL Service...
sc query MySQL 2>nul | findstr "RUNNING" >nul
if errorlevel 1 (
    echo    WARNING: MySQL service may not be running
    echo    Please start MySQL service from Services
    set MYSQL_OK=0
) else (
    echo    OK: MySQL service is running
    set MYSQL_OK=1
)
echo.

echo [4/4] Checking Database...
mysql -u root -pskvasan -e "USE task_management_db;" 2>nul
if errorlevel 1 (
    echo    WARNING: Database 'task_management_db' not found
    echo    Creating database...
    mysql -u root -pskvasan -e "CREATE DATABASE IF NOT EXISTS task_management_db;" 2>nul
    if errorlevel 1 (
        echo    ERROR: Cannot create database. Check MySQL credentials.
        set DB_OK=0
    ) else (
        echo    OK: Database created successfully
        set DB_OK=1
    )
) else (
    echo    OK: Database exists
    set DB_OK=1
)
echo.

echo ========================================
echo Summary
echo ========================================
if %JAVA_OK%==1 if %MAVEN_OK%==1 if %MYSQL_OK%==1 if %DB_OK%==1 (
    echo.
    echo    ALL CHECKS PASSED!
    echo.
    echo    You can now start the backend:
    echo    1. Run: start-backend.bat
    echo    2. Wait for "Started TaskManagementApplication"
    echo    3. Open: test-connection.html to verify
    echo    4. Open: frontend/index.html to use the app
    echo.
) else (
    echo.
    echo    SOME CHECKS FAILED!
    echo    Please fix the issues above before starting the backend.
    echo.
)

pause
