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
const AI_SOURCES = new Set(["chatgpt", "perplexity", "copilot", "gemini", "claude"]);
const AI_REFERRER_DOMAINS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "copilot.microsoft.com", "gemini.google.com", "claude.ai"];

const isRecord = (value) =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const clean = (value, maxLength) =>
  String(value ?? "")
    .trim()
    .replaceAll("\u0000", "")
    .slice(0, maxLength);

const sanitiseAiReferrer = (value) => {
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) return value;
    const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
    return AI_REFERRER_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
      ? `${parsed.origin}/` : value;
  } catch {
    return value;
  }
};

const sanitizeFields = (value, fields) => {
  const input = isRecord(value) ? value : {};

  return Object.fromEntries(
    fields.map((field) => [field, field === "referrer"
      ? sanitiseAiReferrer(clean(input[field], FIELD_LIMITS[field]))
      : clean(input[field], FIELD_LIMITS[field])]),
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

const addAiFields = (output, input) => {
  if (!isRecord(input) || !Object.hasOwn(input, "ai_referral")) return output;
  const source = clean(input.ai_source, 40).toLowerCase();
  const detected = input.ai_referral === true && AI_SOURCES.has(source);
  return { ...output, ai_source: detected ? source : "", ai_referral: detected };
};

/**
 * Whitelists both the original flat lead-attribution contract and the v2
 * first/last-touch extension. Optional v2 keys are only emitted when the
 * caller supplied them, keeping old clients and CRM consumers compatible.
 */
export const sanitizeLeadAttribution = (value) => {
  const input = isRecord(value) ? value : {};
  const attribution = addAiFields(sanitizeFields(input, LEGACY_FIELDS), input);

  if (Object.hasOwn(input, "version")) {
    attribution.version = sanitizeVersion(input.version);
  }

  if (Object.hasOwn(input, "attributionModel")) {
    attribution.attributionModel = sanitizeAttributionModel(
      input.attributionModel,
    );
  }

  if (Object.hasOwn(input, "firstTouch")) {
    attribution.firstTouch = addAiFields(sanitizeFields(input.firstTouch, TOUCH_FIELDS), input.firstTouch);
  }

  if (Object.hasOwn(input, "lastTouch")) {
    attribution.lastTouch = addAiFields(sanitizeFields(input.lastTouch, TOUCH_FIELDS), input.lastTouch);
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
  return addAiFields(sanitizeFields(attribution, TOUCH_FIELDS), attribution);
};

/**
 * Human-readable rows for lead notification emails. Legacy rows remain in
 * each handler; these rows make the acquisition journey explicit.
 */
export const getAttributionSummaryRows = (value) => {
  const attribution = sanitizeLeadAttribution(value);
  const firstTouch = summaryTouch(attribution, "firstTouch");
  const lastTouch = summaryTouch(attribution, "lastTouch");

  const rows = [
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
  if (firstTouch.ai_referral || lastTouch.ai_referral) {
    rows.push(
      ["Primer contacto — Referencia IA", firstTouch.ai_referral ? firstTouch.ai_source : "No detectada"],
      ["Último contacto — Referencia IA", lastTouch.ai_referral ? lastTouch.ai_source : "No detectada"],
    );
  }
  return rows;
};
