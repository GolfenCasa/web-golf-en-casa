import {
  AB_PENDING_KEY, canMeasureAb, getAbConsentState, readAbVariant, saveAbVariant,
} from './ab-consent.js';

export const AB_EXPERIMENT_NAME = 'landing_control_vs_landing_2';
export const AB_VARIANTS = {
  control: { path: '/instalacion-simuladores-golf', landingVersion: 'landing_control_v1' },
  landing_2: { path: '/estudio-simulador-golf', landingVersion: 'landing_2_clarity_v1' },
};
const MAX_AGE = 10 * 60 * 1000;
const CONSENT_EVENTS = ['cookieyes_banner_load', 'cookieyes_banner_loaded', 'cookieyes_consent_update'];
// No cookies/storage before consent. This survives the SPA redirect, not a page reload.
const exposures = new WeakMap();

function watchConsent(check) {
  let stopped = false;
  let timer;
  const stop = () => {
    stopped = true;
    window.clearTimeout(timer);
    CONSENT_EVENTS.forEach(name => document.removeEventListener(name, wake));
  };
  const tick = () => {
    if (stopped) return;
    if (check()) stop();
    else timer = window.setTimeout(tick, 250);
  };
  const wake = () => {
    if (stopped) return;
    window.clearTimeout(timer);
    // Let CookieYes finish updating its API and Google consent state first.
    timer = window.setTimeout(tick, 0);
  };
  CONSENT_EVENTS.forEach(name => document.addEventListener(name, wake));
  wake();
  return stop;
}

function persistExposure(pending) {
  if (!canMeasureAb()) return;
  saveAbVariant(pending.variant);
  try { window.sessionStorage.setItem(AB_PENDING_KEY, JSON.stringify(pending)); } catch { /* Storage is optional. */ }
}

function isFresh(pending) {
  const age = Date.now() - pending?.createdAt;
  return pending?.experimentName === AB_EXPERIMENT_NAME && age >= 0 && age < MAX_AGE;
}

export function scheduleAbNavigation(navigate) {
  if (typeof window === 'undefined') return () => {};
  const startedAt = Date.now();
  return watchConsent(() => {
    const state = getAbConsentState();
    const trackingDisabled = window.__GOLF_EN_CASA_TRACKING_ENABLED__ === false;
    if (state === 'loading' && !trackingDisabled && Date.now() - startedAt < 5000) return false;

    let variant = 'control';
    if (state !== 'loading' && !trackingDisabled) {
      const previous = exposures.get(window);
      // Reuse an in-flight assignment if React mounts the router twice.
      variant = readAbVariant() || (isFresh(previous) && previous.sentAt === null ? previous.variant : null)
        || (Math.random() < 0.5 ? 'control' : 'landing_2');
      const pending = {
        experimentName: AB_EXPERIMENT_NAME, variant,
        landingVersion: AB_VARIANTS[variant].landingVersion,
        createdAt: Date.now(), sentAt: null,
      };
      exposures.set(window, pending);
      persistExposure(pending);
    } else {
      // A blocked CMP must not strand visitors or overwrite a returning assignment.
      // Serve the control page without enrolling this visit in the experiment.
      exposures.set(window, null);
    }
    navigate(`${AB_VARIANTS[variant].path}${window.location.search}${window.location.hash}`, { replace: true });
    return true;
  });
}

export function scheduleAbExposure({ expectedVariant, landingVersion }) {
  if (typeof window === 'undefined' || window.__GOLF_EN_CASA_TRACKING_ENABLED__ === false) return () => {};
  const startedAt = Date.now();
  return watchConsent(() => {
    const allowed = canMeasureAb();
    let pending = exposures.get(window);
    // Restore only consented pending exposures (e.g. reload between redirect and send).
    if (pending === undefined && allowed) {
      try { pending = JSON.parse(window.sessionStorage.getItem(AB_PENDING_KEY)); } catch { /* Storage may be blocked. */ }
      if (pending) exposures.set(window, pending);
    }
    if (Date.now() - startedAt >= MAX_AGE) return true;
    if (!allowed) return false;
    if (!isFresh(pending) || pending.sentAt !== null || pending.variant !== expectedVariant
      || pending.landingVersion !== landingVersion
      || window.location.pathname !== AB_VARIANTS[expectedVariant]?.path) return true;

    const gtmReady = Object.keys(window.google_tag_manager || {}).some(key => key.startsWith('GTM-'));
    if (!gtmReady) return false;

    // Mark first: observers/remounts cannot count the same exposure twice.
    pending.sentAt = Date.now();
    persistExposure(pending);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ab_assignment', experiment_name: AB_EXPERIMENT_NAME,
      ab_variant: expectedVariant, landing_version: landingVersion,
      exposure_page: window.location.pathname,
    });
    return true;
  });
}
