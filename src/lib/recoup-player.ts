export const recoupPlayerOrigin = process.env.NEXT_PUBLIC_RECOUP_PLAYER_ORIGIN || "https://app.recoupable.dev";
export const playbackEvents = ["connected", "playing", "paused", "track_changed", "fan_captured", "capture_failed"] as const;

export function recoupPlayerUrl(provider: "spotify" | "apple_music", release: string, parent: string): string {
  const url = new URL(`/s/${provider === "spotify" ? "spotify" : "apple"}/connect`, recoupPlayerOrigin);
  url.searchParams.set("release", release);
  url.searchParams.set("parent", parent);
  if (provider === "spotify") {
    for (const [key, value] of Object.entries({ background: "#121212", foreground: "#ffffff", accent: "#1DB954", font: "sans", title: "Listen to Gatsby", artist: "Gatsby Grace", artwork: "" })) url.searchParams.set(key, value);
  }
  return url.toString();
}
