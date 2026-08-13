import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EXPERIMENT_KEY = "golf_en_casa_ab_landing_v1";
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
    // El experimento sigue funcionando aunque localStorage esté bloqueado.
  }
};

const assignVariant = () => {
  const stored = getStoredVariant();
  if (stored) return stored;

  const variant = Math.random() < 0.5 ? "control" : "landing_2";
  storeVariant(variant);
  return variant;
};

export default function ABLandingRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    const variant = assignVariant();
    const config = VARIANTS[variant];

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "ab_assignment",
      experiment_name: EXPERIMENT_NAME,
      ab_variant: variant,
      landing_version: config.landingVersion,
    });

    const destination = `${config.path}${window.location.search}${window.location.hash}`;

    navigate(destination, { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-zinc-400">Cargando experiencia…</p>
      </div>
    </div>
  );
}
