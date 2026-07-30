import React, { useState } from "react";
import {
  CheckCircle2,
  Ruler,
  Monitor,
  Wrench,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Home,
  Building2,
  Trophy,
  HelpCircle,
  Euro,
  Star,
  UserCheck,
  MapPin,
  Quote,
  Camera,
  TreePine,
  Expand,
  Sparkles,
  Layers3,
} from "lucide-react";

import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const WHATSAPP_URL =
  "https://wa.me/34678107234?text=Hola,%20he%20visto%20vuestra%20web%20y%20quiero%20saber%20si%20mi%20espacio%20es%20apto%20para%20montar%20un%20simulador%20de%20golf.%20Mis%20medidas%20aproximadas%20son:%20";

const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";
const EMAIL = "info@golfencasa.net";
const GOLF_STUDIO_WHATSAPP_URL =
  "https://wa.me/34678107234?text=Hola,%20he%20visto%20la%20opci%C3%B3n%20Golf%20Studio%20y%20quiero%20estudiar%20la%20instalaci%C3%B3n%20de%20una%20caseta%20con%20simulador%20de%20golf%20en%20mi%20jard%C3%ADn.%20La%20parcela%20est%C3%A1%20en:%20";

const technologies = [
  { name: "GSPro", logo: "/logos/gspro.png" },
  { name: "Garmin", logo: "/logos/garmin.png" },
  { name: "Rapsodo", logo: "/logos/rapsodo.png" },
  { name: "Bushnell", logo: "/logos/bushnell.png" },
  { name: "Uneekor", logo: "/logos/uneekor.png" },
  { name: "Foresight Sports", logo: "/logos/foresight.png" },
  { name: "ProTee", logo: "/logos/protee.png" },
  { name: "TrackMan", logo: "/logos/trackman.png" },
  { name: "BenQ", logo: "/logos/benq.png" },
  { name: "Optoma", logo: "/logos/optoma.png" },
];

const testimonials = [
  {
    name: "Cliente en Écija",
    role: "Diseño e instalación residencial",
    text: "Queríamos montar un simulador de golf en casa, pero no sabíamos por dónde empezar. Francisco nos diseñó e instaló una solución adaptada a nuestro espacio, presupuesto y necesidades, dejando todo listo para poder entrenar y jugar desde casa.",
  },
  {
    name: "Cliente en Jerez",
    role: "Instalación de simulador en casa",
    text: "Estoy empezando en el golf y tener un simulador en casa me parecía una opción inmejorable para entrenar y jugar cuando quisiera. Me decidí a montarlo y Francisco se encargó de todo: diseño, elección de componentes, instalación y configuración final.",
  },
  {
    name: "Consulta online",
    role: "Asesoramiento técnico",
    text: "En una llamada aclaramos si tenía sentido empezar con Garmin, Rapsodo o subir a una opción más avanzada. Salí con una idea clara del presupuesto, las medidas necesarias y los siguientes pasos.",
  },
];

export default function LandingSimuladoresGolf() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    budget: "",
    dimensions: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const pushDataLayer = (event, location) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      location,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "generate_lead",
  form_name: "landing_estudio_viabilidad_simulador",
  lead_type: "formulario_estudio_viabilidad",
});

