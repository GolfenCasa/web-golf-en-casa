import { MEASUREMENT_NOTICE_VERSION } from '../../shared/measurement-consent.js';

export function captureFormMeasurementConsent(form, locale = 'es') {
  return {
    granted: form?.elements?.advertisingMeasurementConsent?.checked === true,
    noticeVersion: MEASUREMENT_NOTICE_VERSION,
    source: 'optional_form_checkbox',
    locale,
    capturedAt: new Date().toISOString(),
  };
}
