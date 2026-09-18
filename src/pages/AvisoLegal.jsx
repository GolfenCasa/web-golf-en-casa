import { Helmet } from "react-helmet-async";

export default function AvisoLegal() {
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
        <title>Aviso legal | Aquí Golf</title>
        <meta
          name="description"
          content="Información legal sobre la titularidad y las condiciones de uso del sitio web de Aquí Golf."
        />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://aquigolf.es/aviso-legal" />
      </Helmet>
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={handleBack}
          className="text-emerald-400 transition hover:text-emerald-300"
        >
          ← Volver
        </button>

        <h1 className="mt-8 text-4xl font-black">Aviso Legal</h1>

        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
          <p>
            Titular: Francisco Menacho Valle
            <br />
            Nombre comercial: Aquí Golf
            <br />
            Correo electrónico: info@aquigolf.es
            <br />
            Sitio web: https://aquigolf.es
          </p>

          <h2 className="text-2xl font-bold text-white">Objeto</h2>
          <p>
            La presente página web tiene por objeto ofrecer servicios de
            asesoramiento, diseño e instalación de simuladores de golf.
          </p>

          <h2 className="text-2xl font-bold text-white">Propiedad intelectual</h2>
          <p>
            Todos los contenidos de esta web, incluyendo textos, imágenes,
            logotipos, vídeos y diseños son propiedad de Aquí Golf o de sus
            respectivos titulares.
          </p>

          <h2 className="text-2xl font-bold text-white">Responsabilidad</h2>
          <p>
            Aquí Golf no se responsabiliza del uso indebido de los contenidos
            publicados ni de posibles daños derivados del acceso a la web.
          </p>
        </div>
      </div>
    </main>
  );
}
