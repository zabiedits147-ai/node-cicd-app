@echo off
node --version
if errorlevel 1 exit /b 1
call npm.cmd ci
if errorlevel 1 exit /b 1
call npm.cmd test
if errorlevel 1 exit /b 1
call npm.cmd run build
if errorlevel 1 exit /b 1
call npm.cmd run deploy -- freestyle
if errorlevel 1 exit /b 1
