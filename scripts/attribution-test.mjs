import assert from "node:assert/strict";

import {
  ATTRIBUTION_SCHEMA_VERSION,
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_TTL_MS,
  appendAttributionToUrl,
  attributionEventData,
  buildWhatsAppUrl,
  captureAttribution,
  classifyTrafficSource,
  detectAttributionTouch,
  getAttributionTouch,
  isInternalReferrer,
  mergeAttribution,
  normaliseStoredAttribution,
  prepareAttributedLink,
  readStoredAttribution,
  sanitisePathForWhatsApp,
  toLeadAttribution,
} from "../src/lib/attribution.js";

const DAY = 24 * 60 * 60 * 1000;
const START = Date.parse("2026-09-01T10:00:00.000Z");

assert.equal(ATTRIBUTION_STORAGE_KEY, "golf_en_casa_attribution_v1");
assert.equal(ATTRIBUTION_TTL_MS, 30 * DAY);

for (const referrer of [
  "https://golfencasa.net/proyectos",
  "https://www.golfencasa.net/",
  "https://go.golfencasa.net/oferta",
  "http://localhost:5173/test",
  "http://127.0.0.1:4173/test",
  "http://192.168.1.20:4173/test",
  "http://[::1]:4173/test",
  "https://web-golf-git-seo-local-francisco.vercel.app/test",
]) {
  assert.equal(isInternalReferrer(referrer, "www.golfencasa.net"), true, referrer);
}
assert.equal(isInternalReferrer("https://www.google.es/", "www.golfencasa.net"), false);

const googleTouch = detectAttributionTouch({
  url: "https://www.golfencasa.net/estudio-simulador-golf?utm_source=google&utm_medium=cpc&utm_campaign=leads&utm_content=hero&utm_term=simulador&gclid=G-1&gbraid=GB-1&wbraid=WB-1",
  referrer: "https://www.google.es/search?q=simulador",
  now: START,
});
assert.equal(googleTouch.source, "google");
assert.equal(googleTouch.medium, "cpc");
assert.equal(googleTouch.gclid, "G-1");
assert.equal(googleTouch.gbraid, "GB-1");
assert.equal(googleTouch.wbraid, "WB-1");
assert.equal(googleTouch.campaign, "leads");
assert.equal(googleTouch.content, "hero");
assert.equal(googleTouch.term, "simulador");
assert.equal(classifyTrafficSource(googleTouch), "Google Ads");
assert.equal(toLeadAttribution(googleTouch).gbraid, "GB-1");
assert.equal(toLeadAttribution(googleTouch).wbraid, "WB-1");

const organicTouch = detectAttributionTouch({
  url: "https://www.golfencasa.net/medidas-simulador-golf",
  referrer: "https://www.google.es/search?q=medidas+simulador",
  now: START,
});
assert.equal(organicTouch.source, "google");
assert.equal(organicTouch.medium, "organic");

const metaTouch = detectAttributionTouch({
  url: "https://www.golfencasa.net/signature?fbclid=FB-1&utm_content=video",
  now: START + DAY,
});
assert.equal(metaTouch.source, "meta");
assert.equal(metaTouch.medium, "paid_social");
assert.equal(classifyTrafficSource(metaTouch), "Meta Ads");

const microsoftTouch = detectAttributionTouch({
  url: "https://www.golfencasa.net/?msclkid=MS-1",
  now: START + 2 * DAY,
});
assert.equal(microsoftTouch.source, "bing");
assert.equal(microsoftTouch.medium, "cpc");
assert.equal(classifyTrafficSource(microsoftTouch), "Microsoft Ads");
assert.equal(toLeadAttribution(microsoftTouch).msclkid, "MS-1");

const directTouch = detectAttributionTouch({
  url: "https://www.golfencasa.net/care",
  referrer: "https://preview-123.vercel.app/previous?utm_source=ignore",
  now: START + 3 * DAY,
});
assert.equal(directTouch.source, "direct");
assert.equal(directTouch.referrer, "");

