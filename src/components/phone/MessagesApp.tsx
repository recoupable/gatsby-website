/**
 * MessagesApp.tsx
 *
 * Realistic iMessage UI (iOS 17 dark mode).
 * - Proper blue (sent) and gray (received) bubbles
 * - iOS bubble shapes with tail on last message in group
 * - Typing indicator with bouncing dots
 * - Real iOS navigation bar styling
 * - Messages reveal one by one with realistic timing
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import { MESSAGES } from "./config";

type MessagesAppProps = {
  onBack: () => void;
};

export default function MessagesApp({ onBack }: MessagesAppProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Reveal messages with realistic timing */
  useEffect(() => {
    if (visibleCount >= MESSAGES.length) {
      setShowTyping(false);
      return;
    }

    const currentMsg = MESSAGES[visibleCount];
    const prevMsg = visibleCount > 0 ? MESSAGES[visibleCount - 1] : null;
    const sameSender = prevMsg && prevMsg.sender === currentMsg.sender;

    // Shorter delay for consecutive messages from same person
    const delay = sameSender ? 500 : 1100;

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  /** Auto-scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div className="h-full flex flex-col bg-[#000000]">
      <StatusBar />

      {/* Navigation bar — iOS Messages style */}
      <div className="flex items-center px-4 pt-1 pb-3 border-b border-[#2c2c2e]">
        {/* Back button */}
        <button
          className="flex items-center gap-0.5 text-[#007aff] text-[17px]"
          onClick={onBack}
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
        </button>

        {/* Contact avatar + name */}
        <div className="flex-1 flex flex-col items-center">
          {/* Avatar circle */}
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-b from-[#a78bfa] to-[#7c3aed] flex items-center justify-center mb-[2px]">
            <span className="text-white text-[14px] font-semibold">E</span>
          </div>
          <p className="text-white text-[11px] font-medium">em 💜</p>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M17.5 13.8c-1 0-1.9-.3-2.7-.8l-1.5 1.5c1 .8 2.2 1.3 3.5 1.4v2.1h1.5v-2.1c2.5-.3 4.2-2 4.2-4.2 0-2.8-2.5-3.7-4.5-4.3"
              stroke="#007aff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Message thread */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-[10px] py-3"
      >
        {/* Timestamp */}
        <p className="text-[#8e8e93] text-[11px] font-medium text-center mb-3">
          Today 2:31 AM
        </p>

        {MESSAGES.slice(0, visibleCount).map((msg, i) => {
          const isGatsby = msg.sender === "gatsby";
          const nextMsg = i < MESSAGES.length - 1 ? MESSAGES[i + 1] : null;
          const prevMsg = i > 0 ? MESSAGES[i - 1] : null;
          const isLastInGroup =
            !nextMsg ||
            nextMsg.sender !== msg.sender ||
            i === visibleCount - 1;
          const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender;

          // iOS bubble border-radius: 18px normally, 4px on the
          // tail side for the last message in a group
          const radius = isGatsby
            ? isLastInGroup
              ? "18px 18px 4px 18px"    // tail bottom-right
              : "18px 18px 18px 18px"
            : isLastInGroup
              ? "18px 18px 18px 4px"    // tail bottom-left
              : "18px 18px 18px 18px";

          return (
            <motion.div
              key={i}
              className={`flex ${isGatsby ? "justify-end" : "justify-start"}`}
              style={{
                marginTop: isFirstInGroup ? "8px" : "2px",
                marginBottom: isLastInGroup ? "2px" : "0px",
              }}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="max-w-[75%] px-[12px] py-[7px] text-[17px] leading-[22px]"
                style={{
                  background: isGatsby ? "#007aff" : "#2c2c2e",
                  color: "white",
                  borderRadius: radius,
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {showTyping && visibleCount < MESSAGES.length && (
          <motion.div
            className="flex justify-start mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="px-[14px] py-[10px]"
              style={{
                background: "#2c2c2e",
                borderRadius: "18px 18px 18px 4px",
              }}
            >
              <div className="flex gap-[4px] items-center h-[12px]">
                <motion.div
                  className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
                  animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
                  animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: 0.15,
                  }}
                />
                <motion.div
                  className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
                  animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* iMessage input bar */}
      <div className="px-3 pb-5 pt-2 border-t border-[#2c2c2e]">
        <div className="flex items-center gap-2">
          {/* Plus button */}
          <div className="w-[33px] h-[33px] rounded-full bg-[#007aff] flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
              <path d="M9 3v12M3 9h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text input */}
          <div className="flex-1 bg-transparent border border-[#3a3a3c] rounded-full px-4 py-[6px] flex items-center">
            <span className="text-[#8e8e93] text-[17px]">iMessage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
