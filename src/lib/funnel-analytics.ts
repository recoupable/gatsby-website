import { track, type BeforeSendEvent } from "@vercel/analytics";

const campaignValues: Record<string, readonly string[]> = {
  utm_source: ["instagram", "tiktok", "youtube", "facebook", "x", "newsletter", "verification"],
  utm_medium: ["social", "paid_social", "email"],
  utm_campaign: ["bio", "i_wish", "release_check"],
  utm_content: ["profile", "reel", "story", "video"],
};

const shortSources: Record<string, string> = {
  ig: "instagram",
  tt: "tiktok",
  yt: "youtube",
  x: "x",
};

function acquisitionQuery(url: URL): URLSearchParams {
  const query = new URLSearchParams(url.search);
  const pathname = url.pathname.replace(/\/$/, "");
  const pathSource = Object.keys(shortSources).find(key => pathname === `/listen/${key}`);
  if (pathname === "/listen" || pathSource) {
    const matches = pathSource ? [pathSource] : Object.keys(shortSources).filter(key => query.has(key));
    // Ambiguous shorthand must not silently attribute to the first platform.
    if (matches.length === 1) {
      query.set("utm_source", shortSources[matches[0]]);
      query.set("utm_medium", "social");
      query.set("utm_campaign", "bio");
      query.set("utm_content", "profile");
    }
  }
  return query;
}

// Keep attribution finite and exclude arbitrary query strings from analytics.
export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url);
  if (!["gatsby.wtf", "www.gatsby.wtf"].includes(url.hostname) || url.searchParams.has("analytics_test")) return null;
  const clean = new URL(url.origin + url.pathname);
  const query = acquisitionQuery(url);
  for (const [key, values] of Object.entries(campaignValues)) {
    const value = query.get(key)?.toLowerCase();
    if (value && values.includes(value)) clean.searchParams.set(key, value);
  }
  return { ...event, url: clean.toString() };
}

export function trackFunnelEvent(name: "landing_viewed" | "music_link_clicked" | "signup_completed", provider?: "spotify" | "apple_music") {
  const path = new URL(window.location.href).pathname;
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const sourcePath = Object.keys(shortSources).some(key => normalizedPath === `/listen/${key}`);
  if (!["/", "/listen", "/i-wish"].includes(normalizedPath) && !sourcePath) return;
  if (!sanitizeAnalyticsEvent({ type: "event", url: window.location.href })) return;
  const query = acquisitionQuery(new URL(window.location.href));
  const source = Object.entries(campaignValues).map(([key, values]) => {
    const value = query.get(key)?.toLowerCase();
    return value && values.includes(value) ? value : "unattributed";
  }).join("/");
  // Pro allows two custom properties; the song route adds a finite suffix.
  const acquisition = path.startsWith("/i-wish") ? `${source}/i_wish` : source;
  try {
    track(name, { acquisition, ...(provider ? { provider } : {}) });
  } catch {
    // Measurement must never interrupt the handoff to music or signup success.
  }
}
