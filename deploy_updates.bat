@echo off
echo ========================================================
echo   EASY DEPLOYMENT SCRIPT (GitHub -> Vercel)
echo ========================================================
echo.
echo 1. Adding all changes...
git add .

echo.
echo 2. Committing changes...
set /p commit_msg="Enter a short description of your changes (e.g., 'Fixed logo'): "
git commit -m "%commit_msg%"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo ========================================================
echo   SUCCESS! 
echo   Vercel will now automatically rebuild your site.
echo ========================================================
pause
