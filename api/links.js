import { cleanSlug, isAuthorized, isValidHttpUrl, readLinks, writeLinks } from './_lib/linkStore.js';

const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request) {
  if (!isAuthorized(request)) return json({ error: 'No autorizado' }, 401);
  return json({ links: await readLinks() });
}

export async function POST(request) {
  if (!isAuthorized(request)) return json({ error: 'No autorizado' }, 401);
  const body = await request.json().catch(() => ({}));
  const slug = cleanSlug(body.slug);
  if (!slug) return json({ error: 'El alias es obligatorio' }, 400);
  if (!isValidHttpUrl(body.destination)) return json({ error: 'La URL de destino no es válida' }, 400);

  const links = await readLinks();
  if (links[slug]) return json({ error: 'Ese alias ya existe' }, 409);
  links[slug] = {
    destination: body.destination,
    active: body.active !== false,
    label: String(body.label || slug).trim(),
    clicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await writeLinks(links);
  return json({ links }, 201);
}

export async function PUT(request) {
  if (!isAuthorized(request)) return json({ error: 'No autorizado' }, 401);
  const body = await request.json().catch(() => ({}));
  const slug = cleanSlug(body.slug);
  if (!slug) return json({ error: 'El alias es obligatorio' }, 400);
  if (!isValidHttpUrl(body.destination)) return json({ error: 'La URL de destino no es válida' }, 400);

  const links = await readLinks();
  if (!links[slug]) return json({ error: 'Enlace no encontrado' }, 404);
  links[slug] = {
    ...links[slug],
    destination: body.destination,
    active: body.active !== false,
    label: String(body.label || slug).trim(),
    updatedAt: new Date().toISOString(),
  };
  await writeLinks(links);
  return json({ links });
}

export async function DELETE(request) {
  if (!isAuthorized(request)) return json({ error: 'No autorizado' }, 401);
  const url = new URL(request.url);
  const slug = cleanSlug(url.searchParams.get('slug'));
  const links = await readLinks();
  if (!links[slug]) return json({ error: 'Enlace no encontrado' }, 404);
  delete links[slug];
  await writeLinks(links);
  return json({ links });
}
