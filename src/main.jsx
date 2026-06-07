import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import GolfSimulatorLanding from './App.jsx';
import AvisoLegal from './pages/AvisoLegal.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx';
import PoliticaCookies from './pages/PoliticaCookies.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GolfSimulatorLanding />} />
        <Route
    path="/instalacion-simuladores-golf"
    element={<LandingSimuladoresGolf />}
  />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
