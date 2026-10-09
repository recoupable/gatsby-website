import { track, type BeforeSendEvent } from "@vercel/analytics";

const campaignValues: Record<string, readonly string[]> = {
  utm_source: ["instagram", "tiktok", "youtube", "facebook", "newsletter"],
  utm_medium: ["social", "paid_social", "email"],
  utm_campaign: ["bio", "i_wish"],
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

export function trackFunnelEvent(name: "music_link_clicked" | "signup_completed", provider?: "spotify" | "apple_music") {
  if (!sanitizeAnalyticsEvent({ type: "event", url: window.location.href })) return;
  const query = new URLSearchParams(window.location.search);
  const attribution = Object.fromEntries(Object.entries(campaignValues).map(([key, values]) => {
    const value = query.get(key)?.toLowerCase();
    return [key.replace("utm_", ""), value && values.includes(value) ? value : "unattributed"];
  }));
  try {
    track(name, { ...attribution, ...(provider ? { provider, destination: provider === "spotify" ? "starter_pack_playlist" : "beautiful_tomorrow_album" } : {}), variant: "video_centered_v1" });
  } catch {
    // Measurement must never interrupt the handoff to music or signup success.
  }
}
