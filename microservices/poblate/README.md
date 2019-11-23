# _Microservicio para poblar la base de datos con un CSV_

##### Integrantes:

1. [Joan Andoni González Rioz](https://github.com/JoanAndoni)
2. [Daniel Charua García](https://github.com/dcharua)

---

## 1. Aspectos generales

### 1.1 Requerimientos técnicos

- MongoDB 3.6.9

- node.js 11.9.0
- npm 6.5.0

- Docker 18.09.2

- Google SDK

## 2 Pasos a seguir para utilizar el microservicio

### Para ejecutarlo local

1. Clonar el repositorio de GitHub

`git clone https://github.com/tec-csf/TC3059-PF-Otono-2019-equipo1.git`

2. Cambiarse a la carpeta del microservicio

`cd TC3059-PF-Otono-2019-equipo1/microservices/poblate`

3. Instalar las dependencias de NodeJs para el backend

`npm install`

4. Iniciar la app del backend de la API Rest

`npm start`

5. Hacer las peticiones necesarias a el siguiente link

http://localhost:3100/alumnos/poblate

### Para ejecutarlo en la nube (Google Cloud)

#### En GCLOUD console

1. Entra a la consola de Google Cloud Platform (GCP) 

https://console.cloud.google.com

2. Crea un proyecto en el cual se desplegará la aplicación

3. Abre la terminal de GCP

4. Clona el repositorio de Gitub

`git clone https://github.com/tec-csf/TC3059-PF-Otono-2019-equipo1.git`

5. Dentro de la plataforma entra a Compute/Kubernetes Engine y crea un nuevo cluster

#### En tu computadora

1. Clonar el repositorio de github

`git clone https://github.com/tec-csf/TC3059-PF-Otono-2019-equipo1.git`

2. Cambiarse a la carpeta del microservicio

`cd TC3059-PF-Otono-2019-equipo1/microservices/poblate`

3. Crear la imagen del backend usando el comando

`docker build . --tag gcr.io/[id del proyecto de GCP]/poblate-image`

4. Dar push a la imagen del backend usando el comando

`gcloud docker -- push gcr.io/[ID del proyecto de GCP]/poblate-image`

#### En GCLOUD console

1. Cambiarse a la carpeta del backend del proyecto

`cd TC3059-PF-Otono-2019-equipo1/microservice/poblate`

2. Modifica el archivo "microserviceDeployment.yaml"; cambia el nombre de la imagen del microservicio

Línea 36: 
```yaml
imagen: gcr.io/[ID del proyecto de GCP]/microservice-image
```

3. Crea la conexión con el cluster creado previamente

`gcloud container clusters get-credentials [Nombre del cluster] --zone [Zona del cluster] --project [ID del proyecto de GCP]`

4. Desplegar la aplicación en el cluster

`kubectl apply -f microserviceDeployment.yaml`

5. Comprobar que el pod está funcionando correctamente (El Status debe ser Running)

`kubectl get pods`

6. Obtener la dirección IP externa y el puerto del microservicio

`kubectl get service`

## 3. Referencias

1. [Conexión con Mongoose](https://mongoosejs.com/docs/guide.html)
2. [Crear un contenedor de docker con Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
3. [Pushing and pulling images](https://cloud.google.com/container-registry/docs/pushing-and-pulling)
