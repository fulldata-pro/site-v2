# Fulldata frontend

Este proyecto es el frontend de la arquitectura de microservicios de Fulldata. Su objetivo es proporcionar una interfaz de usuario para interactuar con los diferentes servicios de búsqueda (como búsqueda de personas, empresas, vehículos, etc.) y mostrar los resultados de manera efectiva.

## Tecnologías Utilizadas para el frontend

- **Framework:** Next.js
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Gestor de Estado:** Redux Toolkit

## Paletas de colores

La gama de colores de la interfaz de usuario se basa en la paleta de colores de Fulldata, que incluye son primary: #eb1034, y secondary: #192440.

## Tipografía

La tipografía utilizada en la interfaz de usuario de Fulldata se centra en la legibilidad y la coherencia. Se utilizan fuentes "Inter var", sans-serif para los textos principales y fuentes serif para los encabezados, creando un contraste visual atractivo.

## Requisitos

- Los usuarios pueden realizar búsquedas de personas, empresas, vehículos, teléfonos y bancos.
- Los usuarios deben autenticarse para acceder a la funcionalidad de búsqueda.
- Los resultados de búsqueda deben mostrarse de manera clara y organizada (una lista de las busquedas en la que solo mostramos los metadatos y luego al abrir la busqueda, una pantalla elegante y responsiva para mostrar toda la información del reporte de busqueda).

## Funcionalidades

- Búsqueda de personas: Los usuarios pueden buscar información sobre personas utilizando diferentes criterios: email o CUIT/CUIL.
- Búsqueda de empresas: Los usuarios pueden buscar información sobre empresas utilizando diferentes criterios: CUIT.
- Búsqueda de vehículos: Los usuarios pueden buscar información sobre vehículos utilizando diferentes criterios: matrícula.
- Búsqueda de teléfonos: Los usuarios pueden buscar información sobre propietarios de un número de teléfono utilizando diferentes criterios: número de teléfono.
- Búsqueda de bancos: Los usuarios pueden buscar información sobre entidades bancarias utilizando diferentes criterios: CBU/ALIAS.

- Resultados de búsqueda: Los resultados de las búsquedas se muestran de manera clara y organizada, permitiendo a los usuarios acceder fácilmente a la información relevante.

## Consideraciones Técnicas

- **Autenticación:** Se implementará un sistema de autenticación con MOCK por el momento, para poder hacer pruebas sin necesidad de un backend completo.
- **Responsividad:** La interfaz de usuario se diseñará para ser completamente responsiva, asegurando una experiencia de usuario óptima en dispositivos móviles y de escritorio.

## Implementación

La implementación del frontend se llevará a cabo utilizando Next.js y TypeScript, siguiendo las mejores prácticas de desarrollo y asegurando un código limpio y mantenible. Se utilizará Redux Toolkit para la gestión del estado de la aplicación, facilitando la comunicación entre los diferentes componentes y la API.

## Recursos para el desarrollo

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

## Recursos locales para el desarrollo

Dentro de la carpeta "./temp_assets", dejamos varios archivos como favicon y dos logos para ser usados en la interfaz de usuario.

## Primer paso en el desarrollo

1. Crear el proyecto con un simple login mockeado.
2. Crear el dashboard con un diseño elegante, responsivo e intuitivo.
3. Por el momento, no se implementarán funcionalidades avanzadas hasta que no finalicemos con el diseño.
