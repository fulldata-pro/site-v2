# Servicio de Subida de Archivos con AWS S3 y CloudFront

Este documento describe cómo configurar y usar el servicio de subida de archivos con AWS S3 y CloudFront para cache y CDN.

## Configuración de AWS

### 1. Crear un Bucket de S3

1. Ve a la consola de AWS S3
2. Crea un nuevo bucket con un nombre único (ej: `fulldata-uploads-prod`)
3. Configura las siguientes opciones:
   - **Public Access Settings**: Permitir acceso público solo para lectura
   - **Bucket Policy**: Configurar para permitir lectura pública
   - **CORS Configuration**: Permitir requests desde tu dominio

### 2. Configurar IAM Usuario

1. Crea un usuario IAM específico para la aplicación
2. Asigna los siguientes permisos mínimos:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::tu-bucket-name/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::tu-bucket-name"
        }
    ]
}
```

### 3. Configurar CloudFront

1. Crea una distribución de CloudFront
2. Configura el origen apuntando a tu bucket S3
3. Configura el dominio personalizado si es necesario
4. Habilita compresión y cache optimizado para archivos estáticos

## Configuración de Variables de Entorno

Agrega las siguientes variables a tu archivo `.env.local`:

```bash
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=tu-bucket-name
AWS_CLOUDFRONT_DOMAIN=tu-dominio.cloudfront.net
```

## Uso del Servicio

### Subida de Avatar

El componente `AvatarUpload` permite a los usuarios subir su foto de perfil:

```tsx
<AvatarUpload
  currentAvatar={user.avatar}
  onAvatarChange={handleAvatarChange}
  userId={user.id}
  size="large"
  disabled={isLoading}
/>
```

### API Endpoints

#### POST `/api/upload/avatar`

Sube un avatar para un usuario específico.

**Parámetros:**

- `file`: Archivo de imagen (JPG, PNG, WEBP)
- `userId`: ID del usuario

**Respuesta:**

```json
{
  "success": true,
  "url": "https://tu-cloudfront-domain/avatars/user123/timestamp.jpg"
}
```

#### POST `/api/upload`

Subida general de archivos.

**Parámetros:**

- `file`: Archivo
- `userId`: ID del usuario
- `type`: Tipo de archivo ('avatar' o 'document')

#### DELETE `/api/upload?fileName=path/to/file`

Elimina un archivo del bucket S3.

### Validaciones

#### Imágenes (Avatares)

- **Tipos permitidos**: JPG, PNG, WEBP
- **Tamaño máximo**: 5MB
- **Validación automática** en el frontend y backend

#### Documentos

- **Configurable** según necesidades
- **Estructura de carpetas** automática por tipo y usuario

## Estructura de Archivos en S3

```none
bucket-root/
├── avatars/
│   ├── user123/
│   │   ├── 1638360000000.jpg
│   │   └── 1638360001000.png
│   └── user456/
│       └── 1638360002000.jpg
└── documents/
    ├── user123/
    │   ├── 1638360003000.pdf
    │   └── 1638360004000.docx
    └── user456/
        └── 1638360005000.pdf
```

## Seguridad

### Validación de Archivos

- **Tipo de archivo**: Validación por extensión y MIME type
- **Tamaño**: Límites configurables por tipo
- **Nombre**: Generación automática para evitar conflictos

### Permisos

- **Lectura pública**: Solo para archivos públicos (avatares)
- **Acceso autenticado**: Para documentos privados
- **Usuario específico**: Cada usuario solo puede acceder a sus archivos

## Costos y Optimización

### CloudFront

- **Cache TTL**: Configurado para archivos estáticos
- **Compresión**: Habilitada para reducir ancho de banda
- **Edge locations**: Distribución global automática

### S3

- **Almacenamiento**: Considera S3 IA para archivos poco accedidos
- **Transferencia**: CloudFront reduce costos de transferencia desde S3
- **Lifecycles**: Configura políticas de eliminación automática si es necesario

## Testing

Para probar el servicio localmente, necesitarás:

1. Configurar las variables de entorno
2. Asegurarte de que las credenciales AWS tengan los permisos correctos
3. Verificar que el bucket esté configurado correctamente

## Troubleshooting

### Error: AccessDenied

- Verifica que las credenciales AWS sean correctas
- Confirma que los permisos IAM estén configurados
- Revisa la configuración del bucket

### Error: CORS

- Configura CORS en el bucket S3
- Permite el dominio de tu aplicación

### Error: File too large

- Verifica los límites de tamaño en el código
- Considera aumentar el límite si es necesario
