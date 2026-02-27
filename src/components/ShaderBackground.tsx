"use client";

import type { ReactNode } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface ShaderBackgroundProps {
  children: ReactNode;
}

/**
 * ShaderBackground
 * Subtle, immersive mesh gradients that feel like ambient bedroom light.
 */
export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MeshGradient
        className="absolute inset-0 w-full h-full pointer-events-none"
        colors={["#0f0d1a", "#7c3aed", "#1e1b4b", "#4c1d95", "#000000"]}
        speed={0.15}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        colors={["#0f0d1a", "#c4b5fd", "#1e1b4b", "#000000"]}
        speed={0.08}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
