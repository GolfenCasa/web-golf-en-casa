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
} from "lucide-react";

import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/34652401121?text=Hola,%20quiero%20información%20sobre%20un%20simulador%20de%20golf";

const CALENDLY_URL = "https://calendly.com/simuladores-golfencasa/30min";
const EMAIL = "info@golfencasa.net";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submit",
      form_name: "landing_presupuesto_simulador",
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

    window.location.href = `mailto:${EMAIL}?subject=Solicitud de presupuesto simulador de golf&body=${body}`;
  };500);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* WHATSAPP FLOTANTE */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
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
              >
                <FaYoutube />
              </a>

              <a
                href="https://instagram.com/golf.en.casa/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-pink-500"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/GolfenCasaSimuladores/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-blue-500"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.tiktok.com/@golf_en_casa"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                <FaTiktok />
              </a>
            </div>

            <a
              href="#formulario"
              className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              Solicitar estudio gratuito
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
              Diseñamos e instalamos tu simulador de golf en casa, academia o
              negocio
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Te ayudamos a elegir el monitor de lanzamiento, pantalla,
              proyector, estructura, alfombra y software adecuados para evitar
              errores caros y conseguir una instalación profesional.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#formulario"
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

      {/* PROYECTOS */}
      <section className="bg-white px-4 py-20 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Proyectos realizados
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Ejemplos reales de simuladores de golf
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Proyectos de simuladores en viviendas y espacios personalizados.
              Usa el deslizador para ver la transformación antes y después.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ProjectCard
              title="Simulador en vivienda particular"
              location="Proyecto residencial"
              before="/antes_1.jpg"
              after="/despues_1.JPEG"
              description="Transformación de un espacio doméstico en una zona de práctica indoor, optimizando pantalla de impacto, zona de golpeo, proyector, seguridad e iluminación."
            />

            <ProjectCard
              title="Proyecto personalizado a medida"
              location="Diseño adaptado al espacio"
              before="/antes_2.JPEG"
              after="/despues_2.JPEG"
              description="Diseño de una solución personalizada según las medidas disponibles, el presupuesto, el tipo de jugador y el uso previsto del simulador."
            />
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
              Solicita tu estudio
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Cuéntanos tu proyecto de simulador
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Rellena estos datos básicos y te orientaremos sobre la mejor
              solución para tu espacio, presupuesto y objetivo.
            </p>

            <div className="mt-8 space-y-4 text-zinc-300">
              <Benefit text="Respuesta personalizada" />
              <Benefit text="Revisión de medidas y viabilidad" />
              <Benefit text="Opciones según presupuesto" />
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
              Enviar solicitud de presupuesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
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

      {/* CTA */}
      <section
        id="presupuesto"
        className="border-t border-white/10 bg-emerald-400 text-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Solicita tu presupuesto o asesoramiento
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-800">
              Cuéntanos qué espacio tienes y qué tipo de simulador quieres
              montar. Te orientaremos con la mejor solución.
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
              Reservar llamada gratuita
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

function ProjectCard({ title, location, before, after, description }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 shadow-xl">
      <BeforeAfterSlider before={before} after={after} alt={title} />

      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
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

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
      <img
        src={before}
        alt={`${alt} antes`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={after}
          alt={`${alt} después`}
          className="h-full w-full object-cover"
          style={{
            width: `${100 / (position / 100)}%`,
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
        style={{ left: `${position}%` }}
      />

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Comparador antes y después"
      />

      <div
        className="pointer-events-none absolute top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/70 text-sm font-black text-white shadow-xl"
        style={{ left: `${position}%` }}
      >
        ↔
      </div>
    </div>
  );
}