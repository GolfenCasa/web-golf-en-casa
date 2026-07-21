import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Download, ExternalLink, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';

const PUBLIC_BASE = 'https://go.golfencasa.net';

export default function LinkManager() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('linkAdminPassword') || '');
  const [authenticated, setAuthenticated] = useState(false);
  const [links, setLinks] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ slug: '', label: '', destination: '', active: true });

  const rows = useMemo(() => Object.entries(links).sort(([a], [b]) => a.localeCompare(b)), [links]);

  async function api(path = '', options = {}) {
    const response = await fetch(`/api/links${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}`, ...(options.headers || {}) },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Se ha producido un error');
    return data;
  }

  async function load() {
    setBusy(true); setError('');
    try {
      const data = await api();
      setLinks(data.links || {});
      setAuthenticated(true);
      sessionStorage.setItem('linkAdminPassword', password);
    } catch (e) { setError(e.message); setAuthenticated(false); }
    finally { setBusy(false); }
  }

  useEffect(() => { if (password) load(); }, []);

  function resetForm() {
    setEditing(null);
    setForm({ slug: '', label: '', destination: '', active: true });
  }

  async function save(e) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const data = await api('', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(form) });
      setLinks(data.links || {}); resetForm();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function remove(slug) {
    if (!confirm(`¿Eliminar el enlace /${slug}?`)) return;
    setBusy(true);
    try { const data = await api(`?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' }); setLinks(data.links || {}); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function downloadQr(slug) {
    const link = `${PUBLIC_BASE}/${slug}`;
    const dataUrl = await QRCode.toDataURL(link, { width: 1400, margin: 3, errorCorrectionLevel: 'H' });
    const a = document.createElement('a'); a.href = dataUrl; a.download = `qr-${slug}.png`; a.click();
  }

  if (!authenticated) {
    return <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white"><div className="mx-auto max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><h1 className="text-2xl font-semibold">Gestor de enlaces</h1><p className="mt-2 text-zinc-400">Introduce la contraseña administrativa configurada en Vercel.</p><form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); load(); }}><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3" placeholder="Contraseña" autoFocus /><button disabled={busy || !password} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium disabled:opacity-50">{busy ? 'Comprobando…' : 'Acceder'}</button>{error && <p className="text-sm text-red-400">{error}</p>}</form></div></main>;
  }

  return <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white"><div className="mx-auto max-w-6xl"><header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-semibold">Gestor de enlaces QR</h1><p className="mt-1 text-zinc-400">Enlaces dinámicos bajo {PUBLIC_BASE}</p></div><button onClick={() => { sessionStorage.removeItem('linkAdminPassword'); setAuthenticated(false); setPassword(''); }} className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2"><LogOut size={18}/>Salir</button></header>
  {error && <div className="mt-6 rounded-xl border border-red-900 bg-red-950/40 p-4 text-red-300">{error}</div>}
  <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-xl font-medium">{editing ? 'Editar enlace' : 'Crear enlace'}</h2><form onSubmit={save} className="mt-4 grid gap-4 md:grid-cols-2"><label className="text-sm">Alias<input disabled={!!editing} value={form.slug} onChange={(e) => setForm({...form, slug:e.target.value})} placeholder="camiseta" className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 disabled:opacity-60" required/></label><label className="text-sm">Nombre interno<input value={form.label} onChange={(e) => setForm({...form, label:e.target.value})} placeholder="QR camiseta corporativa" className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2"/></label><label className="text-sm md:col-span-2">URL de destino<input type="url" value={form.destination} onChange={(e) => setForm({...form, destination:e.target.value})} placeholder="https://www.golfencasa.net/instalacion-simuladores-golf?utm_source=camiseta&utm_medium=qr&utm_campaign=branding" className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2" required/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active:e.target.checked})}/> Enlace activo</label><div className="flex justify-end gap-3"><button type="button" onClick={resetForm} className="rounded-xl border border-zinc-700 px-4 py-2">Limpiar</button><button disabled={busy} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-medium"><Plus size={18}/>{editing ? 'Guardar cambios' : 'Crear enlace'}</button></div></form></section>
  <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800"><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead className="bg-zinc-900 text-sm text-zinc-400"><tr><th className="p-4">Nombre</th><th className="p-4">Enlace público</th><th className="p-4">Destino</th><th className="p-4">Clics</th><th className="p-4">Estado</th><th className="p-4">Acciones</th></tr></thead><tbody>{rows.map(([slug, item]) => <tr key={slug} className="border-t border-zinc-800"><td className="p-4">{item.label || slug}</td><td className="p-4"><span className="text-emerald-400">{PUBLIC_BASE}/{slug}</span></td><td className="max-w-xs truncate p-4 text-zinc-400" title={item.destination}>{item.destination}</td><td className="p-4">{item.clicks || 0}</td><td className="p-4">{item.active ? <span className="text-emerald-400">Activo</span> : <span className="text-zinc-500">Inactivo</span>}</td><td className="p-4"><div className="flex gap-2"><button title="Copiar" onClick={() => navigator.clipboard.writeText(`${PUBLIC_BASE}/${slug}`)} className="rounded-lg border border-zinc-700 p-2"><Copy size={17}/></button><a title="Abrir" href={`${PUBLIC_BASE}/${slug}`} target="_blank" rel="noreferrer" className="rounded-lg border border-zinc-700 p-2"><ExternalLink size={17}/></a><button title="Descargar QR" onClick={() => downloadQr(slug)} className="rounded-lg border border-zinc-700 p-2"><Download size={17}/></button><button title="Editar" onClick={() => {setEditing(slug); setForm({slug,label:item.label||'',destination:item.destination,active:item.active}); window.scrollTo({top:0,behavior:'smooth'});}} className="rounded-lg border border-zinc-700 p-2"><Pencil size={17}/></button><button title="Eliminar" onClick={() => remove(slug)} className="rounded-lg border border-red-900 p-2 text-red-400"><Trash2 size={17}/></button></div></td></tr>)}{rows.length===0 && <tr><td colSpan="6" className="p-8 text-center text-zinc-500">Todavía no hay enlaces.</td></tr>}</tbody></table></div></section>
  </div></main>;
}
