# Documentación de Base de Datos - Fulldata Platform

## Resumen General

Este documento describe la estructura de base de datos de la plataforma Fulldata, un sistema de servicios que gestiona cuentas de usuarios, transacciones financieras, y operaciones relacionadas con búsquedas de información. La base de datos está diseñada en MongoDB utilizando Mongoose como ODM.

## Colecciones Principales

### 1. ADMINS (admins)

**Propósito**: Gestiona los administradores del sistema con roles definidos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre completo del administrador | Sí | No | - |
| avatar | String | URL de la imagen de perfil | No | No | - |
| phone | String | Número de teléfono | No | No | - |
| email | String | Correo electrónico | Sí | Sí | - |
| password | String | Contraseña encriptada | Sí | No | - |
| status | String | Estado del admin (active/inactive/suspended) | Sí | No | - |
| role | String | Rol (super_admin/admin/moderator) | Sí | No | - |
| createdBy | ObjectId | Admin que creó el registro | No | No | admins |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedBy | ObjectId | Admin que actualizó el registro | No | No | admins |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedBy | ObjectId | Admin que eliminó el registro | No | No | admins |
| deletedAt | Number | Timestamp de eliminación lógica | No | No | - |

### 2. USERS (users)

**Propósito**: Representa a los usuarios de la plataforma.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| accounts | [ObjectId] | Cuentas asociadas al usuario | No | No | accounts |
| email | String | Correo electrónico | Sí | Sí | - |
| password | String | Contraseña encriptada | Sí | No | - |
| firstName | String | Nombre | Sí | No | - |
| lastName | String | Apellido | Sí | No | - |
| avatar | String | URL de imagen de perfil | No | No | - |
| phone | String | Número de teléfono | No | No | - |
| phonePrefix | String | Prefijo telefónico del país | No | No | - |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación lógica | No | No | - |

### 3. ACCOUNTS (accounts)

**Propósito**: Entidad central para clientes, pueden ser individuos o entidades legales.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre de la cuenta | Sí | No | - |
| taxId | String | Identificador fiscal | No | No | - |
| email | String | Correo electrónico | Sí | No | - |
| phone | String | Teléfono | No | No | - |
| phonePrefix | String | Prefijo telefónico | No | No | - |
| avatar | String | URL de imagen | No | No | - |
| address | String | Dirección física | No | No | - |
| city | String | Ciudad | No | No | - |
| zip | String | Código postal | No | No | - |
| state | ObjectId | Provincia/Estado | No | No | provinces |
| country | ObjectId | País | No | No | countries |
| activity | String | Actividad económica | No | No | - |
| incomeTaxType | String | Tipo de impuesto sobre ingresos | No | No | - |
| vatType | String | Tipo de IVA | No | No | - |
| type | String | Tipo de cuenta (individual/business) | Sí | No | - |
| status | String | Estado (active/inactive/suspended/pending) | Sí | No | - |
| balance | [Object] | Balances por moneda | No | No | - |
| verifiedAt | Number | Timestamp de verificación general | No | No | - |
| emailVerifiedAt | Number | Timestamp de verificación de email | No | No | - |
| phoneVerifiedAt | Number | Timestamp de verificación de teléfono | No | No | - |
| fiscalVerifiedAt | Number | Timestamp de verificación fiscal | No | No | - |
| serviceConfig | Object | Configuración de servicios | No | No | - |
| webhooks | Mixed | Configuración de webhooks | No | No | - |
| users | [Object] | Usuarios asociados | No | No | users |
| benefits | [Object] | Beneficios aplicados | No | No | benefits |
| referredBy | ObjectId | Cuenta que refirió | No | No | accounts |
| referralCode | String | Código de referidos | No | Sí | - |
| referralBalance | Number | Balance de referidos | No | No | - |
| expiration | Number | Fecha de expiración | No | No | - |
| createdBy | ObjectId | Usuario creador | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |

### 4. RECEIPTS (receipts)

