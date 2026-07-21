# Gestor de enlaces y QR — instalación

## 1. Dependencias

El proyecto ya incluye `qrcode` y `@vercel/blob` en `package.json` y `package-lock.json`.

```powershell
npm install
npm run build
```

## 2. Vercel Blob

Crea un Blob Store **Private**, con región París, y conéctalo al proyecto para Production y Preview.

La conexión debe crear `BLOB_STORE_ID` y `BLOB_WEBHOOK_PUBLIC_KEY`. Vercel usa OIDC automáticamente en producción. Puedes marcar también “Add a read-write token…” para facilitar pruebas locales.

## 3. Contraseña

En Vercel > Settings > Environment Variables crea:

`LINK_ADMIN_PASSWORD`

Actívala para Production y Preview. Después haz un Redeploy.

## 4. Subdominio

Añade `go.golfencasa.net` al mismo proyecto de Vercel. En SiteGround crea el CNAME que Vercel te indique para el host `go`.

## 5. Panel

`https://www.golfencasa.net/admin/enlaces`

Los enlaces creados tendrán esta forma:

`https://go.golfencasa.net/camiseta`

## 6. Funciones incluidas

- Alta, edición, pausa y eliminación de enlaces.
- Carpetas, búsqueda, notas y actividad reciente.
- Contador básico de clics.
- Descarga de QR en PNG y SVG.
- Sesión administrativa mediante cookie HttpOnly firmada.
- Redirección 302 para que el destino pueda cambiar sin reimprimir el QR.

## Nota sobre estadísticas

El contador está pensado para un volumen pequeño o medio. Si en el futuro hay muchos escaneos simultáneos, conviene mover las métricas a una base de datos transaccional o a un sistema de analítica dedicado.
