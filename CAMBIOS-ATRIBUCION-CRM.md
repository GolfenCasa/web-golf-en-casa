# Atribución, CRM y medición

Actualizado el 18 de septiembre de 2026. Cambios preparados en local, pendientes de despliegue y comprobación con servicios reales.

## Formularios y CRM

- El navegador conserva durante 30 días el primer y el último contacto de adquisición solo después de obtener consentimiento analítico o publicitario de CookieYes. Los identificadores publicitarios requieren consentimiento publicitario; al retirarlo se eliminan de las copias propias de atribución.
- Los formularios envían el contrato histórico y, además, `version`, `attributionModel`, `firstTouch` y `lastTouch`.
- Los campos planos de fuente, medio, campaña y landing representan el contacto seleccionado, normalmente el último.
- Los identificadores planos (`gclid`, `gbraid`, `wbraid`, `fbclid` y `msclkid`) usan el contacto seleccionado y, si están vacíos, recuperan el identificador del otro contacto. Así un recorrido Google Ads → Meta no pierde el GCLID inicial.
- Las tres funciones de leads validan y sanean el mismo contrato mediante `api/_lib/lead-attribution.js`.
- El email de aviso y el objeto enviado al CRM muestran por separado el primer y el último contacto.
- El origen declarado se normaliza únicamente al enviar al CRM para respetar sus valores admitidos: por ejemplo, «Ya conocía Aquí Golf» se envía como el valor histórico «Ya conocía Golf en Casa». La interfaz y el correo conservan la respuesta original.

Ejemplo de lectura recomendada en el CRM para Google Ads:

1. `attribution.lastTouch.gclid` si existe.
2. `attribution.firstTouch.gclid` si existe.
3. `attribution.gclid` para registros históricos o compatibilidad.

`gclid`, `gbraid` y `wbraid` son identificadores diferentes y no deben copiarse entre columnas.

## Google Tag Manager y conversiones mejoradas

- Todos los eventos `generate_lead` se emiten solo después de que la API confirme el envío.
- Cada evento incluye un `form_name` estable. `user_data.email_address` y, cuando corresponda, `user_data.phone_number` se incluyen solo con consentimiento publicitario; de lo contrario `user_data` es `null` para borrar valores anteriores.
- Los formularios activos exponen un único `#email` y `#phone` para mantener compatibilidad con la configuración actual de GTM. En el modal técnico de Signature solo se expone `#email` porque no se solicita teléfono.
- `landing_page` y `conversion_page` de `dataLayer` contienen únicamente el pathname. Las queries con click IDs permanecen en el envío privado al CRM y no se publican en analítica.
- Los eventos auxiliares existentes se conservan. En GTM, solo `generate_lead` debe activar la conversión de lead para evitar duplicados.

## Calendly

- Home, Instalación, Estudio, Signature ES/EN y CARE transmiten a Calendly únicamente `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term`.
- Cada valor UTM se limita a 255 caracteres.
- No se envían GCLID, FBCLID, otros click IDs ni datos personales en la URL.
- Los enlaces se recalculan en la interacción para evitar perder la campaña si el usuario pulsa antes de que termine el efecto de React.
- El nombre histórico de cada evento se mantiene hasta revisar los triggers reales del contenedor GTM.

Calendly no queda unido todavía al CRM por reserva. Para esa fase se necesita un webhook `invitee.created`, idempotencia por URI/UUID y un upsert en el CRM. Si se necesita recuperar click IDs, debe pasarse un token opaco y resolverlo en el servidor; nunca exponer los IDs en la URL de Calendly.

## WhatsApp

- Se mantienen las referencias `GADS`, `META`, `MSADS`, `YT`, `GORG`, `DIRECT` y `WEB`.
- Los enlaces de CARE ya usan la misma atribución que el resto de la web e incluyen página y botón sin queries sensibles.
- Los eventos conservan sus nombres actuales para no romper triggers ya publicados.

## Dependencias pendientes antes de considerar cerrada la medición

- Revisar en GTM Preview que la etiqueta de conversión escucha únicamente `generate_lead`, toma `form_name` desde `dataLayer` y recibe los datos de usuario con consentimiento.
- Confirmar que el importador de Google Ads usa solo leads cualificados del CRM como conversión principal; el envío web puede quedar como conversión secundaria.
- Comprobar con el banner real los estados inicial, aceptación parcial, aceptación total y retirada. La política local ya impide leer/escribir atribución sin consentimiento y está cubierta con pruebas automatizadas. Esta comprobación no sustituye una auditoría jurídica ni de todas las etiquetas externas.
- First/last touch no conserva un clic Google intermedio en un recorrido de tres canales. Si ese caso aparece en datos reales, añadir un `lastGoogleAdsTouch` específico.
- El CRM dispone de 15 segundos para confirmar, Resend de 10 y la función de 30. La API devuelve `crmStatus` (confirmed, rejected, unconfirmed o not_configured) además del contrato anterior. Una respuesta incierta no se reintenta: puede haber escrito la fila. Antes de introducir reintentos debe existir idempotencia en el receptor. El correo sigue siendo respaldo operativo.
- La rama `aqui-golf-preview` dispone de una URL protegida en Vercel con CookieYes de staging independiente. GTM sigue desactivado en Preview: comprobar el banner allí no demuestra que todas las etiquetas reales funcionen.

## Verificación local

```bash
npm ci
npm run verify:local
npm run preview:ssg
```

La verificación automatizada cubre atribución Google→Meta, saneado de URLs analíticas, enlaces Calendly, las tres APIs, entrega al CRM simulada, build SSG y controles SEO de todas las rutas.
