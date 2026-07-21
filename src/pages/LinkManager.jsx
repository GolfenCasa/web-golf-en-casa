import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Download, Edit3, ExternalLink, FolderOpen, History, Link2, LogOut, Plus, QrCode, Search, Trash2, X } from 'lucide-react';

const emptyForm = { id: '', name: '', slug: '', destination: 'https://www.golfencasa.net/instalacion-simuladores-golf', folder: 'Marketing', notes: '', active: true };

export default function LinkManager() {
  const [authenticated, setAuthenticated] = useState(null);
  const [password, setPassword] = useState('');
  const [data, setData] = useState({ links: [], history: [] });
  const [form, setForm] = useState(emptyForm);
  const [showEditor, setShowEditor] = useState(false);
  const [query, setQuery] = useState('');
  const [folder, setFolder] = useState('Todos');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { checkAuth(); }, []);

  async function checkAuth() {
    const res = await fetch('/api/auth');
    const json = await res.json();
    setAuthenticated(json.authenticated);
    if (json.authenticated) loadData();
  }

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setMessage(json.error || 'No se pudo acceder');
    setAuthenticated(true); setPassword(''); setMessage(''); loadData();
  }

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    setAuthenticated(false); setData({ links: [], history: [] });
  }

  async function loadData() {
    const res = await fetch('/api/links');
    if (res.status === 401) return setAuthenticated(false);
    setData(await res.json());
  }

  function openCreate() { setForm(emptyForm); setShowEditor(true); setMessage(''); }
  function openEdit(link) { setForm({ ...link }); setShowEditor(true); setMessage(''); }

  async function save(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    const res = await fetch('/api/links', { method: form.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const json = await res.json(); setBusy(false);
    if (!res.ok) return setMessage(json.error || 'No se pudo guardar');
    setShowEditor(false); await loadData();
  }

  async function remove(link) {
    if (!window.confirm(`¿Eliminar “${link.name}”? El QR dejará de funcionar.`)) return;
    const res = await fetch(`/api/links?id=${encodeURIComponent(link.id)}`, { method: 'DELETE' });
    if (!res.ok) return setMessage('No se pudo eliminar');
    await loadData();
  }

  async function copy(text) {
    await navigator.clipboard.writeText(text);
    setMessage('Enlace copiado'); window.setTimeout(() => setMessage(''), 1800);
  }

  async function downloadQr(link, type = 'png') {
    if (type === 'svg') {
      const svg = await QRCode.toString(link.publicUrl, { type: 'svg', errorCorrectionLevel: 'H', margin: 3, color: { dark: '#071a16', light: '#ffffff' } });
      downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), `${link.slug}-qr.svg`);
      return;
    }
    const dataUrl = await QRCode.toDataURL(link.publicUrl, { width: 1600, errorCorrectionLevel: 'H', margin: 4, color: { dark: '#071a16', light: '#ffffff' } });
    const a = document.createElement('a'); a.href = dataUrl; a.download = `${link.slug}-qr.png`; a.click();
  }

  function downloadBlob(blob, name) {
    const href = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = href; a.download = name; a.click(); URL.revokeObjectURL(href);
  }

  const folders = useMemo(() => ['Todos', ...new Set(data.links.map((l) => l.folder).filter(Boolean))], [data.links]);
  const filtered = useMemo(() => data.links.filter((link) => {
    const text = `${link.name} ${link.slug} ${link.destination} ${link.folder}`.toLowerCase();
    return (folder === 'Todos' || link.folder === folder) && text.includes(query.toLowerCase());
  }), [data.links, query, folder]);
  const totalClicks = data.links.reduce((sum, link) => sum + Number(link.clicks || 0), 0);

  if (authenticated === null) return <Centered><p>Comprobando acceso…</p></Centered>;
  if (!authenticated) return <Login password={password} setPassword={setPassword} onSubmit={login} busy={busy} message={message} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/95 px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div><p className="text-sm text-emerald-400">GOLF EN CASA</p><h1 className="text-xl font-semibold">Gestor de enlaces y QR</h1></div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5"><LogOut size={17}/>Salir</button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-7">
        <section className="grid gap-4 sm:grid-cols-3">
          <Metric label="Enlaces" value={data.links.length} icon={<Link2/>}/><Metric label="Escaneos/clics" value={totalClicks} icon={<QrCode/>}/><Metric label="Activos" value={data.links.filter(l=>l.active).length} icon={<ExternalLink/>}/>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <label className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-500" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar enlace…" className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-3 outline-none focus:border-emerald-500"/></label>
              <select value={folder} onChange={e=>setFolder(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5">{folders.map(f=><option key={f}>{f}</option>)}</select>
            </div>
            <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-slate-950 hover:bg-emerald-400"><Plus size={18}/>Nuevo enlace</button>
          </div>
          {message && <p className="mt-3 text-sm text-emerald-300">{message}</p>}
        </section>
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
          <div className="overflow-x-auto"><table className="w-full min-w-[940px] text-left"><thead className="border-b border-white/10 text-sm text-slate-400"><tr><th className="p-4">Enlace</th><th className="p-4">Destino</th><th className="p-4">Carpeta</th><th className="p-4">Clics</th><th className="p-4">Estado</th><th className="p-4 text-right">Acciones</th></tr></thead>
          <tbody>{filtered.map(link=><tr key={link.id} className="border-b border-white/5 last:border-0"><td className="p-4"><p className="font-medium">{link.name}</p><button onClick={()=>copy(link.publicUrl)} className="mt-1 text-sm text-emerald-400 hover:underline">go.golfencasa.net/{link.slug}</button></td><td className="max-w-xs p-4"><a href={link.destination} target="_blank" rel="noreferrer" className="block truncate text-sm text-slate-300 hover:text-white">{link.destination}</a></td><td className="p-4"><span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-sm"><FolderOpen size={14}/>{link.folder}</span></td><td className="p-4 font-medium">{link.clicks || 0}</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs ${link.active?'bg-emerald-500/15 text-emerald-300':'bg-amber-500/15 text-amber-300'}`}>{link.active?'Activo':'Pausado'}</span></td><td className="p-4"><div className="flex justify-end gap-1"><IconButton title="Copiar" onClick={()=>copy(link.publicUrl)}><Copy/></IconButton><IconButton title="QR PNG" onClick={()=>downloadQr(link,'png')}><Download/></IconButton><IconButton title="QR SVG" onClick={()=>downloadQr(link,'svg')}><QrCode/></IconButton><IconButton title="Editar" onClick={()=>openEdit(link)}><Edit3/></IconButton><IconButton title="Eliminar" onClick={()=>remove(link)} danger><Trash2/></IconButton></div></td></tr>)}</tbody></table></div>
          {!filtered.length && <div className="p-10 text-center text-slate-400">No hay enlaces que coincidan.</div>}
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><div className="mb-4 flex items-center gap-2"><History size={19} className="text-emerald-400"/><h2 className="font-medium">Actividad reciente</h2></div><div className="space-y-2 text-sm">{data.history.slice(0,8).map(h=><div key={h.id} className="flex justify-between gap-4 border-b border-white/5 py-2 last:border-0"><span><b>{h.name}</b> · {h.action==='created'?'creado':h.action==='updated'?'actualizado':'eliminado'}</span><time className="text-slate-500">{new Date(h.at).toLocaleString('es-ES')}</time></div>)}{!data.history.length&&<p className="text-slate-500">Todavía no hay actividad.</p>}</div></section>
      </main>
      {showEditor && <Editor form={form} setForm={setForm} onClose={()=>setShowEditor(false)} onSave={save} busy={busy} message={message}/>} 
    </div>
  );
}

function Login({password,setPassword,onSubmit,busy,message}) { return <Centered><form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-7"><p className="text-sm text-emerald-400">GOLF EN CASA</p><h1 className="mt-1 text-2xl font-semibold">Acceso al gestor</h1><p className="mt-2 text-sm text-slate-400">Administra los enlaces de tus QR dinámicos.</p><label className="mt-6 block text-sm">Contraseña<input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 outline-none focus:border-emerald-500"/></label>{message&&<p className="mt-3 text-sm text-red-300">{message}</p>}<button disabled={busy} className="mt-5 w-full rounded-xl bg-emerald-500 py-3 font-medium text-slate-950 disabled:opacity-60">{busy?'Accediendo…':'Entrar'}</button></form></Centered> }
function Centered({children}) { return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">{children}</div> }
function Metric({label,value,icon}) { return <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><div className="flex items-center justify-between text-slate-400"><span>{label}</span><span className="text-emerald-400">{icon}</span></div><p className="mt-3 text-3xl font-semibold">{value}</p></div> }
function IconButton({children,title,onClick,danger}) { return <button title={title} onClick={onClick} className={`rounded-lg p-2 hover:bg-white/10 [&_svg]:h-4 [&_svg]:w-4 ${danger?'text-red-300':'text-slate-300'}`}>{children}</button> }
function Editor({form,setForm,onClose,onSave,busy,message}) { const update=(key,value)=>setForm(prev=>({...prev,[key]:value})); return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"><form onSubmit={onSave} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 text-white"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{form.id?'Editar enlace':'Nuevo enlace'}</h2><button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10"><X/></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Nombre"><input required value={form.name} onChange={e=>update('name',e.target.value)}/></Field><Field label="Alias"><input required value={form.slug} onChange={e=>update('slug',e.target.value)} placeholder="camiseta"/></Field><Field label="Carpeta"><input value={form.folder} onChange={e=>update('folder',e.target.value)}/></Field><label className="flex items-center gap-3 pt-7"><input type="checkbox" checked={form.active} onChange={e=>update('active',e.target.checked)} className="h-5 w-5"/>Enlace activo</label></div><Field label="URL de destino" full><input required type="url" value={form.destination} onChange={e=>update('destination',e.target.value)}/></Field><Field label="Notas" full><textarea rows="3" value={form.notes} onChange={e=>update('notes',e.target.value)}/></Field><div className="mt-3 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">URL pública: https://go.golfencasa.net/{form.slug || 'alias'}</div>{message&&<p className="mt-3 text-sm text-red-300">{message}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border border-white/15 px-4 py-2.5">Cancelar</button><button disabled={busy} className="rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-slate-950 disabled:opacity-60">{busy?'Guardando…':'Guardar'}</button></div></form></div> }
function Field({label,children,full}) { return <label className={`mt-4 block text-sm ${full?'':' '}`}><span className="text-slate-300">{label}</span><div className="mt-2 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-slate-900 [&_input]:px-3 [&_input]:py-2.5 [&_input]:outline-none [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-slate-900 [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:outline-none">{children}</div></label> }
