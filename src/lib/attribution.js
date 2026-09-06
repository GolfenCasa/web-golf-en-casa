/**
 * Shared acquisition attribution for Golf en Casa.
 *
 * Browser I/O is deliberately limited to `readStoredAttribution`,
 * `captureAttribution` and the interaction-time `prepareAttributedLink`.
 * Every other export is pure and can be used while prerendering or
 * server-side rendering.
 */

export const ATTRIBUTION_STORAGE_KEY = "golf_en_casa_attribution_v1";
export const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const ATTRIBUTION_SCHEMA_VERSION = 2;

const SITE_ORIGIN = "https://www.golfencasa.net";
const LEGACY_ATTRIBUTION_STORAGE_KEYS = ["golf_en_casa_signature_attribution_v1"];
const GOOGLE_CLICK_IDS = ["gclid", "gbraid", "wbraid"];
const CLICK_ID_FIELDS = [...GOOGLE_CLICK_IDS, "fbclid", "msclkid"];
const UTM_FIELDS = [
  ["utm_source", "source"],
  ["utm_medium", "medium"],
  ["utm_campaign", "campaign"],
  ["utm_content", "content"],
  ["utm_term", "term"],
];
const MAX_UTM_VALUE_LENGTH = 255;

export const EMPTY_ATTRIBUTION_TOUCH = Object.freeze({
  source: "direct",
  medium: "none",
  campaign: "",
  content: "",
  term: "",
  gclid: "",
  fbclid: "",
  gbraid: "",
  wbraid: "",
  msclkid: "",
  landingPage: "",
  referrer: "",
  capturedAt: "",
});

export const EMPTY_ATTRIBUTION = Object.freeze({
  version: ATTRIBUTION_SCHEMA_VERSION,
  firstTouch: EMPTY_ATTRIBUTION_TOUCH,
  lastTouch: EMPTY_ATTRIBUTION_TOUCH,
  expiresAt: "",
});

const cleanText = (value, maxLength = 500) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const normaliseHostname = (value) =>
  cleanText(value, 255)
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/^\[|\]$/g, "")
    .replace(/\.$/, "");

const toTimestamp = (value) => {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const toIsoString = (value) => {
  const timestamp = toTimestamp(value);
  return timestamp > 0 ? new Date(timestamp).toISOString() : "";
};

const nowTimestamp = (value = Date.now()) => {
  const timestamp = toTimestamp(value);
  return timestamp > 0 ? timestamp : Date.now();
};

const isLocalHostname = (hostname) => {
  const host = normaliseHostname(hostname);
  const ipv4Parts = host.split(".").map(Number);
  const isPrivateIpv4 =
    ipv4Parts.length === 4 &&
    ipv4Parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255) &&
    (ipv4Parts[0] === 10 ||
      (ipv4Parts[0] === 172 && ipv4Parts[1] >= 16 && ipv4Parts[1] <= 31) ||
      (ipv4Parts[0] === 192 && ipv4Parts[1] === 168));

  return (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.startsWith("127.") ||
    host.endsWith(".local") ||
    isPrivateIpv4
  );
};

const isGolfEnCasaHostname = (hostname) => {
  const host = normaliseHostname(hostname);
  return host === "golfencasa.net" || host.endsWith(".golfencasa.net");
};

const isVercelPreviewHostname = (hostname) => {
  const host = normaliseHostname(hostname);
  return host === "vercel.app" || host.endsWith(".vercel.app");
};

const emptyTouch = () => ({ ...EMPTY_ATTRIBUTION_TOUCH });

export const createEmptyAttribution = () => ({
  version: ATTRIBUTION_SCHEMA_VERSION,
  firstTouch: emptyTouch(),
  lastTouch: emptyTouch(),
  expiresAt: "",
});

