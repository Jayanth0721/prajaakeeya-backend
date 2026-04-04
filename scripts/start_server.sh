#!/bin/bash

cd /var/www/prajaakeeya-api

pm2 delete prajaakeeya-api || true

pm2 start dist/main.js --name prajaakeeya-api

pm2 save