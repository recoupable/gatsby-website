/**
 * Phone.tsx
 *
 * Realistic iPhone 15 Pro frame with layered construction:
 *   1. Outer metallic chassis (gradient for 3D titanium look)
 *   2. Thin black bezel gap
 *   3. Inner screen with content
 *   4. Side buttons (volume, mute, power)
 *
 * Uses -apple-system / SF Pro font stack via the .ios-phone CSS class.
 */

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "./LockScreen";
import HomeScreen, { type AppScreen } from "./HomeScreen";
import NotesApp from "./NotesApp";
import VoiceMemosApp from "./VoiceMemosApp";
import MessagesApp from "./MessagesApp";
import UnlockScreen from "./UnlockScreen";

type Screen = "lock" | "home" | AppScreen;

export default function Phone() {
  const [screen, setScreen] = useState<Screen>("lock");
  const [discoveredSongs, setDiscoveredSongs] = useState<Set<string>>(
    new Set()
  );

  const discoverSong = useCallback((songId: string) => {
    setDiscoveredSongs((prev) => {
      if (prev.has(songId)) return prev;
      const next = new Set(prev);
      next.add(songId);
      return next;
    });
  }, []);

  const goTo = useCallback((s: Screen) => setScreen(s), []);

  const renderScreen = () => {
    switch (screen) {
      case "lock":
        return <LockScreen onUnlock={() => goTo("home")} />;
      case "home":
        return (
          <HomeScreen
            onOpenApp={(app) => goTo(app)}
            discoveredCount={discoveredSongs.size}
          />
        );
      case "notes":
        return (
          <NotesApp
            onBack={() => goTo("home")}
            onDiscover={discoverSong}
            discoveredSongs={discoveredSongs}
          />
        );
      case "voicememos":
        return (
          <VoiceMemosApp
            onBack={() => goTo("home")}
            onDiscover={discoverSong}
            discoveredSongs={discoveredSongs}
          />
        );
      case "messages":
        return <MessagesApp onBack={() => goTo("home")} />;
      case "unlock":
        return (
          <UnlockScreen
            onBack={() => goTo("home")}
            discoveredCount={discoveredSongs.size}
          />
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Outer wrapper — positions side buttons relative to the phone */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* --- Side buttons (left) --- */}
        {/* Mute switch */}
        <div
          className="absolute -left-[2px] top-[120px] w-[3px] h-[28px] rounded-l-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #6e6e73 0%, #48484a 50%, #6e6e73 100%)",
          }}
        />
        {/* Volume up */}
        <div
          className="absolute -left-[2px] top-[172px] w-[3px] h-[48px] rounded-l-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #6e6e73 0%, #48484a 50%, #6e6e73 100%)",
          }}
        />
        {/* Volume down */}
        <div
          className="absolute -left-[2px] top-[230px] w-[3px] h-[48px] rounded-l-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #6e6e73 0%, #48484a 50%, #6e6e73 100%)",
          }}
        />

        {/* --- Side button (right) --- */}
        {/* Power / Action button */}
        <div
          className="absolute -right-[2px] top-[190px] w-[3px] h-[64px] rounded-r-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #6e6e73 0%, #48484a 50%, #6e6e73 100%)",
          }}
        />

        {/* === Layer 1: Metallic chassis === */}
        <div
          className="rounded-[55px] p-[2.5px]"
          style={{
            background: `linear-gradient(
              145deg,
              #8a8a8e 0%,
              #6e6e73 15%,
              #48484a 35%,
              #3a3a3c 50%,
              #48484a 65%,
              #6e6e73 85%,
              #8a8a8e 100%
            )`,
            boxShadow: `
              0 30px 80px rgba(0,0,0,0.6),
              0 0 0 0.5px rgba(255,255,255,0.1),
              inset 0 0.5px 0 rgba(255,255,255,0.15),
              inset 0 -0.5px 0 rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* === Layer 2: Black bezel gap === */}
          <div className="rounded-[53px] p-[1.5px] bg-black">
            {/* === Layer 3: Screen === */}
            <div
              className="ios-phone relative w-[390px] h-[844px] max-h-[85vh] rounded-[51px] overflow-hidden bg-black"
            >
              {/* Screen content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: screen === "lock" ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>

              {/* Home indicator bar */}
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-white/30 z-50" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
