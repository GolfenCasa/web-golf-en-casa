import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import LandingSimuladoresGolf from "./pages/LandingSimuladoresGolf.jsx";
import LandingSimuladoresGolfAds2 from "./pages/LandingSimuladoresGolfAds2";

const GolfSimulatorLanding = lazy(() => import("./App.jsx"));

const AvisoLegal = lazy(() => import("./pages/AvisoLegal.jsx"));
const PoliticaPrivacidad = lazy(() =>
  import("./pages/PoliticaPrivacidad.jsx")
);
const PoliticaCookies = lazy(() =>
  import("./pages/PoliticaCookies.jsx")
);
const PrimeDayAmazonGolfEnCasa = lazy(() =>
  import("./pages/PrimeDayAmazonGolfEnCasa")
);
const GolfEnCasaCARE = lazy(() =>
  import("./pages/GolfEnCasaCARE")
);
const LinkManager = lazy(() => import("./pages/LinkManager.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<GolfSimulatorLanding />} />
          <Route
            path="/instalacion-simuladores-golf"
            element={<LandingSimuladoresGolf />}
          />
          <Route
            path="/estudio-simulador-golf"
            element={<LandingSimuladoresGolfAds2 />}
          />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route
            path="/politica-privacidad"
            element={<PoliticaPrivacidad />}
          />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route
            path="/prime-day-amazon"
            element={<PrimeDayAmazonGolfEnCasa />}
          />
          <Route path="/care" element={<GolfEnCasaCARE />} />
          <Route path="/admin/enlaces" element={<LinkManager />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-zinc-400" role="status">
          Cargando...
        </p>
      </div>
    </div>
  );
}
