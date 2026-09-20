// This version identifies the exact optional form notice, not a CookieYes choice.
export const MEASUREMENT_NOTICE_VERSION = '2026-09-20-v1';
export const MEASUREMENT_NOTICE = {
  es: 'Acepto que Aquí Golf comparta con Google y Meta mi correo y teléfono mediante identificadores hash, junto con el resultado de mi consulta (cualificación, presupuesto o compra e importe), para medir la eficacia de sus anuncios. Es opcional y puedo retirarlo escribiendo a info@aquigolf.es.',
  en: 'I agree that Aquí Golf may share my email and phone as hashed identifiers, together with the outcome of my enquiry (qualification, quotation or purchase and amount), with Google and Meta to measure the effectiveness of its ads. This is optional and I can withdraw it by emailing info@aquigolf.es.',
};

export function normaliseMeasurementConsent(input, now = new Date()) {
  const valid = input?.noticeVersion === MEASUREMENT_NOTICE_VERSION &&
    input?.source === 'optional_form_checkbox' &&
    ['es', 'en'].includes(input?.locale) && typeof input?.granted === 'boolean';
  const captured = valid && typeof input.capturedAt === 'string' ? Date.parse(input.capturedAt) : NaN;
  const timely = Number.isFinite(captured) && captured <= now.getTime() + 60000 &&
    captured >= now.getTime() - 30 * 60 * 1000;
  return {
    status: valid && timely ? (input.granted ? 'GRANTED' : 'DENIED') : 'UNKNOWN',
    // This notice authorises measurement only; never infer personalised ads permission.
    adPersonalization: 'DENIED',
    receivedAt: now.toISOString(),
    capturedAt: timely ? new Date(captured).toISOString() : '',
    noticeVersion: valid ? MEASUREMENT_NOTICE_VERSION : '',
    source: valid ? 'optional_form_checkbox' : 'unknown',
    locale: valid ? input.locale : '',
  };
}
