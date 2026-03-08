@echo off
echo ========================================
echo Starting Task Management Frontend
echo ========================================
echo.

cd frontend

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo WARNING: Python not found. Opening HTML file directly...
    start index.html
    exit /b 0
)

echo.
echo Starting local server on port 3000...
echo Open your browser to: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 3000
