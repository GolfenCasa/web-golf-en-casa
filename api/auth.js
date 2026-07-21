import { clearSessionCookie, createSessionCookie, isAuthenticated, passwordMatches } from './_lib/auth.js';

export async function GET(request) {
  return Response.json({ authenticated: isAuthenticated(request) });
}

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (!passwordMatches(password)) {
    return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': createSessionCookie() } });
}

export async function DELETE() {
  return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } });
}
