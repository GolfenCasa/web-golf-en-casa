import { get, put } from '@vercel/blob';

const PATHNAME = 'link-manager/links.json';

export async function readLinks() {
  const result = await get(PATHNAME, { access: 'private' });
  if (!result || result.statusCode !== 200 || !result.stream) return {};
  const text = await new Response(result.stream).text();
  if (!text.trim()) return {};
  const parsed = JSON.parse(text);
  return parsed && typeof parsed === 'object' ? parsed : {};
}

export async function writeLinks(links) {
  await put(PATHNAME, JSON.stringify(links, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export function cleanSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9-_]/g, '-');
}

export function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isAuthorized(request) {
  const configured = process.env.LINK_ADMIN_PASSWORD;
  if (!configured) return false;
  const header = request.headers.get('authorization') || '';
  return header === `Bearer ${configured}`;
}
