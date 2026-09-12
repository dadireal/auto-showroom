@echo off
set PATH=E:\node-v20.18.0-win-x64;%PATH%
echo ========================================================
echo   [AUTO SHOWROOM] DEPLOYMENT TO VERCEL (FREE CLOUD HOSTING)
echo ========================================================
echo.
echo Step 1: Building production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed. Please check errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Deploying to Vercel...
echo (If prompted, press Enter to accept default settings and log in)
echo.
call npx -y vercel deploy --prod

echo.
echo Deployment process finished.
pause
