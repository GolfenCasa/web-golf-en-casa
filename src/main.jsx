import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import AppRouter from "./AppRouter.jsx";

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  {
    onRecoverableError(error) {
      window.__GOLF_EN_CASA_HYDRATION_ERRORS__ = [
        ...(window.__GOLF_EN_CASA_HYDRATION_ERRORS__ || []),
        error instanceof Error ? error.message : String(error),
      ].slice(-20);

      if (import.meta.env.DEV) {
        console.error("Hydration warning:", error);
      }
    },
  },
);
