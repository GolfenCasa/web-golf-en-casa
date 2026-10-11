import { ArrowRight, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { ubriqueProjectPhotos, projectCardImageSizes, projectDetailImageSizes } from "../data/ubriqueProjectPhotos.js";
import {
  Breadcrumbs,
  Checklist,
  LeadBand,
  PublicFooter,
  PublicHeader,
  SeoHead,
} from "../components/SeoLandingShell.jsx";

const projects = {
  ubrique: {
    path: "/proyectos/simulador-golf-ubrique",
    title: "Simulador de golf en Ubrique, Cádiz | Proyecto realizado",
    description: "Instalación de simulador de golf en Ubrique con ProTee VX, proyección BenQ 4K y GSPro: pantalla protegida, zona de golpeo y puesta en marcha en una sala de ocio.",
    h1: "Simulador de golf en Ubrique, Cádiz",
    location: "Ubrique, Cádiz",
    after: ubriqueProjectPhotos[0].src,
    afterSrcSet: ubriqueProjectPhotos[0].srcSet,
    afterAlt: "Vista general del simulador de golf instalado en una sala de ocio en Ubrique",
    summary: "Una sala de ocio incorpora un simulador de golf con ProTee VX, proyección 4K y GSPro. La instalación integra pantalla de impacto, protección y una zona de golpeo preparada para entrenar y jugar indoor.",
    use: "Sala de ocio: entrenamiento y juego indoor",
    startingPoint: "Sala de ocio compartida con otras actividades",
    completed: "Octubre de 2026",
    gallery: ubriqueProjectPhotos,
    decisions: [
      ["Monitor de lanzamiento", "ProTee VX de instalación cenital, integrado en la configuración del simulador."],
      ["Proyección", "Proyector BenQ LK835ST 4K de tiro corto y pantalla de impacto con recinto de protección."],
      ["Superficie de juego", "Suelo amortiguado, césped de putting y alfombra de golpeo."],
      ["Simulación", "PC dedicado y configuración de GSPro para la práctica y el juego en campos virtuales."],
      ["Luz y puesta en marcha", "Control de la entrada de luz, configuración y calibración del conjunto."],
    ],
    scope: [
      "Integración del simulador en una sala de ocio",
      "Pantalla de impacto y protección del área de juego",
      "Monitor cenital ProTee VX y proyección BenQ 4K",
      "Superficie de putting y zona de golpeo",
      "PC dedicado y configuración de GSPro",
      "Control de luz, calibración y puesta en marcha",
    ],
    challenge: "La sala comparte espacio con otras actividades de ocio y recibe luz natural. El diseño debía integrar el área de golpeo, la pantalla y las protecciones, y controlar la luz para disfrutar de una proyección clara sin perder de vista el uso del conjunto de la estancia.",
    solution: "Aquí Golf coordinó la instalación de un recinto de impacto protegido, la superficie de juego y la tecnología del simulador. El monitor cenital ProTee VX, la proyección BenQ 4K y GSPro se configuraron como un conjunto, con control de la entrada de luz y puesta en marcha final.",
    notes: "Esta ficha muestra la instalación terminada y los componentes de este proyecto. El diseño y la configuración de otro simulador se estudian según su espacio, uso y presupuesto.",
  },
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
    startingPoint: "Estancia de una vivienda particular",
    decisions: [
      ["Pantalla y zona de golpeo", "Adaptación de la pantalla de impacto y la zona de práctica al espacio doméstico."],
      ["Protección", "Protección del entorno como parte de la integración del simulador."],
      ["Proyección e iluminación", "Coordinación de la proyección y la iluminación en la estancia."],
      ["Entrega", "Configuración y puesta en marcha para entrenar y jugar en casa."],
    ],
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
    startingPoint: "Estancia vacía destinada a uso residencial",
    decisions: [
      ["Diseño", "Adaptación a las medidas disponibles, el presupuesto, el jugador y el uso previsto."],
      ["Componentes", "Selección coordinada de los elementos de la solución personalizada."],
      ["Pantalla y superficie", "Integración de pantalla, protección y superficie de juego."],
      ["Entrega", "Instalación, configuración final y puesta en marcha."],
    ],
    scope: [
      "Diseño según las medidas disponibles",
      "Selección coordinada de componentes",
      "Pantalla, protección y superficie de juego",
      "Instalación y configuración final",
      "Entrega de la solución lista para utilizar",
    ],
    challenge: "El espacio debía albergar una experiencia de juego completa sin perder seguridad ni comodidad. La selección de cada componente tenía que responder al tamaño de la estancia, al tipo de jugador y al uso previsto.",
    solution: "Aquí Golf coordinó el diseño, la elección de componentes, la instalación y la configuración final. La comparación visual permite comprobar el cambio entre el espacio de partida y el resultado terminado.",
    quote: "Estoy empezando en el golf y tener un simulador en casa me parecía una opción inmejorable para entrenar y jugar cuando quisiera. Francisco se encargó de todo: diseño, elección de componentes, instalación y configuración final.",
  },
};