window.dataLayer.push({
  event: "form_submit",
  form_name: "landing_estudio_viabilidad_simulador",
});

    setTimeout(() => {
      const body = encodeURIComponent(
        `Nombre: ${form.name}
Email: ${form.email}
Teléfono: ${form.phone}
Ciudad / provincia: ${form.city}
Tipo de instalación: ${form.projectType}
Presupuesto aproximado: ${form.budget}
Medidas del espacio: ${form.dimensions}

Mensaje:
${form.message}`
      );

      window.location.href = `mailto:${EMAIL}?subject=Solicitud de estudio gratuito de viabilidad - Simulador de golf&body=${body}`;
    }, 500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Helmet>
  <title>Instalación de simuladores de golf en España | Golf en Casa</title>
  <meta
    name="description"
    content="Diseño e instalación de simuladores de golf a medida para viviendas, jardines, academias y negocios indoor en toda España. Descubre Golf Studio: un espacio independiente para tu simulador."
  />
  <link
    rel="canonical"
    href="https://www.golfencasa.net/instalacion-simuladores-golf"
  />
  <meta
    property="og:title"
    content="Instalación de simuladores de golf en España | Golf en Casa"
  />
  <meta
    property="og:description"
    content="Diseño e instalación llave en mano de simuladores de golf a medida para viviendas, jardines, academias y negocios indoor en toda España, incluida la solución Golf Studio."
  />
  <meta
    property="og:type"
    content="website"
  />
  <meta
    property="og:url"
    content="https://www.golfencasa.net/instalacion-simuladores-golf"
  />
  <meta
    property="og:image"
    content="https://www.golfencasa.net/despues_1.webp"
  />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.golfencasa.net/#organization",
          name: "Golf en Casa",
          url: "https://www.golfencasa.net",
          logo: "https://www.golfencasa.net/logo.webp",
          sameAs: [
            "https://youtube.com/@Golf_en_Casa",
            "https://instagram.com/golf.en.casa/",
            "https://www.facebook.com/GolfenCasaSimuladores/",
            "https://www.tiktok.com/@golf_en_casa"
          ]
        },
        {
          "@type": "HomeAndConstructionBusiness",
          "@id": "https://www.golfencasa.net/#business",
          name: "Golf en Casa",
          url: "https://www.golfencasa.net",
          logo: "https://www.golfencasa.net/logo.webp",
          image: [
            "https://www.golfencasa.net/francisco-golf-en-casa.webp",
            "https://www.golfencasa.net/despues_1.webp",
            "https://www.golfencasa.net/despues_2.webp"
          ],
          description:
            "Diseño e instalación llave en mano de simuladores de golf a medida para viviendas, jardines, academias y negocios indoor en toda España, incluida la solución Golf Studio.",
          telephone: "+34678107234",
          email: "info@golfencasa.net",
          areaServed: {
            "@type": "Country",
            name: "España"
          },
          priceRange: "€€€",
          founder: {
            "@type": "Person",
            name: "Francisco Menacho"
          }
        },
        {
          "@type": "WebPage",
          "@id":
            "https://www.golfencasa.net/instalacion-simuladores-golf/#webpage",
          url: "https://www.golfencasa.net/instalacion-simuladores-golf",
          name: "Instalación de simuladores de golf en España",
          description:
            "Servicio de diseño e instalación llave en mano de simuladores de golf para viviendas, jardines, academias y negocios indoor en toda España.",
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://www.golfencasa.net/despues_1.webp"
          }
        },
        {
          "@type": "Service",
          "@id":
            "https://www.golfencasa.net/instalacion-simuladores-golf/#service",
          name: "Diseño e instalación de simuladores de golf",
          provider: {
            "@id": "https://www.golfencasa.net/#business"
          },
          areaServed: {
            "@type": "Country",
            name: "España"
          },
          serviceType: "Instalación de simuladores de golf",
          description:
            "Diseño del espacio, selección de tecnología, pantalla de impacto, proyector, monitor de lanzamiento, estructura, alfombra, software e instalación completa de simuladores de golf, incluyendo estudios independientes en jardines.",
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: "3000",
            availability: "https://schema.org/InStock",
            url: "https://www.golfencasa.net/instalacion-simuladores-golf"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.golfencasa.net/instalacion-simuladores-golf/#faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Qué altura mínima necesito para un simulador de golf?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Depende de tu estatura, swing y palo más largo. Antes de comprar material conviene revisar altura, ancho, fondo, zona de bola y seguridad."
              }
            },
            {
              "@type": "Question",
              name: "¿Cuánto cuesta un simulador de golf en casa?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "El precio depende del espacio, el nivel de acabado y la tecnología elegida. Como orientación, una instalación sencilla puede partir de unos 3.000 euros, una intermedia suele estar entre 6.000 y 10.000 euros, y una premium puede superar los 10.000 euros."
              }
            },
            {
              "@type": "Question",
              name: "¿Instaláis simuladores de golf en toda España?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Sí. Golf en Casa ofrece consultoría, diseño, selección de componentes e instalación completa de simuladores de golf según la ubicación y el tipo de proyecto."
              }
            },
            {
              "@type": "Question",
              name: "¿Puedo instalar un simulador de golf en una caseta en el jardín?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Sí. Con Golf Studio estudiamos la parcela, las dimensiones necesarias, el aislamiento, la climatización, la instalación eléctrica y la integración completa del simulador en un espacio independiente. La viabilidad final depende también de la normativa urbanística aplicable."
              }
            }
          ]
        }
      ]
    })}
  </script>
</Helmet>
      {/* WHATSAPP FLOTANTE */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        onClick={() => pushDataLayer("click_whatsapp", "floating_button")}
        className="fixed bottom-5 right-5 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-3xl text-white shadow-2xl transition hover:scale-110 hover:bg-green-600"
      >
        <FaWhatsapp />
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.webp" alt="Golf en Casa" width="64" height="64" className="h-16 w-auto" />

            <div>
              <p className="text-sm font-semibold tracking-wide">
                Golf en Casa
              </p>
              <p className="text-xs text-zinc-400">
                Simuladores & Consultoría
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-4 text-xl text-zinc-400 sm:flex">
              <a
                href="https://youtube.com/@Golf_en_Casa"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-red-500"
                aria-label="YouTube Golf en Casa"
              >
                <FaYoutube />
              </a>

              <a
                href="https://instagram.com/golf.en.casa/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-pink-500"
                aria-label="Instagram Golf en Casa"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/GolfenCasaSimuladores/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-blue-500"
                aria-label="Facebook Golf en Casa"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.tiktok.com/@golf_en_casa"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
                aria-label="TikTok Golf en Casa"
              >
                <FaTiktok />
              </a>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDataLayer("click_whatsapp", "header")}
              className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2 text-lg" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-14 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              Simuladores de golf a medida en España
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Convierte tu vivienda o jardín en un simulador de golf profesional listo para jugar
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Diseñamos e instalamos simuladores de golf llave en mano en viviendas, jardines y espacios profesionales. Si no dispones de una habitación adecuada, Golf Studio permite crear un espacio independiente en tu parcela, diseñado alrededor del simulador.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-3">
              <MiniStat label="Proyectos reales" value="Écija y Jerez" highlighted />
              <MiniStat label="Cobertura" value="Toda España" />
              <MiniStat label="Servicio" value="Llave en mano" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
              <TrustBadge icon={<ShieldCheck />} text="Diseño independiente" />
              <TrustBadge icon={<UserCheck />} text="Trato directo con el responsable del proyecto" />
              <TrustBadge icon={<Wrench />} text="Instalación, formación y soporte continuo" />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#formulario"
                onClick={() =>
                  pushDataLayer("click_solicitar_presupuesto", "hero")
                }
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 shadow-2xl shadow-emerald-400/20 transition hover:bg-emerald-300"
              >
