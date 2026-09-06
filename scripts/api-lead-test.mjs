import assert from "node:assert/strict";
import { after, test } from "node:test";

const RESEND_URL = "https://api.resend.com/emails";
const CRM_URL = "https://crm.test.invalid/lead";
const TEST_ENV = {
  RESEND_API_KEY: "re_test_local_only",
  CRM_WEBHOOK_URL: CRM_URL,
  CRM_WEBHOOK_SECRET: "crm_test_local_only",
  SIGNATURE_LEAD_TO: "leads.test@golfencasa.invalid",
  SIGNATURE_LEAD_FROM: "Golf en Casa Test <noreply@golfencasa.invalid>",
};

const originalEnvironment = new Map(
  Object.keys(TEST_ENV).map((key) => [key, process.env[key]]),
);
Object.assign(process.env, TEST_ENV);

const [{ default: websiteLead }, { default: signatureLead }, { default: viabilityLead }] =
  await Promise.all([
    import("../api/website-lead.js"),
    import("../api/signature-lead.js"),
    import("../api/viability-lead.js"),
  ]);

after(() => {
  for (const [key, value] of originalEnvironment) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const attribution = Object.freeze({
  source: "google",
  medium: "cpc",
  campaign: "seo-local-contract",
  content: "landing-a",
  term: "simulador golf casa",
  gclid: "gclid-test-123",
  gbraid: "gbraid-test-234",
  wbraid: "wbraid-test-345",
  msclkid: "msclkid-test-456",
  fbclid: "fbclid-test-456",
  landingPage: "https://www.golfencasa.net/instalacion-simuladores-golf?utm_source=google",
  conversionPage: "/instalacion-simuladores-golf#formulario",
  referrer: "https://www.google.com/",
  capturedAt: "2026-09-03T12:00:00.000Z",
});

const extendedAttribution = Object.freeze({
  version: 2,
  attributionModel: "last_touch",
  source: "meta",
  medium: "paid_social",
  campaign: "meta-retargeting",
  content: "video-proyecto",
  term: "",
  // Los IDs legacy incluyen el fallback recibido del cliente. El API no debe
  // reconstruirlos ni descartar el clic de Google porque el último toque sea Meta.
  gclid: "gclid-first-google-123",
  gbraid: "gbraid-first-google-234",
  wbraid: "wbraid-first-google-345",
  msclkid: "",
  fbclid: "fbclid-last-meta-456",
  landingPage:
    "https://www.golfencasa.net/proyectos?utm_source=meta&utm_medium=paid_social",
  conversionPage: "/estudio-simulador-golf#formulario",
  referrer: "https://www.facebook.com/",
  capturedAt: "2026-09-03T13:00:00.000Z",
  firstTouch: {
    source: "google",
    medium: "cpc",
    campaign: "google-search-simulador",
    content: "anuncio-a",
    term: "simulador de golf para casa",
    gclid: "gclid-first-google-123",
    gbraid: "gbraid-first-google-234",
    wbraid: "wbraid-first-google-345",
    msclkid: "",
    fbclid: "",
    landingPage:
      "https://www.golfencasa.net/instalacion-simuladores-golf?utm_source=google",
    referrer: "https://www.google.com/",
    capturedAt: "2026-09-03T12:00:00.000Z",
  },
  lastTouch: {
    source: "meta",
    medium: "paid_social",
    campaign: "meta-retargeting",
    content: "video-proyecto",
    term: "",
    gclid: "",
    gbraid: "",
    wbraid: "",
    msclkid: "",
    fbclid: "fbclid-last-meta-456",
    landingPage:
      "https://www.golfencasa.net/proyectos?utm_source=meta&utm_medium=paid_social",
    referrer: "https://www.facebook.com/",
    capturedAt: "2026-09-03T13:00:00.000Z",
  },
});

const endpoints = [
  {
    name: "website-lead",
    handler: websiteLead,
    validBody: {
      privacyConsent: true,
      name: "Lead Web",
      email: "web.lead@example.com",
      phone: "+34 600 111 222",
      city: "Sevilla",
      projectType: "Garaje / sótano",
      budget: "10.000 € - 20.000 €",
      dimensions: "4,2 x 5,5 x 2,9 m",
      sourceDeclared: "Google",
      message: "Quiero una propuesta llave en mano.",
      attribution,
    },
    crmKeys: [
      "secret",
      "leadType",
      "name",
      "email",
      "phone",
      "city",
      "projectType",
      "budget",
      "dimensions",
      "sourceDeclared",
      "message",
      "attribution",
    ],
    crmValues: {
      leadType: "website_general_enquiry",
      name: "Lead Web",
      email: "web.lead@example.com",
      phone: "+34 600 111 222",
      city: "Sevilla",
      projectType: "Garaje / sótano",
      budget: "10.000 € - 20.000 €",
      dimensions: "4,2 x 5,5 x 2,9 m",
      sourceDeclared: "Google",
    },
  },
  {
    name: "signature-lead",
    handler: signatureLead,
    validBody: {
      privacyConsent: true,
      leadType: "signature_project",
      name: "Lead Signature",
      company: "Arquitectura Ejemplo",
      email: "signature.lead@example.com",
      phone: "+34 600 333 444",
      location: "Madrid",
      profile: "Cliente particular",
      projectType: "Sala dedicada",
      stage: "Proyecto definido",
      dimensions: "6 x 5 x 3,2 m",
      investment: "Más de 40.000 €",
      sourceDeclared: "Google",
      message: "Busco integración arquitectónica completa.",
      attribution: {
        ...attribution,
        landingPage: "https://www.golfencasa.net/signature?utm_source=google",
        conversionPage: "/signature#contact",
      },
    },
    crmKeys: [
      "secret",
      "leadType",
      "name",
      "email",
      "phone",
      "city",
      "projectType",
      "budget",
      "dimensions",
      "sourceDeclared",
      "message",
      "attribution",
    ],
    crmValues: {
      leadType: "signature_project",
      name: "Lead Signature",
      email: "signature.lead@example.com",
      phone: "+34 600 333 444",
      city: "Madrid",
      projectType: "Sala dedicada",
      budget: "Más de 40.000 €",
      dimensions: "6 x 5 x 3,2 m",
      sourceDeclared: "Google",
    },
  },
  {
    name: "signature-technical-lead",
    handler: signatureLead,
    validBody: {
      privacyConsent: true,
      leadType: "signature_technical_request",
      name: "Lead Técnico",
      company: "Estudio Ejemplo",
      email: "tecnico.lead@example.com",
      phone: "+34 600 777 888",
      location: "Málaga",
      profile: "Arquitecto",
      projectType: "Villa",
      dimensions: "6,5 x 5,2 x 3,2 m",
      investment: "€35,000 – €50,000",
      sourceDeclared: "Google",
      message: "Necesito documentación técnica de integración.",
      attribution: {
        ...attribution,
        landingPage: "https://www.golfencasa.net/signature?utm_source=google",
        conversionPage: "/signature#professionals",
      },
    },
    crmKeys: [
      "secret",
      "leadType",
      "name",
      "email",
      "phone",
      "city",
      "projectType",
      "budget",
      "dimensions",
      "sourceDeclared",
      "message",
      "attribution",
    ],
    crmValues: {
      leadType: "signature_technical_request",
      name: "Lead Técnico",
      email: "tecnico.lead@example.com",
      phone: "+34 600 777 888",
      city: "Málaga",
      projectType: "Villa",
      budget: "€35,000 – €50,000",
      dimensions: "6,5 x 5,2 x 3,2 m",
      sourceDeclared: "Google",
    },
  },
  {
    name: "viability-lead",
    handler: viabilityLead,
    validBody: {
      privacyConsent: true,
      name: "Lead Viabilidad",
      email: "viability.lead@example.com",
      phone: "+34 600 555 666",
      city: "Sevilla",
      projectType: "Simulador para vivienda",
      budget: "15.000–25.000 €",
      dimensions: "5,8 x 4,6 x 3,1 m",
      sourceDeclared: "Google",
      message: "Necesito validar altura y profundidad.",
      attribution: {
        ...attribution,
        conversionPage: "/instalacion-simuladores-golf#estudio",
      },
    },
    crmKeys: [
      "secret",
      "name",
      "email",
      "phone",
      "city",
      "projectType",
      "budget",
      "dimensions",
      "sourceDeclared",
      "message",
      "attribution",
    ],
    crmValues: {
      name: "Lead Viabilidad",
      email: "viability.lead@example.com",
      phone: "+34 600 555 666",
      city: "Sevilla",
      projectType: "Simulador para vivienda",
      budget: "15.000–25.000 €",
      dimensions: "5,8 x 4,6 x 3,1 m",
      sourceDeclared: "Google",
    },
  },
];

function clone(value) {
  return structuredClone(value);
}

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return clone(body);
    },
  };
}

