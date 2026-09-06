import {
  getAttributionSummaryRows,
  sanitizeLeadAttribution,
} from "./_lib/lead-attribution.js";

const EMAIL_TO = process.env.SIGNATURE_LEAD_TO || "info@golfencasa.net";
const EMAIL_FROM =
  process.env.SIGNATURE_LEAD_FROM ||
  "Golf en Casa <info@golfencasa.net>";

const CRM_TIMEOUT_MS = 2500;
const PRIVACY_POLICY_VERSION = "2026-09-03";

const clean = (value, max = 500) =>
  String(value ?? "")
    .trim()
    .replace(/\u0000/g, "")
    .slice(0, max);

const escapeHtml = (value) =>
  clean(value, 5000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = request.body;

  if (!body || typeof body !== "object") {
    return response.status(400).json({ ok: false, error: "Invalid payload" });
  }

  // Honeypot antispam.
  if (clean(body.companyWebsite, 200)) {
    return response.status(200).json({ ok: true, filtered: true });
  }

  if (body.privacyConsent !== true) {
    return response
      .status(400)
      .json({ ok: false, error: "Privacy consent required" });
  }

  const data = {
    leadType: "website_general_enquiry",
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    phone: clean(body.phone, 80),
    city: clean(body.city, 160),
    projectType: clean(body.projectType || body.space, 120),
    budget: clean(body.budget, 120),
    dimensions: clean(body.dimensions, 200),
    sourceDeclared: clean(body.sourceDeclared, 160),
    message: clean(body.message, 4000),
    attribution: sanitizeLeadAttribution(body.attribution),
  };

  for (const field of [
    "name",
    "email",
    "phone",
    "projectType",
    "budget",
    "dimensions",
    "sourceDeclared",
  ]) {
    if (!data[field]) {
      return response
        .status(400)
        .json({ ok: false, error: `Missing required field: ${field}` });
    }
  }

  if (!isValidEmail(data.email)) {
    return response.status(400).json({ ok: false, error: "Invalid email" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return response.status(500).json({ ok: false, error: "Email service unavailable" });
  }

  const consent = {
    acceptedAt: new Date().toISOString(),
    policyVersion: PRIVACY_POLICY_VERSION,
  };

  const consentRows = [
    ["Consentimiento de privacidad", "Sí"],
    ["acceptedAt", consent.acceptedAt],
    ["policyVersion", consent.policyVersion],
  ];

  const sourceLabel =
    [data.attribution.source, data.attribution.medium]
      .filter(Boolean)
      .join(" / ") || "direct / none";

  const subject = `Web Golf en Casa — Nueva solicitud — ${data.name}`;

  const rows = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ["Ciudad / provincia", data.city || "No indicado"],
    ["Tipo de instalación", data.projectType],
    ["Presupuesto aproximado", data.budget],
    ["Medidas del espacio", data.dimensions],
    ["Cómo nos ha conocido", data.sourceDeclared],
    ["Fuente / medio", sourceLabel],
    ["Campaña", data.attribution.campaign || "No disponible"],
    ["Contenido", data.attribution.content || "No disponible"],
    ["Término", data.attribution.term || "No disponible"],
    ["Landing", data.attribution.landingPage || "/"],
        ["Página de conversión", data.attribution.conversionPage || "No disponible"],
    ["Referrer", data.attribution.referrer || "No disponible"],
    ["GCLID", data.attribution.gclid || "No disponible"],
    ["GBRAID", data.attribution.gbraid || "No disponible"],
    ["WBRAID", data.attribution.wbraid || "No disponible"],
    ["MSCLKID", data.attribution.msclkid || "No disponible"],
    ["FBCLID", data.attribution.fbclid || "No disponible"],
    ...getAttributionSummaryRows(data.attribution),
    ...consentRows,
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e8e5df;font-weight:600;color:#6b6b6b;width:180px">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e8e5df;color:#0b0b0b">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#f5f3ef;padding:32px;color:#0b0b0b">
      <div style="max-width:760px;margin:0 auto;background:white;border:1px solid #e8e5df">
        <div style="background:#0b0b0b;padding:24px 28px">
          <div style="font-size:12px;letter-spacing:2px;color:#34d399">GOLF EN CASA</div>
          <h1 style="margin:10px 0 0;color:#f5f3ef;font-size:24px;font-weight:500">Nueva solicitud desde la web</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${htmlRows}
        </table>
        <div style="padding:24px 28px">
          <div style="font-size:12px;letter-spacing:1.5px;color:#059669;font-weight:700;margin-bottom:10px">MENSAJE</div>
          <div style="white-space:pre-wrap;line-height:1.65;color:#333">${escapeHtml(data.message || "Sin mensaje adicional")}</div>
        </div>
      </div>
    </div>`;

  const text = [
    "GOLF EN CASA — NUEVA SOLICITUD WEB",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensaje:",
    data.message || "Sin mensaje adicional",
  ].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        reply_to: data.email,
        subject,
        html,
        text,
        tags: [
          { name: "source", value: "website_general_enquiry" },
        ],
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend error", resendResponse.status, resendData);
      return response
        .status(502)
        .json({ ok: false, error: "Could not deliver lead email" });
    }

    let crmSynced = false;
    let crmLeadId = null;

    if (process.env.CRM_WEBHOOK_URL && process.env.CRM_WEBHOOK_SECRET) {
      const crmController = new AbortController();
      const crmTimeout = setTimeout(() => crmController.abort(), CRM_TIMEOUT_MS);

      try {
        const notes = [
          data.message ? `Mensaje: ${data.message}` : "",
          data.attribution.landingPage
            ? `Landing inicial: ${new URL(data.attribution.landingPage, "https://www.golfencasa.net").pathname}`
            : "",
          data.attribution.conversionPage
            ? `Página conversión: ${data.attribution.conversionPage}`
            : "",
          "Consentimiento de privacidad: Sí",
          `acceptedAt: ${consent.acceptedAt}`,
          `policyVersion: ${consent.policyVersion}`,
        ]
          .filter(Boolean)
          .join(" | ");

        const crmResponse = await fetch(process.env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: crmController.signal,
          body: JSON.stringify({
            secret: process.env.CRM_WEBHOOK_SECRET,
            leadType: data.leadType,
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            projectType: data.projectType,
            budget: data.budget,
            dimensions: data.dimensions,
            sourceDeclared: data.sourceDeclared,
            message: notes,
            attribution: data.attribution,
          }),
        });

        const crmData = await crmResponse.json().catch(() => ({}));

        if (crmResponse.ok && crmData.ok) {
          crmSynced = true;
          crmLeadId = crmData.leadId || null;
        } else {
          console.error("CRM webhook error", crmResponse.status, crmData);
        }
      } catch (crmError) {
        if (crmError?.name === "AbortError") {
          console.error(`CRM webhook timeout after ${CRM_TIMEOUT_MS} ms`);
        } else {
          console.error("CRM webhook request failed", crmError);
        }
      } finally {
        clearTimeout(crmTimeout);
      }
    } else {
      console.error("Missing CRM_WEBHOOK_URL or CRM_WEBHOOK_SECRET");
    }

    return response.status(200).json({
      ok: true,
      id: resendData.id || null,
      crmSynced,
      crmLeadId,
    });
  } catch (error) {
    console.error("Website lead error", error);
    return response.status(500).json({ ok: false, error: "Unexpected server error" });
  }
}
