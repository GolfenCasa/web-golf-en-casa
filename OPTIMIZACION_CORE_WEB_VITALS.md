# Optimización Core Web Vitals

## Cambios aplicados

1. **Separación real por rutas**
   - La portada, la landing de instalación, CARE y el gestor de enlaces se cargan mediante `React.lazy`.
   - La landing ya no descarga el código de Framer Motion y de la portada en su carga inicial.

2. **Vídeo principal de la landing**
   - Se ha generado `public/video_promocion3-poster.webp` (aprox. 42 KB).
   - El MP4 ya no se descarga durante la carga inicial.
   - El usuario ve una portada ligera y el vídeo solo se descarga al pulsar reproducir.
   - Se mantienen dimensiones explícitas para evitar CLS.

3. **Vídeo de la portada**
   - Se ha sustituido el MP4 original de unos 42 MB por la versión optimizada de unos 3 MB.
   - Se ha eliminado el archivo original pesado.
   - Se usa `preload="none"` y una portada WebP.

4. **Caché de recursos estáticos**
   - `vercel.json` añade `Cache-Control: public, max-age=31536000, immutable` para imágenes, vídeos, logos, fuentes y assets versionados.

5. **Golf Studio**
   - Se conservan `picture`, `srcSet`, `sizes`, WebP responsive, dimensiones explícitas, lazy loading y `content-visibility`.

## Comparación del build

Antes:
- Bundle principal: 97,74 KB (21,46 KB gzip)
- La portada y la landing se importaban de forma inmediata.

Después:
- Bootstrap principal: 3,23 KB (1,26 KB gzip)
- Landing: 61,55 KB (13,96 KB gzip), cargada solo en su ruta.
- Portada: 34,61 KB (8,35 KB gzip), cargada solo en `/`.

## Despliegue

1. Sustituir el proyecto por esta versión.
2. Ejecutar `npm install` y `npm run build`.
3. Subir a GitHub.
4. Desplegar en Vercel sin reutilizar la caché del build anterior.
5. Repetir PageSpeed Insights varias veces y comparar la mediana.

## Nota sobre GTM y CookieYes

No se ha retrasado Google Tag Manager para no alterar el consentimiento ni la medición de conversiones. Si el LCP o el TBT siguen altos, el siguiente análisis debe centrarse en la ejecución de GTM/CookieYes y en las etiquetas activadas durante la carga inicial.
