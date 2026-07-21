import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import GolfSimulatorLanding from "./App.jsx";
import AvisoLegal from "./pages/AvisoLegal.jsx";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad.jsx";
import PoliticaCookies from "./pages/PoliticaCookies.jsx";
import LandingSimuladoresGolf from "./pages/LandingSimuladoresGolf";
import PrimeDayAmazonGolfEnCasa from "./pages/PrimeDayAmazonGolfEnCasa";
import GolfEnCasaCARE from "./pages/GolfEnCasaCARE";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GolfSimulatorLanding />} />
          <Route
            path="/instalacion-simuladores-golf"
            element={<LandingSimuladoresGolf />}
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
          <Route
    path="/care"
    element={<GolfEnCasaCARE />}
/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);