/**
 * Browser.tsx
 *
 * Chrome dark-mode browser frame with tab bar, address bar, and content area.
 * Manages which tab is active, song discovery state, and the unlock flow.
 *
 * The tab bar compresses tabs to fit — just like real Chrome when you have
 * too many tabs open (very ADHD).
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TABS, SONGS_TO_UNLOCK, type TabDef } from "./config";
import GoogleSearchTab from "./GoogleSearchTab";
import NotesTab from "./NotesTab";
import SpotifyTab from "./SpotifyTab";
import YouTubeTab from "./YouTubeTab";
import UnlockTab from "./UnlockTab";

/** Favicon components for each tab type */
function Favicon({ type }: { type: string }) {
  switch (type) {
    case "google":
      return (
        <svg width="14" height="14" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
      );
    case "doc":
      return (
        <svg width="14" height="14" viewBox="0 0 48 48">
          <path fill="#2196F3" d="M37 45H11c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h17l12 12v27c0 1.66-1.34 3-3 3z" />
          <path fill="#BBDEFB" d="M40 15H28V3l12 12z" />
          <path fill="#E3F2FD" d="M15 23h18v2H15zm0 4h18v2H15zm0 4h12v2H15z" />
        </svg>
      );
    case "spotify":
      return (
        <svg width="14" height="14" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="24" fill="#1DB954" />
          <path fill="white" d="M34.4 33.5c-.4 0-.8-.1-1.1-.4-5.2-3.1-11.8-3.8-17.4-2.6-.7.2-1.4-.3-1.5-1-.2-.7.3-1.4 1-1.5 6.2-1.3 13.5-.5 19.2 2.9.6.4.8 1.2.5 1.8-.3.5-.7.8-1.2.8h.5zm2.3-5.3c-.4 0-.8-.2-1.1-.4-6-3.6-15-4.7-22.1-2.6-.8.2-1.6-.2-1.8-1-.2-.8.2-1.6 1-1.8 8-2.4 18-1.2 24.7 2.9.7.4 1 1.4.5 2.1-.2.5-.7.8-1.2.8zm.3-6.2c-7-4.2-18.7-4.6-25.5-2.5-1 .3-2-.2-2.3-1.2-.3-1 .2-2 1.2-2.3 7.8-2.4 20.6-1.9 28.7 2.9.9.5 1.2 1.7.7 2.6-.5.7-1.4 1-2.3.5h-.5z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="14" height="14" viewBox="0 0 48 48">
          <path fill="#FF0000" d="M43.2 11.5c-.5-1.8-1.9-3.2-3.7-3.7C36.2 7 24 7 24 7s-12.2 0-15.5.8c-1.8.5-3.2 1.9-3.7 3.7C4 14.8 4 24 4 24s0 9.2.8 12.5c.5 1.8 1.9 3.2 3.7 3.7C11.8 41 24 41 24 41s12.2 0 15.5-.8c1.8-.5 3.2-1.9 3.7-3.7C44 33.2 44 24 44 24s0-9.2-.8-12.5z" />
          <path fill="#FFF" d="M20 31l10-7-10-7v14z" />
        </svg>
      );
    default:
      return <div className="w-3.5 h-3.5 rounded bg-gray-500" />;
  }
}

