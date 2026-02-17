export type ConsentPreferences = {
  necessary: true;        // siempre true
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState = {
  version: number;        // para invalidar consentimientos viejos si cambias algo
  updatedAt: string;      // ISO date
  prefs: ConsentPreferences;
};

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "clc_cookie_consent_v1";

export const defaultPrefs: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function buildState(prefs: Omit<ConsentPreferences, "necessary"> & { necessary?: true }): ConsentState {
  return {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    prefs: {
      necessary: true,
      analytics: !!prefs.analytics,
      marketing: !!prefs.marketing,
    },
  };
}

export function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;

    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    if (!parsed.prefs || parsed.prefs.necessary !== true) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
}