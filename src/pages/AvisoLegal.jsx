export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-emerald-400 hover:text-emerald-300">
          ← Volver a inicio
        </a>

        <h1 className="mt-8 text-4xl font-black">Aviso Legal</h1>

        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
          <p>
            Titular: Francisco Menacho Valle
            <br />
            Nombre comercial: Golf en Casa
            <br />
            Correo electrónico: info@golfencasa.net
            <br />
            Sitio web: https://www.golfencasa.net
          </p>

          <h2 className="text-2xl font-bold text-white">Objeto</h2>
          <p>
            La presente página web tiene por objeto ofrecer servicios de
            asesoramiento, diseño e instalación de simuladores de golf.
          </p>

          <h2 className="text-2xl font-bold text-white">Propiedad intelectual</h2>
          <p>
            Todos los contenidos de esta web, incluyendo textos, imágenes,
            logotipos, vídeos y diseños son propiedad de Golf en Casa o de sus
            respectivos titulares.
          </p>

          <h2 className="text-2xl font-bold text-white">Responsabilidad</h2>
          <p>
            Golf en Casa no se responsabiliza del uso indebido de los contenidos
            publicados ni de posibles daños derivados del acceso a la web.
          </p>
        </div>
      </div>
    </main>
  );
}