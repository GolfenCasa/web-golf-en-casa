import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-4xl rounded-2xl border border-white/10 bg-zinc-900 p-5 text-white shadow-2xl">
      <p className="text-sm leading-6 text-zinc-300">
        Utilizamos cookies técnicas necesarias para el funcionamiento de la web
        y, con tu consentimiento, cookies analíticas o publicitarias para mejorar
        la experiencia, medir el uso del sitio y optimizar nuestros servicios.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="/politica-cookies"
          className="text-sm text-emerald-400 underline"
        >
          Ver política de cookies
        </a>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={rejectCookies}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Rechazar
          </button>

          <button
            onClick={acceptCookies}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}