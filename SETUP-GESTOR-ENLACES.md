# Puesta en marcha del gestor de enlaces

## 1. Crear almacenamiento Blob en Vercel

1. Abre el proyecto en Vercel.
2. Ve a **Storage** → **Create Database** → **Blob**.
3. Selecciona acceso **Private**.
4. Conecta el almacén al proyecto y a los entornos Production y Preview.

Vercel añadirá automáticamente las variables necesarias del almacén.

## 2. Crear la contraseña administrativa

En **Settings → Environment Variables**, crea:

- Nombre: `LINK_ADMIN_PASSWORD`
- Valor: una contraseña larga y única
- Entornos: Production y Preview
- Tipo: Sensitive

Después vuelve a desplegar el proyecto.

## 3. Conectar el subdominio

En Vercel, añade `go.golfencasa.net` al mismo proyecto.

En SiteGround crea el CNAME exacto que Vercel indique. Antes elimina los registros DNS incompatibles que ya utilicen el host `go`.

## 4. Acceder al panel

Abre:

`https://www.golfencasa.net/admin/enlaces`

Introduce la contraseña configurada en Vercel.

## 5. Crear el primer enlace

Ejemplo:

- Alias: `camiseta`
- Nombre: `QR camiseta corporativa`
- Destino:

`https://www.golfencasa.net/instalacion-simuladores-golf?utm_source=camiseta&utm_medium=qr&utm_campaign=branding`

El enlace dinámico será:

`https://go.golfencasa.net/camiseta`

Desde el panel puedes descargar su QR en PNG. Puedes cambiar posteriormente la URL de destino sin modificar el enlace público ni reimprimir el QR.

## Nota sobre estadísticas

El contador incluido es orientativo. Para analizar conversiones y fuentes de tráfico, utiliza principalmente GA4 y los parámetros UTM.
