@echo off
title Darshan's Arcade - Production Preview
echo ========================================================
echo   BUILDING AND LAUNCHING PRODUCTION PREVIEW
echo ========================================================
echo.
set "PATH=C:\Users\DELL\AppData\Local\Programs\nodejs;%PATH%"

echo Building production bundle...
call npm run build

echo.
echo Starting local production server at http://localhost:4173...
start http://localhost:4173
npm run preview -- --port 4173
pause
