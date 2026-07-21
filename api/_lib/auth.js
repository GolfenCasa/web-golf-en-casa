import crypto from 'node:crypto';

const COOKIE_NAME = 'gec_link_admin';
const MAX_AGE = 60 * 60 * 12;

function secret() {
  const value = process.env.LINK_ADMIN_PASSWORD;
  if (!value) throw new Error('Falta LINK_ADMIN_PASSWORD');
  return value;
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

export function createSessionCookie() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${expires}`;
  const token = `${payload}.${sign(payload)}`;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function isAuthenticated(request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;
  const [expires, signature] = match[1].split('.');
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = sign(expires);
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function passwordMatches(candidate) {
  const a = Buffer.from(String(candidate || ''));
  const b = Buffer.from(secret());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