const firstCapture = mergeAttribution(null, googleTouch, { now: START });
const retainedOnDirect = mergeAttribution(firstCapture, directTouch, { now: START + 3 * DAY });
assert.deepEqual(retainedOnDirect, firstCapture);

const repeatedSpaReferrer = detectAttributionTouch({
  url: "https://www.golfencasa.net/precio-simulador-golf",
  referrer: "https://www.google.es/search?q=simulador",
  now: START + DAY,
});
const retainedAcrossSpaNavigation = mergeAttribution(firstCapture, repeatedSpaReferrer, {
  now: START + DAY,
});
assert.equal(getAttributionTouch(retainedAcrossSpaNavigation, "last").gclid, "G-1");

const updatedWithMeta = mergeAttribution(firstCapture, metaTouch, { now: START + DAY });
assert.equal(getAttributionTouch(updatedWithMeta, "first").gclid, "G-1");
assert.equal(getAttributionTouch(updatedWithMeta, "last").fbclid, "FB-1");
const legacyEvent = attributionEventData(updatedWithMeta, {
  conversionPage: "/signature",
});
assert.deepEqual(Object.keys(legacyEvent).sort(), [
  "conversion_page",
  "fbclid_present",
  "gclid_present",
  "landing_page",
  "source_label",
  "traffic_campaign",
  "traffic_content",
  "traffic_medium",
  "traffic_source",
  "traffic_term",
]);
assert.equal(
  attributionEventData(directTouch, { locale: "en" }).source_label,
  "Direct",
);
assert.equal(legacyEvent.landing_page, "/signature");
assert.equal(legacyEvent.conversion_page, "/signature");

const lastTouchLead = toLeadAttribution(updatedWithMeta, {
  conversionPage: "/contacto?form=signature#sent",
});
assert.deepEqual(lastTouchLead, {
  version: ATTRIBUTION_SCHEMA_VERSION,
  attributionModel: "last_touch",
  source: "meta",
  medium: "paid_social",
  campaign: "",
  content: "video",
  term: "",
  gclid: "G-1",
  fbclid: "FB-1",
  gbraid: "GB-1",
  wbraid: "WB-1",
  msclkid: "",
  landingPage: "/signature?fbclid=FB-1&utm_content=video",
  conversionPage: "/contacto?form=signature#sent",
  referrer: "",
  capturedAt: new Date(START + DAY).toISOString(),
  firstTouch: getAttributionTouch(updatedWithMeta, "first"),
  lastTouch: getAttributionTouch(updatedWithMeta, "last"),
});
assert.equal(lastTouchLead.firstTouch.gclid, "G-1");
assert.equal(lastTouchLead.lastTouch.fbclid, "FB-1");

const firstTouchLead = toLeadAttribution(updatedWithMeta, { model: "first" });
assert.equal(firstTouchLead.attributionModel, "first_touch");
assert.equal(firstTouchLead.source, "google");
assert.equal(firstTouchLead.campaign, "leads");
assert.equal(firstTouchLead.landingPage, googleTouch.landingPage);
assert.equal(firstTouchLead.gclid, "G-1");
assert.equal(firstTouchLead.fbclid, "FB-1");
assert.equal(firstTouchLead.gbraid, "GB-1");
assert.equal(firstTouchLead.wbraid, "WB-1");

const flatLead = toLeadAttribution(googleTouch);
assert.deepEqual(flatLead.firstTouch, getAttributionTouch(googleTouch, "first"));
assert.deepEqual(flatLead.lastTouch, getAttributionTouch(googleTouch, "last"));

