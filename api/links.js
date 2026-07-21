import crypto from 'node:crypto';
import { isAuthenticated } from './_lib/auth.js';
import {
  createLink,
  deleteLink,
  normalizeSlug,
  publicLink,
  readStore,
  updateLink,
} from './_lib/store.js';

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

function history(action, link, at = new Date().toISOString()) {
  return { id: crypto.randomUUID(), action, linkId: link.id, name: link.name, at };
}

export async function GET(request) {
  if (!isAuthenticated(request)) return unauthorized();
  return Response.json(await readStore());
}

export async function POST(request) {
  if (!isAuthenticated(request)) return unauthorized();
  try {
    const link = sanitizeLink(await request.json());
    await createLink(link, history('created', link, link.createdAt));
    return Response.json(link, { status: 201 });
  } catch (error) {
    const status = error.code === 'SLUG_EXISTS' ? 409 : 400;
    return Response.json({ error: error.message || 'No se pudo crear' }, { status });
  }
}

export async function PUT(request) {
  if (!isAuthenticated(request)) return unauthorized();
  try {
    const body = await request.json();
    const store = await readStore();
    const previous = store.links.find((item) => item.id === body.id);
    if (!previous) return Response.json({ error: 'Enlace no encontrado' }, { status: 404 });
    const link = sanitizeLink(body, previous);
    await updateLink(previous, link, history('updated', link, link.updatedAt));
    return Response.json(link);
  } catch (error) {
    const status = error.code === 'SLUG_EXISTS' ? 409 : 400;
    return Response.json({ error: error.message || 'No se pudo actualizar' }, { status });
  }
}

export async function DELETE(request) {
  if (!isAuthenticated(request)) return unauthorized();
  const id = new URL(request.url).searchParams.get('id');
  const store = await readStore();
  const link = store.links.find((item) => item.id === id);
  if (!link) return Response.json({ error: 'Enlace no encontrado' }, { status: 404 });
  await deleteLink(link, history('deleted', link));
  return Response.json({ ok: true });
}