**Propósito**: Detalles de transacciones de pago.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| status | String | Estado del recibo | Sí | No | - |
| statusMessage | String | Mensaje de estado | No | No | - |
| amount | Number | Monto base | Sí | No | - |
| total | Number | Total en moneda local | Sí | No | - |
| totalUSD | Number | Total en USD | Sí | No | - |
| subtotal | Number | Subtotal en moneda local | Sí | No | - |
| subtotalUSD | Number | Subtotal en USD | Sí | No | - |
| currency | String | Moneda | Sí | No | - |
| exchangeRate | Number | Tasa de cambio | Sí | No | - |
| extra | [Object] | Cargos extras | No | No | - |
| discount | Object | Descuento aplicado | No | No | - |
| searches | [Object] | Búsquedas incluidas | No | No | - |
| paymentMethod | ObjectId | Método de pago | No | No | payment_methods |
| transactionId | String | ID de transacción externa | No | No | - |
| transactionUrl | String | URL de transacción | No | No | - |
| benefit | ObjectId | Beneficio aplicado | No | No | benefits |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| statement | ObjectId | Estado de cuenta | No | No | statements |
| createdBy | ObjectId | Usuario creador | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| expiredAt | Number | Timestamp de expiración | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 5. STATEMENTS (statements)

**Propósito**: Registros de acciones de cuenta.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| data | Object | Datos del estado de cuenta | Sí | No | - |
| file | ObjectId | Archivo adjunto | No | No | files |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| createdBy | ObjectId | Usuario creador | No | No | users |
| updatedBy | ObjectId | Usuario que actualizó | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |

### 6. MOVEMENTS (movements)

**Propósito**: Rastrea transacciones y uso de servicios.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| description | String | Descripción del movimiento | Sí | No | - |
| status | String | Estado (pending/processing/completed/failed) | Sí | No | - |
| searches | [Object] | Búsquedas realizadas | No | No | proxies |
| request | ObjectId | Solicitud asociada | No | No | requests |
| receipt | ObjectId | Recibo asociado | No | No | receipts |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| createdBy | ObjectId | Usuario creador | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| expired | Boolean | Indica si expiró | No | No | - |
| expirationAt | Number | Timestamp de expiración | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 7. REQUESTS (requests)

**Propósito**: Registra solicitudes de servicios específicos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| type | String | Tipo de solicitud | Sí | No | - |
| tag | ObjectId | Etiqueta de cuenta | No | No | account_tags |
| countryCode | String | Código de país | Sí | No | - |
| isDuplicated | Boolean | Indica si es duplicado | No | No | - |
| metadata | Object | Metadatos adicionales | No | No | - |
| prompts | Object | Prompts utilizados | No | No | - |
| intelligenceData | Mixed | Datos de inteligencia | No | No | - |
| response | String | Respuesta generada | No | No | - |
| error | Object | Error si ocurrió | No | No | - |
| expiresAt | Date | Fecha de expiración | No | No | - |
| status | String | Estado de la solicitud | Sí | No | - |
| version | String | Versión del servicio | No | No | - |
| relations | [Object] | Solicitudes relacionadas | No | No | requests |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| user | ObjectId | Usuario solicitante | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 8. PROXIES (proxies)

**Propósito**: Define servicios disponibles y sus costos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre del proxy | Sí | No | - |
| countryCode | String | Código de país | Sí | No | - |
| services | [Object] | Servicios disponibles | No | No | admins |
| currency | String | Moneda de operación | Sí | No | - |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 9. BENEFITS (benefits)

**Propósito**: Almacena ofertas especiales y descuentos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre del beneficio | Sí | No | - |
| description | String | Descripción | Sí | No | - |
| termsAndConditions | String | Términos y condiciones | No | No | - |
| code | String | Código del beneficio | Sí | Sí | - |
| advantage | Object | Tipo y valor de ventaja | Sí | No | - |
| isEnabled | Boolean | Si está activo | Sí | No | - |
| startDate | Number | Fecha de inicio | No | No | - |
| endDate | Number | Fecha de fin | No | No | - |
| beneficiaries | Number | Número de beneficiarios | No | No | - |
| uses | [ObjectId] | Cuentas que lo usaron | No | No | accounts |
| minimumPurchase | Number | Compra mínima | No | No | - |
| selfApply | Boolean | Auto-aplicable | No | No | - |
| createdBy | ObjectId | Admin creador | No | No | admins |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedBy | ObjectId | Admin que actualizó | No | No | admins |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedBy | ObjectId | Admin que eliminó | No | No | admins |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 10. REFERRALS (referrals)

**Propósito**: Rastrea transacciones basadas en referidos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| type | String | Tipo (credit/debit) | Sí | No | - |
| amount | Number | Monto de la transacción | Sí | No | - |
| balance | Number | Balance resultante | Sí | No | - |
| account | ObjectId | Cuenta principal | Sí | No | accounts |
| referred | ObjectId | Cuenta referida | No | No | accounts |
| receipt | ObjectId | Recibo asociado | No | No | receipts |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 11. ACCOUNT_APIS (account_apis)

