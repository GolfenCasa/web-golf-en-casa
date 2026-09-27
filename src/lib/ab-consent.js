export const AB_VARIANT_KEY = 'golf_en_casa_ab_landing_v1';
export const AB_PENDING_KEY = 'golf_en_casa_ab_pending_v1';
const TTL = 30 * 24 * 60 * 60 * 1000;

// The API is unavailable until CookieYes finishes loading. That is not rejection.
export function getAbConsentState() {
  try {
    const consent = typeof window !== 'undefined' && window.getCkyConsent?.();
    if (!consent || typeof consent.isUserActionCompleted !== 'boolean') return 'loading';
    if (!consent.isUserActionCompleted) return 'pending';
    if (consent.categories?.analytics === true) return 'granted';
    if (consent.categories?.analytics === false) return 'denied';
    return 'loading';
  } catch { return 'loading'; }
}

export function clearAbStorage() {
  if (typeof window === 'undefined') return;
  try { window.localStorage.removeItem(AB_VARIANT_KEY); } catch { /* Storage may be blocked. */ }
  try { window.sessionStorage.removeItem(AB_PENDING_KEY); } catch { /* Storage may be blocked. */ }
}

export function canMeasureAb() {
  const state = getAbConsentState();
  if (state === 'denied') clearAbStorage();
  return state === 'granted';
}

export function readAbVariant(now = Date.now()) {
  if (!canMeasureAb()) return null;
  try {
    const data = JSON.parse(window.localStorage.getItem(AB_VARIANT_KEY));
    if (data?.expiresAt > now && ['control', 'landing_2'].includes(data.variant)) return data.variant;
    window.localStorage.removeItem(AB_VARIANT_KEY);
  } catch { /* Ignore legacy values and unavailable storage. */ }
  return null;
}

export function saveAbVariant(variant, now = Date.now()) {
  if (!canMeasureAb()) return;
  try { window.localStorage.setItem(AB_VARIANT_KEY, JSON.stringify({ variant, expiresAt: now + TTL })); } catch { /* Navigation remains available. */ }
}
