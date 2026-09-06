import { ArrowRight, Building2, Home, Ruler, Settings, WalletCards } from "lucide-react";
import {
  Breadcrumbs,
  Checklist,
  LeadBand,
  PublicFooter,
  PublicHeader,
  SeoHead,
} from "../components/SeoLandingShell.jsx";

const pageConfigs = {
  price: {
    path: "/precio-simulador-golf",
    title: "Precio de un simulador de golf en casa | Golf en Casa",
    description: "Rangos orientativos y partidas que determinan el precio de un simulador de golf en casa. Compara alcance, tecnología e instalación antes de pedir presupuesto.",
    eyebrow: "Presupuesto y alcance",
    h1: "¿Cuánto cuesta un simulador de golf en casa?",
    intro: "El precio no depende de una sola máquina. Pantalla, protección, proyección, monitor de lanzamiento, PC, software, suelo e instalación forman un sistema y deben encajar con el espacio.",
    image: "/despues_1.webp",
    serviceType: "Presupuesto de simuladores de golf a medida",
    icon: WalletCards,
    highlights: [
      { value: "Desde 3.000 €", label: "Configuración esencial", text: "Una solución sencilla para empezar, siempre sujeta a espacio, componentes y alcance." },
      { value: "6.000–10.000 €", label: "Instalación Home", text: "Rango orientativo habitual cuando se busca una experiencia doméstica más completa." },
      { value: "Más de 10.000 €", label: "Proyecto Premium", text: "Tecnología y acabados de nivel superior o una integración más exigente." },
    ],
    sections: [
      {
        title: "Qué debe incluir un presupuesto comparable",
        paragraphs: ["Dos ofertas con el mismo precio pueden cubrir cosas muy distintas. Para comparar bien, pide que cada partida indique marca o especificación, instalación, configuración, formación, desplazamiento, garantías e impuestos."],
        bullets: ["Monitor de lanzamiento y licencias", "Pantalla de impacto, protección lateral y estructura", "Proyector, soporte, cableado y control de luz", "Alfombra, zona de golpeo y acabados", "PC, software, instalación, calibración y formación"],
      },
      {
        title: "Por qué cambia tanto el precio final",
        paragraphs: ["Una sala estrecha, un jugador zurdo y diestro, el nivel de precisión deseado o una instalación integrada en mobiliario cambian el diseño. También influyen la obra previa, la acústica, la climatización y si el proyecto está en una vivienda, un jardín o un negocio."],
        bullets: ["Medidas reales y zona segura de swing", "Tecnología compatible con el uso previsto", "Nivel de acabado e integración", "Frecuencia de uso y soporte posterior"],
      },
      {
        title: "La forma más segura de ajustar la inversión",
        paragraphs: ["Empieza por el objetivo y el espacio, no por una lista de productos. Una revisión inicial permite decidir qué partidas aportan valor y dónde no compensa gastar más. Los rangos anteriores son orientativos; el presupuesto detallado debe confirmar alcance e IVA antes de contratar."],
      },
    ],
    faqs: [
      { question: "¿Cuál es el precio mínimo de un simulador de golf en casa?", answer: "Como orientación publicada por Golf en Casa, una configuración esencial puede partir de unos 3.000 euros. La viabilidad y el alcance deben revisarse para saber qué incluye realmente." },
      { question: "¿Qué encarece más un simulador de golf?", answer: "Suelen influir el monitor de lanzamiento, la proyección, la protección de la sala, el PC, las licencias, los acabados y la complejidad de la instalación." },
      { question: "¿El presupuesto incluye instalación y configuración?", answer: "Debe indicarse expresamente en cada propuesta. Golf en Casa prepara soluciones a medida y detalla las partidas incluidas antes de contratar." },
    ],
    related: [
      ["Comprueba las medidas de tu espacio", "/medidas-simulador-golf"],
      ["Consulta la instalación llave en mano", "/instalacion-simuladores-golf"],
      ["Ver proyectos realizados", "/proyectos"],
    ],
    leadContext: "el precio de un simulador de golf para mi espacio",
  },
  measures: {
    path: "/medidas-simulador-golf",
    title: "Medidas para un simulador de golf en casa | Golf en Casa",
    description: "Aprende qué altura, ancho y fondo hay que comprobar antes de instalar un simulador de golf. Solicita un estudio de viabilidad de tu espacio.",
    eyebrow: "Viabilidad del espacio",
    h1: "Medidas para un simulador de golf: comprueba si tu espacio es viable",
    intro: "No existe una medida mínima universal. La altura del jugador, el swing, el palo más largo, la lateralidad y la posición de la pantalla cambian el espacio que necesitas.",
    image: "/antes_2.webp",
    serviceType: "Estudio de viabilidad para simuladores de golf",
    icon: Ruler,
    highlights: [
      { value: "Altura", label: "Swing completo", text: "Se valida con el jugador, su palo más largo y margen de seguridad; no solo con la altura del techo." },
      { value: "Ancho", label: "Diestro, zurdo o ambos", text: "La posición de golpeo y los elementos laterales determinan si el espacio resulta cómodo." },
      { value: "Fondo", label: "Pantalla, bola y proyector", text: "Hay que reservar distancia de seguridad y ubicar cada componente sin sombras ni golpes." },
    ],
    sections: [
      {
        title: "Las seis medidas que necesitamos",
        paragraphs: ["Mide en varios puntos y anota cualquier obstáculo. Un falso techo, una viga o una lámpara pueden ser más determinantes que la cota general de la habitación."],
        bullets: ["Ancho libre de pared a pared", "Fondo útil hasta la pantalla prevista", "Altura mínima real, incluidas vigas y luminarias", "Puertas, ventanas, columnas y enchufes", "Posición aproximada de bola", "Espacio para PC, proyector y circulación"],
      },
      {
        title: "La prueba de swing es obligatoria",
        paragraphs: ["Una cinta métrica no reproduce el movimiento. Antes de cerrar el diseño conviene probar el swing con el jugador más alto y el palo más largo, hacia ambos lados cuando vayan a utilizarlo diestros y zurdos. La prueba debe hacerse sin riesgo y con los obstáculos retirados."],
      },
      {
        title: "Qué enviar para una primera revisión",
        paragraphs: ["Con un croquis sencillo, fotos desde las cuatro esquinas, un vídeo corto y las medidas aproximadas podemos hacer un primer filtro. La validación definitiva se realiza antes de comprar material o ejecutar obra."],
        bullets: ["Fotos horizontales de toda la estancia", "Vídeo mostrando techo y obstáculos", "Altura del jugador y lateralidad", "Uso previsto: práctica, juego familiar o negocio", "Presupuesto orientativo"],
      },
    ],
    faqs: [
      { question: "¿Qué altura mínima necesito para un simulador de golf?", answer: "Depende de la estatura, el swing y el palo más largo de cada jugador. Debe validarse con una prueba real y margen de seguridad; una cifra aislada no garantiza la viabilidad." },
      { question: "¿Pueden jugar diestros y zurdos en el mismo espacio?", answer: "Sí, si el ancho y la posición de golpeo permiten swing seguro a ambos lados y la tecnología elegida es compatible con esa configuración." },
      { question: "¿Puedo enviar fotos para saber si cabe?", answer: "Sí. Fotos, vídeo, ancho, fondo, altura y obstáculos permiten una primera orientación, aunque el diseño final requiere una validación más detallada." },
    ],
    related: [
      ["Consultar precios orientativos", "/precio-simulador-golf"],
      ["Solicitar instalación a medida", "/instalacion-simuladores-golf#formulario"],
      ["Estudiar una solución en el jardín", "/simulador-golf-jardin"],
    ],
    leadContext: "comprobar las medidas de mi espacio para un simulador de golf",
  },
  consulting: {
    path: "/consultoria-simulador-golf",
    title: "Consultoría para simuladores de golf | Golf en Casa",
    description: "Asesoramiento independiente para elegir componentes, validar medidas y planificar tu simulador de golf antes de comprar o instalar.",
    eyebrow: "Asesoramiento independiente",
    h1: "Consultoría para diseñar tu simulador de golf sin comprar a ciegas",
    intro: "Si quieres montar parte del proyecto por tu cuenta, una revisión técnica previa puede evitar incompatibilidades, compras duplicadas y problemas de espacio.",
    image: "/francisco-golf-en-casa.webp",
    serviceType: "Consultoría para simuladores de golf",
    icon: Settings,
    highlights: [
      { value: "Desde 49 €", label: "Consulta online", text: "Videollamada para revisar objetivos, medidas, presupuesto y siguientes pasos." },
      { value: "Independiente", label: "Elección de tecnología", text: "La recomendación parte del espacio y del uso, no de un kit cerrado." },
      { value: "Accionable", label: "Plan de compra", text: "Sales con criterios claros para decidir componentes y orden de ejecución." },
    ],
    sections: [
      { title: "Qué revisamos en la consulta", paragraphs: ["Partimos de las medidas, el tipo de jugador y lo que quieres conseguir: práctica técnica, juego social, contenido o uso profesional."], bullets: ["Viabilidad y riesgos del espacio", "Monitor de lanzamiento y software", "Pantalla, proyector, relación de imagen y sombras", "PC, conectividad y licencias", "Prioridades según presupuesto"] },
      { title: "Para quién tiene sentido", paragraphs: ["Es útil si vas a comprar los componentes, si ya tienes parte del equipo o si necesitas una segunda opinión antes de aceptar un presupuesto. Cuando el proyecto requiere diseño e instalación completa, lo adecuado es solicitar el estudio llave en mano."], bullets: ["Proyecto DIY con acompañamiento", "Revisión de una lista de compra", "Solución a un problema de proyección o compatibilidad", "Comparación razonada entre alternativas"] },
      { title: "Qué no sustituye una videollamada", paragraphs: ["Una consulta online no sustituye una visita cuando la geometría es compleja, existe obra, hay que validar seguridad in situ o intervienen varios oficios. En esos casos definiremos el siguiente paso antes de recomendar una compra." ] },
    ],
    faqs: [
      { question: "¿Puedo contratar una consulta aunque instale el simulador yo mismo?", answer: "Sí. La consultoría está pensada también para proyectos DIY que necesitan validar medidas, compatibilidad y orden de compra." },
      { question: "¿La consultoría incluye un presupuesto de instalación?", answer: "La consulta aclara viabilidad y opciones. Si después necesitas una solución llave en mano, se prepara una propuesta separada según el alcance." },
      { question: "¿Podéis revisar componentes que ya he comprado?", answer: "Sí, siempre que facilites modelos, medidas y objetivo. La revisión permite detectar limitaciones, aunque no puede garantizar equipos de terceros sin comprobarlos." },
    ],
    related: [
      ["Instalación llave en mano", "/instalacion-simuladores-golf"],
      ["Medidas y viabilidad", "/medidas-simulador-golf"],
      ["Precios orientativos", "/precio-simulador-golf"],
    ],
    leadContext: "una consultoría para mi simulador de golf",
  },
  garden: {
    path: "/simulador-golf-jardin",
    title: "Simulador de golf en el jardín | Golf Studio a medida",
    description: "Estudia un Golf Studio independiente para instalar un simulador de golf en tu jardín: espacio, aislamiento, climatización, electricidad y normativa.",
    eyebrow: "Golf Studio",
    h1: "Un simulador de golf en el jardín, diseñado alrededor del juego",
    intro: "Cuando la vivienda no tiene una estancia adecuada, una construcción auxiliar puede convertirse en un espacio dedicado. Primero hay que validar parcela, dimensiones, confort y normativa.",
    image: "/images/golf-studio-1280.webp",
    serviceType: "Diseño de espacios Golf Studio para simuladores de golf",
    icon: Home,
    highlights: [
      { value: "Espacio dedicado", label: "Sin adaptar una habitación", text: "El estudio se plantea desde el inicio alrededor del swing, la pantalla y la tecnología." },
      { value: "Todo el año", label: "Confort", text: "Aislamiento, climatización, ventilación e iluminación forman parte del estudio." },
      { value: "Parcela", label: "Viabilidad previa", text: "Accesos, acometidas y normativa municipal deben comprobarse antes del diseño final." },
    ],
    sections: [
      { title: "Qué hay que estudiar antes", paragraphs: ["La parcela determina mucho más que el tamaño exterior. Orientación, drenaje, acceso de materiales, ruido, electricidad y distancia a la vivienda afectan al proyecto."], bullets: ["Normativa y permisos aplicables", "Dimensiones interiores útiles", "Cimentación, humedad y aislamiento", "Climatización y renovación de aire", "Electricidad, datos e iluminación"] },
      { title: "Diseñar de dentro hacia fuera", paragraphs: ["La posición de bola, la pantalla, el proyector, la zona segura y el acceso se definen antes de cerrar la envolvente. Así se evita construir un espacio que después obligue a comprometer el swing o la imagen." ] },
      { title: "Alcance coordinado y presupuesto", paragraphs: ["Cada Golf Studio requiere definir quién proyecta y ejecuta la construcción, qué suministra Golf en Casa y qué trabajos corresponden a profesionales locales. La propuesta debe separar obra, tecnología, instalación y mantenimiento." ] },
    ],
    faqs: [
      { question: "¿Necesito permiso para construir un Golf Studio?", answer: "Depende de la parcela, el municipio y la solución constructiva. La viabilidad urbanística debe confirmarse con el ayuntamiento o un técnico competente antes de ejecutar." },
      { question: "¿Golf en Casa instala también la tecnología del simulador?", answer: "Golf en Casa puede estudiar la integración del simulador, seleccionar componentes y definir la instalación según el alcance acordado para cada proyecto." },
      { question: "¿Cómo sé si mi jardín tiene espacio suficiente?", answer: "Necesitamos dimensiones de parcela, accesos, fotografías, ubicación propuesta y datos de los jugadores. Con esa información se realiza un primer estudio." },
    ],
    related: [
      ["Revisar medidas necesarias", "/medidas-simulador-golf"],
      ["Consultar rangos de precio", "/precio-simulador-golf"],
      ["Ver instalación completa", "/instalacion-simuladores-golf"],
    ],
    leadContext: "un Golf Studio para instalar un simulador en mi jardín",
  },
  business: {
    path: "/simulador-golf-negocio",
    title: "Simuladores de golf para negocios y academias | Golf en Casa",
    description: "Diseño de simuladores de golf para academias, clubes, hoteles y centros indoor: uso, capacidad, tecnología, operación, instalación y soporte.",
    eyebrow: "Soluciones profesionales",
    h1: "Simuladores de golf para negocios, academias, clubes y hoteles",
    intro: "Un proyecto profesional debe diseñarse para el modelo de uso y la operación diaria, no como una sala doméstica más grande. Capacidad, fiabilidad, soporte y experiencia del cliente son parte del sistema.",
    image: "/simulador.webp",
    serviceType: "Diseño e instalación de simuladores de golf para negocios",
    icon: Building2,
    highlights: [
      { value: "Operación", label: "Uso previsto", text: "Clases, alquiler por horas, eventos o experiencia hotelera requieren flujos distintos." },
      { value: "Fiabilidad", label: "Tecnología y soporte", text: "El equipamiento se evalúa por precisión, compatibilidad, mantenimiento y continuidad." },
      { value: "Experiencia", label: "Cliente y personal", text: "Acceso, seguridad, formación y facilidad de uso se diseñan desde el inicio." },
    ],
    sections: [
      { title: "El briefing comercial y operativo", paragraphs: ["Antes de hablar de marcas, hay que definir público, tarifa, horas de uso, servicios asociados y quién operará el espacio. Esto permite dimensionar el proyecto y evita promesas de retorno sin datos."], bullets: ["Academia y análisis de swing", "Centro indoor con reserva por horas", "Club o campo de golf", "Hotel, resort o experiencia corporativa", "Tienda, fitting o showroom"] },
      { title: "Decisiones técnicas que afectan al negocio", paragraphs: ["La lateralidad, el ritmo de usuarios, la facilidad para reiniciar el sistema, las licencias comerciales, la acústica y la protección de superficies influyen en la operación diaria."], bullets: ["Capacidad y distribución de bahías", "Tecnología y licencias para uso comercial", "Red, PC, proyección y mantenimiento", "Formación del equipo", "Plan de soporte y contingencia"] },
      { title: "Presupuesto con hipótesis visibles", paragraphs: ["Una propuesta profesional debe separar inversión inicial, suscripciones, consumibles, soporte y posibles obras. Golf en Casa puede aportar el diseño técnico; la viabilidad económica depende de datos reales del negocio y no se garantiza con una cifra genérica." ] },
    ],
    faqs: [
      { question: "¿Qué tipo de simulador necesita una academia?", answer: "Depende del análisis que realice el profesional, la precisión requerida, el volumen de alumnos, el espacio y el software. Se estudia antes de seleccionar tecnología." },
      { question: "¿Se pueden cobrar reservas por horas?", answer: "El modelo es posible, pero requiere definir software de reservas, licencias, operación, soporte y normativa. Esos elementos deben evaluarse en el proyecto comercial." },
      { question: "¿Golf en Casa trabaja en toda España?", answer: "Sí, se estudian proyectos profesionales en España según ubicación, alcance, calendario y necesidades de instalación." },
    ],
    related: [
      ["Solicitar estudio de instalación", "/instalacion-simuladores-golf#formulario"],
      ["Consultar mantenimiento CARE", "/care"],
      ["Ver proyectos realizados", "/proyectos"],
    ],
    leadContext: "un simulador de golf para mi negocio o academia",
  },
};

