import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ig", platform: "instagram" },
      { source: "/tt", platform: "tiktok" },
      { source: "/yt", platform: "youtube" },
      { source: "/x", platform: "x" },
    ].map(({ source, platform }) => ({
      source,
      destination: `/?utm_source=${platform}&utm_medium=social&utm_campaign=bio&utm_content=profile`,
      permanent: false,
    }));
  },
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
