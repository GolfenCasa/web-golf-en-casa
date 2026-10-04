import assert from "node:assert/strict";
import { after, test } from "node:test";
import {
  ATTRIBUTION_STORAGE_KEY,
  appendAttributionToUrl,
  attributionEventData,
  buildWhatsAppUrl,
  captureAttribution,
  classifyTrafficSource,
  detectAttributionTouch,
  getAttributionTouch,
  getWhatsAppReference,
  mergeAttribution,
  normaliseStoredAttribution,
  prepareWhatsAppLink,
  toLeadAttribution,
} from "../src/lib/attribution.js";
import { getAttributionSummaryRows, sanitizeLeadAttribution } from "../api/_lib/lead-attribution.js";

const START = Date.parse("2026-10-04T12:00:00Z");
const detect = (options = {}) => detectAttributionTouch({
  url: "https://aquigolf.es/simuladores-golf",
  now: START,
  ...options,
});

after(() => { delete globalThis.window; delete globalThis.document; });

test("recognises assistant referrals using hostname boundaries and strips conversation URLs", () => {
  const referrals = [
    ["https://chatgpt.com/c/private-id?q=private-prompt", "chatgpt", "ChatGPT", "AI_GPT", "chatgpt.com"],
    ["https://chat.openai.com/c/private-id", "chatgpt", "ChatGPT", "AI_GPT", "chatgpt.com"],
    ["https://www.perplexity.ai/search/private-prompt", "perplexity", "Perplexity", "AI_PPLX", "perplexity.ai"],
    ["https://copilot.microsoft.com/chats/private-id", "copilot", "Microsoft Copilot", "AI_COPILOT", "copilot.microsoft.com"],
    ["https://gemini.google.com/app/private-id", "gemini", "Gemini", "AI_GEMINI", "gemini.google.com"],
    ["https://claude.ai/chat/private-id", "claude", "Claude", "AI_CLAUDE", "claude.ai"],
  ];
  for (const [referrer, id, label, reference, source] of referrals) {
    const touch = detect({ referrer });
    assert.equal(touch.source, source);
    assert.equal(touch.medium, "referral");
    assert.equal(touch.ai_source, id);
    assert.equal(touch.ai_referral, true);
    assert.equal(touch.referrer, `${new URL(referrer).origin}/`);
    assert.equal(classifyTrafficSource(touch), label);
    assert.equal(getWhatsAppReference(touch), reference);
    const event = attributionEventData(touch);
    assert.equal(event.ai_source, id);
    assert.equal(event.ai_referral, true);
    assert.doesNotMatch(JSON.stringify(event), /private-id|private-prompt|referrer/);
  }
});

test("recognises exact assistant UTM sources and preserves source, medium and campaign", () => {
  for (const [source, id] of [
    ["chatgpt.com", "chatgpt"], ["ChatGPT", "chatgpt"], ["perplexity.ai", "perplexity"],
    ["copilot", "copilot"], ["gemini", "gemini"], ["claude.ai", "claude"],
  ]) {
    const params = new URLSearchParams({ utm_source: source, utm_medium: "referral", utm_campaign: "simuladores", utm_content: "guia" });
    const touch = detect({ url: `https://aquigolf.es/simuladores-golf?${params}` });
    assert.equal(touch.source, source);
    assert.equal(touch.medium, "referral");
    assert.equal(touch.campaign, "simuladores");
    assert.equal(touch.content, "guia");
    assert.equal(touch.ai_source, id);
    assert.equal(touch.ai_referral, true);
  }
});

test("does not infer AI Overviews, Bing Copilot or invisible assistant visits from search engines", () => {
  for (const referrer of ["https://www.google.es/search?q=simulador", "https://www.google.com/search?udm=50", "https://www.bing.com/search?q=simulador", ""]) {
    const event = attributionEventData(detect({ referrer }));
    assert.equal(event.ai_source, "");
    assert.equal(event.ai_referral, false);
  }
  assert.equal(classifyTrafficSource(detect({ referrer: "https://www.google.es/search?q=simulador" })), "Google orgánico");
});

