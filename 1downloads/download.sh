#!/bin/bash
name=$1
cd /
mkdir data
cd data
touch index.html
echo "<a href='"${name}"'>$1</a>" > index.html
docker pull nginx
docker run -d -p 80:80 -v /data:/usr/share/nginx/html --name nginx nginx
wget $2

