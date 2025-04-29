@echo off

for /f "tokens=2 delims=:" %%a in ('netsh interface ipv4 show address ^| findstr /R /C:"IP Address" ^| findstr /V "127.0.0.1"') do set IP=%%a

set IP=%IP: =%

start cmd /k "php -S %IP%:4000"

start "" http://%IP%:4000