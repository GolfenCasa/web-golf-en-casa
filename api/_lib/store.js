import { get, put } from '@vercel/blob';

const PATHNAME = 'link-manager/data.json';
const EMPTY = { version: 1, links: [], history: [] };

export async function readStore() {
  try {
    const result = await get(PATHNAME, { access: 'private' });
    if (!result || result.statusCode !== 200) return structuredClone(EMPTY);
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text);
    return {
      version: 1,
      links: Array.isArray(parsed.links) ? parsed.links : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch (error) {
    if (String(error?.message || '').toLowerCase().includes('not found')) return structuredClone(EMPTY);
    throw error;
  }
}

export async function writeStore(data) {
  const safe = {
    version: 1,
    links: data.links || [],
    history: (data.history || []).slice(0, 250),
  };
  await put(PATHNAME, JSON.stringify(safe, null, 2), {
    access: 'private',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
  return safe;
}

export function normalizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function publicLink(slug) {
  return `https://go.golfencasa.net/${slug}`;
}