test("rejects impostor hosts, userinfo, invalid referrers and invented UTM assistant names", () => {
  for (const referrer of [
    "https://chatgpt.com.evil.example/", "https://evilchatgpt.com/", "https://chatgpt.com@evil.example/",
    "https://perplexity.ai.evil.example/", "https://copilot.microsoft.com.evil.example/",
    "https://gemini.google.com.evil.example/", "https://claude.ai.evil.example/",
    "https://example.org/chatgpt.com/", "ftp://chatgpt.com/", "not a URL",
  ]) {
    assert.equal(attributionEventData(detect({ referrer })).ai_referral, false, referrer);
  }
  for (const source of ["chatgpt.com.evil.example", "openai", "ai_overviews", "https://chatgpt.com/"]) {
    assert.equal(attributionEventData(detect({ url: `https://aquigolf.es/?utm_source=${encodeURIComponent(source)}` })).ai_referral, false, source);
  }
});

test("paid clicks and paid media keep precedence over an assistant referral", () => {
  for (const [query, label] of [
    ["gclid=G-1", "Google Ads"], ["gbraid=GB-1", "Google Ads"], ["wbraid=WB-1", "Google Ads"],
    ["fbclid=FB-1", "Meta Ads"], ["msclkid=MS-1", "Microsoft Ads"],
    ["utm_source=google&utm_medium=cpc", "Google Ads"], ["utm_source=meta&utm_medium=paid_social", "Meta Ads"],
  ]) {
    const touch = detect({ url: `https://aquigolf.es/?${query}`, referrer: "https://chatgpt.com/" });
    assert.equal(classifyTrafficSource(touch), label);
    assert.equal(attributionEventData(touch).ai_referral, false);
    assert.equal(attributionEventData(touch).ai_source, "");
  }
  const taggedPaid = detect({ url: "https://aquigolf.es/?utm_source=chatgpt.com&utm_medium=paid_social" });
  assert.equal(taggedPaid.source, "chatgpt.com");
  assert.equal(taggedPaid.medium, "paid_social");
  assert.equal(taggedPaid.ai_referral, false);
});

test("first and last touch survive direct visits, SPA navigation and lead conversion", () => {
  const first = detect({ url: "https://aquigolf.es/?utm_source=chatgpt.com&utm_campaign=guia", referrer: "https://chatgpt.com/c/id" });
  const stored = mergeAttribution(null, first, { now: START });
  const direct = mergeAttribution(stored, detect({ now: START + 1000 }), { now: START + 1000 });
  assert.equal(getAttributionTouch(direct).ai_source, "chatgpt");
  const spa = mergeAttribution(stored, detect({ referrer: "https://chatgpt.com/c/id", now: START + 2000 }), { now: START + 2000 });
  assert.equal(getAttributionTouch(spa).campaign, "guia");
  const latest = mergeAttribution(stored, detect({ referrer: "https://www.perplexity.ai/search/id", now: START + 3000 }), { now: START + 3000 });
  const lead = toLeadAttribution(latest, { conversionPage: "/contacto" });
  assert.equal(lead.ai_source, "perplexity");
  assert.equal(lead.firstTouch.ai_source, "chatgpt");
  assert.equal(lead.lastTouch.ai_source, "perplexity");
  assert.equal(toLeadAttribution(latest, { model: "first" }).ai_source, "chatgpt");
  assert.equal(normaliseStoredAttribution(stored, { now: START + 31 * 86400000 }).expiresAt, "");
});

