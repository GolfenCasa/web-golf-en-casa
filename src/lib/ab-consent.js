import { getMeasurementConsent } from './consent.js';

export const AB_VARIANT_KEY = 'golf_en_casa_ab_landing_v1';
export const AB_PENDING_KEY = 'golf_en_casa_ab_pending_v1';
const TTL = 30 * 24 * 60 * 60 * 1000;

export function clearAbStorage() {
  if (typeof window === 'undefined') return;
  try { window.localStorage.removeItem(AB_VARIANT_KEY); } catch { /* Storage may be blocked. */ }
  try { window.sessionStorage.removeItem(AB_PENDING_KEY); } catch { /* Storage may be blocked. */ }
}

export function canMeasureAb() {
  const allowed = getMeasurementConsent().analytics;
  if (!allowed) clearAbStorage();
  return allowed;
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
