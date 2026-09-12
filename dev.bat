@echo off
set PATH=E:\node-v20.18.0-win-x64;%PATH%
echo [AUTO SHOWROOM] Starting Local Dev Server on http://localhost:5173/ ...
npm run dev -- --host --port 5173
pause
