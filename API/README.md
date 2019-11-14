## Configurar Cloud Endpoints

A continuación se muestran los pasoa a seguir para habilitar la autenticación de la API y el control de la misma utilizando [Google Cloud Endpoints](https://cloud.google.com/endpoints).

0. Antes de realizar cualquier operación, modifique los archivos `openapi.yaml` y `app-endpoints.yaml` y sustituya PROJECT_ID por el ID de su proyecto.

1. Despliegue el servicio de Cloud Endpoints utilizando el comando:

`gcloud endpoints services deploy swagger.yaml`

2. Consulte los servicios habilitados:

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

5. Despliegue la aplicación con la configuración que incluye Cloud Endpoints:

`gcloud app deploy app-endpoints.yaml backend/back.yaml`

6. Genere una API key siguiendo las instrucciones que aparecen [aquí](https://cloud.google.com/docs/authentication/api-keys#creating_an_api_key).

7. Habilite su API siguiendo estas [instrucciones](https://cloud.google.com/endpoints/docs/openapi/enable-api).

