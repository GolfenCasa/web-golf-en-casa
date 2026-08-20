import { useEffect, useMemo, useState } from 'react';
import {
  createBrandedQrPng,
  createBrandedQrSvg,
  createPhysicalQrSvg,
  createPhysicalTokenPreview,
  createTokenBaseSvg,
  createTokenLogoSvg,
  getPhysicalQrMetrics,
    getPhysicalQrObject,
} from '../utils-branded-qr.js';
import {
  Activity, BarChart3, Check, CircleHelp, Copy, Download, Edit3, Eye, FolderOpen,
  Gauge, History, Home, Link2, LogOut, Menu, Plus, QrCode, Search, Settings,
  Trash2, X
} from 'lucide-react';
import { createBaseStl, createQrStl, createLogoStl, downloadStl } from '../physical-stl.js';

const emptyForm = {
  id: '',
  name: '',
  slug: '',
  destination: 'https://www.golfencasa.net/instalacion-simuladores-golf',
  folder: 'Marketing',
  notes: '',
  active: true,
};

export default function LinkManager() {
  const [authenticated, setAuthenticated] = useState(null);
  const [password, setPassword] = useState('');
  const [data, setData] = useState({ links: [], history: [] });
  const [form, setForm] = useState(emptyForm);
  const [showEditor, setShowEditor] = useState(false);
  const [showCreateChoice, setShowCreateChoice] = useState(false);
  const [createMode, setCreateMode] = useState('corporate');
  const [pendingTokenAfterSave, setPendingTokenAfterSave] = useState(false);
  const [query, setQuery] = useState('');
  const [folder, setFolder] = useState('Todos');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [tokenPreview, setTokenPreview] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

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
    const res = await fetch('/api/auth', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setMessage(json.error || 'No se pudo acceder');
    setAuthenticated(true);
    setPassword('');
    setMessage('');
    loadData();
  }

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setData({ links: [], history: [] });
  }

  async function loadData() {
    const res = await fetch('/api/links');
    if (res.status === 401) return setAuthenticated(false);
    setData(await res.json());
  }

  function openCreate() {
    setShowCreateChoice(true);
    setMessage('');
  }

  function openCreateCorporate() {
    setCreateMode('corporate');
    setPendingTokenAfterSave(false);
    setForm(emptyForm);
    setShowCreateChoice(false);
    setShowEditor(true);
    setMessage('');
  }

  function openCreatePhysical() {
    setCreateMode('physical');
    setPendingTokenAfterSave(true);
    setForm({ ...emptyForm, name: 'Marcador / llavero QR 3D', folder: 'Marketing' });
    setShowCreateChoice(false);
    setShowEditor(true);
    setMessage('');
  }

  function openEdit(link) {
    setCreateMode('corporate');
    setPendingTokenAfterSave(false);
    setForm({ ...link });
    setShowEditor(true);
    setMessage('');
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const res = await fetch('/api/links', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setMessage(json.error || 'No se pudo guardar');
    setShowEditor(false);

    if (pendingTokenAfterSave && !form.id) {
      const createdLink = json.link || json;
      const physicalLink = {
        ...form,
        ...createdLink,
        publicUrl: createdLink.publicUrl || `https://go.golfencasa.net/${createdLink.slug || form.slug}`,
      };
      setPendingTokenAfterSave(false);
      setTokenPreview(physicalLink);
    }

    await loadData();
  }

  async function remove(link) {
    if (!window.confirm(`¿Eliminar “${link.name}”? El QR dejará de funcionar.`)) return;
    const res = await fetch(`/api/links?id=${encodeURIComponent(link.id)}`, { method: 'DELETE' });
    if (!res.ok) return setMessage('No se pudo eliminar');
    await loadData();
  }

  async function copy(text) {
    await navigator.clipboard.writeText(text);
    setMessage('Enlace copiado');
    window.setTimeout(() => setMessage(''), 1800);
  }

  async function downloadQr(link, type = 'png') {
    try {
      setMessage('Generando QR corporativo…');
      if (type === 'svg') {
        const svg = await createBrandedQrSvg(link.publicUrl);
        downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), `${link.slug}-qr-corporativo.svg`);
      } else {
        const dataUrl = await createBrandedQrPng(link.publicUrl);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${link.slug}-qr-corporativo.png`;
        a.click();
      }
      setMessage(`QR ${type.toUpperCase()} descargado`);
      window.setTimeout(() => setMessage(''), 1800);
    } catch (error) {
      console.error(error);
      setMessage('No se pudo generar el QR corporativo');
    }
  }

  async function previewQr(link) {
    setPreviewBusy(true);
    setPreview({ link, dataUrl: null });
    try {
      const dataUrl = await createBrandedQrPng(link.publicUrl);
      setPreview({ link, dataUrl });
    } catch (error) {
      console.error(error);
      setPreview(null);
      setMessage('No se pudo generar la vista previa');
    } finally {
      setPreviewBusy(false);
    }
  }

  function downloadBlob(blob, name) {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    a.click();
    URL.revokeObjectURL(href);
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
    <div className="min-h-screen bg-[#020817] text-slate-100">
      <header className="fixed inset-x-0 top-0 z-40 h-20 border-b border-white/10 bg-[#020817]/95 backdrop-blur">
        <div className="flex h-full items-center justify-between px-5 lg:px-7">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 text-slate-300 hover:bg-white/5 lg:hidden" onClick={() => setMobileNav(true)}><Menu /></button>
            <div><p className="text-sm font-medium tracking-wide text-emerald-400">GOLF EN CASA</p><h1 className="text-xl font-semibold">Gestor de enlaces y QR</h1></div>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:bg-white/5"><LogOut size={17}/>Salir</button>
        </div>
      </header>

      <Sidebar open={mobileNav} onClose={() => setMobileNav(false)} />

      <main className="min-h-screen px-5 pb-10 pt-28 lg:ml-52 lg:px-7">
        <div className="mx-auto max-w-[1320px] space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <Metric label="Enlaces" value={data.links.length} icon={<Link2/>}/>
            <Metric label="Escaneos/clics" value={totalClicks} icon={<QrCode/>}/>
            <Metric label="Activos" value={data.links.filter((l) => l.active).length} icon={<Gauge/>}/>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0a1122] p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-slate-500" size={20}/>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar enlace…" className="w-full rounded-xl border border-white/10 bg-[#0d172b] py-3 pl-12 pr-4 outline-none focus:border-emerald-500"/>
              </label>
              <select value={folder} onChange={(e) => setFolder(e.target.value)} className="rounded-xl border border-white/10 bg-[#0d172b] px-4 py-3">{folders.map((f) => <option key={f}>{f}</option>)}</select>
              <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400"><Plus size={19}/>Nuevo enlace</button>
            </div>
            {message && <p className="mt-3 text-sm text-emerald-300">{message}</p>}
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1122]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead className="border-b border-white/10 text-sm text-slate-400"><tr><th className="p-5">Enlace</th><th className="p-5">Destino</th><th className="p-5">Carpeta</th><th className="p-5">Clics</th><th className="p-5">Estado</th><th className="p-5 text-right">Acciones</th></tr></thead>
                <tbody>{filtered.map((link) => <tr key={link.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.018]"><td className="p-5"><p className="font-medium">{link.name}</p><button onClick={() => copy(link.publicUrl)} className="mt-1 text-sm text-emerald-400 hover:underline">go.golfencasa.net/{link.slug}</button></td><td className="max-w-xs p-5"><a href={link.destination} target="_blank" rel="noreferrer" className="block truncate text-sm text-slate-300 hover:text-white">{link.destination}</a></td><td className="p-5"><span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-sm"><FolderOpen size={14}/>{link.folder}</span></td><td className="p-5 font-medium">{link.clicks || 0}</td><td className="p-5"><span className={`rounded-full px-2.5 py-1 text-xs ${link.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-500/15 text-slate-400'}`}>{link.active ? 'Activo' : 'Pausado'}</span></td><td className="p-5"><div className="flex justify-end gap-1"><IconButton title="Vista previa" onClick={() => previewQr(link)}><Eye/></IconButton><IconButton title="Marcador / llavero 3D" onClick={() => setTokenPreview(link)}><Settings/></IconButton><IconButton title="Copiar enlace" onClick={() => copy(link.publicUrl)}><Copy/></IconButton><IconButton title="Descargar PNG" onClick={() => downloadQr(link, 'png')}><Download/></IconButton><IconButton title="Descargar SVG" onClick={() => downloadQr(link, 'svg')}><QrCode/></IconButton><IconButton title="Editar" onClick={() => openEdit(link)}><Edit3/></IconButton><IconButton title="Eliminar" onClick={() => remove(link)} danger><Trash2/></IconButton></div></td></tr>)}</tbody>
              </table>
            </div>
            {!filtered.length && <div className="p-14 text-center text-slate-400">No hay enlaces que coincidan.</div>}
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0a1122] p-6">
            <div className="mb-4 flex items-center gap-2"><History size={19} className="text-emerald-400"/><h2 className="font-medium">Actividad reciente</h2></div>
            <div className="space-y-2 text-sm">{data.history.slice(0, 8).map((h) => <div key={h.id} className="flex justify-between gap-4 border-b border-white/5 py-2 last:border-0"><span><b>{h.name}</b> · {h.action === 'created' ? 'creado' : h.action === 'updated' ? 'actualizado' : 'eliminado'}</span><time className="text-slate-500">{new Date(h.at).toLocaleString('es-ES')}</time></div>)}{!data.history.length && <p className="text-slate-500">Todavía no hay actividad.</p>}</div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2"><QrCode size={19} className="text-emerald-400"/><h2 className="font-medium">Marcadores y llaveros 3D</h2></div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Genera un QR técnico sin decoración, con módulos cuadrados y zona silenciosa de 4 módulos, preparado para importarlo como geometría en Bambu Studio. El logo se descarga por separado para la cara opuesta.</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <p className="rounded-xl border border-white/10 bg-[#071020] px-4 py-3 text-xs text-slate-400">40 mm · base 3,2 mm · relieve recomendado 0,4–0,6 mm</p>
                <button type="button" onClick={openCreatePhysical} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"><Plus size={17}/>Crear marcador 3D</button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0a1122] p-6">
            <div className="mb-3 flex items-center gap-2"><CircleHelp size={19} className="text-emerald-400"/><h2 className="font-medium">Consejos para impresión</h2></div>
            <ul className="space-y-1 text-sm text-slate-400"><li>• Usa el formato SVG para impresión profesional a cualquier tamaño.</li><li>• Tamaño mínimo recomendado: 6–7 cm de ancho.</li><li>• Prueba siempre la legibilidad antes de imprimir grandes cantidades.</li></ul>
          </section>
        </div>
      </main>

      {showCreateChoice && <CreateChoice onClose={() => setShowCreateChoice(false)} onCorporate={openCreateCorporate} onPhysical={openCreatePhysical}/>}
      {showEditor && <Editor mode={createMode} form={form} setForm={setForm} onClose={() => { setShowEditor(false); setPendingTokenAfterSave(false); }} onSave={save} busy={busy} message={message}/>} 
      {preview && <QrPreview preview={preview} busy={previewBusy} onClose={() => setPreview(null)} onDownload={downloadQr}/>} 
      {tokenPreview && <TokenDesigner link={tokenPreview} onClose={() => setTokenPreview(null)} />}
    </div>
  );
}

function CreateChoice({ onClose, onCorporate, onPhysical }) {
  return <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
    <div className="flex min-h-full items-center justify-center py-8">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#071020] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-sm font-medium text-emerald-400">NUEVO ENLACE</p>
            <h2 className="text-xl font-semibold">¿Qué quieres crear?</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10" aria-label="Cerrar"><X/></button>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          <button type="button" onClick={onCorporate} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-left transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><QrCode/></div>
            <h3 className="mt-5 text-lg font-semibold">QR corporativo</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Para camisetas, cartelería, folletos y publicidad. Mantiene logo, marco y CTA corporativo.</p>
            <span className="mt-5 inline-flex text-sm font-medium text-emerald-400">Crear QR corporativo →</span>
          </button>

          <button type="button" onClick={onPhysical} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 text-left transition hover:border-emerald-400/60 hover:bg-emerald-400/[0.09]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400"><Settings/></div>
            <h3 className="mt-5 text-lg font-semibold">Marcador / llavero 3D</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">QR técnico sin logo ni textos, con módulos cuadrados y parámetros físicos para Bambu Studio.</p>
            <span className="mt-5 inline-flex text-sm font-medium text-emerald-400">Diseñar pieza 3D →</span>
          </button>
        </div>

        <p className="px-6 pb-6 text-xs leading-5 text-slate-500">Ambos modos usan go.golfencasa.net, por lo que podrás cambiar el destino más adelante sin regenerar el QR.</p>
      </div>
    </div>
  </div>;
}

function Sidebar({ open, onClose }) {
  const items = [
    [Home, 'Dashboard'], [Link2, 'Enlaces'], [FolderOpen, 'Carpetas'], [BarChart3, 'Estadísticas'], [Activity, 'Actividad'], [Settings, 'Ajustes'],
  ];
  return <>
    {open && <button aria-label="Cerrar menú" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={onClose}/>} 
    <aside className={`fixed bottom-0 left-0 top-20 z-50 w-52 border-r border-white/10 bg-[#030a18] p-3 transition-transform lg:z-30 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="space-y-1">{items.map(([Icon, label], index) => <button key={label} onClick={onClose} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${index === 1 ? 'bg-white/[0.07] text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'}`}><Icon size={18} className={index === 1 ? 'text-emerald-400' : ''}/>{label}</button>)}</nav>
      <div className="absolute bottom-4 left-3 right-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"><div className="flex items-center gap-2 text-sm"><CircleHelp size={17}/><b>Ayuda</b></div><p className="mt-2 text-xs text-slate-500">Cómo funciona el gestor</p></div>
    </aside>
  </>;
}

