@echo off
color 0A
echo ========================================
echo Task Management Backend - Starting...
echo ========================================
echo.
echo Configuration:
echo - Port: 8081
echo - Database: task_management_db
echo - MySQL User: root
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd backend

echo [INFO] Compiling project...
call mvn clean compile -q

if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Compilation failed!
    echo Check the errors above.
    pause
    exit /b 1
)

echo [INFO] Starting Spring Boot application...
echo.
echo ========================================
echo WAIT FOR THIS MESSAGE:
echo "Started TaskManagementApplication"
echo ========================================
echo.

call mvn spring-boot:run

pause
