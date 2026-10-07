"use client";

import { useState } from "react";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

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
      className="flex min-h-11 min-w-11 items-center justify-center text-[#72667d] hover:text-[#2f1e40] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
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

const wishUrl = "https://open.spotify.com/track/4HJjUdcezdSSCBdy5JVHDs";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || isSubmittingEmail) return;
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
    <main className="min-h-screen bg-[#f4f0ea] text-[#302437]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7 sm:px-10 sm:py-9">
        <Link href="/" aria-label="Gatsby Grace home" className={`${bebasNeue.className} text-2xl tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4`}>
          GATSBY.WTF
        </Link>
        <a href="#video" className="text-sm text-[#72667d] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
          watch the video ↘
        </a>
      </header>

      <section aria-labelledby="song-title" className="mx-auto max-w-5xl px-6 pb-12 pt-10 sm:px-10 sm:pb-16 sm:pt-14">
        <p className="mb-5 text-xs tracking-[0.18em] text-[#72667d]">gatsby grace / the song from the videos</p>
        <h1 id="song-title" className="text-[clamp(5rem,17vw,10rem)] leading-[0.9] tracking-[-0.065em]" style={{ fontFamily: "var(--font-body), Georgia, serif" }}>
          i wish<span className="text-[#9d7db0]">.</span>
        </h1>
        <p className="mb-8 mt-7 max-w-sm text-base leading-relaxed text-[#72667d]">i wanna be the one you love.</p>
        <a href={wishUrl} className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#4c345c] px-8 py-4 text-base text-[#fffaf4] shadow-[0_5px_20px_rgba(76,52,92,0.12)] transition-colors hover:bg-[#382344] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4c345c] sm:w-auto">
          <SpotifyIcon /> listen on spotify <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section id="video" aria-labelledby="video-title" className="mx-auto max-w-5xl scroll-mt-6 px-6 sm:px-10">
        <div className="mb-3 flex items-center justify-between text-xs text-[#72667d]">
          <h2 id="video-title">a little more gatsby</h2>
          <span>sound on, if you want</span>
        </div>
        <video
          src="/videos/GatsbyGrace_PLAYBACK_after_00m27s.mp4"
          poster="/images/gatsby-video-poster.jpg"
          aria-label="Gatsby Grace music video"
          className="aspect-video w-full rounded-sm bg-[#211825] object-cover"
          preload="metadata"
          controls
          playsInline
        />
      </section>

      <section aria-labelledby="about-title" className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-2 sm:gap-16 sm:px-10 sm:py-16">
        <div>
          <h2 id="about-title" className="mb-4 text-3xl" style={{ fontFamily: "var(--font-body), Georgia, serif" }}>hi, i’m gatsby.</h2>
          <p className="max-w-sm text-sm leading-7 text-[#72667d]">bedroom pop for overthinkers. little crushes, late-night thoughts, and trying to act normal.</p>
          <nav aria-label="Gatsby on social media" className="mt-4 flex gap-1">
            <SocialIconLink href="https://instagram.com/gatsby.wtf" label="Instagram"><InstagramIcon /></SocialIconLink>
            <SocialIconLink href="https://tiktok.com/@gatsby.wtf" label="TikTok"><TikTokIcon /></SocialIconLink>
            <SocialIconLink href="https://youtube.com/@gatsbygrace" label="YouTube"><YouTubeIcon /></SocialIconLink>
          </nav>
        </div>
        <div>
          <h2 className="mb-4 text-3xl" style={{ fontFamily: "var(--font-body), Georgia, serif" }}>occasionally, an email.</h2>
          <p id="signup-description" className="mb-5 text-sm leading-7 text-[#72667d]">new music and little updates. only if you want them.</p>
          {emailSubmitted ? (
            <p role="status" className="text-sm">you’re in. thank you ♡</p>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-wrap gap-2">
              <label htmlFor="fan-email" className="sr-only">Email address</label>
              <input id="fan-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="your@email.com" aria-describedby={`signup-description${emailError ? " signup-error" : ""}`} aria-invalid={Boolean(emailError)} className="min-h-12 min-w-0 flex-1 rounded-full bg-white/60 px-5 text-sm shadow-[inset_0_0_0_1px_rgba(76,52,92,0.2)] focus-visible:outline-2 focus-visible:outline-[#4c345c]" />
              <button type="submit" disabled={isSubmittingEmail} className="min-h-12 rounded-full bg-[#e6dce9] px-5 text-sm hover:bg-[#d9c9df] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50">{isSubmittingEmail ? "saving…" : "keep me posted"}</button>
              {emailError ? <p id="signup-error" role="alert" className="w-full text-sm text-red-800">{emailError}</p> : null}
            </form>
          )}
        </div>
      </section>
      <footer className="mx-auto max-w-5xl px-6 pb-8 text-xs text-[#72667d] sm:px-10">gatsby grace ♡</footer>
    </main>
  );
}
