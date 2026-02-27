/**
 * YouTubeTab.tsx
 *
 * Looks like YouTube dark mode — a paused video with title,
 * channel info, and relatable comments. The video gatsby
 * was watching at 3am because her brain wouldn't shut up.
 *
 * Visiting this tab discovers the "brainrot" song.
 */

"use client";

import { useEffect } from "react";

type YouTubeTabProps = {
  onDiscover: () => void;
};

/** Fake comments that feel real */
const COMMENTS = [
  {
    user: "sleepless_in_2026",
    time: "2 months ago",
    text: "watching this at 3am instead of sleeping. the algorithm knows me too well.",
    likes: "4.2K",
  },
  {
    user: "noodlegirl",
    time: "3 weeks ago",
    text: "i came here to stop overthinking and now i'm overthinking about whether i overthink too much",
    likes: "12K",
  },
  {
    user: "pianoboy_404",
    time: "1 month ago",
    text: "my therapist: \"you need to stop doomscrolling at 2am\" me: *watches this on repeat at 2am*",
    likes: "8.7K",
  },
  {
    user: "adhd_butterfly",
    time: "5 days ago",
    text: "the way this video is 18 minutes and i've watched it 47 times but can't focus on a 5 minute assignment",
    likes: "21K",
  },
  {
    user: "midnightrain",
    time: "1 week ago",
    text: "\"it's not what you think\" yeah it's worse. it's everything all at once.",
    likes: "6.1K",
  },
];

export default function YouTubeTab({ onDiscover }: YouTubeTabProps) {
  useEffect(() => {
    const timer = setTimeout(onDiscover, 2000);
    return () => clearTimeout(timer);
  }, [onDiscover]);

  return (
    <div className="h-full bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-[900px] mx-auto px-6 py-4">
        {/* Video player — dark rectangle with play button */}
        <div className="w-full aspect-video bg-[#000] rounded-xl flex items-center justify-center relative mb-4 cursor-pointer group">
          {/* Fake video gradient background */}
          <div
            className="absolute inset-0 rounded-xl opacity-30"
            style={{
              background: "radial-gradient(ellipse at 40% 60%, #1e1b4b 0%, #000 70%)",
            }}
          />

          {/* Play button */}
          <div className="relative z-10 w-[68px] h-[48px] bg-[#ff0000]/90 rounded-xl flex items-center justify-center group-hover:bg-[#ff0000] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#333]">
            <div className="h-full bg-[#ff0000] w-[34%]" />
          </div>

          {/* Timestamp */}
          <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-white text-[12px]">
            6:14 / 18:22
          </div>
        </div>

        {/* Video title */}
        <h1 className="text-[#f1f1f1] text-[20px] font-semibold leading-tight mb-2">
          how to stop overthinking at 3am (it&apos;s not what you think)
        </h1>

        {/* Video stats */}
        <div className="flex items-center gap-2 text-[#aaa] text-[14px] mb-4">
          <span>2.3M views</span>
          <span>·</span>
          <span>8 months ago</span>
        </div>

        {/* Channel info */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#272727]">
          <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] flex items-center justify-center text-white text-[14px] font-bold">
            gr
          </div>
          <div>
            <p className="text-[#f1f1f1] text-[16px] font-medium">gentle reminders</p>
            <p className="text-[#aaa] text-[12px]">1.2M subscribers</p>
          </div>
          <button className="ml-auto bg-white text-black text-[14px] font-medium px-4 py-2 rounded-full">
            Subscribe
          </button>
        </div>

        {/* Description */}
        <div className="py-4 border-b border-[#272727]">
          <div className="bg-[#272727] rounded-xl p-3">
            <p className="text-[#f1f1f1] text-[14px] font-medium mb-1">
              2.3M views · 8 months ago
            </p>
            <p className="text-[#f1f1f1] text-[14px] leading-relaxed">
              your brain isn&apos;t broken. it&apos;s just running a different operating system.
              <br /><br />
              this video is for everyone who lies in bed at 3am with a brain that
              won&apos;t stop buffering. you&apos;re not alone and there&apos;s nothing wrong with you.
            </p>
            <p className="text-[#aaa] text-[14px] mt-2 cursor-pointer">Show more</p>
          </div>
        </div>

        {/* Comments */}
        <div className="py-4">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-[#f1f1f1] text-[16px] font-medium">
              1,847 Comments
            </h2>
            <div className="flex items-center gap-1 text-[#f1f1f1] text-[14px] cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M3 6h12l-6 7L3 6z" />
              </svg>
              Sort by
            </div>
          </div>

          {/* Comment list */}
          {COMMENTS.map((comment, i) => (
            <div key={i} className="flex gap-3 mb-5">
              {/* Avatar */}
              <div className="w-[40px] h-[40px] rounded-full bg-[#303030] flex items-center justify-center text-[#aaa] text-[14px] flex-shrink-0">
                {comment.user.charAt(0)}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#f1f1f1] text-[13px] font-medium">
                    @{comment.user}
                  </span>
                  <span className="text-[#aaa] text-[12px]">{comment.time}</span>
                </div>
                <p className="text-[#f1f1f1] text-[14px] leading-relaxed">
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[#aaa]">
                  <div className="flex items-center gap-1 text-[12px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M4 7l3-5v4h4l-3 5v-4H4z" />
                    </svg>
                    {comment.likes}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="rotate-180">
                    <path d="M4 7l3-5v4h4l-3 5v-4H4z" />
                  </svg>
                  <span className="text-[12px]">Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
