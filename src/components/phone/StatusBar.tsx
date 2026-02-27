/**
 * StatusBar.tsx
 *
 * Pixel-accurate iOS 17 status bar.
 * Left: time. Center: Dynamic Island. Right: cellular, wifi, battery.
 * Font: SF Pro (inherited from Phone.tsx).
 */

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-8 pt-3 pb-0 text-white">
      {/* Left: Time — SF Pro semibold, 15px (iOS standard) */}
      <span className="text-[15px] font-semibold tracking-[0.02em] w-[54px]">
        2:47
      </span>

      {/* Center: Dynamic Island */}
      <div className="w-[126px] h-[37px] bg-black rounded-[20px]" />

      {/* Right: Status icons */}
      <div className="w-[54px] flex items-center justify-end gap-[5px]">
        {/* Cellular — 4 bars (iOS style) */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.7" fill="white" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.7" fill="white" />
          <rect x="9" y="3" width="3" height="9" rx="0.7" fill="white" />
          <rect
            x="13.5"
            y="0"
            width="3"
            height="12"
            rx="0.7"
            fill="white"
            opacity="0.35"
          />
        </svg>

        {/* WiFi — iOS style arcs */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path
            d="M7.5 10.5a1 1 0 110 2 1 1 0 010-2z"
            fill="white"
          />
          <path
            d="M4.75 9a3.9 3.9 0 015.5 0"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M2.25 6.5a7 7 0 0110.5 0"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        {/* Battery — iOS 17 style */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          {/* Battery outline */}
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3.5"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          {/* Battery cap */}
          <path
            d="M24 4.5v4a1.5 1.5 0 001.5-1.5v-1a1.5 1.5 0 00-1.5-1.5z"
            fill="white"
            fillOpacity="0.35"
          />
          {/* Battery fill — ~42% for the 2:47am vibe */}
          <rect x="2" y="2" width="9" height="9" rx="2" fill="white" />
        </svg>
      </div>
    </div>
  );
}