test("assistant attribution reaches CRM sanitisation, email summary, Calendly and safe WhatsApp text", () => {
  const touch = detect({ url: "https://aquigolf.es/medidas?utm_source=chatgpt.com&utm_campaign=guia", referrer: "https://chatgpt.com/c/private-id" });
  const lead = toLeadAttribution(mergeAttribution(null, touch, { now: START }), { conversionPage: "/contacto" });
  const sanitised = sanitizeLeadAttribution(lead);
  assert.deepEqual(sanitised, lead);
  assert.ok(getAttributionSummaryRows(lead).some(([label, value]) => label.includes("Referencia IA") && value === "chatgpt"));
  assert.ok(getAttributionSummaryRows({ ...touch, ai_source: "chatgpt", ai_referral: true }).some(([label]) => label.includes("Referencia IA")));
  const calendly = new URL(appendAttributionToUrl("https://calendly.com/example/30min", touch));
  assert.equal(calendly.searchParams.get("utm_source"), "chatgpt.com");
  assert.equal(calendly.searchParams.get("utm_campaign"), "guia");
  const whatsapp = new URL(buildWhatsAppUrl({ phone: "34600111222", message: "Consulta", attribution: touch, pagePath: "/contacto?email=private@example.invalid#form" })).searchParams.get("text");
  assert.match(whatsapp, /Ref: AI_GPT/);
  assert.match(whatsapp, /Origen: ChatGPT/);
  assert.doesNotMatch(whatsapp, /private-id|private@example|utm_source=/);
  assert.equal(sanitizeLeadAttribution({ ...lead, ai_source: "invented", ai_referral: true }).ai_referral, false);
  assert.equal(sanitizeLeadAttribution({ ...lead, ai_referral: "true" }).ai_referral, false);
  assert.equal(sanitizeLeadAttribution({ referrer: "https://claude.ai/chat/private-id?q=prompt" }).referrer, "https://claude.ai/");
});

test("no consent stores or submits no assistant attribution, withdrawal clears stale state", () => {
  const storage = new Map();
  let reads = 0, writes = 0;
  let categories = { analytics: false, advertisement: false };
  globalThis.window = {
    location: { href: "https://aquigolf.es/?utm_source=chatgpt.com&utm_campaign=guia", hostname: "aquigolf.es" },
    localStorage: {
      getItem: (key) => { reads++; return storage.get(key) ?? null; },
      setItem: (key, value) => { writes++; storage.set(key, value); },
      removeItem: (key) => storage.delete(key),
    },
  };
  globalThis.document = { referrer: "https://chatgpt.com/c/private-id" };
  try {
    assert.equal(captureAttribution({ now: START }).expiresAt, "");
    assert.equal(reads, 0); assert.equal(writes, 0);
    window.getCkyConsent = () => ({ isUserActionCompleted: true, categories });
    categories = { analytics: true, advertisement: false };
    const accepted = captureAttribution();
    assert.equal(accepted.lastTouch.ai_source, "chatgpt");
    assert.doesNotMatch(storage.get(ATTRIBUTION_STORAGE_KEY), /private-id/);
    categories = { analytics: false, advertisement: false };
    const rejectedEvent = attributionEventData(accepted);
    assert.equal(rejectedEvent.ai_source, "");
    assert.equal(rejectedEvent.ai_referral, false);
    assert.equal(getWhatsAppReference(accepted), "DIRECT");
    const lead = toLeadAttribution(accepted);
    assert.equal(lead.source, "direct");
    assert.equal(lead.ai_source, undefined);
    assert.equal(storage.size, 0);
    const whatsapp = new URL(buildWhatsAppUrl({ phone: "34600111222", message: "Consulta", attribution: accepted })).searchParams.get("text");
    assert.doesNotMatch(whatsapp, /AI_GPT|ChatGPT|guia/);
  } finally {
    delete globalThis.window; delete globalThis.document;
  }
});

test("analytics-only consent removes advertising IDs without reclassifying a paid visit as AI", () => {
  const storage = new Map();
  globalThis.window = {
    location: { href: "https://aquigolf.es/?utm_source=chatgpt.com&utm_medium=organic&gclid=PRIVATE-CLICK", hostname: "aquigolf.es" },
    getCkyConsent: () => ({ isUserActionCompleted: true, categories: { analytics: true, advertisement: false } }),
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) },
  };
  globalThis.document = { referrer: "https://chatgpt.com/c/private-id" };
  try {
    const captured = captureAttribution();
    assert.doesNotMatch(storage.get(ATTRIBUTION_STORAGE_KEY), /PRIVATE-CLICK|gclid=|private-id/);
    assert.equal(attributionEventData(captured).ai_referral, false);
    assert.equal(toLeadAttribution(captured).ai_referral, false);
    assert.equal(captureAttribution().lastTouch.ai_referral, false);
  } finally {
    delete globalThis.window; delete globalThis.document;
  }
});