const SECRET_CLICK_IDS = {
  gclid: "secret-gclid-value",
  gbraid: "secret-gbraid-value",
  wbraid: "secret-wbraid-value",
  fbclid: "secret-fbclid-value",
  msclkid: "secret-msclkid-value",
};
const sensitiveTouch = detectAttributionTouch({
  url:
    "https://www.golfencasa.net/estudio-simulador-golf" +
    "?utm_source=google&utm_medium=cpc&utm_campaign=leads" +
    `&gclid=${SECRET_CLICK_IDS.gclid}` +
    `&gbraid=${SECRET_CLICK_IDS.gbraid}` +
    `&wbraid=${SECRET_CLICK_IDS.wbraid}` +
    `&fbclid=${SECRET_CLICK_IDS.fbclid}` +
    `&msclkid=${SECRET_CLICK_IDS.msclkid}#formulario`,
  now: START,
});
const sensitiveEvent = attributionEventData(sensitiveTouch, {
  conversionPage:
    `https://www.golfencasa.net/contacto?gclid=${SECRET_CLICK_IDS.gclid}` +
    `&fbclid=${SECRET_CLICK_IDS.fbclid}#enviado`,
  includeExtended: true,
});
assert.equal(sensitiveEvent.landing_page, "/estudio-simulador-golf");
assert.equal(sensitiveEvent.conversion_page, "/contacto");
assert.equal(sensitiveEvent.gclid_present, true);
assert.equal(sensitiveEvent.fbclid_present, true);
assert.equal(sensitiveEvent.gbraid_present, true);
assert.equal(sensitiveEvent.wbraid_present, true);
assert.equal(sensitiveEvent.msclkid_present, true);
const serialisedSensitiveEvent = JSON.stringify(sensitiveEvent);
Object.values(SECRET_CLICK_IDS).forEach((secret) => {
  assert.doesNotMatch(serialisedSensitiveEvent, new RegExp(secret));
});

const afterExpiry = mergeAttribution(firstCapture, directTouch, { now: START + 31 * DAY });
assert.equal(getAttributionTouch(afterExpiry, "first").source, "direct");
assert.equal(getAttributionTouch(afterExpiry, "last").landingPage, "/care");

const legacyValue = JSON.stringify(googleTouch);
const migrated = normaliseStoredAttribution(legacyValue, { now: START + DAY });
assert.equal(getAttributionTouch(migrated, "first").gclid, "G-1");
assert.equal(getAttributionTouch(migrated, "last").gclid, "G-1");
assert.equal(
  normaliseStoredAttribution(legacyValue, { now: START + 31 * DAY }).expiresAt,
  "",
);

assert.equal(
  sanitisePathForWhatsApp("https://www.golfencasa.net/estudio-simulador-golf?gclid=secret#form"),
  "/estudio-simulador-golf",
);
assert.equal(sanitisePathForWhatsApp("/signature?utm_source=meta"), "/signature");

const directCalendlyUrl = "https://calendly.com/example/30min?month=2026-09";
assert.equal(
  appendAttributionToUrl(directCalendlyUrl, directTouch),
  directCalendlyUrl,
);

const trackedCalendlyUrl = new URL(
  appendAttributionToUrl(
    "https://calendly.com/example/30min?month=2026-09",
    firstCapture,
  ),
);
assert.equal(trackedCalendlyUrl.searchParams.get("month"), "2026-09");
assert.equal(trackedCalendlyUrl.searchParams.get("utm_source"), "google");
assert.equal(trackedCalendlyUrl.searchParams.get("utm_medium"), "cpc");
assert.equal(trackedCalendlyUrl.searchParams.get("utm_campaign"), "leads");
assert.equal(trackedCalendlyUrl.searchParams.get("utm_content"), "hero");
assert.equal(trackedCalendlyUrl.searchParams.get("utm_term"), "simulador");
Object.keys(SECRET_CLICK_IDS).forEach((field) => {
  assert.equal(trackedCalendlyUrl.searchParams.has(field), false);
});

const scrubbedBaseUrl = new URL(
  appendAttributionToUrl(
    "https://calendly.com/example/30min?gclid=leaked&fbclid=leaked-too",
    directTouch,
  ),
);
assert.equal(scrubbedBaseUrl.searchParams.has("gclid"), false);
assert.equal(scrubbedBaseUrl.searchParams.has("fbclid"), false);

const clickIdCalendlyUrl = new URL(
  appendAttributionToUrl("https://calendly.com/example/30min", sensitiveTouch, {
    includeClickIds: true,
  }),
);
Object.entries(SECRET_CLICK_IDS).forEach(([field, secret]) => {
  assert.equal(clickIdCalendlyUrl.searchParams.get(field), secret);
});

