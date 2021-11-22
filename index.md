## Dockerizar la aplicación + Grafana + Prometheus

En esta actividad dockerizare mi aplicación y añadire también grafana y prometheus, pero primero explicaremos que es docker compose y kubernetes.

### Docker compose

Docker compose es una herramienta para definir y ejecutar aplicaciones Docker de contenedores múltiples. Utiliza un archivo YAML para configurar los servicios de su aplicación. Luego, con un solo comando, crea e inicia todos los servicios desde su configuración.

### Kubernetes

Kubernetes es una plataforma portable y extensible de código abierto para administrar cargas de trabajo y servicios. Kubernetes facilita la automatización y la configuración declarativa. Tiene un ecosistema grande y en rápido crecimiento. El soporte, las herramientas y los servicios para Kubernetes están ampliamente disponibles.


### Proceso

Primero creo una nueva rama donde se encontrará la aplicación y los docker-compose para desplegar la aplicación.
![1](https://user-images.githubusercontent.com/79716922/142939447-aca1e1df-736a-468b-b1b1-520b95cedd3e.png)

Luego, se debe añadir un variables.env en el directorio backend, que debe contener lo siguiente:

![env_backend](https://user-images.githubusercontent.com/79716922/142939473-f51592b0-cdaf-4e2c-bc0e-d9a802a18042.png)

Ahora, hay que crear los dockerfiles y dockerignore para cada parte, backend y frontend respectivamente.

![dockerfile_backend](https://user-images.githubusercontent.com/79716922/142939461-b22cc348-648a-4590-81f1-b66e1e884eb3.png)

![dockerfile_frontend](https://user-images.githubusercontent.com/79716922/142939464-cb263e88-82b9-4c6d-849b-640e802d4281.png)

Este es el dockerignore:

![dockerignore](https://user-images.githubusercontent.com/79716922/142939466-30a37aae-4f14-426c-8646-381b23d21700.png)

Antes de crear el docker-compose para la aplicación, utilizaremos el .env que se encuentra en la raíz para poner los puertos en los que se ejecutarán.

![env](https://user-images.githubusercontent.com/79716922/142939471-ae88a566-ae26-42ec-b31f-16a9bdef7759.png)

También crearemos la network que utilizaremos para los logs, que utilizarán los contenedores para comunicarse.

![network_logs](https://user-images.githubusercontent.com/79716922/142939509-f93541e0-7b62-49ca-9049-208f7a76363d.png)

Una vez tenemos el .env y la network, crearemos el docker-compose (que se encuentra en la raíz del proyecto) y ejecutar el comando en el directorio donde se encuentra el fichero docker-compose.yml:

```
docker-compose up
```
Una vez iniciado, para importar los datos a mongo, abriremos un nuevo terminal y ejecutaremos los siguientes comandos en orden:
```
1. docker-compose exec mongo bash
2. mongorestore --db=IPop
```
![mongorestore](https://user-images.githubusercontent.com/79716922/142939506-a0d05fa6-15fb-4024-95c7-bf564f7694de.png)

Ahora, con los datos importados, paramos el docker-compose up que hemos realizado previamente.

Lo siguiente es crear el docker-compose para grafana y prometheus, pero antes de ello, crearemos los ficheros grafana/datasources.yml y prometheus/prometheus.yml, que utilizaremos en el compose (se encuentran en el repositorio también).

Cuando lo tengamos, es hora de realizar el siguiente comando para poner todo en marcha:
```
docker-compose -f docker-compose.yml -f docker-compose-p-g.yml up
```
![docker-compose-doble](https://user-images.githubusercontent.com/79716922/142944963-accfab76-2c49-4bb5-a342-634f74684d4a.png)

Una vez hayamos realizado todo lo anterior, accederemos a localhost:4200 y tendremos el deploy de la aplicación.

![web](https://user-images.githubusercontent.com/79716922/142939514-4b488b75-cba9-4a65-a9e7-e93cfff50aef.png)

Para la utilización de grafana y prometheus, he modificado el app.js para que cuando se acceda a localhost:4000 se muestre un hello_world e incremente el numero de veces que hemos accedido a él, que luego utilizaremos en grafana para ver los gráficos.

![hello_world](https://user-images.githubusercontent.com/79716922/142946255-c5da3a47-f137-4f0a-8682-0a6b0174f353.png)

Si accedemos a localhost:4000/message, nos mostrará lo siguiente y se incrementará al igual que antes:

![message](https://user-images.githubusercontent.com/79716922/142946261-c356ecc0-a3ab-45b4-a125-4ed04ec90d24.png)

Y, si accedemos a localhost:4000/metrics, se mostrarán todas las metricas:

![metrics](https://user-images.githubusercontent.com/79716922/142946265-0c60a8c5-009d-49f5-89a0-521fa17d8403.png)

Al acceder a localhost:9090, nos encontraremos el dashboard de prometheus, iremos al apartado Status > Targets, ahi podremos observar el target, que este caso serán las métricas.

![prometheus_target](https://user-images.githubusercontent.com/79716922/142939513-08797297-4125-4f37-9db6-d7fea0305390.png)

Por último, iremos a grafana, con la URL localhost:3500. En la parte izquierda, haremos click en el signo + > Create > Dashboard, como se muestra en la siguiente imagen:

![grafana_1](https://user-images.githubusercontent.com/79716922/142939477-4d56e896-7933-494c-a414-3c25555cd266.png)

Crearemos un nuevo panel.

![grafana_2](https://user-images.githubusercontent.com/79716922/142939485-03c49e15-d150-4dc3-ad3f-4e3cff2d5a45.png)

En la parte de Metrics, escribiremos el nombre de la variable contador de home (hello_world).

![grafana_3](https://user-images.githubusercontent.com/79716922/142939487-0ba3af76-bcf3-46ef-b0ef-f55553b2ba5e.png)

Haremos click en Apply, arriba a la derecha.

![grafana_4](https://user-images.githubusercontent.com/79716922/142939491-a4efdfac-2428-40e6-87b8-136fbeedde9a.png)

Ahora que ya tenemos creado el gráfico para home, añadiremos uno nuevo para message.

![grafana_5](https://user-images.githubusercontent.com/79716922/142939496-740e4a06-4c8d-46b5-a20c-1d714e1cd6a4.png)

En este caso, escribiremos la variable contador para message, como se muestra en la imagen:

![grafana_6](https://user-images.githubusercontent.com/79716922/142939498-435c263c-f7f2-469c-8c60-83ced3d04677.png)

Ahora que tenemos los dos gráficos, guardaremos el dashboard para poder acceder en otro momento y ver que han augmentado las visitas al entrypoint.

![grafana_7](https://user-images.githubusercontent.com/79716922/142939500-66f2f8a4-2d59-4b91-866d-df85803866ea.png)

Luego de acceder unas cuantas veces a localhost:4000 y localhost:4000/message, podemos ver que las gráficas se han actualizado:

![grafana_8](https://user-images.githubusercontent.com/79716922/142939503-5b5dd3dd-1c8a-4529-b5bd-016f65b8cf51.png)

