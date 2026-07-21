import { cleanSlug, readLinks, writeLinks } from './_lib/linkStore.js';

export async function GET(request) {
  const url = new URL(request.url);
  const slug = cleanSlug(url.searchParams.get('slug'));
  const links = await readLinks();
  const link = links[slug];

  if (!link || !link.active) {
    return Response.redirect('https://www.golfencasa.net/', 302);
  }

  // Contador orientativo. Si dos clics llegan exactamente a la vez puede perderse alguno.
  links[slug] = { ...link, clicks: Number(link.clicks || 0) + 1, lastClickAt: new Date().toISOString() };
  writeLinks(links).catch(() => {});

  return Response.redirect(link.destination, 302);
}
