import React from "react";
import { useConsent } from "./ConsentContext";

export default function ConsentGate({
  category,
  children,
  fallback = null,
}: {
  category: "analytics" | "marketing";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { prefs } = useConsent();

  if (!prefs[category]) return <>{fallback}</>;
  return <>{children}</>;
}
