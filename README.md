# Missa_bot
> Liste des paquets utilisés pour npm
``` 
├── @discordjs/opus@0.1.0
├── bluebird@3.7.2
├── columnify@1.5.4
├── canvas@2.6.1
├── cheerio@1.0.0-rc.3
├── cheerio-tableparser@1.0.1
├── discord.js@12.2.0
├── ffmpeg@0.0.4
├── fluent-ffmpeg@2.1.2
├── google-tts-api@0.0.4
├── node-google-calendar@1.1.1
├── moment@2.24.0
├── moment-duration-format@2.3.2
├── promise-defer
├── sqlite@4.0.7
├── sqlite3@4.2.0
├── utf-8-validate@5.0.2
└── ytdl-core@2.1.5
  
```
> commande pour installé les paquets complémentaire
``` 
npm i ytdl-core
npm i utf-8-validate
npm i sqlite3@4.0.7
npm i sqlite3
npm i promise-defer
npm install moment-duration-format
npm i moment@2.24.0
npm i google-tts-api
npm i fluent-ffmpeg
npm install ffmpeg@0.0.4
npm install discord.js
npm i cheerio-tableparser
npm install cheerio
npm i canvas
npm i columnify
npm i bluebird
npm i @discordjs/opus
  
```
> contenu du fichier service pour linux
``` 
[Unit]
Description=Missa boot
After=network.target postgresql.service redis-server.service

[Service]
Type=simple
User=bob
Group=bob
ExecStart=/home/bob/.nvm/versions/node/v14.5.0/bin/node index.js
WorkingDirectory= /home/bob/www/Missa_bot/
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=bot
Restart=always

; Some security directives.
; Mount /usr, /boot, and /etc as read-only for processes invoked by this service.
ProtectSystem=full
; Sets up a new /dev mount for the process and only adds API pseudo devices
; like /dev/null, /dev/zero or /dev/random but not physical devices. Disabled
; by default because it may not work on devices like the Raspberry Pi.
PrivateDevices=false
; Ensures that the service process and all its children can never gain new
; privileges through execve().
NoNewPrivileges=true
; This makes /home, /root, and /run/user inaccessible and empty for processes invoked
; by this unit. Make sure that you do not depend on data inside these folders.
ProtectHome=false
; Drops the sys admin capability from the daemon.
CapabilityBoundingSet=~CAP_SYS_ADMIN

[Install]
WantedBy=multi-user.target
  
```