import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingSimuladoresGolf from "./pages/LandingSimuladoresGolf.jsx";
import LandingSimuladoresGolfAds2 from "./pages/LandingSimuladoresGolfAds2.jsx";
import ABLandingRouter from "./pages/ABLandingRouter.jsx";

const GolfSimulatorLanding = lazy(() => import("./App.jsx"));
const LandingSignatureProjects = lazy(() => import("./pages/LandingSignatureProjects.jsx"));
const LandingSignatureProjectsEN = lazy(() => import("./pages/LandingSignatureProjectsEN.jsx"));
const PrivacyPolicyEN = lazy(() => import("./pages/PrivacyPolicyEN.jsx"));
const CookiePolicyEN = lazy(() => import("./pages/CookiePolicyEN.jsx"));
const LegalNoticeEN = lazy(() => import("./pages/LegalNoticeEN.jsx"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal.jsx"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad.jsx"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies.jsx"));
const PrimeDayAmazonGolfEnCasa = lazy(() => import("./pages/PrimeDayAmazonGolfEnCasa.jsx"));
const GolfEnCasaCARE = lazy(() => import("./pages/GolfEnCasaCARE.jsx"));
const LinkManager = lazy(() => import("./pages/LinkManager.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const PricePage = lazy(() => import("./pages/SeoGrowthPages.jsx").then((module) => ({ default: module.PricePage })));
const MeasuresPage = lazy(() => import("./pages/SeoGrowthPages.jsx").then((module) => ({ default: module.MeasuresPage })));
const ConsultingPage = lazy(() => import("./pages/SeoGrowthPages.jsx").then((module) => ({ default: module.ConsultingPage })));
const GardenPage = lazy(() => import("./pages/SeoGrowthPages.jsx").then((module) => ({ default: module.GardenPage })));
const BusinessPage = lazy(() => import("./pages/SeoGrowthPages.jsx").then((module) => ({ default: module.BusinessPage })));
const ProjectsPage = lazy(() => import("./pages/ProjectPages.jsx").then((module) => ({ default: module.ProjectsPage })));
const ProjectEcijaPage = lazy(() => import("./pages/ProjectPages.jsx").then((module) => ({ default: module.ProjectEcijaPage })));
const ProjectJerezPage = lazy(() => import("./pages/ProjectPages.jsx").then((module) => ({ default: module.ProjectJerezPage })));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DocumentDefaults />
      <HashNavigation />
      <Routes>
        <Route path="/" element={<GolfSimulatorLanding />} />
        <Route path="/instalacion-simuladores-golf" element={<LandingSimuladoresGolf />} />
        <Route path="/estudio-simulador-golf" element={<LandingSimuladoresGolfAds2 />} />
        <Route path="/simulador-golf" element={<ABLandingRouter />} />
        <Route path="/signature" element={<LandingSignatureProjects />} />
        <Route path="/en/signature" element={<LandingSignatureProjectsEN />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/prime-day-amazon" element={<PrimeDayAmazonGolfEnCasa />} />
        <Route path="/en/privacy-policy" element={<PrivacyPolicyEN />} />
        <Route path="/en/cookie-policy" element={<CookiePolicyEN />} />
        <Route path="/en/legal-notice" element={<LegalNoticeEN />} />
        <Route path="/care" element={<GolfEnCasaCARE />} />
        <Route path="/precio-simulador-golf" element={<PricePage />} />
        <Route path="/medidas-simulador-golf" element={<MeasuresPage />} />
        <Route path="/consultoria-simulador-golf" element={<ConsultingPage />} />
        <Route path="/simulador-golf-jardin" element={<GardenPage />} />
        <Route path="/simulador-golf-negocio" element={<BusinessPage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/proyectos/simulador-golf-ecija" element={<ProjectEcijaPage />} />
        <Route path="/proyectos/simulador-golf-jerez" element={<ProjectJerezPage />} />
        <Route path="/admin/enlaces" element={<LinkManager />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function HashNavigation() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    let cancelled = false;
    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      if (cancelled) return;
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    };
    const timers = [0, 150, 600].map((delay) =>
      window.setTimeout(scrollToTarget, delay),
    );

    document.fonts?.ready.then(scrollToTarget).catch(() => {});

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname, hash]);

  return null;
}

function DocumentDefaults() {
  const { pathname } = useLocation();
  const language = pathname.startsWith("/en/") ? "en" : "es";

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <meta property="og:site_name" content="Golf en Casa" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

export function PageLoader() {
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
