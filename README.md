# Dockerizar la aplicación con dockerfiles y un bash script

Para empezar en esta actividad, crearemos un tag para la versión 1.

![1](https://user-images.githubusercontent.com/79716922/143237777-de10e09e-a7c6-4ef3-b7f7-0349a7661c1b.png)

Una vez realizado, haremos el push de los tags.

![2](https://user-images.githubusercontent.com/79716922/143237794-b5e57aa3-887a-46dc-80c4-b3e05876eeda.png)

Lo siguiente es crear la rama main_dockerfile y movernos a ella.

![3](https://user-images.githubusercontent.com/79716922/143237801-64947763-c79c-44e5-94d3-8665feb0484f.png)

Ahora, crearemos los respectivos dockerfiles para cada parte de la aplicación, servidor y cliente.

![4](https://user-images.githubusercontent.com/79716922/143237802-2bc323d0-6932-44f6-9f63-9a054d78acb2.png)

Deberemos crear el siguiente fichero var.env en la carpeta backend/

![5](https://user-images.githubusercontent.com/79716922/143237807-51d8650a-6a27-4447-88b5-a356f76f94b8.png)

Por último, tenemos el script que se encargará de realizar el deploy completo de la aplicación.

![6](https://user-images.githubusercontent.com/79716922/143237810-c3b55866-ab9c-4541-90cc-415cb2a92662.png)

Una vez lo tengamos, le damos permisos de ejecución con el siguiente comando:

```
chmod +x deploy.sh
```

Y una vez lo ejecutemos se desplegará la aplicación.

```
./deploy.sh
```

Por último, para subir las imágenes a DockerHub debemos seguir los siguientes pasos:

![docker_hub](https://user-images.githubusercontent.com/79716922/143237816-c0a4c55f-b872-4998-84fb-ab81a19174f1.png)