export const isBrowserEnvironment = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/** Excludes the canonical domain, its subdomains, local development and Vercel previews. */
export const isInternalReferrer = (referrer, currentHostname = "") => {
  const value = cleanText(referrer, 2000);
  if (!value) return false;

  try {
    const hostname = normaliseHostname(new URL(value).hostname);
    const current = normaliseHostname(currentHostname);

    return (
      isGolfEnCasaHostname(hostname) ||
      isLocalHostname(hostname) ||
      isVercelPreviewHostname(hostname) ||
      Boolean(current && hostname === current)
    );
  } catch {
    return false;
  }
};

const getExternalReferrer = (referrer, currentHostname = "") => {
  const value = cleanText(referrer, 2000);
  if (!value || isInternalReferrer(value, currentHostname)) return "";

  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) return "";
    return value;
  } catch {
    return "";
  }
};

const inferReferrerSource = (referrer) => {
  if (!referrer) return { source: "direct", medium: "none" };

  try {
    const hostname = normaliseHostname(new URL(referrer).hostname);

    if (hostname === "youtu.be" || hostname.endsWith(".youtube.com")) {
      return { source: "youtube", medium: "referral" };
    }

    if (hostname.startsWith("google.") || hostname.includes(".google.")) {
      return { source: "google", medium: "organic" };
    }

    if (hostname === "bing.com" || hostname.endsWith(".bing.com")) {
      return { source: "bing", medium: "organic" };
    }

    if (hostname === "facebook.com" || hostname.endsWith(".facebook.com")) {
      return { source: "facebook", medium: "referral" };
    }

    if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
      return { source: "instagram", medium: "referral" };
    }

    if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) {
      return { source: "linkedin", medium: "referral" };
    }

    return { source: hostname || "referral", medium: "referral" };
  } catch {
    return { source: "direct", medium: "none" };
  }
};

const readSearchParam = (params, name, maxLength = 500) =>
  cleanText(params.get(name), maxLength);

/**
 * Creates a touch from explicit request data. It never reads browser globals.
 */
export const detectAttributionTouch = ({
  url = SITE_ORIGIN,
  referrer = "",
  currentHostname = "",
  now = Date.now(),
} = {}) => {
  let parsedUrl;

  try {
    parsedUrl =
      url instanceof URL ? new URL(url.toString()) : new URL(String(url), SITE_ORIGIN);
  } catch {
    parsedUrl = new URL(SITE_ORIGIN);
  }

  const hostname = currentHostname || parsedUrl.hostname;
  const externalReferrer = getExternalReferrer(referrer, hostname);
  const params = parsedUrl.searchParams;
  const touch = {
    source: readSearchParam(params, "utm_source", 120),
    medium: readSearchParam(params, "utm_medium", 120),
    campaign: readSearchParam(params, "utm_campaign", 200),
    content: readSearchParam(params, "utm_content", 200),
    term: readSearchParam(params, "utm_term", 300),
    gclid: readSearchParam(params, "gclid"),
    fbclid: readSearchParam(params, "fbclid"),
    gbraid: readSearchParam(params, "gbraid"),
    wbraid: readSearchParam(params, "wbraid"),
    msclkid: readSearchParam(params, "msclkid"),
    landingPage: `${parsedUrl.pathname || "/"}${parsedUrl.search}`,
    referrer: externalReferrer,
    capturedAt: new Date(nowTimestamp(now)).toISOString(),
  };

  const hasGoogleClickId = GOOGLE_CLICK_IDS.some((field) => Boolean(touch[field]));

  if (hasGoogleClickId) {
    touch.source ||= "google";
    touch.medium ||= "cpc";
  } else if (touch.fbclid) {
    touch.source ||= "meta";
    touch.medium ||= "paid_social";
  } else if (touch.msclkid) {
    touch.source ||= "bing";
    touch.medium ||= "cpc";
  }

  if (!touch.source) {
    const inferred = inferReferrerSource(externalReferrer);
    touch.source = inferred.source;
    touch.medium ||= inferred.medium;
  }

  touch.source ||= "direct";
  touch.medium ||= touch.source === "direct" ? "none" : "referral";

  return touch;
};

