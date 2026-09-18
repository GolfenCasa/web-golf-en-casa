// CookieYes is loaded by GTM. An unavailable CMP is not consent.
// https://www.cookieyes.com/documentation/retrieving-consent-data-using-api-getckyconsent/
export function getMeasurementConsent() {
  try {
    const consent = typeof window !== 'undefined' && window.getCkyConsent?.();
    if (consent?.isUserActionCompleted !== true) return { analytics: false, advertising: false };
    return {
      analytics: consent.categories?.analytics === true,
      advertising: consent.categories?.advertisement === true,
    };
  } catch {
    return { analytics: false, advertising: false };
  }
}

export function enhancedConversionData(data) {
  // null also clears a previous dataLayer value if consent has been withdrawn.
  return getMeasurementConsent().advertising ? data : null;
}
