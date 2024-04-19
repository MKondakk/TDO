# Tworzymy wolumin nodejs_data
docker volume create nodejs_data

# Tworzymy przykładowe pliki w katalogu app
New-Item -Path ./app -ItemType Directory | Out-Null
Set-Content -Path ./app/message.txt -Value "Hello from Node.js container!"

# Uruchamiamy kontener Node.js z woluminem zamontowanym w katalogu /app
docker run -it --name nodejs_container -v nodejs_data:/app node:latest

# Tworzymy wolumin all_volumes
docker volume create all_volumes

# Kopiujemy pliki z katalogu /usr/share/nginx/html do woluminu all_volumes z poziomu kontenera
docker run --rm -v nginx_data:/source -v all_volumes:/destination busybox cp -R /source /destination/nginx_data

# Kopiujemy pliki z katalogu app do woluminu all_volumes z poziomu kontenera
docker run --rm -v nodejs_data:/source -v all_volumes:/destination busybox cp -R /source /destination/nodejs_data
