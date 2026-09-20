export default function AdvertisingPrivacyDetails({ english = false }) {
  return (
    <section id={english ? 'advertising-measurement' : 'medicion-publicitaria'} className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold">{english ? 'Optional advertising measurement' : 'Medición publicitaria opcional'}</h2>
      {english ? <>
        <p>If you tick the optional advertising measurement box in a form, Aquí Golf may send Google and Meta hashed identifiers derived from your email address and phone number, an internal identifier, and the outcome of your enquiry: qualification, quotation or purchase, date and amount. These providers may match the identifiers to their information to measure which ads lead to enquiries and sales.</p>
        <p>Hashing transforms the identifiers but does not make the data anonymous. The permission covers measurement of your enquiry and its subsequent commercial outcome; it does not subscribe you to marketing messages or authorise customer-list advertising audiences.</p>
        <p>This choice is voluntary and separate from the processing needed to answer your enquiry. Leaving the box unticked does not affect your enquiry or quotation. Cookie and personalised advertising preferences are managed separately in CookieYes; accepting cookies alone does not authorise these CRM uploads.</p>
        <p>We record your choice, when it was received, the language and the notice version. You may withdraw this permission by emailing <a className="underline" href="mailto:info@aquigolf.es">info@aquigolf.es</a> from the address used for the enquiry. We will stop future measurement uploads for the identified contact and handle any applicable requests concerning previously sent data. Withdrawal does not affect processing already lawfully carried out. Changing cookies in a browser does not identify or update an existing CRM enquiry.</p>
      </> : <>
        <p>Si marcas la casilla opcional de medición publicitaria de un formulario, Aquí Golf podrá enviar a Google y Meta identificadores hash derivados de tu correo y teléfono, un identificador interno y el resultado de tu consulta: cualificación, presupuesto o compra, fecha e importe. Estos proveedores podrán cotejar los identificadores con su información para medir qué anuncios generan consultas y ventas.</p>
        <p>El hash transforma los identificadores, pero no convierte los datos en anónimos. El permiso comprende la medición de tu consulta y de su posterior resultado comercial; no te suscribe a comunicaciones promocionales ni autoriza audiencias publicitarias basadas en listas de clientes.</p>
        <p>Esta elección es voluntaria y está separada del tratamiento necesario para atenderte. No marcar la casilla no afecta a tu consulta ni a tu presupuesto. Las preferencias de cookies y publicidad personalizada se gestionan por separado en CookieYes; aceptar cookies por sí solo no autoriza estos envíos desde el CRM.</p>
        <p>Guardamos tu elección, la fecha de recepción, el idioma y la versión del aviso. Puedes retirar este permiso escribiendo a <a className="underline" href="mailto:info@aquigolf.es">info@aquigolf.es</a> desde la dirección utilizada en la consulta. Detendremos los futuros envíos de medición del contacto identificado y atenderemos las solicitudes que correspondan sobre datos ya enviados. La retirada no afecta al tratamiento realizado lícitamente con anterioridad. Cambiar las cookies del navegador no identifica ni actualiza una consulta ya guardada en el CRM.</p>
      </>}
      <p>
        {english ? 'More about the providers: ' : 'Más información sobre los proveedores: '}
        <a className="underline" href="https://policies.google.com/privacy">Google</a>{' · '}
        <a className="underline" href="https://www.facebook.com/privacy/policy/">Meta</a>.
      </p>
    </section>
  );
}