export function PricePage() { return <GrowthPage config={pageConfigs.price} />; }
export function MeasuresPage() { return <GrowthPage config={pageConfigs.measures} />; }
export function ConsultingPage() { return <GrowthPage config={pageConfigs.consulting} />; }
export function GardenPage() { return <GrowthPage config={pageConfigs.garden} />; }
export function BusinessPage() { return <GrowthPage config={pageConfigs.business} />; }

function GrowthPage({ config }) {
  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SeoHead {...config} faqs={config.faqs} />
      <PublicHeader />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_38%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: config.eyebrow }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <Icon className="h-4 w-4" /> {config.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{config.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{config.intro}</p>
              <a href="/instalacion-simuladores-golf#formulario" className="mt-8 inline-flex items-center rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-300">
                Solicitar orientación <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <img src={config.image} alt={config.h1} width="1280" height="853" className="aspect-[4/3] w-full rounded-[1.4rem] object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-14 lg:grid-cols-3 lg:px-8">
          {config.highlights.map((item) => (
            <article key={item.label} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-2xl font-black text-emerald-800">{item.value}</p>
              <h2 className="mt-2 text-lg font-bold">{item.label}</h2>
              <p className="mt-3 leading-7 text-zinc-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-zinc-100 text-zinc-950">
        <div className="mx-auto max-w-5xl space-y-7 px-6 py-16 lg:px-8 lg:py-24">
          {config.sections.map((section, index) => (
            <article key={section.title} className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">0{index + 1}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{section.title}</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-zinc-600">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && <Checklist items={section.bullets} />}
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Preguntas frecuentes</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Antes de tomar una decisión</h2>
            <div className="mt-8 space-y-4">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/5 p-5">
                  <summary className="cursor-pointer list-none font-bold">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-zinc-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-black">Siguiente paso recomendado</h2>
            <p className="mt-3 leading-7 text-zinc-300">Completa la decisión con estas páginas relacionadas:</p>
            <div className="mt-6 grid gap-3">
              {config.related.map(([label, href]) => (
                <a key={href} href={href} className="flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 font-semibold transition hover:border-emerald-400/40 hover:bg-white/5">
                  {label}<ArrowRight className="h-4 w-4 text-emerald-300" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <LeadBand context={config.leadContext} />
      <PublicFooter />
    </main>
  );
}
