# Página de visualización de informes

Esta página proporciona una visión del informe generado, permitiendo a los usuarios ver y gestionar los informes de manera eficiente.

## Funcionalidades Principales

- **Visualización de Informes**: Muestra el informe generado en un formato legible y estructurado.
- **Descarga de Informes**: Permite a los usuarios descargar el informe en PDF.
- **Edición de Informes**: Los usuarios pueden editar los informes existentes para actualizar la información.
- **Eliminación de Informes**: Opción para eliminar informes que ya no son necesarios.
- **Reenvio de webhooks**: Permite reenviar webhooks asociados al informe.

## Metodo para visualizar la página

Cuando el usuario ingresa a ver el detalle de un informe:
    1. Se busca en coleccion de "reports" por el UID del informe.
    2. Se obtienen los datos del informe mediante un GET a la API de informes ("api.fulldata.pro/reports/{uid}").
    3. Se renderiza la página con los datos obtenidos (adjunto un mock de como vienen los datos de la api para un reporte de people "./public/Requests.Reports.json").

## TODO list

- [x] Implementar la visualización del informe.
- [x] Configurar la llamada a la API para obtener los datos del informe.
- [x] Cambiar el mock por los datos reales de la API (Sin borrar el archivo de mock).
- [x] Añadir funcionalidad de descarga en PDF.
- [ ] Permitir la edición de informes existentes.
- [x] Implementar la eliminación de informes.
- [x] Añadir funcionalidad para reenviar webhooks.
