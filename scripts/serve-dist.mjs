#!/usr/bin/env node

import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(scriptDirectory, "..", "dist");
const host = "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "4173", 10);

const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const cleanRedirect = cleanUrlRedirect(pathname, request.url);
  if (cleanRedirect) {
    response.writeHead(308, {
      Location: cleanRedirect,
      "Cache-Control": "no-store",
    });
    response.end();
    return;
  }

  const requestedFile = resolveRequest(pathname);
  const file = requestedFile && (await exists(requestedFile))
    ? requestedFile
    : path.join(distDirectory, "404.html");
  const statusCode = requestedFile && (await exists(requestedFile)) ? 200 : 404;

  try {
    const fileStats = await stat(file);
    const headers = {
      "Content-Length": fileStats.size,
      "Content-Type": mimeTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    };

    if (statusCode === 404) headers["X-Robots-Tag"] = "noindex, nofollow";
    response.writeHead(statusCode, headers);

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(file).pipe(response);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end("Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`Golf en Casa SSG disponible en http://${host}:${port}`);
});

function resolveRequest(pathname) {
  const relative = pathname.replace(/^\/+/, "");
  const requested = pathname === "/"
    ? "index.html"
    : path.extname(relative)
      ? relative
      : `${relative.replace(/\/$/, "")}.html`;
  const resolved = path.resolve(distDirectory, requested);

  return resolved === distDirectory || resolved.startsWith(`${distDirectory}${path.sep}`)
    ? resolved
    : null;
}

function cleanUrlRedirect(pathname, requestUrl) {
  const search = new URL(requestUrl, "http://localhost").search;

  if (pathname !== "/" && pathname.endsWith("/")) {
    return `${pathname.replace(/\/+$/, "")}${search}`;
  }

  if (pathname.toLowerCase().endsWith(".html")) {
    const cleanPath = pathname.toLowerCase() === "/index.html"
      ? "/"
      : pathname.slice(0, -5) || "/";
    return `${cleanPath}${search}`;
  }

  return "";
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
