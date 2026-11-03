// The current CRM receiver preserves message in its notes column for every lead
// type. Keep the normalized dimensions first, even when user notes are long.
export function prependSpaceMeasurementsToCrmNotes(dimensions, notes) {
  return [`Medidas del espacio: ${dimensions}`, notes].filter(Boolean).join(" | ");
}
