import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { buildState, defaultPrefs, loadConsent, saveConsent, ConsentState } from "./consent";

type ConsentContextValue = {
  consent: ConsentState | null;
  prefs: ConsentState["prefs"];             // siempre definido para UI
  hasDecision: boolean;                     // el usuario ya decidió o no
  setAll: (value: "accept_all" | "reject_all") => void;
  savePrefs: (prefs: { analytics: boolean; marketing: boolean }) => void;

  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(() => loadConsent());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const hasDecision = !!consent;

  const prefs = consent?.prefs ?? defaultPrefs;

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const setAll = useCallback((value: "accept_all" | "reject_all") => {
    const next =
      value === "accept_all"
        ? buildState({ analytics: true, marketing: true })
        : buildState({ analytics: false, marketing: false });

    saveConsent(next);
    setConsent(next);
  }, []);

  const savePrefsFn = useCallback((p: { analytics: boolean; marketing: boolean }) => {
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
