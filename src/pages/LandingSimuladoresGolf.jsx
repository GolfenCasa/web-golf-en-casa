import React from "react";
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
} from "lucide-react";


const WHATSAPP_URL = "https://wa.me/34652401121?text=Hola,%20quiero%20información%20sobre%20un%20simulador%20de%20golf";
const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";

export default function LandingSimuladoresGolf() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-14 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              Simuladores de golf a medida en España
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Diseñamos e instalamos tu simulador de golf en casa, academia o negocio
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Te ayudamos a elegir el monitor de lanzamiento, pantalla, proyector,
              estructura, alfombra y software adecuados para evitar errores caros
              y conseguir una instalación profesional.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#presupuesto"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-300"
              >
                Solicitar presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              <Benefit text="Estudio personalizado" />
              <Benefit text="Diseño a medida" />
              <Benefit text="Instalación completa" />
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-[42%]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-6">
                <div className="flex h-full flex-col justify-end rounded-2xl border border-emerald-400/20 bg-black/30 p-6">
                  <p className="text-sm text-emerald-300">Golf en Casa</p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Tu sala de golf indoor, bien diseñada desde el principio
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <Card icon={<Ruler />} title="¿Tengo altura suficiente?" text="Analizamos medidas, swing, distancia a pantalla y seguridad." />
          <Card icon={<Monitor />} title="¿Qué proyector necesito?" text="Calculamos distancia, formato, resolución y tamaño de imagen." />
          <Card icon={<Trophy />} title="¿Qué monitor compro?" text="Te ayudamos a elegir entre Garmin, Uneekor, Foresight, ProTee y más." />
          <Card icon={<Wrench />} title="¿Quién lo instala?" text="Podemos asesorarte, diseñarlo o encargarnos del proyecto completo." />
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Nos adaptamos al tipo de proyecto
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Service icon={<Home />} title="Viviendas particulares" text="Habitaciones, garajes, sótanos o espacios polivalentes para entrenar y jugar desde casa." />
            <Service icon={<Building2 />} title="Academias y clubes" text="Soluciones para clases, fitting, entrenamiento técnico y experiencia indoor." />
            <Service icon={<ShieldCheck />} title="Negocios indoor" text="Diseño para centros de ocio, locales comerciales o espacios premium de golf." />
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Cómo trabajamos
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Step number="01" title="Analizamos tu espacio" text="Medidas, altura, ubicación de bola, pantalla y zona de swing." />
          <Step number="02" title="Diseñamos la solución" text="Distribución, estructura, pantalla, proyector, monitor y software." />
          <Step number="03" title="Presupuesto claro" text="Te damos opciones según objetivo, espacio y presupuesto disponible." />
          <Step number="04" title="Instalación y ajuste" text="Montaje, configuración y pruebas para dejarlo listo para jugar." />
        </div>
      </section>

      {/* CTA */}
      <section id="presupuesto" className="border-t border-white/10 bg-emerald-400 text-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Solicita tu presupuesto o asesoramiento
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-800">
              Cuéntanos qué espacio tienes y qué tipo de simulador quieres montar.
              Te orientaremos con la mejor solución.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-6 py-4 font-semibold text-white hover:bg-zinc-800"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Reservar llamada
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-950 px-6 py-4 font-semibold hover:bg-emerald-300"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
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