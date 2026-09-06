import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";
import AppRouter from "./AppRouter.jsx";

export async function renderDocument(url, { staticHeadHtml = "" } = {}) {
  const helmetContext = {};
  const renderErrors = [];
  const language = url.startsWith("/en/") ? "en" : "es";
  const stream = await renderToReadableStream(
    <html lang={language}>
      <head dangerouslySetInnerHTML={{ __html: staticHeadHtml }} />
      <body>
        <div id="root">
          <React.StrictMode>
            <HelmetProvider context={helmetContext}>
              <StaticRouter location={url}>
                <AppRouter />
              </StaticRouter>
            </HelmetProvider>
          </React.StrictMode>
        </div>
      </body>
    </html>,
    {
      onError(error) {
        renderErrors.push(error);
      },
    },
  );

  await stream.allReady;

  if (renderErrors.length > 0) {
    throw renderErrors[0];
  }

  return await new Response(stream).text();
}
