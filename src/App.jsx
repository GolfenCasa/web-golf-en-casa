import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Ruler, Monitor, Wrench, Video, Home, Building2, Warehouse, Phone, Mail, MapPin, Star, ShieldCheck, ClipboardCheck, PlayCircle } from 'lucide-react';
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok
} from "react-icons/fa";
import ReactCompareImage from "react-compare-image";



const calendlyUrl = 'https://calendly.com/simuladores-golfencasa/60min';
const youtubeCourseUrl = 'https://youtube.com/playlist?list=PLfYDa4ADpRpYQ8iuZZrYMbw1-5TRONady';
const formularioUrl ='https://docs.google.com/forms/d/e/1FAIpQLSecIKbWPdNzt3hQmUO4sNHw_eLWAfGC3XXv87MGgzmESydqaw/viewform?pli=1'
const email = 'info@golfencasa.net';

const services = [
  {
    icon: Ruler,
    title: 'Diseño del espacio',
    text: 'Analizamos medidas, altura, distancia de golpeo, relación de pantalla, proyector, sombras y seguridad antes de comprar nada.',
  },
  {
    icon: Monitor,
    title: 'Selección de tecnología',
    text: 'Te ayudo a elegir monitor de lanzamiento, PC, software, pantalla de impacto, proyector, turf y accesorios según tu presupuesto.',
  },
  {
    icon: Wrench,
    title: 'Instalación completa',
    text: 'Planificación, montaje, configuración y puesta en marcha para que el simulador quede listo para jugar, entrenar o usar con clientes.',
  },
  {
    icon: Video,
    title: 'Consultoría online',
    text: 'Sesiones por videollamada para revisar tu proyecto, evitar errores caros y definir una lista de compra clara y optimizada.',
  },
];

const spaces = [
  { icon: Home, title: 'Simuladores en casa', text: 'Garajes, sótanos, habitaciones dedicadas o zonas multiuso para jugar y entrenar todo el año.' },
  { icon: Building2, title: 'Negocios y academias', text: 'Soluciones para clubes, academias, hoteles, locales indoor golf y espacios de entrenamiento.' },
  { icon: Warehouse, title: 'Proyectos DIY', text: 'Te acompaño si quieres montarlo tú mismo con una guía técnica y una lista de materiales bien definida.' },
];

const process = [
  'Revisión de objetivos, presupuesto y medidas reales del espacio.',
  'Propuesta técnica con componentes recomendados y alternativas.',
  'Diseño de distribución: pantalla, alfombra de impacto, proyector, PC, cableado e iluminación.',
  'Compra, instalación, configuración y pruebas de juego.',
];

const packages = [
  {
    name: 'Consultoría Inicial',
    price: 'Desde 49 €',
    description: 'Ideal si estás empezando y no sabes qué comprar.',
    features: ['Videollamada 60 min', 'Revisión de medidas', 'Recomendaciones clave', 'Siguientes pasos claros'],
    cta: 'Reservar Consultoría',
    url: 'https://calendly.com/simuladores-golfencasa/60min',
  },
  {
    name: 'Diseño Pro',
    price: 'A medida',
    description: 'Para definir el proyecto completo antes de invertir.',
    features: ['Lista de materiales', 'Distribución recomendada', 'Opciones por presupuesto', 'Prevención de errores habituales'],
    cta: 'Reservar Consultoría Pro',
     featured: true,
    url: 'https://calendly.com/simuladores-golfencasa/new-meeting',
  },
  {
    name: 'Instalación Completa',
    price: 'Presupuesto personalizado',
    description: 'Para quien quiere el simulador listo para usar.',
    features: ['Asesoramiento integral', 'Montaje y configuración', 'Pruebas de funcionamiento', 'Puesta en marcha'],
    cta: 'Pedir Presupuesto',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSecIKbWPdNzt3hQmUO4sNHw_eLWAfGC3XXv87MGgzmESydqaw/viewform?pli=1',

  },
];

export default function GolfSimulatorLanding() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', space: '', budget: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailtoHref = `mailto:${email}?subject=Solicitud de presupuesto simulador de golf&body=${encodeURIComponent(
    `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\nTipo de espacio: ${form.space}\nPresupuesto estimado: ${form.budget}\n\nMensaje:\n${form.message}`
  )}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <img
 src="/logo.png"
    alt="Golf en Casa"
  className="h-20 w-auto"
