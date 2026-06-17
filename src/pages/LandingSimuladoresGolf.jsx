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
} from "lucide-react";

import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/34678107234?text=Hola,%20he%20visto%20vuestra%20web%20y%20quiero%20saber%20si%20mi%20espacio%20es%20apto%20para%20montar%20un%20simulador%20de%20golf.%20Mis%20medidas%20aproximadas%20son:%20";

const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";
const EMAIL = "info@golfencasa.net";

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
      {/* WHATSAPP FLOTANTE */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        onClick={() => pushDataLayer("click_whatsapp", "floating_button")}
        className="fixed bottom-5 right-5 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-2xl transition hover:scale-110 hover:bg-green-400"
      >
        <FaWhatsapp />
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Golf en Casa" className="h-16 w-auto" />

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
              className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-400"
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
              Descubre si tu espacio es apto para montar un simulador de golf
              profesional
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Te ayudamos a validar medidas, elegir tecnología y evitar errores
              antes de comprar monitor, pantalla, proyector, estructura,
              alfombra o software. Diseñamos e instalamos simuladores de golf a
              medida para viviendas, academias y negocios indoor en toda España.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-zinc-200 sm:grid-cols-3">
              <MiniStat label="Desde" value="3.000 €" highlighted />
              <MiniStat label="Servicio" value="Toda España" />
              <MiniStat label="Proyecto" value="Llave en mano" />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#formulario"
                onClick={() =>
                  pushDataLayer("click_solicitar_presupuesto", "hero")
                }
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 shadow-2xl shadow-emerald-400/20 transition hover:bg-emerald-300"
              >
                Descubrir si mi espacio es apto
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
              Revisión inicial gratuita. Puedes enviar medidas, fotos del
              espacio o dudas sobre componentes.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              <Benefit text="Viabilidad del espacio" />
              <Benefit text="Diseño a medida" />
              <Benefit text="Presupuesto claro" />
            </div>
          </div>

          <div className="mt-12 flex justify-center lg:mt-0 lg:w-[42%]">
            <div className="w-full max-w-[420px] rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <video
                className="w-full rounded-[1.5rem] border border-white/10 shadow-2xl"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/video_promocion3.mp4" type="video/mp4" />
                Tu navegador no soporta vídeo HTML5.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN PERSONAL */}
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-emerald-400/10 blur-2xl" />
            <img
              src="/francisco-golf-en-casa.png"
              alt="Francisco Menacho, fundador de Golf en Casa"
              className="relative w-full max-w-md rounded-[2rem] border border-white/10 object-cover shadow-2xl"
            />
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Te acompaño en el proyecto
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Soy Francisco Menacho, fundador de Golf en Casa
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Ayudo a golfistas, academias y negocios a diseñar simuladores de
              golf realistas, seguros y adaptados al espacio disponible. Mi
              objetivo es que no compres componentes incompatibles ni descubras
              demasiado tarde que la sala, el proyector o el monitor no encajan.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <TrustPoint
                icon={<UserCheck />}
                title="Asesoramiento personalizado"
                text="Reviso tu caso antes de recomendar material o presupuesto."
              />
              <TrustPoint
                icon={<ShieldCheck />}
                title="Menos errores de compra"
                text="Validamos espacio, tecnología y configuración antes de invertir."
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
                Solicitar estudio de viabilidad
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

      {/* INSTALACIONES REALES */}
      <section className="bg-white px-4 py-20 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
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
              after="/despues_1.JPEG"
              description="Transformación de un espacio doméstico en una zona de práctica indoor, optimizando pantalla de impacto, zona de golpeo, proyector, seguridad e iluminación."
            />

            <ProjectCard
              title="Simulador de golf personalizado"
              location="Jerez, Cádiz"
              before="/antes_2.JPEG"
              after="/despues_2.JPEG"
              description="Diseño adaptado a las medidas disponibles, el presupuesto, el tipo de jugador y el uso previsto del simulador."
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDataLayer("click_whatsapp", "projects_section")}
              className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition hover:bg-green-400"
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
              Solicitar estudio gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CARRUSEL TECNOLOGÍAS */}
      <section className="overflow-hidden border-b border-white/10 bg-zinc-950 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
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

        <p className="mx-auto mt-6 max-w-4xl px-6 text-center text-xs leading-5 text-zinc-500">
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
      <section className="mx-auto max-w-7xl px-6 py-20">
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
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Nos adaptamos al tipo de proyecto
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Service
              icon={<Home />}
              title="Viviendas particulares"
              text="Habitaciones, garajes, sótanos o espacios polivalentes para entrenar y jugar desde casa."
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
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Presupuesto orientativo
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              ¿Cuánto cuesta montar un simulador de golf?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              El precio depende del monitor de lanzamiento, pantalla de impacto,
              proyector, estructura, alfombra, software, iluminación y montaje.
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
              title="Básico"
              price="Desde 3.000 €"
              text="Para empezar a practicar en casa con una configuración sencilla y escalable."
            />
            <PriceCard
              featured
              title="Intermedio"
              price="6.000 € - 10.000 €"
              text="La opción más habitual para viviendas, academias y uso frecuente."
            />
            <PriceCard
              title="Premium"
              price="10.000 €+"
              text="Instalaciones llave en mano con mayor acabado, precisión y experiencia."
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
            Calcular mi presupuesto
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
      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Opiniones
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Clientes que ya han recibido asesoramiento para su simulador
            </h2>

            <p className="mt-5 text-zinc-300">
              La clave no es solo comprar componentes, sino diseñar una solución
              que encaje con el espacio, el presupuesto y el uso real.
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
      <section className="border-y border-white/10 bg-green-500/10 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[0.25em] text-green-400">
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
                  "Uso previsto: casa, academia o negocio",
                  "Presupuesto aproximado si ya lo tienes claro",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200 sm:text-base"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
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
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-6 py-4 text-base font-bold text-white transition hover:bg-green-400"
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
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Estudio gratuito de viabilidad
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Te digo si tu sala es apta antes de que inviertas en material
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Rellena estos datos básicos y revisaremos si el espacio tiene
              sentido para montar un simulador, qué rango de presupuesto puede
              encajar y qué componentes deberías valorar.
            </p>

            <div className="mt-8 space-y-4 text-zinc-300">
              <Benefit text="Revisión de medidas y viabilidad" />
              <Benefit text="Recomendación según presupuesto" />
              <Benefit text="Respuesta personalizada" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nombre"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Teléfono"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ciudad / provincia"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              />

              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
              >
                <option value="">Tipo de instalación</option>
                <option>Vivienda particular</option>
                <option>Academia / club</option>
                <option>Negocio indoor</option>
                <option>Otro</option>
              </select>

              <select
                name="budget"
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

              <input
                name="dimensions"
                value={form.dimensions}
                onChange={handleChange}
                required
                placeholder="Medidas aproximadas: ancho x fondo x alto"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500 md:col-span-2"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Cuéntanos qué quieres montar, dudas principales o material que ya tienes"
                className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500 md:col-span-2"
              />
            </div>

            <label className="mt-4 flex items-start gap-3 text-sm text-zinc-300">
              <input type="checkbox" required className="mt-1" />
              <span>
                He leído y acepto la{" "}
                <a
                  href="/politica-privacidad"
                  className="text-emerald-400 underline"
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
              Recibir estudio gratuito de viabilidad
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
            title="Analizamos tu espacio"
            text="Medidas, altura, ubicación de bola, pantalla y zona de swing."
          />
          <Step
            number="02"
            title="Diseñamos la solución"
            text="Distribución, estructura, pantalla, proyector, monitor y software."
          />
          <Step
            number="03"
            title="Presupuesto claro"
            text="Te damos opciones según objetivo, espacio y presupuesto disponible."
          />
          <Step
            number="04"
            title="Instalación y ajuste"
            text="Montaje, configuración y pruebas para dejarlo listo para jugar."
          />
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Dudas habituales antes de montar un simulador de golf
            </h2>
            <p className="mt-5 text-zinc-300">
              Resolvemos las preguntas más importantes sobre espacio,
              presupuesto, monitores de lanzamiento, proyectores e instalación.
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
              ¿Quieres saber si tu espacio es válido?
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-800">
              Cuéntanos qué medidas tienes y qué tipo de simulador quieres
              montar. Te orientaremos con la mejor solución.
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
              Consultar por WhatsApp
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
            src="/logo.png"
            alt="Golf en Casa"
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

          <p className="mt-8 text-sm text-zinc-500">
            © 2026 Golf en Casa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
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
      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
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
        className="max-h-16 max-w-[180px] object-contain opacity-100 brightness-110 contrast-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]"
        loading="lazy"
      />
    </div>
  );
}

function TestimonialCard({ name, role, text }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6 shadow-2xl">
      <div className="flex items-center gap-1 text-emerald-400">
        {[1, 2, 3, 4, 5].map((item) => (
          <Star key={item} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <Quote className="mt-6 h-8 w-8 text-emerald-400/60" />

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
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
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
        alt={`${alt} antes`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${safePosition}%` }}
      >
        <img
          src={after}
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