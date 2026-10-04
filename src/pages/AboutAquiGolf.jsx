import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { Breadcrumbs, LeadBand, PublicFooter, PublicHeader, SeoHead } from "../components/SeoLandingShell.jsx";
import { OFFICIAL_PROFILES } from "../lib/site-schema.js";

const services = [
  ["Consultoría", "Revisión del espacio, el objetivo, el presupuesto y la compatibilidad de los componentes antes de comprar.", "/consultoria-simulador-golf"],
  ["Diseño e instalación", "Selección e integración de pantalla, protección, zona de golpeo, proyección y tecnología según el alcance del proyecto.", "/instalacion-simuladores-golf"],
  ["Viviendas y jardines", "Estudio de una estancia doméstica o de un Golf Studio dedicado, empezando por la viabilidad del espacio.", "/simulador-golf-jardin"],
  ["Negocios y academias", "Diseño según el uso profesional, la operación, las licencias y las necesidades del personal.", "/simulador-golf-negocio"],
  ["Soporte CARE", "Mantenimiento y acompañamiento posterior conforme a las condiciones del servicio contratado.", "/care"],
];

const criteria = [
  ["Primero el espacio y el uso", "Comprobamos medidas, obstáculos, lateralidad y swing antes de cerrar la selección de equipos. Una medida aislada o un kit de catálogo no resuelven todos los proyectos."],
  ["Recomendaciones con contexto", "Explicamos para qué jugador y sala tiene sentido cada opción. La compatibilidad, las distancias y las licencias se contrastan con la documentación del fabricante cuando dependen de un modelo concreto."],
  ["Precios con alcance visible", "Los rangos publicados orientan la decisión. El presupuesto de cada instalación debe detallar equipos, trabajos, configuración, desplazamiento e impuestos aplicables."],
  ["Casos identificables", "Las fichas de los proyectos de Écija y Jerez muestran fotografías del antes y después, el punto de partida y las decisiones de diseño de cada instalación."],
];

export default function AboutAquiGolf() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title="Sobre Aquí Golf | Francisco Menacho y simuladores de golf"
        description="Conoce a Francisco Menacho, fundador de Aquí Golf. Consultoría, diseño, instalación y soporte de simuladores de golf en España, con proyectos reales."
        path="/sobre-aqui-golf"
        image="/francisco-aqui-golf.webp"
        pageType="AboutPage"
        breadcrumbs={[{ label: "Sobre Aquí Golf" }]}
      />
      <PublicHeader />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: "Sobre Aquí Golf" }]} />
          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Quién está detrás de tu proyecto</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">Aquí Golf: simuladores a medida con un responsable directo</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">Aquí Golf ofrece consultoría, diseño, instalación y soporte de simuladores de golf en España para viviendas, academias y negocios. Francisco Menacho es su fundador y el interlocutor del proyecto, desde la primera revisión hasta la entrega.</p>
        </div>
      </section>

      <section id="francisco-menacho" className="bg-zinc-100 text-zinc-950 scroll-mt-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.75fr_1fr] lg:items-center lg:px-8 lg:py-24">
          <img src="/francisco-aqui-golf.webp" alt="Francisco Menacho, fundador de Aquí Golf" width="768" height="1024" className="mx-auto w-full max-w-md rounded-[2rem] object-cover shadow-xl" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Fundador y responsable del proyecto</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Francisco Menacho</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">Soy el fundador de Aquí Golf y creador de contenido sobre simuladores de golf. Te acompaño para decidir qué solución encaja con tu espacio, presupuesto y forma de jugar, y coordino el diseño, la selección de componentes, la instalación y la configuración según el alcance acordado.</p>
            <p className="mt-4 leading-7 text-zinc-600">La web está operada por Francisco Menacho Valle bajo la marca Aquí Golf. Puedes consultar esta identificación y las condiciones de uso en el <a href="/aviso-legal" className="font-semibold text-emerald-800 underline">aviso legal</a>.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {OFFICIAL_PROFILES.map(({ name, url }) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-2xl border border-zinc-300 px-5 py-4 font-bold text-emerald-800 hover:bg-white">Aquí Golf en {name}<ArrowRight className="ml-3 h-4 w-4" /></a>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-black sm:text-4xl">Qué hacemos y para quién</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">Estudiamos proyectos en España según ubicación, alcance y logística. Puedes solicitar una consulta para montar el simulador por tu cuenta o una propuesta de instalación completa.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map(([name, text, href]) => (
              <article key={href} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-3 leading-7 text-zinc-300">{text}</p>
                <a href={href} className="mt-5 inline-flex items-center font-bold text-emerald-300 hover:text-emerald-200">Ver el servicio<ArrowRight className="ml-2 h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="criterios-editoriales" className="bg-white text-zinc-950 scroll-mt-8">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Criterios de trabajo y de nuestras guías</p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Cómo fundamentamos las recomendaciones</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">La selección parte del espacio y del uso, sin exigir un kit cerrado. Las guías de Aquí Golf ayudan a comparar alternativas y preparar preguntas antes de comprar; la propuesta final se concreta para cada sala.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {criteria.map(([title, text]) => <article key={title} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7"><CheckCircle2 className="h-7 w-7 text-emerald-700" /><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-zinc-600">{text}</p></article>)}
          </div>
          <p className="mt-7 text-sm leading-7 text-zinc-600">Responsable del contenido de Aquí Golf: Francisco Menacho. Revisión de esta página: <time dateTime="2026-10-04">4 de octubre de 2026</time>. Si detectas una información que necesita corregirse, escríbenos a <a href="mailto:info@aquigolf.es" className="font-semibold text-emerald-800 underline">info@aquigolf.es</a>.</p>
          <a href="/guias-simuladores-golf" className="mt-6 inline-flex items-center font-bold text-emerald-800">Consultar las guías de simuladores de golf<ArrowRight className="ml-2 h-4 w-4" /></a>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black">Proyectos que puedes consultar</h2>
            <p className="mt-5 leading-8 text-zinc-300">Las instalaciones residenciales de Écija, Sevilla, y Jerez, Cádiz, muestran dos transformaciones del espacio con imágenes del antes y después. Sus fichas explican el punto de partida y el alcance de la solución.</p>
            <div className="mt-6 grid gap-4">
              <a href="/proyectos/simulador-golf-ecija" className="inline-flex items-center font-bold text-emerald-300">Proyecto residencial en Écija<ArrowRight className="ml-2 h-4 w-4" /></a>
              <a href="/proyectos/simulador-golf-jerez" className="inline-flex items-center font-bold text-emerald-300">Instalación residencial en Jerez<ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-black">Contacto de Aquí Golf</h2>
            <div className="mt-5 grid gap-4 leading-7">
              <a href="mailto:info@aquigolf.es" className="inline-flex items-center gap-3 text-emerald-300"><Mail className="h-5 w-5" />info@aquigolf.es</a>
              <a href="tel:+34678107234" className="inline-flex items-center gap-3 text-emerald-300"><Phone className="h-5 w-5" />+34 678 10 72 34</a>
              <p className="text-zinc-300">Para una primera revisión, envía ubicación, ancho, fondo, altura, fotos del espacio y el uso que quieres darle.</p>
            </div>
          </aside>
        </div>
      </section>
      <LeadBand context="un proyecto de simulador de golf con Aquí Golf" />
      <PublicFooter />
    </main>
  );
}
