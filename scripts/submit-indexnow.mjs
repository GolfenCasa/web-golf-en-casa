import { readFile, mkdir, writeFile } from "node:fs/promises";
import { indexableRoutes } from "../src/routeManifest.js";

// Explicit --submit is required; building or previewing never notifies crawlers.
const submit = process.argv.includes("--submit");
const requestedRoutes = process.argv.slice(2).filter(value => !value.startsWith("--"));
const allowed = new Set(indexableRoutes);
const routes = requestedRoutes.length ? [...new Set(requestedRoutes)] : indexableRoutes;
if (routes.some(route => !allowed.has(route))) throw new Error("Solo se notifican rutas públicas incluidas en el sitemap.");
const { key } = JSON.parse(await readFile(new URL("../public/indexnow.json", import.meta.url), "utf8"));
if (!/^[a-f0-9]{32}$/.test(key)) throw new Error("Clave de IndexNow no válida.");
const localKey = (await readFile(new URL(`../public/${key}.txt`, import.meta.url), "utf8")).trim();
if (localKey !== key) throw new Error("El archivo de verificación no coincide.");
const body = {
  host: "aquigolf.es", key, keyLocation: `https://aquigolf.es/${key}.txt`,
  urlList: routes.map(route => new URL(route, "https://aquigolf.es/").href),
};
if (!submit) {
  console.log(JSON.stringify({ mode: "dry-run", host: body.host, urls: body.urlList, keyLocation: body.keyLocation, note: "No se ha enviado ninguna URL. Publicar y comprobar la web antes de usar --submit." }, null, 2));
} else {
  const verification = await fetch(body.keyLocation, { signal: AbortSignal.timeout(20000) });
  if (!verification.ok || (await verification.text()).trim() !== key) throw new Error("La clave de verificación debe estar publicada antes de notificar cambios.");
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
  });
  const result = {
    submittedAt: new Date().toISOString(), host: body.host,
    urls: body.urlList, httpStatus: response.status, response: await response.text(),
    accepted: [200,202].includes(response.status),
    note: "La aceptación confirma recepción; no confirma indexación ni aparición en respuestas de IA.",
  };
  const directory = new URL("../../outputs/posicionamiento-ia-20261004/", import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("indexnow-receipt.json", directory), JSON.stringify(result, null, 2), "utf8");
  console.log(JSON.stringify(result, null, 2));
  if (!result.accepted) process.exitCode = 1;
}
