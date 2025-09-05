# Proyecto Fulldata - Sistema de Búsqueda de Información

## Descripción General

Fulldata es un sistema de búsqueda de información integral que permite a los usuarios consultar datos sobre personas, empresas, vehículos, teléfonos y entidades bancarias. Este proyecto implementa el frontend de la arquitectura de microservicios de Fulldata, proporcionando una interfaz de usuario moderna, elegante y responsiva para interactuar con los diferentes servicios de búsqueda.

## Objetivos del Proyecto

### Objetivo Principal

Crear una plataforma web que facilite el acceso a información crítica de diversas fuentes de datos argentinas e internacionales, permitiendo a los usuarios realizar búsquedas eficientes y obtener reportes detallados de manera organizada y visual.

### Objetivos Específicos

- **Experiencia de Usuario Optimizada**: Interfaz moderna, intuitiva y completamente responsiva
- **Búsquedas Especializadas**: Sistema especializado para diferentes tipos de entidades
- **Gestión de Créditos**: Sistema de créditos integrado para controlar el uso de servicios
- **Reportes Detallados**: Presentación elegante y organizada de los resultados de búsqueda
- **Autenticación Segura**: Sistema de autenticación con gestión de sesiones
- **Monitoreo en Tiempo Real**: Seguimiento de búsquedas activas y historial completo

## Funcionalidades Principales

### 1. Sistema de Búsqueda Multimodal

#### Búsqueda de Personas

- **Criterios de búsqueda**: Email, CUIT/CUIL
- **Información obtenida**: Datos personales, antecedentes, información laboral
- **Fuentes**: Nosis y otros proveedores especializados

#### Búsqueda de Empresas

- **Criterios de búsqueda**: CUIT empresarial
- **Información obtenida**: Razón social, actividad comercial, situación fiscal
- **Fuentes**: BIND y registros oficiales

#### Búsqueda de Vehículos

- **Criterios de búsqueda**: Patente/Matrícula
- **Información obtenida**: Datos del vehículo, titularidad, historial
- **Fuentes**: OSINT y registros vehiculares

#### Búsqueda de Teléfonos

- **Criterios de búsqueda**: Número telefónico
- **Información obtenida**: Titularidad, validación, información asociada
- **Fuentes**: Bases de datos telefónicas

#### Búsqueda de Entidades Bancarias

- **Criterios de búsqueda**: CBU, Alias bancario
- **Información obtenida**: Titular de cuenta, entidad bancaria
- **Fuentes**: Sistema bancario argentino

### 2. Sistema de Gestión de Créditos

#### Tipos de Créditos por Región

- **Argentina**:
  - Personas: 478 créditos disponibles
  - Empresas: 498 créditos disponibles
  - Teléfonos: 500 créditos disponibles
  - Vehículos: 499 créditos disponibles
  - Cuentas Bancarias: 460 créditos disponibles

- **Global**:
  - Rastreo Web: 600 créditos disponibles
  - Validación de Identidad: 86 créditos disponibles

#### Funcionalidades de Créditos

- **Panel de Saldo**: Visualización detallada del saldo total y por categoría
- **Historial de Compras**: Registro completo de transacciones
- **Compra de Créditos**: Integración con Mercado Pago
- **Uso Mensual**: Tracking del consumo de créditos por período

### 3. Dashboard y Reportes

#### Panel de Control Principal

- **Estadísticas en Tiempo Real**:
  - Búsquedas totales (1,847 con +12% de crecimiento)
  - Búsquedas activas (24 en tiempo real)
  - Reportes generados (892 con +8% de crecimiento)
  - Tasa de éxito (98.5% de precisión)

#### Sistema de Reportes

- **Generación Automática**: Reportes detallados por cada búsqueda
- **Visualización Elegante**: Presentación organizada de resultados
- **Historial Completo**: Acceso a todos los reportes generados
- **Búsquedas Activas**: Monitoreo en tiempo real del estado de procesamiento

### 4. Autenticación y Seguridad

#### Sistema de Autenticación

- **Mock Authentication**: Sistema temporal para desarrollo y pruebas
- **Gestión de Sesiones**: Control de acceso mediante tokens de autenticación
- **Rutas Protegidas**: Middleware de seguridad para páginas privadas
- **Redirección Inteligente**: Manejo automático de rutas según estado de autenticación

## Arquitectura Técnica

### Stack Tecnológico

#### Frontend Framework

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **React 18**: Biblioteca de interfaz de usuario

#### Gestión de Estado

- **Redux Toolkit**: Gestión centralizada del estado de la aplicación
- **Slices especializados**:
  - `authSlice`: Estado de autenticación y usuario
  - `searchSlice`: Estado de búsquedas y historial
  - `reportSlice`: Estado de reportes y resultados

#### Estilos y UI

- **Tailwind CSS**: Framework CSS utilitario
- **Paleta de colores personalizada**:
  - Primary: #eb1034 (rojo corporativo)
  - Secondary: #192440 (azul oscuro)
- **Tipografía**: Inter Variable para consistencia visual
- **Heroicons + Lucide React**: Iconografía moderna

#### Servicios y APIs

- **API Service Layer**: Abstracción para comunicación con microservicios
- **Endpoints especializados**: APIs dedicadas para cada tipo de búsqueda
- **Sistema de respuestas**: Manejo unificado de respuestas HTTP

### Estructura de Directorios

