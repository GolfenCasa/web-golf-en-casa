# Gestor de enlaces dinámicos — instalación con Upstash Redis

> Nota: Vercel KV ya no está disponible para proyectos nuevos. Su sustituto es Upstash Redis desde Vercel Marketplace.

## 1. Instalar Upstash Redis en Vercel

1. Abre tu proyecto en Vercel.
2. Ve a **Storage** o **Marketplace**.
3. Busca **Upstash for Redis**.
4. Instala la integración y vincúlala al proyecto `web-golf-en-casa`.
5. Crea una base de datos en una región europea próxima (por ejemplo, París/Frankfurt, según disponibilidad).
6. Selecciona el plan gratuito para empezar.
7. Comprueba que Vercel haya creado variables como `KV_REST_API_URL` y `KV_REST_API_TOKEN`, o sus equivalentes `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.

El SDK usa `Redis.fromEnv()` y detecta las variables proporcionadas por la integración.

## 2. Contraseña del panel

En **Settings → Environment Variables**, crea:

- `LINK_ADMIN_PASSWORD`: una contraseña larga y única.

Aplícala a Production y Preview. Después haz un nuevo despliegue.

## 3. Instalación local

Elimina el `package-lock.json` anterior si contiene URLs internas y ejecuta:

```powershell
npm config set registry https://registry.npmjs.org/
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
npm install
npm run build
```

Para trabajar localmente con la base de datos conectada:

```powershell
npm install -g vercel
vercel link
vercel env pull .env.local
npm run dev
```

## 4. Dominios y rutas

- Panel: `https://www.golfencasa.net/admin/enlaces`
- Enlaces públicos: `https://go.golfencasa.net/<alias>`

Mantén `go.golfencasa.net` añadido al mismo proyecto y configura en SiteGround el CNAME exacto que indique Vercel.

## 5. Blob anterior

El Blob privado creado previamente ya no se usa. Puedes eliminarlo desde Vercel para evitar confusión; actualmente está vacío, por lo que no hay datos que migrar.