/>
            <div>
              <p className="text-sm font-semibold tracking-wide">Golf en Casa</p>
              <p className="text-xs text-zinc-400">Simuladores & Consultoría</p>
            </div>
          </a>
         <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
  <a href="#servicios" className="transition hover:text-white">
    Servicios
  </a>

  <a href="#proceso" className="transition hover:text-white">
    Proceso
  </a>

  <a href="#paquetes" className="transition hover:text-white">
    Paquetes
  </a>

  <a href="#contacto" className="transition hover:text-white">
    Contacto
  </a>
</nav>

<div className="flex items-center gap-3 sm:gap-4">

  <div className="hidden items-center gap-3 text-lg text-zinc-400 md:flex">
    <a
      href="https://youtube.com/@Golf_en_Casa"
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:text-red-500"
    >
      <FaYoutube />
    </a>

    <a
      href="https://instagram.com/golf.en.casa/"
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:text-pink-500"
    >
      <FaInstagram />
    </a>

    <a
      href="https://www.facebook.com/GolfenCasaSimuladores/"
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:text-blue-500"
    >
      <FaFacebook />
    </a>

    <a
      href="https://www.tiktok.com/@golf_en_casa"
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:text-white"
    >
      <FaTiktok />
    </a>
  </div>

  <a
    href={calendlyUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400 sm:px-5 sm:py-2.5 sm:text-sm"
  >
    <span className="hidden sm:inline">
      Reserva Consultoría
    </span>

    <span className="sm:hidden">
      Reserva
    </span>
  </a>
</div>
        </div>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20 lg:px-8 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <Star className="h-4 w-4" /> Diseño, instalación y consultoría para simuladores de golf
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Construye tu simulador de golf sin errores caros.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Te ayudo a diseñar, comprar e instalar un simulador de golf en casa o negocio: desde la elección del launch monitor hasta la pantalla, proyector, PC, software, seguridad y configuración final.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-7 py-4 text-base font-bold text-zinc-950 transition hover:bg-emerald-400">Empezar mi proyecto <ArrowRight className="ml-2 h-5 w-5" /></a>
                <a href={youtubeCourseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base text-white transition hover:bg-white/10"><PlayCircle className="mr-2 h-5 w-5" /> Ver curso gratuito</a>
              </div>
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                {['Casa', 'Academias', 'Negocios indoor'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                    <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-16 flex w-full justify-center md:justify-end">
  <video
      className="w-full max-w-[280px] rounded-[2rem] border border-white/10 shadow-2xl sm:max-w-[340px] md:max-w-[360px] lg:max-w-[420px]"
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
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative z-10">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-zinc-800 via-zinc-900 to-emerald-950 p-6">
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-400/20 bg-black/30 p-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Proyecto a medida</p>
                      <h2 className="mt-4 text-3xl font-black">Tu espacio convertido en un campo de golf indoor</h2>
                    </div>
                    <div className="grid gap-3">
                      {['Análisis de medidas y seguridad', 'Componentes optimizados por presupuesto', 'Instalación lista para jugar'].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm text-zinc-200">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">Servicios</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Todo lo que necesitas para montar bien tu simulador.</h2>
            <p className="mt-5 text-zinc-300">Desde una simple revisión de viabilidad hasta el diseño completo y la instalación final.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-xl">
            
                 <Icon className="mx-5 mt-3 mb-4 h-10 w-10 text-emerald-400" />

      <h3 className="mx-5 mb-3 text-xl font-bold">
        {title}
      </h3>

      <p className="mx-5 mt-5 mb-4 leading-8 text-zinc-300">
        {text}
      </p>
                </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20 text-zinc-950">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-6 md:grid-cols-3">
              {spaces.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7">
                  <Icon className="h-8 w-8 text-emerald-600" />
                  <h3 className="mt-5 text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proceso" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">Proceso</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Un método claro antes de invertir.</h2>
            <p className="mt-5 leading-8 text-zinc-300">La mayoría de errores aparecen por comprar componentes sin validar el espacio: altura insuficiente, proyector mal elegido, pantalla poco segura, PC limitado o monitor incompatible con la sala.</p>
          </div>
          <div className="grid gap-4">
            {process.map((step, i) => (
              <div key={step} className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 font-black text-zinc-950">{i + 1}</div>
                <p className="pt-2 text-lg text-zinc-200">{step}</p>
              </div>
            ))}
          </div>
<div className="mt-12 flex justify-center">
<div className="w-full max-w-4xl mx-auto overflow-hidden rounded-[2rem] shadow-2xl">
 
    <ReactCompareImage
      leftImage="/antes.jpg"
      rightImage="/despues.jpg"
    />
  </div>
</div>

        </section>

        <section id="paquetes" className="bg-zinc-900 py-20">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-3xl">
              <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">Paquetes</p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Elige el nivel de ayuda que necesitas.</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`rounded-[2rem] border p-7 ${pkg.featured ? 'border-emerald-400 bg-emerald-500 text-zinc-950 shadow-2xl shadow-emerald-500/20' : 'border-white/10 bg-white/[0.04]'}`}>
                  <h3 className="text-2xl font-black">{pkg.name}</h3>
                  <p className={`mt-3 ${pkg.featured ? 'text-zinc-800' : 'text-zinc-400'}`}>{pkg.description}</p>
                  <p className="mt-6 text-3xl font-black">{pkg.price}</p>
                  <ul className="mt-7 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={pkg.url} target="_blank" rel="noopener noreferrer" className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 font-semibold transition ${pkg.featured ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'}`}>{pkg.cta}</a>
                </div>
                
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Compra con criterio</h3>
              <p className="mt-3 text-zinc-400">Evita gastar de más en componentes que no encajan con tu sala o tus objetivos.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <ClipboardCheck className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Plan técnico claro</h3>
              <p className="mt-3 text-zinc-400">Medidas, materiales, distribución, configuración y prioridades por fases.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <Star className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Experiencia real en simulador</h3>
              <p className="mt-3 text-zinc-400">Contenido, pruebas y conocimiento práctico de tecnología indoor golf.</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-white py-20 text-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">Contacto</p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl">Cuéntame tu proyecto.</h2>
              <p className="mt-5 leading-8 text-zinc-600">Rellena los datos básicos y prepara medidas aproximadas de ancho, fondo y alto. Cuanto más claro sea el espacio, mejor podremos definir la solución.</p>
              <div className="mt-8 space-y-4 text-zinc-700">
                <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-emerald-600" /> {email}</p>
                <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-emerald-600" /> +34 652 40 11 21</p>
                <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-emerald-600" /> Servicio en España y online para otros países</p>
              </div>
            </div>
            <form className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-xl" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" />
                <select name="space" value={form.space} onChange={handleChange} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500">
                  <option value="">Tipo de espacio</option>
                  <option>Garaje</option>
                  <option>Habitación en casa</option>
                  <option>Negocio / academia</option>
                  <option>Otro</option>
                </select>
                <select name="budget" value={form.budget} onChange={handleChange} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500 md:col-span-2">
                  <option value="">Presupuesto estimado</option>
                  <option>Menos de 5.000 €</option>
                  <option>5.000 € - 10.000 €</option>
                  <option>10.000 € - 20.000 €</option>
                  <option>Más de 20.000 €</option>
                </select>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Medidas del espacio, objetivo del simulador y dudas principales" rows="5" className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-emerald-500 md:col-span-2" />
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={mailtoHref} className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Solicitar Presupuesto</a>
                <a href={calendlyUrl} className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-5 py-3 font-semibold transition hover:bg-zinc-100">Reservar Consultoría</a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-zinc-400 md:flex-row">
          <p>© 2026 Golf en Casa · Simuladores de golf y consultoría</p>
          <div className="flex gap-5">
            <a href={youtubeCourseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Curso gratuito</a>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Consultoría</a>
            <a href={`mailto:${email}`} className="hover:text-white">Contacto</a>
          </div>
        </div>
          <div className="mx-auto max-w-7xl px-5 text-center">

    <img
      src="/logo.png"
      alt="Golf en Casa"
      className="mx-auto h-24 w-auto"
    />

    <h3 className="mt-6 text-2xl font-bold">
      Golf en Casa
    </h3>

    <p className="mt-3 text-zinc-400">
      Simuladores de Golf · Consultoría · Instalación · Formación
    </p>

    <div className="mt-8 flex justify-center gap-8 text-4xl">

      <a
        href="https://youtube.com/@Golf_en_Casa"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-red-500"
      >
        <FaYoutube />
      </a>

      <a
        href="https://instagram.com/golf.en.casa/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-pink-500"
      >
        <FaInstagram />
      </a>

      <a
        href="https://www.facebook.com/GolfenCasaSimuladores/?ref=PROFILE_EDIT_xav_ig_profile_page_web#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-blue-500"
      >
        <FaFacebook />
      </a>

      <a
        href="https://www.tiktok.com/@golf_en_casa?_t=ZN-8vwiEoVTBF0&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-white"
      >
        <FaTiktok />
      </a>

    </div>

    <p className="mt-8 text-sm text-zinc-500">
      © 2026 Golf en Casa. Todos los derechos reservados.
    </p>

  </div>
      </footer>
    </div>
  );
}
