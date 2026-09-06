# Checklist de despliegue — 3 de septiembre de 2026

## Preview

- [ ] Ejecutar `npm ci`.
- [ ] Ejecutar `npm run verify:local` sin errores.
- [ ] Ejecutar `npm run preview:ssg` y revisar Home, Instalación, Estudio, Signature ES/EN, CARE, Precios, Medidas y Proyectos.
- [ ] Crear un nuevo despliegue Preview en Vercel, sin promoverlo a producción.
- [ ] Comprobar navegación móvil, formulario y enlaces de proyectos.
- [ ] Comprobar que Calendly conserva los cinco UTM y no contiene click IDs.
- [ ] Con autorización expresa, enviar un único lead sintético y confirmar recepción en email y CRM.

## Etiquetas

GTM está desactivado deliberadamente en dominios `*.vercel.app`. Por tanto, un Preview estándar permite validar la aplicación y `dataLayer`, pero no certifica CookieYes, GA4, Google Ads, Meta o Clarity.

Antes de producción, revisar el contenedor:

- [ ] `generate_lead` es el único evento que dispara la conversión de formulario.
- [ ] `form_name` se lee desde una variable de capa de datos, no desde el DOM.
- [ ] La conversión mejorada lee `user_data.email_address` y `user_data.phone_number`, con `#email`/`#phone` como compatibilidad.
- [ ] CookieYes actualiza `analytics_storage`, `ad_storage`, `ad_user_data` y `ad_personalization` según la elección.
- [ ] Meta, Clarity, GA4 y Ads no disparan antes del consentimiento correspondiente.
- [ ] La conversión principal de Ads es el lead cualificado importado desde CRM; el lead enviado desde la web es secundario.

## Producción

- [ ] Promover exactamente el Preview aprobado.
- [ ] Probar una visita sin consentimiento: no deben salir hits de marketing o analítica.
- [ ] Aceptar cookies y comprobar Tag Assistant, GA4 DebugView, Meta Pixel Helper y Clarity.
- [ ] Probar una URL de campaña con UTM y un GCLID sintético reservado para QA; verificar que la query no aparece en `dataLayer`.
- [ ] Enviar un lead de prueba autorizado y confirmar email, CRM, first/last touch y un solo `generate_lead`.
- [ ] Verificar canonical, sitemap, robots, 404 y cabeceras `noindex` de las rutas de campaña/admin.
- [ ] Si falla una comprobación crítica, volver inmediatamente al deployment anterior de Vercel.
