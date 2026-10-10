const configuredOrigin = process.env.NEXT_PUBLIC_RECOUP_PLAYER_ORIGIN || "https://app.recoupable.dev";
const parsedOrigin = new URL(configuredOrigin);
if (parsedOrigin.username || parsedOrigin.password || parsedOrigin.search || parsedOrigin.hash || parsedOrigin.pathname !== "/" || (parsedOrigin.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && parsedOrigin.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsedOrigin.hostname)))) throw new Error("Invalid Recoup player origin");
export const recoupPlayerOrigin = parsedOrigin.origin;
export const playbackEvents = ["connected", "playing", "paused", "track_changed", "fan_captured", "capture_failed"] as const;
export type PlayerKind = "home" | "iWish";
export function registeredPlayerId(kind: PlayerKind = "home"): string | null {
  const id = kind === "iWish" ? process.env.NEXT_PUBLIC_RECOUP_WISH_PLAYER_ID : process.env.NEXT_PUBLIC_RECOUP_PLAYER_ID;
  return id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ? id : null;
}
export function recoupPlayerUrl(provider: "spotify" | "apple_music", parent: string, acquisition: Record<string, string>, kind: PlayerKind = "home"): string | null {
  const id = registeredPlayerId(kind);
  if (!id) return null;
  const url = new URL(`/listen/${id}/${provider}`, recoupPlayerOrigin);
  url.searchParams.set("parent", parent);
  for (const key of ["source", "medium", "campaign", "content"]) if (acquisition[key]) url.searchParams.set(key, acquisition[key]);
  return url.toString();
}


/** A player may request handoff, but never chooses the website's destination URL. */
export function isSpotifyHandoff(event: MessageEvent, frame: MessageEventSource | null | undefined, provider: "spotify" | "apple_music" | null): boolean {
  return !!frame && event.origin === recoupPlayerOrigin && event.source === frame && provider === "spotify" && event.data?.type === "recoup:open-dsp" && event.data.provider === "spotify";
}
