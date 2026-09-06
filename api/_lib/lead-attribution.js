const FIELD_LIMITS = Object.freeze({
  source: 120,
  medium: 120,
  campaign: 200,
  content: 200,
  term: 300,
  gclid: 300,
  gbraid: 300,
  wbraid: 300,
  msclkid: 300,
  fbclid: 300,
  landingPage: 500,
  conversionPage: 500,
  referrer: 500,
  capturedAt: 80,
});

const LEGACY_FIELDS = Object.freeze(Object.keys(FIELD_LIMITS));
const TOUCH_FIELDS = Object.freeze(
  LEGACY_FIELDS.filter((field) => field !== "conversionPage"),
);
const CLICK_ID_FIELDS = Object.freeze([
  ["GCLID", "gclid"],
  ["GBRAID", "gbraid"],
  ["WBRAID", "wbraid"],
  ["MSCLKID", "msclkid"],
  ["FBCLID", "fbclid"],
]);
const ATTRIBUTION_MODELS = new Set(["first_touch", "last_touch"]);

const isRecord = (value) =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const clean = (value, maxLength) =>
  String(value ?? "")
    .trim()
    .replaceAll("\u0000", "")
    .slice(0, maxLength);

const sanitizeFields = (value, fields) => {
  const input = isRecord(value) ? value : {};

  return Object.fromEntries(
    fields.map((field) => [field, clean(input[field], FIELD_LIMITS[field])]),
  );
};

const sanitizeVersion = (value) => {
  const version = Number(value);
  return Number.isSafeInteger(version) && version > 0 && version <= 99
    ? version
    : "";
};

const sanitizeAttributionModel = (value) => {
  const model = clean(value, 40);
  return ATTRIBUTION_MODELS.has(model) ? model : "";
};

/**
 * Whitelists both the original flat lead-attribution contract and the v2
 * first/last-touch extension. Optional v2 keys are only emitted when the
 * caller supplied them, keeping old clients and CRM consumers compatible.
 */
export const sanitizeLeadAttribution = (value) => {
  const input = isRecord(value) ? value : {};
  const attribution = sanitizeFields(input, LEGACY_FIELDS);

  if (Object.hasOwn(input, "version")) {
    attribution.version = sanitizeVersion(input.version);
  }

  if (Object.hasOwn(input, "attributionModel")) {
    attribution.attributionModel = sanitizeAttributionModel(
      input.attributionModel,
    );
  }

  if (Object.hasOwn(input, "firstTouch")) {
    attribution.firstTouch = sanitizeFields(input.firstTouch, TOUCH_FIELDS);
  }

  if (Object.hasOwn(input, "lastTouch")) {
    attribution.lastTouch = sanitizeFields(input.lastTouch, TOUCH_FIELDS);
  }

  return attribution;
};

const formatSourceMedium = (touch) =>
  [touch.source, touch.medium].filter(Boolean).join(" / ") || "direct / none";

const formatClickIds = (touch) => {
  const values = CLICK_ID_FIELDS.flatMap(([label, field]) =>
    touch[field] ? [`${label}: ${touch[field]}`] : [],
  );

  return values.join(" · ") || "No disponible";
};

const summaryTouch = (attribution, field) => {
  if (isRecord(attribution[field])) return attribution[field];
  return sanitizeFields(attribution, TOUCH_FIELDS);
};

/**
 * Human-readable rows for lead notification emails. Legacy rows remain in
 * each handler; these rows make the acquisition journey explicit.
 */
export const getAttributionSummaryRows = (value) => {
  const attribution = sanitizeLeadAttribution(value);
  const firstTouch = summaryTouch(attribution, "firstTouch");
  const lastTouch = summaryTouch(attribution, "lastTouch");

  return [
    [
      "Modelo de atribución",
      attribution.attributionModel || "legacy / último contacto",
    ],
    ["Primer contacto — Fuente / medio", formatSourceMedium(firstTouch)],
    ["Primer contacto — Campaña", firstTouch.campaign || "No disponible"],
    ["Primer contacto — IDs de clic", formatClickIds(firstTouch)],
    ["Primer contacto — Landing", firstTouch.landingPage || "No disponible"],
    ["Último contacto — Fuente / medio", formatSourceMedium(lastTouch)],
    ["Último contacto — Campaña", lastTouch.campaign || "No disponible"],
    ["Último contacto — IDs de clic", formatClickIds(lastTouch)],
    ["Último contacto — Landing", lastTouch.landingPage || "No disponible"],
  ];
};
