import crypto from 'node:crypto';
import { isAuthenticated } from './_lib/auth.js';
import { normalizeSlug, publicLink, readStore, writeStore } from './_lib/store.js';

function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}

function sanitizeLink(body, previous = {}) {
  const slug = normalizeSlug(body.slug);
  if (!slug) throw new Error('El alias es obligatorio');
  const destination = String(body.destination || '').trim();
  const url = new URL(destination);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('URL no válida');
  const now = new Date().toISOString();
  return {
    id: previous.id || crypto.randomUUID(),
    name: String(body.name || slug).trim().slice(0, 100),
    slug,
    destination: url.toString(),
    folder: String(body.folder || 'Marketing').trim().slice(0, 50),
    notes: String(body.notes || '').trim().slice(0, 500),
    active: body.active !== false,
    clicks: Number(previous.clicks || 0),
    lastClickAt: previous.lastClickAt || null,
    createdAt: previous.createdAt || now,
    updatedAt: now,
    publicUrl: publicLink(slug),
  };
}

export async function GET(request) {
  if (!isAuthenticated(request)) return unauthorized();
  const store = await readStore();
  return Response.json(store);
}

export async function POST(request) {
  if (!isAuthenticated(request)) return unauthorized();
  try {
    const body = await request.json();
    const store = await readStore();
    const link = sanitizeLink(body);
    if (store.links.some((item) => item.slug === link.slug)) {
      return Response.json({ error: 'Ese alias ya existe' }, { status: 409 });
    }
    store.links.unshift(link);
    store.history.unshift({ id: crypto.randomUUID(), action: 'created', linkId: link.id, name: link.name, at: link.createdAt });
    await writeStore(store);
    return Response.json(link, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message || 'No se pudo crear' }, { status: 400 });
  }
}

export async function PUT(request) {
  if (!isAuthenticated(request)) return unauthorized();
  try {
    const body = await request.json();
    const store = await readStore();
    const index = store.links.findIndex((item) => item.id === body.id);
    if (index < 0) return Response.json({ error: 'Enlace no encontrado' }, { status: 404 });
    const link = sanitizeLink(body, store.links[index]);
    if (store.links.some((item, i) => i !== index && item.slug === link.slug)) {
      return Response.json({ error: 'Ese alias ya existe' }, { status: 409 });
    }
    store.links[index] = link;
    store.history.unshift({ id: crypto.randomUUID(), action: 'updated', linkId: link.id, name: link.name, at: link.updatedAt });
    await writeStore(store);
    return Response.json(link);
  } catch (error) {
    return Response.json({ error: error.message || 'No se pudo actualizar' }, { status: 400 });
  }
}

export async function DELETE(request) {
  if (!isAuthenticated(request)) return unauthorized();
  const id = new URL(request.url).searchParams.get('id');
  const store = await readStore();
  const link = store.links.find((item) => item.id === id);
  if (!link) return Response.json({ error: 'Enlace no encontrado' }, { status: 404 });
  store.links = store.links.filter((item) => item.id !== id);
  store.history.unshift({ id: crypto.randomUUID(), action: 'deleted', linkId: link.id, name: link.name, at: new Date().toISOString() });
  await writeStore(store);
  return Response.json({ ok: true });
}
