const EMAIL_TO = process.env.SIGNATURE_LEAD_TO || "info@golfencasa.net";
const EMAIL_FROM =
  process.env.SIGNATURE_LEAD_FROM ||
  "Golf en Casa Signature <signature@golfencasa.net>";

const projectRequiredFields = [
  "name",
  "email",
  "phone",
  "location",
  "profile",
  "projectType",
  "stage",
];

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

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return response.status(500).json({ ok: false, error: "Email service unavailable" });
  }

  let body;
  try {
    body = request.body;
  } catch {
    return response.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  if (!body || typeof body !== "object") {
    return response.status(400).json({ ok: false, error: "Invalid payload" });
  }

  // Honeypot: bots often fill hidden fields.
  if (clean(body.companyWebsite, 200)) {
    return response.status(200).json({ ok: true });
  }

  const data = {
    leadType:
      clean(body.leadType, 80) === "signature_technical_request"
        ? "signature_technical_request"
        : "signature_project",
    name: clean(body.name, 120),
    company: clean(body.company, 180),
    email: clean(body.email, 254),
    phone: clean(body.phone, 80),
    location: clean(body.location, 160),
    profile: clean(body.profile, 120),
    projectType: clean(body.projectType, 120),
    stage: clean(body.stage, 120),
    dimensions: clean(body.dimensions, 160),
    investment: clean(body.investment, 120),
    message: clean(body.message, 4000),
    attribution: {
      source: clean(body.attribution?.source, 120),
      medium: clean(body.attribution?.medium, 120),
      campaign: clean(body.attribution?.campaign, 200),
      content: clean(body.attribution?.content, 200),
      term: clean(body.attribution?.term, 300),
      gclid: clean(body.attribution?.gclid, 300),
      fbclid: clean(body.attribution?.fbclid, 300),
      landingPage: clean(body.attribution?.landingPage, 500),
      referrer: clean(body.attribution?.referrer, 500),
      capturedAt: clean(body.attribution?.capturedAt, 80),
    },
  };

  const requiredFields =
    data.leadType === "signature_technical_request"
      ? ["name", "email", "profile"]
      : projectRequiredFields;

  for (const field of requiredFields) {
    if (!data[field]) {
      return response
        .status(400)
        .json({ ok: false, error: `Missing required field: ${field}` });
    }
  }

  if (!isValidEmail(data.email)) {
    return response.status(400).json({ ok: false, error: "Invalid email" });
  }

  const sourceLabel = [data.attribution.source, data.attribution.medium]
    .filter(Boolean)
    .join(" / ") || "direct / none";

  const isTechnical = data.leadType === "signature_technical_request";

  const subject = isTechnical
    ? `Signature — Solicitud de información técnica — ${data.name}${data.company ? ` — ${data.company}` : ""}`
    : `Signature Project — ${data.name} — ${data.location}`;

  const rows = isTechnical
    ? [
        ["Tipo de solicitud", "Información técnica"],
        ["Nombre", data.name],
        ["Email", data.email],
        ["Empresa / estudio", data.company || "No indicado"],
        ["Perfil profesional", data.profile],
        ["Fuente / medio", sourceLabel],
        ["Campaña", data.attribution.campaign || "No disponible"],
        ["Contenido", data.attribution.content || "No disponible"],
        ["Término", data.attribution.term || "No disponible"],
        ["Landing", data.attribution.landingPage || "/signature"],
        ["GCLID", data.attribution.gclid || "No disponible"],
        ["FBCLID", data.attribution.fbclid || "No disponible"],
      ]
    : [
        ["Tipo de solicitud", "Signature Project"],
        ["Nombre", data.name],
        ["Email", data.email],
        ["Teléfono", data.phone],
        ["Ubicación", data.location],
        ["Perfil", data.profile],
        ["Tipo de proyecto", data.projectType],
        ["Estado", data.stage],
        ["Dimensiones", data.dimensions || "No indicado"],
        ["Inversión prevista", data.investment || "Por definir"],
        ["Fuente / medio", sourceLabel],
        ["Campaña", data.attribution.campaign || "No disponible"],
        ["Contenido", data.attribution.content || "No disponible"],
        ["Término", data.attribution.term || "No disponible"],
        ["Landing", data.attribution.landingPage || "/signature"],
        ["GCLID", data.attribution.gclid || "No disponible"],
        ["FBCLID", data.attribution.fbclid || "No disponible"],
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
          <div style="font-size:12px;letter-spacing:2px;color:#c8aa7d">GOLF EN CASA | SIGNATURE PROJECTS</div>
          <h1 style="margin:10px 0 0;color:#f5f3ef;font-size:24px;font-weight:500">${isTechnical ? "Nueva solicitud de información técnica" : "Nueva solicitud Signature"}</h1>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${htmlRows}
        </table>

        <div style="padding:24px 28px">
          <div style="font-size:12px;letter-spacing:1.5px;color:#9c7b4f;font-weight:700;margin-bottom:10px">${isTechnical ? "INFORMACIÓN SOLICITADA" : "MENSAJE"}</div>
          <div style="white-space:pre-wrap;line-height:1.65;color:#333">${escapeHtml(data.message || "Sin mensaje adicional")}</div>
        </div>
      </div>
    </div>`;

  const text = [
    "GOLF EN CASA | SIGNATURE PROJECTS",
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
          { name: "source", value: data.leadType },
          { name: "profile", value: data.profile.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256) || "unknown" },
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

    // Sincroniza el lead con el CRM de Google Sheets.
    // El email es la fuente de seguridad: si el CRM falla, no perdemos el lead
    // ni mostramos un falso error al usuario después de haber recibido el correo.
    let crmSynced = false;
    let crmLeadId = null;

    if (process.env.CRM_WEBHOOK_URL && process.env.CRM_WEBHOOK_SECRET) {
      try {
        const isTechnical = data.leadType === "signature_technical_request";

        const crmResponse = await fetch(process.env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: process.env.CRM_WEBHOOK_SECRET,
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            city: data.location || "",
            projectType: isTechnical ? "Colaboración / B2B" : data.projectType,
            budget: data.investment || "Sin definir",
            dimensions: data.dimensions || "",
            sourceDeclared: "",
            message: isTechnical
              ? [
                  data.company ? `Empresa / estudio: ${data.company}` : "",
                  data.profile ? `Perfil profesional: ${data.profile}` : "",
                  data.message ? `Información solicitada: ${data.message}` : "",
                ].filter(Boolean).join("\n\n")
              : [
                  data.profile ? `Perfil: ${data.profile}` : "",
                  data.stage ? `Estado del proyecto: ${data.stage}` : "",
                  data.message || "",
                ].filter(Boolean).join("\n\n"),
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
        console.error("CRM webhook request failed", crmError);
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
    console.error("Signature lead error", error);
    return response.status(500).json({ ok: false, error: "Unexpected server error" });
  }
}
