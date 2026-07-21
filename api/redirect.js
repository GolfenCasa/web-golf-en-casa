import { getLinkBySlug, incrementLinkClick, normalizeSlug } from './_lib/store.js';

export async function GET(request) {
  const url = new URL(request.url);
  const slug = normalizeSlug(url.searchParams.get('slug'));
  if (!slug) return new Response('Enlace no encontrado', { status: 404 });

  const link = await getLinkBySlug(slug);
  if (!link || !link.active) {
    return Response.redirect('https://www.golfencasa.net/', 302);
  }

  // El contador no debe impedir la redirección si Redis falla temporalmente.
  incrementLinkClick(link).catch((error) => console.error('No se pudo registrar el clic', error));
  return Response.redirect(link.destination, 302);
}