**Propósito**: Gestiona acceso API para cuentas.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| active | Boolean | Si está activa | Sí | No | - |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| apiKey | String | Clave API | Sí | Sí | - |
| webhook | String | URL del webhook | No | No | - |
| createdBy | ObjectId | Usuario creador | No | No | users |
| updatedBy | ObjectId | Usuario que actualizó | No | No | users |
| deletedBy | ObjectId | Usuario que eliminó | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 12. COUNTRIES (countries)

**Propósito**: Almacena datos de países.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre del país | Sí | No | - |
| alpha2Code | String | Código ISO Alpha-2 | Sí | Sí | - |
| alpha3Code | String | Código ISO Alpha-3 | Sí | Sí | - |
| callingCode | String | Código telefónico | Sí | No | - |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |

### 13. PROVINCES (provinces)

**Propósito**: Almacena datos de provincias/estados.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre de la provincia | Sí | No | - |
| country | ObjectId | País al que pertenece | Sí | No | countries |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |

### 14. CURRENCIES (currencies)

**Propósito**: Define monedas y tasas de cambio.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre de la moneda | Sí | No | - |
| decimal | Number | Decimales a mostrar | Sí | No | - |
| exchangeRate | [Object] | Tasas de cambio | No | No | - |
| discounts | [Object] | Descuentos por método de pago | No | No | payment_methods |
| paymentMethod | ObjectId | Método de pago predeterminado | No | No | payment_methods |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |

### 15. PAYMENT_METHODS (payment_methods)

**Propósito**: Lista métodos de pago disponibles.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| type | String | Tipo de método de pago | Sí | No | - |
| name | String | Nombre del método | Sí | No | - |
| description | String | Descripción | No | No | - |
| icon | String | URL del ícono | No | No | - |
| color | String | Color asociado | No | No | - |
| credentials | Object | Credenciales de configuración | No | No | - |
| isEnabled | Boolean | Si está habilitado | Sí | No | - |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 16. FILES (files)

**Propósito**: Maneja metadatos de almacenamiento de archivos.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| fileName | String | Nombre del archivo | Sí | No | - |
| fileSize | Number | Tamaño en bytes | Sí | No | - |
| fileType | String | Tipo MIME | Sí | No | - |
| urlView | String | URL para visualización | No | No | - |
| urlDownload | String | URL para descarga | No | No | - |
| storageKey | String | Clave de almacenamiento | Sí | No | - |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 17. PARAMETERS (parameters)

**Propósito**: Almacena parámetros de configuración del sistema.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| country | ObjectId | País asociado | Sí | No | countries |
| activities | [Object] | Actividades económicas | No | No | - |
| incomeTaxType | [Object] | Tipos de impuesto sobre ingresos | No | No | - |
| salaryRange | [Object] | Rangos salariales | No | No | - |
| vatType | [Object] | Tipos de IVA | No | No | - |

### 18. ACCOUNT_TAGS (account_tags)

**Propósito**: Permite a las cuentas categorizar servicios.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| name | String | Nombre de la etiqueta | Sí | No | - |
| type | String | Tipo de etiqueta | Sí | No | - |
| account | ObjectId | Cuenta asociada | Sí | No | accounts |
| createdBy | ObjectId | Usuario creador | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

### 19. CONFIG (config)

**Propósito**: Almacena la configuración global del sistema para búsquedas, referidos y beneficios.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| searches.expirations.time | Number | Tiempo de expiración en días | Sí | No | - |
| searches.expirations.isEnabled | Boolean | Si la expiración está habilitada | Sí | No | - |
| referrals.account.isEnabled | Boolean | Si está habilitado para cuentas | Sí | No | - |
| referrals.account.type | String | Tipo (percentage/amount) | Sí | No | - |
| referrals.account.amount | Number | Cantidad o porcentaje | Sí | No | - |
| referrals.account.maxAmount | Number | Monto máximo | Sí | No | - |
| referrals.referred.isEnabled | Boolean | Si está habilitado para referidos | Sí | No | - |
| referrals.referred.type | String | Tipo (percentage/amount) | Sí | No | - |
| referrals.referred.amount | Number | Cantidad o porcentaje | Sí | No | - |
| referrals.referred.maxAmount | Number | Monto máximo | Sí | No | - |
| referrals.limits.referrals | Number | Límite de referidos por cuenta | Sí | No | - |
| referrals.limits.referred | Number | Límite de veces referido | Sí | No | - |
| referrals.minAmount | Number | Monto mínimo para referidos | Sí | No | - |
| benefit.firstPurchase.isEnabled | Boolean | Si está habilitado | Sí | No | - |
| benefit.firstPurchase.type | String | Tipo (percentage/amount) | Sí | No | - |
| benefit.firstPurchase.amount | Number | Cantidad o porcentaje | Sí | No | - |
| benefit.firstPurchase.maxAmount | Number | Monto máximo del beneficio | Sí | No | - |
| createdAt | Date | Timestamp de creación | Sí | No | - |
| updatedAt | Date | Timestamp de actualización | Sí | No | - |

