#!/bin/bash

# Creamos la network que utilizaremos para que se puedan comunicar los contenedores 
sudo docker network create ipop

# Creamos la imagen del servidor 
sudo docker build -t ipop_express backend/

# Creamos la imagen del cliente
sudo docker build -t ipop_angular frontend/

# Creamos el contenedor de mongo
sudo docker run -d --network ipop --name db -p 27017:27017 mongo:4.4

# Copiamos los dummies al contenedor de mongo
sudo docker cp backend/IPop/ db:/dump

# Realizamos el mongorestore para importar la db
sudo docker exec -it db mongorestore --db=IPop

# Creamos el contenedor para el servidor
sudo docker run -d --network ipop --name backend -p 4000:4000 ipop_express

# Creamos el contenedor para el cliente
sudo docker run -d --network ipop --name frontend -p 4200:80 ipop_angular


# En caso de querer utilizar las imagenes del dockerhub no sera necesario realizar los builds
# Y los runs de los contenedores serán así:

# sudo docker run -d --network ipop --name backend -p 4000:4000 brogg/ipop_express

# sudo docker run -d --network ipop --name frontend -p 4200:80 brogg/ipop_angular
