export default function PoliticaCookies() {
  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-emerald-400 hover:text-emerald-300">
          ← Volver a inicio
        </a>

        <h1 className="mt-8 text-4xl font-black">Política de Cookies</h1>

        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
          <p>
            Esta web utiliza cookies propias y de terceros para mejorar la
            experiencia del usuario y analizar el tráfico.
          </p>

          <h2 className="text-2xl font-bold text-white">Tipos de cookies</h2>
          <p>
            Cookies técnicas: permiten el funcionamiento básico de la web.
            <br />
            Cookies analíticas: ayudan a conocer el comportamiento de navegación.
            <br />
            Cookies publicitarias: pueden utilizarse para mostrar publicidad
            personalizada.
          </p>

          <h2 className="text-2xl font-bold text-white">Gestión de cookies</h2>
          <p>
            El usuario puede configurar o rechazar las cookies desde el banner de
            consentimiento o desde la configuración de su navegador.
          </p>
        </div>
      </div>
    </main>
  );
}