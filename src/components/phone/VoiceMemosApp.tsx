/**
 * VoiceMemosApp.tsx
 *
 * Realistic Apple Voice Memos UI (iOS 17 dark mode).
 * - Dark background with red accent
 * - List of recordings with waveform visualizations
 * - Play button with progress tracking
 * - Playing a memo = discovering that song
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBar from "./StatusBar";
import { EP_SONGS } from "./config";

type VoiceMemosAppProps = {
  onBack: () => void;
  onDiscover: (songId: string) => void;
  discoveredSongs: Set<string>;
};

export default function VoiceMemosApp({
  onBack,
  onDiscover,
  discoveredSongs,
}: VoiceMemosAppProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopPlaying = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlayingId(null);
    setProgress(0);
  }, []);

  const togglePlay = (songId: string, audioSrc: string) => {
    if (playingId === songId) {
      stopPlaying();
      return;
    }

    stopPlaying();
    onDiscover(songId);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    setPlayingId(songId);
    setProgress(0);

    audio.play().catch(() => {
      setPlayingId(songId);
    });

    intervalRef.current = setInterval(() => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    }, 100);

    audio.addEventListener("ended", () => {
      stopPlaying();
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#000000]">
      <StatusBar />

      {/* Navigation bar */}
      <div className="px-4 pt-1 pb-2">
        <button
          className="flex items-center gap-0.5 text-[#007aff] text-[17px] mb-2"
          onClick={() => {
            stopPlaying();
            onBack();
          }}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              d="M10 2L2 10l8 8"
              stroke="#007aff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>

        {/* Large title */}
        <h1 className="text-white text-[34px] font-bold tracking-[0.01em] leading-tight">
          Voice Memos
        </h1>
      </div>

      {/* Memo list */}
      <div className="flex-1 overflow-y-auto px-4 pt-2">
        <AnimatePresence>
          {EP_SONGS.map((song, i) => {
            const isPlaying = playingId === song.id;
            const isDiscovered = discoveredSongs.has(song.id);

            return (
              <motion.div
                key={song.id}
                className={`rounded-[12px] mb-2 overflow-hidden transition-colors ${
                  isPlaying
                    ? "bg-[#1c1c1e] ring-1 ring-[#ff3b30]/30"
                    : "bg-[#1c1c1e]"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Main row */}
                <div className="flex items-center gap-3 p-3">
                  {/* Play/Pause button */}
                  <button
                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isPlaying
                        ? "bg-[#ff3b30]"
                        : "bg-[#2c2c2e]"
                    }`}
                    onClick={() => togglePlay(song.id, song.audioSrc)}
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                        <rect x="3" y="2" width="3.5" height="12" rx="1" />
                        <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                        <path d="M4 2.5v11l9.5-5.5L4 2.5z" />
                      </svg>
                    )}
                  </button>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[15px] font-medium truncate leading-tight">
                      {song.memoTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-[2px]">
                      <span className="text-white/30 text-[13px]">
                        Today 2:47 AM
                      </span>
                      <span className="text-white/20 text-[13px]">·</span>
                      <span className="text-white/30 text-[13px]">
                        {song.memoDuration}
                      </span>
                    </div>
                  </div>

                  {/* Discovered indicator */}
                  {isDiscovered && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#7c3aed] flex-shrink-0" />
                  )}
                </div>

                {/* Waveform */}
                <div className="px-3 pb-3">
                  <div className="flex items-center gap-[1.5px] h-[32px]">
                    {Array.from({ length: 50 }).map((_, j) => {
                      const height =
                        6 +
                        Math.abs(
                          Math.sin((j + i * 7) * 0.6) *
                            Math.cos((j + i * 3) * 0.4)
                        ) *
                          22;
                      const filled = isPlaying && j / 50 <= progress;

                      return (
                        <div
                          key={j}
                          className="flex-1 rounded-full transition-colors duration-75"
                          style={{
                            height: `${height}px`,
                            background: filled
                              ? "#ff3b30"
                              : "rgba(255,255,255,0.08)",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
