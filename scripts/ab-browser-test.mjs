// Run after npm run build. Uses Playwright if installed or PLAYWRIGHT_PATH.
// All traffic is intercepted: no events, forms or conversions reach real services.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_PATH
  ? pathToFileURL(process.env.PLAYWRIGHT_PATH).href : 'playwright');
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const key = 'golf_en_casa_ab_landing_v1';
const pendingKey = 'golf_en_casa_ab_pending_v1';
const variants = {
  control: '/instalacion-simuladores-golf', landing_2: '/estudio-simulador-golf',
};
try {
  for (const variant of Object.keys(variants)) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname !== 'aquigolf.es') return route.fulfill({ status: 200, body: '', contentType: 'text/javascript' });
      let relative = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
      if (!path.extname(relative)) relative += '.html';
      const filename = path.resolve(dist, relative);
      if (!filename.startsWith(dist)) return route.abort();
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
      try { await route.fulfill({ body: await readFile(filename), contentType: types[path.extname(filename)] || 'application/octet-stream' }); }
      catch { await route.fulfill({ status: 404, body: '' }); }
    });
    await page.addInitScript(({ variant }) => {
      Math.random = () => variant === 'control' ? 0.2 : 0.8;
      window.__abTestConsent = { isUserActionCompleted: false, categories: { analytics: false } };
      window.google_tag_manager = { 'GTM-T7PPSQWJ': {} };
      // Reproduce delayed CMP, including returning visits.
      setTimeout(() => {
        window.getCkyConsent = () => window.__abTestConsent;
        document.dispatchEvent(new Event('cookieyes_banner_loaded'));
      }, 800);
    }, { variant });
    await page.goto('https://aquigolf.es/simulador-golf?utm_source=ab-local-test#estudio');
    await page.waitForURL(`**${variants[variant]}?utm_source=ab-local-test#estudio`);
    await page.locator('h1').waitFor();
    assert.equal(await page.evaluate(key => localStorage.getItem(key), key), null);
    assert.equal(await page.evaluate(key => sessionStorage.getItem(key), pendingKey), null);
    assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(x => x.event === 'ab_assignment').length), 0);
    await page.evaluate(() => {
      window.__abTestConsent = { isUserActionCompleted: true, categories: { analytics: true } };
      document.dispatchEvent(new Event('cookieyes_consent_update'));
    });
    await page.waitForFunction(() => window.dataLayer.some(x => x.event === 'ab_assignment'));
    const events = await page.evaluate(() => window.dataLayer.filter(x => x.event === 'ab_assignment'));
    assert.equal(events.length, 1);
    assert.equal(events[0].ab_variant, variant);
    assert.equal(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).variant, key), variant);
    // A repeated notification must not add another exposure.
    await page.evaluate(() => document.dispatchEvent(new Event('cookieyes_consent_update')));
    await page.waitForTimeout(500);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(x => x.event === 'ab_assignment').length), 1);
    assert.deepEqual(errors, []);
    console.log(`Browser OK: ${variant}, real React redirect, late consent, preserved query/hash, one event, no JS errors`);
    await context.close();
  }
} finally { await browser.close(); }
