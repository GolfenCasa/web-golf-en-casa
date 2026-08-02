import React, { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Euro,
  Expand,
  Layers3,
  HelpCircle,
  Home,
  MapPin,
  MessageCircle,
  Monitor,
  Quote,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  Trophy,
  UserCheck,
  Wrench,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const WHATSAPP_URL =
  "https://wa.me/34678107234?text=Hola,%20he%20visto%20vuestro%20anuncio%20en%20Google%20y%20quiero%20saber%20si%20mi%20espacio%20es%20apto%20para%20montar%20un%20simulador%20de%20golf.%20Mis%20medidas%20aproximadas%20son:%20";
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
    text: "Queríamos montar un simulador en casa, pero no sabíamos por dónde empezar. Francisco diseñó una solución adaptada al espacio, presupuesto y uso que queríamos darle, y dejó todo listo para jugar.",
  },
  {
    name: "Cliente en Jerez",
    role: "Instalación llave en mano",
    text: "Se encargó del diseño, la elección de componentes, la instalación y la configuración final. Tener una única persona responsable de todo el proyecto nos dio mucha tranquilidad.",
  },
  {
    name: "Consulta online",
    role: "Estudio técnico inicial",
    text: "En una llamada aclaramos medidas, presupuesto y qué tecnología tenía sentido. Salí con una idea clara de la viabilidad y de los siguientes pasos, sin comprar material a ciegas.",
  },
];

const faqItems = [
  {
    question: "¿Qué espacio mínimo necesito?",
    answer:
      "Depende de tu altura, swing, lateralidad y palo más largo. Como referencia, revisamos ancho, fondo, altura, distancia a pantalla y zona de seguridad antes de recomendar cualquier equipo.",
  },
  {
    question: "¿Cuánto cuesta un simulador de golf en casa?",
    answer:
      "Como orientación, una solución Esencial puede partir de unos 3.000 €, una instalación Home suele situarse entre 6.000 € y 10.000 €, y un proyecto Premium puede superar los 10.000 €. El presupuesto final depende del espacio, la tecnología y los acabados.",
  },
  {
    question: "¿Hay que hacer obra?",
    answer:
      "No siempre. Muchas instalaciones se resuelven con estructura, pantalla, protección, césped técnico y equipamiento. Si el proyecto necesita electricidad, climatización, aislamiento o carpintería, lo contemplamos desde el diseño.",
  },
  {
    question: "¿Instaláis en toda España?",
    answer:
      "Sí. Realizamos estudios, diseño, selección de componentes e instalaciones a medida en toda España, tanto para viviendas como academias, clubes y negocios indoor.",
  },
  {
    question: "¿Puedo instalarlo en un jardín?",
    answer:
      "Sí. Con Golf Studio estudiamos una construcción o caseta independiente diseñada alrededor del simulador, incluyendo dimensiones, aislamiento, climatización, electricidad y condicionantes urbanísticos.",
  },
  {
    question: "¿Qué recibo en el estudio gratuito?",
    answer:
      "Una primera valoración de viabilidad, condicionantes del espacio, rango de inversión y tecnología que puede encajar. Si el proyecto tiene sentido, avanzamos a una propuesta personalizada.",
  },
];

