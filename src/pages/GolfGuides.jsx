import { ArrowRight, BookOpen, ChevronDown, ExternalLink, PlayCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import {
  Breadcrumbs,
  LeadBand,
  PublicFooter,
  PublicHeader,
  SeoHead,
} from "../components/SeoLandingShell.jsx";
import {
  GUIDE_REVIEW_DATE,
  GUIDES_INDEX_PATH,
  golfGuides,
  guidePath,
  guideSources,
} from "../data/golfGuides.js";

const reviewLabel = "4 de octubre de 2026";
const categories = [...new Set(golfGuides.map(({ category }) => category))];
const sectionId = (index) => `apartado-${index + 1}`;

function SkipLink({ href = "#contenido-guia" }) {
  return <a href={href} className="sr-only z-50 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-zinc-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>;
}

export function GuidesIndexPage() {
  const title = "Guías de simuladores de golf: tecnología, sala y presupuesto | Aquí Golf";
  const description = "Guías para elegir y montar un simulador de golf: monitores, comparativas, GSPro, proyección, pantallas, garajes y presupuestos. Fuentes oficiales y criterios claros.";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SeoHead title={title} description={description} path={GUIDES_INDEX_PATH} breadcrumbs={[{ label: "Guías de simuladores" }]} />
      <SkipLink href="#biblioteca-guias" />
      <PublicHeader />
      <main id="biblioteca-guias">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_48%)]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <Breadcrumbs items={[{ label: "Guías de simuladores" }]} />
            <p className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-emerald-300"><BookOpen className="h-5 w-5" aria-hidden="true" /> Aprende antes de elegir</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Guías para diseñar, elegir y montar tu simulador de golf</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">Respuestas a dudas concretas sobre tecnología, espacio, imagen y presupuesto. Cada guía distingue requisitos del fabricante y criterios de selección de Aquí Golf, con enlaces a las fuentes para comprobarlos.</p>
            <nav aria-label="Temas de las guías" className="mt-9 flex flex-wrap gap-3">
              {categories.map((category, index) => <a key={category} href={`#tema-${index + 1}`} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-emerald-400/50 hover:text-emerald-300">{category}</a>)}
            </nav>
          </div>
        </section>

        <div className="bg-zinc-100 text-zinc-950">
          <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8 lg:py-20">
            {categories.map((category, index) => (
              <section key={category} id={`tema-${index + 1}`} aria-labelledby={`titulo-tema-${index + 1}`} className="scroll-mt-8">
                <h2 id={`titulo-tema-${index + 1}`} className="text-3xl font-black tracking-tight">{category}</h2>
                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {golfGuides.filter((guide) => guide.category === category).map((guide) => (
                    <article key={guide.slug} className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
                      <h3 className="text-xl font-black leading-7"><a href={guidePath(guide.slug)} className="hover:text-emerald-800">{guide.title}</a></h3>
                      <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{guide.description}</p>
                      <a href={guidePath(guide.slug)} aria-label={`Leer: ${guide.title}`} className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-800">Leer guía <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <section className="border-y border-white/10">
          <div className="mx-auto grid max-w-7xl gap-7 px-6 py-12 sm:grid-cols-2 lg:px-8">
            <div><h2 className="text-2xl font-black">Primero, comprueba si cabe</h2><p className="mt-3 leading-7 text-zinc-300">Altura, ancho, fondo, obstáculos y lateralidad determinan qué soluciones merece la pena comparar.</p><a href="/medidas-simulador-golf" className="mt-4 inline-flex items-center gap-2 font-bold text-emerald-300">Revisar medidas <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
            <div><h2 className="text-2xl font-black">Después, define el alcance</h2><p className="mt-3 leading-7 text-zinc-300">Compara componentes, instalación y costes de uso dentro de una propuesta adaptada a tu proyecto.</p><a href="/precio-simulador-golf" className="mt-4 inline-flex items-center gap-2 font-bold text-emerald-300">Ver precios orientativos <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>
      <LeadBand context="elegir los componentes de mi simulador de golf" />
      <PublicFooter />
    </div>
  );
}

export function GolfGuidePage() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "");
  const guide = golfGuides.find(({ slug }) => guidePath(slug) === normalizedPath);
  if (!guide) return <Navigate to={GUIDES_INDEX_PATH} replace />;

  const path = guidePath(guide.slug);
  const breadcrumbs = [{ label: "Guías de simuladores", href: GUIDES_INDEX_PATH }, { label: guide.title }];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title={`${guide.title} | Aquí Golf`}
        description={guide.description}
        path={path}
        faqs={guide.faqs}
        breadcrumbs={breadcrumbs}
        article={{ headline: guide.title, datePublished: GUIDE_REVIEW_DATE, dateModified: GUIDE_REVIEW_DATE, author: { "@id": "https://aquigolf.es/#francisco-menacho" } }}
      />
      <SkipLink />
      <PublicHeader />
      <main id="contenido-guia">
        <article>
          <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_45%)]">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
              <Breadcrumbs items={breadcrumbs} />
              <p className="mt-9 text-sm font-bold uppercase tracking-[0.15em] text-emerald-300">{guide.category}</p>
              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{guide.title}</h1>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6 text-zinc-400">
                <span>Responsable editorial: <a href="/sobre-aqui-golf" className="font-semibold text-zinc-300 underline decoration-white/30 underline-offset-4 hover:text-white">Francisco Menacho · Aquí Golf</a></span>
                <span>Revisado el <time dateTime={GUIDE_REVIEW_DATE}>{reviewLabel}</time></span>
              </div>
              <div className="mt-8 max-w-4xl rounded-3xl border border-emerald-400/25 bg-emerald-400/10 p-6 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.15em] text-emerald-300">Respuesta rápida</p>
                <p className="mt-3 text-lg leading-8 text-zinc-100">{guide.answer}</p>
              </div>
            </div>
          </header>

          <div className="bg-zinc-100 text-zinc-950">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8 lg:py-16">
              <div className="min-w-0 space-y-7">
                {guide.sections.map((section, index) => <GuideSection key={section.title} section={section} index={index} />)}
                {guide.video && <VideoReference video={guide.video} />}
                <section id="preguntas" aria-labelledby="titulo-preguntas" className="scroll-mt-8 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-9">
                  <h2 id="titulo-preguntas" className="text-2xl font-black tracking-tight sm:text-3xl">Preguntas frecuentes</h2>
                  <div className="mt-6 divide-y divide-zinc-200">
                    {guide.faqs.map(({ question, answer }) => (
                      <details key={question} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold leading-7"><span>{question}</span><ChevronDown className="mt-1 h-5 w-5 shrink-0 text-emerald-700 transition group-open:rotate-180" aria-hidden="true" /></summary>
                        <p className="mt-3 leading-7 text-zinc-600">{answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
                <section id="fuentes" aria-labelledby="titulo-fuentes" className="scroll-mt-8 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-9">
                  <h2 id="titulo-fuentes" className="text-2xl font-black tracking-tight sm:text-3xl">Fuentes y revisión</h2>
                  <p className="mt-4 leading-7 text-zinc-600">Documentación oficial consultada el <time dateTime={GUIDE_REVIEW_DATE}>{reviewLabel}</time>. Los criterios de diseño y selección son orientación editorial de Aquí Golf. Las funciones, compatibilidades y condiciones deben confirmarse para el modelo y paquete de la propuesta.</p>
                  <SourceLinks sourceKeys={guide.sources} className="mt-5" />
                </section>
              </div>

              <aside className="order-first lg:order-last">
                <nav aria-label="Contenido de esta guía" className="rounded-3xl border border-zinc-200 bg-white p-6 lg:sticky lg:top-6">
                  <h2 className="text-lg font-black">En esta guía</h2>
                  <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                    {guide.sections.map(({ title }, index) => <li key={title}><a href={`#${sectionId(index)}`} className="hover:text-emerald-800">{title}</a></li>)}
                    {guide.video && <li><a href="#video" className="hover:text-emerald-800">Vídeo de Aquí Golf</a></li>}
                    <li><a href="#preguntas" className="hover:text-emerald-800">Preguntas frecuentes</a></li>
                    <li><a href="#fuentes" className="hover:text-emerald-800">Fuentes y revisión</a></li>
                  </ol>
                  <a href="/consultoria-simulador-golf" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800">Revisar mi caso <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                </nav>
              </aside>
            </div>
          </div>
        </article>

        <section aria-labelledby="titulo-relacionadas" className="border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <h2 id="titulo-relacionadas" className="text-3xl font-black tracking-tight">Completa tu decisión</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {guide.related.map(({ label, href }) => <a key={href} href={href} className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-5 font-semibold transition hover:border-emerald-400/50"><span>{label}</span><ArrowRight className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" /></a>)}
            </div>
            <a href={GUIDES_INDEX_PATH} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-300"><BookOpen className="h-4 w-4" aria-hidden="true" /> Todas las guías de simuladores</a>
          </div>
        </section>
      </main>
      <LeadBand context={guide.title.toLocaleLowerCase("es-ES")} />
      <PublicFooter />
    </div>
  );
}

function GuideSection({ section, index }) {
  const titleId = `titulo-${sectionId(index)}`;
  return (
    <section id={sectionId(index)} aria-labelledby={titleId} className="scroll-mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-9">
      <h2 id={titleId} className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">{section.title}</h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-zinc-600 sm:text-lg">{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      {section.bullets && <ul className="mt-5 list-disc space-y-2 pl-6 leading-7 text-zinc-700 marker:text-emerald-700">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.table && <GuideTable table={section.table} />}
      {section.sources && <SourceLinks sourceKeys={section.sources} className="mt-5 border-t border-zinc-100 pt-4" compact />}
    </section>
  );
}

function GuideTable({ table }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200" role="region" aria-label={table.caption} tabIndex={0}>
      <table className="w-full min-w-[30rem] border-collapse text-left text-sm leading-6">
        <caption className="bg-zinc-50 px-5 py-4 text-left font-bold text-zinc-800">{table.caption}</caption>
        <thead className="bg-emerald-50 text-emerald-950"><tr>{table.headers.map((header) => <th key={header} scope="col" className="px-5 py-3 font-bold">{header}</th>)}</tr></thead>
        <tbody>{table.rows.map((row) => <tr key={row[0]} className="border-t border-zinc-200">{row.map((cell, index) => index === 0 ? <th key={`${row[0]}-${index}`} scope="row" className="px-5 py-4 align-top font-semibold text-zinc-900">{cell}</th> : <td key={`${row[0]}-${index}`} className="px-5 py-4 align-top text-zinc-600">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function SourceLinks({ sourceKeys, compact = false, className = "" }) {
  const sources = [...new Set(sourceKeys)].map((key) => guideSources[key]);
  return (
    <div className={className}>
      {compact && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Documentación oficial</p>}
      <ul className={`space-y-2 ${compact ? "text-sm" : "text-base"}`}>
        {sources.map(({ label, href }) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 leading-6 text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"><span>{label}</span><ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only"> (se abre en una pestaña nueva)</span></a></li>)}
      </ul>
    </div>
  );
}

function VideoReference({ video }) {
  return (
    <section id="video" aria-labelledby="titulo-video" className="scroll-mt-8 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-9">
      <h2 id="titulo-video" className="text-2xl font-black tracking-tight sm:text-3xl">Vídeo de Aquí Golf</h2>
      <p className="mt-4 leading-7 text-zinc-600">{video.note}</p>
      <a href={video.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-zinc-950 px-5 py-4 font-bold leading-7 text-white hover:bg-zinc-800"><PlayCircle className="h-6 w-6 shrink-0 text-emerald-300" aria-hidden="true" /><span>{video.title}<span className="sr-only"> (se abre en YouTube en una pestaña nueva)</span></span></a>
    </section>
  );
}
