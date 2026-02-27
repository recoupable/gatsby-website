/**
 * HomeScreen.tsx
 *
 * Realistic iOS 17 home screen.
 * - 60x60 app icons with proper iOS border-radius (13.4px)
 * - SF Pro 11px labels
 * - Wallpaper-style dark purple tint
 * - Dock at bottom with discovery progress
 * - Unlock app appears after 3+ songs discovered
 */

"use client";

import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import Wallpaper from "./Wallpaper";
import { SONGS_TO_UNLOCK } from "./config";

/** The screens that can be navigated to from the home screen */
export type AppScreen = "notes" | "voicememos" | "messages" | "unlock";

type HomeScreenProps = {
  onOpenApp: (screen: AppScreen) => void;
  discoveredCount: number;
};

/** iOS-style app icon */
function AppIcon({
  icon,
  label,
  gradient,
  onClick,
  badge,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  onClick: () => void;
  badge?: number;
  delay: number;
}) {
  return (
    <motion.button
      className="flex flex-col items-center gap-[6px] active:scale-90 transition-transform"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.25, type: "spring", stiffness: 400 }}
    >
      <div
        className="w-[60px] h-[60px] rounded-[13.4px] flex items-center justify-center relative shadow-lg"
        style={{ background: gradient }}
      >
        {icon}
        {/* iOS notification badge */}
        {badge && badge > 0 && (
          <div className="absolute -top-[5px] -right-[5px] min-w-[22px] h-[22px] bg-[#ff3b30] rounded-full flex items-center justify-center px-1 border-2 border-black">
            <span className="text-white text-[13px] font-medium">
              {badge}
            </span>
          </div>
        )}
      </div>
      <span className="text-white text-[11px] font-medium tracking-[0.01em] drop-shadow-sm">
        {label}
      </span>
    </motion.button>
  );
}

/** Notes app icon (iOS-accurate) */
function NotesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="20" height="24" rx="2" fill="white" />
      <line x1="9" y1="10" x2="23" y2="10" stroke="#e5c54c" strokeWidth="1.2" />
      <line x1="9" y1="14" x2="23" y2="14" stroke="#d4d4d8" strokeWidth="0.8" />
      <line x1="9" y1="17.5" x2="23" y2="17.5" stroke="#d4d4d8" strokeWidth="0.8" />
      <line x1="9" y1="21" x2="18" y2="21" stroke="#d4d4d8" strokeWidth="0.8" />
    </svg>
  );
}

/** Voice Memos app icon (iOS-accurate) */
function VoiceMemosIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      {/* Waveform bars */}
      {[4, 8, 12, 16, 20, 24].map((x, i) => {
        const heights = [8, 16, 12, 20, 10, 14];
        const h = heights[i];
        return (
          <rect
            key={x}
            x={x}
            y={15 - h / 2}
            width="2.5"
            height={h}
            rx="1.25"
            fill="white"
          />
        );
      })}
    </svg>
  );
}

/** Messages app icon (iOS-accurate) */
function MessagesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M15 5C8.9 5 4 9 4 14c0 2.8 1.5 5.3 3.8 7l-.8 4 4.2-2.2c1.2.4 2.4.6 3.8.6 6.1 0 11-4 11-9s-4.9-9.4-11-9.4z"
        fill="white"
      />
    </svg>
  );
}

export default function HomeScreen({
  onOpenApp,
  discoveredCount,
}: HomeScreenProps) {
  const unlockReady = discoveredCount >= SONGS_TO_UNLOCK;

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Animated wallpaper */}
      <Wallpaper />

      <div className="relative z-10 flex flex-col flex-1">
      <StatusBar />

      {/* App grid — positioned like iOS (upper portion of screen) */}
      <div className="flex-1 flex flex-col items-center pt-16">
        {/* Row 1: Main apps */}
        <div className="flex gap-[28px] mb-[28px]">
          <AppIcon
            icon={<NotesIcon />}
            label="Notes"
            gradient="linear-gradient(180deg, #f8d448 0%, #e6a817 100%)"
            onClick={() => onOpenApp("notes")}
            badge={5}
            delay={0.1}
          />
          <AppIcon
            icon={<VoiceMemosIcon />}
            label="Voice Memos"
            gradient="linear-gradient(180deg, #1c1c1e 0%, #0a0a0a 100%)"
            onClick={() => onOpenApp("voicememos")}
            badge={5}
            delay={0.15}
          />
          <AppIcon
            icon={<MessagesIcon />}
            label="Messages"
            gradient="linear-gradient(180deg, #65d36e 0%, #34c759 100%)"
            onClick={() => onOpenApp("messages")}
            badge={1}
            delay={0.2}
          />
        </div>

        {/* Row 2: Unlock app (appears when enough songs discovered) */}
        {unlockReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <AppIcon
              icon={
                <span className="text-[28px]">💜</span>
              }
              label="for you"
              gradient="linear-gradient(180deg, #7c3aed 0%, #4c1d95 100%)"
              onClick={() => onOpenApp("unlock")}
              badge={1}
              delay={0}
            />
          </motion.div>
        )}
      </div>

      {/* Dock area — discovery progress */}
      <div
        className="mx-3 mb-6 py-4 px-6 rounded-[26px] flex flex-col items-center gap-2"
        style={{
          background: "rgba(45, 45, 48, 0.45)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
      >
        <div className="flex gap-[10px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[6px] h-[6px] rounded-full"
              style={{
                background:
                  i < discoveredCount
                    ? "#7c3aed"
                    : "rgba(255,255,255,0.2)",
              }}
              initial={false}
              animate={
                i < discoveredCount
                  ? { scale: [1, 1.5, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        {discoveredCount > 0 && (
          <motion.p
            className="text-white/30 text-[11px] tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {discoveredCount}/5 discovered
          </motion.p>
        )}
      </div>
    </div>
    </div>
  );
}
