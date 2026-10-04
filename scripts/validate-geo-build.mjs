import assert from "node:assert/strict";
import { readFile, access, mkdir, writeFile } from "node:fs/promises";
import { golfGuides, guideRoutes, guidePath, GUIDE_REVIEW_DATE } from "../src/data/golfGuides.js";
import { indexableRoutes } from "../src/routeManifest.js";

const publicBase = new URL("../public/", import.meta.url);
const distBase = new URL("../dist/", import.meta.url);
const knownRoutes = new Set(indexableRoutes);
const evidence = [];
const schemaFrom = html => [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .flatMap(([,content]) => { const schema = JSON.parse(content); return schema["@graph"] || [schema]; });
assert.equal(new Set(guideRoutes).size, guideRoutes.length, "Rutas de guías únicas");
assert.equal(new Set(golfGuides.map(guide => guide.title)).size, golfGuides.length, "Títulos únicos");
for (const guide of golfGuides) {
  const route = guidePath(guide.slug);
  const html = await readFile(new URL(`${route.slice(1)}.html`, distBase), "utf8");
  const graph = schemaFrom(html);
  const article = graph.find(node => node["@type"] === "Article");
  const breadcrumbs = graph.find(node => node["@type"] === "BreadcrumbList");
  assert(article, `${route}: Article legible en HTML estático`);
  assert(breadcrumbs, `${route}: BreadcrumbList`);
  assert(graph.some(node => node["@id"] === article.author?.["@id"]), `${route}: autor definido`);
  assert(graph.some(node => node["@id"] === article.publisher?.["@id"]), `${route}: editor definido`);
  assert.equal(article.dateModified, GUIDE_REVIEW_DATE, `${route}: fecha consistente`);
  assert(html.includes(`datetime="${GUIDE_REVIEW_DATE}"`) || html.includes(`dateTime="${GUIDE_REVIEW_DATE}"`), `${route}: fecha visible`);
  assert(html.includes(guide.answer), `${route}: respuesta breve presente en prerender`);
  assert(html.includes('id="fuentes"'), `${route}: fuentes visibles`);
  for (const { href } of guide.related) {
    assert(knownRoutes.has(href), `${route}: enlace relacionado ${href} accesible`);
  }
  evidence.push({ route, title: guide.title, article: true, breadcrumbs: true, author: article.author, sources: guide.sources.length });
}
const sitemap = await readFile(new URL("sitemap.xml", distBase), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([,url]) => new URL(url).pathname);
assert.deepEqual(new Set(sitemapRoutes), knownRoutes, "Sitemap y rutas públicas coinciden");
const robots = await readFile(new URL("robots.txt", distBase), "utf8");
for (const bot of ["OAI-SearchBot", "PerplexityBot", "bingbot"]) {
  const group = robots.split(/\n\s*\n/).find(group => group.includes(`User-agent: ${bot}`));
  assert(group?.includes("Allow: /") && group.includes("Disallow: /admin/") && group.includes("Disallow: /api/"), `${bot}: conserva exclusiones`);
}
for (const pathname of ["francisco-aqui-golf.webp", "brand/aqui-golf-circular.png"]) await access(new URL(pathname, publicBase));
const {key} = JSON.parse(await readFile(new URL("indexnow.json", distBase), "utf8"));
assert.equal((await readFile(new URL(`${key}.txt`, distBase), "utf8")).trim(), key, "Clave IndexNow servida coherente");
const home = await readFile(new URL("index.html", distBase), "utf8");
assert(home.includes('name="msvalidate.01"'), "Verificación Bing presente");
assert(home.includes('href="/guias-simuladores-golf"'), "Guías enlazadas desde portada");
const outputBase = new URL("../../outputs/posicionamiento-ia-20261004/", import.meta.url);
await mkdir(outputBase, {recursive:true});
await writeFile(new URL("validacion-contenido.json", outputBase), JSON.stringify({status:"passed", guides:evidence, indexableRoutes:indexableRoutes.length, published:false},null,2), "utf8");
console.log(`Validación GEO: ${evidence.length} guías, autoría, fuentes, enlaces, sitemap (${indexableRoutes.length} URLs), rastreo e IndexNow correctos. Propuesta local sin publicar.`);
