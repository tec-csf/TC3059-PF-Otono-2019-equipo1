# Administración de colegios API REST

## Lenguaje de programación
La API esta desarrollada con el web framework Flask el cual utiliza Python como lenguaje

## Librerías de funciones o dependencias
Se desarrollo con la libreria Flask API la cual se encarga se generar una interfaz basica de usuario

## Uso
### Endpoints
La API unicamente tiene endponits de consulta, todos los endpoints regresan un JSON con la información requerida

#### Método GET estudiantes 
- Consulte todos los estudiantes en la base de datos
- url -> /api/v1/students 
- Regresa un JSON con toda la información de los estudiantes

#### Método GET estudiante
- Consulte un estudiante en la base de datos pasando su ID como parámetro
- url -> /api/v1/student/<_id> 
- Regresa un JSON con todas la información de un estudiante

#### Método GET materias
- Consulte todos las materias en la base de datos
- url -> /api/v1/subjects 
- Regresa un JSON con toda la información de las materias

#### Método GET materia
- Consulte una materia en la base de datos pasando su ID como parámetro
- url -> /api/v1/subject/<_id>
- Regresa un JSON con toda la información de una materia

#### Método GET maestros
- Consulte todos los maestros en la base de datos
- url -> /api/v1/teachers
- Regresa un JSON con toda la información de los maestros

#### Método GET maestro
- Consulte una maestro en la base de datos pasando su ID como parámetro
- url -> /api/v1/teacher/<_id>
- Regresa un JSON con toda la información de un maestro


### API KEY
Para consultar los endpoints es necesario obtener una API KEY en el portal de GCP

- Genere una API key siguiendo las instrucciones que aparecen [aquí](https://cloud.google.com/docs/authentication/api-keys#creating_an_api_key).

- Habilite su API siguiendo estas [instrucciones](https://cloud.google.com/endpoints/docs/openapi/enable-api).

Al consultar un endopint se debe de pasar la llave como parámetro en la url ?key=YOURKEY, ejémplo:
`https://wwww.apiUrl.com/api/v1/students?key=ajjnbcdicndcnbdjcnd`


## Desarrolladores 
### Desplegar y Configurar Cloud Endpoints
1. Despliegue el servicio de Cloud Endpoints utilizando el comando:

`gcloud endpoints services deploy swagger.yaml`

Si encuentra algun error verifique que los servicios estan habilitados
2. Consulte los servicios:

`gcloud services list`

3. Verifique que en la salida aparecen los siguientes servicios requeridos:

| Name                             | Title                  |
|----------------------------------|------------------------|
| servicemanagement.googleapis.com | Service Management API |
| servicecontrol.googleapis.com    | Service Control API    |
| endpoints.googleapis.com         | Google Cloud Endpoints |

4. En caso de no aparecer algún servicio, habilítelo con el comando:

`gcloud services enable  SERVICE_NAME`

por ejemplo:

`gcloud services enable  endpoints.googleapis.com`

5. Cambien endpoints_api_service-name por el ID en el archivo app-endpoints.yaml

6. Despliegue la aplicación con la configuración que incluye Cloud Endpoints:

`gcloud app deploy app-endpoints.yaml`

7. Genere una API key siguiendo las instrucciones que aparecen [aquí](https://cloud.google.com/docs/authentication/api-keys#creating_an_api_key).

8. Habilite su API siguiendo estas [instrucciones](https://cloud.google.com/endpoints/docs/openapi/enable-api).