export default function LandingSimuladoresGolfAds2() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    dimensions: "",
    budget: "",
    message: "",
    privacyConsent: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const pushDataLayer = (event, location, extra = {}) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      location,
      landing_version: "google_ads_search_v3",
      traffic_source: "google_search_ads",
      ...extra,
    });
  };

  const moveToStepTwo = () => {
    if (!form.projectType || !form.dimensions || !form.budget) return;
    setStep(2);
    pushDataLayer("form_step_completed", "hero_form", { form_step: 1 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.privacyConsent) return;

    pushDataLayer("generate_lead", "hero_form", {
      form_name: "landing_google_search_v3_estudio_viabilidad",
      lead_type: "formulario_estudio_viabilidad",
      project_type: form.projectType,
      budget_range: form.budget,
    });

    pushDataLayer("form_submit", "hero_form", {
      form_name: "landing_google_search_v3_estudio_viabilidad",
    });

    setSubmitted(true);

    const body = encodeURIComponent(`Nombre: ${form.name}
Email: ${form.email}
Teléfono: ${form.phone}
Ciudad / provincia: ${form.city}
Tipo de instalación: ${form.projectType}
Presupuesto aproximado: ${form.budget}
Medidas del espacio: ${form.dimensions}

Mensaje:
${form.message || "Sin información adicional"}

Origen: Landing Search Google Ads 3.0`);

    window.setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=Solicitud de estudio gratuito - Landing Search Google Ads&body=${body}`;
    }, 700);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Helmet>
        <title>Instalación de simuladores de golf en España | Estudio gratuito</title>
        <meta
          name="description"
          content="Diseño e instalación de simuladores de golf a medida en toda España. Comprueba gratuitamente la viabilidad de tu vivienda, garaje, jardín, academia o negocio."
        />
        <meta name="robots" content="noindex,follow" />
        <link
          rel="canonical"
          href="https://www.golfencasa.net/instalacion-simuladores-golf"
        />
      </Helmet>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Enviar medidas por WhatsApp"
        onClick={() => pushDataLayer("click_whatsapp", "floating_button")}
        className="fixed bottom-5 right-5 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-3xl text-white shadow-2xl transition hover:scale-110 hover:bg-green-600"
      >
        <FaWhatsapp />
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <a href="/" className="flex items-center gap-3" aria-label="Golf en Casa">
            <img
              src="/logo-mail4.png"
              alt="Golf en Casa"
              width="56"
              height="56"
              className="h-14 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold">Golf en Casa</p>
              <p className="text-xs text-zinc-400">Diseño · Instalación · Soporte</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-zinc-300 md:flex">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Estudio inicial gratuito
            </span>
            <a
              href="#estudio"
              onClick={() => pushDataLayer("click_solicitar_presupuesto", "header")}
              className="rounded-xl bg-emerald-400 px-4 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300"
            >
              Solicitar estudio
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(34,197,94,0.10),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Simuladores de golf a medida en toda España
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Diseño e instalación de simuladores de golf a medida en toda España
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Estudiamos tus medidas y diseñamos una solución llave en mano con pantalla, proyector, monitor de lanzamiento, software, protección e instalación adaptados a tu espacio y presupuesto.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <HeroProof icon={<Ruler />} text="Revisión de medidas" />
              <HeroProof icon={<ShieldCheck />} text="Diseño independiente" />
              <HeroProof icon={<Wrench />} text="Instalación completa" />
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                Primera orientación personalizada en menos de 48 h laborables
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <CompactBenefit text="Si el espacio es viable" />
                <CompactBenefit text="Qué condicionantes debes resolver" />
                <CompactBenefit text="Rango de inversión razonable" />
                <CompactBenefit text="Tecnología que puede encajar" />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <a
                href="#estudio"
                onClick={() => pushDataLayer("click_solicitar_presupuesto", "hero")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-zinc-950 shadow-2xl shadow-emerald-400/20 transition hover:bg-emerald-300"
              >
                Solicitar estudio gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_whatsapp", "hero")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold transition hover:bg-white/10"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Enviar fotos por WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              Sin compromiso · Instalación en toda España · Trato directo con el responsable del proyecto
            </p>
          </div>

          <div id="estudio" className="scroll-mt-24">
            <LeadForm
              step={step}
              setStep={setStep}
              form={form}
              handleChange={handleChange}
              moveToStepTwo={moveToStepTwo}
              handleSubmit={handleSubmit}
              submitted={submitted}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-emerald-400 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <TrustNumber value="Toda España" label="Cobertura de servicio" />
          <TrustNumber value="Llave en mano" label="Diseño e instalación" />
          <TrustNumber value="A medida" label="Sin kits obligatorios" />
          <TrustNumber value="1 responsable" label="De principio a fin" />
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-700">
              Prueba real antes que promesas
            </p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Espacios reales transformados en simuladores listos para jugar
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Cada proyecto parte de unas medidas, un presupuesto y un uso distintos. Desliza para comparar el antes y el después.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            <ProjectCard
              title="Simulador residencial a medida"
              location="Écija, Sevilla"
              before="/antes_1.jpg"
              after="/despues_1.webp"
              description="Diseño de pantalla, zona de golpeo, proyección, protección e iluminación adaptado a una estancia doméstica."
            />
            <ProjectCard
              title="Instalación llave en mano"
              location="Jerez, Cádiz"
              before="/antes_2.webp"
              after="/despues_2.webp"
              description="Solución personalizada según espacio disponible, tipo de jugador, presupuesto y uso frecuente del simulador."
            />
          </div>

          <div className="mt-10 text-center">
            <a
              href="#estudio"
              onClick={() => pushDataLayer("click_solicitar_presupuesto", "projects")}
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-7 py-4 font-black text-white transition hover:bg-zinc-800"
            >
              Solicitar estudio gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
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
                href="#estudio"
                onClick={() => pushDataLayer("click_golf_studio", "golf_studio_section")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-zinc-950 transition hover:bg-emerald-300"
              >
                Solicitar estudio de mi parcela
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={GOLF_STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_whatsapp", "golf_studio_section")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
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

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-300">
              Cómo trabajamos
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Un proceso claro para reducir riesgos y evitar compras incompatibles
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ProcessCard
              number="01"
              icon={<Ruler />}
              title="Estudio de viabilidad"
              text="Revisamos medidas, fotos, lateralidad, swing y objetivo del proyecto."
            />
            <ProcessCard
              number="02"
              icon={<Monitor />}
              title="Diseño personalizado"
              text="Definimos distribución, pantalla, proyector, monitor, software y acabados."
            />
            <ProcessCard
              number="03"
              icon={<Wrench />}
              title="Instalación y ajuste"
              text="Montamos, configuramos y probamos todos los elementos del sistema."
            />
            <ProcessCard
              number="04"
              icon={<UserCheck />}
              title="Formación y soporte"
              text="Te enseñamos a utilizarlo y seguimos disponibles después de la entrega."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-300">
              Una solución para cada espacio
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Vivienda, garaje, jardín, academia o negocio indoor
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              No todos los simuladores se diseñan igual. La ubicación, la altura, si jugarán diestros y zurdos, el nivel de precisión y la experiencia deseada cambian por completo la solución.
            </p>
            <div className="mt-7 space-y-3">
              <UseCase icon={<Home />} title="Viviendas y garajes" />
              <UseCase icon={<TreePine />} title="Golf Studio independiente en jardín" />
              <UseCase icon={<Building2 />} title="Academias, clubes y negocios" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <ValueCard
              icon={<Expand />}
              title="Espacio optimizado"
              text="Aprovechamos cada centímetro manteniendo seguridad y comodidad de swing."
            />
            <ValueCard
              icon={<Trophy />}
              title="Experiencia realista"
              text="Equilibramos precisión, imagen, sonido, software y sensación de juego."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Menos riesgo"
              text="Evitamos incompatibilidades, errores de tiro, zonas inseguras y gastos innecesarios."
            />
            <ValueCard
              icon={<MessageCircle />}
              title="Un único responsable"
              text="Hablas directamente con quien diseña, coordina y supervisa el proyecto."
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-zinc-900 py-10">
        <p className="px-6 text-center text-sm font-bold uppercase tracking-[0.24em] text-zinc-400">
          Tecnología seleccionada según cada proyecto
        </p>
        <div className="mt-7 flex overflow-hidden">
          <div className="animate-[marquee_32s_linear_infinite] flex min-w-full shrink-0 items-center gap-5 px-4">
            {[...technologies, ...technologies].map((item, index) => (
              <TechnologyBadge key={`${item.name}-${index}`} {...item} />
            ))}
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-4xl px-6 text-center text-xs leading-5 text-zinc-500">
          Marcas mostradas como tecnologías compatibles o habituales. Golf en Casa selecciona soluciones de forma independiente y no representa oficialmente a estas marcas salvo indicación expresa.
        </p>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      <section className="bg-white px-4 py-16 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-bold uppercase tracking-[0.22em] text-emerald-700">
                Presupuesto orientativo
              </p>
              <h2 className="mt-3 text-4xl font-black">
                ¿Cuánto cuesta montar un simulador de golf?
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600">
                El precio depende principalmente de las medidas, el monitor de lanzamiento, el sistema de proyección, los acabados y el alcance de la instalación.
              </p>
              <div className="mt-6 rounded-3xl bg-emerald-50 p-6 text-sm leading-6 text-emerald-950">
                El estudio gratuito sirve para evitar presupuestos irreales: primero comprobamos la viabilidad y después definimos el nivel de solución que tiene sentido.
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <PriceCard
                title="Esencial"
                price="Desde 3.000 €"
                text="Para comenzar con una configuración funcional y escalable."
              />
              <PriceCard
                featured
                title="Home"
                price="6.000–10.000 €"
                text="La opción más habitual para viviendas y uso frecuente."
              />
              <PriceCard
                title="Premium"
                price="10.000 €+"
                text="Mayor precisión, integración, acabados y experiencia llave en mano."
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#estudio"
              onClick={() => pushDataLayer("click_solicitar_presupuesto", "pricing")}
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-7 py-4 font-black text-white transition hover:bg-zinc-800"
            >
              Solicitar orientación de presupuesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <span className="text-sm text-zinc-500">Sin compromiso y antes de comprar material</span>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-300">Opiniones</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Clientes que necesitaban claridad antes de invertir
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-emerald-400/10 blur-3xl" />
            <img
              src="/francisco-golf-en-casa.webp"
              alt="Francisco Menacho, fundador de Golf en Casa"
              width="768"
              height="1024"
              loading="lazy"
              decoding="async"
              className="relative max-h-[590px] w-full rounded-[2.25rem] object-cover shadow-2xl"
            />
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-300">
              Trato directo
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Soy Francisco Menacho y seré tu interlocutor durante todo el proyecto
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Soy ingeniero, creador de contenido especializado en simuladores de golf y responsable de Golf en Casa. Mi trabajo no consiste en venderte una marca concreta, sino en diseñar una solución coherente que funcione de verdad en tu espacio.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <PersonalPoint text="Diseño independiente" />
              <PersonalPoint text="Responsable único" />
              <PersonalPoint text="Instalación y pruebas" />
              <PersonalPoint text="Soporte postventa" />
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#estudio"
                onClick={() => pushDataLayer("click_solicitar_presupuesto", "personal")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-zinc-950 transition hover:bg-emerald-300"
              >
                Solicitar estudio gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_calendly", "personal")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold transition hover:bg-white/10"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Reservar llamada
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.22em] text-emerald-300">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Resolvemos las dudas antes de que inviertas
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {faqItems.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-400 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              Descubre si tu espacio es viable antes de comprar ningún componente
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-zinc-800">
              Envíanos tus medidas y te daremos una primera orientación sobre viabilidad, presupuesto y siguientes pasos.
            </p>
          </div>
          <a
            href="#estudio"
            onClick={() => pushDataLayer("click_solicitar_presupuesto", "final_cta")}
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-7 py-4 font-black text-white transition hover:bg-zinc-800"
          >
            Solicitar estudio gratuito
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-zinc-950 px-5 py-10 text-center">
        <img
          src="/logo-mail4.png"
          alt="Golf en Casa"
          width="88"
          height="88"
          loading="lazy"
          decoding="async"
          className="mx-auto h-20 w-auto"
        />
        <p className="mt-5 font-bold">Golf en Casa</p>
        <p className="mt-2 text-sm text-zinc-400">
          Diseño e instalación de simuladores de golf a medida en España
        </p>
        <div className="mt-6 flex justify-center gap-6 text-2xl text-zinc-400">
          <a href="https://youtube.com/@Golf_en_Casa" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-red-500"><FaYoutube /></a>
          <a href="https://instagram.com/golf.en.casa/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
          <a href="https://www.facebook.com/GolfenCasaSimuladores/" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-blue-500"><FaFacebook /></a>
          <a href="https://www.tiktok.com/@golf_en_casa" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-white"><FaTiktok /></a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
          <a href="/politica-privacidad" className="hover:text-white">Privacidad</a>
          <a href="/aviso-legal" className="hover:text-white">Aviso legal</a>
          <a href="/politica-cookies" className="hover:text-white">Cookies</a>
        </div>
      </footer>
    </main>
  );
}

function LeadForm({
  step,
  setStep,
  form,
  handleChange,
  moveToStepTwo,
  handleSubmit,
  submitted,
}) {
  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-emerald-400/30 bg-zinc-900 p-7 shadow-2xl">
        <CircleCheckBig className="h-14 w-14 text-emerald-300" />
        <h2 className="mt-5 text-3xl font-black">Solicitud preparada</h2>
        <p className="mt-4 leading-7 text-zinc-300">
          Se abrirá tu aplicación de correo con la información del estudio. Solo tendrás que pulsar enviar.
        </p>
        <p className="mt-4 text-sm text-zinc-400">
          También puedes enviarnos fotos del espacio por WhatsApp para agilizar la valoración.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "click_whatsapp",
                location: "form_success",
                landing_version: "google_ads_search_v3",
                traffic_source: "google_search_ads",
              });
            }
          }}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-700 px-6 py-4 font-black transition hover:bg-green-600"
        >
          <FaWhatsapp className="mr-2 text-xl" />
          Enviar fotos por WhatsApp
        </a>
      </div>
    );
  }

  const stepOneComplete = form.projectType && form.dimensions && form.budget;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-zinc-900/95 p-6 shadow-2xl shadow-black/40 sm:p-7"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            Estudio gratuito de viabilidad
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Cuéntanos cómo es tu espacio
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300">
          Paso {step} de 2
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-300"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <FieldLabel htmlFor="projectType" text="¿Dónde quieres instalarlo?" />
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
          >
            <option value="">Selecciona una opción</option>
            <option>Vivienda particular</option>
            <option>Garaje / sótano</option>
            <option>Golf Studio en jardín</option>
            <option>Academia / club</option>
            <option>Negocio indoor</option>
            <option>Otro</option>
          </select>

          <FieldLabel htmlFor="dimensions" text="Medidas aproximadas" />
          <input
            id="dimensions"
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            required
            placeholder="Ej.: 3,5 m ancho × 5 m fondo × 2,8 m alto"
            className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
          />

          <FieldLabel htmlFor="budget" text="Rango de inversión previsto" />
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500"
          >
            <option value="">Selecciona un rango</option>
            <option>Menos de 5.000 €</option>
            <option>5.000 € - 10.000 €</option>
            <option>10.000 € - 20.000 €</option>
            <option>Más de 20.000 €</option>
            <option>Aún no lo sé</option>
          </select>

          <button
            type="button"
            onClick={moveToStepTwo}
            disabled={!stepOneComplete}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="name" text="Nombre" />
              <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} required placeholder="Tu nombre" className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <FieldLabel htmlFor="phone" text="Teléfono" />
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} required placeholder="Teléfono" className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="email" text="Email" />
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required placeholder="Email" className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <FieldLabel htmlFor="city" text="Ciudad / provincia" />
              <input id="city" name="city" type="text" autoComplete="address-level2" value={form.city} onChange={handleChange} placeholder="Ciudad / provincia" className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="message" text="Información adicional (opcional)" />
            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="3" placeholder="Cuéntanos cualquier duda o material que ya tengas" className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-zinc-950 outline-none focus:border-emerald-500" />
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
            <input name="privacyConsent" type="checkbox" checked={form.privacyConsent} onChange={handleChange} required className="mt-1" />
            <span>
              He leído y acepto la{" "}
              <a href="/politica-privacidad" className="text-emerald-300 underline">
                Política de Privacidad
              </a>.
            </span>
          </label>

          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-4 font-bold transition hover:bg-white/5"
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              Atrás
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-black text-zinc-950 transition hover:bg-emerald-300"
            >
              Solicitar estudio gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-zinc-400">
        <Clock3 className="h-4 w-4 text-emerald-300" />
        Respuesta personalizada · Sin compromiso · Tus datos no se comparten
      </div>
    </form>
  );
}

function FieldLabel({ htmlFor, text }) {
  return <label htmlFor={htmlFor} className="block text-sm font-bold text-zinc-200">{text}</label>;
}

function HeroProof({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-zinc-200">
      {React.cloneElement(icon, { className: "h-5 w-5 shrink-0 text-emerald-300" })}
      {text}
    </div>
  );
}

function CompactBenefit({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
      {text}
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
      <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

function TrustNumber({ value, label }) {
  return (
    <div className="text-center sm:text-left">
      <strong className="block text-xl font-black">{value}</strong>
      <span className="mt-1 block text-sm text-zinc-800">{label}</span>
    </div>
  );
}

function ProcessCard({ number, icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <span className="text-sm font-black text-emerald-300">{number}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function UseCase({ icon, title }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <span className="font-bold">{title}</span>
    </div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function TechnologyBadge({ name, logo }) {
  return (
    <div className="flex h-20 w-48 shrink-0 items-center justify-center px-5 py-3">
      <img src={logo} alt={name} width="160" height="56" loading="lazy" decoding="async" className="max-h-14 max-w-[160px] object-contain brightness-110 contrast-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]" />
    </div>
  );
}

function PriceCard({ title, price, text, featured = false }) {
  return (
    <article className={`rounded-3xl border p-6 ${featured ? "border-emerald-500 bg-emerald-400 text-zinc-950 shadow-2xl" : "border-zinc-200 bg-zinc-50"}`}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${featured ? "bg-zinc-950 text-emerald-300" : "bg-emerald-100 text-emerald-800"}`}>
        <Euro className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mt-3 text-2xl font-black">{price}</p>
      <p className={`mt-4 text-sm leading-6 ${featured ? "text-zinc-800" : "text-zinc-600"}`}>{text}</p>
    </article>
  );
}

