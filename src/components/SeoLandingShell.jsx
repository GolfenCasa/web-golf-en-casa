import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import {
  EMPTY_ATTRIBUTION,
  attributionEventData,
  buildWhatsAppUrl,
  captureAttribution,
  getCurrentBrowserPath,
  getWhatsAppReference,
} from "../lib/attribution.js";

const SITE_URL = "https://www.golfencasa.net";
const WHATSAPP_NUMBER = "34678107234";

export function SeoHead({
  title,
  description,
  path,
  image = "/despues_1.webp",
  faqs = [],
  serviceType,
}) {
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  const schemaIdBase = canonical.endsWith("/") ? canonical : `${canonical}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Golf en Casa",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo-mail4.png`,
        email: "info@golfencasa.net",
        telephone: "+34678107234",
        areaServed: { "@type": "Country", name: "España" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Golf en Casa",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "es-ES",
      },
      {
        "@type": "WebPage",
        "@id": `${schemaIdBase}#webpage`,
        url: canonical,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      ...(serviceType
        ? [
            {
              "@type": "Service",
              "@id": `${schemaIdBase}#service`,
              name: serviceType,
              serviceType,
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: { "@type": "Country", name: "España" },
              url: canonical,
            },
          ]
        : []),
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${schemaIdBase}#faq`,
              mainEntity: faqs.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function PublicHeader() {
  return (
    <header className="border-b border-white/10 bg-zinc-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Golf en Casa, inicio">
          <img src="/logo-mail4.png" alt="Golf en Casa" width="64" height="64" className="h-14 w-auto" />
          <div>
            <p className="text-sm font-semibold tracking-wide">Golf en Casa</p>
            <p className="text-xs text-zinc-400">Simuladores & Consultoría</p>
          </div>
        </a>
        <nav aria-label="Navegación principal" className="order-3 flex w-full gap-5 overflow-x-auto pb-1 text-sm text-zinc-300 lg:order-2 lg:w-auto lg:pb-0">
          <a href="/instalacion-simuladores-golf" className="whitespace-nowrap hover:text-white">Instalación</a>
          <a href="/precio-simulador-golf" className="whitespace-nowrap hover:text-white">Precios</a>
          <a href="/medidas-simulador-golf" className="whitespace-nowrap hover:text-white">Medidas</a>
          <a href="/proyectos" className="whitespace-nowrap hover:text-white">Proyectos</a>
          <a href="/care" className="whitespace-nowrap hover:text-white">CARE</a>
        </nav>
        <a
          href="/instalacion-simuladores-golf#formulario"
          className="order-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300 lg:order-3"
        >
          Estudiar mi proyecto
        </a>
      </div>
    </header>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm text-zinc-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li><a href="/" className="hover:text-white">Inicio</a></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? <a href={item.href} className="hover:text-white">{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Checklist({ items, dark = false }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 rounded-2xl border p-4 ${dark ? "border-white/10 bg-white/5" : "border-zinc-200 bg-white"}`}>
          <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-emerald-300" : "text-emerald-700"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LeadBand({ context = "mi proyecto de simulador de golf" }) {
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION);

  useEffect(() => {
    const captured = captureAttribution();
    const updateHandle = window.setTimeout(() => setAttribution(captured), 0);

    return () => window.clearTimeout(updateHandle);
  }, []);

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        phone: WHATSAPP_NUMBER,
        message: `Hola, quiero información sobre ${context}.`,
        attribution,
        pagePath: getCurrentBrowserPath({ fallback: "/" }),
        button: "seo_lead_band",
      }),
    [attribution, context],
  );

  return (
    <section className="bg-emerald-400 text-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-7 px-6 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em]">Primera orientación sin compromiso</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Cuéntanos el espacio, el uso y el presupuesto</h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-800">Revisaremos la información antes de recomendar componentes o una instalación.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/instalacion-simuladores-golf#formulario"
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-6 py-4 font-bold text-white transition hover:bg-zinc-800"
          >
            Solicitar estudio <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp_click", "seo_lead_band", attribution)}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-950 px-6 py-4 font-bold transition hover:bg-emerald-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 px-6 py-12 text-zinc-400">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src="/logo-mail4.png" alt="Golf en Casa" width="80" height="80" className="h-20 w-auto" />
          <p className="mt-4 max-w-md leading-7">Diseño, consultoría, instalación y soporte de simuladores de golf a medida en España.</p>
        </div>
        <div>
          <h2 className="font-bold text-white">Planifica tu simulador</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a href="/precio-simulador-golf" className="hover:text-white">Precio de un simulador</a>
            <a href="/medidas-simulador-golf" className="hover:text-white">Medidas y viabilidad</a>
            <a href="/consultoria-simulador-golf" className="hover:text-white">Consultoría</a>
            <a href="/simulador-golf-jardin" className="hover:text-white">Simulador en jardín</a>
            <a href="/simulador-golf-negocio" className="hover:text-white">Soluciones para negocios</a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white">Golf en Casa</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a href="/proyectos" className="hover:text-white">Proyectos realizados</a>
            <a href="/care" className="hover:text-white">Mantenimiento CARE</a>
            <a href="/signature" className="hover:text-white">Signature Projects</a>
            <a href="mailto:info@golfencasa.net" className="inline-flex items-center hover:text-white"><Mail className="mr-2 h-4 w-4" />info@golfencasa.net</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6 text-xs">
        <span>© 2026 Golf en Casa</span>
        <a href="/aviso-legal" className="hover:text-white">Aviso legal</a>
        <a href="/politica-privacidad" className="hover:text-white">Privacidad</a>
        <a href="/politica-cookies" className="hover:text-white">Cookies</a>
      </div>
    </footer>
  );
}

function trackContact(event, location, attribution) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    location,
    contact_channel: "whatsapp",
    whatsapp_reference: getWhatsAppReference(attribution),
    page_path: window.location.pathname,
    ...attributionEventData(attribution, {
      conversionPage: getCurrentBrowserPath(),
    }),
  });
}
