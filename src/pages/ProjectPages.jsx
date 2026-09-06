import { ArrowRight, MapPin, ShieldCheck, Wrench } from "lucide-react";
import {
  Breadcrumbs,
  Checklist,
  LeadBand,
  PublicFooter,
  PublicHeader,
  SeoHead,
} from "../components/SeoLandingShell.jsx";

const projects = {
  ecija: {
    path: "/proyectos/simulador-golf-ecija",
    title: "Simulador de golf en Écija, Sevilla | Proyecto realizado",
    description: "Proyecto residencial de simulador de golf en Écija: transformación de una estancia doméstica con pantalla, proyección, zona de golpeo y protección.",
    h1: "Simulador de golf residencial en Écija, Sevilla",
    location: "Écija, Sevilla",
    before: "/antes_1.jpg",
    after: "/despues_1.webp",
    beforeAlt: "Estancia antes de instalar el simulador de golf en Écija",
    afterAlt: "Simulador de golf terminado en una vivienda de Écija",
    summary: "El proyecto transformó una estancia doméstica en una zona de práctica indoor preparada para entrenar y jugar en casa.",
    scope: [
      "Diseño adaptado a una vivienda particular",
      "Pantalla de impacto y protección del entorno",
      "Zona de golpeo y superficie de juego",
      "Proyección, configuración e iluminación",
      "Puesta en marcha para comenzar a jugar",
    ],
    challenge: "Integrar el simulador en un espacio doméstico exige estudiar cómo conviven el swing, la pantalla, la zona de golpeo y los elementos de la estancia. El resultado no podía partir de un kit genérico: la geometría disponible marcaba el diseño.",
    solution: "Se definió una solución residencial a medida, coordinando pantalla, protección, proyección y superficie de juego. Las imágenes muestran la transformación real del espacio antes y después de la instalación.",
    quote: "Queríamos montar un simulador de golf en casa, pero no sabíamos por dónde empezar. Francisco nos diseñó e instaló una solución adaptada a nuestro espacio, presupuesto y necesidades, dejando todo listo para poder entrenar y jugar desde casa.",
  },
  jerez: {
    path: "/proyectos/simulador-golf-jerez",
    title: "Simulador de golf en Jerez, Cádiz | Proyecto realizado",
    description: "Instalación llave en mano de un simulador de golf en una vivienda de Jerez: diseño, componentes, pantalla, proyección, configuración y puesta en marcha.",
    h1: "Instalación de simulador de golf en Jerez, Cádiz",
    location: "Jerez, Cádiz",
    before: "/antes_2.webp",
    after: "/despues_2.webp",
    beforeAlt: "Espacio vacío antes del proyecto de simulador de golf en Jerez",
    afterAlt: "Simulador de golf instalado y configurado en Jerez",
    summary: "Una estancia vacía se convirtió en un simulador listo para uso residencial mediante un proyecto coordinado de diseño, componentes, instalación y configuración.",
    scope: [
      "Diseño según las medidas disponibles",
      "Selección coordinada de componentes",
      "Pantalla, protección y superficie de juego",
      "Instalación y configuración final",
      "Entrega de la solución lista para utilizar",
    ],
    challenge: "El espacio debía albergar una experiencia de juego completa sin perder seguridad ni comodidad. La selección de cada componente tenía que responder al tamaño de la estancia, al tipo de jugador y al uso previsto.",
    solution: "Golf en Casa coordinó el diseño, la elección de componentes, la instalación y la configuración final. La comparación visual permite comprobar el cambio entre el espacio de partida y el resultado terminado.",
    quote: "Estoy empezando en el golf y tener un simulador en casa me parecía una opción inmejorable para entrenar y jugar cuando quisiera. Francisco se encargó de todo: diseño, elección de componentes, instalación y configuración final.",
  },
};

