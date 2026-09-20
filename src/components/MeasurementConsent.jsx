import { MEASUREMENT_NOTICE } from '../../shared/measurement-consent.js';

export default function MeasurementConsent({ english = false, className = '' }) {
  return (
    <label className={`mt-3 flex items-start gap-3 text-xs leading-5 ${className}`}>
      <input type="checkbox" name="advertisingMeasurementConsent" className="mt-1 shrink-0" />
      <span>
        {MEASUREMENT_NOTICE[english ? 'en' : 'es']}{' '}
        <a className="underline" href={english ? '/en/privacy-policy#advertising-measurement' : '/politica-privacidad#medicion-publicitaria'}>
          {english ? 'More information' : 'Más información'}
        </a>
      </span>
    </label>
  );
}