function Login({ password, setPassword, onSubmit, busy, message }) {
  return <Centered><form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-7"><p className="text-sm text-emerald-400">GOLF EN CASA</p><h1 className="mt-1 text-2xl font-semibold">Acceso al gestor</h1><p className="mt-2 text-sm text-slate-400">Administra los enlaces de tus QR dinámicos.</p><label className="mt-6 block text-sm">Contraseña<input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 outline-none focus:border-emerald-500"/></label>{message && <p className="mt-3 text-sm text-red-300">{message}</p>}<button disabled={busy} className="mt-5 w-full rounded-xl bg-emerald-500 py-3 font-medium text-slate-950 disabled:opacity-60">{busy ? 'Accediendo…' : 'Entrar'}</button></form></Centered>;
}
function Centered({ children }) { return <div className="flex min-h-screen items-center justify-center bg-[#020817] p-5 text-white">{children}</div>; }
function Metric({ label, value, icon }) { return <div className="rounded-2xl border border-white/10 bg-[#0a1122] p-6"><div className="flex items-center justify-between text-slate-400"><span>{label}</span><span className="text-emerald-400 [&_svg]:h-7 [&_svg]:w-7">{icon}</span></div><p className="mt-4 text-4xl font-semibold">{value}</p></div>; }
function IconButton({ children, title, onClick, danger }) { return <button title={title} onClick={onClick} className={`rounded-lg p-2 hover:bg-white/10 [&_svg]:h-4 [&_svg]:w-4 ${danger ? 'text-red-400' : 'text-slate-300'}`}>{children}</button>; }

