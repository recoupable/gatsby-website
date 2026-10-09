"use client";

import { Analytics } from "@vercel/analytics/next";
import { sanitizeAnalyticsEvent } from "@/lib/funnel-analytics";

export default function FunnelAnalytics() {
  return <Analytics beforeSend={sanitizeAnalyticsEvent} />;
}
