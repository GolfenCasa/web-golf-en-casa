import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { scheduleAbNavigation } from "../lib/ab-experiment.js";

export default function ABLandingRouter() {
  const navigate = useNavigate();

  useEffect(() => scheduleAbNavigation(navigate), [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <Helmet>
        <title>Estudio de simulador de golf | Aquí Golf</title>
        <meta
          name="description"
          content="Acceso al estudio de viabilidad para diseñar e instalar un simulador de golf a medida."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://aquigolf.es/instalacion-simuladores-golf" />
      </Helmet>
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-base font-semibold">Preparando el estudio de tu simulador de golf</h1>
        <p className="mt-2 text-sm text-zinc-400">Cargando experiencia…</p>
      </div>
    </main>
  );
}
