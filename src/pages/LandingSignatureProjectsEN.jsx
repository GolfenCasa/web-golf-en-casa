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
import {
  EMPTY_ATTRIBUTION,
  appendAttributionToUrl,
  attributionEventData as getAttributionEventData,
  buildWhatsAppUrl,
  captureAttribution,
  getCurrentBrowserPath,
  prepareAttributedLink,
  toLeadAttribution,
} from "../lib/attribution";

const WHATSAPP_PHONE = "34678107234";
const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";
const EMAIL = "info@golfencasa.net";

const COLORS = {
  black: "#0B0B0B",
  graphite: "#1C1C1C",
  stone: "#6B6B6B",
  warm: "#F5F3EF",
  gold: "#C8AA7D",
};

const attributionEventData = (attribution) =>
  getAttributionEventData(attribution, {
    landingFallback: "/en/signature",
    conversionPage: getCurrentBrowserPath(),
    locale: "en",
  });

const processSteps = [
  ["01", "DISCOVERY", "Space · needs · objectives"],
  ["02", "CONCEPT DESIGN", "Layout · experience · aesthetics"],
  ["03", "TECHNICAL ENGINEERING", "Projection · tracking · infrastructure"],
  ["04", "TECHNOLOGY SELECTION", "Launch monitor · projection · computing"],
  ["05", "CONSTRUCTION COORDINATION", "Architecture · interior design · services"],
  ["06", "INSTALLATION", "Structure · finishes · technology"],
  ["07", "CALIBRATION", "Image · tracking · software"],
  ["08", "WHITE GLOVE HANDOVER", "Testing · training · delivery"],
];

const techItems = [
  ["01", "TRACKING", "Launch monitor selected specifically for the space, the player and the intended use.", <Monitor />],
  ["02", "PROJECTION", "Optics, resolution and brightness calculated for the actual room geometry.", <Lightbulb />],
  ["03", "COMPUTING", "Hardware specified for the required resolution, software and experience.", <Sparkles />],
  ["04", "LIGHTING", "Lighting designed to work with projection and the everyday use of the space.", <Lightbulb />],
  ["05", "ACOUSTICS", "Integrated treatment to control impact noise, reverberation and acoustic comfort.", <Volume2 />],
  ["06", "CONTROL", "Lighting, AV and system automation whenever the project requires it.", <Wifi />],
];

const privatePillars = [
  ["BESPOKE DESIGN", "Every project begins with a different space, set of needs and vision.", <DraftingCompass />],
  ["ARCHITECTURAL INTEGRATION", "We integrate the golf simulator into the architecture and interior design of the residence.", <Home />],
  ["TECHNOLOGY WITHOUT COMPROMISE", "We select technology around the project — not the other way around.", <Monitor />],
  ["TURNKEY DELIVERY", "We coordinate design, supply, installation, configuration and final handover.", <KeyRound />],
];

const professionalServices = [
  ["SPATIAL PLANNING", "Dimensions, hitting position, circulation and safety zones.", <Ruler />],
  ["TECHNICAL SPECIFICATION", "Power, data, projection, tracking, lighting and climate requirements.", <DraftingCompass />],
  ["DESIGN COORDINATION", "Integration with architecture, interior design and building services.", <Home />],
  ["TECHNOLOGY SPECIFICATION", "Selection of tracking, projection, PC, AV and control systems.", <Monitor />],
  ["SITE COORDINATION", "Technical coordination during construction and fit-out.", <ShieldCheck />],
  ["COMMISSIONING", "Installation, configuration, calibration and handover.", <Sparkles />],
];

