import CookiePolicyDetails from "../components/CookiePolicyDetails";
import { Helmet } from "react-helmet-async";

export default function PoliticaCookies() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
      <Helmet>
        <title>Política de cookies | Aquí Golf</title>
        <meta
          name="description"
          content="Información sobre las cookies y tecnologías de medición utilizadas en Aquí Golf."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://aquigolf.es/politica-cookies" />
      </Helmet>
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={handleBack}
          className="text-emerald-400 transition hover:text-emerald-300"
        >
          ← Volver
        </button>

        <h1 className="mt-8 text-4xl font-black">Política de Cookies</h1>

        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
          <CookiePolicyDetails />
        </div>
      </div>
    </main>
  );
}