Descubre si tu espacio es apto
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_whatsapp", "hero")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Enviar medidas por WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-400">
Estudio inicial gratuito y sin compromiso. Revisamos medidas, fotos y objetivo del proyecto antes de que inviertas en material.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              <Benefit text="No vendemos kits estándar" />
              <Benefit text="Tecnología adaptada a tu espacio" />
              <Benefit text="Instalación profesional" />
            </div>
          </div>

          <div className="mt-12 flex justify-center lg:mt-0 lg:w-[42%]">
            <div className="w-full max-w-[420px] rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* VIABILIDAD DEL ESPACIO */}
      <section className="border-b border-white/10 bg-emerald-400 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-950">
              La primera duda, resuelta
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              ¿Tu espacio es apto para un simulador de golf?
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-800">
              Revisamos gratuitamente altura, ancho, fondo, zona de swing, distancia a pantalla y
              tipo de instalación. Puedes enviarnos medidas y fotos aunque todavía no tengas claro
              qué monitor, proyector o presupuesto necesitas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Garaje", "Sótano", "Habitación", "Buhardilla", "Jardín / parcela", "Academia", "Negocio indoor"].map(
                (space) => (
                  <span
                    key={space}
                    className="rounded-full border border-zinc-950/15 bg-white/50 px-4 py-2 text-sm font-bold"
                  >
                    {space}
                  </span>
                )
              )}
            </div>
          </div>

          <a
            href="#formulario"
            onClick={() => pushDataLayer("click_solicitar_presupuesto", "viability_section")}
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-7 py-4 font-bold text-white shadow-2xl transition hover:bg-zinc-800"
          >
            Descubre si tu espacio es apto
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* GOLF STUDIO */}
      <section
        id="golf-studio"
        className="relative overflow-hidden border-b border-white/10 bg-zinc-900"
        style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(34,197,94,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Nueva solución: Golf Studio
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              ¿No tienes espacio dentro de casa? Créalo en tu jardín.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Golf Studio es un espacio independiente diseñado específicamente para albergar un simulador de golf. Estudiamos la parcela, definimos las dimensiones y coordinamos la caseta, las instalaciones y el equipamiento para entregarte una solución completa y lista para jugar.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StudioFeature
                icon={<TreePine />}
                title="Aprovecha tu jardín"
                text="Convierte una parte de la parcela en una sala de golf sin ocupar ninguna estancia de la vivienda."
              />
              <StudioFeature
                icon={<Expand />}
                title="Diseñado alrededor del swing"
                text="Definimos ancho, fondo y altura pensando desde el inicio en seguridad, comodidad y tipo de jugador."
              />
              <StudioFeature
                icon={<Layers3 />}
                title="Proyecto integral"
                text="Caseta, aislamiento, climatización, electricidad, iluminación y simulador coordinados como un único proyecto."
              />
              <StudioFeature
                icon={<ShieldCheck />}
                title="Uso durante todo el año"
                text="Planteamos un espacio protegido y confortable para entrenar, jugar y recibir invitados en cualquier temporada."
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#formulario"
                onClick={() => pushDataLayer("click_golf_studio", "golf_studio_section")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-300"
              >
                Solicitar estudio de mi parcela
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={GOLF_STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_whatsapp", "golf_studio_section")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Enviar fotos del jardín
              </a>
            </div>

            <p className="mt-4 text-xs leading-5 text-zinc-500">
              La solución se presupuesta de forma personalizada. La viabilidad de la construcción está sujeta a las características de la parcela y a la normativa urbanística municipal aplicable.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-emerald-400/10 blur-3xl" />

            <figure className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-zinc-950 p-3 shadow-2xl sm:p-4">
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet="/images/golf-studio-480.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="/images/golf-studio-768.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 1439px)"
                  srcSet="/images/golf-studio-1280.webp"
                  type="image/webp"
                />
                <img
                  src="/images/golf-studio-1536.webp"
                  srcSet="/images/golf-studio-480.webp 480w, /images/golf-studio-768.webp 768w, /images/golf-studio-1280.webp 1280w, /images/golf-studio-1536.webp 1536w"
                  sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 46vw"
                  width="1536"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  alt="Golf Studio de madera instalado en un jardín, con puertas correderas de cristal y un simulador de golf en funcionamiento"
                  className="aspect-[3/2] h-auto w-full rounded-[1.75rem] border border-white/10 object-cover"
                />
              </picture>

              <figcaption className="sr-only">
                Ejemplo conceptual de Golf Studio: una caseta independiente en el jardín diseñada para integrar un simulador de golf.
              </figcaption>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <StudioStat value="A medida" label="Diseño" />
                <StudioStat value="Integral" label="Proyecto" />
                <StudioStat value="365 días" label="Uso" />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN PERSONAL */}
      <section className="border-b border-white/10 bg-white/[0.03]"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-emerald-400/10 blur-2xl" />
            <img
              src="/francisco-golf-en-casa.webp"
              width="768"
              height="1024"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              alt="Francisco Menacho, fundador de Golf en Casa"
              className="relative h-auto w-full rounded-[2rem] object-cover shadow-2xl"
            />
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Te acompaño en el proyecto
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Soy Francisco Menacho, fundador de Golf en Casa
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Soy ingeniero, creador de contenido especializado en simuladores de golf y responsable directo de cada proyecto de Golf en Casa. Mi objetivo no es venderte un monitor concreto, sino diseñar la solución que mejor encaje con tu espacio, presupuesto y forma de jugar.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <TrustPoint
                icon={<UserCheck />}
                title="Responsable único del proyecto"
                text="Hablas directamente conmigo desde la primera revisión hasta la entrega final."
              />
              <TrustPoint
                icon={<ShieldCheck />}
                title="Diseño independiente"
                text="Seleccionamos la tecnología que mejor encaja, sin obligarte a comprar un kit cerrado."
              />
              <TrustPoint
                icon={<Wrench />}
                title="Instalación y configuración"
                text="Montamos, ajustamos y probamos el sistema para dejarlo listo para jugar."
              />
              <TrustPoint
                icon={<MessageCircle />}
                title="Soporte después de la entrega"
                text="Seguimos disponibles para ayudarte con dudas, ajustes y evolución del simulador."
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#formulario"
                onClick={() =>
                  pushDataLayer(
                    "click_solicitar_presupuesto",
                    "personal_section"
                  )
                }
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-300"
              >
                Descubre si tu espacio es apto
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDataLayer("click_calendly", "personal_section")
                }
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Reservar llamada
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ GOLF EN CASA */}
      <section className="mx-auto max-w-7xl px-6 py-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Por qué Golf en Casa
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              No vendemos cajas: diseñamos tu simulador ideal
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Un simulador de golf no es solo comprar un monitor de lanzamiento. Para que funcione bien hay que combinar medidas, seguridad, pantalla, proyector, alfombra, software, iluminación y experiencia de juego.
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              Por eso cada proyecto se diseña desde cero según el espacio, el presupuesto y el uso real: vivienda, Golf Studio en jardín, academia, club o negocio indoor.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdvantageCard
              icon={<Ruler />}
              title="Aprovechamos tu espacio"
              text="Analizamos altura, ancho, fondo y zona de golpeo antes de decidir componentes."
            />
            <AdvantageCard
              icon={<Monitor />}
              title="Tecnología compatible"
              text="Monitor, proyector, pantalla y software pensados para funcionar juntos."
            />
            <AdvantageCard
              icon={<Wrench />}
              title="Instalación llave en mano"
              text="Nos ocupamos del montaje, configuración y pruebas para dejarlo listo para jugar."
            />
            <AdvantageCard
              icon={<Trophy />}
              title="Experiencia realista"
              text="Diseñamos la sala pensando en entrenar, jugar y disfrutar durante años."
            />
            <AdvantageCard
              icon={<ShieldCheck />}
              title="Menos riesgo"
              text="Evitamos compras incompatibles, errores de medida y soluciones poco seguras."
            />
            <AdvantageCard
              icon={<MessageCircle />}
              title="Soporte cercano"
              text="Tienes una persona de referencia antes, durante y después del proyecto."
            />
          </div>
        </div>
      </section>

      {/* INSTALACIONES REALES */}
      <section className="bg-white px-4 py-20 text-zinc-950 sm:px-6 lg:px-8"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Instalaciones reales
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Proyectos de simuladores de golf a medida
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Ejemplos reales de espacios transformados en zonas de práctica y
              juego indoor. Usa el deslizador para ver el antes y después.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ProjectCard
              title="Simulador de golf en vivienda particular"
              location="Écija, Sevilla"
              before="/antes_1.jpg"
              after="/despues_1.webp"
              description="Transformación de un espacio doméstico en una zona de práctica indoor, optimizando pantalla de impacto, zona de golpeo, proyector, seguridad e iluminación."
            />

            <ProjectCard
              title="Simulador de golf personalizado"
              location="Jerez, Cádiz"
              before="/antes_2.webp"
              after="/despues_2.webp"
              description="Diseño adaptado a las medidas disponibles, el presupuesto, el tipo de jugador y el uso previsto del simulador."
            />
          </div>

          <div className="mt-12 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <p className="font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Zonas donde ya trabajamos
            </p>
            <h3 className="mt-3 text-2xl font-black">
              Instalaciones y proyectos en varias provincias de España
            </h3>
            <p className="mt-3 leading-7 text-zinc-600">
              Realizamos proyectos a medida para clientes particulares, academias y negocios indoor. Podemos desplazarnos y estudiar instalaciones en toda España.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Sevilla", "Cádiz", "Jerez", "Sotogrande", "Málaga", "Marbella", "Madrid", "Toda España"].map((city) => (
                <CityPill key={city} city={city} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDataLayer("click_whatsapp", "projects_section")}
              className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              Quiero algo parecido en mi espacio
            </a>

            <a
              href="#formulario"
              onClick={() =>
                pushDataLayer(
                  "click_solicitar_presupuesto",
                  "projects_section"
                )
              }
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              Descubre si tu espacio es apto
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CARRUSEL TECNOLOGÍAS */}
      <section className="overflow-hidden border-b border-white/10 bg-zinc-950 py-10"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Trabajamos con las principales marcas del sector
          </p>
        </div>

        <div className="mt-8 flex overflow-hidden">
          <div className="animate-[marquee_32s_linear_infinite] flex min-w-full shrink-0 items-center gap-5 px-4">
            {[...technologies, ...technologies].map((item, index) => (
              <TechnologyBadge
                key={`${item.name}-${index}`}
                name={item.name}
                logo={item.logo}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-4xl px-6 text-center text-xs leading-5 text-zinc-400">
          Marcas mencionadas como tecnologías compatibles o habituales en
          proyectos de simuladores. Golf en Casa no representa oficialmente a
          estas marcas salvo indicación expresa.
        </p>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* PROBLEMAS */}
      <section className="mx-auto max-w-7xl px-6 py-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Montar un simulador parece sencillo… hasta que empiezan las dudas
          </h2>
          <p className="mt-4 text-zinc-300">
            La mayoría de errores aparecen por comprar componentes incompatibles
            o no calcular bien el espacio disponible.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={<Ruler />}
            title="¿Tengo altura suficiente?"
            text="Analizamos medidas, swing, distancia a pantalla y seguridad."
          />
          <Card
            icon={<Monitor />}
            title="¿Qué proyector necesito?"
            text="Calculamos distancia, formato, resolución y tamaño de imagen."
          />
          <Card
            icon={<Trophy />}
            title="¿Qué monitor compro?"
            text="Te ayudamos a elegir entre Garmin, Uneekor, Foresight, ProTee y más."
          />
          <Card
            icon={<Wrench />}
            title="¿Quién lo instala?"
            text="Podemos asesorarte, diseñarlo o encargarnos del proyecto completo."
          />
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-y border-white/10 bg-white/[0.03]"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">
Simuladores para viviendas, jardines, academias y negocios
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Service
              icon={<Home />}
              title="Viviendas particulares"
              text="Habitaciones, garajes, sótanos o espacios polivalentes para entrenar y jugar desde casa."
            />
            <Service
              icon={<TreePine />}
              title="Golf Studio en jardín"
              text="Espacios independientes diseñados para integrar una caseta y un simulador completo en tu parcela."
            />
            <Service
              icon={<Building2 />}
              title="Academias y clubes"
              text="Soluciones para clases, fitting, entrenamiento técnico y experiencia indoor."
            />
            <Service
              icon={<ShieldCheck />}
              title="Negocios indoor"
              text="Diseño para centros de ocio, locales comerciales o espacios premium de golf."
            />
          </div>
        </div>
      </section>

      {/* PRECIOS ORIENTATIVOS */}
      <section className="mx-auto max-w-7xl px-6 py-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Presupuesto orientativo
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              ¿Cuánto cuesta montar un simulador de golf?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Disponemos de soluciones para distintos presupuestos. Estas cifras son orientativas y cada proyecto se adapta al espacio, la tecnología elegida y el nivel de acabado que necesites.
            </p>

            <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-sm leading-6 text-emerald-100">
              Cada sala es diferente: altura, ancho, fondo, posición de golpeo,
              tipo de jugador y nivel de acabado pueden cambiar el presupuesto
              final. Por eso revisamos primero las medidas y el objetivo del
              proyecto.
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <PriceCard
              title="Esencial"
              price="Desde 3.000 €"
              text="Configuraciones sencillas para empezar a practicar, siempre sujetas a medidas y componentes."
            />
            <PriceCard
              featured
              title="Home"
              price="6.000 € - 10.000 €"
              text="La opción más habitual para viviendas, academias y uso frecuente."
            />
            <PriceCard
              title="Premium"
              price="10.000 €+"
              text="Instalaciones llave en mano con mayor acabado, precisión, integración y experiencia."
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#formulario"
            onClick={() =>
              pushDataLayer("click_solicitar_presupuesto", "pricing")
            }
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            Descubre si tu espacio es apto
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => pushDataLayer("click_whatsapp", "pricing")}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Preguntar por WhatsApp
          </a>
        </div>
      </section>

      {/* OPINIONES */}
      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-20 text-white sm:px-6 lg:px-8"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Opiniones
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
Clientes que ya han confiado en Golf en Casa
            </h2>

            <p className="mt-5 text-zinc-300">
Experiencias de clientes que necesitaban resolver dudas de espacio, tecnología y presupuesto antes de poner en marcha su simulador.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO RÁPIDO */}
      <section className="border-y border-white/10 bg-green-700/10 px-4 py-14 text-white sm:px-6 lg:px-8"
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[0.25em] text-green-300">
                Contacto rápido
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Envíanos fotos o medidas por WhatsApp y te orientamos
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Para valorar un simulador de golf, lo más útil es conocer
                ancho, fondo, altura y uso previsto. Si tienes fotos del
                espacio, también puedes enviarlas directamente por WhatsApp.
              </p>
            </div>

            <div className="rounded-[2rem] border border-green-400/20 bg-zinc-950 p-6">
              <div className="grid gap-4">
                {[
                  "Medidas aproximadas: ancho x fondo x alto",
                  "Fotos o vídeo del espacio",
                  "Uso previsto: vivienda, Golf Studio, academia o negocio",
                  "Presupuesto aproximado si ya lo tienes claro",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200 sm:text-base"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDataLayer("click_whatsapp", "contact_section")
                }
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-700 px-6 py-4 text-base font-bold text-white transition hover:bg-green-600"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Enviar información por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        id="formulario"
        className="bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-8"
      
        style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Estudio gratuito de viabilidad
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
Descubre si tu espacio es apto antes de invertir en material
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Rellena estos datos básicos y realizaremos una primera revisión técnica gratuita.
              Analizaremos la viabilidad del espacio, los posibles condicionantes, el rango de
              inversión y la tecnología que mejor puede encajar.
            </p>

            <div className="mt-8 space-y-4 text-zinc-300">
              <Benefit text="Revisión de altura, ancho, fondo y zona de swing" />
              <Benefit text="Orientación de presupuesto y nivel de acabado" />
              <Benefit text="Recomendación inicial de tecnología compatible" />
              <Benefit text="Respuesta personalizada, sin compromiso" />
            </div>

            <div className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
              <h3 className="text-xl font-bold text-white">¿Qué ocurre después?</h3>
              <div className="mt-5 space-y-4">
                <NextStep number="1" text="Reviso tus medidas, fotos y objetivo del proyecto." />
                <NextStep number="2" text="Te indico si el espacio es viable y qué opciones encajan." />
                <NextStep number="3" text="Si tiene sentido, preparamos una propuesta personalizada." />
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-label="Nombre"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nombre"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-label="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <label htmlFor="phone" className="sr-only">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-label="Teléfono"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Teléfono"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <label htmlFor="city" className="sr-only">
                Ciudad o provincia
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                aria-label="Ciudad o provincia"
                value={form.city}
                onChange={handleChange}
                placeholder="Ciudad / provincia"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <label htmlFor="projectType" className="sr-only">
                Tipo de instalación
              </label>
              <select
                id="projectType"
                name="projectType"
                aria-label="Tipo de instalación"
                value={form.projectType}
                onChange={handleChange}
                required
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              >
                <option value="">Tipo de instalación</option>
                <option>Vivienda particular</option>
                <option>Golf Studio en jardín</option>
                <option>Academia / club</option>
                <option>Negocio indoor</option>
                <option>Otro</option>
              </select>

              <label htmlFor="budget" className="sr-only">
                Presupuesto aproximado
              </label>
              <select
                id="budget"
                name="budget"
                aria-label="Presupuesto aproximado"
                value={form.budget}
                onChange={handleChange}
                required
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              >
                <option value="">Presupuesto aproximado</option>
                <option>Menos de 5.000 €</option>
                <option>5.000 € - 10.000 €</option>
                <option>10.000 € - 20.000 €</option>
                <option>Más de 20.000 €</option>
              </select>

              <label htmlFor="dimensions" className="sr-only">
                Medidas aproximadas del espacio
              </label>
              <input
                id="dimensions"
                name="dimensions"
                type="text"
                aria-label="Medidas aproximadas del espacio"
                value={form.dimensions}
                onChange={handleChange}
                required
                placeholder="Medidas del espacio o parcela: ancho x fondo x alto"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500 md:col-span-2"
              />

              <label htmlFor="message" className="sr-only">
                Información adicional sobre el proyecto
              </label>
              <textarea
                id="message"
                name="message"
                aria-label="Información adicional sobre el proyecto"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Cuéntanos qué quieres montar, dudas principales o material que ya tienes"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500 md:col-span-2"
              />
            </div>

            <label htmlFor="privacyConsent" className="mt-4 flex items-start gap-3 text-sm text-zinc-300">
              <input id="privacyConsent" name="privacyConsent" type="checkbox" required className="mt-1" />
              <span>
                He leído y acepto la{" "}
                <a
                  href="/politica-privacidad"
                  className="text-emerald-300 underline"
                >
                  Política de Privacidad
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              Solicitar estudio gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <p className="mt-4 text-center text-xs text-zinc-400">
              También puedes enviar fotos o medidas directamente por WhatsApp.
            </p>
          </form>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">Cómo trabajamos</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Step
            number="01"
            title="Estudio de viabilidad"
            text="Revisamos medidas, fotos, zona de swing, seguridad y objetivo del proyecto."
          />
          <Step
            number="02"
            title="Diseño personalizado"
            text="Definimos distribución, estructura, pantalla, proyector, monitor, software y acabados."
          />
          <Step
            number="03"
            title="Instalación y puesta en marcha"
            text="Montamos, configuramos y probamos todos los elementos para dejarlo listo para jugar."
          />
          <Step
            number="04"
            title="Formación y soporte"
            text="Te explicamos el funcionamiento y puedes continuar acompañado con soporte y mantenimiento opcional."
          />
        </div>
      </section>

      {/* GOLF EN CASA CARE */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Después de la instalación
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Tu simulador seguirá acompañado con Golf en Casa CARE
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              La instalación es solo el comienzo. Con nuestro servicio opcional CARE
              podrás contar con mantenimiento, asistencia y soporte para conservar el
              sistema actualizado, optimizado y listo para jugar.
            </p>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              CARE se contrata de forma independiente y se adapta al tipo de instalación,
              equipamiento y nivel de asistencia que necesites.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <CarePoint
                icon={<MessageCircle />}
                title="Asistencia técnica"
                text="Ayuda para resolver incidencias, dudas de uso y ajustes del sistema."
              />
              <CarePoint
                icon={<Monitor />}
                title="Optimización y actualizaciones"
                text="Revisión del software, configuración y rendimiento del simulador."
              />
              <CarePoint
                icon={<Wrench />}
                title="Mantenimiento preventivo"
                text="Comprobaciones periódicas para detectar problemas antes de que afecten al uso."
              />
              <CarePoint
                icon={<ShieldCheck />}
                title="Soporte después de la entrega"
                text="Una persona de referencia para acompañarte durante la vida útil del proyecto."
              />
            </div>

            <a
              href="/care"
              onClick={() => pushDataLayer("click_care", "care_section")}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-300"
            >
              Conoce Golf en Casa CARE
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Dudas habituales antes de montar un simulador de golf
            </h2>
            <p className="mt-5 text-zinc-300">
              Resolvemos las preguntas más importantes sobre espacio,
              presupuesto, jardines, monitores de lanzamiento, proyectores e instalación.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <FAQItem
              question="¿Qué altura mínima necesito para un simulador de golf?"
              answer="Depende de tu estatura, swing y palo más largo. Antes de comprar material conviene revisar altura, ancho, fondo, zona de bola y seguridad."
            />
            <FAQItem
              question="¿Cuánto cuesta un simulador de golf en casa?"
              answer="Como orientación, una instalación básica puede partir de unos 3.000 €, una intermedia suele estar entre 6.000 € y 10.000 €, y una premium puede superar los 10.000 €."
            />
            <FAQItem
              question="¿Instaláis simuladores de golf en toda España?"
              answer="Sí. Podemos ayudarte con consultoría, diseño, selección de componentes e instalación completa según la ubicación y el tipo de proyecto."
            />
            <FAQItem
              question="¿Puedo montar un simulador en un garaje o sótano?"
              answer="Sí, siempre que el espacio permita un swing seguro, una distancia adecuada a la pantalla y una configuración correcta del proyector y monitor."
            />
            <FAQItem
              question="¿Y si no tengo espacio dentro de casa?"
              answer="Podemos estudiar un Golf Studio: una caseta o construcción auxiliar en el jardín diseñada específicamente para albergar el simulador. Analizamos parcela, medidas, aislamiento, climatización, electricidad y normativa municipal antes de preparar la propuesta."
            />
            <FAQItem
              question="¿Qué monitor de lanzamiento me conviene?"
              answer="Depende del presupuesto, si jugarán diestros y zurdos, el espacio disponible, el software que quieras usar y el nivel de precisión que busques."
            />
            <FAQItem
              question="¿Puedo empezar con algo básico y mejorar después?"
              answer="Sí. Podemos plantear el proyecto por fases para controlar la inversión inicial y dejar preparada una evolución futura del simulador."
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="presupuesto"
        className="border-t border-white/10 bg-emerald-400 text-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
¿Quieres saber si tu vivienda o jardín es apto?
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-800">
              Envíanos las medidas o unas fotos de la habitación, garaje o parcela. Te daremos una primera orientación gratuita sobre viabilidad, presupuesto y siguientes pasos.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDataLayer("click_whatsapp", "final_cta")}
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-6 py-4 font-semibold text-white hover:bg-zinc-800"
            >
              <FaWhatsapp className="mr-2 text-xl" />
Enviar medidas por WhatsApp
            </a>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDataLayer("click_calendly", "final_cta")}
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-950 px-6 py-4 font-semibold hover:bg-emerald-300"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Reservar llamada
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER MARCA */}
      <footer className="border-t border-white/10 bg-zinc-950 px-5 py-12 text-center">
        <div className="mx-auto max-w-7xl">
          <img
            src="/logo.webp"
            alt="Golf en Casa"
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
            className="mx-auto h-24 w-auto"
          />

          <h3 className="mt-6 text-2xl font-bold text-white">Golf en Casa</h3>

          <p className="mt-3 text-zinc-400">
            Simuladores de Golf · Consultoría · Instalación · Formación
          </p>

          <div className="mt-8 flex justify-center gap-8 text-4xl">
            <a
              href="https://youtube.com/@Golf_en_Casa"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube Golf en Casa"
              className="text-zinc-400 transition hover:text-red-500"
            >
              <FaYoutube />
            </a>

            <a
              href="https://instagram.com/golf.en.casa/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Golf en Casa"
              className="text-zinc-400 transition hover:text-pink-500"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/GolfenCasaSimuladores/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Golf en Casa"
              className="text-zinc-400 transition hover:text-blue-500"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.tiktok.com/@golf_en_casa"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok Golf en Casa"
              className="text-zinc-400 transition hover:text-white"
            >
              <FaTiktok />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <a href="/aviso-legal" className="hover:text-white">
              Aviso Legal
            </a>

            <a href="/politica-privacidad" className="hover:text-white">
              Política de Privacidad
            </a>

            <a href="/politica-cookies" className="hover:text-white">
              Política de Cookies
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-400">
            © 2026 Golf en Casa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

