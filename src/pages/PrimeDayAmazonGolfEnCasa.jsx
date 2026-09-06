import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  PercentCircle,
  CheckCircle2,
  ExternalLink,
  Flag,
  Home,
  Monitor,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
  Video,
  Zap,
} from 'lucide-react';

const AMAZON_STORE_URL = 'https://amzn.eu/d/0ihONIw7';

const categories = [
  {
    icon: Monitor,
    title: 'Tecnología para simulador',
    description:
      'Monitores de lanzamiento, proyectores, soportes, cables, adaptadores y accesorios para montar tu zona indoor.',
  },
  {
    icon: Home,
    title: 'Sala, protección y montaje',
    description:
      'Redes, iluminación, soluciones de protección, organización del espacio y material útil para instalaciones caseras.',
  },
  {
    icon: Trophy,
    title: 'Entrenamiento de golf',
    description:
      'Accesorios para practicar swing, approach, putting y mejorar tu juego sin depender del campo.',
  },
  {
    icon: Video,
    title: 'Creación de contenido',
    description:
      'Equipo que uso o recomiendo para grabar vídeos, directos, reviews y contenido de golf indoor.',
  },
];

const reasons = [
  'Selección enfocada a simuladores de golf en casa.',
  'Productos útiles para montar, proteger y mejorar tu zona de práctica.',
  'Acceso directo a la tienda de Amazon con ofertas Prime Day.',
  'Recomendaciones pensadas desde la experiencia real de Golf en Casa.',
];

const steps = [
  {
    number: '01',
    title: 'Entra en la tienda',
    text: 'Accede a la selección de productos recomendados para simuladores de golf, entrenamiento y grabación.',
  },
  {
    number: '02',
    title: 'Compara durante Prime Day',
    text: 'Revisa qué productos tienen oferta activa entre el 23 y el 26 de junio y comprueba disponibilidad.',
  },
  {
    number: '03',
    title: 'Compra con tu cuenta Amazon',
    text: 'Finaliza la compra directamente en Amazon, con sus condiciones, envíos, devoluciones y garantías.',
  },
];

function trackAmazonClick(position) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_amazon_afiliado', {
      event_category: 'affiliate',
      event_label: position,
      link_url: AMAZON_STORE_URL,
    });
  }

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'click_amazon_afiliado',
      click_position: position,
      link_url: AMAZON_STORE_URL,
    });
  }
}

function AmazonButton({ children, position = 'cta', variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950';
  const styles =
    variant === 'secondary'
      ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
      : 'bg-emerald-400 text-zinc-950 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20';

  return (
    <a
      href={AMAZON_STORE_URL}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={() => trackAmazonClick(position)}
      className={`${base} ${styles}`}
    >
      {children}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

export default function PrimeDayAmazonGolfEnCasa() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Helmet>
        <title>Selección Amazon para golf indoor | Golf en Casa</title>
        <meta
          name="description"
          content="Selección histórica de accesorios para golf indoor publicada por Golf en Casa durante Prime Day."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.golfencasa.net/prime-day-amazon" />
      </Helmet>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Especial Amazon Prime Day · 23 al 26 de junio
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ofertas para montar o mejorar tu simulador de golf en casa
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              He reunido en mi tienda de Amazon una selección de productos útiles para crear tu zona de golf indoor:
              tecnología, protección, accesorios de entrenamiento, montaje e ideas para grabar contenido.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AmazonButton position="hero_primary">Ver tienda Prime Day</AmazonButton>
              <a
                href="#seleccion"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver qué puedes encontrar
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 max-w-2xl text-xs leading-6 text-zinc-500">
              Como afiliado de Amazon, puedo recibir una comisión por compras que cumplan los requisitos, sin coste extra para ti.
              Los precios, descuentos y disponibilidad se consultan siempre directamente en Amazon.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-emerald-400/20 bg-zinc-900/80 p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Prime Day</p>
                    <h2 className="mt-2 text-2xl font-bold">Selección Golf en Casa</h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-400 p-3 text-zinc-950">
                    <PercentCircle className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {reasons.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <p className="text-sm leading-6 text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                  <strong className="font-semibold">Consejo:</strong> guarda los productos que te interesen y revísalos durante Prime Day.
                  Algunas ofertas pueden aparecer, agotarse o cambiar durante el evento.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="seleccion" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Qué encontrarás</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Productos recomendados para tu setup de golf indoor
          </h2>
          <p className="mt-4 text-zinc-400">
            La idea no es comprar por comprar, sino aprovechar Prime Day para encontrar material que realmente ayude a montar,
            proteger o mejorar tu simulador.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.06]"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-emerald-400/10 p-3 text-emerald-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Cómo usar la página</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Compra con criterio durante Prime Day</h2>
            <p className="mt-5 text-zinc-400">
              Te recomiendo revisar el precio final, las valoraciones, el plazo de entrega y si el producto encaja realmente con tu sala,
              tu monitor de lanzamiento o tu forma de entrenar.
            </p>
            <div className="mt-8">
              <AmazonButton position="middle_cta">Ir a la tienda recomendada</AmazonButton>
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-5 rounded-3xl border border-white/10 bg-zinc-950/60 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-black text-zinc-950">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <Timer className="h-7 w-7 text-emerald-300" />
            <h3 className="mt-4 text-lg font-bold">Evento limitado</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Prime Day va del 23 al 26 de junio. Algunas ofertas pueden durar menos o agotarse antes.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <ShieldCheck className="h-7 w-7 text-emerald-300" />
            <h3 className="mt-4 text-lg font-bold">Compra en Amazon</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              La compra, el pago, el envío, la garantía y las devoluciones se gestionan directamente desde Amazon.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <Zap className="h-7 w-7 text-emerald-300" />
            <h3 className="mt-4 text-lg font-bold">Sin coste extra</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Usar mis enlaces de afiliado no aumenta el precio para ti y ayuda a apoyar el contenido de Golf en Casa.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/20 via-white/[0.04] to-zinc-950 p-8 text-center shadow-2xl shadow-emerald-950/30 sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-zinc-950">
            <Flag className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Aprovecha Prime Day para mejorar tu simulador de golf
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Entra en la tienda, revisa la selección y comprueba qué productos tienen oferta activa durante el evento.
          </p>
          <div className="mt-8 flex justify-center">
            <AmazonButton position="final_cta">Ver ofertas en mi tienda de Amazon</AmazonButton>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-xs leading-6 text-zinc-500">
            Esta página contiene enlaces de afiliado. Golf en Casa puede recibir una comisión por compras realizadas desde estos enlaces.
            Amazon y el logo de Amazon son marcas de Amazon.com, Inc. o sus afiliados.
          </p>
        </div>
      </section>
    </main>
  );
}
