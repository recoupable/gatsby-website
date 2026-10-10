"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { sanitizeAnalyticsEvent, trackFunnelEvent } from "@/lib/funnel-analytics";

export default function FunnelAnalytics() {
  const pathname = usePathname();
  const recorded = useRef<string | null>(null);
  useEffect(() => {
    if (recorded.current === pathname) return;
    recorded.current = pathname;
    trackFunnelEvent("landing_viewed");
  }, [pathname]);
  return <Analytics beforeSend={sanitizeAnalyticsEvent} />;
}
