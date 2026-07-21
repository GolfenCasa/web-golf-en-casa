import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  Laptop,
  MessageCircle,
  Minus,
  MonitorCog,
  RefreshCcw,
  ShieldCheck,
  Target,
  Wrench,
  XCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const WHATSAPP_URL =
  "https://wa.me/34678107234?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20los%20planes%20Golf%20en%20Casa%20CARE%20y%20CARE%2B%20para%20mi%20simulador.";

const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";

const careFeatures = [
  "Soporte técnico remoto",
  "Actualizaciones de software",
  "Gestión, renovación e instalación de licencias de software",
  "Asesoramiento personalizado",
  "Acceso al Simulator Golf Tour (SGT)*",
];

const carePlusFeatures = [
  ...careFeatures,
  "Revisión presencial anual con informe técnico",
  "Calibración profesional y revisión de equipos",
  "Sustitución anual del insert de la alfombra de golpeo",
  "Soporte preferente después de la revisión",
];

const comparisonRows = [
  {
    label: "Soporte técnico remoto",
    care: true,
    carePlus: true,
  },
  {
    label: "Actualizaciones de software",
    care: true,
    carePlus: true,
  },
  {
    label: "Gestión, renovación e instalación de licencias",
    care: true,
    carePlus: true,
  },
  {
    label: "Asesoramiento personalizado",
    care: true,
    carePlus: true,
  },
  {
    label: "Acceso al Simulator Golf Tour (SGT)*",
    care: true,
    carePlus: true,
  },
  {
    label: "Revisión presencial anual con informe técnico",
    care: false,
    carePlus: true,
  },
  {
    label: "Calibración profesional y revisión de equipos",
    care: false,
    carePlus: true,
  },
  {
    label: "Sustitución anual del insert de golpeo",
    care: false,
    carePlus: true,
  },
];

const faqs = [
  {
    question: "¿CARE está incluido con la instalación?",
    answer:
      "No necesariamente. CARE y CARE+ son servicios opcionales con facturación anual. El alcance se concreta según el equipamiento, el software, las licencias y las necesidades de la instalación.",
  },
  {
    question: "¿Puedo contratarlo si Golf en Casa no instaló mi simulador?",
    answer:
      "Sí, siempre que la instalación sea compatible y supere una revisión inicial. Podemos estudiar simuladores instalados por Golf en Casa o por otros proveedores.",
  },
  {
    question: "¿CARE incluye visitas presenciales?",
    answer:
      "El plan CARE está orientado principalmente al soporte remoto. Las actuaciones presenciales pueden contratarse aparte o quedar cubiertas mediante CARE+, según las condiciones de la propuesta.",
  },
  {
    question: "¿CARE+ incluye una revisión presencial anual?",
    answer:
      "Sí. CARE+ incorpora una revisión presencial anual, calibración, comprobación de los equipos, sustitución anual del insert y entrega de un informe técnico.",
  },
  {
    question: "¿Sustituye a la garantía de los fabricantes?",
    answer:
      "No. CARE complementa la garantía y facilita el diagnóstico y la gestión técnica, pero las reparaciones, piezas y sustituciones cubiertas por garantía dependen de cada fabricante o proveedor.",
  },
  {
    question: "¿El precio es siempre el mismo?",
    answer:
      "Las tarifas anuales se muestran desde y sin IVA. La equivalencia mensual es aproximada, está redondeada e incluye el IVA, aunque la facturación se realiza anualmente. El importe final depende de la configuración del simulador, el software instalado, las licencias incluidas, la ubicación y el alcance técnico necesario.",
  },
];

