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
  title: "gatsby grace",
  description: "bedroom pop pianist. diary entries in melody form.",
  keywords: ["gatsby grace", "bedroom pop", "piano", "gen alpha", "indie music", "ADHD"],
  openGraph: {
    title: "gatsby grace",
    description: "bedroom pop pianist. diary entries in melody form.",
    type: "website",
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
