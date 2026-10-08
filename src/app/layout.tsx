import type { Metadata } from "next";
import { Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";

/**
 * Cormorant Garamond - Elegant serif for body text
 * Captures the intimate, literary diary-entry feel of Gatsby's songwriting
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/**
 * Caveat - Handwritten display font
 * Personal, diary-like feel for headings - like Gatsby scribbled it herself
 */
const caveat = Caveat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${cormorant.variable} ${caveat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
