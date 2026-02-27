/**
 * SpotifyTab.tsx
 *
 * Looks like the Spotify Web Player in dark mode.
 * Shows the ADHD EP album page with a tracklist.
 * Clicking play on any track plays the audio and discovers that song.
 */

"use client";

import { useState } from "react";
import { EP_SONGS } from "./config";

type SpotifyTabProps = {
  onPlay: (songId: string, audioSrc: string) => void;
  discoveredSongs: Set<string>;
};

export default function SpotifyTab({ onPlay, discoveredSongs }: SpotifyTabProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (songId: string, audioSrc: string) => {
    setPlayingId(songId === playingId ? null : songId);
    onPlay(songId, audioSrc);
  };

  return (
    <div className="h-full bg-[#121212] overflow-y-auto">
      {/* Album header */}
      <div
        className="px-8 pt-16 pb-6"
        style={{
          background: "linear-gradient(180deg, #4c1d95 0%, #121212 100%)",
        }}
      >
        <div className="flex items-end gap-6">
          {/* Album art — purple gradient placeholder */}
          <div
            className="w-[230px] h-[230px] rounded flex-shrink-0 flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 50%, #0f0d1a 100%)",
            }}
          >
            <div className="text-center">
              <p className="text-white/90 text-[24px] font-bold">adhd</p>
              <p className="text-white/50 text-[12px] mt-1">gatsby grace</p>
            </div>
          </div>

          {/* Album info */}
          <div className="pb-2">
            <p className="text-white text-[12px] font-bold uppercase tracking-wider mb-2">
              EP
            </p>
            <h1 className="text-white text-[48px] font-black leading-none mb-4">
              adhd
            </h1>
            <div className="flex items-center gap-2 text-[14px]">
              <span className="text-white font-bold">gatsby grace</span>
              <span className="text-white/50">·</span>
              <span className="text-white/50">2026</span>
              <span className="text-white/50">·</span>
              <span className="text-white/50">5 songs, 14 min 34 sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="px-8 py-4 flex items-center gap-6">
        {/* Big play button */}
        <button className="w-[56px] h-[56px] rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-105 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
            <path d="M6 3v18l15-9L6 3z" />
          </svg>
        </button>

        {/* Shuffle */}
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.83 13.41l-1.41 1.41 3.13 3.13H4v2h12.55l-3.13 3.13 1.41 1.41L19.41 20l-4.58-4.59zM14.83 7.41L19.41 4l-4.58-2.41 1.41-1.41L19.41 4l-4.58 4.59-1.41-1.41L16.55 4H4v2h12.55l-3.13 3.13 1.41 1.41z" />
          </svg>
        </button>
      </div>

      {/* Track list */}
      <div className="px-8">
        {/* Header row */}
        <div className="flex items-center px-4 py-2 border-b border-[#2a2a2a] text-[#b3b3b3] text-[12px] uppercase tracking-wider mb-2">
          <span className="w-[40px] text-center">#</span>
          <span className="flex-1">Title</span>
          <span className="w-[80px] text-right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="inline">
              <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4v4.5l3 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {/* Tracks */}
        {EP_SONGS.map((song, i) => {
          const isPlaying = playingId === song.id;
          const isDiscovered = discoveredSongs.has(song.id);

          return (
            <button
              key={song.id}
              className="w-full flex items-center px-4 py-2 rounded group hover:bg-[#2a2a2a] transition-colors text-left"
              onClick={() => handlePlay(song.id, song.audioSrc)}
            >
              {/* Track number / play icon */}
              <div className="w-[40px] text-center flex-shrink-0">
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#1DB954" className="inline">
                    <rect x="1" y="2" width="2" height="10" rx="0.5">
                      <animate attributeName="height" values="10;4;8;10" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="y" values="2;5;3;2" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="5" y="4" width="2" height="6" rx="0.5">
                      <animate attributeName="height" values="6;10;4;6" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="y" values="4;2;5;4" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="9" y="3" width="2" height="8" rx="0.5">
                      <animate attributeName="height" values="8;4;10;8" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="y" values="3;5;2;3" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                ) : (
                  <>
                    <span className="text-[#b3b3b3] text-[16px] group-hover:hidden">
                      {i + 1}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white" className="hidden group-hover:inline">
                      <path d="M4 2v12l10-6L4 2z" />
                    </svg>
                  </>
                )}
              </div>

              {/* Track title */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[16px] truncate ${
                    isPlaying ? "text-[#1DB954]" : "text-white"
                  }`}
                >
                  {song.title}
                </p>
                <p className="text-[#b3b3b3] text-[14px]">gatsby grace</p>
              </div>

              {/* Discovered badge */}
              {isDiscovered && !isPlaying && (
                <div className="w-[8px] h-[8px] rounded-full bg-[#7c3aed] mr-4 flex-shrink-0" />
              )}

              {/* Duration */}
              <span className="w-[80px] text-right text-[#b3b3b3] text-[14px] flex-shrink-0">
                {song.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </div>
  );
}
