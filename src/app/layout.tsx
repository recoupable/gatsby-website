import type { Metadata } from "next";
import "./globals.css";
import FunnelAnalytics from "@/components/FunnelAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gatsby.wtf"),
  title: "gatsby",
  description: "Gatsby Grace. Music, videos, updates.",
  keywords: ["gatsby", "gatsby grace", "music"],
  openGraph: {
    title: "gatsby",
    description: "Gatsby Grace. Music, videos, updates.",
    type: "website",
    images: [{ url: "/images/gatsby-video-poster.jpg", alt: "Gatsby Grace" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <FunnelAnalytics />
      </body>
    </html>
  );
}