const normaliseTouch = (value, { capturedAt = "" } = {}) => {
  const input = value && typeof value === "object" ? value : {};
  const source = cleanText(input.source, 120) || "direct";

  return {
    source,
    medium: cleanText(input.medium, 120) || (source === "direct" ? "none" : "referral"),
    campaign: cleanText(input.campaign, 200),
    content: cleanText(input.content, 200),
    term: cleanText(input.term, 300),
    gclid: cleanText(input.gclid),
    fbclid: cleanText(input.fbclid),
    gbraid: cleanText(input.gbraid),
    wbraid: cleanText(input.wbraid),
    msclkid: cleanText(input.msclkid),
    landingPage: cleanText(input.landingPage, 1000),
    referrer: cleanText(input.referrer, 2000),
    capturedAt: toIsoString(input.capturedAt || capturedAt),
  };
};

export const hasAcquisitionSignal = (attribution) => {
  const touch = getAttributionTouch(attribution, "last");

  return Boolean(
    CLICK_ID_FIELDS.some((field) => touch[field]) ||
      touch.campaign ||
      touch.content ||
      touch.term ||
      touch.referrer ||
      (touch.source && touch.source !== "direct") ||
      (touch.medium && touch.medium !== "none")
  );
};

const hasTaggedAcquisitionSignal = (touch) => {
  if (
    CLICK_ID_FIELDS.some((field) => touch[field]) ||
    touch.campaign ||
    touch.content ||
    touch.term
  ) {
    return true;
  }

  try {
    const params = new URL(touch.landingPage, SITE_ORIGIN).searchParams;
    return [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      ...CLICK_ID_FIELDS,
    ].some((name) => params.has(name));
  } catch {
    return false;
  }
};

const isEnvelope = (value) =>
  Boolean(value && typeof value === "object" && (value.firstTouch || value.lastTouch));

/**
 * Validates the v2 envelope and migrates the previous flat value in memory.
 * Expired or malformed values become an empty envelope.
 */
export const normaliseStoredAttribution = (value, { now = Date.now() } = {}) => {
  let input = value;

  if (typeof input === "string") {
    try {
      input = JSON.parse(input);
    } catch {
      return createEmptyAttribution();
    }
  }

  if (!input || typeof input !== "object") return createEmptyAttribution();

  const firstTouch = normaliseTouch(isEnvelope(input) ? input.firstTouch : input);
  const lastTouch = normaliseTouch(isEnvelope(input) ? input.lastTouch : input);
  const lastCapturedAt = toTimestamp(lastTouch.capturedAt || firstTouch.capturedAt);
  const explicitExpiry = toTimestamp(input.expiresAt);
  const expiresAt = explicitExpiry || (lastCapturedAt ? lastCapturedAt + ATTRIBUTION_TTL_MS : 0);
  const currentTime = nowTimestamp(now);

  if (!lastCapturedAt || !expiresAt || currentTime - expiresAt > 0) {
    return createEmptyAttribution();
  }

  return {
    version: ATTRIBUTION_SCHEMA_VERSION,
    firstTouch,
    lastTouch,
    expiresAt: new Date(expiresAt).toISOString(),
  };
};

/**
 * Preserves first touch and updates last touch only for a new acquisition.
 * Direct/internal visits do not erase a fresh paid, organic or referral touch.
 */
