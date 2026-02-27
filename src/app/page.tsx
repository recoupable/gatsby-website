/**
 * gatsby.wtf
 *
 * Cinematic full-screen artist landing page.
 * Video-first. Minimal UI. Single clear action.
 */

"use client";

import { useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

/** Bebas Neue — tall, condensed display font for brand identity */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

/* ───────────────────────────────────────────
   Small presentational components
   ─────────────────────────────────────────── */

type SocialIconLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialIconLink({ href, label, children }: SocialIconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.75A4 4 0 0 0 3.75 7.75v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4h-8.5Zm8.88 1.37a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.75A3.25 3.25 0 1 0 12 15.25 3.25 3.25 0 0 0 12 8.75Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M16.78 3c.53 1.5 1.8 2.66 3.37 3.08v3.18a8.23 8.23 0 0 1-3.4-1.1v6.22A6.39 6.39 0 1 1 10.36 8v3.33a3.1 3.1 0 1 0 3.1 3.1V3h3.32Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.64 4.5 12 4.5 12 4.5s-5.64 0-7.48.58A2.98 2.98 0 0 0 2.42 7.2C1.84 9.03 1.84 12 1.84 12s0 2.97.58 4.8a2.98 2.98 0 0 0 2.1 2.12c1.84.58 7.48.58 7.48.58s5.64 0 7.48-.58a2.98 2.98 0 0 0 2.1-2.11c.58-1.84.58-4.81.58-4.81s0-2.97-.58-4.8ZM10.2 15.06V8.94L15.5 12l-5.3 3.06Z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.74 14.5a.73.73 0 0 1-1.01.24c-2.76-1.68-6.24-2.06-10.35-1.15a.73.73 0 1 1-.31-1.43c4.5-.97 8.35-.53 11.42 1.33.35.2.46.66.25 1.01Zm1.44-3.2a.92.92 0 0 1-1.27.3c-3.16-1.95-7.97-2.51-11.72-1.37a.92.92 0 1 1-.54-1.75c4.3-1.31 9.62-.68 13.23 1.55.43.28.57.85.3 1.28Zm.12-3.33c-3.79-2.25-10.04-2.46-13.66-1.38a1.1 1.1 0 1 1-.63-2.11c4.16-1.24 11.07-1 15.41 1.57a1.1 1.1 0 1 1-1.12 1.92Z" />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m15 9 6 6" />
      <path d="m21 9-6 6" />
    </svg>
  );
}

/* ───────────────────────────────────────────
   Page component
   ─────────────────────────────────────────── */

export default function Home() {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoMute = () => {
    const nextMutedState = !isVideoMuted;
    setIsVideoMuted(nextMutedState);

    if (videoRef.current) {
      videoRef.current.muted = nextMutedState;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setIsSubmittingEmail(true);
    setEmailError("");

    try {
      const response = await fetch("/api/fans/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        setEmailError(errorData.error || "Could not save email.");
        return;
      }

      setEmailSubmitted(true);
      setEmail("");
    } catch {
      setEmailError("Network error. Please try again.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black isolate">
      {/* ── Video background (brighter than before) ── */}
      <video
        ref={videoRef}
        src="/videos/GatsbyGrace_PLAYBACK_after_00m27s.mp4"
        className="absolute inset-0 w-full h-full object-cover filter-[brightness(0.55)_saturate(0.85)]"
        preload="auto"
        autoPlay
        muted={isVideoMuted}
        loop
        playsInline
      />

      {/* ── Subtle top vignette for readability ── */}
      <div className="absolute top-0 left-0 right-0 z-1 h-52 bg-linear-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />

      {/* ── Top bar — logo left, CTA right, vertically aligned ── */}
      <motion.div
        className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-10 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1
          className={`${bebasNeue.className} text-3xl sm:text-4xl leading-none tracking-[0.04em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] select-none`}
        >
          GATSBY.WTF
        </h1>

        {/* ── CTA — expandable email capture ── */}
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            {emailSubmitted ? (
              <motion.p
                key="thanks"
                className="text-white/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                you&apos;re in ✓
              </motion.p>
            ) : !isEmailOpen ? (
              <motion.button
                key="trigger"
                type="button"
                onClick={() => setIsEmailOpen(true)}
                className="text-white/70 text-sm tracking-wide hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Get Updates →
              </motion.button>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  onSubmit={handleEmailSubmit}
                  className="relative rounded-full bg-black/40 border border-white/20 backdrop-blur-sm"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    required
                    autoFocus
                    className="w-52 sm:w-60 h-9 rounded-full bg-transparent pl-4 pr-12 text-sm text-white placeholder:text-white/35 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingEmail}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full flex items-center justify-center text-sm text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmittingEmail ? "·" : "→"}
                  </button>
                </form>
                {emailError ? (
                  <p className="mt-1.5 text-right text-red-300/80 text-xs">{emailError}</p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Bottom icons — minimal, low opacity, fade in ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button
          type="button"
          onClick={toggleVideoMute}
          aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors"
        >
          {isVideoMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
        <SocialIconLink href="https://instagram.com/gatsby.wtf" label="Instagram">
          <InstagramIcon />
        </SocialIconLink>
        <SocialIconLink href="https://tiktok.com/@gatsby.wtf" label="TikTok">
          <TikTokIcon />
        </SocialIconLink>
        <SocialIconLink href="https://youtube.com/@gatsbygrace" label="YouTube">
          <YouTubeIcon />
        </SocialIconLink>
        <SocialIconLink href="#" label="Spotify">
          <SpotifyIcon />
        </SocialIconLink>
      </motion.div>
    </div>
  );
}