```bash
frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Panel principal post-login
│   ├── search/           # Funcionalidades de búsqueda
│   │   ├── people/       # Búsqueda de personas
│   │   ├── company/      # Búsqueda de empresas
│   │   ├── vehicle/      # Búsqueda de vehículos
│   │   ├── phone/        # Búsqueda de teléfonos
│   │   └── bank/         # Búsqueda bancaria
│   ├── reports/          # Visualización de reportes
│   ├── history/          # Historial de búsquedas
│   ├── credits/          # Gestión de créditos
│   └── login/            # Autenticación
├── components/            # Componentes reutilizables
│   └── layout/           # Header, Sidebar, layouts
├── store/                # Redux store
│   └── slices/           # Slices de estado
├── services/             # Servicios y APIs
├── styles/               # Estilos globales
└── temp_assets/          # Assets temporales (favicon, logos)
```

### Middleware y Rutas

#### Protección de Rutas

- **Middleware personalizado**: Control de acceso automático
- **Gestión de cookies**: Persistencia de autenticación
- **Redirección inteligente**: Manejo de flujos de navegación

#### Configuración de Rutas

- **Rutas públicas**: `/` (landing), `/login`
- **Rutas protegidas**: Dashboard, búsquedas, reportes, historial
- **Rutas dinámicas**: `/reports/[id]`, `/searches/[type]`

### Integración con Microservicios

#### Arquitectura de Servicios

- **API Gateway**: Punto de entrada unificado
- **Microservicios especializados**: Servicios dedicados por tipo de búsqueda
- **Proveedores externos**:
  - **Nosis**: Información de personas
  - **BIND**: Datos empresariales
  - **OSINT**: Información vehicular
  - **Sistema bancario**: Datos financieros

#### Flujo de Datos

1. **Solicitud**: Usuario inicia búsqueda desde frontend
2. **Procesamiento**: API Gateway distribuye a microservicio correspondiente
3. **Consulta**: Microservicio consulta fuentes de datos especializadas
4. **Respuesta**: Datos consolidados retornan al frontend
5. **Presentación**: Interfaz muestra resultados de forma organizada

## Consideraciones de Desarrollo

### Fases de Implementación

#### Fase 1 (Actual): Diseño y Prototipo

- **Login mockeado**: Autenticación temporal para desarrollo
- **Dashboard elegante**: Interfaz principal responsiva e intuitiva
- **Componentes base**: Elementos de UI fundamentales
- **Prioridad**: Diseño UX/UI antes que funcionalidades avanzadas

#### Fase 2: Integración Backend

- **APIs reales**: Conexión con microservicios
- **Autenticación real**: Sistema de usuarios completo
- **Procesamiento**: Búsquedas funcionales con datos reales

#### Fase 3: Optimización

- **Testing**: Implementación de framework de pruebas
- **Performance**: Optimización de rendimiento
- **SEO**: Mejoras para motores de búsqueda

### Configuración de Desarrollo

#### Variables de Entorno

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000  # URL base de APIs
```

#### Comandos de Desarrollo

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción de producción
npm run start    # Servidor de producción
npm run lint     # Análisis de código
```

### Consideraciones de Responsividad

#### Breakpoints

- **Mobile First**: Diseño optimizado para móviles
- **Responsive Grid**: Layouts adaptativos
- **Touch Friendly**: Interfaces táctiles optimizadas

#### Componentes Adaptativos

- **Dashboard**: Grillas responsivas para estadísticas
- **Búsquedas**: Formularios optimizados por dispositivo
- **Reportes**: Visualización adaptativa de datos

## Localización e Internacionalización

### Configuración Actual

- **Idioma primario**: Español (Argentina)
- **Locale**: `es` configurado en layout principal
- **Moneda**: ARS (Pesos Argentinos)
- **Formato de fechas**: DD/MM/YYYY

### Términos Técnicos Localizados

- **DNI**: Documento Nacional de Identidad
- **CUIT/CUIL**: Clave Única de Identificación Tributaria/Laboral
- **CBU**: Clave Bancaria Uniforme
- **Patente**: Matrícula vehicular argentina

## Recursos y Assets

### Recursos Locales

- **Ubicación**: `./temp_assets/`
- **Contenido**:
  - Favicon del proyecto
  - Logos de Fulldata (2 versiones)
  - Assets de desarrollo

### Recursos Externos

- **Documentación técnica**: Links a Next.js, TypeScript, Tailwind CSS, Redux Toolkit
- **APIs de terceros**: Integración con proveedores de datos
- **Servicios de pago**: Mercado Pago para compra de créditos

## Métricas y KPIs

### Indicadores de Rendimiento

- **Tasa de éxito**: 98.5% de precisión en búsquedas
- **Volumen mensual**: 1,847 búsquedas totales
- **Crecimiento**: +12% en búsquedas, +8% en reportes generados
- **Tiempo de respuesta**: Búsquedas en tiempo real con feedback visual

### Monitoreo Operacional

- **Búsquedas activas**: 24 consultas simultáneas
- **Estado de servicios**: Monitoreo en tiempo real de proveedores
- **Uso de créditos**: 847 créditos consumidos mensualmente
- **Disponibilidad**: Tracking de servicios por proveedor (Nosis, BIND, OSINT)

---

Este proyecto representa la evolución del acceso a información crítica en Argentina, combinando tecnología moderna con fuentes de datos confiables para ofrecer una herramienta poderosa y fácil de usar para profesionales que requieren información verificada y actualizada.
