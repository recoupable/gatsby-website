"use client";

import { useEffect, useRef, useState } from "react";
import { trackFunnelEvent } from "@/lib/funnel-analytics";

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.74 14.5a.73.73 0 0 1-1.01.24c-2.76-1.68-6.24-2.06-10.35-1.15a.73.73 0 1 1-.31-1.43c4.5-.97 8.35-.53 11.42 1.33.35.2.46.66.25 1.01Zm1.44-3.2a.92.92 0 0 1-1.27.3c-3.16-1.95-7.97-2.51-11.72-1.37a.92.92 0 1 1-.54-1.75c4.3-1.31 9.62-.68 13.23 1.55.43.28.57.85.3 1.28Zm.12-3.33c-3.79-2.25-10.04-2.46-13.66-1.38a1.1 1.1 0 1 1-.63-2.11c4.16-1.24 11.07-1 15.41 1.57a1.1 1.1 0 1 1-1.12 1.92Z" />
    </svg>
  );
}

const backgroundVideoUrl = "/videos/gatsby-background.mp4";
type ListeningLinks = {
  spotify: { url: string; description: string };
  apple: { url: string; description: string };
};

export default function ListenLanding({ links }: { links: ListeningLinks }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const updatesRef = useRef<HTMLDialogElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (video && !motion.matches && !connection?.saveData) {
      video.src = backgroundVideoUrl;
      video.play().catch(() => {});
    }
    const respectMotionPreference = () => {
      if (motion.matches) video?.pause();
    };
    motion.addEventListener("change", respectMotionPreference);
    return () => motion.removeEventListener("change", respectMotionPreference);
  }, []);

  const openUpdates = () => {
    videoRef.current?.pause();
    updatesRef.current?.showModal();
  };

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
      trackFunnelEvent("signup_completed");
      setEmailSubmitted(true);
      setEmail("");
    } catch {
      setEmailError("Network error. Please try again.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const quietControl = "inline-flex min-h-11 items-center text-sm text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  const dialogStyle = "fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-xl bg-[#121212] p-5 text-white shadow-2xl backdrop:bg-black/70 sm:p-6";

  return (
    <main className="relative isolate h-dvh overflow-hidden bg-black text-white">
      <h1 className="sr-only">Gatsby Grace — listen</h1>
      <video
        ref={videoRef}
        poster="/images/gatsby-video-poster.jpg"
        aria-label="Gatsby Grace music video"
        className="absolute inset-0 h-full w-full object-cover"
        preload="none"
        muted
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/70" />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6">
        <nav aria-label="Listen to Gatsby" className="mx-auto flex w-full max-w-sm flex-col gap-3">
          <a href={links.spotify.url} onClick={() => trackFunnelEvent("music_link_clicked", "spotify")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#1DB954] px-7 text-sm font-medium text-black shadow-lg transition-colors hover:bg-[#1ed760] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <SpotifyIcon /> Listen on Spotify <span className="sr-only">{links.spotify.description}</span>
          </a>
          <a href={links.apple.url} onClick={() => trackFunnelEvent("music_link_clicked", "apple_music")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#D60017] px-7 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#bd0014] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d="M18 3v12.5a3.5 3.5 0 1 1-2-3.16V6.2l-7 1.5v9.8a3.5 3.5 0 1 1-2-3.16V6l11-3Z" /></svg>
            Listen on Apple <span className="sr-only">{links.apple.description}</span>
          </a>
        </nav>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-7">
        <div className="flex items-center justify-between">
          <button type="button" onClick={openUpdates} className={quietControl}>updates</button>
          <button type="button" className={quietControl} aria-label={isPlaying ? "Pause background video" : "Play background video"} onClick={() => {
            if (isPlaying) videoRef.current?.pause();
            else if (videoRef.current) {
              if (!videoRef.current.getAttribute("src")) videoRef.current.src = backgroundVideoUrl;
              videoRef.current.play().catch(() => {});
            }
          }}>{isPlaying ? "pause" : "play"}</button>
        </div>
      </div>

      <dialog ref={updatesRef} aria-labelledby="updates-title" className={dialogStyle}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="updates-title" className="text-lg">updates</h2>
          <button type="button" onClick={() => updatesRef.current?.close()} className={quietControl} aria-label="Close signup">close</button>
        </div>
        {emailSubmitted ? <p role="status" className="pb-4 text-sm text-white/80">you’re in.</p> : (
          <form onSubmit={handleEmailSubmit} className="flex flex-wrap gap-3">
            <label htmlFor="fan-email" className="sr-only">Email address</label>
            <input id="fan-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="your@email.com" aria-describedby={emailError ? "signup-error" : undefined} aria-invalid={Boolean(emailError)} className="min-h-12 min-w-0 flex-1 rounded-md bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-white" />
            <button type="submit" disabled={isSubmittingEmail} className="min-h-12 rounded-md bg-white px-5 text-sm text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-50">{isSubmittingEmail ? "saving…" : "sign up"}</button>
            {emailError && <p id="signup-error" role="alert" className="w-full text-sm text-red-300">{emailError}</p>}
          </form>
        )}
      </dialog>
    </main>
  );
}
