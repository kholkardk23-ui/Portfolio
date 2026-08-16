@echo off
title Darshan's Arcade - Developer Portfolio
echo ========================================================
echo   STARTING DARSHAN'S ARCADE (PAC-MAN PORTFOLIO)
echo ========================================================
echo.
set "PATH=C:\Users\DELL\AppData\Local\Programs\nodejs;%PATH%"

echo Starting local development server...
start http://localhost:3000
npm run dev -- --port 3000
pause
