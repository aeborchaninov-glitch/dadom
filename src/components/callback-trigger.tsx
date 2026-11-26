"use client";

import type { ReactNode } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type CallbackTriggerProps = { children: ReactNode; className?: string; source?: "technology_cta" };

export function CallbackTrigger({ children, className, source = "technology_cta" }: CallbackTriggerProps) {
  return <button type="button" className={className} onClick={() => {
    trackAnalyticsEvent("technology_cta_click");
    window.dispatchEvent(new CustomEvent("dadom:open-callback", { detail: { source } }));
  }}>{children}</button>;
}