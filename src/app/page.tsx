"use client";

import { useEffect, useRef, useState } from "react";

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.74 14.5a.73.73 0 0 1-1.01.24c-2.76-1.68-6.24-2.06-10.35-1.15a.73.73 0 1 1-.31-1.43c4.5-.97 8.35-.53 11.42 1.33.35.2.46.66.25 1.01Zm1.44-3.2a.92.92 0 0 1-1.27.3c-3.16-1.95-7.97-2.51-11.72-1.37a.92.92 0 1 1-.54-1.75c4.3-1.31 9.62-.68 13.23 1.55.43.28.57.85.3 1.28Zm.12-3.33c-3.79-2.25-10.04-2.46-13.66-1.38a1.1 1.1 0 1 1-.63-2.11c4.16-1.24 11.07-1 15.41 1.57a1.1 1.1 0 1 1-1.12 1.92Z" />
    </svg>
  );
}

const playlistUrl = "https://open.spotify.com/playlist/5b8JKnvweOEaLqS00nIr7n";
const appleAlbumUrl = "https://music.apple.com/us/album/beautiful-tomorrow/1894545725";

export default function Home() {
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
    if (!motion.matches) video?.play().catch(() => {});
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
      setEmailSubmitted(true);
      setEmail("");
    } catch {
      setEmailError("Network error. Please try again.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const quietControl = "inline-flex min-h-11 items-center text-sm text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4";
  const dialogStyle = "fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-xl bg-[#121212] p-5 text-white shadow-2xl backdrop:bg-black/70 sm:p-6";

  return (
    <main className="relative isolate h-dvh min-h-96 overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        src="/videos/GatsbyGrace_PLAYBACK_after_00m27s.mp4"
        poster="/images/gatsby-video-poster.jpg"
        aria-label="Gatsby Grace music video"
        className="absolute inset-0 h-full w-full object-cover"
        preload="metadata"
        muted
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/70" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-7">
        <nav aria-label="Listen to Gatsby" className="mx-auto flex w-full max-w-sm flex-col gap-3 pb-7 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 sm:pb-10">
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-black/65 px-7 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-colors hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-4">
            <SpotifyIcon /> sign in with Spotify <span className="sr-only">(opens Spotify playlist in a new tab)</span>
          </a>
          <a href={appleAlbumUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-black/65 px-7 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-colors hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-4">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d="M18 3v12.5a3.5 3.5 0 1 1-2-3.16V6.2l-7 1.5v9.8a3.5 3.5 0 1 1-2-3.16V6l11-3Z" /></svg>
            sign in with Apple Music <span className="sr-only">(opens Gatsby’s album in a new tab)</span>
          </a>
        </nav>
        <div className="flex items-center justify-between">
          <button type="button" onClick={openUpdates} className={quietControl}>updates</button>
          <button type="button" className={quietControl} aria-label={isPlaying ? "Pause background video" : "Play background video"} onClick={() => {
            if (isPlaying) videoRef.current?.pause();
            else videoRef.current?.play().catch(() => {});
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
