import test from 'node:test';
import assert from 'node:assert/strict';
import { canMeasureAb, AB_PENDING_KEY, AB_VARIANT_KEY } from '../src/lib/ab-consent.js';
import { AB_VARIANTS, scheduleAbNavigation, scheduleAbExposure } from '../src/lib/ab-experiment.js';

function fixture(t, random = 0.75) {
  const originalNow = Date.now, originalRandom = Math.random;
  let now = 100000, nextId = 0, consent;
  const timers = new Map(), local = new Map(), session = new Map();
  const operations = [];
  const storage = map => ({
    getItem(key) { operations.push(['get', key]); return map.get(key) ?? null; },
    setItem(key, value) { operations.push(['set', key]); map.set(key, value); },
    removeItem(key) { operations.push(['remove', key]); map.delete(key); },
  });
  global.document = new EventTarget();
  global.window = {
    location: { pathname: '/simulador-golf', search: '?utm_source=test', hash: '#estudio' },
    localStorage: storage(local), sessionStorage: storage(session), dataLayer: [],
    getCkyConsent: () => consent,
    google_tag_manager: { 'GTM-T7PPSQWJ': {} },
    setTimeout(fn, ms) { const id = ++nextId; timers.set(id, { at: now + ms, fn }); return id; },
    clearTimeout(id) { timers.delete(id); },
  };
  Date.now = () => now;
  Math.random = () => random;
  t.after(() => { Date.now = originalNow; Math.random = originalRandom; delete global.window; delete global.document; });
  const tick = (ms = 0) => {
    const target = now + ms;
    for (;;) {
      const first = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
      if (!first || first[1].at > target) break;
      now = first[1].at; timers.delete(first[0]); first[1].fn();
    }
    now = target;
  };
  const setConsent = (state, emit = true) => {
    consent = state === 'loading' ? undefined : {
      isUserActionCompleted: state !== 'pending', categories: { analytics: state === 'granted' },
    };
    if (emit) document.dispatchEvent(new Event('cookieyes_consent_update'));
  };
  let destination;
  const route = () => scheduleAbNavigation((url, options) => {
    destination = url;
    assert.equal(options.replace, true);
    window.location.pathname = url.split(/[?#]/)[0];
  });
  const exposure = variant => scheduleAbExposure({ expectedVariant: variant, landingVersion: AB_VARIANTS[variant].landingVersion });
  return { tick, setConsent, route, exposure, local, session, operations, timers, destination: () => destination };
}

for (const [variant, random] of [['control', 0.2], ['landing_2', 0.8]]) {
  test(`${variant}: first visit waits for CMP and sends once after late acceptance`, t => {
    const f = fixture(t, random);
    f.route(); f.tick(1000);
    assert.equal(f.destination(), undefined);
    assert.deepEqual(f.operations, []);
    f.setConsent('pending'); f.tick();
    assert.equal(f.destination(), `${AB_VARIANTS[variant].path}?utm_source=test#estudio`);
    const cleanup = f.exposure(variant); f.tick(1000);
    assert.deepEqual(window.dataLayer, []);
    assert.deepEqual(f.operations, []);
    f.setConsent('granted'); f.tick();
    assert.deepEqual(window.dataLayer, [{ event: 'ab_assignment', experiment_name: 'landing_control_vs_landing_2',
      ab_variant: variant, landing_version: AB_VARIANTS[variant].landingVersion, exposure_page: AB_VARIANTS[variant].path }]);
    assert.equal(JSON.parse(f.local.get(AB_VARIANT_KEY)).variant, variant);
    cleanup(); f.exposure(variant); f.tick();
    f.setConsent('granted'); f.tick(1000);
    assert.equal(window.dataLayer.length, 1);
    assert.equal(f.timers.size, 0);
  });
}

test('returning visitor: delayed CMP does not erase or rerandomize saved variant', t => {
  const f = fixture(t, 0.1);
  f.local.set(AB_VARIANT_KEY, JSON.stringify({ variant: 'landing_2', expiresAt: Date.now() + 100000 }));
  assert.equal(canMeasureAb(), false);
  f.route(); f.tick(2000);
  assert.deepEqual(f.operations, []);
  assert.ok(f.local.has(AB_VARIANT_KEY));
  f.setConsent('granted', false); f.tick(250);
  assert.equal(window.location.pathname, AB_VARIANTS.landing_2.path);
  f.exposure('landing_2'); f.tick();
  assert.equal(window.dataLayer[0].ab_variant, 'landing_2');
});

test('rejection clears old storage; no event or persistent assignment until later acceptance', t => {
  const f = fixture(t);
  f.local.set(AB_VARIANT_KEY, '{}'); f.session.set(AB_PENDING_KEY, '{}');
  f.setConsent('denied'); f.route(); f.tick(); f.exposure('landing_2'); f.tick(1000);
  assert.equal(f.local.size + f.session.size, 0);
  assert.equal(window.dataLayer.length, 0);
  assert.equal(f.operations.some(([op]) => op === 'set' || op === 'get'), false);
  f.setConsent('granted'); f.tick();
  assert.equal(window.dataLayer.length, 1);
  f.setConsent('denied'); canMeasureAb();
  assert.equal(f.local.size + f.session.size, 0);
  f.setConsent('granted'); f.exposure('landing_2'); f.tick();
  assert.equal(window.dataLayer.length, 1);
});

test('GTM arriving late retries, but withdrawal before GTM prevents sending', t => {
  const f = fixture(t);
  window.google_tag_manager = {};
  f.setConsent('granted'); f.route(); f.tick(); f.exposure('landing_2'); f.tick(1000);
  assert.equal(window.dataLayer.length, 0);
  f.setConsent('denied'); f.tick();
  window.google_tag_manager['GTM-T7PPSQWJ'] = {};
  f.tick(1000);
  assert.equal(window.dataLayer.length, 0);
  f.setConsent('granted'); f.tick();
  assert.equal(window.dataLayer.length, 1);
});

test('blocked storage still routes and deduplicates in memory', t => {
  const f = fixture(t);
  const blocked = () => { throw Error('Blocked'); };
  window.localStorage = window.sessionStorage = { getItem: blocked, setItem: blocked, removeItem: blocked };
  f.setConsent('granted'); f.route(); f.tick(); f.exposure('landing_2'); f.tick();
  f.exposure('landing_2'); f.tick();
  assert.equal(window.dataLayer.length, 1);
});

test('unmount cancels timers/listeners; remount sends once', t => {
  const f = fixture(t);
  f.setConsent('pending'); const cancel = f.route(); cancel(); f.tick();
  assert.equal(f.destination(), undefined);
  f.route(); f.tick(); const stop = f.exposure('landing_2'); f.tick(); stop();
  f.setConsent('granted'); f.tick(1000);
  assert.equal(window.dataLayer.length, 0);
  assert.equal(f.timers.size, 0);
  f.exposure('landing_2'); f.tick();
  assert.equal(window.dataLayer.length, 1);
});

test('CMP blocked: bounded fallback, no enrollment, saved variant untouched', t => {
  const f = fixture(t);
  f.local.set(AB_VARIANT_KEY, JSON.stringify({ variant: 'landing_2', expiresAt: Date.now() + 100000 }));
  f.route(); f.tick(5000);
  assert.equal(window.location.pathname, AB_VARIANTS.control.path);
  assert.deepEqual(f.operations, []);
  f.setConsent('granted'); f.exposure('control'); f.tick();
  assert.equal(window.dataLayer.length, 0);
  assert.equal(JSON.parse(f.local.get(AB_VARIANT_KEY)).variant, 'landing_2');
});

test('direct landing visit is not an A/B assignment', t => {
  const f = fixture(t);
  f.setConsent('granted'); window.location.pathname = AB_VARIANTS.control.path;
  f.exposure('control'); f.tick();
  assert.equal(window.dataLayer.length, 0);
});

test('wrong landing and expired exposures are not counted', t => {
  const f = fixture(t);
  f.setConsent('pending'); f.route(); f.tick();
  f.setConsent('granted'); f.exposure('control'); f.tick();
  assert.equal(window.dataLayer.length, 0);
  f.tick(10 * 60 * 1000); f.exposure('landing_2'); f.tick();
  assert.equal(window.dataLayer.length, 0);
});

test('preview hosts do not enroll or emit', t => {
  const f = fixture(t);
  window.__GOLF_EN_CASA_TRACKING_ENABLED__ = false;
  f.setConsent('granted'); f.route(); f.tick(); f.exposure('control'); f.tick();
  assert.equal(f.destination(), '/instalacion-simuladores-golf?utm_source=test#estudio');
  assert.deepEqual(f.operations, []);
  assert.equal(window.dataLayer.length, 0);
});

test('consented pending exposure survives reload; sent marker prevents another send', t => {
  const f = fixture(t);
  f.setConsent('granted');
  window.location.pathname = AB_VARIANTS.control.path;
  f.session.set(AB_PENDING_KEY, JSON.stringify({
    experimentName: 'landing_control_vs_landing_2', variant: 'control',
    landingVersion: 'landing_control_v1', createdAt: Date.now(), sentAt: null,
  }));
  f.exposure('control'); f.tick();
  assert.equal(window.dataLayer.length, 1);
  // New page global: memory is gone but browser storage remains.
  global.window = { ...window, dataLayer: [] };
  f.exposure('control'); f.tick();
  assert.equal(window.dataLayer.length, 0);
});

test('pending observer expires without consent and leaves no timers', t => {
  const f = fixture(t);
  f.setConsent('pending'); f.route(); f.tick(); f.exposure('landing_2'); f.tick(10 * 60 * 1000);
  assert.equal(f.timers.size, 0);
  assert.deepEqual(f.operations, []);
  f.setConsent('granted'); f.tick();
  assert.equal(window.dataLayer.length, 0);
});