const faqs = [
  {
    q: "When should I contact Signature Projects?",
    a: "The earlier, the better. A golf simulator can influence dimensions, ceiling heights, services, lighting, climate control and finishes. Involving us from the early stages helps optimise the project and avoid later changes.",
  },
  {
    q: "Do you work with my architect or interior designer?",
    a: "Yes. Signature Projects can join the existing project team and work directly with architects, interior designers, contractors and project managers.",
  },
  {
    q: "Can I choose the launch monitor and other equipment?",
    a: "Yes. We work with multiple manufacturers and select the technology according to the space, the player’s needs and the project objectives.",
  },
  {
    q: "Do you deliver projects outside Spain?",
    a: "Yes. We assess national and international projects individually according to location and scope.",
  },
  {
    q: "Can the room be multifunctional?",
    a: "Yes. We can design solutions that combine golf with cinema, entertainment or other uses while minimising the visual presence of technology when it is not in use.",
  },
  {
    q: "How much does a Signature Project cost?",
    a: "Every project is quoted individually. Investment depends on dimensions, technology, finishes, integration complexity and the scope of our services. After an initial conversation, we can determine the most appropriate approach.",
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
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [technicalSubmitState, setTechnicalSubmitState] = useState("idle");
  const [technicalSubmitError, setTechnicalSubmitError] = useState("");
  const [technicalForm, setTechnicalForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    profile: "",
    projectType: "",
    dimensions: "",
    investment: "",
    sourceDeclared: "",
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
    sourceDeclared: "",
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

  const pushDataLayer = (event, location, extra = {}, attributionOverride = attribution) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      location,
      ...attributionEventData(attributionOverride),
      ...extra,
    });
  };

  const calendlyUrl = useMemo(
    () => appendAttributionToUrl(CALENDLY_URL, attribution),
    [attribution],
  );

  const refreshCalendlyLink = (event) => {
    const prepared = prepareAttributedLink(event, CALENDLY_URL, attribution);
    setAttribution(prepared.attribution);
    return prepared;
  };

  const trackCalendlyClick = (event, location) => {
    const prepared = refreshCalendlyLink(event);
    pushDataLayer(
      "signature_calendly",
      location,
      {},
      prepared.attribution,
    );
  };

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        message:
          "Hello, I would like to discuss a project with Golf en Casa | Signature Projects.",
        phone: WHATSAPP_PHONE,
        attribution,
        pagePath: getCurrentBrowserPath(),
        button: "signature_contact",
        locale: "en",
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
          privacyConsent:
            e.currentTarget.elements.privacyConsent?.checked === true,
          attribution: toLeadAttribution(attribution, {
            conversionPage: getCurrentBrowserPath(),
          }),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The project enquiry could not be sent.");
      }

      if (result.filtered) {
        setSubmitState("success");
        return;
      }

      // Count the lead only after the server confirms it has been received.
      pushDataLayer("signature_project_form_submit", "signature_form", {
        lead_type: "signature_project",
        client_profile: form.profile,
        project_type: form.projectType,
        project_stage: form.stage,
        investment_range: form.investment,
        source_declared: form.sourceDeclared,
      });

      pushDataLayer("form_submit", "signature_form", {
        form_name: "signature_project_enquiry",
        lead_type: "signature_project",
        project_type: form.projectType,
        budget_range: form.investment,
        source_declared: form.sourceDeclared,
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
        source_declared: form.sourceDeclared,
        user_data: {
          email_address: form.email.trim().toLowerCase(),
          phone_number: form.phone.trim(),
        },
        ...attributionEventData(attribution),
      });

      setSubmitState("success");
    } catch (error) {
      console.error(error);
      setSubmitError(
        "We could not send your project enquiry. Please try again or contact us by WhatsApp or email."
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
          privacyConsent:
            e.currentTarget.elements.privacyConsent?.checked === true,
          attribution: toLeadAttribution(attribution, {
            conversionPage: getCurrentBrowserPath(),
          }),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The request could not be sent.");
      }

      if (result.filtered) {
        setTechnicalSubmitState("success");
        return;
      }

      pushDataLayer("signature_technical_request_submit", "professionals_technical_form", {
        lead_type: "signature_technical_request",
        client_profile: technicalForm.profile,
        project_type: technicalForm.projectType,
        investment_range: technicalForm.investment,
        source_declared: technicalForm.sourceDeclared,
      });

      pushDataLayer("form_submit", "professionals_technical_form", {
        form_name: "signature_technical_request",
        lead_type: "signature_technical_request",
        project_type: technicalForm.projectType,
        budget_range: technicalForm.investment,
        source_declared: technicalForm.sourceDeclared,
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_name: "signature_technical_request",
        lead_type: "signature_technical_request",
        client_profile: technicalForm.profile,
        project_type: technicalForm.projectType,
        investment_range: technicalForm.investment,
        source_declared: technicalForm.sourceDeclared,
        user_data: {
          email_address: technicalForm.email.trim().toLowerCase(),
          phone_number: technicalForm.phone.trim(),
        },
        ...attributionEventData(attribution),
      });

      setTechnicalSubmitState("success");
    } catch (error) {
      console.error(error);
      setTechnicalSubmitError(
        "We could not send your request. Please try again or contact us by WhatsApp or email."
      );
      setTechnicalSubmitState("error");
    }
  };

  return (
    <main className="signature-sans min-h-screen bg-[#0B0B0B] text-[#F5F3EF]">
      <Helmet>
        <title>Luxury Golf Simulators | Bespoke Signature Projects</title>
        <meta
          name="description"
          content="Golf en Casa | Signature Projects. Bespoke luxury golf simulator design and installation for private residences, villas, architecture studios and premium developments."
        />
        <link rel="canonical" href="https://www.golfencasa.net/en/signature" />
        <link rel="alternate" hrefLang="es" href="https://www.golfencasa.net/signature" />
        <link rel="alternate" hrefLang="en" href="https://www.golfencasa.net/en/signature" />
        <link rel="alternate" hrefLang="x-default" href="https://www.golfencasa.net/signature" />
        <meta property="og:title" content="Golf en Casa | Signature Projects" />
        <meta
          property="og:description"
          content="Bespoke golf simulator design and integration. Private golf simulators conceived around architecture, experience and space."
        />
        <meta property="og:type" content="website" />
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
                serviceType: "Bespoke Golf Simulator Design & Integration",
                provider: {
                  "@type": "Organization",
                  name: "Golf en Casa",
                  url: "https://www.golfencasa.net",
                  email: EMAIL,
                  telephone: "+34678107234",
                },
                areaServed: ["Spain", "Europe"],
                description:
                  "Bespoke design, engineering, coordination and integration of private golf simulators for residences, villas and high-end architectural projects.",
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
            alt="Private Signature golf simulator integrated into a contemporary residence"
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
              Private Golf Simulators.
              <span className="mt-1 block italic">Designed Around You.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/70 sm:text-base">
              Bespoke golf environments where architecture, technology and
              interior design come together as one.
            </p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8AA7D]">
              Bespoke Golf Simulator Design & Integration
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
                We design every golf simulator as an integrated project. Architecture,
                dimensions, lighting, acoustics, materials and technology are
                considered together to create a golf experience that feels like a
                natural part of the space.
              </p>
              <p>
                From a dedicated golf simulator to a fully integrated multifunctional
                space, every decision responds to the project, the architecture and
                the way the client wants to experience golf.
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
                alt="Private golf simulator integrated into a residence"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Private Clients
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Your private golf simulator.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  For homeowners looking to integrate an exceptional golf experience
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
                alt="Architecture studio coordinating a project"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8AA7D]">
                  Architects & Designers
                </p>
                <h3 className="signature-serif mt-3 text-4xl text-[#F5F3EF]">
                  Your golf simulator specialist.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">
                  We collaborate from the earliest project stages through
                  installation and commissioning.
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
                Your simulator.
                <br />Your game.
                <br /><span className="italic">Your Signature.</span>
              </h2>
              <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/65">
                A private golf simulator should feel like a natural extension of your
                home. We design every project from the ground up to combine an
                exceptional playing experience with the architecture, materials
                and character of the space.
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
              alt="Signature golf simulator with architectural integration"
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
                The golf simulator specialist
                <br />on your project team.
              </h2>
            </div>
            <div className="lg:pt-10">
              <p className="max-w-2xl text-sm leading-7 text-black/65">
                We work with architects, interior designers, developers and project
                managers, providing the specialist knowledge required to integrate
                a golf simulator from the earliest stages of the project.
              </p>
              <div className="mt-8 border-l border-[#C8AA7D] pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">
                  Involve us early.
                </p>
                <p className="signature-serif mt-3 max-w-2xl text-2xl leading-8">
                  We anticipate dimensions, services and technical constraints
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
              Request Technical Information
            </button>
          </div>
        </div>
      </section>

      {/* 05 PROCESS */}
      <section id="process" className="bg-[#151515]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <SectionLabel dark>05 — Our Process</SectionLabel>
          <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
            From first sketch
            <br />to the first swing.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
            A clear, coordinated process to ensure every detail of the space works
            exactly as intended.
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
              From the first drawing to final calibration, one team coordinates
              every element that turns the space into a Signature experience.
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
                <br /><span className="italic">you don’t notice.</span>
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
              Designed
              <br />down to the last detail.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-black/60">
              Every Signature Project can be tailored to the material language of the
              residence. Panelling, acoustic finishes, flooring, lighting, joinery
              and detailing are developed as part of one coherent design.
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
              A golf simulator that belongs to the house.
            </p>
            <p className="signature-serif mt-4 text-3xl leading-10 sm:text-4xl">
              We do not want the golf simulator to look as though it was installed in
              a room. We want the room to feel as though it was always designed
              around the simulator.
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
              title="Private Golf Simulator"
              meta="Concept Design · Architectural Integration"
            />
            <ProjectCard
              className="lg:col-span-5"
              image="/signature/project-02.webp"
              eyebrow="CONCEPT STUDY — SIGNATURE SIMULATOR"
              title="Signature Golf Simulator"
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
              title="Golf Simulator & Entertainment"
              meta="Architecture · Technology · Interior Integration"
            />
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-5 text-white/40">
            Concept projects are expressly identified as Concept Study.
            These images can be replaced with completed installations as the
            Signature portfolio grows.
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
            Every Signature Project is designed and quoted individually. Investment
            depends on the characteristics of the space, the project scope, the
            level of integration, finishes and the selected technology.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["SCOPE", "From technology integration within a previously designed room to the complete development of the golf simulator and surrounding space."],
              ["TECHNOLOGY", "We select every system according to the actual requirements of the project."],
              ["FINISHES", "Materials, joinery, acoustics and interior design can form part of the Signature scope."],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-black/20 pt-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C7B4F]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-6 border-t border-black/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="signature-serif text-3xl">Every project begins with a conversation.</p>
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
            <SectionLabel dark>Frequently Asked Questions</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl">Before you begin.</h2>
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
            <SectionLabel>Tell Us About Your Project</SectionLabel>
            <h2 className="signature-serif mt-5 text-5xl leading-[0.98] sm:text-6xl">
              Let’s create something
              <br /><span className="italic">exceptional.</span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-black/60">
              Tell us briefly what you are creating. Every Signature enquiry is
              reviewed personally and handled with complete discretion.
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
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onPointerDown={refreshCalendlyLink}
                  onClick={(event) => trackCalendlyClick(event, "contact")}
                  className="flex items-center gap-3 hover:text-[#9C7B4F]"
                >
                  <CalendarDays className="h-4 w-4" /> Schedule a Conversation
                </a>
              </div>
            </div>
          </div>

          {submitState === "success" ? (
            <div role="status" aria-live="polite" aria-atomic="true" className="border-t border-[#C8AA7D] pt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9C7B4F]">
                Project received
              </p>
              <h3 className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                Thank you.
                <br />
                <span className="italic">We have received your project.</span>
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
                We have received your project details. We will review the information
                personally and contact you shortly.
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
              <input id={technicalOpen ? "signature-project-email" : "email"} required type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Phone *">
              <input id={technicalOpen ? "signature-project-phone" : "phone"} required type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="signature-input" />
            </FormField>
            <FormField label="Project location *">
              <input required name="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="signature-input" />
            </FormField>

            <FormField label="I am... *">
              <select required value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} className="signature-input">
                <option value="">Select</option>
                <option>Private client</option>
                <option>Architect / Interior Designer</option>
                <option>Developer</option>
                <option>Contractor / Project Manager</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Project type *">
              <select required value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="signature-input">
                <option value="">Select</option>
                <option>Private residence</option>
                <option>Villa</option>
                <option>Residential development</option>
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

            <FormField label="Approximate dimensions *">
              <input
                required
                name="dimensions"
                placeholder="Width × Depth × Height · or ‘Not sure yet’"
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                className="signature-input"
              />
            </FormField>

            <FormField label="Expected project investment *" className="sm:col-span-2">
              <select
                required
                name="investment"
                value={form.investment}
                onChange={(e) => setForm({ ...form, investment: e.target.value })}
                className="signature-input"
              >
                <option value="">Select</option>
                <option>To be defined</option>
                <option>€20,000 – €35,000</option>
                <option>€35,000 – €50,000</option>
                <option>€50,000 – €75,000</option>
                <option>€75,000 – €100,000</option>
                <option>€100,000+</option>
              </select>
            </FormField>

            <FormField label="How did you hear about us? *" className="sm:col-span-2">
              <select
                required
                name="sourceDeclared"
                value={form.sourceDeclared}
                onChange={(e) => setForm({ ...form, sourceDeclared: e.target.value })}
                className="signature-input"
              >
                <option value="">Select</option>
                <option>Google</option>
                <option>Instagram / Facebook</option>
                <option>YouTube</option>
                <option>Recommendation</option>
                <option>I already knew Golf en Casa</option>
                <option>Other</option>
                <option>Not sure / Do not remember</option>
              </select>
            </FormField>

            <FormField label="Tell Us About Your Project" className="sm:col-span-2">
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
                name="privacyConsent"
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
                {submitState === "sending" ? "Sending..." : "Send Project Enquiry"}
                {submitState !== "sending" && <ArrowRight className="h-4 w-4" />}
              </button>

              {submitState === "error" && (
                <p role="alert" aria-live="assertive" aria-atomic="true" className="mt-4 max-w-xl text-sm leading-6 text-red-700">
                  {submitError}
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-black/45">
                All enquiries are reviewed personally and handled with complete discretion.
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
              aria-label="Close technical information request">
              <X className="h-5 w-5" />
            </button>

            {technicalSubmitState === "success" ? (
              <div role="status" aria-live="polite" aria-atomic="true" className="py-6">
                <SectionLabel>Request received</SectionLabel>
                <h3 id="technical-request-title" className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                  Thank you.<br /><span className="italic">We have received your request.</span>
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
                  We will review the information personally and contact you shortly.
                </p>
                <button type="button" onClick={() => setTechnicalOpen(false)}
                  className="mt-8 bg-[#0B0B0B] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF]">
                  Close
                </button>
              </div>
            ) : (
              <>
                <SectionLabel>Technical Information</SectionLabel>
                <h3 id="technical-request-title" className="signature-serif mt-4 text-4xl leading-tight sm:text-5xl">
                  Request Technical Information<br /><span className="italic">for your project.</span>
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-black/60">
                  For architects, interior designers, developers and professionals who need
                  technical information to integrate a golf simulator into their project.
                </p>

                <form onSubmit={handleTechnicalSubmit} className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <input type="text" name="companyWebsite" tabIndex="-1" autoComplete="off"
                    aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

                  <FormField label="Full name *">
                    <input required value={technicalForm.name}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, name: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Professional email *">
                    <input id="email" required type="email" name="email" autoComplete="email" value={technicalForm.email}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, email: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Phone *">
                    <input required type="tel" name="phone" autoComplete="tel" value={technicalForm.phone}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, phone: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Project location *">
                    <input required name="location" value={technicalForm.location}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, location: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Company / Studio">
                    <input value={technicalForm.company}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, company: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Professional profile *">
                    <select required value={technicalForm.profile}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, profile: e.target.value })}
                      className="signature-input">
                      <option value="">Select</option>
                      <option>Architect</option>
                      <option>Interior Designer</option>
                      <option>Developer</option>
                      <option>Project Manager</option>
                      <option>Contractor</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Project type *">
                    <select required name="projectType" value={technicalForm.projectType}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, projectType: e.target.value })}
                      className="signature-input">
                      <option value="">Select</option>
                      <option>Private residence</option>
                      <option>Villa</option>
                      <option>Residential development</option>
                      <option>Hotel / Resort</option>
                      <option>Commercial</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Approximate dimensions *">
                    <input required name="dimensions" placeholder="Width × Depth × Height · or ‘Not sure yet’"
                      value={technicalForm.dimensions}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, dimensions: e.target.value })}
                      className="signature-input" />
                  </FormField>

                  <FormField label="Expected investment *">
                    <select required name="investment" value={technicalForm.investment}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, investment: e.target.value })}
                      className="signature-input">
                      <option value="">Select</option>
                      <option>To be defined</option>
                      <option>€20,000 – €35,000</option>
                      <option>€35,000 – €50,000</option>
                      <option>€50,000 – €75,000</option>
                      <option>€75,000 – €100,000</option>
                      <option>€100,000+</option>
                    </select>
                  </FormField>

                  <FormField label="How did you hear about us? *">
                    <select required name="sourceDeclared" value={technicalForm.sourceDeclared}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, sourceDeclared: e.target.value })}
                      className="signature-input">
                      <option value="">Select</option>
                      <option>Google</option>
                      <option>Instagram / Facebook</option>
                      <option>YouTube</option>
                      <option>Recommendation</option>
                      <option>I already knew Golf en Casa</option>
                      <option>Other</option>
                      <option>Not sure / Do not remember</option>
                    </select>
                  </FormField>

                  <FormField label="What information do you need?" className="sm:col-span-2">
                    <textarea rows={5} value={technicalForm.message}
                      onChange={(e) => setTechnicalForm({ ...technicalForm, message: e.target.value })}
                      className="signature-input resize-none" />
                  </FormField>

                  <label className="sm:col-span-2 flex items-start gap-3 text-xs leading-5 text-black/55">
                    <input type="checkbox" name="privacyConsent" required className="mt-1 accent-[#0B0B0B]" />
                    <span>
                      I have read and accept the{" "}
                      <a href="/en/privacy-policy"
                        className="underline decoration-black/30 underline-offset-2 hover:text-[#9C7B4F]">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={technicalSubmitState === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#0B0B0B] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F3EF] transition hover:bg-[#1C1C1C] disabled:opacity-50 sm:w-auto">
                      {technicalSubmitState === "sending" ? "Sending..." : "Send Request"}
                      {technicalSubmitState !== "sending" && <ArrowRight className="h-4 w-4" />}
                    </button>
                    {technicalSubmitState === "error" && (
                      <p role="alert" aria-live="assertive" aria-atomic="true" className="mt-4 max-w-xl text-sm leading-6 text-red-700">{technicalSubmitError}</p>
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
            Let’s create something
            <br /><span className="italic">exceptional.</span>
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/45">
            Every Signature Project begins with a conversation.
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
                Bespoke Golf Simulator Design & Integration
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
              ["Schedule a Conversation", calendlyUrl, {
                onPointerDown: refreshCalendlyLink,
                onClick: (event) => trackCalendlyClick(event, "footer"),
              }],
            ]} />
            <FooterColumn title="Legal" links={[
              ["Privacy", "/en/privacy-policy"],
              ["Cookies", "/en/cookie-policy"],
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
        {links.map(([label, href, linkProps = {}]) => (
          <a
            key={label}
            href={href}
            {...linkProps}
            className="block text-xs text-white/45 transition hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
