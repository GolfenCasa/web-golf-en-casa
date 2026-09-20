import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normaliseMeasurementConsent, MEASUREMENT_NOTICE_VERSION } from '../shared/measurement-consent.js';
import { captureFormMeasurementConsent } from '../src/lib/form-measurement-consent.js';
import { enhancedConversionData } from '../src/lib/consent.js';

test('Permiso explícito, independiente y sin inferencias desde privacidad o cookies', () => {
  const now = new Date();
  const input = captureFormMeasurementConsent({elements:{advertisingMeasurementConsent:{checked:true}}}, 'es');
  assert.equal(normaliseMeasurementConsent(input).status, 'GRANTED');
  assert.equal(normaliseMeasurementConsent({...input, granted:false}).status, 'DENIED');
  for (const candidate of [undefined, {}, {privacyConsent:true}, {...input, granted:'true'},
    {...input, noticeVersion:'old'}, {...input, source:'cookieyes'}, {...input, locale:'xx'},
    {...input, capturedAt:'invalid'}, {...input, capturedAt:new Date(now.getTime()-3600000).toISOString()},
    {...input, capturedAt:new Date(now.getTime()+3600000).toISOString()}]) {
    assert.equal(normaliseMeasurementConsent(candidate, now).status,'UNKNOWN');
  }
  assert.equal(captureFormMeasurementConsent({elements:{}}).granted,false);
  assert.equal(input.noticeVersion,MEASUREMENT_NOTICE_VERSION);
  assert.equal(normaliseMeasurementConsent({...input, receivedAt:'2000-01-01'},now).receivedAt,now.toISOString());
  assert.equal(normaliseMeasurementConsent(input).adPersonalization,'DENIED');
});

test('Datos mejorados necesitan casilla y publicidad CMP; retirada inmediata', () => {
  const data = { email_address:'test@example.invalid' };
  let advertisement = true;
  globalThis.window = {getCkyConsent:()=>({isUserActionCompleted:true,categories:{advertisement,analytics:true}})};
  try {
    assert.equal(enhancedConversionData(data),null);
    assert.equal(enhancedConversionData(data,{granted:false}),null);
    assert.deepEqual(enhancedConversionData(data,{granted:true}),data);
    advertisement=false;
    assert.equal(enhancedConversionData(data,{granted:true}),null);
  } finally { delete globalThis.window; }
});