export default function Browser() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const [discoveredSongs, setDiscoveredSongs] = useState<Set<string>>(new Set());
  const [showUnlock, setShowUnlock] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const unlockReady = discoveredSongs.size >= SONGS_TO_UNLOCK;

  /** Reveal the unlock tab once threshold is reached */
  useEffect(() => {
    if (unlockReady && !showUnlock) {
      setShowUnlock(true);
    }
  }, [unlockReady, showUnlock]);

  const discoverSong = useCallback((songId: string) => {
    setDiscoveredSongs((prev) => {
      if (prev.has(songId)) return prev;
      return new Set([...prev, songId]);
    });
  }, []);

  /** Play audio for a song */
  const playSong = useCallback((songId: string, audioSrc: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {});
    discoverSong(songId);
  }, [discoverSong]);

  const activeTab = TABS.find((t) => t.id === activeTabId);
  const allTabs = showUnlock
    ? [...TABS, { id: "unlock", title: "New Tab", favicon: "new", url: "chrome://newtab" } as TabDef]
    : TABS;

  /** Render the active tab's content */
  const renderTab = () => {
    if (activeTabId === "unlock") {
      return <UnlockTab discoveredCount={discoveredSongs.size} />;
    }

    switch (activeTabId) {
      case "google-focus":
        return <GoogleSearchTab variant="focus" onDiscover={() => discoverSong("adhd")} />;
      case "google-hiccups":
        return <GoogleSearchTab variant="hiccups" onDiscover={() => discoverSong("hiccups")} />;
      case "google-rental":
        return <GoogleSearchTab variant="rental" onDiscover={() => discoverSong("rental-car")} />;
      case "notes":
        return <NotesTab onDiscover={() => discoverSong("junk-drawer")} />;
      case "spotify":
        return <SpotifyTab onPlay={playSong} discoveredSongs={discoveredSongs} />;
      case "youtube":
        return <YouTubeTab onDiscover={() => discoverSong("brainrot")} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="browser-frame w-full max-w-[1100px] rounded-xl overflow-hidden shadow-2xl"
        style={{
          height: "min(80vh, 750px)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* === Tab bar === */}
        <div className="flex items-end bg-[#202124] pt-2 px-2 gap-0">
          {allTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                className={`group relative flex items-center gap-2 px-3 h-[34px] min-w-0 max-w-[200px] flex-1 text-left transition-colors rounded-t-lg ${
                  isActive
                    ? "bg-[#35363a]"
                    : "bg-transparent hover:bg-[#2d2e31]"
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {/* Favicon */}
                <div className="flex-shrink-0">
                  {tab.id === "unlock" ? (
                    <span className="text-xs">✨</span>
                  ) : (
                    <Favicon type={tab.favicon} />
                  )}
                </div>

                {/* Title — truncated */}
                <span
                  className={`text-[12px] truncate leading-tight ${
                    isActive ? "text-[#e8eaed]" : "text-[#9aa0a6]"
                  }`}
                >
                  {tab.title}
                </span>

                {/* Close button */}
                <div
                  className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ml-auto
                    ${isActive ? "text-[#9aa0a6] hover:bg-[#4a4b4f]" : "text-transparent group-hover:text-[#9aa0a6] hover:bg-[#4a4b4f]"}`}
                >
                  ×
                </div>

                {/* Active tab connector — removes gap between tab and content */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#35363a]" />
                )}
              </button>
            );
          })}

          {/* New tab button */}
          <div className="flex-shrink-0 w-[28px] h-[34px] flex items-center justify-center text-[#9aa0a6] hover:bg-[#2d2e31] rounded-t-lg cursor-pointer text-lg leading-none">
            +
          </div>
        </div>

        {/* === Address bar === */}
        <div className="flex items-center gap-2 bg-[#35363a] px-3 py-[6px]">
          {/* Nav buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9aa0a6] hover:bg-[#4a4b4f]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#5f6368] cursor-not-allowed">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9aa0a6] hover:bg-[#4a4b4f]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7A6 6 0 111 7a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1 7h12" stroke="currentColor" strokeWidth="1" opacity="0" />
              </svg>
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 bg-[#202124] rounded-full px-4 py-[5px] flex items-center gap-2">
            {/* Lock icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
              <rect x="2" y="5" width="8" height="6" rx="1.5" fill="#9aa0a6" />
              <path d="M4 5V3.5a2 2 0 114 0V5" stroke="#9aa0a6" strokeWidth="1.2" fill="none" />
            </svg>
            <span className="text-[#e8eaed] text-[13px] truncate">
              {activeTab?.url || "chrome://newtab"}
            </span>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9aa0a6] hover:bg-[#4a4b4f]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2l1.5 3.5L12 7l-3.5 1.5L7 12l-1.5-3.5L2 7l3.5-1.5L7 2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9aa0a6] hover:bg-[#4a4b4f]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="3" r="1.2" fill="currentColor" />
                <circle cx="7" cy="7" r="1.2" fill="currentColor" />
                <circle cx="7" cy="11" r="1.2" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        {/* === Content area === */}
        <div className="flex-1 overflow-y-auto bg-white" style={{ height: "calc(100% - 78px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Discovery progress — floating indicator */}
      {discoveredSongs.size > 0 && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-full z-50"
          style={{
            background: "rgba(32,33,36,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-[6px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-[6px] h-[6px] rounded-full transition-colors ${
                  i < discoveredSongs.size ? "bg-[#1DB954]" : "bg-[#5f6368]"
                }`}
              />
            ))}
          </div>
          <span className="text-[#9aa0a6] text-[12px]">
            {discoveredSongs.size}/5 songs found
          </span>
        </motion.div>
      )}
    </div>
  );
}
