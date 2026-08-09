# Cambios de atribución para CRM

## WhatsApp
- Todos los CTA de WhatsApp de `LandingSimuladoresGolf.jsx` incluyen una referencia compacta en el mensaje inicial.
- Códigos actuales: `GADS` (Google Ads), `META` (Meta Ads), `YT` (YouTube), `GORG` (Google orgánico), `DIRECT` (acceso directo) y `WEB` (resto de tráfico web/referral).
- El evento `click_whatsapp` incorpora también `whatsapp_reference` en `dataLayer`.

## Formulario de estudio
- Se añade la pregunta obligatoria `¿Cómo nos has conocido?`.
- Valores: Google, Instagram / Facebook, YouTube, Recomendación, Ya conocía Golf en Casa, Otro, No sabe / No recuerda.
- El valor se envía como `source_declared` en `generate_lead` y `form_submit`.
- El email de solicitud incluye `¿Cómo nos ha conocido?` y mantiene separada la atribución técnica (`Origen técnico del lead`, UTM, GCLID, FBCLID).

## Sin cambios
- No se modifica la lógica existente de captura/persistencia de UTM, GCLID, FBCLID ni `localStorage`.
- No se modifica la lógica del evento Meta Lead ni las etiquetas de GTM.
- Calendly queda pendiente de la siguiente fase.

## Fase Calendly
- Los botones de Calendly de la landing heredan automáticamente `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term` de la atribución persistida.
- No se añade GCLID/FBCLID a Calendly.
- El evento `click_calendly` mantiene la medición existente en dataLayer.
