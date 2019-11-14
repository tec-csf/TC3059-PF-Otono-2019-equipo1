# Administración de colegios API REST

## Uso
### Endpoints
Todos los endpoints regresan un JSON con la información consultada

- /api/v1/students -> Consulte todos los estudiantes en la base de datos
- /api/v1/student/<_id> -> Consulte un estudiante en la base de datos pasando su ID como parámetro
- /api/v1/subjects -> Consulte todos las materias en la base de datos
- /api/v1/subject/<_id> -> Consulte una materia en la base de datos pasando su ID como parámetro
- /api/v1/teachers -> Consulte todos los maestros en la base de datos
- /api/v1/teacher/<_id> -> Consulte un maestro en la base de datos pasando su ID como parámetro

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