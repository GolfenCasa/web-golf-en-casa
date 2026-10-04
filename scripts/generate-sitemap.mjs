import { readFile, writeFile } from "node:fs/promises";
import { indexableRoutes } from "../src/routeManifest.js";

const sitemapPath = new URL("../public/sitemap.xml", import.meta.url);
const previous = await readFile(sitemapPath, "utf8");
const previousDates = new Map([...previous.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(([,url,date]) => [url,date]));
const updatedRoutes = new Set([
  "/", "/instalacion-simuladores-golf", "/precio-simulador-golf",
  "/medidas-simulador-golf", "/consultoria-simulador-golf",
  "/simulador-golf-jardin", "/simulador-golf-negocio", "/proyectos",
  "/proyectos/simulador-golf-ecija", "/proyectos/simulador-golf-jerez",
]);
const updatedDate = "2026-10-04";
const alternates = [
  ["es", "https://aquigolf.es/signature"],
  ["en", "https://aquigolf.es/en/signature"],
  ["x-default", "https://aquigolf.es/signature"],
];
const urls = indexableRoutes.map(route => {
  const url = new URL(route, "https://aquigolf.es/").href;
  const lastmod = updatedRoutes.has(route) ? updatedDate : previousDates.get(url) || updatedDate;
  const alternateXml = ["/signature", "/en/signature"].includes(route)
    ? alternates.map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}" />`).join("\n")
    : "";
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>${alternateXml ? `\n${alternateXml}` : ""}\n  </url>`;
});
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
await writeFile(sitemapPath, xml, "utf8");
console.log(`Sitemap generado: ${urls.length} URLs públicas indexables.`);
