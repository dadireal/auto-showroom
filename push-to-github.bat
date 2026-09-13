@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
echo ========================================================
echo   [AUTO SHOWROOM] PUSHING TO GITHUB (dadireal)
echo ========================================================
echo.

:: Check if remote origin already exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo Adding remote origin: https://github.com/dadireal/auto-showroom.git
    git remote add origin https://github.com/dadireal/auto-showroom.git
)

echo.
echo Current branch: main
git branch -M main

echo.
echo Pushing code to GitHub...
echo (A browser window or sign-in popup may appear to authorize GitHub)
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Your code is now live on GitHub!
    echo Next step: Go to https://vercel.com/new and click Import on auto-showroom.
) else (
    echo.
    echo If pushing to auto-showroom failed, trying auto-2...
    git remote set-url origin https://github.com/dadireal/auto-2.git
    git push -u origin main
)

echo.
pause
