#!/bin/bash

docker build -t nodejs-hello-world .

docker run -d -p 8080:8080 --name task3-01 nodejs-hello-world

echo "Serwer Node.js uruchomiony na porcie 8080"

sleep 10

echo "Uruchamianie testu serwera..."

./test.sh