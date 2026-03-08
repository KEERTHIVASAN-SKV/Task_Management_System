@echo off
echo ========================================
echo Checking Backend Status
echo ========================================
echo.

echo Testing connection to http://localhost:8081/api/tasks
echo.

curl -s http://localhost:8081/api/tasks >nul 2>&1

if errorlevel 1 (
    color 0C
    echo [X] BACKEND IS NOT RUNNING
    echo.
    echo The backend server is not responding on port 8081.
    echo.
    echo To start it:
    echo 1. Run: run-backend-with-logs.bat
    echo 2. Wait for "Started TaskManagementApplication"
    echo 3. Run this script again to verify
    echo.
) else (
    color 0A
    echo [✓] BACKEND IS RUNNING!
    echo.
    echo Backend is responding on port 8081
    echo.
    echo Response from server:
    curl -s http://localhost:8081/api/tasks
    echo.
    echo.
    echo You can now use the application:
    echo - Open: frontend/index.html
    echo.
)

pause