### 20. INVITATIONS (invitations)

**Propósito**: Gestiona invitaciones para unirse a cuentas.

| Campo | Tipo | Descripción | Requerido | Único | Referencias |
|-------|------|-------------|-----------|-------|-------------|
| id | Number | Identificador numérico único | Sí | Sí | - |
| uid | String | Identificador único universal | Sí | Sí | - |
| account | ObjectId | Cuenta que invita | Sí | No | accounts |
| user | ObjectId | Usuario invitado | No | No | users |
| email | String | Email del invitado | Sí | No | - |
| role | String | Rol asignado | Sí | No | - |
| status | String | Estado (pending/accepted/rejected/expired) | Sí | No | - |
| createdBy | ObjectId | Usuario que creó la invitación | No | No | users |
| createdAt | Number | Timestamp de creación | Sí | No | - |
| updatedAt | Number | Timestamp de actualización | No | No | - |
| expiredAt | Number | Timestamp de expiración | No | No | - |
| deletedAt | Number | Timestamp de eliminación | No | No | - |

## Relaciones Clave

### Jerarquía de Usuarios

- **Users** pueden pertenecer a múltiples **Accounts**
- **Accounts** pueden tener múltiples **Users** con diferentes roles
- **Admins** son independientes de Users y gestionan el sistema

### Flujo de Transacciones

1. **User** crea una **Request** para un servicio
2. La **Request** genera un **Movement** que trackea el uso
3. Se crea un **Receipt** para el cobro
4. El **Receipt** actualiza el balance en **Account**
5. Se puede generar un **Statement** como comprobante

### Sistema de Beneficios

- **Benefits** se crean y aplican a **Accounts**
- Los **Receipts** pueden incluir descuentos de **Benefits**
- **Referrals** trackean beneficios por referidos

### Configuración Regional

- **Countries** y **Provinces** definen ubicaciones
- **Currencies** maneja múltiples monedas y tasas de cambio
- **Parameters** almacena configuraciones específicas por país

## Consideraciones de Diseño

### Soft Deletes

La mayoría de las colecciones implementan eliminación lógica mediante el campo `deletedAt`, permitiendo recuperación de datos y auditoría.

### Timestamps

Se utilizan timestamps numéricos (Unix timestamp en milisegundos) en lugar de Date objects para consistencia y facilidad de ordenamiento.

### Referencias Circulares

- **Accounts** puede referirse a sí misma vía `referredBy`
- **Requests** puede tener relaciones con otras **Requests**
- **Admins** se auto-referencian para tracking de cambios

### Campos de Auditoría

Las colecciones principales incluyen:

- `createdBy`: Quién creó el registro
- `updatedBy`: Quién lo actualizó por última vez
- `deletedBy`: Quién lo eliminó (soft delete)

### Flexibilidad

Varios campos utilizan `Mixed` o `Object` types para permitir estructuras dinámicas:

- `webhooks` en Accounts
- `intelligenceData` en Requests
- `credentials` en PaymentMethods

## Índices Recomendados

### Índices Únicos

- Todos los campos `id` y `uid`
- `email` en Users y Admins
- `code` en Benefits
- `apiKey` en AccountApis
- `referralCode` en Accounts (sparse)
- Códigos ISO en Countries

### Índices de Búsqueda

- `account` en todas las colecciones relacionadas
- `status` en colecciones con estados
- `createdAt` para ordenamiento temporal
- `country` y `countryCode` para filtros geográficos

### Índices Compuestos

- `[account, status]` en Movements y Requests
- `[account, createdAt]` para historial
- `[type, status]` en Requests
- `[country, type]` en Parameters
