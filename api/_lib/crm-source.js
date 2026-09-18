// The current CRM validates this field against a fixed Spanish dropdown.
// Keep its stored values stable while the public brand and UI language change.
const CRM_SOURCES = new Map([
  ['google', 'Google'],
  ['instagram / facebook', 'Instagram / Facebook'],
  ['youtube', 'Youtube'],
  ['recomendación', 'Recomendación'],
  ['recommendation', 'Recomendación'],
  ['ya conocía golf en casa', 'Ya conocía Golf en Casa'],
  ['ya conocía aquí golf', 'Ya conocía Golf en Casa'],
  ['i already knew golf en casa', 'Ya conocía Golf en Casa'],
  ['i already knew aquí golf', 'Ya conocía Golf en Casa'],
  ['no sabe / no recuerda', 'No sabe / No recuerda'],
  ['not sure / do not remember', 'No sabe / No recuerda'],
  ['otro', 'Otro'],
  ['other', 'Otro'],
]);

export const toCrmSource = (value) =>
  CRM_SOURCES.get(String(value ?? '').normalize('NFC').trim().toLowerCase()) || 'Otro';
