import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");

const componentPaths = [
  "src/App.jsx",
  "src/pages/LandingSimuladoresGolf.jsx",
  "src/pages/LandingSimuladoresGolfAds2.jsx",
  "src/pages/LandingSignatureProjects.jsx",
  "src/pages/LandingSignatureProjectsEN.jsx",
  "src/pages/GolfEnCasaCARE.jsx",
];

const components = await Promise.all(
  componentPaths.map(async (relativePath) => [
    relativePath,
    await readFile(path.join(projectRoot, relativePath), "utf8"),
  ]),
);
const allComponents = components.map(([, source]) => source).join("\n");

for (const [relativePath, source] of components) {
  assert.match(
    source,
    /prepareAttributedLink/,
    `${relativePath} debe refrescar los enlaces de Calendly en la interacción`,
  );
  assert.doesNotMatch(
    source,
    /href=\{CALENDLY_URL\}|href=["']https:\/\/calendly\.com/,
    `${relativePath} no debe dejar un href de Calendly sin atribución`,
  );
  assert.doesNotMatch(
    source,
    /includeClickIds\s*:\s*true/,
    `${relativePath} no debe exponer click IDs a Calendly`,
  );
}

const leadEventCount =
  (allComponents.match(/event\s*:\s*["']generate_lead["']/g) || []).length +
  (allComponents.match(/pushDataLayer\(\s*["']generate_lead["']/g) || []).length;
const userDataCount = (allComponents.match(/user_data\s*:/g) || []).length;

assert.equal(leadEventCount, 7, "deben existir los siete eventos generate_lead");
assert.equal(
  userDataCount,
  leadEventCount,
  "cada generate_lead debe incluir datos de conversión mejorada",
);

const appSource = components.find(([relativePath]) => relativePath === "src/App.jsx")[1];
assert.match(appSource, /id=["']email["'][^>]*type=["']email["']/);
assert.match(appSource, /id=["']phone["'][^>]*type=["']tel["']/);
assert.match(appSource, /lg:hidden/);
assert.match(appSource, /max-h-\[calc\(100dvh-10rem\)\]/);

for (const relativePath of [
  "src/pages/LandingSignatureProjects.jsx",
  "src/pages/LandingSignatureProjectsEN.jsx",
]) {
  const source = components.find(([candidate]) => candidate === relativePath)[1];
  assert.match(source, /technicalOpen \? ["']signature-project-email["'] : ["']email["']/);
  assert.match(source, /technicalOpen \? ["']signature-project-phone["'] : ["']phone["']/);
  assert.match(source, /id=["']email["'][^>]*name=["']email["']/);
}

const indexHtml = await readFile(path.join(projectRoot, "index.html"), "utf8");
assert.match(indexHtml, /const productionHosts = \[[^\]]*golfencasa\.net[^\]]*\]/s);
assert.doesNotMatch(
  indexHtml,
  /productionHosts\s*=\s*\[[^\]]*vercel\.app/s,
  "GTM debe permanecer desactivado en Preview",
);

for (const relativePath of [
  "api/website-lead.js",
  "api/viability-lead.js",
  "api/signature-lead.js",
]) {
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  assert.match(source, /sanitizeLeadAttribution\(body\.attribution\)/);
  assert.match(source, /getAttributionSummaryRows\(data\.attribution\)/);
}

console.log("Tracking contract tests passed");
