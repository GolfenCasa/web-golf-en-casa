import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const LINKS_INDEX_KEY = 'link-manager:links';
const HISTORY_KEY = 'link-manager:history';
const HISTORY_LIMIT = 250;

function linkKey(id) {
  return `link-manager:link:${id}`;
}

function slugKey(slug) {
  return `link-manager:slug:${slug}`;
}

export async function readStore() {
  const ids = (await redis.lrange(LINKS_INDEX_KEY, 0, -1)) || [];
  const links = ids.length ? await Promise.all(ids.map((id) => redis.get(linkKey(id)))) : [];
  const history = (await redis.lrange(HISTORY_KEY, 0, HISTORY_LIMIT - 1)) || [];
  return {
    version: 2,
    links: links.filter(Boolean),
    history: history.filter(Boolean),
  };
}

export async function getLinkBySlug(slug) {
  const id = await redis.get(slugKey(slug));
  if (!id) return null;
  return redis.get(linkKey(id));
}

export async function createLink(link, historyEntry) {
  const claimed = await redis.set(slugKey(link.slug), link.id, { nx: true });
  if (!claimed) {
    const error = new Error('Ese alias ya existe');
    error.code = 'SLUG_EXISTS';
    throw error;
  }

  try {
    await Promise.all([
      redis.set(linkKey(link.id), link),
      redis.lpush(LINKS_INDEX_KEY, link.id),
      appendHistory(historyEntry),
    ]);
  } catch (error) {
    await redis.del(slugKey(link.slug));
    throw error;
  }
  return link;
}

export async function updateLink(previous, link, historyEntry) {
  if (previous.slug !== link.slug) {
    const claimed = await redis.set(slugKey(link.slug), link.id, { nx: true });
    if (!claimed) {
      const error = new Error('Ese alias ya existe');
      error.code = 'SLUG_EXISTS';
      throw error;
    }
  }

  try {
    await Promise.all([
      redis.set(linkKey(link.id), link),
      appendHistory(historyEntry),
    ]);
    if (previous.slug !== link.slug) await redis.del(slugKey(previous.slug));
  } catch (error) {
    if (previous.slug !== link.slug) await redis.del(slugKey(link.slug));
    throw error;
  }
  return link;
}

export async function deleteLink(link, historyEntry) {
  await Promise.all([
    redis.del(linkKey(link.id)),
    redis.del(slugKey(link.slug)),
    redis.lrem(LINKS_INDEX_KEY, 0, link.id),
    appendHistory(historyEntry),
  ]);
}

export async function incrementLinkClick(link) {
  const fresh = await redis.get(linkKey(link.id));
  if (!fresh) return null;
  const updated = {
    ...fresh,
    clicks: Number(fresh.clicks || 0) + 1,
    lastClickAt: new Date().toISOString(),
  };
  await redis.set(linkKey(link.id), updated);
  return updated;
}

async function appendHistory(entry) {
  if (!entry) return;
  await redis.lpush(HISTORY_KEY, entry);
  await redis.ltrim(HISTORY_KEY, 0, HISTORY_LIMIT - 1);
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
