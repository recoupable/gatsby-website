/**
 * UnlockTab.tsx
 *
 * Looks like Chrome's "New Tab" page — but instead of the
 * Google search bar, it's Gatsby's message + email capture.
 *
 * Appears as a new tab after discovering 3+ songs.
 * Clean, minimal, feels native to the browser experience.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type UnlockTabProps = {
  discoveredCount: number;
};

export default function UnlockTab({ discoveredCount }: UnlockTabProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: hook up to email API
    console.log("Email captured:", email);
    setSubmitted(true);
  };

  return (
    <div className="h-full bg-[#202124] flex flex-col items-center justify-center px-6">
      {!submitted ? (
        <motion.div
          className="text-center max-w-[500px] w-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Gatsby's message — styled like a Chrome new tab but personal */}
          <p className="text-[42px] mb-6">💜</p>

          <p className="text-[#e8eaed] text-[20px] font-normal mb-3">
            you found {discoveredCount} of my songs in all these tabs
          </p>
          <p className="text-[#9aa0a6] text-[15px] leading-relaxed mb-8">
            most people close their tabs. you kept going.
            <br />
            want the full ep before everyone else?
          </p>

          {/* Email input — styled like Chrome's search bar */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="bg-[#303134] rounded-full px-6 py-3 flex items-center border border-[#5f6368] focus-within:border-[#8ab4f8] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                required
                className="flex-1 bg-transparent text-[#e8eaed] text-[16px] outline-none placeholder:text-[#5f6368]"
              />
              <button
                type="submit"
                className="ml-3 bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] text-[14px] font-medium px-5 py-1.5 rounded-full transition-colors flex-shrink-0"
              >
                send it
              </button>
            </div>
          </form>

          <p className="text-[#5f6368] text-[12px] mt-4">
            no spam. just music from gatsby.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[42px] mb-4">💜</p>
          <p className="text-[#e8eaed] text-[20px] mb-2">thank you</p>
          <p className="text-[#9aa0a6] text-[15px]">
            i&apos;ll send you everything soon.
          </p>
          <p className="text-[#5f6368] text-[13px] mt-3">— gatsby</p>
        </motion.div>
      )}
    </div>
  );
}
