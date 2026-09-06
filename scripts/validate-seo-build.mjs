#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { indexableRoutes, prerenderRoutes } from "../src/routeManifest.js";

const SITE_ORIGIN = "https://www.golfencasa.net";

const OPTIONAL_NOINDEX_ROUTES = ["/admin/enlaces"];
const REDIRECT_ONLY_ROUTES = [];
const CANONICAL_OVERRIDES = new Map([
  ["/estudio-simulador-golf", "/instalacion-simuladores-golf"],
  ["/simulador-golf", "/instalacion-simuladores-golf"],
]);
const indexableRouteSet = new Set(indexableRoutes);
const optionalNoindexRouteSet = new Set(OPTIONAL_NOINDEX_ROUTES);
const ROUTE_RULES = prerenderRoutes
  .filter((route) => !optionalNoindexRouteSet.has(route))
  .map((route) => ({
    route,
    indexable: indexableRouteSet.has(route),
    ...(CANONICAL_OVERRIDES.has(route)
      ? { canonical: CANONICAL_OVERRIDES.get(route) }
      : {}),
  }));
const SITEMAP_EXCLUDED_ROUTES = new Set([
  ...ROUTE_RULES.filter(({ indexable }) => !indexable).map(({ route }) => route),
  ...OPTIONAL_NOINDEX_ROUTES,
  ...REDIRECT_ONLY_ROUTES,
]);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const requestedDist = process.argv[2];

if (requestedDist === "--help" || requestedDist === "-h") {
  console.log("Usage: node scripts/validate-seo-build.mjs [dist-directory]");
  process.exit(0);
}

const distDir = path.resolve(projectRoot, requestedDist || "dist");
const failures = [];
const passes = [];

function pass(message) {
  passes.push(message);
}

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (condition) pass(message);
  else fail(message);
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([\da-f]+);/gi, (_, number) =>
      String.fromCodePoint(Number.parseInt(number, 16)),
    )
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function visibleText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function comparable(value) {
  return visibleText(value).normalize("NFKC").toLocaleLowerCase("es");
}

function parseAttributes(tag) {
  const attributes = new Map();
  const content = tag
    .replace(/^<\s*[\w:-]+\s*/i, "")
    .replace(/\/?\s*>$/, "");
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = pattern.exec(content))) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    attributes.set(name, decodeEntities(value));
  }

  return attributes;
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function metaValues(html, name) {
  return tags(html, "meta")
    .map(parseAttributes)
    .filter((attributes) => attributes.get("name")?.toLowerCase() === name)
    .map((attributes) => attributes.get("content") ?? "");
}

function metaPropertyValues(html, property) {
  return tags(html, "meta")
    .map(parseAttributes)
    .filter(
      (attributes) => attributes.get("property")?.toLowerCase() === property,
    )
    .map((attributes) => attributes.get("content") ?? "");
}

function canonicalValues(html) {
  return tags(html, "link")
    .map(parseAttributes)
    .filter((attributes) =>
      (attributes.get("rel") ?? "")
        .toLowerCase()
        .split(/\s+/)
        .includes("canonical"),
    )
    .map((attributes) => attributes.get("href") ?? "");
}

function elementValues(html, tagName) {
  const values = [];
  const pattern = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  let match;
  while ((match = pattern.exec(html))) values.push(visibleText(match[1]));
  return values;
}

