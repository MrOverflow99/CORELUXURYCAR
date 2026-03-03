import { useConsent } from "./ConsentContext";

export default function ConsentGate({ category, children, fallback = null }) {
  const { prefs } = useConsent();

  if (!prefs[category]) return <>{fallback}</>;
  return <>{children}</>;
}
