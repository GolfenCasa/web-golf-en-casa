# Recuperación de asignaciones A/B — 28/09/2026

Estado: corrección local probada, pendiente de publicación autorizada.

## Diagnóstico

La versión pública y main corresponden a 0a2e838825582f5ab262afbdfc4b3e080a60bb34.
La web carga CookieYes mediante GTM de forma diferida. El código anterior trataba la API aún no disponible como rechazo, borraba la variante y no conservaba la exposición pendiente ni reintentaba al aceptar después de la redirección. Esto explica una vía reproducible de pérdida de ab_assignment; no prueba que todos los eventos ausentes se deban exclusivamente a ella.

CookieYes documenta que getCkyConsent solo está disponible una vez cargado el banner:
https://www.cookieyes.com/documentation/retrieving-consent-data-using-api-getckyconsent/

## Cambio

- Separar carga, decisión pendiente, aceptación y rechazo. Solo el rechazo explícito borra el almacenamiento A/B.
- Esperar la disponibilidad de CookieYes antes de recuperar una variante anterior. Límite de cinco segundos; si la CMP está bloqueada, se muestra control sin incorporar esa visita al experimento ni sobrescribir su variante guardada.
- Conservar en memoria la exposición de una nueva visita durante la navegación interna; no leer/escribir almacenamiento A/B ni emitir ab_assignment antes de aceptar analítica.
- Escuchar actualizaciones de CookieYes y comprobar su estado periódicamente mientras haya una exposición pendiente, hasta diez minutos.
- Emitir una sola vez cuando analítica esté aceptada y GTM cargado. Validar variante, versión y ruta. Cancelar temporizadores al salir.
- Centralizar la lógica de ambas landings. Conservar experimento, versiones, reparto aleatorio, parámetros de URL y destino GA4/GTM existentes.
- No cambiar GTM, CookieYes, Ads, formularios, CRM ni configuración de consentimiento publicitaria.

## Verificación

- Verificación local completa: atribución, 44 pruebas API, contrato de tracking, pruebas de consentimiento, compilación cliente/servidor, 24 rutas prerenderizadas y 689 comprobaciones SEO.
- Pruebas A/B: ambas variantes, CMP tardía, visitas recurrentes, aceptación tardía, rechazo/retirada, GTM tardío, almacenamiento bloqueado, cancelación/remontaje, expiración, recarga y duplicados, entrada directa, ruta incorrecta y previews.
- Prueba de navegador Chrome con el build real: ambas redirecciones React, parámetros de URL conservados, ausencia de almacenamiento previo al permiso y una sola asignación tras aceptarlo, sin errores JavaScript.
- Navegador de prueba completamente interceptado: ninguna petición analítica ni formulario se envía a servicios reales. La CMP y GTM están simulados en esa prueba.

## Publicación y validación pendientes

Confirmar permiso para publicar; comprobar que main sigue en la base indicada y publicar por el flujo Git/Vercel habitual, sin forzar ni mezclar cambios ajenos. Después verificar el nuevo bundle público y realizar una visita controlada mediante Tag Assistant con consentimiento, comprobando ab_assignment, variante, versión y respuesta de GA4. Confirmar posteriormente su aparición en el informe de Analytics.

Los eventos históricos no enviados no se recuperan con este cambio. No se deben interpretar como cero asignaciones ni usar ese periodo para comparar tasas de conversión del experimento. Los visitantes sin consentimiento analítico y los accesos directos a las landings no forman parte del denominador medido.

## Reproducción local

`npm run verify:local`

`node scripts/ab-browser-test.mjs` después de compilar, con Playwright disponible; alternativamente PLAYWRIGHT_PATH puede indicar su index.mjs. El navegador usa Chrome instalado y bloquea todo tráfico externo real.
