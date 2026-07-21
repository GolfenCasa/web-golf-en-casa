import { normalizeSlug, readStore, writeStore } from './_lib/store.js';

export async function GET(request) {
  const url = new URL(request.url);
  const slug = normalizeSlug(url.searchParams.get('slug'));
  if (!slug) return new Response('Enlace no encontrado', { status: 404 });

  const store = await readStore();
  const index = store.links.findIndex((item) => item.slug === slug);
  if (index < 0 || !store.links[index].active) {
    return Response.redirect('https://www.golfencasa.net/', 302);
  }

  const link = store.links[index];
  link.clicks = Number(link.clicks || 0) + 1;
  link.lastClickAt = new Date().toISOString();
  store.links[index] = link;
  // El contador no debe impedir la redirección si el guardado falla.
  writeStore(store).catch((error) => console.error('No se pudo registrar el clic', error));
  return Response.redirect(link.destination, 302);
}
