/**
 * LockScreen.tsx
 *
 * Realistic iOS 17 lock screen — matches real iPhone layout:
 * - Date ABOVE the time (iOS convention)
 * - Time in SF Pro Display, weight ~300, ~80px
 * - Notification card with blur glass
 * - Flashlight + Camera buttons at bottom
 */

"use client";

import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import Wallpaper from "./Wallpaper";

type LockScreenProps = {
  onUnlock: () => void;
};

export default function LockScreen({ onUnlock }: LockScreenProps) {
  return (
    <motion.div
      className="h-full flex flex-col cursor-pointer select-none bg-black relative"
      onClick={onUnlock}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated wallpaper */}
      <Wallpaper />

      {/* Status bar */}
      <div className="relative z-10 flex flex-col flex-1">
      <StatusBar />

      {/* Lock screen content */}
      <div className="flex-1 flex flex-col items-center">
        {/* Date + Time cluster — iOS puts date ABOVE the time */}
        <div className="flex flex-col items-center mt-20">
          {/* Date — smaller, above the time */}
          <motion.p
            className="text-white/80 text-[16px] font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tuesday, February 25
          </motion.p>

          {/* Time — large, light weight, SF Pro Display */}
          <motion.p
            className="text-[80px] leading-[86px] text-white mt-0"
            style={{ fontWeight: 300 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            2:47
          </motion.p>
        </div>

        {/* Spacer pushes notification and buttons to bottom */}
        <div className="flex-1" />

        {/* Notification — iOS glass card */}
        <motion.div
          className="mx-4 w-[calc(100%-32px)] rounded-[16px] p-[13px] mb-3"
          style={{
            background: "rgba(55, 55, 58, 0.65)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {/* App header */}
          <div className="flex items-center gap-[7px] mb-[5px]">
            {/* Voice Memos icon */}
            <div
              className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, #ff453a 0%, #d32d22 100%)",
              }}
            >
              {/* Waveform mini icon */}
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <rect x="1" y="3" width="1.5" height="4" rx="0.75" fill="white" />
                <rect x="3.5" y="1" width="1.5" height="8" rx="0.75" fill="white" />
                <rect x="6" y="2.5" width="1.5" height="5" rx="0.75" fill="white" />
                <rect x="8.5" y="3.5" width="1.5" height="3" rx="0.75" fill="white" />
              </svg>
            </div>
            <span className="text-white/50 text-[13px] font-medium uppercase tracking-[0.02em]">
              Voice Memos
            </span>
            <span className="text-white/35 text-[13px] ml-auto">now</span>
          </div>

          {/* Notification body */}
          <p className="text-white text-[15px] font-medium leading-[18px]">
            New Recording
          </p>
          <p className="text-white/50 text-[14px] leading-[17px] mt-[2px]">
            piano thing 3am — 0:30
          </p>
        </motion.div>

        {/* Bottom: Flashlight + Camera */}
        <div className="flex items-center justify-between w-full px-[46px] pb-[14px] pt-2">
          {/* Flashlight */}
          <motion.div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
              <path
                d="M5 1h8a1 1 0 011 1l-1 8a1 1 0 01-1 1H6a1 1 0 01-1-1L4 2a1 1 0 011-1z"
                fill="white"
              />
              <rect x="6" y="12" width="6" height="8" rx="1" fill="white" />
              <rect x="7.5" y="14" width="3" height="2" rx="0.5" fill="black" opacity="0.3" />
            </svg>
          </motion.div>

          {/* Camera */}
          <motion.div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
          >
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
              <path
                d="M8 2h8l2 3h3a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h3l2-3z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="12" cy="11" r="4" stroke="white" strokeWidth="1.5" />
              <circle cx="12" cy="11" r="1.5" fill="white" />
            </svg>
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
