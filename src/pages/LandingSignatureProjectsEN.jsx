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
  if (s === "google" || r.includes("google.")) return "Google organic";
  if (s && s !== "direct") return s;
  return "Direct";
};

const attributionEventData = (a) => ({
  traffic_source: a.source || "direct",
  traffic_medium: a.medium || "none",
  traffic_campaign: a.campaign || "",
  traffic_content: a.content || "",
  traffic_term: a.term || "",
  landing_page: a.landingPage || "/en/signature",
  source_label: classifyTrafficSource(a),
  gclid_present: Boolean(a.gclid),
  fbclid_present: Boolean(a.fbclid),
});

const buildWhatsAppUrl = ({ message, attribution, location }) => {
  const trackingLines = [
    `Origen: ${classifyTrafficSource(attribution)}`,
    attribution.campaign ? `Campaña: ${attribution.campaign}` : "",
    attribution.term ? `Búsqueda: ${attribution.term}` : "",
    `Page: ${attribution.landingPage || "/en/signature"}`,
    `Button: ${location}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `${message}\n\n---\n${trackingLines.join("\n")}`
  )}`;
};

const processSteps = [
  ["01", "DISCOVERY", "Space · requirements · objectives"],
  ["02", "CONCEPT DESIGN", "Layout · experience · aesthetics"],
  ["03", "TECHNICAL ENGINEERING", "Projection · tracking · infrastructure"],
  ["04", "TECHNOLOGY SELECTION", "Launch monitor · projection · computing"],
  ["05", "CONSTRUCTION COORDINATION", "Architecture · interiors · building services"],
  ["06", "INSTALLATION", "Structure · finishes · technology"],
  ["07", "CALIBRATION", "Image · tracking · software"],
  ["08", "WHITE GLOVE HANDOVER", "Testing · training · handover"],
];

const techItems = [
  ["01", "TRACKING", "Launch monitor selected specifically for the space, the player and the intended use.", <Monitor />],
  ["02", "PROJECTION", "Optics, resolution and brightness calculated for the actual geometry of the room.", <Lightbulb />],
  ["03", "COMPUTING", "Hardware specified for the required resolution, software and user experience.", <Sparkles />],
  ["04", "LIGHTING", "Lighting designed to work seamlessly with projection and the room's everyday use.", <Lightbulb />],
  ["05", "ACOUSTICS", "Integrated acoustic treatment to control impact noise, reverberation and comfort.", <Volume2 />],
  ["06", "CONTROL", "Lighting, AV and system automation when the project requires it.", <Wifi />],
];

const privatePillars = [
  ["BESPOKE DESIGN", "Every project begins with a unique space, a unique brief and a unique vision.", <DraftingCompass />],
  ["ARCHITECTURAL INTEGRATION", "We integrate the room into the architecture and interior design of the residence.", <Home />],
  ["TECHNOLOGY WITHOUT COMPROMISE", "We select technology around the project — never the other way around.", <Monitor />],
  ["TURNKEY DELIVERY", "We coordinate design, supply, installation, configuration and final handover.", <KeyRound />],
];

const professionalServices = [
  ["SPATIAL PLANNING", "Dimensions, hitting position, circulation and safety clearances.", <Ruler />],
  ["TECHNICAL SPECIFICATION", "Power, data, projection, tracking, lighting and HVAC requirements.", <DraftingCompass />],
  ["DESIGN COORDINATION", "Coordination with architecture, interiors and the wider building services.", <Home />],
  ["TECHNOLOGY SPECIFICATION", "Specification of tracking, projection, computing, AV and control systems.", <Monitor />],
  ["SITE COORDINATION", "Technical coordination throughout construction.", <ShieldCheck />],
  ["COMMISSIONING", "Installation, configuration, calibration and handover.", <Sparkles />],
];

const faqs = [
  {
    q: "When should I involve Signature Projects?",
    a: "As early as possible. A golf room can affect dimensions, ceiling heights, building services, lighting, HVAC and finishes. Early involvement allows us to optimise the project and avoid costly changes later.",
  },
  {
    q: "Can you work with my architect or interior designer?",
    a: "Yes. Signature Projects can join your existing project team and collaborate directly with architects, interior designers, contractors and project managers.",
  },
  {
    q: "Can I choose the launch monitor and other equipment?",
    a: "Yes. We work with multiple manufacturers and specify technology according to the space, the player's requirements and the objectives of the project.",
  },
  {
    q: "Do you undertake projects outside Spain?",
    a: "Yes. We assess projects in Spain and internationally on an individual basis depending on location and scope.",
  },
  {
    q: "Can the room be multifunctional?",
    a: "Yes. We can design solutions that combine golf with cinema, entertainment or other uses, minimising the visual presence of technology when it is not in use.",
  },
  {
    q: "How much does a Signature Project cost?",
    a: "Every project is individually commissioned. Investment depends on room dimensions, technology, finishes, integration complexity and the scope of our services. After an initial conversation, we can determine the most appropriate approach.",
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

export default function LandingSignatureProjectsEN() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION);
  const [submitState, setSubmitState] = useState("idle");
  const [submitError, setSubmitError] = useState("");
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
          "Hello, I would like to discuss a project with Golf en Casa | Signature Projects.",
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
        throw new Error(result.error || "The project could not be submitted.");
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
        "We could not submit your project. Please try again or contact us via WhatsApp or email."
      );
      setSubmitState("error");
    }
  };

  return (
    <main className="signature-sans min-h-screen bg-[#0B0B0B] text-[#F5F3EF]">
      <Helmet>
        <title>Signature Projects | Bespoke Private Golf Room Design | Golf en Casa</title>
        <meta
          name="description"
          content="Golf en Casa | Signature Projects. Bespoke design and integration of private golf rooms for residences, villas, architecture studios and luxury developments."
        />
        <link rel="canonical" href="https://www.golfencasa.net/en/signature" />
        <link rel="alternate" hrefLang="en" href="https://www.golfencasa.net/en/signature" />
        <link rel="alternate" hrefLang="es" href="https://www.golfencasa.net/signature" />
        <link rel="alternate" hrefLang="x-default" href="https://www.golfencasa.net/signature" />
        <meta property="og:title" content="Golf en Casa | Signature Projects" />
        <meta
          property="og:description"
          content="Bespoke Golf Room Design & Integration. Private golf rooms designed around architecture, experience and space."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:url" content="https://www.golfencasa.net/en/signature" />
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
                "@id": "https://www.golfencasa.net/en/signature/#service",
                name: "Golf en Casa | Signature Projects",
                serviceType: "Bespoke Golf Room Design & Integration",
                provider: {
                  "@type": "Organization",
                  name: "Golf en Casa",
                  url: "https://www.golfencasa.net",
                  email: EMAIL,
                  telephone: "+34678107234",
                },
                areaServed: ["Spain", "Europe"],
                description:
                  "Bespoke design, engineering, coordination and integration of private golf rooms for residences, villas and high-end architectural projects.",
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
              ["Private Clients", "#private-clients"],
              ["Professionals", "#professionals"],
              ["Process", "#process"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
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
              Discuss a Project
            </a>
          </nav>

          <button
            className="text-[#F5F3EF] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0B0B0B] px-6 py-6 lg:hidden">
            {[
              ["Private Clients", "#private-clients"],
              ["Professionals", "#professionals"],
              ["Process", "#process"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
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
            alt="Signature private golf room integrated into a contemporary residence"
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
              Private Golf Rooms.
              <span className="mt-1 block italic">Designed Around You.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/70 sm:text-base">
              Bespoke golf environments where architecture, technology and
              interior design come together as one.
            </p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8AA7D]">
              Bespoke Golf Room Design & Integration
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href="#contact"
                dark
                onClick={() => pushDataLayer("signature_cta_click", "hero_primary")}
              >
                Discuss Your Project
              </PrimaryButton>
              <OutlineButton href="#approach" dark>
                Discover Signature
              </OutlineButton>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-7 border-t border-white/15 pt-6 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">
              Private Residences&nbsp;&nbsp;·&nbsp;&nbsp;Architecture Studios&nbsp;&nbsp;·&nbsp;&nbsp;Luxury Developments
            </p>
            <a href="#approach" className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/45">
              Scroll to discover
              <ChevronDown className="h-4 w-4 transition group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 01 APPROACH */}
      <section id="approach" className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-center">
            <SectionLabel>01 — Our Approach</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl font-normal leading-[0.98] tracking-[-0.025em] sm:text-6xl">
              More than
              <br />a golf simulator.
            </h2>
            <p className="signature-serif mt-7 max-w-lg text-2xl leading-8 text-[#9C7B4F]">
              A Signature Project begins with the space — not the equipment.
            </p>
            <div className="mt-8 max-w-xl space-y-5 text-sm font-light leading-7 text-black/65">
              <p>
                We approach every room as a complete design project. Architecture,
                dimensions, lighting, acoustics, materials and technology are
                considered together to create a golf experience that feels entirely
                natural within the space.
              </p>
              <p>
                From a dedicated golf room to a fully integrated multifunctional space,
                every decision responds to the architecture, the brief and the way
                the client wants to experience golf.
              </p>
            </div>
          </div>

          <figure>
            <img
              src="/signature/approach-architecture.webp"
              alt="High-end contemporary residential architecture"
              loading="lazy"
              className="aspect-[4/3] h-full min-h-[460px] w-full object-cover"
            />
            <figcaption className="mt-3 text-right text-[9px] uppercase tracking-[0.22em] text-black/45">
              Space · Architecture · Experience
            </figcaption>
          </figure>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-[#0B0B0B] px-6 py-24 text-center lg:py-32">
        <SectionLabel dark>We don't design around technology.</SectionLabel>
        <h2 className="signature-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1] tracking-[-0.025em] text-[#F5F3EF] sm:text-6xl lg:text-7xl">
          We design technology
          <br />
          <span className="italic">around the space.</span>
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-[#C8AA7D]" />
      </section>

      {/* 02 WHO */}
      <section className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <SectionLabel>02 — Who We Work With</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[1] tracking-[-0.025em] sm:text-6xl">
            One standard.
            <br />Two ways to collaborate.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <a
              href="#private-clients"
              className="group relative min-h-[520px] overflow-hidden"
              onClick={() => pushDataLayer("signature_audience_click", "private_card")}
            >
              <img
                src="/signature/private-clients.webp"
                alt="Private golf room within a residence"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Private Clients
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Your private golf room.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  For homeowners seeking to integrate an exceptional golf experience
                  into their residence.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C8AA7D]">
                  Explore Private Projects <ArrowRight className="h-4 w-4" />
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
                alt="Architecture and design project environment"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Architects & Designers
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Your specialist golf partner.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  We collaborate from the earliest project stages through installation
                  and commissioning.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C8AA7D]">
                  Professional Collaboration <ArrowRight className="h-4 w-4" />
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
              <SectionLabel dark>03 — Private Clients</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                Your room.
                <br />Your game.
                <br /><span className="italic">Your Signature.</span>
              </h2>
              <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/65">
                A private golf room should feel like a natural extension of your home.
                We design each project from the ground up to combine an exceptional
                playing experience with the architecture, materials and character of the space.
              </p>
              <div className="mt-8">
                <PrimaryButton
                  href="#contact"
                  dark
                  onClick={() => pushDataLayer("signature_cta_click", "private_clients")}
                >
                  Discuss Your Private Project
                </PrimaryButton>
              </div>
            </div>
            <img
              src="/signature/private-feature.webp"
              alt="Signature golf room with architectural integration"
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
              <SectionLabel>04 — For Professionals</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
                The golf room specialist
                <br />on your project team.
              </h2>
            </div>
            <div className="lg:pt-10">
              <p className="max-w-2xl text-sm leading-7 text-black/65">
                We collaborate with architects, interior designers, developers and project
                managers, providing the specialist expertise required to integrate
                a golf room from the earliest stages of the project.
              </p>
              <div className="mt-8 border-l border-[#C8AA7D] pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">
                  Involve us early.
                </p>
                <p className="signature-serif mt-3 max-w-2xl text-2xl leading-8">
                  We anticipate dimensions, building services and technical constraints
                  before they become costly construction changes.
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
              Discuss a Project
            </PrimaryButton>
            <OutlineButton
              href={`mailto:${EMAIL}?subject=Signature Projects - Technical Information`}
              onClick={() => pushDataLayer("signature_technical_info_click", "professionals")}
            >
              Request Technical Information
            </OutlineButton>
          </div>
        </div>
      </section>

      {/* 05 PROCESS */}
      <section id="process" className="bg-[#151515]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <SectionLabel dark>05 — Our Process</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
            From first sketch
            <br />to first swing.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
            A clear, coordinated process designed to ensure every detail of the space
            works exactly as intended.
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
            <p className="signature-serif text-3xl">One partner. Every detail.</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
              From the first drawing to final calibration, one team coordinates every
              element required to turn the space into a Signature experience.
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
              alt="Golf simulation technology integrated into premium architecture"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] items-center px-6 py-24 lg:px-10">
            <div className="max-w-2xl">
              <SectionLabel dark>06 — Architecture × Technology</SectionLabel>
              <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                The best technology
                <br />is the technology
                <br /><span className="italic">you don't notice.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
          <div>
            <p className="signature-serif max-w-md text-3xl leading-9">
              Technology selected for the project.
              <span className="block italic text-[#C8AA7D]">Not the other way around.</span>
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
          <SectionLabel>07 — Materials & Finishes</SectionLabel>
          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-end">
            <h2 className="signature-serif text-5xl leading-[0.98] sm:text-6xl">
              Designed down
              <br />to the last detail.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-black/60">
              Every Signature Project can be tailored to the material language of the
              residence. Wall panelling, acoustic finishes, flooring, lighting,
              joinery and detailing are considered as part of one coherent whole.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["TIMBER", "/signature/material-timber.webp"],
              ["STONE", "/signature/material-stone.webp"],
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
              A golf room that belongs to the house.
            </p>
            <p className="signature-serif mt-4 text-3xl leading-10 sm:text-4xl">
              We do not want the simulator to look as though it was installed in a room.
              We want the room to feel as though it was always designed around it.
            </p>
          </div>
        </div>
      </section>

      {/* 08 PROJECTS */}
      <section id="projects" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <SectionLabel dark>08 — Selected Projects</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
            Spaces created
            <br />around the game.
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <ProjectCard
              className="lg:col-span-7"
              image="/signature/project-01.webp"
              eyebrow="CONCEPT STUDY — PRIVATE RESIDENCE"
              title="Private Golf Room"
              meta="Concept Design · Architectural Integration"
            />
            <ProjectCard
              className="lg:col-span-5"
              image="/signature/project-02.webp"
              eyebrow="CONCEPT STUDY — SIGNATURE GOLF ROOM"
              title="Signature Golf Room"
              meta="Concept Design · Technology Integration"
            />
            <ProjectCard
              className="lg:col-span-5"
              image="/signature/project-03.webp"
              eyebrow="CONCEPT STUDY — GOLF & ENTERTAINMENT"
              title="Integrated Golf Space"
              meta="Concept Design · Multifunctional Experience"
            />
            <ProjectCard
              className="lg:col-span-7"
              image="/signature/project-04.webp"
              eyebrow="CONCEPT STUDY — MULTIFUNCTIONAL SPACE"
              title="Golf & Entertainment Room"
              meta="Architecture · Technology · Interior Integration"
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
          <SectionLabel>09 — Project Investment</SectionLabel>
          <h2 className="signature-serif mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl">
            Individually commissioned.
            <br /><span className="italic">Entirely bespoke.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-black/60">
            Every Signature Project is designed and commissioned individually. Investment
            depends on the characteristics of the space, project scope, level of
            integration, finishes and selected technology.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["SCOPE", "From technology integration within an already designed room to complete development of the space."],
              ["TECHNOLOGY", "Every system is selected according to the real requirements of the project."],
              ["FINISHES", "Materials, joinery, acoustics and interior design can all form part of the Signature scope."],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-black/20 pt-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-6 border-t border-black/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="signature-serif text-3xl">Every project starts with a conversation.</p>
            <PrimaryButton
              href="#contact"
              onClick={() => pushDataLayer("signature_cta_click", "investment")}
            >
              Discuss Your Project
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#151515]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.68fr_1.32fr] lg:px-10 lg:py-28">
          <div>
            <SectionLabel dark>Questions</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl">Before we begin.</h2>
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
            <SectionLabel>Tell us about your project</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
              Let's create something
              <br /><span className="italic">exceptional.</span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-black/60">
              Tell us briefly what you are creating. Every Signature enquiry is
              reviewed personally and treated with complete discretion.
            </p>

            <div className="mt-10 border-t border-black/15 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">
                Prefer to speak directly?
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
                  <CalendarDays className="h-4 w-4" /> Schedule a conversation
                </a>
              </div>
            </div>
          </div>

          {submitState === "success" ? (
            <div className="border-t border-[#C8AA7D] pt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9C7B4F]">
                Project received
              </p>
              <h3 className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                Thank you.
                <br />
                <span className="italic">Your project has been received.</span>
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
                We have received the details of your project. We will review the information
                personally and get in touch with you.
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
            <FormField label="Full name *">
              <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Email *">
              <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Phone *">
              <input required name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Project location *">
              <input required name="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="signature-input" />
            </FormField>

            <FormField label="I am a... *">
              <select required value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} className="signature-input">
                <option value="">Select</option>
                <option>Private Client</option>
                <option>Architect / Interior Designer</option>
                <option>Developer</option>
                <option>Builder / Project Manager</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Project type *">
              <select required value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="signature-input">
                <option value="">Select</option>
                <option>Private Residence</option>
                <option>Villa</option>
                <option>Residential Development</option>
                <option>Hotel / Resort</option>
                <option>Commercial</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Project stage *">
              <select required value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="signature-input">
                <option value="">Select</option>
                <option>Early concept</option>
                <option>Design stage</option>
                <option>Under construction</option>
                <option>Existing space / renovation</option>
              </select>
            </FormField>

            <FormField label="Approximate dimensions">
              <input
                placeholder="Width × Depth × Height"
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                className="signature-input"
              />
            </FormField>

            <FormField label="Expected project investment" className="sm:col-span-2">
              <select
                value={form.investment}
                onChange={(e) => setForm({ ...form, investment: e.target.value })}
                className="signature-input"
              >
                <option value="">To be defined</option>
                <option>€20,000 – €35,000</option>
                <option>€35,000 – €50,000</option>
                <option>€50,000 – €75,000</option>
                <option>€75,000 – €100,000</option>
                <option>€100,000+</option>
              </select>
            </FormField>

            <FormField label="Tell us about your project" className="sm:col-span-2">
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
                I have read and accept the{" "}
                <a href="/en/privacy-policy" className="underline decoration-black/30 underline-offset-2 hover:text-[#9C7B4F]">
                  Privacy Policy
                </a>.
              </span>
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#0B0B0B] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF] transition hover:bg-[#1C1C1C] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {submitState === "sending" ? "Sending..." : "Submit Your Project"}
                {submitState !== "sending" && <ArrowRight className="h-4 w-4" />}
              </button>

              {submitState === "error" && (
                <p className="mt-4 max-w-xl text-sm leading-6 text-red-700">
                  {submitError}
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-black/45">
                All enquiries are reviewed personally and treated with complete discretion.
              </p>
            </div>
          </form>
          )}
        </div>
      </section>

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
            Let's create something
            <br /><span className="italic">exceptional.</span>
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/45">
            Every Signature Project starts with a conversation.
          </p>
          <div className="mt-9">
            <PrimaryButton
              href="#contact"
              dark
              onClick={() => pushDataLayer("signature_cta_click", "final_cta")}
            >
              Discuss Your Project
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
                Bespoke Golf Room Design & Integration
              </p>
            </div>
            <FooterColumn title="Signature" links={[
              ["Private Clients", "#private-clients"],
              ["Professionals", "#professionals"],
              ["Our Process", "#process"],
              ["Selected Projects", "#projects"],
            ]} />
            <FooterColumn title="Contact" links={[
              ["Email", `mailto:${EMAIL}`],
              ["WhatsApp", whatsappUrl],
              ["Schedule a conversation", CALENDLY_URL],
            ]} />
            <FooterColumn title="Legal" links={[
            ["Privacy Policy", "/en/privacy-policy"],
["Cookie Policy", "/en/cookie-policy"],
["Legal Notice", "/en/legal-notice"],
            ]} />
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:justify-between">
            <p>© 2026 Golf en Casa</p>
            <p>Spain · Projects across Europe</p>
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