function responseRecorder() {
  return {
    statusCode: null,
    payload: null,
    headers: new Map(),
    setHeader(name, value) {
      this.headers.set(String(name).toLowerCase(), value);
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

function parseRequestBody(options) {
  assert.equal(typeof options?.body, "string", "el fetch saliente debe serializar JSON");
  return JSON.parse(options.body);
}

async function invoke(endpoint, body, fetchImplementation) {
  const originalFetch = globalThis.fetch;
  const originalConsoleError = console.error;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    const call = { url: String(url), options };
    calls.push(call);
    return fetchImplementation(call, calls.length - 1);
  };
  console.error = () => {};

  const response = responseRecorder();
  try {
    await endpoint.handler({ method: "POST", body: clone(body) }, response);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalConsoleError;
  }

  return { response, calls };
}

function unexpectedFetch({ url }) {
  throw new Error(`Acceso de red no esperado en la prueba: ${url}`);
}

function assertSuccessAfterEmail(response, resendId = "email-test-id") {
  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.ok, true);
  assert.equal(response.payload.id, resendId);
}

function assertConsentEvidence(value, label) {
  const text = String(value ?? "");
  assert.match(text, /consent/i, `${label}: debe documentar el consentimiento`);
  assert.match(
    text,
    /pol[ií]tica|policy|versi[oó]n|version/i,
    `${label}: debe documentar policyVersion`,
  );
  assert.match(
    text,
    /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z\b/,
    `${label}: debe documentar acceptedAt como fecha ISO`,
  );
}

function assertCrmContract(endpoint, crmPayload) {
  assert.deepEqual(
    Object.keys(crmPayload).sort(),
    [...endpoint.crmKeys].sort(),
    `${endpoint.name}: conserva exactamente las claves top-level del CRM`,
  );
  assert.equal(crmPayload.secret, TEST_ENV.CRM_WEBHOOK_SECRET);
  for (const [key, expected] of Object.entries(endpoint.crmValues)) {
    assert.deepEqual(crmPayload[key], expected, `${endpoint.name}: preserva CRM.${key}`);
  }
  assert.deepEqual(
    crmPayload.attribution,
    endpoint.validBody.attribution,
    `${endpoint.name}: preserva atribución en el CRM`,
  );
  assert.ok(!Object.hasOwn(crmPayload, "consent"), "consent no debe ser top-level en CRM");
  assert.ok(
    !Object.hasOwn(crmPayload, "privacyConsent"),
    "privacyConsent no debe ser top-level en CRM",
  );
  assertConsentEvidence(crmPayload.message, `${endpoint.name} CRM.message`);
}

function assertResendContract(endpoint, resendPayload) {
  assert.equal(resendPayload.reply_to, endpoint.validBody.email);
  assert.ok(!Object.hasOwn(resendPayload, "consent"));
  assert.ok(!Object.hasOwn(resendPayload, "privacyConsent"));
  assertConsentEvidence(resendPayload.text, `${endpoint.name} email.text`);
  assertConsentEvidence(resendPayload.html, `${endpoint.name} email.html`);
}

function assertFirstLastTouchEmail(endpoint, resendPayload) {
  for (const [format, value] of [
    ["text", resendPayload.text],
    ["html", resendPayload.html],
  ]) {
    const output = String(value ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ");
    const label = `${endpoint.name} email.${format}`;

    assert.match(output, /Modelo de atribución[^\n]*last_touch/i, label);
    assert.match(output, /Primer contacto[^\n<]*Fuente \/ medio/i, label);
    assert.match(output, /google \/ cpc/i, label);
    assert.match(output, /google-search-simulador/i, label);
    assert.match(output, /gclid-first-google-123/i, label);
    assert.match(output, /instalacion-simuladores-golf/i, label);
    assert.match(output, /Último contacto[^\n<]*Fuente \/ medio/i, label);
    assert.match(output, /meta \/ paid_social/i, label);
    assert.match(output, /meta-retargeting/i, label);
    assert.match(output, /fbclid-last-meta-456/i, label);
    assert.match(output, /\/proyectos/i, label);

    // Las filas históricas continúan presentes además del nuevo resumen.
    assert.match(output, /Fuente \/ medio[^\n<]*meta \/ paid_social/i, label);
    assert.match(output, /GCLID[^\n<]*gclid-first-google-123/i, label);
    assert.match(output, /FBCLID[^\n<]*fbclid-last-meta-456/i, label);
  }
}

for (const endpoint of endpoints) {
  test(`${endpoint.name}: rechaza consentimiento ausente, falso o no booleano`, async () => {
    const invalidValues = [undefined, false, "true", 1, null];

    for (const invalidValue of invalidValues) {
      const body = clone(endpoint.validBody);
      if (invalidValue === undefined) delete body.privacyConsent;
      else body.privacyConsent = invalidValue;

      const { response, calls } = await invoke(endpoint, body, unexpectedFetch);
      assert.equal(response.statusCode, 400, `privacyConsent=${String(invalidValue)}`);
      assert.equal(response.payload.ok, false);
      assert.match(response.payload.error, /consent/i);
      assert.equal(calls.length, 0, "no contacta Resend ni CRM");
    }
  });

  test(`${endpoint.name}: filtra honeypot antes de validar consentimiento`, async () => {
    const body = clone(endpoint.validBody);
    delete body.privacyConsent;
    body.companyWebsite = "https://spam.invalid";

    const { response, calls } = await invoke(endpoint, body, unexpectedFetch);
    assert.equal(response.statusCode, 200);
    assert.equal(response.payload.ok, true);
    assert.equal(calls.length, 0, "un bot filtrado no contacta Resend ni CRM");
  });

  test(`${endpoint.name}: éxito Resend + CRM conserva contrato y evidencia`, async () => {
    const { response, calls } = await invoke(endpoint, endpoint.validBody, ({ url }) => {
      if (url === RESEND_URL) return jsonResponse(200, { id: "email-success" });
      if (url === CRM_URL) return jsonResponse(200, { ok: true, leadId: "crm-success" });
      return unexpectedFetch({ url });
    });

    assertSuccessAfterEmail(response, "email-success");
    assert.equal(response.payload.crmSynced, true);
    assert.equal(response.payload.crmLeadId, "crm-success");
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, RESEND_URL);
    assert.equal(calls[1].url, CRM_URL);

    const resendPayload = parseRequestBody(calls[0].options);
    const crmPayload = parseRequestBody(calls[1].options);
    assertResendContract(endpoint, resendPayload);
    assertCrmContract(endpoint, crmPayload);
  });

  test(`${endpoint.name}: conserva Google first-touch y Meta last-touch en CRM y email`, async () => {
    const body = clone(endpoint.validBody);
    body.attribution = clone(extendedAttribution);
    const extendedEndpoint = { ...endpoint, validBody: body };

    const { response, calls } = await invoke(endpoint, body, ({ url }) => {
      if (url === RESEND_URL) return jsonResponse(200, { id: "email-first-last" });
      if (url === CRM_URL) return jsonResponse(200, { ok: true, leadId: "crm-first-last" });
      return unexpectedFetch({ url });
    });

    assertSuccessAfterEmail(response, "email-first-last");
    assert.equal(response.payload.crmSynced, true);
    assert.equal(calls.length, 2);

    const resendPayload = parseRequestBody(calls[0].options);
    const crmPayload = parseRequestBody(calls[1].options);
    assertResendContract(extendedEndpoint, resendPayload);
    assertCrmContract(extendedEndpoint, crmPayload);
    assert.equal(crmPayload.attribution.version, 2);
    assert.equal(crmPayload.attribution.attributionModel, "last_touch");
    assert.equal(
      crmPayload.attribution.gclid,
      extendedAttribution.gclid,
      `${endpoint.name}: conserva el GCLID legacy recibido`,
    );
    assert.equal(
      crmPayload.attribution.fbclid,
      extendedAttribution.fbclid,
      `${endpoint.name}: conserva el FBCLID legacy recibido`,
    );
    assert.deepEqual(crmPayload.attribution.firstTouch, extendedAttribution.firstTouch);
    assert.deepEqual(crmPayload.attribution.lastTouch, extendedAttribution.lastTouch);
    assertFirstLastTouchEmail(endpoint, resendPayload);
  });

  test(`${endpoint.name}: si Resend responde error no llama al CRM`, async () => {
    const { response, calls } = await invoke(endpoint, endpoint.validBody, ({ url }) => {
      assert.equal(url, RESEND_URL);
      return jsonResponse(503, { message: "resend unavailable in test" });
    });

    assert.equal(response.statusCode, 502);
    assert.equal(response.payload.ok, false);
    assert.equal(calls.length, 1);
  });

  test(`${endpoint.name}: tolera error de red del CRM tras entregar email`, async () => {
    const { response, calls } = await invoke(endpoint, endpoint.validBody, ({ url }) => {
      if (url === RESEND_URL) return jsonResponse(200, { id: "email-before-crm-error" });
      if (url === CRM_URL) throw new Error("simulated CRM network error");
      return unexpectedFetch({ url });
    });

    assertSuccessAfterEmail(response, "email-before-crm-error");
    assert.equal(response.payload.crmSynced, false);
    assert.equal(response.payload.crmLeadId, null);
    assert.equal(calls.length, 2);
  });

  test(`${endpoint.name}: tolera respuesta 500 del CRM tras entregar email`, async () => {
    const { response, calls } = await invoke(endpoint, endpoint.validBody, ({ url }) => {
      if (url === RESEND_URL) return jsonResponse(200, { id: "email-before-crm-500" });
      if (url === CRM_URL) return jsonResponse(500, { ok: false, error: "test" });
      return unexpectedFetch({ url });
    });

    assertSuccessAfterEmail(response, "email-before-crm-500");
    assert.equal(response.payload.crmSynced, false);
    assert.equal(response.payload.crmLeadId, null);
    assert.equal(calls.length, 2);
  });

  test(`${endpoint.name}: aborta CRM por timeout sin convertir el lead en error`, async () => {
    const originalSetTimeout = globalThis.setTimeout;
    const observedTimeouts = [];
    let crmSignal = null;

    globalThis.setTimeout = (callback, milliseconds, ...args) => {
      observedTimeouts.push(milliseconds);
      return originalSetTimeout(callback, 1, ...args);
    };

    try {
      const { response, calls } = await invoke(endpoint, endpoint.validBody, ({ url, options }) => {
        if (url === RESEND_URL) return jsonResponse(200, { id: "email-before-crm-timeout" });
        if (url !== CRM_URL) return unexpectedFetch({ url });

        crmSignal = options.signal ?? null;
        if (!crmSignal) throw new Error("CRM fetch sin AbortSignal");
        return new Promise((resolve, reject) => {
          if (crmSignal.aborted) {
            const error = new Error("aborted");
            error.name = "AbortError";
            reject(error);
            return;
          }
          crmSignal.addEventListener(
            "abort",
            () => {
              const error = new Error("aborted");
              error.name = "AbortError";
              reject(error);
            },
            { once: true },
          );
        });
      });

      assertSuccessAfterEmail(response, "email-before-crm-timeout");
      assert.equal(response.payload.crmSynced, false);
      assert.equal(response.payload.crmLeadId, null);
      assert.equal(calls.length, 2);
      assert.ok(crmSignal instanceof AbortSignal, "el CRM recibe un AbortSignal");
      assert.equal(crmSignal.aborted, true, "el timeout aborta la petición CRM");
      assert.ok(
        observedTimeouts.some((milliseconds) => Number(milliseconds) > 0),
        "el handler programa un timeout positivo",
      );
    } finally {
      globalThis.setTimeout = originalSetTimeout;
    }
  });
}
