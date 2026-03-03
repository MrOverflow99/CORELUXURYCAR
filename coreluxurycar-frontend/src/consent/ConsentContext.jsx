import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { buildState, defaultPrefs, loadConsent, saveConsent } from "./consent";

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => loadConsent());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const hasDecision = !!consent;
  const prefs = consent?.prefs ?? defaultPrefs;

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const setAll = useCallback((value) => {
    const next =
      value === "accept_all"
        ? buildState({ analytics: true, marketing: true })
        : buildState({ analytics: false, marketing: false });

    saveConsent(next);
    setConsent(next);
  }, []);

  const savePrefsFn = useCallback((p) => {
    const next = buildState({ analytics: p.analytics, marketing: p.marketing });
    saveConsent(next);
    setConsent(next);
  }, []);

  const ctx = useMemo(
    () => ({
      consent,
      prefs,
      hasDecision,
      setAll,
      savePrefs: savePrefsFn,
      isSettingsOpen,
      openSettings,
      closeSettings,
    }),
    [consent, prefs, hasDecision, setAll, savePrefsFn, isSettingsOpen, openSettings, closeSettings]
  );

  return <ConsentContext.Provider value={ctx}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}