function AdvantageCard({ icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function CityPill({ city }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-800 shadow-sm">
      <MapPin className="h-4 w-4 text-emerald-700" />
      {city}
    </span>
  );
}

function NextStep({ number, text }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-emerald-50">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-black text-zinc-950">
        {number}
      </span>
      <span>{text}</span>
    </div>
  );
}

function CarePoint({ icon, title, text }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <h3 className="mt-4 font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
      {React.cloneElement(icon, { className: "h-4 w-4 text-emerald-300" })}
      <span>{text}</span>
    </div>
  );
}

function HeroVideo() {
  const [activated, setActivated] = useState(false);

  if (!activated) {
    return (
      <button
        type="button"
        onClick={() => setActivated(true)}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl"
        aria-label="Reproducir vídeo de una instalación de simulador de golf"
      >
        <img
          src="/video_promocion3-poster.webp"
          width="406"
          height="720"
          alt="Vista previa de una instalación de simulador de golf realizada por Golf en Casa"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/65 text-2xl text-white shadow-2xl backdrop-blur transition group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950">
            ▶
          </span>
        </span>
        <span className="absolute inset-x-4 bottom-4 rounded-xl bg-black/60 px-4 py-3 text-left text-sm font-semibold text-white backdrop-blur">
          Ver una instalación real
        </span>
      </button>
    );
  }

  return (
    <video
      className="aspect-[9/16] w-full rounded-[1.5rem] border border-white/10 bg-black object-cover shadow-2xl"
      controls
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/video_promocion3-poster.webp"
      width="406"
      height="720"
      aria-label="Vídeo promocional de una instalación de simulador de golf"
    >
      <source src="/video_promocion3-optimized.mp4" type="video/mp4" />
      Tu navegador no soporta vídeo HTML5.
    </video>
  );
}

