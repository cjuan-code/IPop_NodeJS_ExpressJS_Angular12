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

Una vez tenemos los dockerfiles es crear el docker-compose para desplegar la aplicación (que se encuentra en la raíz del proyecto) y ejecutar el comando en el directorio donde se encuentra el fichero docker-compose.yml:

```
docker-compose up
```
Una vez iniciado, para importar los datos a mongo, abriremos un nuevo terminal y ejecutaremos los siguientes comandos en orden:
```
1. docker-compose exec mongo bash
2. mongorestore --db=IPop
```

Ahora, con los datos importados, paramos el docker-compose up que hemos realizado previamente.

Lo siguiente es crear el docker-compose para grafana y prometheus, pero antes de ello, crearemos los ficheros grafana/datasources.yml y prometheus/prometheus.yml, que utilizaremos en el compose (se encuentran en el repositorio también).





