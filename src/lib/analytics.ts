"use client";

export type AnalyticsEvent = "callback_open" | "phone_click" | "package_select" | "project_view" | "lead_submit" | "lead_success" | "technology_cta_click" | "technology_cta_submit" | "technology_topic_click" | "technology_hotspot_click";

type AnalyticsWindow = Window & {
  ym?: (counterId: number, action: "reachGoal", goal: AnalyticsEvent) => void;
  gtag?: (command: "event", event: AnalyticsEvent) => void;
};

export function trackAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const browser = window as AnalyticsWindow;
  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (Number.isFinite(metrikaId) && metrikaId > 0 && browser.ym) browser.ym(metrikaId, "reachGoal", event);
  browser.gtag?.("event", event);
}