export function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title="Proyectos de simuladores de golf realizados | Golf en Casa"
        description="Casos reales de simuladores de golf residenciales diseñados e instalados por Golf en Casa en Écija y Jerez."
        path="/proyectos"
        image="/despues_2.webp"
      />
      <PublicHeader />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: "Proyectos" }]} />
          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Casos reales</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">Proyectos de simuladores de golf a medida en España</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">Cada instalación parte de un espacio, un jugador y un objetivo diferentes. Estos casos muestran transformaciones reales, sin renders ni configuraciones de catálogo.</p>
        </div>
      </section>

      <section className="bg-zinc-100 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          {Object.values(projects).map((project) => (
            <article key={project.path} className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
              <img src={project.after} alt={project.afterAlt} width="1280" height="960" className="aspect-[4/3] w-full object-cover" />
              <div className="p-7 sm:p-8">
                <p className="flex items-center text-sm font-bold text-emerald-800"><MapPin className="mr-2 h-4 w-4" />{project.location}</p>
                <h2 className="mt-3 text-3xl font-black">{project.h1}</h2>
                <p className="mt-4 leading-7 text-zinc-600">{project.summary}</p>
                <a href={project.path} className="mt-6 inline-flex items-center font-bold text-emerald-800 hover:text-emerald-700">Ver proyecto completo <ArrowRight className="ml-2 h-4 w-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-7 px-6 py-16 lg:grid-cols-3 lg:px-8">
          <Value icon={ShieldCheck} title="Diseño a medida" text="El espacio se valida antes de elegir componentes o cerrar el presupuesto." />
          <Value icon={Wrench} title="Un proyecto coordinado" text="Diseño, selección, instalación y configuración se plantean como un único sistema." />
          <Value icon={MapPin} title="Cobertura en España" text="Estudiamos la ubicación, el alcance y la logística de cada instalación." />
        </div>
      </section>

      <LeadBand context="un proyecto de simulador de golf parecido a estos" />
      <PublicFooter />
    </main>
  );
}

export function ProjectEcijaPage() { return <ProjectDetail project={projects.ecija} />; }
export function ProjectJerezPage() { return <ProjectDetail project={projects.jerez} />; }

function ProjectDetail({ project }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title={project.title}
        description={project.description}
        path={project.path}
        image={project.after}
        serviceType="Diseño e instalación de simuladores de golf residenciales"
      />
      <PublicHeader />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: "Proyectos", href: "/proyectos" }, { label: project.location }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="flex items-center text-sm font-black uppercase tracking-[0.18em] text-emerald-300"><MapPin className="mr-2 h-4 w-4" />{project.location}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{project.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{project.summary}</p>
            </div>
            <a href="/instalacion-simuladores-golf#formulario" className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 hover:bg-emerald-300">Estudiar un proyecto similar <ArrowRight className="ml-2 h-5 w-5" /></a>
          </div>
        </div>
      </section>

      <section className="bg-white text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:px-8 lg:py-24">
          <figure>
            <img src={project.before} alt={project.beforeAlt} width="1200" height="900" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            <figcaption className="mt-3 text-sm text-zinc-600">Antes: espacio de partida</figcaption>
          </figure>
          <figure>
            <img src={project.after} alt={project.afterAlt} width="1200" height="900" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            <figcaption className="mt-3 text-sm text-zinc-600">Después: simulador instalado</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-zinc-100 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">El reto</p>
            <h2 className="mt-3 text-3xl font-black">Diseñar desde el espacio real</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{project.challenge}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">La solución</p>
            <h2 className="mt-3 text-3xl font-black">Una instalación coordinada</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{project.solution}</p>
          </article>
          <article className="rounded-[2rem] bg-zinc-950 p-8 text-white lg:col-span-2">
            <h2 className="text-3xl font-black">Alcance del proyecto</h2>
            <Checklist items={project.scope} dark />
          </article>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Experiencia del cliente</p>
          <blockquote className="mt-6 text-2xl font-semibold leading-10 sm:text-3xl">“{project.quote}”</blockquote>
          <p className="mt-5 text-zinc-400">Cliente en {project.location}</p>
        </div>
      </section>

      <LeadBand context={`un simulador de golf a medida como el proyecto de ${project.location}`} />
      <PublicFooter />
    </main>
  );
}

function Value({ icon: Icon, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
      <Icon className="h-8 w-8 text-emerald-300" />
      <h2 className="mt-5 text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-zinc-300">{text}</p>
    </article>
  );
}

