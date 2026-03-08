@echo off
echo ========================================
echo Starting Task Management Backend Server
echo ========================================
echo.

cd backend

echo Checking Maven installation...
call mvn --version
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven first: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo.
echo ========================================
echo IMPORTANT: Backend will run on port 8081
echo ========================================
echo.
echo Building and starting Spring Boot application...
echo This may take a few minutes on first run...
echo.
echo If you see errors about MySQL:
echo 1. Make sure MySQL service is running
echo 2. Check credentials in application.properties
echo 3. Make sure database 'task_management_db' exists
echo.

call mvn spring-boot:run

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Backend failed to start!
    echo ========================================
    echo.
    echo Common fixes:
    echo 1. Check if MySQL is running
    echo 2. Verify database exists: task_management_db
    echo 3. Check credentials in application.properties
    echo 4. Check if port 8081 is already in use
    echo.
)

pause