export default function GolfEnCasaCARE() {
  const pushDataLayer = (event, location, plan) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      location,
      ...(plan ? { plan } : {}),
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Helmet>
        <title>
          CARE y CARE+ | Mantenimiento de simuladores de golf
        </title>
        <meta
          name="description"
          content="Planes CARE y CARE+ para soporte remoto, actualizaciones, licencias, mantenimiento preventivo, calibración y revisión anual de simuladores de golf."
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://www.golfencasa.net/care/#service",
                name: "Golf en Casa CARE",
                serviceType:
                  "Soporte técnico y mantenimiento de simuladores de golf",
                provider: {
                  "@type": "Organization",
                  name: "Golf en Casa",
                  url: "https://www.golfencasa.net",
                },
                areaServed: {
                  "@type": "Country",
                  name: "España",
                },
                url: "https://www.golfencasa.net/care",
                description:
                  "Planes anuales CARE y CARE+ para soporte técnico remoto, actualizaciones, gestión de licencias, mantenimiento preventivo y revisión presencial.",
                offers: [
                  {
                    "@type": "Offer",
                    name: "Golf en Casa CARE",
                    price: "390",
                    priceCurrency: "EUR",
                    description:
                      "Precio desde, más IVA, con facturación anual.",
                  },
                  {
                    "@type": "Offer",
                    name: "Golf en Casa CARE+",
                    price: "790",
                    priceCurrency: "EUR",
                    description:
                      "Precio desde, más IVA, con facturación anual.",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.golfencasa.net/care/#faq",
                mainEntity: faqs.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* WHATSAPP FLOTANTE */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar CARE y CARE+ por WhatsApp"
        onClick={() => pushDataLayer("click_whatsapp", "care_floating_button")}
        className="fixed bottom-5 right-5 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-2xl transition hover:scale-110 hover:bg-green-400"
      >
        <FaWhatsapp />
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="Golf en Casa" className="h-16 w-auto" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide">
                Golf en Casa
              </p>
              <p className="truncate text-xs text-zinc-400">
                CARE · Soporte y mantenimiento
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
            <a href="#servicios" className="transition hover:text-white">
              Servicios
            </a>
            <a href="#planes" className="transition hover:text-white">
              Planes
            </a>
            <a href="#funcionamiento" className="transition hover:text-white">
              Cómo funciona
            </a>
            <a href="#faq" className="transition hover:text-white">
              Preguntas
            </a>
          </nav>

          <a
            href="#planes"
            onClick={() => pushDataLayer("click_care_plans", "care_header")}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            Ver planes
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.24),transparent_38%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              Soporte técnico integral para simuladores de golf
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Disfruta de tu simulador. Nosotros nos ocupamos del resto.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              CARE y CARE+ reúnen en un único servicio el soporte técnico,
              las actualizaciones, la gestión de licencias y el mantenimiento
              necesario para que tu simulador siga funcionando al máximo nivel.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#planes"
                onClick={() => pushDataLayer("click_care_plans", "care_hero")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 shadow-2xl shadow-emerald-400/20 transition hover:bg-emerald-300"
              >
                Comparar CARE y CARE+
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDataLayer("click_whatsapp", "care_hero")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold transition hover:bg-white/10"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Solicitar revisión inicial
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
              <TrustBadge text="Desde 390 € + IVA/año" />
              <TrustBadge text="Facturación anual" />
              <TrustBadge text="Compatible con instalaciones de terceros*" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
              Tu simulador siempre listo para jugar
            </p>

            <div className="mt-6 grid gap-4">
              <HeroProblem
                icon={<RefreshCcw />}
                title="Actualizaciones controladas"
                text="Software, controladores y equipos correctamente configurados."
              />
              <HeroProblem
                icon={<Laptop />}
                title="Soporte remoto especializado"
                text="La mayoría de incidencias pueden revisarse sin desplazamientos."
              />
              <HeroProblem
                icon={<FileText />}
                title="Gestión de licencias"
                text="Renovación e instalación de software según el plan contratado."
              />
              <HeroProblem
                icon={<Target />}
                title="Mantenimiento preventivo"
                text="Con CARE+ detectamos desgastes antes de que se conviertan en problemas."
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20">
        <div className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Un único punto de contacto
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Hardware, software y licencias coordinados en un mismo servicio
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Un simulador no es solo un monitor de lanzamiento y un proyector.
            Windows, controladores, software, licencias, red y periféricos
            evolucionan constantemente. CARE reduce la complejidad y te ayuda a
            mantener todos los elementos trabajando correctamente entre sí.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            icon={<MessageCircle />}
            title="Soporte remoto"
            text="Asistencia técnica, diagnóstico inicial y resolución de incidencias compatibles con intervención remota."
          />
          <ServiceCard
            icon={<RefreshCcw />}
            title="Actualizaciones"
            text="Ayuda con software, controladores y configuración para reducir incompatibilidades."
          />
          <ServiceCard
            icon={<FileText />}
            title="Licencias"
            text="Gestión, renovación e instalación de las licencias incluidas en tu propuesta CARE."
          />
          <ServiceCard
            icon={<Wrench />}
            title="Optimización"
            text="Revisión de configuración y recomendaciones para mantener el rendimiento del sistema."
          />
        </div>

        <div className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-xl font-bold">
                Acceso al Simulator Golf Tour (SGT)
              </h3>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-emerald-50">
                El folleto comercial contempla el acceso incluido para competir
                en torneos, ligas y rankings internacionales, mientras la
                suscripción CARE permanezca activa y sea compatible con la
                configuración del simulador.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/30 bg-zinc-950 px-5 py-3 text-sm font-bold text-emerald-300">
              Incluido según compatibilidad*
            </span>
          </div>
        </div>
      </section>

      {/* CARE+ */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-amber-300">
              Golf en Casa CARE+
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Programa anual de mantenimiento preventivo
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              CARE+ incorpora todo lo incluido en CARE y añade una intervención
              presencial anual para revisar, calibrar y documentar el estado
              general de la instalación.
            </p>

            <div className="mt-8 space-y-4">
              <ListItem text="Revisión presencial completa de la instalación" />
              <ListItem text="Calibración profesional del monitor y del sistema" />
              <ListItem text="Comprobación de PC, proyector, pantalla, audio, cámaras y cableado" />
              <ListItem text="Sustitución anual del insert de la alfombra de golpeo" />
              <ListItem text="Informe técnico con estado, recomendaciones y próximos mantenimientos" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/25 bg-gradient-to-br from-amber-300/15 to-emerald-400/10 p-7 shadow-2xl">
            <ShieldCheck className="h-12 w-12 text-amber-300" />
            <h3 className="mt-5 text-2xl font-bold">
              Prevención hoy, tranquilidad siempre
            </h3>
            <p className="mt-4 leading-7 text-zinc-300">
              La revisión anual permite detectar desgastes y desviaciones antes
              de que afecten a la precisión, el rendimiento o la disponibilidad
              del simulador.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <CarePlusPoint
                icon={<Target />}
                title="Calibración"
                text="Comprobación de precisión y ajuste del sistema."
              />
              <CarePlusPoint
                icon={<MonitorCog />}
                title="Equipos"
                text="Verificación de los elementos técnicos principales."
              />
              <CarePlusPoint
                icon={<Wrench />}
                title="Insert"
                text="Sustitución anual del insert de la zona de golpeo."
              />
              <CarePlusPoint
                icon={<FileText />}
                title="Informe"
                text="Estado general y recomendaciones de mantenimiento."
              />
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Tarifas
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Elige el nivel de cobertura que necesita tu simulador
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Ambos planes se facturan anualmente. El precio anual se muestra sin IVA
            y la equivalencia mensual se presenta redondeada con el IVA incluido para
            facilitar la comparación. El importe final se confirma tras revisar la
            configuración, el software, las licencias, la ubicación y el alcance de
            la instalación.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PricingCard
            name="CARE"
            eyebrow="Soporte técnico integral"
            description="El plan esencial para mantener tu simulador actualizado y siempre a punto."
            price="390 €"
            tax="+ IVA / año"
            monthlyEquivalent="49 €/mes"
            features={careFeatures}
            buttonText="Solicitar propuesta CARE"
            onClick={() =>
              pushDataLayer("click_care_plan", "pricing_card", "CARE")
            }
            href={WHATSAPP_URL}
          />

          <PricingCard
            featured
            name="CARE+"
            eyebrow="Programa anual de mantenimiento"
            description="La cobertura completa para un rendimiento óptimo y sin preocupaciones."
            price="790 €"
            tax="+ IVA / año"
            monthlyEquivalent="79 €/mes"
            features={carePlusFeatures}
            buttonText="Solicitar propuesta CARE+"
            onClick={() =>
              pushDataLayer("click_care_plan", "pricing_card", "CARE+")
            }
            href={WHATSAPP_URL}
          />
        </div>

        {/* COMPARATIVA */}
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[1fr_92px_92px] border-b border-white/10 bg-zinc-900 px-4 py-5 sm:grid-cols-[1fr_150px_150px] sm:px-6">
            <p className="font-bold">Comparativa de servicios</p>
            <p className="text-center font-bold text-emerald-300">CARE</p>
            <p className="text-center font-bold text-amber-300">CARE+</p>
          </div>

          <div className="grid grid-cols-[1fr_92px_92px] items-center border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:grid-cols-[1fr_150px_150px] sm:px-6">
            <p className="pr-3 text-sm font-semibold text-zinc-300 sm:text-base">
              Precio anual desde
            </p>
            <p className="text-center text-sm font-bold text-emerald-300 sm:text-base">
              390 € + IVA
            </p>
            <p className="text-center text-sm font-bold text-amber-300 sm:text-base">
              790 € + IVA
            </p>
          </div>

          <div className="grid grid-cols-[1fr_92px_92px] items-center border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:grid-cols-[1fr_150px_150px] sm:px-6">
            <div className="pr-3">
              <p className="text-sm font-semibold text-zinc-300 sm:text-base">
                Equivalencia mensual
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                IVA incluido · aproximada
              </p>
            </div>
            <p className="text-center text-sm font-bold text-emerald-300 sm:text-base">
              49 €/mes
            </p>
            <p className="text-center text-sm font-bold text-amber-300 sm:text-base">
              79 €/mes
            </p>
          </div>

          {comparisonRows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_92px_92px] items-center px-4 py-4 sm:grid-cols-[1fr_150px_150px] sm:px-6 ${
                index !== comparisonRows.length - 1
                  ? "border-b border-white/10"
                  : ""
              }`}
            >
              <p className="pr-3 text-sm leading-6 text-zinc-300 sm:text-base">
                {row.label}
              </p>
              <PlanStatus included={row.care} />
              <PlanStatus included={row.carePlus} featured />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-zinc-400">
          <p>
            *El acceso a SGT se mantiene mientras la suscripción CARE esté
            activa y sea compatible con el simulador. Las equivalencias mensuales
            incluyen IVA, están redondeadas y se muestran únicamente como referencia;
            la facturación se realiza por la anualidad completa. Las licencias,
            desplazamientos, piezas, reparaciones y servicios de terceros se regirán
            por la propuesta y condiciones particulares. CARE+ puede estar sujeto a
            disponibilidad y cobertura geográfica.
          </p>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="border-y border-white/10 bg-emerald-400 text-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-[0.25em] text-emerald-950/70">
                Para cualquier simulador compatible
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Un servicio adaptado al tipo de instalación y a su intensidad de uso
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-800">
                No importa necesariamente quién realizó la instalación. Antes
                del alta revisamos el estado, el equipamiento y la compatibilidad
                para recomendar el plan adecuado.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <AudienceCard
                title="Clientes Golf en Casa"
                text="Continuidad de servicio después de la instalación y puesta en marcha."
              />
              <AudienceCard
                title="Instalaciones de terceros"
                text="Revisión inicial para confirmar compatibilidad y alcance del soporte."
              />
              <AudienceCard
                title="Empresas y academias"
                text="Especialmente útil cuando el simulador soporta un uso frecuente o intensivo."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONAMIENTO */}
      <section
        id="funcionamiento"
        className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20"
      >
        <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Cómo funciona
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Un proceso claro desde la revisión inicial hasta la renovación
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          <StepCard
            number="01"
            title="Contacto"
            text="Nos cuentas qué instalación tienes y qué necesitas."
          />
          <StepCard
            number="02"
            title="Revisión inicial"
            text="Evaluamos el estado, compatibilidad y posibles mejoras."
          />
          <StepCard
            number="03"
            title="Alta"
            text="Definimos el alcance y activamos el plan contratado."
          />
          <StepCard
            number="04"
            title="Soporte continuo"
            text="Te acompañamos durante la vigencia anual del servicio."
          />
          <StepCard
            number="05"
            title="Renovación"
            text="Revisamos necesidades y renovamos el plan cuando corresponda."
          />
        </div>
      </section>

      {/* SOLICITUD */}
      <section
        id="solicitud-care"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Revisión inicial sin compromiso
            </p>
            <h2 className="mt-3 text-4xl font-black">
              ¿Hablamos de tu simulador?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Revisamos la instalación, el hardware, el software, las
              actualizaciones, las licencias y las posibles mejoras para
              prepararte una propuesta CARE personalizada.
            </p>

            <div className="mt-8 space-y-4">
              <ListItem text="Marca y modelo del monitor de lanzamiento" />
              <ListItem text="Software de simulación y licencias actuales" />
              <ListItem text="Características del ordenador y del proyector" />
              <ListItem text="Tipo de uso: particular, academia o negocio" />
              <ListItem text="Ubicación e incidencias o necesidades actuales" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-7 shadow-2xl">
            <ShieldCheck className="h-12 w-12 text-emerald-300" />

            <h3 className="mt-5 text-2xl font-bold">
              Te ayudamos a elegir entre CARE y CARE+
            </h3>

            <p className="mt-4 leading-7 text-zinc-300">
              Tras la revisión inicial te indicaremos la compatibilidad, el
              alcance recomendado y el precio final aplicable a tu instalación.
            </p>

            <div className="mt-7 grid gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDataLayer("click_whatsapp", "care_request_section")
                }
                className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition hover:bg-green-400"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Solicitar revisión por WhatsApp
              </a>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDataLayer("click_calendly", "care_request_section")
                }
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold transition hover:bg-white/10"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Reservar una llamada
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-b border-white/10 bg-zinc-950 scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Dudas habituales sobre CARE y CARE+
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {faqs.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-emerald-400 text-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              Tú juegas. Nosotros nos ocupamos del resto.
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-800">
              Solicita una revisión inicial y descubre qué plan se adapta mejor
              a tu simulador.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => pushDataLayer("click_whatsapp", "care_final_cta")}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-zinc-950 px-7 py-4 font-bold text-white transition hover:bg-zinc-800"
          >
            <FaWhatsapp className="mr-2 text-xl" />
            Solicitar información
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 px-6 py-12 text-center">
        <img
          src="/logo.png"
          alt="Golf en Casa"
          className="mx-auto h-24 w-auto"
        />
        <p className="mt-5 text-xl font-bold">Golf en Casa CARE</p>
        <p className="mt-2 text-zinc-400">
          Soporte remoto · Actualizaciones · Licencias · Mantenimiento
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <a href="/" className="hover:text-white">
            Inicio
          </a>
          <a
            href="/instalacion-simuladores-golf"
            className="hover:text-white"
          >
            Instalación de simuladores
          </a>
          <a href="/aviso-legal" className="hover:text-white">
            Aviso legal
          </a>
          <a href="/politica-privacidad" className="hover:text-white">
            Privacidad
          </a>
          <a href="/politica-cookies" className="hover:text-white">
            Cookies
          </a>
        </div>
      </footer>
    </main>
  );
}

function TrustBadge({ text }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
      <span>{text}</span>
    </div>
  );
}

function HeroProblem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-300">{text}</p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, text }) {
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

function CarePlusPoint({ icon, title, text }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function PricingCard({
  name,
  eyebrow,
  description,
  price,
  tax,
  monthlyEquivalent,
  features,
  buttonText,
  href,
  onClick,
  featured = false,
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border p-7 shadow-2xl ${
        featured
          ? "border-amber-300/40 bg-gradient-to-b from-amber-300/15 to-white/[0.04]"
          : "border-emerald-400/25 bg-white/[0.04]"
      }`}
    >
      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-wide text-zinc-950">
          Cobertura completa
        </span>
      )}

      <p
        className={`text-sm font-bold uppercase tracking-[0.22em] ${
          featured ? "text-amber-300" : "text-emerald-300"
        }`}
      >
        {eyebrow}
      </p>
      <h3 className="mt-3 text-4xl font-black">{name}</h3>
      <p className="mt-4 min-h-[56px] leading-7 text-zinc-300">
        {description}
      </p>

      <div className="mt-7 border-y border-white/10 py-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Desde
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <strong className="text-5xl font-black">{price}</strong>
          <span className="font-semibold text-zinc-300">{tax}</span>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Equivale aproximadamente a
          </p>
          <p
            className={`mt-1 text-3xl font-black ${
              featured ? "text-amber-300" : "text-emerald-300"
            }`}
          >
            {monthlyEquivalent}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            IVA incluido · Importe redondeado · Facturación anual
          </p>
        </div>

        <p className="mt-3 text-sm text-zinc-500">
          El cargo se realiza por la anualidad completa.
        </p>
      </div>

      <div className="mt-7 space-y-4">
        {features.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                featured ? "text-amber-300" : "text-emerald-400"
              }`}
            />
            <span className="text-sm leading-6 text-zinc-300">{item}</span>
          </div>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 font-bold transition ${
          featured
            ? "bg-amber-300 text-zinc-950 hover:bg-amber-200"
            : "bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
        }`}
      >
        {buttonText}
        <ArrowRight className="ml-2 h-5 w-5" />
      </a>
    </article>
  );
}

function PlanStatus({ included, featured = false }) {
  return (
    <div className="flex justify-center">
      {included ? (
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            featured
              ? "bg-amber-300/15 text-amber-300"
              : "bg-emerald-400/15 text-emerald-400"
          }`}
        >
          <Check className="h-5 w-5" />
        </span>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-600">
          <Minus className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}

function ListItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
      <span className="leading-7 text-zinc-300">{text}</span>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-black text-emerald-300">{number}</p>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </article>
  );
}

function AudienceCard({ title, text }) {
  return (
    <article className="rounded-3xl border border-zinc-950/10 bg-white/55 p-6 shadow-sm">
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-800">{text}</p>
    </article>
  );
}

function FAQItem({ question, answer }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{question}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{answer}</p>
        </div>
      </div>
    </article>
  );
}