const longTermTouch = {
  ...googleTouch,
  term: "x".repeat(300),
};
const limitedCalendlyUrl = new URL(
  appendAttributionToUrl("https://calendly.com/example/30min", longTermTouch),
);
for (const field of [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
]) {
  assert.ok(limitedCalendlyUrl.searchParams.get(field).length <= 255, field);
}
assert.equal(limitedCalendlyUrl.searchParams.get("utm_term").length, 255);
assert.equal(appendAttributionToUrl("not a valid URL", firstCapture), "not a valid URL");

const ssrTarget = { href: "" };
const ssrPrepared = prepareAttributedLink(
  { currentTarget: ssrTarget },
  "https://calendly.com/example/30min",
  firstCapture,
);
assert.equal(ssrPrepared.attribution, firstCapture);
assert.equal(ssrTarget.href, ssrPrepared.href);
assert.equal(new URL(ssrPrepared.href).searchParams.get("utm_source"), "google");
assert.doesNotThrow(() =>
  prepareAttributedLink(null, "https://calendly.com/example/30min", firstCapture),
);

const whatsappUrl = buildWhatsAppUrl({
  phone: "+34 678 107 234",
  message: "Quiero información",
  attribution: firstCapture,
  pagePath: "/precio-simulador-golf?utm_source=private&gclid=secret",
  button: "hero",
});
const whatsappText = decodeURIComponent(new URL(whatsappUrl).searchParams.get("text"));
assert.match(whatsappUrl, /^https:\/\/wa\.me\/34678107234\?/);
assert.match(whatsappText, /Página: \/precio-simulador-golf/);
assert.doesNotMatch(whatsappText, /utm_source=private|gclid=secret/);

const browserStorage = new Map();
browserStorage.set("golf_en_casa_signature_attribution_v1", JSON.stringify(googleTouch));
let reads = 0;
let writes = 0;
globalThis.window = {
  location: {
    href: "https://www.golfencasa.net/signature",
    hostname: "www.golfencasa.net",
  },
  localStorage: {
    getItem(key) {
      reads += 1;
      return browserStorage.get(key) || null;
    },
    setItem(key, value) {
      writes += 1;
      browserStorage.set(key, value);
    },
  },
};
globalThis.document = { referrer: "" };
const browserCapture = captureAttribution({ now: START });
assert.equal(getAttributionTouch(browserCapture).gclid, "G-1");
assert.ok(browserStorage.has(ATTRIBUTION_STORAGE_KEY));
assert.equal(reads, 2);
assert.equal(writes, 1);

window.location.href =
  "https://www.golfencasa.net/signature?utm_source=meta&utm_medium=paid_social" +
  "&utm_campaign=retargeting&utm_content=hero&fbclid=LIVE-FBCLID";
const browserTarget = { href: "https://calendly.com/example/30min" };
const preparedAtClick = prepareAttributedLink(
  { currentTarget: browserTarget },
  "https://calendly.com/example/30min",
  browserCapture,
);
const preparedAtClickUrl = new URL(preparedAtClick.href);
assert.equal(browserTarget.href, preparedAtClick.href);
assert.equal(preparedAtClickUrl.searchParams.get("utm_source"), "meta");
assert.equal(preparedAtClickUrl.searchParams.get("utm_campaign"), "retargeting");
assert.equal(preparedAtClickUrl.searchParams.has("fbclid"), false);
assert.equal(getAttributionTouch(preparedAtClick.attribution, "first").gclid, "G-1");
assert.equal(
  getAttributionTouch(preparedAtClick.attribution, "last").fbclid,
  "LIVE-FBCLID",
);
assert.equal(reads, 3);
assert.equal(writes, 2);
delete globalThis.window;
delete globalThis.document;

// SSR: neither helper reads nor writes storage when browser globals are absent.
assert.equal(typeof globalThis.window, "undefined");
assert.equal(typeof globalThis.document, "undefined");
assert.equal(readStoredAttribution().expiresAt, "");
assert.equal(captureAttribution().expiresAt, "");
assert.equal(reads, 3);
assert.equal(writes, 2);

console.log("Attribution tests passed");
