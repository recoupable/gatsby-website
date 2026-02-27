/**
 * config.ts
 *
 * Tab definitions and content for Gatsby's 2am browser.
 * Each tab maps to a song on the ADHD EP.
 * Mix of "real" sites (Google, Spotify, YouTube) and personal docs.
 */

export type TabDef = {
  id: string;
  title: string;
  favicon: string;
  url: string;
  songId?: string;
};

/** The tabs open in Gatsby's browser at 2:47am */
export const TABS: TabDef[] = [
  {
    id: "google-focus",
    title: "why can't i focus on anything - Google Search",
    favicon: "google",
    url: "google.com/search?q=why+can%27t+i+focus+on+anything",
    songId: "adhd",
  },
  {
    id: "notes",
    title: "untitled document",
    favicon: "doc",
    url: "docs.google.com/document/d/untitled-247am",
    songId: "junk-drawer",
  },
  {
    id: "spotify",
    title: "adhd ep · gatsby grace - Spotify",
    favicon: "spotify",
    url: "open.spotify.com/album/gatsby-grace-adhd-ep",
    // no single songId — individual tracks discovered via play buttons
  },
  {
    id: "youtube",
    title: "how to stop overthinking at 3am - YouTube",
    favicon: "youtube",
    url: "youtube.com/watch?v=3am_overthinking",
    songId: "brainrot",
  },
  {
    id: "google-hiccups",
    title: "what do hiccups mean spiritually - Google Search",
    favicon: "google",
    url: "google.com/search?q=what+do+hiccups+mean+spiritually",
    songId: "hiccups",
  },
  {
    id: "google-rental",
    title: "can you return a rental car in a different city - Google Search",
    favicon: "google",
    url: "google.com/search?q=can+you+return+a+rental+car+in+a+different+city",
    songId: "rental-car",
  },
];

/** EP songs with audio references */
export type Song = {
  id: string;
  title: string;
  duration: string;
  audioSrc: string;
};

export const EP_SONGS: Song[] = [
  { id: "adhd", title: "adhd", duration: "2:14", audioSrc: "/audio/adhd.mp3" },
  { id: "brainrot", title: "brainrot", duration: "2:58", audioSrc: "/audio/brainrot.mp3" },
  { id: "hiccups", title: "hiccups", duration: "3:42", audioSrc: "/audio/hiccups.mp3" },
  { id: "junk-drawer", title: "junk drawer", duration: "2:55", audioSrc: "/audio/junk-drawer.mp3" },
  { id: "rental-car", title: "rental car", duration: "2:45", audioSrc: "/audio/rental-car.mp3" },
];

export const SONGS_TO_UNLOCK = 3;
