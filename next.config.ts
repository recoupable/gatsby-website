import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Optimize package imports to avoid barrel file performance issues.
   * Per best practice: bundle-barrel-imports (CRITICAL impact)
   * 
   * When these libraries are added, imports like:
   *   import { Icon } from 'lucide-react'
   * Will be automatically transformed to direct imports at build time.
   */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
    ],
  },
  
  /**
   * Transpile local linked packages
   * Required for yarn link'd packages to work with Next.js
   */
  transpilePackages: ["@syncstreamai/syncstream"],
};

export default nextConfig;
