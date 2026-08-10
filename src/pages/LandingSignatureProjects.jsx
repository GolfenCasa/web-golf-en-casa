import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  DraftingCompass,
  Headphones,
  Home,
  KeyRound,
  Lightbulb,
  Mail,
  Menu,
  Monitor,
  Ruler,
  ShieldCheck,
  Sparkles,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const WHATSAPP_PHONE = "34678107234";
const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";
const EMAIL = "info@golfencasa.net";
const ATTRIBUTION_STORAGE_KEY = "golf_en_casa_signature_attribution_v1";

const COLORS = {
  black: "#0B0B0B",
  graphite: "#1C1C1C",
  stone: "#6B6B6B",
  warm: "#F5F3EF",
  gold: "#C8AA7D",
};

const EMPTY_ATTRIBUTION = {
  source: "direct",
  medium: "none",
  campaign: "",
  content: "",
  term: "",
  gclid: "",
  fbclid: "",
  landingPage: "",
  referrer: "",
  capturedAt: "",
};

const readAttributionFromBrowser = () => {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const detected = {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    content: params.get("utm_content") || "",
    term: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer,
    capturedAt: new Date().toISOString(),
  };

  if (!detected.source) {
    if (detected.gclid) {
      detected.source = "google";
      detected.medium = "cpc";
    } else if (detected.fbclid) {
      detected.source = "meta";
      detected.medium = "paid_social";
    } else if (referrer.includes("google.")) {
      detected.source = "google";
      detected.medium = "organic";
    } else if (referrer.includes("facebook.com") || referrer.includes("instagram.com")) {
      detected.source = "meta";
      detected.medium = "referral";
    } else if (referrer) {
      try {
        detected.source = new URL(referrer).hostname.replace(/^www\./, "");
        detected.medium = "referral";
      } catch {
        detected.source = "referral";
        detected.medium = "referral";
      }
    } else {
      detected.source = "direct";
      detected.medium = "none";
    }
  }

  return detected;
};

const getStoredAttribution = () => {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;
  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : EMPTY_ATTRIBUTION;
  } catch {
    return EMPTY_ATTRIBUTION;
  }
};

const captureAttribution = () => {
  const detected = readAttributionFromBrowser();
  const stored = getStoredAttribution();
  const hasCampaignData = Boolean(
    detected.gclid ||
      detected.fbclid ||
      detected.campaign ||
      detected.source !== "direct"
  );
  const attribution = stored.capturedAt && !hasCampaignData ? stored : detected;

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution)
    );
  } catch {
    // Keep measurement running if localStorage is unavailable.
  }

  return attribution;
};

const classifyTrafficSource = ({ source, medium, gclid, fbclid, referrer }) => {
  const s = (source || "").toLowerCase();
  const m = (medium || "").toLowerCase();
  const r = (referrer || "").toLowerCase();

  if (gclid || (s === "google" && ["cpc", "ppc", "paid"].includes(m))) {
    return "Google Ads";
  }
  if (
    fbclid ||
    (["facebook", "instagram", "meta", "fb", "ig"].includes(s) &&
      ["cpc", "paid", "paid_social", "social_paid"].includes(m))
  ) {
    return "Meta Ads";
  }
  if (s === "linkedin" && ["cpc", "paid", "paid_social"].includes(m)) {
    return "LinkedIn Ads";
  }
  if (s === "google" || r.includes("google.")) return "Google orgánico";
  if (s && s !== "direct") return s;
  return "Acceso directo";
};

const attributionEventData = (a) => ({
  traffic_source: a.source || "direct",
  traffic_medium: a.medium || "none",
  traffic_campaign: a.campaign || "",
  traffic_content: a.content || "",
  traffic_term: a.term || "",
  landing_page: a.landingPage || "/signature",
  source_label: classifyTrafficSource(a),
  gclid_present: Boolean(a.gclid),
  fbclid_present: Boolean(a.fbclid),
});