function PersonalPoint({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-bold">
      <CircleCheckBig className="h-5 w-5 shrink-0 text-emerald-300" />
      {text}
    </div>
  );
}

function TestimonialCard({ name, role, text }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6 shadow-2xl">
      <div className="flex gap-1 text-emerald-300">
        {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
      </div>
      <Quote className="mt-6 h-8 w-8 text-emerald-300/60" />
      <p className="mt-4 leading-7 text-zinc-300">“{text}”</p>
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="font-black">{name}</p>
        <p className="mt-1 text-sm text-zinc-400">{role}</p>
      </div>
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
          <h3 className="text-lg font-bold">{question}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{answer}</p>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ title, location, before, after, description }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 shadow-xl">
      <BeforeAfterSlider before={before} after={after} alt={title} />
      <div className="p-6">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          <MapPin className="h-4 w-4" />
          {location}
        </p>
        <h3 className="mt-3 text-2xl font-black">{title}</h3>
        <p className="mt-4 leading-7 text-zinc-600">{description}</p>
      </div>
    </article>
  );
}

function BeforeAfterSlider({ before, after, alt }) {
  const [position, setPosition] = useState(50);
  const safePosition = Math.min(Math.max(Number(position), 1), 99);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
      <img src={before} width="1600" height="1200" loading="lazy" decoding="async" alt={`${alt} antes`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${safePosition}%` }}>
        <img src={after} width="1600" height="1200" loading="lazy" decoding="async" alt={`${alt} después`} className="h-full w-full object-cover" style={{ width: `${100 / (safePosition / 100)}%`, maxWidth: "none" }} />
      </div>
      <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">Después</div>
      <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">Antes</div>
      <div className="absolute bottom-0 top-0 z-10 w-1 bg-white shadow-2xl" style={{ left: `${safePosition}%` }} />
      <input type="range" min="1" max="99" value={safePosition} onChange={(event) => setPosition(event.target.value)} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" aria-label="Comparador antes y después" />
      <div className="pointer-events-none absolute top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/70 text-sm font-black text-white shadow-xl" style={{ left: `${safePosition}%` }}>↔</div>
    </div>
  );
}
