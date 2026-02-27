/**
 * UnlockScreen.tsx
 *
 * Email capture screen — appears after discovering 3+ songs.
 * Uses iOS system font for consistency with the phone experience,
 * but the content is personal and intimate — Gatsby's own words.
 *
 * Styled as a minimal iOS-native feel with Gatsby's purple accent.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";

type UnlockScreenProps = {
  onBack: () => void;
  discoveredCount: number;
};

export default function UnlockScreen({
  onBack,
  discoveredCount,
}: UnlockScreenProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: Hook up to email API (Supabase, Mailchimp, etc.)
    console.log("Email captured:", email);
    setSubmitted(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#000000]">
      <StatusBar />

      {/* Navigation bar */}
      <div className="px-4 pt-1 pb-2">
        <button
          className="flex items-center gap-0.5 text-[#a78bfa] text-[17px]"
          onClick={onBack}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              d="M10 2L2 10l8 8"
              stroke="#a78bfa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        {!submitted ? (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Gatsby's note */}
            <motion.div
              className="mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[28px] mb-5">💜</p>

              <p className="text-white text-[20px] font-medium mb-3 leading-tight">
                hey
              </p>
              <p className="text-[#8e8e93] text-[15px] leading-[1.5]">
                you found {discoveredCount} of my diary entries.
                <br />
                most people don&apos;t look that closely.
              </p>
              <p className="text-[#636366] text-[15px] mt-4 leading-[1.5]">
                if you want to hear the full ep
                <br />
                before everyone else, leave your email.
                <br />
                i&apos;ll send it to you personally.
              </p>
            </motion.div>

            {/* Email form — iOS-style input */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                required
                className="w-full bg-[#1c1c1e] rounded-[12px] text-white text-[17px] 
                           py-[14px] px-4 placeholder:text-[#48484a]
                           focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/50
                           transition-all"
              />
              <motion.button
                type="submit"
                className="w-full py-[14px] rounded-[12px] bg-[#7c3aed]
                           text-white text-[17px] font-semibold
                           active:opacity-80 transition-opacity"
                whileTap={{ scale: 0.98 }}
              >
                send it to me
              </motion.button>
            </motion.form>

            {/* Reassurance */}
            <motion.p
              className="text-[#48484a] text-[13px] text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              no spam ever. just music.
            </motion.p>
          </motion.div>
        ) : (
          /* --- Thank you state --- */
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-[42px] mb-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              💜
            </motion.p>
            <p className="text-white text-[22px] font-medium mb-2">
              thank you
            </p>
            <p className="text-[#8e8e93] text-[15px]">
              i&apos;ll send you everything soon.
            </p>
            <p className="text-[#636366] text-[13px] mt-3">— gatsby</p>
          </motion.div>
        )}
      </div>

      <div className="h-8" />
    </div>
  );
}