export const mergeAttribution = (
  stored,
  currentTouch,
  { now = Date.now() } = {},
) => {
  const currentTime = nowTimestamp(now);
  const previous = normaliseStoredAttribution(stored, { now: currentTime });
  const current = normaliseTouch(currentTouch, { capturedAt: currentTime });
  const hasPrevious = Boolean(previous.lastTouch.capturedAt);

  if (!hasPrevious) {
    return {
      version: ATTRIBUTION_SCHEMA_VERSION,
      firstTouch: { ...current },
      lastTouch: { ...current },
      expiresAt: new Date(currentTime + ATTRIBUTION_TTL_MS).toISOString(),
    };
  }

  const repeatsBrowserReferrer = Boolean(
    current.referrer &&
      current.referrer === previous.lastTouch.referrer &&
      !hasTaggedAcquisitionSignal(current),
  );

  // In an SPA, document.referrer remains the original external URL while the
  // visitor changes routes. Do not misclassify those route changes as a new
  // organic/referral touch that overwrites a paid click ID.
  if (!hasAcquisitionSignal(current) || repeatsBrowserReferrer) return previous;

  return {
    version: ATTRIBUTION_SCHEMA_VERSION,
    firstTouch: { ...previous.firstTouch },
    lastTouch: { ...current },
    expiresAt: new Date(currentTime + ATTRIBUTION_TTL_MS).toISOString(),
  };
};

export const getAttributionTouch = (attribution, model = "last") => {
  if (isEnvelope(attribution)) {
    return normaliseTouch(model === "first" ? attribution.firstTouch : attribution.lastTouch);
  }

  return normaliseTouch(attribution);
};

/**
 * Keeps lead requests compatible with the existing flat API contract while
 * the browser record retains both first and last touch internally.
 */
export const toLeadAttribution = (
  attribution,
  { model = "last", conversionPage = "" } = {},
) => {
  const selectedModel = model === "first" ? "first" : "last";
  const otherModel = selectedModel === "first" ? "last" : "first";
  const touch = getAttributionTouch(attribution, selectedModel);
  const otherTouch = getAttributionTouch(attribution, otherModel);
  const firstTouch = getAttributionTouch(attribution, "first");
  const lastTouch = getAttributionTouch(attribution, "last");
  const clickIds = Object.fromEntries(
    CLICK_ID_FIELDS.map((field) => [field, touch[field] || otherTouch[field] || ""]),
  );

  return {
    version: ATTRIBUTION_SCHEMA_VERSION,
    attributionModel: selectedModel === "first" ? "first_touch" : "last_touch",
    source: touch.source,
    medium: touch.medium,
    campaign: touch.campaign,
    content: touch.content,
    term: touch.term,
    ...clickIds,
    landingPage: touch.landingPage,
    conversionPage: cleanText(conversionPage, 1000),
    referrer: touch.referrer,
    capturedAt: touch.capturedAt,
    firstTouch,
    lastTouch,
  };
};

export const readAttributionFromBrowser = ({ now = Date.now() } = {}) => {
  if (!isBrowserEnvironment()) return emptyTouch();

  return detectAttributionTouch({
    url: window.location.href,
    referrer: document.referrer || "",
    currentHostname: window.location.hostname,
    now,
  });
};

/** Reads localStorage only when a real browser environment is present. */
export const readStoredAttribution = ({ now = Date.now() } = {}) => {
  if (!isBrowserEnvironment()) return createEmptyAttribution();

  try {
    const primary = normaliseStoredAttribution(
      window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY),
      { now },
    );
    if (primary.lastTouch.capturedAt) return primary;

    for (const storageKey of LEGACY_ATTRIBUTION_STORAGE_KEYS) {
      const legacy = normaliseStoredAttribution(window.localStorage.getItem(storageKey), {
        now,
      });
      if (legacy.lastTouch.capturedAt) return legacy;
    }

    return createEmptyAttribution();
  } catch {
    return createEmptyAttribution();
  }
};

export const getStoredAttribution = readStoredAttribution;

export const getCurrentBrowserPath = ({ includeSearch = false, fallback = "" } = {}) => {
  if (!isBrowserEnvironment()) return cleanText(fallback, 1000);
  return `${window.location.pathname}${includeSearch ? window.location.search : ""}`;
};

/** Captures and persists attribution only in the browser. */
export const captureAttribution = ({ now = Date.now() } = {}) => {
  if (!isBrowserEnvironment()) return createEmptyAttribution();

  const current = readAttributionFromBrowser({ now });
  const stored = readStoredAttribution({ now });
  const attribution = mergeAttribution(stored, current, { now });

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Measurement remains available in memory if storage is blocked.
  }

  return attribution;
};

