export default function CookiePolicyDetails({ english = false }) {
  const rows = english ? [
    ['cookieyes-consent', 'CookieYes · necessary', 'Remembers cookie preferences.', '1 year'],
    ['gec_link_admin', 'Aquí Golf · necessary', 'Authenticates the private link manager, only after administrator sign-in.', '12 hours'],
    ['_ga / _ga_*', 'Google Analytics · analytics', 'Distinguishes browsers and maintains session information.', '2 years'],
    ['_clck', 'Microsoft Clarity · analytics', 'Recognises returning browsers for usage analysis.', '1 year'],
    ['_clsk', 'Microsoft Clarity · analytics', 'Groups page views into a session recording.', '1 day'],
    ['_fbp / _fbc', 'Meta · advertising', 'Measures advertising visits and conversions. _fbc depends on a Meta ad click.', '90 days'],
    ['_gcl_au / _gcl_aw', 'Google Ads · advertising', 'Measures advertising conversions; availability depends on the visit and advertising features.', '90 days'],
  ] : [
    ['cookieyes-consent', 'CookieYes · necesaria', 'Recuerda la elección de cookies.', '1 año'],
    ['gec_link_admin', 'Aquí Golf · necesaria', 'Autentica el gestor privado de enlaces, solo al iniciar sesión como administrador.', '12 horas'],
    ['_ga / _ga_*', 'Google Analytics · analítica', 'Distingue navegadores y mantiene información de la sesión.', '2 años'],
    ['_clck', 'Microsoft Clarity · analítica', 'Reconoce navegadores recurrentes para analizar el uso de la web.', '1 año'],
    ['_clsk', 'Microsoft Clarity · analítica', 'Agrupa visitas a páginas en una grabación de sesión.', '1 día'],
    ['_fbp / _fbc', 'Meta · publicidad', 'Mide visitas y conversiones publicitarias. _fbc depende de un clic en un anuncio de Meta.', '90 días'],
    ['_gcl_au / _gcl_aw', 'Google Ads · publicidad', 'Mide conversiones publicitarias; su presencia depende de la visita y las funciones publicitarias.', '90 días'],
  ];
  return <div className="space-y-7">
    <p>{english ? 'Last updated: 19 September 2026. The website is operated by Francisco Menacho Valle, trading as Aquí Golf. Contact: ' : 'Actualización: 19 de septiembre de 2026. El responsable de esta web es Francisco Menacho Valle, bajo la marca Aquí Golf. Contacto: '}<a className="underline" href="mailto:info@aquigolf.es">info@aquigolf.es</a>.</p>
    <h2 className="text-2xl font-semibold">{english ? 'Cookies and your choices' : 'Cookies y tus opciones'}</h2>
    <p>{english ? 'Cookies are small files stored in your browser. Necessary cookies remember your consent. You can accept or reject optional analytics and advertising separately, and change your choice at any time.' : 'Las cookies son pequeños archivos que se guardan en tu navegador. Las necesarias permiten recordar el consentimiento. Puedes aceptar o rechazar por separado la analítica y la publicidad, y cambiar tu elección en cualquier momento.'}</p>
    <button type="button" className="cky-banner-element rounded-lg border border-current px-5 py-3 font-semibold underline underline-offset-4">{english ? 'Change cookie preferences' : 'Cambiar preferencias de cookies'}</button>
    <p>{english ? 'If this button is unavailable, use the floating cookie preferences icon. You can also delete cookies and site data in your browser settings. Withdrawing consent does not undo processing already carried out. Google measurement uses Consent Mode: when consent is denied, it may send measurement signals without storing analytics or advertising cookies.' : 'Si el botón no está disponible, utiliza el icono flotante de preferencias. También puedes borrar cookies y datos del sitio desde los ajustes del navegador. Retirar el consentimiento no anula los tratamientos ya realizados. La medición de Google utiliza Consent Mode: cuando rechazas el consentimiento, puede enviar señales de medición sin guardar cookies analíticas o publicitarias.'}</p>
    <h2 className="text-2xl font-semibold">{english ? 'Cookies associated with our services' : 'Cookies asociadas a nuestros servicios'}</h2>
    <p>{english ? 'The following are the main first-party cookies associated with the configured services. Their presence depends on your preferences, browser and visit. Durations are provider defaults and can renew on later visits; browser restrictions can shorten them.' : 'Estas son las principales cookies propias asociadas a los servicios configurados. Su presencia depende de tus preferencias, navegador y visita. Las duraciones son las predeterminadas por los proveedores y pueden renovarse con nuevas visitas; el navegador puede acortarlas.'}</p>
    <div className="overflow-x-auto rounded-lg border border-current/20">
      <table className="w-full min-w-[650px] text-left text-sm">
        <caption className="sr-only">{english ? 'Cookie inventory' : 'Inventario de cookies'}</caption>
        <thead><tr>{(english ? ['Name', 'Provider / purpose', 'Use', 'Default duration'] : ['Nombre', 'Proveedor / finalidad', 'Uso', 'Duración predeterminada']).map(h => <th key={h} scope="col" className="border-b border-current/20 p-3">{h}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="border-b border-current/10 p-3 font-medium">{cell}</th> : <td key={i} className="border-b border-current/10 p-3">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <h2 className="text-2xl font-semibold">{english ? 'Other browser storage' : 'Otro almacenamiento del navegador'}</h2>
    <p>{english ? 'With the relevant consent, golf_en_casa_attribution_v1 stores campaign attribution in local storage for 30 days. Advertising click identifiers require advertising consent. The analytics A/B test uses golf_en_casa_ab_landing_v1 for up to 30 days and golf_en_casa_ab_pending_v1 during the tab session, with a 10-minute validity window for a pending exposure. These are storage keys, not cookies. Without analytics consent the A/B test does not persist a variant or measure an exposure.' : 'Con el consentimiento correspondiente, golf_en_casa_attribution_v1 guarda la atribución de campañas en almacenamiento local durante 30 días. Los identificadores de clic publicitario requieren consentimiento publicitario. La prueba analítica A/B utiliza golf_en_casa_ab_landing_v1 durante un máximo de 30 días y golf_en_casa_ab_pending_v1 durante la sesión de la pestaña, con una validez de 10 minutos para una exposición pendiente. Son claves de almacenamiento, no cookies. Sin consentimiento analítico, la prueba A/B no guarda la variante ni mide la exposición.'}</p>
    <h2 className="text-2xl font-semibold">{english ? 'Third parties and further information' : 'Terceros y más información'}</h2>
    <p>{english ? 'Google, Meta and Microsoft may also use cookies on their own domains, depending on enabled features and browser restrictions. Their notices explain these cookies, their durations and international data processing. External links to YouTube, Calendly and WhatsApp lead to services with their own privacy and cookie settings.' : 'Google, Meta y Microsoft también pueden utilizar cookies en sus propios dominios, según las funciones habilitadas y las restricciones del navegador. Sus avisos explican esas cookies, sus duraciones y el tratamiento internacional de datos. Los enlaces externos a YouTube, Calendly y WhatsApp llevan a servicios con sus propias opciones de privacidad y cookies.'}</p>
    <ul className="list-disc space-y-2 pl-5">
      <li><a className="underline" href="https://www.cookieyes.com/privacy-policy/">CookieYes</a></li>
      <li><a className="underline" href="https://policies.google.com/technologies/cookies">Google</a></li>
      <li><a className="underline" href="https://www.facebook.com/privacy/policies/cookies/">Meta</a></li>
      <li><a className="underline" href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a></li>
      <li><a className="underline" href={english ? '/en/privacy-policy' : '/politica-privacidad'}>{english ? 'Our privacy policy and your rights' : 'Nuestra política de privacidad y tus derechos'}</a></li>
    </ul>
  </div>;
}