function MiniStat({ label, value, highlighted = false }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        highlighted
          ? "border-emerald-400/20 bg-emerald-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <span
        className={`block text-xs uppercase tracking-[0.2em] ${
          highlighted ? "text-emerald-300" : "text-zinc-400"
        }`}
      >
        {label}
      </span>
      <strong className="mt-1 block text-lg text-white">{value}</strong>
    </div>
  );
}

function StudioFeature({ icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <h3 className="font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function StudioStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4">
      <strong className="block text-sm text-white sm:text-base">{value}</strong>
      <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</span>
    </div>
  );
}

function PriceCard({ title, price, text, featured = false }) {
  return (
    <article
      className={`rounded-3xl border p-6 shadow-2xl ${
        featured
          ? "border-emerald-400/50 bg-emerald-400 text-zinc-950"
          : "border-white/10 bg-white/5 text-white"
      }`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
          featured
            ? "bg-zinc-950 text-emerald-300"
            : "bg-emerald-400/10 text-emerald-300"
        }`}
      >
        <Euro className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p
        className={`mt-3 text-2xl font-black ${
          featured ? "text-zinc-950" : "text-white"
        }`}
      >
        {price}
      </p>
      <p
        className={`mt-4 text-sm leading-6 ${
          featured ? "text-zinc-800" : "text-zinc-300"
        }`}
      >
        {text}
      </p>
    </article>
  );
}

function FAQItem({ question, answer }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{question}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{answer}</p>
        </div>
      </div>
    </article>
  );
}

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
      <span>{text}</span>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}

function Service({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-7">
      <div className="mb-5 text-emerald-300">
        {React.cloneElement(icon, { className: "h-8 w-8" })}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-zinc-300">{text}</p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-bold text-emerald-300">{number}</p>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}

function TrustPoint({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}

function TechnologyBadge({ name, logo }) {
  return (
    <div className="flex h-24 w-56 shrink-0 items-center justify-center px-6 py-3">
      <img
        src={logo}
        alt={name}
        width="180"
        height="64"
        className="max-h-16 max-w-[180px] object-contain opacity-100 brightness-110 contrast-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}

function TestimonialCard({ name, role, text }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6 shadow-2xl">
      <div className="flex items-center gap-1 text-emerald-300">
        {[1, 2, 3, 4, 5].map((item) => (
          <Star key={item} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <Quote className="mt-6 h-8 w-8 text-emerald-300/60" />

      <p className="mt-4 leading-7 text-zinc-300">“{text}”</p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="font-bold text-white">{name}</p>
        <p className="mt-1 text-sm text-zinc-400">{role}</p>
      </div>
    </article>
  );
}

function ProjectCard({ title, location, before, after, description }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 shadow-xl">
      <BeforeAfterSlider before={before} after={after} alt={title} />

      <div className="p-6">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <MapPin className="h-4 w-4" />
          {location}
        </p>

        <h3 className="mt-3 text-2xl font-black">{title}</h3>

        <p className="mt-4 leading-7 text-zinc-600">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <Camera className="h-3 w-3" />
            Antes / después real
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
            Diseño a medida
          </span>
        </div>
      </div>
    </article>
  );
}

function BeforeAfterSlider({ before, after, alt }) {
  const [position, setPosition] = useState(50);

  const safePosition = Math.min(Math.max(Number(position), 1), 99);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
      <img
        src={before}
        width="1600"
        height="1200"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        alt={`${alt} antes`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${safePosition}%` }}
      >
        <img
          src={after}
          width="1600"
          height="1200"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          alt={`${alt} después`}
          className="h-full w-full object-cover"
          style={{
            width: `${100 / (safePosition / 100)}%`,
            maxWidth: "none",
          }}
        />
      </div>

      <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
        Después
      </div>

      <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
        Antes
      </div>

      <div
        className="absolute bottom-0 top-0 z-10 w-1 bg-white shadow-2xl"
        style={{ left: `${safePosition}%` }}
      />

      <input
        type="range"
        min="1"
        max="99"
        value={safePosition}
        onChange={(e) => setPosition(e.target.value)}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Comparador antes y después"
      />

      <div
        className="pointer-events-none absolute top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/70 text-sm font-black text-white shadow-xl"
        style={{ left: `${safePosition}%` }}
      >
        ↔
      </div>
    </div>
  );
}