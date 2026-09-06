import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-zinc-950 px-6 py-20 text-white">
      <Helmet>
        <title>Página no encontrada | Golf en Casa</title>
        <meta
          name="description"
          content="La página solicitada no existe. Vuelve a Golf en Casa o consulta nuestros servicios de simuladores de golf."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Error 404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Puedes volver al inicio o contarnos qué espacio tienes para estudiar un simulador de golf a medida.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            Volver al inicio
          </a>
          <a
            href="/instalacion-simuladores-golf"
            className="rounded-2xl border border-white/15 px-6 py-4 font-semibold transition hover:bg-white/10"
          >
            Ver instalación de simuladores
          </a>
        </div>
      </div>
    </main>
  );
}
