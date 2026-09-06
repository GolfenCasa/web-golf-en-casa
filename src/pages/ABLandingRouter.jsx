import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const EXPERIMENT_KEY = "golf_en_casa_ab_landing_v1";
const AB_PENDING_KEY = "golf_en_casa_ab_pending_v1";
const EXPERIMENT_NAME = "landing_control_vs_landing_2";

const VARIANTS = {
  control: {
    path: "/instalacion-simuladores-golf",
    landingVersion: "landing_control_v1",
  },
  landing_2: {
    path: "/estudio-simulador-golf",
    landingVersion: "landing_2_clarity_v1",
  },
};

const getStoredVariant = () => {
  try {
    const stored = window.localStorage.getItem(EXPERIMENT_KEY);
    return stored && VARIANTS[stored] ? stored : null;
  } catch {
    return null;
  }
};

const storeVariant = (variant) => {
  try {
    window.localStorage.setItem(EXPERIMENT_KEY, variant);
  } catch {
    // The experiment still works if localStorage is unavailable.
  }
};

const assignVariant = () => {
  const stored = getStoredVariant();
  if (stored) return stored;

  const variant = Math.random() < 0.5 ? "control" : "landing_2";
  storeVariant(variant);
  return variant;
};

const storePendingExposure = (variant) => {
  const config = VARIANTS[variant];

  try {
    window.sessionStorage.setItem(
      AB_PENDING_KEY,
      JSON.stringify({
        experimentName: EXPERIMENT_NAME,
        variant,
        landingVersion: config.landingVersion,
        createdAt: Date.now(),
        sentAt: null,
      })
    );
  } catch {
    // The redirect still works if sessionStorage is unavailable.
  }
};

export default function ABLandingRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    const variant = assignVariant();
    const config = VARIANTS[variant];

    // We only mark the exposure as pending here.
    // The destination landing sends ab_assignment once GTM is actually loaded.
    storePendingExposure(variant);

    const destination = `${config.path}${window.location.search}${window.location.hash}`;
    navigate(destination, { replace: true });
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <Helmet>
        <title>Estudio de simulador de golf | Golf en Casa</title>
        <meta
          name="description"
          content="Acceso al estudio de viabilidad para diseñar e instalar un simulador de golf a medida."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.golfencasa.net/instalacion-simuladores-golf" />
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