export const classifyTrafficSource = (attribution, model = "last", locale = "es") => {
  const touch = getAttributionTouch(attribution, model);
  const source = touch.source.toLowerCase();
  const medium = touch.medium.toLowerCase();
  const referrer = touch.referrer.toLowerCase();
  const paidMedia = ["cpc", "ppc", "paid", "paid_search"];
  const paidSocial = ["cpc", "paid", "paid_social", "social_paid"];

  if (
    GOOGLE_CLICK_IDS.some((field) => Boolean(touch[field])) ||
    (source === "google" && paidMedia.includes(medium))
  ) {
    return "Google Ads";
  }

  if (
    touch.fbclid ||
    (["facebook", "instagram", "meta", "fb", "ig"].includes(source) &&
      paidSocial.includes(medium))
  ) {
    return "Meta Ads";
  }

  if (
    touch.msclkid ||
    (["bing", "microsoft"].includes(source) && paidMedia.includes(medium))
  ) {
    return "Microsoft Ads";
  }

  if (source === "linkedin" && paidSocial.includes(medium)) return "LinkedIn Ads";

  if (
    source === "youtube" ||
    referrer.includes("youtube.com") ||
    referrer.includes("youtu.be")
  ) {
    return "YouTube";
  }

  if (source === "google" || referrer.includes("google.")) {
    return locale === "en" ? "Google organic" : "Google orgánico";
  }
  if (source === "bing" || referrer.includes("bing.com")) {
    return locale === "en" ? "Bing organic" : "Bing orgánico";
  }
  if (source && source !== "direct") return source;
  return locale === "en" ? "Direct" : "Acceso directo";
};

export const attributionEventData = (attribution, options = {}) => {
  const {
    model = "last",
    conversionPage,
    landingFallback = "/",
    includeExtended = false,
    locale = "es",
  } = options;
  const touch = getAttributionTouch(attribution, model);
  const landingPath = sanitisePathForWhatsApp(
    touch.landingPage || landingFallback,
    landingFallback || "/",
  );
  const eventData = {
    traffic_source: touch.source || "direct",
    traffic_medium: touch.medium || "none",
    traffic_campaign: touch.campaign,
    traffic_content: touch.content,
    traffic_term: touch.term,
    landing_page: landingPath,
    source_label: classifyTrafficSource(touch, "last", locale),
    gclid_present: Boolean(touch.gclid),
    fbclid_present: Boolean(touch.fbclid),
  };

  if (typeof conversionPage === "string") {
    eventData.conversion_page = sanitisePathForWhatsApp(conversionPage, "/");
  }

  if (includeExtended) {
    eventData.attribution_model = model === "first" ? "first_touch" : "last_touch";
    eventData.gbraid_present = Boolean(touch.gbraid);
    eventData.wbraid_present = Boolean(touch.wbraid);
    eventData.msclkid_present = Boolean(touch.msclkid);
  }

  return eventData;
};

