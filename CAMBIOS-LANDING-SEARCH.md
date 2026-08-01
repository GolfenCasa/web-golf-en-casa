# Cambios realizados

## Landing Search
- Hero alineado con la intención de búsqueda: instalación de simuladores de golf en España.
- CTA principal unificado como "Solicitar estudio gratuito".
- Mensajes de confianza y respuesta en 48 horas reforzados.
- Seguimiento diferenciado con `landing_version: google_ads_search_v3` y `traffic_source: google_search_ads`.
- Seguimiento añadido al botón de WhatsApp posterior al formulario.
- Se mantiene `noindex,follow` y canonical a la landing original mientras se realiza el test A/B.

## Identidad visual
- Sustitución del logo anterior por `/logo-mail4.png` en:
  - página principal;
  - landing original;
  - landing Search;
  - página CARE;
  - datos estructurados de la web.

## Validación
- Los archivos JSX modificados superan validación sintáctica con `@babel/parser`.
- No se pudo ejecutar el build completo en este entorno porque las dependencias incluidas en el ZIP son de Windows y falta el binario nativo Linux de Rolldown. En tu equipo, ejecuta `npm install` y `npm run build`.
