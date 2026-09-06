#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { prerenderRoutes } from "../src/routeManifest.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(projectRoot, "dist");
const serverEntry = path.join(projectRoot, ".ssr", "entry-server.js");
const templatePath = path.join(distDirectory, "index.html");

const { renderDocument } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(templatePath, "utf8");

if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("No se han encontrado los marcadores de prerender en dist/index.html.");
}

const staticHeadHtml = readStaticHead(template);
assertTemplateBody(template);

for (const route of prerenderRoutes) {
  await writeRoute(route, routeOutputPath(route));
}

await writeRoute("/__not-found__", path.join(distDirectory, "404.html"));

async function writeRoute(route, outputPath) {
  const document = await renderDocument(route, { staticHeadHtml });

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, document, "utf8");

  console.log(`prerender ${route} -> ${path.relative(projectRoot, outputPath)}`);
}

function routeOutputPath(route) {
  if (route === "/") return path.join(distDirectory, "index.html");
  return path.join(distDirectory, `${route.slice(1)}.html`);
}

function readStaticHead(document) {
  const match = document.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  if (!match) throw new Error("No se ha encontrado <head> en dist/index.html.");

  return match[1].replace("<!--app-head-->", "");
}

function assertTemplateBody(document) {
  const match = document.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error("No se ha encontrado <body> en dist/index.html.");

  const expectedRoot =
    /^\s*<div\s+id=["']root["']>\s*<!--app-html-->\s*<\/div>\s*$/i;
  if (!expectedRoot.test(match[1])) {
    throw new Error(
      "El body de la plantilla contiene contenido fuera del marcador de prerender.",
    );
  }
}
