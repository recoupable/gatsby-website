/**
 * NotesApp.tsx
 *
 * Realistic Apple Notes UI (iOS 17 dark mode).
 * - Navigation bar with back chevron + "Notes" title
 * - Yellow/orange accent color
 * - List view with bold title + preview text + date
 * - Detail view with proper note styling
 * - Reading a note = discovering that song
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBar from "./StatusBar";
import { EP_SONGS } from "./config";

type NotesAppProps = {
  onBack: () => void;
  onDiscover: (songId: string) => void;
  discoveredSongs: Set<string>;
};

export default function NotesApp({
  onBack,
  onDiscover,
  discoveredSongs,
}: NotesAppProps) {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const openNote = EP_SONGS.find((s) => s.id === openNoteId);

  const handleOpenNote = (songId: string) => {
    setOpenNoteId(songId);
    onDiscover(songId);
  };

  return (
    <div className="h-full flex flex-col bg-[#1c1c1e]">
      <StatusBar />

      {/* Navigation bar — iOS style */}
      <div className="px-4 pt-1 pb-2">
        <button
          className="flex items-center gap-0.5 text-[#f5a623] text-[17px] mb-2"
          onClick={openNote ? () => setOpenNoteId(null) : onBack}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              d="M10 2L2 10l8 8"
              stroke="#f5a623"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{openNote ? "Notes" : "Back"}</span>
        </button>

        {/* Large title — iOS style */}
        {!openNote && (
          <h1 className="text-white text-[34px] font-bold tracking-[0.01em] leading-tight">
            Notes
          </h1>
        )}
      </div>

      {/* Search bar (list view only) */}
      {!openNote && (
        <div className="px-4 pb-2">
          <div className="bg-[#2c2c2e] rounded-[10px] px-3 py-[7px] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-white/40 text-[15px]">Search</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {openNote ? (
            /* --- Note Detail --- */
            <motion.div
              key={openNote.id}
              className="px-5 py-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.2 }}
            >
              {/* Date header */}
              <p className="text-white/30 text-[13px] text-center mb-6">
                February 25, 2026 at 2:47 AM
              </p>

              {/* Note title */}
              <h2 className="text-white text-[22px] font-bold leading-tight mb-4">
                {openNote.noteTitle}
              </h2>

              {/* Note body */}
              <p className="text-white/80 text-[17px] leading-[1.6] whitespace-pre-wrap">
                {openNote.noteBody}
              </p>

              {/* Song tag — fades in */}
              <motion.div
                className="mt-10 pt-4 border-t border-white/5 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-[6px] h-[6px] rounded-full bg-[#7c3aed]" />
                <span className="text-[#a78bfa] text-[13px]">
                  this became &quot;{openNote.title}&quot;
                </span>
              </motion.div>
            </motion.div>
          ) : (
            /* --- Notes List --- */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Section header */}
              <div className="px-5 pt-2 pb-1">
                <p className="text-white/40 text-[13px] font-medium uppercase tracking-wider">
                  {EP_SONGS.length} Notes
                </p>
              </div>

              {EP_SONGS.map((song, i) => (
                <motion.button
                  key={song.id}
                  className="w-full text-left px-5 py-[10px] active:bg-white/5
                             border-b border-white/5 last:border-b-0"
                  onClick={() => handleOpenNote(song.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {/* Title — bold, 15px (iOS Notes list) */}
                  <p className="text-white text-[15px] font-semibold truncate leading-tight">
                    {song.noteTitle}
                  </p>

                  {/* Second line: date + preview */}
                  <div className="flex items-center gap-2 mt-[3px]">
                    <span className="text-white/40 text-[13px] flex-shrink-0">
                      2:47 AM
                    </span>
                    <p className="text-white/30 text-[13px] truncate">
                      {song.noteBody}
                    </p>
                  </div>

                  {/* Discovered badge */}
                  {discoveredSongs.has(song.id) && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#7c3aed]" />
                      <span className="text-[#a78bfa] text-[11px]">
                        discovered
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
