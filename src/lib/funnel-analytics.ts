import { track, type BeforeSendEvent } from "@vercel/analytics";

const campaignValues: Record<string, readonly string[]> = {
  utm_source: ["instagram", "tiktok", "youtube", "facebook", "newsletter", "verification"],
  utm_medium: ["social", "paid_social", "email"],
  utm_campaign: ["bio", "i_wish", "release_check"],
  utm_content: ["profile", "reel", "story", "video"],
};

// Keep attribution finite and exclude arbitrary query strings from analytics.
export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url);
  if (!["gatsby.wtf", "www.gatsby.wtf"].includes(url.hostname) || url.searchParams.has("analytics_test")) return null;
  const clean = new URL(url.origin + url.pathname);
  for (const [key, values] of Object.entries(campaignValues)) {
    const value = url.searchParams.get(key)?.toLowerCase();
    if (value && values.includes(value)) clean.searchParams.set(key, value);
  }
  return { ...event, url: clean.toString() };
}

export function trackFunnelEvent(name: "landing_viewed" | "music_link_clicked" | "signup_completed", provider?: "spotify" | "apple_music") {
  if (new URL(window.location.href).pathname !== "/") return;
  if (!sanitizeAnalyticsEvent({ type: "event", url: window.location.href })) return;
  const query = new URLSearchParams(window.location.search);
  const acquisition = Object.entries(campaignValues).map(([key, values]) => {
    const value = query.get(key)?.toLowerCase();
    return value && values.includes(value) ? value : "unattributed";
  }).join("/");
  try {
    track(name, { acquisition, ...(provider ? { provider } : {}) });
  } catch {
    // Measurement must never interrupt the handoff to music or signup success.
  }
}
