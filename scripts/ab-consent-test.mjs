import test from 'node:test';
import assert from 'node:assert/strict';
import { canMeasureAb, readAbVariant, saveAbVariant, AB_VARIANT_KEY, AB_PENDING_KEY } from '../src/lib/ab-consent.js';

test('A/B consent: deny, accept, expiry, withdrawal and blocked storage', () => {
  const local = new Map(), session = new Map();
  const adapter = map => ({ getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v), removeItem: k => map.delete(k) });
  let accepted = false;
  global.window = { localStorage: adapter(local), sessionStorage: adapter(session), getCkyConsent: () => ({ isUserActionCompleted: true, categories: { analytics: accepted } }) };
  try {
    saveAbVariant('control', 1000);
    assert.equal(local.size, 0);
    assert.equal(readAbVariant(), null);
    accepted = true;
    saveAbVariant('landing_2', 1000);
    assert.equal(readAbVariant(2000), 'landing_2');
    assert.equal(readAbVariant(1000 + 30*86400000), null);
    saveAbVariant('control'); session.set(AB_PENDING_KEY, '{}');
    accepted = false;
    assert.equal(canMeasureAb(), false);
    assert.equal(local.has(AB_VARIANT_KEY), false);
    assert.equal(session.has(AB_PENDING_KEY), false);
    window.localStorage = { getItem() { throw Error('Blocked'); }, setItem() { throw Error('Blocked'); }, removeItem() { throw Error('Blocked'); } };
    accepted = true;
    assert.doesNotThrow(() => saveAbVariant('control'));
    assert.equal(readAbVariant(), null);
    window.getCkyConsent = () => ({ isUserActionCompleted: false, categories: { analytics: true } });
    assert.equal(canMeasureAb(), false);
  } finally { delete global.window; }
});