test("WhatsApp interaction refreshes an already rendered link after consent changes", () => {
  const storage = new Map();
  let allowed = true;
  globalThis.window = {
    location: { href: "https://aquigolf.es/?utm_source=chatgpt.com&utm_campaign=guia", hostname: "aquigolf.es" },
    getCkyConsent: () => ({ isUserActionCompleted: true, categories: { analytics: allowed, advertisement: false } }),
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) },
  };
  globalThis.document = { referrer: "https://chatgpt.com/" };
  try {
    const accepted = captureAttribution();
    const options = { phone: "34600111222", message: "Consulta", attribution: accepted, pagePath: "/contacto", button: "hero" };
    const target = { href: buildWhatsAppUrl(options) };
    assert.match(new URL(target.href).searchParams.get("text"), /AI_GPT/);
    allowed = false;
    const rejected = prepareWhatsAppLink({ currentTarget: target }, options);
    assert.equal(target.href, rejected.href);
    assert.doesNotMatch(new URL(target.href).searchParams.get("text"), /AI_GPT|ChatGPT|guia/);
    assert.match(new URL(target.href).searchParams.get("text"), /Consulta/);
    assert.match(new URL(target.href).searchParams.get("text"), /Página: \/contacto/);
    assert.equal(storage.size, 0);
    allowed = true;
    const refreshed = prepareWhatsAppLink({ currentTarget: target }, options);
    assert.equal(refreshed.attribution.lastTouch.ai_source, "chatgpt");
    assert.match(new URL(target.href).searchParams.get("text"), /AI_GPT/);
  } finally {
    delete globalThis.window; delete globalThis.document;
  }
});

test("website handler forwards assistant first/last fields to a mocked CRM without changing its top-level contract", async () => {
  const savedEnv = new Map(["RESEND_API_KEY", "CRM_WEBHOOK_URL", "CRM_WEBHOOK_SECRET"].map((key) => [key, process.env[key]]));
  Object.assign(process.env, { RESEND_API_KEY: "test-local-only", CRM_WEBHOOK_URL: "https://crm.example.invalid/lead", CRM_WEBHOOK_SECRET: "test-local-only" });
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), body: JSON.parse(options.body) });
    return { ok: true, status: 200, json: async () => String(url).includes("resend.com") ? { id: "email-local" } : { ok: true, leadId: "lead-local" } };
  };
  try {
    const { default: handler } = await import("../api/website-lead.js");
    const lead = toLeadAttribution(mergeAttribution(null, detect({ referrer: "https://chatgpt.com/" }), { now: START }));
    const response = { statusCode: 0, payload: null, setHeader() {}, status(code) { this.statusCode = code; return this; }, json(payload) { this.payload = payload; return this; } };
    await handler({ method: "POST", body: { privacyConsent: true, name: "Prueba local", email: "test@example.invalid", phone: "600111222", projectType: "Garaje / sótano", budget: "20.000 € - 30.000 €", dimensions: "4 x 5 x 3", sourceDeclared: "Otro", attribution: lead } }, response);
    assert.equal(response.statusCode, 200);
    assert.equal(response.payload.crmSynced, true);
    const crm = calls.find((call) => call.url.includes("crm.example.invalid")).body;
    assert.equal(crm.attribution.ai_source, "chatgpt");
    assert.equal(crm.attribution.ai_referral, true);
    assert.equal(crm.attribution.firstTouch.ai_source, "chatgpt");
    assert.equal(crm.attribution.lastTouch.ai_source, "chatgpt");
    assert.equal(crm.sourceDeclared, "Otro");
    assert.equal(Object.hasOwn(crm, "ai_source"), false);
    const email = calls.find((call) => call.url.includes("resend.com")).body;
    assert.match(email.text, /Referencia IA: chatgpt/);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of savedEnv) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