function routeUrl(route) {
  return new URL(route, `${SITE_ORIGIN}/`).href;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function routeFromUrl(value) {
  try {
    const url = new URL(value);
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function routeFileCandidates(route) {
  if (route === "/") return [path.join(distDir, "index.html")];
  const relative = route.replace(/^\//, "");
  return [
    path.join(distDir, `${relative}.html`),
    path.join(distDir, relative, "index.html"),
  ];
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function locateRouteFile(route, { required = true } = {}) {
  const candidates = routeFileCandidates(route);
  const matches = [];
  for (const candidate of candidates) {
    if (await exists(candidate)) matches.push(candidate);
  }

  if (matches.length > 1) {
    fail(
      `${route}: existe en dos artefactos (${matches
        .map((file) => path.relative(projectRoot, file))
        .join(", ")})`,
    );
  }

  if (matches.length === 0 && required) {
    fail(
      `${route}: falta HTML prerenderizado (esperado ${candidates
        .map((file) => path.relative(projectRoot, file))
        .join(" o ")})`,
    );
  }

  return matches[0] ?? null;
}

function inspectHtml(route, html, rule) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const titles = elementValues(head, "title");
  const descriptions = metaValues(head, "description");
  const canonicals = canonicalValues(head);
  const h1s = elementValues(body, "h1");
  const robots = metaValues(head, "robots");
  const ogTitle = metaPropertyValues(head, "og:title");
  const ogDescription = metaPropertyValues(head, "og:description");
  const ogUrl = metaPropertyValues(head, "og:url");
  const expectedCanonical = routeUrl(rule.canonical ?? route);
  const actualCanonical = canonicals[0] ? normalizeUrl(canonicals[0]) : null;
  const robotsTokens = robots
    .flatMap((value) => value.toLowerCase().split(/[,\s]+/))
    .filter(Boolean);
  const headCharsetTags = tags(head, "meta").filter((tag) =>
    parseAttributes(tag).has("charset"),
  );
  const charsetMatch = /<meta\b[^>]*\bcharset\s*=\s*(?:["'][^"']+["']|[^\s>]+)[^>]*>/i.exec(
    html,
  );
  const charsetEndByte = charsetMatch
    ? Buffer.byteLength(html.slice(0, charsetMatch.index + charsetMatch[0].length), "utf8")
    : Number.POSITIVE_INFINITY;

  assert(/^<!doctype html>/i.test(html.trimStart()), `${route}: declara HTML5 doctype`);
  assert(
    (html.match(/<!doctype html>/gi) ?? []).length === 1,
    `${route}: declara un único doctype`,
  );
  assert(Boolean(head), `${route}: contiene un <head> válido`);
  assert(Boolean(body), `${route}: contiene un <body> válido`);
  assert(headCharsetTags.length === 1, `${route}: un único charset dentro de head`);
  assert(
    charsetEndByte <= 1024,
    `${route}: charset termina dentro de los primeros 1024 bytes`,
  );
  assert(titles.length === 1 && Boolean(titles[0]), `${route}: un title no vacío`);
  assert(
    descriptions.length === 1 && Boolean(descriptions[0]),
    `${route}: una meta description no vacía`,
  );
  assert(h1s.length === 1 && Boolean(h1s[0]), `${route}: un H1 no vacío`);
  assert(canonicals.length === 1, `${route}: un único canonical`);
  assert(
    actualCanonical === normalizeUrl(expectedCanonical),
    `${route}: canonical ${expectedCanonical}`,
  );
  assert(
    /<div\b[^>]*\bid\s*=\s*["']root["'][^>]*>/i.test(html),
    `${route}: conserva #root para hidratación`,
  );
  assert(
    !/<div\b[^>]*\bid\s*=\s*["']root["'][^>]*>\s*<\/div>/i.test(html),
    `${route}: #root contiene HTML prerenderizado`,
  );
  assert(!/<title\b/i.test(body), `${route}: title está fuera del body`);
  assert(
    !tags(body, "meta").some(
      (tag) => parseAttributes(tag).get("name")?.toLowerCase() === "description",
    ),
    `${route}: meta description está fuera del body`,
  );
  assert(
    canonicalValues(body).length === 0,
    `${route}: canonical está fuera del body`,
  );
  assert(
    metaValues(body, "robots").length === 0,
    `${route}: meta robots está fuera del body`,
  );
  assert(
    tags(body, "meta").every(
      (tag) => !parseAttributes(tag).get("property")?.toLowerCase().startsWith("og:"),
    ),
    `${route}: metadatos Open Graph están fuera del body`,
  );
  assert(
    tags(body, "link")
      .map(parseAttributes)
      .every((attributes) => {
        const rel = (attributes.get("rel") ?? "").toLowerCase();
        return !["alternate", "canonical"].includes(rel);
      }),
    `${route}: canonical y alternates están fuera del body`,
  );

  validateJsonLd(route, html, { required: rule.indexable });

  if (rule.indexable) {
    assert(!robotsTokens.includes("noindex"), `${route}: no contiene noindex`);
    assert(ogTitle.length === 1 && Boolean(ogTitle[0]), `${route}: un og:title en head`);
    assert(
      ogDescription.length === 1 && Boolean(ogDescription[0]),
      `${route}: una og:description en head`,
    );
    assert(ogUrl.length === 1 && Boolean(ogUrl[0]), `${route}: una og:url en head`);
  } else {
    assert(robotsTokens.includes("noindex"), `${route}: contiene meta robots noindex`);
  }

  return {
    route,
    indexable: rule.indexable,
    title: titles[0] ?? "",
    description: descriptions[0] ?? "",
    h1: h1s[0] ?? "",
    canonical: actualCanonical ?? "",
  };
}

function validateJsonLd(route, html, { required = false } = {}) {
  const scripts = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const attributes = parseAttributes(`<script ${match[1]}>`);
    if (attributes.get("type")?.toLowerCase() !== "application/ld+json") continue;
    scripts.push(match[2].trim());
  }

  if (required) assert(scripts.length > 0, `${route}: incluye JSON-LD`);

  for (const [index, content] of scripts.entries()) {
    try {
      JSON.parse(content);
      pass(`${route}: JSON-LD ${index + 1} válido`);
    } catch {
      fail(`${route}: JSON-LD ${index + 1} no es JSON válido`);
    }
  }
}

function validateBuildAssets(route, html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const hasClientScript = tags(head, "script")
    .map(parseAttributes)
    .some(
      (attributes) =>
        attributes.get("type")?.toLowerCase() === "module" &&
        /^\/assets\/.+\.js$/i.test(attributes.get("src") ?? ""),
    );
  const hasStylesheet = tags(head, "link")
    .map(parseAttributes)
    .some(
      (attributes) =>
        attributes.get("rel")?.toLowerCase() === "stylesheet" &&
        /^\/assets\/.+\.css$/i.test(attributes.get("href") ?? ""),
    );

  assert(hasClientScript, `${route}: bundle cliente Vite dentro de head`);
  assert(hasStylesheet, `${route}: CSS Vite dentro de head`);
}

function assertUnique(records, field, { indexableOnly = false } = {}) {
  const seen = new Map();
  for (const record of records) {
    if (indexableOnly && !record.indexable) continue;
    const key = comparable(record[field]);
    if (!key) continue;
    const previous = seen.get(key);
    if (previous) {
      fail(`${field} duplicado entre ${previous} y ${record.route}: “${record[field]}”`);
    } else {
      seen.set(key, record.route);
    }
  }
  if (seen.size > 0) pass(`${field}: valores únicos en las rutas comprobadas`);
}

async function validateRobots() {
  const file = path.join(distDir, "robots.txt");
  if (!(await exists(file))) {
    fail("robots.txt: falta en dist");
    return;
  }

  const content = await readFile(file, "utf8");
  assert(!/<html\b/i.test(content), "robots.txt: no es el shell HTML");
  assert(/^\s*user-agent\s*:\s*\*/im.test(content), "robots.txt: declara User-agent: *");
  assert(/^\s*allow\s*:\s*\/\s*$/im.test(content), "robots.txt: permite el rastreo general");
  assert(
    !/^\s*disallow\s*:\s*\/\s*$/im.test(content),
    "robots.txt: no bloquea todo el sitio",
  );
  assert(
    new RegExp(
      `^\\s*sitemap\\s*:\\s*${SITE_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/sitemap\\.xml\\s*$`,
      "im",
    ).test(content),
    `robots.txt: declara ${SITE_ORIGIN}/sitemap.xml`,
  );
}

async function validateLlms() {
  const file = path.join(distDir, "llms.txt");
  if (!(await exists(file))) {
    fail("llms.txt: falta en dist");
    return;
  }

  const content = await readFile(file, "utf8");
  assert(!/<html\b/i.test(content), "llms.txt: no es el shell HTML");
  assert(content.trim().length >= 150, "llms.txt: contiene información útil (>=150 caracteres)");
  assert(/golf en casa/i.test(content), "llms.txt: identifica Golf en Casa");
  assert(content.includes(SITE_ORIGIN), `llms.txt: usa el origen canónico ${SITE_ORIGIN}`);
  assert(
    content.includes(`${SITE_ORIGIN}/instalacion-simuladores-golf`),
    "llms.txt: enlaza la página principal de instalación",
  );

  const urls = content.match(/https?:\/\/[^\s)>\]}]+/g) ?? [];
  for (const value of urls) {
    const cleaned = value.replace(/[.,;:]+$/, "");
    const normalized = normalizeUrl(cleaned);
    if (!normalized) {
      fail(`llms.txt: URL inválida ${cleaned}`);
      continue;
    }
    const parsed = new URL(normalized);
    assert(
      parsed.origin === SITE_ORIGIN,
      `llms.txt: URL interna usa HTTPS y host canónico (${cleaned})`,
    );
    const route = routeFromUrl(normalized);
    assert(
      !SITEMAP_EXCLUDED_ROUTES.has(route),
      `llms.txt: no enlaza ruta excluida ${route}`,
    );
  }
}

async function validate404() {
  const file = path.join(distDir, "404.html");
  if (!(await exists(file))) {
    fail("404.html: falta en dist");
    return;
  }

  const html = await readFile(file, "utf8");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const titles = elementValues(head, "title");
  const h1s = elementValues(body, "h1");
  const robots = metaValues(head, "robots")
    .flatMap((value) => value.toLowerCase().split(/[,\s]+/))
    .filter(Boolean);
  const headCharsetTags = tags(head, "meta").filter((tag) =>
    parseAttributes(tag).has("charset"),
  );
  const charsetMatch = /<meta\b[^>]*\bcharset\s*=\s*(?:["'][^"']+["']|[^\s>]+)[^>]*>/i.exec(
    html,
  );
  const charsetEndByte = charsetMatch
    ? Buffer.byteLength(html.slice(0, charsetMatch.index + charsetMatch[0].length), "utf8")
    : Number.POSITIVE_INFINITY;

  assert(titles.length === 1 && Boolean(titles[0]), "404.html: un title no vacío");
  assert(h1s.length === 1 && Boolean(h1s[0]), "404.html: un H1 no vacío");
  assert(robots.includes("noindex"), "404.html: contiene meta robots noindex");
  assert(!/<title\b/i.test(body), "404.html: title está fuera del body");
  assert(headCharsetTags.length === 1, "404.html: un único charset dentro de head");
  assert(
    charsetEndByte <= 1024,
    "404.html: charset termina dentro de los primeros 1024 bytes",
  );
}

async function readSitemap() {
  const file = path.join(distDir, "sitemap.xml");
  if (!(await exists(file))) {
    fail("sitemap.xml: falta en dist");
    return [];
  }

  const content = await readFile(file, "utf8");
  assert(!/<html\b/i.test(content), "sitemap.xml: no es el shell HTML");
  assert(/<urlset\b/i.test(content), "sitemap.xml: contiene un urlset");

  const urls = [];
  const locPattern = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let match;
  while ((match = locPattern.exec(content))) urls.push(decodeEntities(match[1].trim()));
  assert(urls.length > 0, "sitemap.xml: contiene URLs");

  const normalizedUrls = urls.map(normalizeUrl);
  assert(normalizedUrls.every(Boolean), "sitemap.xml: todas las URLs son absolutas y válidas");
  assert(new Set(normalizedUrls).size === normalizedUrls.length, "sitemap.xml: no duplica URLs");

  for (const [index, value] of urls.entries()) {
    const normalized = normalizedUrls[index];
    if (!normalized) continue;
    const parsed = new URL(normalized);
    const route = routeFromUrl(normalized);
    assert(
      parsed.origin === SITE_ORIGIN,
      `sitemap.xml: ${value} usa HTTPS y host canónico`,
    );
    assert(!parsed.search && !parsed.hash, `sitemap.xml: ${value} no contiene query ni hash`);
    assert(!/\.html\/?$/i.test(parsed.pathname), `sitemap.xml: ${value} usa URL limpia`);
    assert(
      !SITEMAP_EXCLUDED_ROUTES.has(route),
      `sitemap.xml: excluye ruta noindex, legal, admin o de redirección ${route}`,
    );
  }

  const sitemapRoutes = normalizedUrls.filter(Boolean).map(routeFromUrl);
  for (const { route, indexable } of ROUTE_RULES) {
    if (indexable) {
      assert(sitemapRoutes.includes(route), `sitemap.xml: incluye ${route}`);
    }
  }
  assert(
    sitemapRoutes.length === indexableRoutes.length &&
      indexableRoutes.every((route) => sitemapRoutes.includes(route)) &&
      sitemapRoutes.every((route) => indexableRouteSet.has(route)),
    "sitemap.xml: coincide exactamente con indexableRoutes del manifest",
  );

  return sitemapRoutes.filter(Boolean);
}

async function main() {
  assert(
    prerenderRoutes.length === new Set(prerenderRoutes).size,
    "routeManifest: no duplica rutas prerenderizadas",
  );
  assert(
    indexableRoutes.length === new Set(indexableRoutes).size,
    "routeManifest: no duplica rutas indexables",
  );
  assert(
    indexableRoutes.every((route) => prerenderRoutes.includes(route)),
    "routeManifest: toda ruta indexable se prerenderiza",
  );
  assert(
    OPTIONAL_NOINDEX_ROUTES.every((route) => prerenderRoutes.includes(route)),
    "routeManifest: toda ruta noindex opcional se prerenderiza",
  );
  assert(await exists(distDir), `directorio de build: ${path.relative(projectRoot, distDir)}`);
  if (!(await exists(distDir))) return;

  const sitemapRoutes = await readSitemap();
  await Promise.all([validateRobots(), validateLlms(), validate404()]);

  const rulesByRoute = new Map(ROUTE_RULES.map((rule) => [rule.route, rule]));
  for (const route of sitemapRoutes) {
    if (!rulesByRoute.has(route)) rulesByRoute.set(route, { route, indexable: true });
  }

  const records = [];
  for (const rule of rulesByRoute.values()) {
    const file = await locateRouteFile(rule.route);
    if (!file) continue;
    const html = await readFile(file, "utf8");
    validateBuildAssets(rule.route, html);
    records.push(inspectHtml(rule.route, html, rule));
  }

  for (const route of OPTIONAL_NOINDEX_ROUTES) {
    const file = await locateRouteFile(route, { required: false });
    if (!file) continue;
    const html = await readFile(file, "utf8");
    validateBuildAssets(route, html);
    records.push(inspectHtml(route, html, { route, indexable: false }));
  }

  for (const route of REDIRECT_ONLY_ROUTES) {
    const file = await locateRouteFile(route, { required: false });
    assert(!file, `${route}: no genera HTML porque debe resolverse como redirección HTTP`);
  }

  assertUnique(records, "title");
  assertUnique(records, "description");
  assertUnique(records, "h1");
  assertUnique(records, "canonical", { indexableOnly: true });
}

try {
  await main();
} catch (error) {
  fail(`Error inesperado: ${error.stack || error.message}`);
}

if (failures.length > 0) {
  console.error(`\nValidación SEO del build: FALLO (${failures.length} errores, ${passes.length} checks OK)\n`);
  for (const message of failures) console.error(`  ✗ ${message}`);
  process.exitCode = 1;
} else {
  console.log(`\nValidación SEO del build: OK (${passes.length} checks)\n`);
}
