/**
 * Wallpaper.tsx
 *
 * The animated mesh gradient wallpaper that lives INSIDE the phone.
 * Uses the same purple/midnight shader gradient from the original
 * ShaderBackground, but contained within the phone frame.
 *
 * Used on the LockScreen and HomeScreen — the "always on" wallpaper
 * that makes the phone feel alive.
 */

"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export default function Wallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary layer — deep purples and midnight */}
      <MeshGradient
        className="absolute inset-0 w-full h-full pointer-events-none"
        colors={["#0f0d1a", "#7c3aed", "#1e1b4b", "#4c1d95", "#000000"]}
        speed={0.15}
      />
      {/* Secondary layer — softer, lighter, overlaid at 50% opacity */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        colors={["#0f0d1a", "#c4b5fd", "#1e1b4b", "#000000"]}
        speed={0.08}
      />
    </div>
  );
}
