import { Helmet } from "react-helmet-async";

export default function PoliticaPrivacidad() {
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
        <title>Política de privacidad | Golf en Casa</title>
        <meta
          name="description"
          content="Información sobre el tratamiento de datos personales realizado por Golf en Casa."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.golfencasa.net/politica-privacidad" />
      </Helmet>
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={handleBack}
          className="text-emerald-400 transition hover:text-emerald-300"
        >
          ← Volver
        </button>

        <h1 className="mt-8 text-4xl font-black">Política de Privacidad</h1>

        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
          <p className="text-sm text-zinc-400">
            Versión de esta política: 2026-09-03 (3 de septiembre de 2026).
          </p>

          <p>
            Responsable del tratamiento: Francisco Menacho
            <br />
            Email: info@golfencasa.net
          </p>

          <h2 className="text-2xl font-bold text-white">Finalidad</h2>
          <p>
            Los datos facilitados mediante formularios, correo electrónico o
            reservas de consultoría serán utilizados para gestionar consultas,
            elaborar presupuestos, prestar servicios y mantener comunicaciones
            relacionadas con el servicio solicitado.
          </p>

          <h2 className="text-2xl font-bold text-white">Legitimación</h2>
          <p>
            La base legal para el tratamiento de los datos es el consentimiento
            del interesado y la ejecución de medidas precontractuales.
          </p>

          <h2 className="text-2xl font-bold text-white">Destinatarios</h2>
          <p>
            Los datos podrán ser tratados por proveedores necesarios para la
            prestación del servicio, como Google, Calendly, Vercel o SiteGround.
          </p>

          <h2 className="text-2xl font-bold text-white">Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión,
            oposición, limitación y portabilidad escribiendo a:
            info@golfencasa.net.
          </p>
        </div>
      </div>
    </main>
  );
}
