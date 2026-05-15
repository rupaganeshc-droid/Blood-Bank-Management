@echo off
cd /d "C:\wamp64\www\micro proj\test_demo\bloodbank-server"
start "" node server.js
start "" http://localhost:5500/admin.html
