import assert from 'node:assert/strict';
import { test, after } from 'node:test';
import { captureAttribution, readStoredAttribution, toLeadAttribution, attributionEventData,
  observeAttributionConsent, ATTRIBUTION_STORAGE_KEY } from '../src/lib/attribution.js';
import { enhancedConversionData } from '../src/lib/consent.js';

after(() => { delete globalThis.window; delete globalThis.document; });

test('CMP ausente, aceptación parcial, retirada y envío con estado React antiguo', () => {
  const storage = new Map();
  const listeners = new Map();
  let reads = 0, writes = 0;
  globalThis.window = {
    location: { href: 'https://aquigolf.es/?utm_source=google&utm_campaign=test&gclid=PRIVATE-ID', hostname: 'aquigolf.es' },
    localStorage: {
      getItem: key => { reads++; return storage.get(key) ?? null; },
      setItem: (key, value) => { writes++; storage.set(key, value); },
      removeItem: key => storage.delete(key),
    },
  };
  globalThis.document = {
    referrer: '',
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
  };
  const emptyReactState = captureAttribution();
  assert.equal(emptyReactState.expiresAt, '');
  assert.equal(reads, 0); assert.equal(writes, 0);
  assert.equal(enhancedConversionData({email_address:'test@example.invalid'}), null);

  let categories = { analytics: true, advertisement: false };
  window.getCkyConsent = () => ({ isUserActionCompleted: true, categories });
  const stop = observeAttributionConsent();
  const analytical = JSON.parse(storage.get(ATTRIBUTION_STORAGE_KEY));
  assert.equal(analytical.lastTouch.campaign, 'test');
  assert.doesNotMatch(JSON.stringify(analytical), /PRIVATE-ID|gclid=/);
  assert.equal(toLeadAttribution(emptyReactState).campaign, 'test');

  categories = { analytics: true, advertisement: true };
  listeners.get('cookieyes_consent_update')();
  const acceptedReactState = captureAttribution();
  assert.equal(acceptedReactState.lastTouch.gclid, 'PRIVATE-ID');
  assert.equal(enhancedConversionData({ email_address: 'test@example.invalid' }).email_address, 'test@example.invalid');

  categories = { analytics: true, advertisement: false };
  listeners.get('cookieyes_consent_update')();
  assert.doesNotMatch(storage.get(ATTRIBUTION_STORAGE_KEY), /PRIVATE-ID/);
  assert.equal(toLeadAttribution(acceptedReactState).gclid, '');
  assert.equal(attributionEventData(acceptedReactState).gclid_present, false);

  storage.set('golf_en_casa_signature_attribution_v1', 'obsolete');
  categories = { analytics: false, advertisement: false };
  listeners.get('cookieyes_consent_update')();
  assert.equal(storage.size, 0);
  assert.equal(toLeadAttribution(acceptedReactState).gclid, '');
  assert.equal(toLeadAttribution(acceptedReactState).campaign, '');
  assert.equal(enhancedConversionData({ email_address: 'test@example.invalid' }), null);
  const readsBefore = reads, writesBefore = writes;
  captureAttribution(); readStoredAttribution();
  assert.equal(reads, readsBefore); assert.equal(writes, writesBefore);

  window.getCkyConsent = () => { throw new Error('CMP unavailable'); };
  assert.doesNotThrow(() => captureAttribution());
  assert.equal(captureAttribution().expiresAt, '');
  stop(); assert.equal(listeners.size, 0);
});