function Editor({ mode = 'corporate', form, setForm, onClose, onSave, busy, message }) {
  const physicalMode = mode === 'physical';
  const [qrData, setQrData] = useState('');
  const [physicalPreview, setPhysicalPreview] = useState(null);
  const [qrBusy, setQrBusy] = useState(false);
  const [diameterMm, setDiameterMm] = useState(40);
  const [qrAreaMm, setQrAreaMm] = useState(30);
  const [keychainHoleMm, setKeychainHoleMm] = useState(0);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('Q');

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const publicUrl = `https://go.golfencasa.net/${form.slug || 'alias'}`;
  const tokenOptions = useMemo(
    () => ({ diameterMm, qrAreaMm, keychainHoleMm, errorCorrectionLevel }),
    [diameterMm, qrAreaMm, keychainHoleMm, errorCorrectionLevel]
  );
  const metrics = useMemo(
    () => physicalMode ? getPhysicalQrMetrics(publicUrl, tokenOptions) : null,
    [physicalMode, publicUrl, tokenOptions]
  );

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setQrBusy(true);
      try {
        if (physicalMode) {
          const preview = await createPhysicalTokenPreview(publicUrl, tokenOptions);
          if (!cancelled) {
            setPhysicalPreview(preview);
            setQrData('');
          }
        } else {
          const dataUrl = await createBrandedQrPng(publicUrl);
          if (!cancelled) {
            setQrData(dataUrl);
            setPhysicalPreview(null);
          }
        }
      } finally {
        if (!cancelled) setQrBusy(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [physicalMode, publicUrl, tokenOptions]);

  const ratingClass = !metrics ? '' :
    metrics.ratingKey === 'excellent' ? 'text-emerald-300' :
    metrics.ratingKey === 'good' ? 'text-cyan-300' :
    metrics.ratingKey === 'test' ? 'text-amber-300' : 'text-red-300';

  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
    <div className="flex min-h-full items-center justify-center py-6">
      <form onSubmit={onSave} className={`w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a1324] text-white shadow-2xl ${physicalMode ? 'max-w-[1180px]' : 'max-w-[1020px]'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            {physicalMode && <p className="text-xs font-semibold tracking-[0.18em] text-emerald-400">IMPRESIÓN 3D</p>}
            <h2 className="text-xl font-semibold">{form.id ? 'Editar enlace' : physicalMode ? 'Nuevo marcador / llavero QR 3D' : 'Nuevo enlace'}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10"><X/></button>
        </div>

        <div className={`grid gap-7 p-6 ${physicalMode ? 'lg:grid-cols-[1fr_440px]' : 'lg:grid-cols-[1fr_380px]'}`}>
          <div>
            <Field label="Nombre (opcional)"><input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={physicalMode ? 'Marcador Golf en Casa' : 'QR camiseta corporativa'}/></Field>
            <Field label="Alias *"><input required value={form.slug} onChange={(e) => update('slug', slugify(e.target.value))} placeholder={physicalMode ? 'marcador' : 'camiseta'}/></Field>
            <p className="-mt-1 break-all text-sm text-emerald-400">{publicUrl}</p>
            <Field label="Carpeta"><select value={form.folder} onChange={(e) => update('folder', e.target.value)}><option>Marketing</option><option>Clientes</option><option>Eventos</option><option>Redes sociales</option><option>Otros</option></select></Field>
            <Field label="URL de destino *"><input required type="url" value={form.destination} onChange={(e) => update('destination', e.target.value)}/></Field>
            <Field label="Descripción (opcional)"><textarea rows="4" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Describe para qué se utilizará este QR."/></Field>

            {physicalMode && <div className="mt-6 border-t border-white/10 pt-6">
              <p className="mb-4 font-medium">Configuración física</p>

              <label className="text-sm text-slate-300">Diámetro de la ficha</label>
              <div className="mt-2 flex gap-2">
                {[38, 40, 42].map((value) => <button key={value} type="button" onClick={() => { setDiameterMm(value); setQrAreaMm((current) => Math.min(current, value - 7)); }} className={`flex-1 rounded-xl border px-3 py-2.5 text-sm ${diameterMm === value ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-300'}`}>{value} mm</button>)}
              </div>

              <label className="mt-5 block text-sm text-slate-300">Área total del QR
                <input type="range" min="25" max={Math.max(25, diameterMm - 7)} step="0.5" value={qrAreaMm} onChange={(e) => setQrAreaMm(Number(e.target.value))} className="mt-3 w-full accent-emerald-500"/>
                <div className="mt-1 flex justify-between text-xs text-slate-500"><span>25 mm</span><b className="text-slate-300">{qrAreaMm.toFixed(1)} mm</b><span>{diameterMm - 7} mm</span></div>
              </label>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-300">Formato
                  <select value={keychainHoleMm} onChange={(e) => setKeychainHoleMm(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d172b] px-3 py-3 outline-none focus:border-emerald-500">
                    <option value={0}>Marcador · sin agujero</option>
                    <option value={4}>Llavero · agujero 4 mm</option>
                    <option value={5}>Llavero · agujero 5 mm</option>
                  </select>
                </label>

                <div>
                  <label className="text-sm text-slate-300">Corrección</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {['M', 'Q', 'H'].map((level) => <button key={level} type="button" onClick={() => setErrorCorrectionLevel(level)} className={`rounded-xl border px-3 py-3 text-sm ${errorCorrectionLevel === level ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-300'}`}>{level}</button>)}
                  </div>
                </div>
              </div>

              {metrics && <div className="mt-5 rounded-2xl border border-white/10 bg-[#08101f] p-4 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Matriz QR</span><b>{metrics.count}×{metrics.count}</b></div>
                <div className="mt-2 flex justify-between"><span className="text-slate-400">Módulo físico</span><b>{metrics.moduleMm.toFixed(3)} mm</b></div>
                <div className="mt-2 flex justify-between"><span className="text-slate-400">Quiet zone</span><b>4 módulos</b></div>
                <p className={`mt-3 font-medium ${ratingClass}`}>{metrics.rating}</p>
              </div>}
            </div>}

            <label className="mt-6 flex items-center gap-3"><button type="button" onClick={() => update('active', !form.active)} className={`relative h-7 w-12 rounded-full transition ${form.active ? 'bg-emerald-500' : 'bg-slate-700'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${form.active ? 'left-6' : 'left-1'}`}/></button><span>Activo</span></label>
            <p className="mt-5 text-xs leading-5 text-slate-500">Puedes cambiar el destino del enlace en cualquier momento. El QR seguirá funcionando.</p>
          </div>

          <div>
            {!physicalMode ? <>
              <p className="mb-3 font-medium">Vista previa del QR</p>
              <div className="rounded-2xl bg-white p-2">{qrBusy || !qrData ? <div className="flex aspect-square items-center justify-center text-slate-600">Generando vista previa…</div> : <img src={qrData} alt="Vista previa del QR corporativo" className="h-auto w-full rounded-xl"/>}</div>
              <div className="mt-4 rounded-xl border border-white/10 bg-[#08101f] p-4 text-sm text-slate-400">
                {['Corrección de errores: Nivel H (30%)', 'Formato: PNG (1600×1600 px) y SVG vectorial', 'Color: Verde Golf en Casa', 'Logo: Centro integrado', 'Marco y franja inferior incluidos'].map((item) => <p key={item} className="mb-2 flex items-start gap-2 last:mb-0"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400"/>{item}</p>)}
              </div>
            </> : <>
              <p className="mb-3 font-medium">Vista previa de la pieza</p>
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 text-sm text-slate-400">Cara QR</p>
                  <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-6">
                    {qrBusy || !physicalPreview ? <p className="text-slate-600">Generando…</p> :
                      <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-slate-200 bg-white">
                        <img src={physicalPreview.qrDataUrl} alt="QR técnico para impresión 3D" className="absolute inset-0 h-full w-full"/>
                        {keychainHoleMm > 0 && <span className="absolute left-1/2 top-[7%] h-[10%] w-[10%] -translate-x-1/2 rounded-full border-2 border-slate-400 bg-[#071020]"/>}
                      </div>}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-400">Cara logo</p>
                  <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-6">
                    {qrBusy || !physicalPreview ? <p className="text-slate-600">Generando…</p> :
                      <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-slate-200 bg-white">
                        <img src={physicalPreview.logoDataUrl} alt="Logo para la cara opuesta" className="absolute inset-0 h-full w-full"/>
                        {keychainHoleMm > 0 && <span className="absolute left-1/2 top-[7%] h-[10%] w-[10%] -translate-x-1/2 rounded-full border-2 border-slate-400 bg-[#071020]"/>}
                      </div>}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-sm text-slate-400">
                <p className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400"/>QR técnico: sin logo, textos ni marco.</p>
                <p className="mt-2 flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400"/>Módulos cuadrados y quiet zone de 4 módulos.</p>
                <p className="mt-2 flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400"/>Tras crear el enlace podrás descargar Base, QR y Logo en SVG.</p>
              </div>
            </>}
          </div>
        </div>

        {message && <p className="px-6 pb-2 text-sm text-red-300">{message}</p>}
        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">
          <button type="button" onClick={onClose} className="rounded-xl border border-white/15 px-5 py-2.5">Cancelar</button>
          <button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 disabled:opacity-60">
            <Check size={18}/>{busy ? 'Guardando…' : form.id ? 'Guardar cambios' : physicalMode ? 'Crear enlace y diseñar pieza' : 'Crear enlace'}
          </button>
        </div>
      </form>
    </div>
  </div>;
}

function Field({ label, children }) {
  return <label className="mb-5 block text-sm"><span className="text-slate-300">{label}</span><div className="mt-2 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-[#0d172b] [&_input]:px-3 [&_input]:py-3 [&_input]:outline-none [&_input]:focus:border-emerald-500 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-white/10 [&_select]:bg-[#0d172b] [&_select]:px-3 [&_select]:py-3 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-[#0d172b] [&_textarea]:px-3 [&_textarea]:py-3 [&_textarea]:outline-none [&_textarea]:focus:border-emerald-500">{children}</div></label>;
}

function QrPreview({ preview, busy, onClose, onDownload }) {
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"><div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#071020] p-5 text-white"><div className="flex items-center justify-between gap-3"><div><p className="text-sm text-emerald-400">QR CORPORATIVO</p><h2 className="text-xl font-semibold">{preview.link.name}</h2></div><button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10"><X/></button></div><div className="mt-5 flex min-h-[360px] items-center justify-center rounded-2xl bg-white p-3">{busy || !preview.dataUrl ? <p className="text-slate-700">Generando vista previa…</p> : <img src={preview.dataUrl} alt={`QR dinámico ${preview.link.name}`} className="h-auto w-full max-w-[540px]"/>}</div><p className="mt-3 break-all text-sm text-slate-400">{preview.link.publicUrl}</p><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => onDownload(preview.link, 'svg')} className="rounded-xl border border-white/15 px-4 py-2.5">Descargar SVG</button><button type="button" onClick={() => onDownload(preview.link, 'png')} className="rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-slate-950">Descargar PNG</button></div></div></div>;
}


function TokenDesigner({ link, onClose }) {
  const [diameterMm, setDiameterMm] = useState(40);
  const [qrAreaMm, setQrAreaMm] = useState(30);
  const [keychainHoleMm, setKeychainHoleMm] = useState(0);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('Q');
  const [previewData, setPreviewData] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');

  const options = useMemo(() => ({ diameterMm, qrAreaMm, keychainHoleMm, errorCorrectionLevel }), [diameterMm, qrAreaMm, keychainHoleMm, errorCorrectionLevel]);
  const metrics = useMemo(() => getPhysicalQrMetrics(link.publicUrl, options), [link.publicUrl, options]);
  const qrObject = useMemo(() => getPhysicalQrObject(link.publicUrl, options), [link.publicUrl, options]);

  function downloadBaseStl() {
    downloadStl(`${link.slug}-base-${diameterMm}mm.stl`, createBaseStl(diameterMm, 3.2));
  }

  function downloadQrStl() {
    downloadStl(
      `${link.slug}-qr-3d-${diameterMm}mm.stl`,
      createQrStl(qrObject.qr, qrAreaMm, 4, 3.0, 3.4)
    );
  }

  async function downloadLogoStl() {
    try {
      const stl = await createLogoStl(diameterMm, 0, 0.2);
      downloadStl(`${link.slug}-logo-${diameterMm}mm.stl`, stl);
    } catch (error) {
      console.error(error);
      alert('No se pudo generar Logo STL. Vuelve a intentarlo.');
    }
  }


  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError('');
    createPhysicalTokenPreview(link.publicUrl, options)
      .then((data) => { if (!cancelled) setPreviewData(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'No se pudo generar la vista previa'); })
      .finally(() => { if (!cancelled) setBusy(false); });
    return () => { cancelled = true; };
  }, [link.publicUrl, options]);

  async function saveSvg(svgOrPromise, filename) {
    try {
      const svg = await Promise.resolve(svgOrPromise);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = filename;
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(href), 500);
    } catch (err) {
      setError(err.message || 'No se pudo descargar el SVG');
    }
  }

  const ratingClass = metrics.ratingKey === 'excellent'
    ? 'text-emerald-300'
    : metrics.ratingKey === 'good'
      ? 'text-cyan-300'
      : metrics.ratingKey === 'test'
        ? 'text-amber-300'
        : 'text-red-300';

  return <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
    <div className="flex min-h-full items-center justify-center py-6">
      <div className="w-full max-w-[1180px] overflow-hidden rounded-3xl border border-white/10 bg-[#071020] text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div><p className="text-sm font-medium text-emerald-400">IMPRESIÓN 3D</p><h2 className="text-xl font-semibold">Marcador / llavero QR · {link.name || link.slug}</h2></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10"><X/></button>
        </div>

        <div className="grid gap-7 p-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-5">
            <div>
              <label className="text-sm text-slate-300">Diámetro de la ficha</label>
              <div className="mt-2 flex gap-2">{[38, 40, 42].map((value) => <button key={value} type="button" onClick={() => { setDiameterMm(value); setQrAreaMm(Math.min(qrAreaMm, value - 7)); }} className={`flex-1 rounded-xl border px-3 py-2.5 text-sm ${diameterMm === value ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-300'}`}>{value} mm</button>)}</div>
            </div>

            <label className="block text-sm text-slate-300">Área total del QR
              <input type="range" min="25" max={Math.max(25, diameterMm - 7)} step="0.5" value={qrAreaMm} onChange={(e) => setQrAreaMm(Number(e.target.value))} className="mt-3 w-full accent-emerald-500"/>
              <div className="mt-1 flex justify-between text-xs text-slate-500"><span>25 mm</span><b className="text-slate-300">{qrAreaMm.toFixed(1)} mm</b><span>{diameterMm - 7} mm</span></div>
            </label>

            <div>
              <label className="text-sm text-slate-300">Formato</label>
              <select value={keychainHoleMm} onChange={(e) => setKeychainHoleMm(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d172b] px-3 py-3 outline-none focus:border-emerald-500">
                <option value={0}>Marcador de bola · sin agujero</option>
                <option value={4}>Llavero · agujero 4 mm</option>
                <option value={5}>Llavero · agujero 5 mm</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Corrección de errores</label>
              <div className="mt-2 grid grid-cols-3 gap-2">{['M', 'Q', 'H'].map((level) => <button key={level} type="button" onClick={() => setErrorCorrectionLevel(level)} className={`rounded-xl border px-3 py-2.5 text-sm ${errorCorrectionLevel === level ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-300'}`}>{level}</button>)}</div>
              <p className="mt-2 text-xs leading-5 text-slate-500">Q es el equilibrio recomendado para una pieza física. H tolera más daños, pero hace los módulos más pequeños.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1528] p-4 text-sm">
              <div className="flex justify-between gap-4"><span className="text-slate-400">Matriz QR</span><b>{metrics.count}×{metrics.count}</b></div>
              <div className="mt-2 flex justify-between gap-4"><span className="text-slate-400">Módulo físico</span><b>{metrics.moduleMm.toFixed(3)} mm</b></div>
              <div className="mt-2 flex justify-between gap-4"><span className="text-slate-400">Quiet zone</span><b>4 módulos</b></div>
              <p className={`mt-3 font-medium ${ratingClass}`}>{metrics.rating}</p>
            </div>

            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-xs leading-5 text-slate-400">
              <b className="text-slate-200">Configuración inicial P2S</b><br/>
              Base: 3,2 mm · QR/logo: 0,4–0,6 mm · boquilla 0,4 mm · base clara + QR oscuro. Para el QR no uses redondeos ni suavizado geométrico.
            </div>
          </div>

          <div>
            <div className="grid gap-5 md:grid-cols-2">
              <div><p className="mb-3 font-medium">Cara QR</p><div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-7">{busy || !previewData ? <p className="text-slate-600">Generando…</p> : <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-slate-200 bg-white"><img src={previewData.qrDataUrl} alt="Vista previa QR para impresión 3D" className="absolute inset-0 h-full w-full"/>{keychainHoleMm > 0 && <span className="absolute left-1/2 top-[7%] h-[10%] w-[10%] -translate-x-1/2 rounded-full border-2 border-slate-400 bg-[#071020]"/>}</div>}</div></div>
              <div><p className="mb-3 font-medium">Cara logo</p><div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-7">{busy || !previewData ? <p className="text-slate-600">Generando…</p> : <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-slate-200 bg-white"><img src={previewData.logoDataUrl} alt="Vista previa logo para impresión 3D" className="absolute inset-0 h-full w-full"/>{keychainHoleMm > 0 && <span className="absolute left-1/2 top-[7%] h-[10%] w-[10%] -translate-x-1/2 rounded-full border-2 border-slate-400 bg-[#071020]"/>}</div>}</div></div>
            </div>

            <p className="mt-5 break-all rounded-xl border border-white/10 bg-[#0b1528] p-3 text-sm text-emerald-400">{link.publicUrl}</p>
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={downloadBaseStl} className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5">Base STL</button>
              <button type="button" onClick={downloadQrStl} className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400">QR 3D STL</button>
              <button type="button" onClick={downloadLogoStl} className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/5">Logo STL</button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-medium">Flujo recomendado en Bambu Studio</p>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-400"><li>1. Importa <b className="text-slate-200">Base STL</b> y extrúyela a 3,2 mm.</li><li>2. Añade <b className="text-slate-200">QR 3D STL</b> centrado sobre una cara como pieza independiente de 0,4–0,6 mm.</li><li>3. Añade <b className="text-slate-200">Logo STL</b> en la cara opuesta.</li><li>4. Asigna filamento claro a la base y oscuro al QR. Imprime primero una unidad y comprueba el escaneo con varios móviles.</li></ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function slugify(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