export function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title="Proyectos de simuladores de golf realizados | Aquí Golf"
        description="Proyectos reales de simuladores de golf diseñados e instalados por Aquí Golf en Ubrique, Écija y Jerez. Fotografías y alcance de cada instalación."
        path="/proyectos"
        image={projects.ubrique.after}
        pageType="CollectionPage"
        breadcrumbs={[{ label: "Proyectos" }]}
      />
      <PublicHeader />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: "Proyectos" }]} />
          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Casos reales</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">Proyectos de simuladores de golf a medida en España</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">Conoce tres instalaciones de Aquí Golf en Ubrique, Cádiz, Écija, Sevilla, y Jerez, Cádiz. Cada ficha muestra las fotografías y el alcance del trabajo: desde una sala de ocio compartida hasta espacios residenciales preparados para entrenar y jugar al golf.</p>
        </div>
      </section>

      <section className="bg-zinc-100 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2 xl:grid-cols-3 lg:px-8 lg:py-24">
          {Object.values(projects).map((project) => (
            <article key={project.path} className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
              <a href={project.path} aria-label={`Ver proyecto en ${project.location}`}><img src={project.after} srcSet={project.afterSrcSet} sizes={project.afterSrcSet ? projectCardImageSizes : undefined} alt={project.afterAlt} width="1280" height="960" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" /></a>
              <div className="p-7 sm:p-8">
                <p className="flex items-center text-sm font-bold text-emerald-800"><MapPin className="mr-2 h-4 w-4" />{project.location}</p>
                {project.completed ? <p className="mt-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Última instalación · {project.completed}</p> : null}
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
export function ProjectUbriquePage() { return <ProjectDetail project={projects.ubrique} />; }

function ProjectDetail({ project }) {
  const gallery = project.gallery || [
    { src: project.before, alt: project.beforeAlt, caption: "Antes: espacio de partida" },
    { src: project.after, alt: project.afterAlt, caption: "Después: simulador instalado" },
  ];
  const facts = [["Ubicación", project.location], ["Uso", project.use || "Residencial: práctica y juego en casa"], ["Espacio de partida", project.startingPoint], ...(project.completed ? [["Instalación", project.completed]] : [])];
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead
        title={project.title}
        description={project.description}
        path={project.path}
        image={project.after}
        serviceType="Diseño e instalación de simuladores de golf a medida"
        breadcrumbs={[{ label: "Proyectos", href: "/proyectos" }, { label: project.location }]}
        article={{ headline: project.h1, dateModified: "2026-10-11", author: "Aquí Golf" }}
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
              <p className="mt-4 text-sm leading-6 text-zinc-400">Caso publicado por <a href="/sobre-aqui-golf" className="underline hover:text-emerald-300">Aquí Golf</a> · Revisado el <time dateTime="2026-10-11">11 de octubre de 2026</time></p>
            </div>
            <a href="/instalacion-simuladores-golf#formulario" className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 hover:bg-emerald-300">Estudiar un proyecto similar <ArrowRight className="ml-2 h-5 w-5" /></a>
          </div>
        </div>
      </section>

      <section className="bg-white text-zinc-950">
        <div className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
          <h2 className="text-3xl font-black">Ficha del proyecto</h2>
          <dl className={`mt-6 grid gap-4 ${project.completed ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
            {facts.map(([label, value]) => <div key={label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"><dt className="text-sm font-bold text-emerald-800">{label}</dt><dd className="mt-2 font-semibold leading-7">{value}</dd></div>)}
          </dl>
        </div>
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:px-8 lg:py-24">
          {gallery.map(({ src, srcSet, alt, caption, width = 1200, height = 900 }) => <figure key={src}>
            <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar fotografía: ${alt}`}><img src={src} srcSet={srcSet} sizes={srcSet ? projectDetailImageSizes : undefined} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[2rem] object-cover" /></a>
            <figcaption className="mt-3 text-sm text-zinc-600">{caption}</figcaption>
          </figure>)}
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
          <article className="min-w-0 rounded-[2rem] bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black">Decisiones de la instalación</h2>
            <dl className="mt-6 space-y-5 md:hidden">
              {project.decisions.map(([element, text]) => <div key={element} className="border-b border-zinc-200 pb-5"><dt className="font-bold text-emerald-800">{element}</dt><dd className="mt-2 leading-7 text-zinc-600">{text}</dd></div>)}
            </dl>
            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[32rem] text-left text-base leading-7">
                <caption className="sr-only">Elementos y alcance de la instalación en {project.location}</caption>
                <thead><tr className="border-b-2 border-zinc-200"><th scope="col" className="px-4 py-3 font-bold text-emerald-800">Elemento</th><th scope="col" className="px-4 py-3 font-bold text-emerald-800">Alcance de este proyecto</th></tr></thead>
                <tbody>{project.decisions.map(([element, text]) => <tr key={element} className="border-b border-zinc-200"><th scope="row" className="px-4 py-4 align-top font-semibold">{element}</th><td className="px-4 py-4 text-zinc-600">{text}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-7 text-zinc-500">{project.notes || "La ficha recoge el alcance publicado del caso y sus fotografías. Las medidas, los modelos de equipo y el presupuesto no se detallan en esta página; la configuración de otro proyecto se estudia según su propio espacio."}</p>
          </article>
        </div>
      </section>

      {project.quote ? <section className="border-y border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Experiencia del cliente</p>
          <blockquote className="mt-6 text-2xl font-semibold leading-10 sm:text-3xl">“{project.quote}”</blockquote>
          <p className="mt-5 text-zinc-400">Cliente en {project.location}</p>
        </div>
      </section> : null}

      <section className="bg-zinc-100 text-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h2 className="text-2xl font-black">Planifica una instalación parecida</h2>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4 font-semibold text-emerald-800">
            <a href="/medidas-simulador-golf" className="underline">Comprobar medidas y swing</a>
            <a href="/precio-simulador-golf" className="underline">Comparar rangos de precio y alcance</a>
            <a href="/guias-simuladores-golf" className="underline">Elegir la tecnología del simulador</a>
          </div>
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

