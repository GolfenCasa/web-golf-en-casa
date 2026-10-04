import assert from 'node:assert/strict';
import { after, beforeEach, mock, test } from 'node:test';

const originalPassword = process.env.LINK_ADMIN_PASSWORD;
process.env.LINK_ADMIN_PASSWORD = 'local-qr-test-only';
const storedLink = {
  id: 'existing-marker', name: 'Marcador', slug: 'marcador', active: true,
  destination: 'https://aquigolf.es/', publicUrl: 'https://go.golfencasa.net/marcador',
  clicks: 14, lastClickAt: '2026-09-19T02:14:00Z', createdAt: '2026-09-01T00:00:00Z',
};
let values;
let entries;
const writes = [];
const redis = {
  async get(key) { return structuredClone(values.get(key)); },
  async lrange(key) { return key.endsWith(':links') ? [storedLink.id] : structuredClone(entries); },
  async set(key, value) { writes.push(key); values.set(key, structuredClone(value)); return 'OK'; },
  async lpush(key, entry) { entries.unshift(entry); },
  async ltrim() {},
};
mock.module('@upstash/redis', { namedExports: { Redis: { fromEnv: () => redis } } });
const [{ GET: listLinks, PUT: editLink }, { GET: redirect }, { createSessionCookie }] =
  await Promise.all([import('../api/links.js'), import('../api/redirect.js'), import('../api/_lib/auth.js')]);

beforeEach(() => {
  values = new Map([
    [`link-manager:link:${storedLink.id}`, structuredClone(storedLink)],
    ['link-manager:slug:marcador', storedLink.id],
  ]);
  entries = [{ id: 'prior-history', action: 'created', linkId: storedLink.id }];
  writes.length = 0;
});
after(() => {
  if (originalPassword === undefined) delete process.env.LINK_ADMIN_PASSWORD;
  else process.env.LINK_ADMIN_PASSWORD = originalPassword;
  mock.restoreAll();
});
const request = (url, options = {}) => new Request(url, {
  ...options, headers: { cookie: createSessionCookie().split(';')[0], 'content-type': 'application/json' },
});

test('existing stored QR is presented on the new domain without altering history or counters', async () => {
  const response = await listLinks(request('https://aquigolf.es/api/links'));
  const data = await response.json();
  assert.equal(data.links[0].publicUrl, 'https://aquigolf.es/qr/marcador');
  assert.deepEqual({ ...data.links[0], publicUrl: storedLink.publicUrl }, storedLink);
  assert.deepEqual(data.history, entries);
  assert.deepEqual(writes, []);
  assert.deepEqual(values.get(`link-manager:link:${storedLink.id}`), storedLink);
});

test('new QR reaches the existing destination and retains click accounting', async () => {
  const response = await redirect(request('https://aquigolf.es/api/redirect?slug=marcador'));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), storedLink.destination);
  await new Promise(setImmediate);
  assert.equal(values.get(`link-manager:link:${storedLink.id}`).clicks, 15);
});

test('editing the destination keeps the printed new QR and prior statistics valid', async () => {
  const destination = 'https://aquigolf.es/proyectos?utm_source=marcador&utm_medium=qr';
  const response = await editLink(request('https://aquigolf.es/api/links', {
    method: 'PUT', body: JSON.stringify({ ...storedLink, destination }),
  }));
  const link = await response.json();
  assert.equal(response.status, 200);
  assert.equal(link.publicUrl, 'https://aquigolf.es/qr/marcador');
  assert.equal(link.clicks, 14);
  assert.equal(link.createdAt, storedLink.createdAt);
  assert.equal(entries.at(-1).id, 'prior-history');
  const redirected = await redirect(request('https://aquigolf.es/api/redirect?slug=marcador'));
  assert.equal(redirected.headers.get('location'), destination);
  await new Promise(setImmediate);
});

test('the manager still requires authentication', async () => {
  const response = await listLinks(new Request('https://aquigolf.es/api/links'));
  assert.equal(response.status, 401);
  assert.deepEqual(writes, []);
});
