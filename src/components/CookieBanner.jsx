import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "cookieConsent";

function updateConsent(value) {
  if (typeof window === "undefined") return;

  const granted = value === "accepted" ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      personalization_storage: granted,
    });
  } else {
    window.dataLayer.push([
      "consent",
      "update",
      {
        ad_storage: granted,
        analytics_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        personalization_storage: granted,
      },
    ]);
  }

  window.dataLayer.push({
    event: "cookie_consent_update",
    consent_choice: value,
  });
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const isEnglish =
    typeof window !== "undefined" && window.location.pathname.startsWith("/en/");

  useEffect(() => {
    let consent = "";

    try {
      consent = window.localStorage.getItem(CONSENT_STORAGE_KEY) || "";
    } catch {
      // El banner sigue operativo aunque el navegador bloquee localStorage.
    }

    if (consent === "accepted" || consent === "rejected") {
      updateConsent(consent);
    } else {
      const frame = window.requestAnimationFrame(() => setShow(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const saveConsent = (value) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // La elección se aplica a esta sesión aunque no pueda persistirse.
    }

    updateConsent(value);
    setShow(false);
  };

  const acceptCookies = () => saveConsent("accepted");
  const rejectCookies = () => saveConsent("rejected");

  if (!show) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-4xl rounded-2xl border border-white/10 bg-zinc-900 p-5 text-white shadow-2xl"
    >
      <h2 id="cookie-consent-title" className="font-bold">
        {isEnglish ? "Privacy preferences" : "Preferencias de privacidad"}
      </h2>
      <p className="text-sm leading-6 text-zinc-300">
        {isEnglish
          ? "We use technical cookies required for the website and, with your consent, analytics or advertising cookies to measure usage and improve our services."
          : "Utilizamos cookies técnicas necesarias para el funcionamiento de la web y, con tu consentimiento, cookies analíticas o publicitarias para medir el uso y mejorar nuestros servicios."}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={isEnglish ? "/en/cookie-policy" : "/politica-cookies"}
          className="text-sm text-emerald-400 underline"
        >
          {isEnglish ? "View cookie policy" : "Ver política de cookies"}
        </a>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={rejectCookies}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {isEnglish ? "Reject" : "Rechazar"}
          </button>

          <button
            onClick={acceptCookies}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400"
          >
            {isEnglish ? "Accept" : "Aceptar"}
          </button>
        </div>
      </div>
    </section>
  );
}
