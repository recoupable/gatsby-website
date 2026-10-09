"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { sanitizeAnalyticsEvent, trackFunnelEvent } from "@/lib/funnel-analytics";

export default function FunnelAnalytics() {
  const recorded = useRef(false);
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    trackFunnelEvent("landing_viewed");
  }, []);
  return <Analytics beforeSend={sanitizeAnalyticsEvent} />;
}