export const appendAttributionToUrl = (
  baseUrl,
  attribution,
  { model = "last", includeClickIds = false } = {},
) => {
  try {
    const url = new URL(baseUrl);
    const touch = getAttributionTouch(attribution, model);
    let urlChanged = false;

    if (!includeClickIds) {
      CLICK_ID_FIELDS.forEach((field) => {
        if (url.searchParams.has(field)) {
          url.searchParams.delete(field);
          urlChanged = true;
        }
      });
    }

    if (!hasAcquisitionSignal(touch)) {
      return urlChanged ? url.toString() : baseUrl;
    }

    if (includeClickIds) {
      CLICK_ID_FIELDS.forEach((field) => {
        const value = cleanText(touch[field]);
        if (value) url.searchParams.set(field, value);
      });
    }

    UTM_FIELDS.forEach(([key, touchField]) => {
      const value = cleanText(touch[touchField], MAX_UTM_VALUE_LENGTH);
      if (value && value !== "none") {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  } catch {
    return baseUrl;
  }
};

/**
 * Refreshes an outbound link at interaction time so a click cannot race the
 * component effect that initially captures acquisition data.
 */
export const prepareAttributedLink = (
  event,
  baseUrl,
  fallbackAttribution,
  options = {},
) => {
  const attribution = isBrowserEnvironment()
    ? captureAttribution()
    : fallbackAttribution || createEmptyAttribution();
  const href = appendAttributionToUrl(baseUrl, attribution, options);
  const target = event?.currentTarget;

  if (target) {
    try {
      target.href = href;
    } catch {
      try {
        target.setAttribute?.("href", href);
      } catch {
        // The computed URL is still returned when the event target is immutable.
      }
    }
  }

  return { attribution, href };
};

/** Returns only a pathname, never its query string or hash. */
export const sanitisePathForWhatsApp = (value, fallback = "/") => {
  const safeFallback = cleanText(fallback, 1000).split(/[?#]/, 1)[0] || "/";
  const input = cleanText(value, 2000);
  if (!input) return safeFallback.startsWith("/") ? safeFallback : `/${safeFallback}`;

  try {
    const parsed = new URL(input, SITE_ORIGIN);
    if (!["http:", "https:"].includes(parsed.protocol)) return safeFallback;
    return parsed.pathname || "/";
  } catch {
    const pathname = input.split(/[?#]/, 1)[0];
    if (!pathname) return safeFallback;
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
  }
};

// US spelling is provided as an alias for callers that already use "sanitize".
export const sanitizePathForWhatsApp = sanitisePathForWhatsApp;

export const getWhatsAppReference = (attribution, model = "last") => {
  const source = classifyTrafficSource(attribution, model);
  if (source === "Google Ads") return "GADS";
  if (source === "Meta Ads") return "META";
  if (source === "Microsoft Ads") return "MSADS";
  if (source === "LinkedIn Ads") return "LIADS";
  if (source === "YouTube") return "YT";
  if (source === "Google orgánico") return "GORG";
  if (source === "Bing orgánico") return "BORG";
  if (source === "Acceso directo") return "DIRECT";
  return "WEB";
};

export const getWhatsAppTrackingLines = (
  attribution,
  { model = "last", pagePath = "", button = "", locale = "es" } = {},
) => {
  const touch = getAttributionTouch(attribution, model);
  const landingPath = sanitisePathForWhatsApp(touch.landingPage, "/");
  const conversionPath = sanitisePathForWhatsApp(pagePath || landingPath, landingPath);
  const labels =
    locale === "en"
      ? {
          source: "Source",
          campaign: "Campaign",
          term: "Search",
          landing: "Landing",
          page: "Page",
          button: "Button",
        }
      : {
          source: "Origen",
          campaign: "Campaña",
          term: "Búsqueda",
          landing: "Landing",
          page: "Página",
          button: "Botón",
        };

  return [
    `Ref: ${getWhatsAppReference(touch)}`,
    `${labels.source}: ${classifyTrafficSource(touch, "last", locale)}`,
    touch.campaign ? `${labels.campaign}: ${touch.campaign}` : "",
    touch.term ? `${labels.term}: ${touch.term}` : "",
    `${labels.landing}: ${landingPath}`,
    `${labels.page}: ${conversionPath}`,
    cleanText(button, 120) ? `${labels.button}: ${cleanText(button, 120)}` : "",
  ].filter(Boolean);
};

export const buildWhatsAppUrl = ({
  phone,
  message,
  attribution,
  model = "last",
  pagePath = "",
  button = "",
  locale = "es",
} = {}) => {
  const digits = String(phone || "").replace(/\D/g, "");
  const tracking = getWhatsAppTrackingLines(attribution, {
    model,
    pagePath,
    button,
    locale,
  });
  const text = [cleanText(message, 4000), "---", ...tracking].filter(Boolean).join("\n");

  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
};