const buildWhatsAppUrl = ({ message, attribution, location }) => {
  const trackingLines = [
    `Origen: ${classifyTrafficSource(attribution)}`,
    attribution.campaign ? `Campaña: ${attribution.campaign}` : "",
    attribution.term ? `Búsqueda: ${attribution.term}` : "",
    `Página: ${attribution.landingPage || "/signature"}`,
    `Botón: ${location}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `${message}\n\n---\n${trackingLines.join("\n")}`
  )}`;
};

const processSteps = [
  ["01", "DESCUBRIMIENTO", "Espacio · necesidades · objetivos"],
  ["02", "DISEÑO CONCEPTUAL", "Distribución · experiencia · estética"],
  ["03", "INGENIERÍA TÉCNICA", "Proyección · seguimiento · infraestructura"],
  ["04", "SELECCIÓN DE TECNOLOGÍA", "Monitor de lanzamiento · proyección · informática"],
  ["05", "COORDINACIÓN DE OBRA", "Arquitectura · interiorismo · instalaciones"],
  ["06", "INSTALACIÓN", "Estructura · acabados · tecnología"],
  ["07", "CALIBRACIÓN", "Imagen · seguimiento · software"],
  ["08", "ENTREGA PERSONALIZADA", "Pruebas · formación · entrega"],
];

const techItems = [
  ["01", "SEGUIMIENTO", "Launch monitor seleccionado específicamente para el espacio, el jugador y el uso previsto.", <Monitor />],
  ["02", "PROYECCIÓN", "Óptica, resolución y luminosidad calculadas para la geometría real de la sala.", <Lightbulb />],
  ["03", "INFORMÁTICA", "Hardware dimensionado para resolución, software y experiencia requerida.", <Sparkles />],
  ["04", "ILUMINACIÓN", "Iluminación diseñada para convivir con la proyección y el uso habitual de la estancia.", <Lightbulb />],
  ["05", "ACÚSTICA", "Tratamiento integrado para controlar impacto, reverberación y confort acústico.", <Volume2 />],
  ["06", "CONTROL", "Automatización de iluminación, AV y sistemas cuando el proyecto lo requiere.", <Wifi />],
];

const privatePillars = [
  ["DISEÑO A MEDIDA", "Cada proyecto parte de un espacio, unas necesidades y una visión diferentes.", <DraftingCompass />],
  ["INTEGRACIÓN ARQUITECTÓNICA", "Integramos el simulador en la arquitectura y el interiorismo de la vivienda.", <Home />],
  ["TECNOLOGÍA SIN CONCESIONES", "Seleccionamos la tecnología en función del proyecto, no al contrario.", <Monitor />],
  ["ENTREGA LLAVE EN MANO", "Coordinamos diseño, suministro, instalación, configuración y entrega final.", <KeyRound />],
];

const professionalServices = [
  ["PLANIFICACIÓN DEL ESPACIO", "Dimensiones, posición de golpeo, circulación y zonas de seguridad.", <Ruler />],
  ["ESPECIFICACIÓN TÉCNICA", "Electricidad, datos, proyección, tracking, iluminación y climatización.", <DraftingCompass />],
  ["COORDINACIÓN DE DISEÑO", "Integración con arquitectura, interiorismo y resto de instalaciones.", <Home />],
  ["ESPECIFICACIÓN TECNOLÓGICA", "Selección de tracking, proyección, PC, AV y control.", <Monitor />],
  ["COORDINACIÓN EN OBRA", "Coordinación técnica durante la ejecución.", <ShieldCheck />],
  ["PUESTA EN MARCHA", "Instalación, configuración, calibración y entrega.", <Sparkles />],
];

const faqs = [
  {
    q: "¿En qué fase debería contactar con Signature Projects?",
    a: "Cuanto antes, mejor. Un simulador de golf puede condicionar dimensiones, alturas, instalaciones, iluminación, climatización y acabados. Participar desde las primeras fases permite optimizar el proyecto y evitar modificaciones posteriores.",
  },
  {
    q: "¿Trabajáis con mi arquitecto o interiorista?",
    a: "Sí. Signature Projects puede integrarse en el equipo existente y colaborar directamente con arquitectos, interioristas, constructores y project managers.",
  },
  {
    q: "¿Puedo elegir el launch monitor y otros equipos?",
    a: "Sí. Trabajamos con diferentes fabricantes y seleccionamos la tecnología en función del espacio, las necesidades del jugador y los objetivos del proyecto.",
  },
  {
    q: "¿Realizáis proyectos fuera de España?",
    a: "Sí. Estudiamos proyectos nacionales e internacionales individualmente en función de ubicación y alcance.",
  },
  {
    q: "¿Puede ser una sala multifuncional?",
    a: "Sí. Podemos estudiar soluciones para combinar golf con cine, entretenimiento u otros usos, minimizando la presencia de la tecnología cuando no se utiliza.",
  },
  {
    q: "¿Cuánto cuesta un Signature Project?",
    a: "Cada proyecto se presupuesta individualmente. La inversión depende de las dimensiones, tecnología, acabados, complejidad de integración y alcance de nuestros servicios. Tras una primera conversación podremos determinar el enfoque más adecuado.",
  },
];

function SectionLabel({ children, dark = false }) {
  return (
    <p
      className={`signature-sans text-[11px] font-semibold uppercase tracking-[0.26em] ${
        dark ? "text-[#C8AA7D]" : "text-[#9C7B4F]"
      }`}
    >
      {children}
    </p>
  );
}

function PrimaryButton({ href, children, onClick, dark = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`signature-sans inline-flex items-center justify-center gap-2 border px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
        dark
          ? "border-[#F5F3EF] bg-[#F5F3EF] text-[#0B0B0B] hover:bg-transparent hover:text-[#F5F3EF]"
          : "border-[#0B0B0B] bg-[#0B0B0B] text-[#F5F3EF] hover:bg-transparent hover:text-[#0B0B0B]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function OutlineButton({ href, children, onClick, dark = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`signature-sans inline-flex items-center justify-center gap-2 border px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
        dark
          ? "border-white/30 text-[#F5F3EF] hover:border-[#C8AA7D] hover:text-[#C8AA7D]"
          : "border-[#0B0B0B]/30 text-[#0B0B0B] hover:border-[#C8AA7D] hover:text-[#9C7B4F]"
      }`}
    >
      {children}
    </a>
  );
}

function IconCard({ icon, title, text, dark = false }) {
  return (
    <div className={`border-t pt-5 ${dark ? "border-white/15" : "border-black/15"}`}>
      <div className="mb-5 text-[#C8AA7D] [&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-[1.4]">
        {icon}
      </div>
      <h3 className={`signature-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-[#F5F3EF]" : "text-[#0B0B0B]"}`}>
        {title}
      </h3>
      <p className={`mt-3 signature-sans text-sm leading-6 ${dark ? "text-white/60" : "text-black/60"}`}>
        {text}
      </p>
    </div>
  );
}

function SignatureLogo({ compact = false }) {
  return (
    <img
      src={compact ? "/signature/isotipo-gold.png" : "/signature/logo-signature-light.png"}
      alt={compact ? "Golf en Casa Signature Projects" : "Golf en Casa | Signature Projects"}
      className={compact ? "h-10 w-auto" : "h-12 w-auto sm:h-14"}
      loading="eager"
      decoding="async"
    />
  );
}

export default function LandingSignatureProjects() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION);
  const [submitState, setSubmitState] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [technicalSubmitState, setTechnicalSubmitState] = useState("idle");
  const [technicalSubmitError, setTechnicalSubmitError] = useState("");
  const [technicalForm, setTechnicalForm] = useState({
    name: "",
    email: "",
    company: "",
    profile: "",
    message: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profile: "",
    projectType: "",
    stage: "",
    dimensions: "",
    investment: "",
    message: "",
  });

  useEffect(() => {
    const captured = captureAttribution();
    setAttribution(captured);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "signature_landing_view",
      ...attributionEventData(captured),
    });
  }, []);

  useEffect(() => {
    const faviconHref = "/signature/favicon-signature.png?v=20260810";

    const existingIcons = Array.from(
      document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
    );

    const previousIcons = existingIcons.map((link) => ({
      node: link,
      rel: link.getAttribute("rel"),
      href: link.getAttribute("href"),
      sizes: link.getAttribute("sizes"),
      type: link.getAttribute("type"),
    }));

    existingIcons.forEach((link) => link.remove());

    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.sizes = "512x512";
    icon.href = faviconHref;

    const shortcut = document.createElement("link");
    shortcut.rel = "shortcut icon";
    shortcut.type = "image/png";
    shortcut.href = faviconHref;

    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = faviconHref;

    document.head.append(icon, shortcut, apple);

    return () => {
      icon.remove();
      shortcut.remove();
      apple.remove();

      previousIcons.forEach(({ node, rel, href, sizes, type }) => {
        if (rel) node.setAttribute("rel", rel);
        if (href) node.setAttribute("href", href);
        if (sizes) node.setAttribute("sizes", sizes);
        if (type) node.setAttribute("type", type);
        document.head.appendChild(node);
      });
    };
  }, []);

  const pushDataLayer = (event, location, extra = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      location,
      ...attributionEventData(attribution),
      ...extra,
    });
  };

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        message:
          "Hola, me gustaría comentar un proyecto con Golf en Casa | Signature Projects.",
        attribution,
        location: "signature_contact",
      }),
    [attribution]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitState === "sending") return;

    setSubmitState("sending");
    setSubmitError("");

    try {
      const response = await fetch("/api/signature-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          companyWebsite: e.currentTarget.elements.companyWebsite?.value || "",
          attribution,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar el proyecto.");
      }

      // Solo contamos el lead cuando el servidor confirma que lo ha recibido.
      pushDataLayer("signature_project_form_submit", "signature_form", {
        lead_type: "signature_project",
        client_profile: form.profile,
        project_type: form.projectType,
        project_stage: form.stage,
        investment_range: form.investment,
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_name: "signature_project_enquiry",
        lead_type: "signature_project",
        client_profile: form.profile,
        project_type: form.projectType,
        project_stage: form.stage,
        investment_range: form.investment,
        ...attributionEventData(attribution),
      });

      setSubmitState("success");
    } catch (error) {
      console.error(error);
      setSubmitError(
        "No hemos podido enviar el proyecto. Inténtelo de nuevo o contacte con nosotros por WhatsApp o email."
      );
      setSubmitState("error");
    }
  };

  const handleTechnicalSubmit = async (e) => {
    e.preventDefault();
    if (technicalSubmitState === "sending") return;

    setTechnicalSubmitState("sending");
    setTechnicalSubmitError("");

    try {
      const response = await fetch("/api/signature-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "signature_technical_request",
          ...technicalForm,
          companyWebsite: e.currentTarget.elements.companyWebsite?.value || "",
          attribution,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar la solicitud.");
      }

      pushDataLayer("signature_technical_request_submit", "professionals_technical_form", {
        lead_type: "signature_technical_request",
        client_profile: technicalForm.profile,
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_name: "signature_technical_request",
        lead_type: "signature_technical_request",
        client_profile: technicalForm.profile,
        ...attributionEventData(attribution),
      });

      setTechnicalSubmitState("success");
    } catch (error) {
      console.error(error);
      setTechnicalSubmitError(
        "No hemos podido enviar la solicitud. Inténtelo de nuevo o contacte con nosotros por WhatsApp o email."
      );
      setTechnicalSubmitState("error");
    }
  };

  return (
    <main className="signature-sans min-h-screen bg-[#0B0B0B] text-[#F5F3EF]">
      <Helmet>
        <title>Simuladores de Golf de Lujo a Medida | Signature Projects</title>
        <meta
          name="description"
          content="Golf en Casa | Signature Projects. Diseño e instalación de simuladores de golf de lujo a medida para residencias, villas, estudios de arquitectura y proyectos de lujo."
        />
        <link rel="canonical" href="https://www.golfencasa.net/signature" />
        <meta property="og:title" content="Golf en Casa | Signature Projects" />
        <meta
          property="og:description"
          content="Diseño e integración de simuladores de golf a medida. Simuladores de golf privados concebidos alrededor de la arquitectura, la experiencia y el espacio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.golfencasa.net/signature" />
        <meta property="og:image" content="https://www.golfencasa.net/signature/hero-1280.webp" />
        <link rel="icon" type="image/png" href="/signature/favicon-signature.png?v=20260810" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://www.golfencasa.net/signature/#service",
                name: "Golf en Casa | Signature Projects",
                serviceType: "Diseño e integración de simuladores de golf a medida",
                provider: {
                  "@type": "Organization",
                  name: "Golf en Casa",
                  url: "https://www.golfencasa.net",
                  email: EMAIL,
                  telephone: "+34678107234",
                },
                areaServed: ["España", "Europa"],
                description:
                  "Diseño, ingeniería, coordinación e integración de simuladores de golf privados a medida para residencias, villas y proyectos de arquitectura de alta gama.",
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ],
          })}
        </script>

        <style>{`
          .signature-serif { font-family: "Cormorant Garamond", Georgia, serif; }
          .signature-sans { font-family: "Inter", Arial, sans-serif; }
          html { scroll-behavior: smooth; }
          ::selection { background: #C8AA7D; color: #0B0B0B; }
        `}</style>
      </Helmet>

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <a href="#top" aria-label="Golf en Casa Signature Projects">
            <SignatureLogo />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {[
              ["Clientes privados", "#private-clients"],
              ["Profesionales", "#professionals"],
              ["Proceso", "#process"],
              ["Proyectos", "#projects"],
              ["Contacto", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 transition hover:text-[#C8AA7D]"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => pushDataLayer("signature_cta_click", "header")}
              className="border border-[#C8AA7D]/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF] transition hover:bg-[#C8AA7D] hover:text-[#0B0B0B]"
            >
              Comentar un proyecto
            </a>
          </nav>

          <button
            className="text-[#F5F3EF] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0B0B0B] px-6 py-6 lg:hidden">
            {[
              ["Clientes privados", "#private-clients"],
              ["Profesionales", "#professionals"],
              ["Proceso", "#process"],
              ["Proyectos", "#projects"],
              ["Contacto", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-4 text-xs uppercase tracking-[0.18em] text-white/70"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-end overflow-hidden pt-[76px]">
        <picture className="absolute inset-0 block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/signature/hero-768.webp"
            type="image/webp"
          />
          <img
            src="/signature/hero-1280.webp"
            srcSet="/signature/hero-768.webp 768w, /signature/hero-1280.webp 1280w"
            sizes="100vw"
            alt="Simulador de golf privado Signature integrado en una residencia contemporánea"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 pt-24 sm:pb-16 lg:px-10 lg:pb-16">
          <div className="max-w-[760px]">
            <SectionLabel dark>Golf en Casa | Signature Projects</SectionLabel>
            <h1 className="signature-serif mt-5 text-[50px] font-normal leading-[0.96] tracking-[-0.03em] sm:text-[68px] md:text-[76px] lg:text-[88px]">
              Simuladores de golf privados.
              <span className="mt-1 block italic">Diseñadas en torno a ti.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/70 sm:text-base">
              Espacios de golf a medida donde arquitectura, tecnología e
              interiorismo se integran como un todo.
            </p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8AA7D]">
              Diseño e integración de simuladores de golf a medida
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href="#contact"
                dark
                onClick={() => pushDataLayer("signature_cta_click", "hero_primary")}
              >
                Comentar tu proyecto
              </PrimaryButton>
              <OutlineButton href="#approach" dark>
                Descubrir Signature
              </OutlineButton>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-7 border-t border-white/15 pt-6 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">
              Residencias privadas&nbsp;&nbsp;·&nbsp;&nbsp;Estudios de arquitectura&nbsp;&nbsp;·&nbsp;&nbsp;Proyectos de lujo
            </p>
            <a href="#approach" className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/45">
              Descubre más
              <ChevronDown className="h-4 w-4 transition group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 01 APPROACH */}
      <section id="approach" className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-center">
            <SectionLabel>01 — Nuestro enfoque</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl font-normal leading-[0.98] tracking-[-0.025em] sm:text-6xl">
              Más que
              <br />un simulador de golf.
            </h2>
            <p className="signature-serif mt-7 max-w-lg text-2xl leading-8 text-[#9C7B4F]">
              Un Signature Project comienza por el espacio, no por el equipamiento.
            </p>
            <div className="mt-8 max-w-xl space-y-5 text-sm font-light leading-7 text-black/65">
              <p>
                Diseñamos cada simulador como un proyecto integral. Arquitectura,
                dimensiones, iluminación, acústica, materiales y tecnología se
                estudian conjuntamente para crear una experiencia de golf que
                forme parte natural del espacio.
              </p>
              <p>
                Desde un simulador dedicado hasta un espacio multifuncional
                completamente integrado, cada decisión responde al proyecto, a
                la arquitectura y a la forma en que el cliente quiere vivir el golf.
              </p>
            </div>
          </div>

          <figure>
            <img
              src="/signature/approach-architecture.webp"
              alt="Arquitectura residencial contemporánea de alta gama"
              loading="lazy"
              className="aspect-[4/3] h-full min-h-[460px] w-full object-cover"
            />
            <figcaption className="mt-3 text-right text-[9px] uppercase tracking-[0.22em] text-black/45">
              Espacio · Arquitectura · Experiencia
            </figcaption>
          </figure>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-[#0B0B0B] px-6 py-24 text-center lg:py-32">
        <SectionLabel dark>No diseñamos alrededor de la tecnología.</SectionLabel>
        <h2 className="signature-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1] tracking-[-0.025em] text-[#F5F3EF] sm:text-6xl lg:text-7xl">
          Diseñamos la tecnología
          <br />
          <span className="italic">alrededor del espacio.</span>
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-[#C8AA7D]" />
      </section>

      {/* 02 WHO */}
      <section className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <SectionLabel>02 — Con quién trabajamos</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[1] tracking-[-0.025em] sm:text-6xl">
            Un mismo estándar.
            <br />Dos formas de colaborar.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <a
              href="#private-clients"
              className="group relative min-h-[520px] overflow-hidden"
              onClick={() => pushDataLayer("signature_audience_click", "private_card")}
            >
              <img
                src="/signature/private-clients.webp"
                alt="Simulador de golf privado integrado en una residencia"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Clientes privados
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Tu simulador de golf privado.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  Para propietarios que buscan integrar una experiencia de golf
                  excepcional en su vivienda.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C8AA7D]">
                  Descubrir proyectos privados <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            <a
              href="#professionals"
              className="group relative min-h-[520px] overflow-hidden"
              onClick={() => pushDataLayer("signature_audience_click", "professional_card")}
            >
              <img
                src="/signature/professionals.webp"
                alt="Estudio de arquitectura coordinando un proyecto"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Arquitectos e interioristas
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Tu especialista en simuladores de golf.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  Colaboramos desde las primeras fases del proyecto hasta la
                  instalación y puesta en marcha.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C8AA7D]">
                  Colaboración profesional <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 03 PRIVATE CLIENTS */}
      <section id="private-clients" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionLabel dark>03 — Clientes privados</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                Tu simulador.
                <br />Tu golf.
                <br /><span className="italic">Tu Signature.</span>
              </h2>
              <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/65">
                Un simulador de golf privado debe sentirse como una extensión natural
                de su vivienda. Diseñamos cada proyecto desde cero para combinar
                una experiencia de juego excepcional con la arquitectura, los
                materiales y el carácter del espacio.
              </p>
              <div className="mt-8">
                <PrimaryButton
                  href="#contact"
                  dark
                  onClick={() => pushDataLayer("signature_cta_click", "private_clients")}
                >
                  Comentar tu proyecto privado
                </PrimaryButton>
              </div>
            </div>
            <img
              src="/signature/private-feature.webp"
              alt="Simulador de golf Signature con integración arquitectónica"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {privatePillars.map(([title, text, icon]) => (
              <IconCard key={title} title={title} text={text} icon={icon} dark />
            ))}
          </div>
        </div>
      </section>

      {/* 04 PROFESSIONALS */}
      <section id="professionals" className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <SectionLabel>04 — Para profesionales</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
                El especialista en simuladores de golf
                <br />de tu equipo de proyecto.
              </h2>
            </div>
            <div className="lg:pt-10">
              <p className="max-w-2xl text-sm leading-7 text-black/65">
                Colaboramos con arquitectos, interioristas, promotores y project
                managers aportando el conocimiento especializado necesario para
                incorporar un simulador de golf al proyecto desde sus primeras fases.
              </p>
              <div className="mt-8 border-l border-[#C8AA7D] pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">
                  Incorpóranos desde el principio.
                </p>
                <p className="signature-serif mt-3 max-w-2xl text-2xl leading-8">
                  Anticipamos dimensiones, instalaciones y condicionantes técnicos
                  antes de que se conviertan en modificaciones de obra.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {professionalServices.map(([title, text, icon]) => (
              <IconCard key={title} title={title} text={text} icon={icon} />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              href="#contact"
              onClick={() => pushDataLayer("signature_cta_click", "professionals")}
            >
              Comentar un proyecto
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setTechnicalOpen(true);
                setTechnicalSubmitState("idle");
                setTechnicalSubmitError("");
                pushDataLayer("signature_technical_info_click", "professionals");
              }}
              className="signature-sans inline-flex items-center justify-center gap-2 border border-[#0B0B0B]/30 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B0B0B] transition hover:border-[#C8AA7D] hover:text-[#9C7B4F]"
            >
              Solicitar información técnica
            </button>
          </div>
        </div>
      </section>

      {/* 05 PROCESS */}
      <section id="process" className="bg-[#151515]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <SectionLabel dark>05 — Nuestro proceso</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
            Del primer boceto
            <br />al primer golpe.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
            Un proceso claro y coordinado para asegurar que cada detalle del
            espacio funcione a la perfección.
          </p>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[29px] hidden h-px bg-[#C8AA7D]/55 lg:block" />
            <div className="grid gap-8 lg:grid-cols-8">
              {processSteps.map(([num, title, text]) => (
                <div key={num} className="relative border-l border-[#C8AA7D]/35 pl-5 lg:border-l-0 lg:pl-0">
                  <div className="hidden h-[59px] lg:block">
                    <div className="absolute left-0 top-[24px] z-10 h-[11px] w-[11px] rounded-full border border-[#C8AA7D] bg-[#151515]" />
                  </div>
                  <p className="text-[10px] text-[#C8AA7D]">{num}</p>
                  <h3 className="mt-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.12em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-white/45">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="signature-serif text-3xl">Un único interlocutor. Cada detalle.</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
              Desde el primer plano hasta la calibración final, un único equipo
              coordina todos los elementos que convierten el espacio en una
              experiencia Signature.
            </p>
          </div>
        </div>
      </section>

      {/* 06 ARCHITECTURE x TECHNOLOGY */}
      <section className="bg-[#0B0B0B]">
        <div className="relative min-h-[72vh] overflow-hidden">
          <picture className="absolute inset-0 block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/signature/technology-full-768.webp"
              type="image/webp"
            />
            <img
              src="/signature/technology-full-1280.webp"
              srcSet="/signature/technology-full-768.webp 768w, /signature/technology-full-1280.webp 1280w"
              sizes="100vw"
              alt="Tecnología de simulación integrada en arquitectura premium"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] items-center px-6 py-24 lg:px-10">
            <div className="max-w-2xl">
              <SectionLabel dark>06 — Arquitectura × Tecnología</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                La mejor tecnología
                <br />es la que
                <br /><span className="italic">no se hace notar.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
          <div>
            <p className="signature-serif max-w-md text-3xl leading-9">
              Tecnología seleccionada para el proyecto.
              <span className="block italic text-[#C8AA7D]">No al contrario.</span>
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {techItems.map(([num, title, text, icon]) => (
              <div key={num} className="flex gap-4 border-t border-white/12 pt-5">
                <div className="mt-1 text-[#C8AA7D] [&>svg]:h-6 [&>svg]:w-6 [&>svg]:stroke-[1.4]">{icon}</div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#C8AA7D]">{num} — {title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/50">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 MATERIALS */}
      <section className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <SectionLabel>07 — Materiales y acabados</SectionLabel>
          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="signature-serif text-5xl leading-[0.98] sm:text-6xl">
              Diseñado
              <br />hasta el último detalle.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-black/60">
              Cada Signature Project puede adaptarse al lenguaje material de la
              vivienda. Panelados, revestimientos acústicos, pavimentos,
              iluminación, carpintería y detalles se estudian como parte del conjunto.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["MADERA", "/signature/material-timber.webp"],
              ["PIEDRA", "/signature/material-stone.webp"],
              ["TEXTILES", "/signature/material-textile.webp"],
              ["METAL", "/signature/material-metal.webp"],
            ].map(([label, src]) => (
              <figure key={label} className="group relative aspect-[3/4] overflow-hidden">
                <img
                  src={src}
                  alt={`Material Signature: ${label}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 max-w-4xl border-t border-black/15 pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9C7B4F]">
              Un simulador de golf que pertenece a la casa.
            </p>
            <p className="signature-serif mt-4 text-3xl leading-10 sm:text-4xl">
              No buscamos que el simulador parezca instalado dentro de una
              habitación. Buscamos que la habitación parezca haber sido diseñada
              siempre alrededor de él.
            </p>
          </div>
        </div>
      </section>

      {/* 08 PROJECTS */}
      <section id="projects" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <SectionLabel dark>08 — Proyectos seleccionados</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
            Espacios creados
            <br />alrededor del golf.
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <ProjectCard
              className="lg:col-span-7"
              image="/signature/project-01.webp"
              eyebrow="ESTUDIO CONCEPTUAL — RESIDENCIA PRIVADA"
              title="Simulador de golf privado"
              meta="Diseño conceptual · Integración arquitectónica"
            />
            <ProjectCard
              className="lg:col-span-5"
              image="/signature/project-02.webp"
              eyebrow="ESTUDIO CONCEPTUAL — SIMULADOR SIGNATURE"
              title="Simulador de golf Signature"
              meta="Diseño conceptual · Integración tecnológica"
            />
            <ProjectCard
              className="lg:col-span-5"
              image="/signature/project-03.webp"
              eyebrow="ESTUDIO CONCEPTUAL — GOLF Y ENTRETENIMIENTO"
              title="Espacio de golf integrado"
              meta="Diseño conceptual · Experiencia multifuncional"
            />
            <ProjectCard
              className="lg:col-span-7"
              image="/signature/project-04.webp"
              eyebrow="ESTUDIO CONCEPTUAL — ESPACIO MULTIFUNCIONAL"
              title="Simulador de golf y entretenimiento"
              meta="Arquitectura · Tecnología · Integración interior"
            />
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-5 text-white/40">
            Los proyectos conceptuales se identificarán expresamente como Concept
            Study. Sustituye estas imágenes por instalaciones reales a medida que
            se complete el portfolio Signature.
          </p>
        </div>
      </section>

      {/* 09 INVESTMENT */}
      <section className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <SectionLabel>09 — Inversión del proyecto</SectionLabel>
          <h2 className="signature-serif mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl">
            Encargado individualmente.
            <br /><span className="italic">Completamente a medida.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-black/60">
            Cada Signature Project se diseña y presupuesta individualmente. La
            inversión depende de las características del espacio, el alcance del
            proyecto, el nivel de integración, los acabados y la tecnología seleccionada.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["ALCANCE", "Desde la integración tecnológica en una sala previamente diseñada hasta el desarrollo integral del simulador y del espacio."],
              ["TECNOLOGÍA", "Seleccionamos cada sistema en función de las necesidades reales del proyecto."],
              ["ACABADOS", "Materiales, carpintería, acústica e interiorismo pueden formar parte del alcance Signature."],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-black/20 pt-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-6 border-t border-black/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="signature-serif text-3xl">Cada proyecto comienza con una conversación.</p>
            <PrimaryButton
              href="#contact"
              onClick={() => pushDataLayer("signature_cta_click", "investment")}
            >
              Comentar tu proyecto
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#151515]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.68fr_1.32fr] lg:px-10 lg:py-28">
          <div>
            <SectionLabel dark>Preguntas frecuentes</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl">Antes de empezar.</h2>
          </div>
          <div>
            {faqs.map((item, index) => (
              <div key={item.q} className="border-t border-white/15">
                <button
                  className="flex w-full items-center justify-between gap-8 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="signature-serif text-xl sm:text-2xl">{item.q}</span>
                  <span className="text-[#C8AA7D]">
                    {openFaq === index ? "—" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <p className="max-w-3xl pb-7 text-sm leading-7 text-white/50">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
            <div className="border-t border-white/15" />
          </div>
        </div>
      </section>

      {/* CONTACT / FORM */}
      <section id="contact" className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[0.74fr_1.26fr] lg:px-10 lg:py-32">
          <div>
            <SectionLabel>Cuéntanos tu proyecto</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
              Creemos algo
              <br /><span className="italic">excepcional.</span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-black/60">
              Cuéntenos brevemente qué está creando. Cada consulta Signature se
              revisa personalmente y con total discreción.
            </p>

            <div className="mt-10 border-t border-black/15 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">
                ¿Prefieres hablar directamente?
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => pushDataLayer("signature_whatsapp", "contact")}
                  className="flex items-center gap-3 hover:text-[#9C7B4F]"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-[#9C7B4F]">
                  <Mail className="h-4 w-4" /> {EMAIL}
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => pushDataLayer("signature_calendly", "contact")}
                  className="flex items-center gap-3 hover:text-[#9C7B4F]"
                >
                  <CalendarDays className="h-4 w-4" /> Agendar una conversación
                </a>
              </div>
            </div>
          </div>

          {submitState === "success" ? (
            <div className="border-t border-[#C8AA7D] pt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9C7B4F]">
                Proyecto recibido
              </p>
              <h3 className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                Gracias.
                <br />
                <span className="italic">Hemos recibido tu proyecto.</span>
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
                Hemos recibido los detalles de su proyecto. Revisaremos personalmente la
                información y nos pondremos en contacto con usted.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <input
              type="text"
              name="companyWebsite"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />
            <FormField label="Nombre y apellidos *">
              <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Email *">
              <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Teléfono *">
              <input required name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Ubicación del proyecto *">
              <input required name="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="signature-input" />
            </FormField>

            <FormField label="Soy... *">
              <select required value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} className="signature-input">
                <option value="">Seleccionar</option>
                <option>Cliente privado</option>
                <option>Arquitecto / Interiorista</option>
                <option>Promotor</option>
                <option>Constructor / Project Manager</option>
                <option>Otro</option>
              </select>
            </FormField>

            <FormField label="Tipo de proyecto *">
              <select required value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="signature-input">
                <option value="">Seleccionar</option>
                <option>Residencia privada</option>
                <option>Villa</option>
                <option>Promoción residencial</option>
                <option>Hotel / Resort</option>
                <option>Comercial</option>
                <option>Otro</option>
              </select>
            </FormField>

            <FormField label="Estado del proyecto *">
              <select required value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="signature-input">
                <option value="">Seleccionar</option>
                <option>Concepto inicial</option>
                <option>Fase de diseño</option>
                <option>En construcción</option>
                <option>Espacio existente / reforma</option>
              </select>
            </FormField>

            <FormField label="Dimensiones aproximadas">
              <input
                placeholder="Ancho × Fondo × Altura"
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                className="signature-input"
              />
            </FormField>

            <FormField label="Inversión prevista del proyecto" className="sm:col-span-2">
              <select
                value={form.investment}
                onChange={(e) => setForm({ ...form, investment: e.target.value })}
                className="signature-input"
              >
                <option value="">Por definir</option>
                <option>€20,000 – €35,000</option>
                <option>€35,000 – €50,000</option>
                <option>€50,000 – €75,000</option>
                <option>€75,000 – €100,000</option>
                <option>€100,000+</option>
              </select>
            </FormField>

            <FormField label="Cuéntanos tu proyecto" className="sm:col-span-2">
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="signature-input resize-none"
              />
            </FormField>

            <label className="sm:col-span-2 flex items-start gap-3 text-xs leading-5 text-black/55">
              <input
                type="checkbox"
                required
                className="mt-1 accent-[#0B0B0B]"
              />
              <span>
                He leído y acepto la{" "}
                <a href="/politica-privacidad" className="underline decoration-black/30 underline-offset-2 hover:text-[#9C7B4F]">
                  Política de Privacidad
                </a>.
              </span>
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#0B0B0B] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF] transition hover:bg-[#1C1C1C] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {submitState === "sending" ? "Enviando..." : "Enviar proyecto"}
                {submitState !== "sending" && <ArrowRight className="h-4 w-4" />}
              </button>

              {submitState === "error" && (
                <p className="mt-4 max-w-xl text-sm leading-6 text-red-700">
                  {submitError}
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-black/45">
                Todas las consultas se revisan personalmente y se tratan con total discreción.
              </p>
            </div>
          </form>
          )}
        </div>
      </section>

      {technicalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="technical-request-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setTechnicalOpen(false);
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-[#F5F3EF] p-7 text-[#0B0B0B] shadow-2xl sm:p-10">
            <button type="button" onClick={() => setTechnicalOpen(false)}
              className="absolute right-5 top-5 text-black/50 transition hover:text-black"
              aria-label="Cerrar solicitud de información técnica">
              <X className="h-5 w-5" />
            </button>

            {technicalSubmitState === "success" ? (
              <div className="py-6">
                <SectionLabel>Solicitud recibida</SectionLabel>
                <h3 id="technical-request-title" className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                  Gracias.<br /><span className="italic">Hemos recibido su solicitud.</span>
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
                  Revisaremos personalmente la información y nos pondremos en contacto con usted.
                </p>
                <button type="button" onClick={() => setTechnicalOpen(false)}
                  className="mt-8 bg-[#0B0B0B] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF]">
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <SectionLabel>Información técnica</SectionLabel>
                <h3 id="technical-request-title" className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                  Solicitar información<br /><span className="italic">técnica.</span>
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-black/60">
                  Para arquitectos, interioristas, promotores y profesionales que necesitan
                  información técnica para integrar un simulador de golf en su proyecto.
                </p>

                <form onSubmit={handleTechnicalSubmit} className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <input type="text" name="companyWebsite" tabIndex="-1" autoComplete="off"
                    aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

                  <FormField label="Nombre y apellidos *">
                    <input required value={technicalForm.name}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, name: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Email profesional *">
                    <input required type="email" value={technicalForm.email}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, email: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Empresa / estudio">
                    <input value={technicalForm.company}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, company: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Perfil profesional *">
                    <select required value={technicalForm.profile}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, profile: e.target.value })}
                      className="signature-input">
                      <option value="">Seleccionar</option>
                      <option>Arquitecto</option>
                      <option>Interiorista</option>
                      <option>Promotor</option>
                      <option>Project Manager</option>
                      <option>Constructor</option>
                      <option>Otro</option>
                    </select>
                  </FormField>

                  <FormField label="¿Qué información necesita?" className="sm:col-span-2">
                    <textarea rows={5} value={technicalForm.message}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, message: e.target.value })}
                      className="signature-input resize-none" />
                  </FormField>

                  <label className="sm:col-span-2 flex items-start gap-3 text-xs leading-5 text-black/55">
                    <input type="checkbox" required className="mt-1 accent-[#0B0B0B]" />
                    <span>
                      He leído y acepto la{" "}
                      <a href="/politica-privacidad"
                        className="underline decoration-black/30 underline-offset-2 hover:text-[#9C7B4F]">
                        Política de Privacidad
                      </a>.
                    </span>
                  </label>

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={technicalSubmitState === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#0B0B0B] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF] transition hover:bg-[#1C1C1C] disabled:opacity-50 sm:w-auto">
                      {technicalSubmitState === "sending" ? "Enviando..." : "Enviar solicitud"}
                      {technicalSubmitState !== "sending" && <ArrowRight className="h-4 w-4" />}
                    </button>
                    {technicalSubmitState === "error" && (
                      <p className="mt-4 max-w-xl text-sm leading-6 text-red-700">{technicalSubmitError}</p>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0B0B0B] px-6 py-28 text-center lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'url("/signature/signature-pattern.png")',
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "320px auto",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <img
            src="/signature/isotipo-gold.png"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-8 h-16 w-auto"
            loading="lazy"
            decoding="async"
          />
          <h2 className="signature-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Creemos algo
            <br /><span className="italic">excepcional.</span>
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/45">
            Cada Signature Project comienza con una conversación.
          </p>
          <div className="mt-9">
            <PrimaryButton
              href="#contact"
              dark
              onClick={() => pushDataLayer("signature_cta_click", "final_cta")}
            >
              Comentar tu proyecto
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <SignatureLogo />
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/35">
                Diseño e integración de simuladores de golf a medida
              </p>
            </div>
            <FooterColumn title="Signature" links={[
              ["Clientes privados", "#private-clients"],
              ["Profesionales", "#professionals"],
              ["Nuestro proceso", "#process"],
              ["Proyectos seleccionados", "#projects"],
            ]} />
            <FooterColumn title="Contacto" links={[
              ["Email", `mailto:${EMAIL}`],
              ["WhatsApp", whatsappUrl],
              ["Agendar una conversación", CALENDLY_URL],
            ]} />
            <FooterColumn title="Legal" links={[
              ["Privacidad", "/politica-privacidad"],
              ["Cookies", "/politica-cookies"],
              ["Aviso legal", "/aviso-legal"],
            ]} />
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:justify-between">
            <p>© 2026 Golf en Casa</p>
            <p>España · Proyectos en toda Europa</p>
          </div>
        </div>
      </footer>

      <style>{`
        .signature-input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid rgba(11,11,11,.25);
          background: transparent;
          padding: 12px 0;
          color: #0B0B0B;
          outline: none;
          border-radius: 0;
          font-family: "Inter", Arial, sans-serif;
          font-size: 14px;
        }
        .signature-input:focus { border-bottom-color: #C8AA7D; }
        .signature-input::placeholder { color: rgba(11,11,11,.35); }
      `}</style>
    </main>
  );
}

function ProjectCard({ image, eyebrow, title, meta, className = "" }) {
  return (
    <article className={`group relative min-h-[500px] overflow-hidden ${className}`}>
      <img
        src={image}
        alt={`${title} — Golf en Casa Signature Projects`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C8AA7D]">{eyebrow}</p>
        <h3 className="signature-serif mt-2 text-3xl">{title}</h3>
        <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/50">{meta}</p>
      </div>
    </article>
  );
}

function FormField({ label, children, className = "" }) {
  return (
    <label className={className}>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C8AA7D]">{title}</p>
      <div className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="block text-xs text-white/45 transition hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
