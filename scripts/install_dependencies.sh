#!/bin/bash

cd /var/www/prajaakeeya-api

SECRET=$(aws secretsmanager get-secret-value \
 --secret-id prod/env \
 --query SecretString \
 --output text)

echo $SECRET > .env

npm install

npm run build