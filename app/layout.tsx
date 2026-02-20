import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import LandingNav from "@/components/LandingNav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import CrispChat from "@/components/CrispChat";
import AiTracker from "./AiTracker";

import UmamiEngagement from "@/components/UmamiEngagement";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * TEXAVOR TYPOGRAPHY SYSTEM — 3-font hierarchy
 *
 * font-poppins  →  Headings (h1–h4), hero text, section titles, card titles, eyebrows
 * font-inter    →  All body copy, descriptions, labels, nav links, UI text
 * font-mono     →  Data, stats, metrics, numbers, scores, code snippets
 *                  (also available as font-data — same font, semantic alias)
 *
 * Tailwind classes:
 *   font-poppins   uses var(--font-poppins)
 *   font-inter     uses var(--font-inter)
 *   font-mono      uses var(--font-geist-mono)
 *   font-data      uses var(--font-geist-mono)  ← alias, prefer for stat numbers
 *
 * NEVER use font-poppins for body text.
 * NEVER use font-inter for headings.
 * NEVER use font-mono for anything other than numbers/data/code.
 */
const geistMono = Geist_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default:
      "Texavor - GEO & Content Optimization Platform for Writers, Marketers & Developers",
  },
  description:
    "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
  verification: {
    google: "E4iB-NQGsBin8Lyn7z9uYrmUZR0YwVl4_FhB4bWaKzo",
  },
  openGraph: {
    title:
      "Texavor - GEO & Content Optimization Platform for Writers, Marketers & Developers",
    description:
      "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
    // images: "/easywriteOpenGraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Texavor - GEO & Content Optimization Platform for Writers, Marketers & Developers",
    description:
      "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
    // images: "/easywriteOpenGraph.png",
  },

  metadataBase: new URL("https://www.texavor.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${geistMono.variable} antialiased tx-dot-bg`}
      >
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CrispChat />
            <LandingNav />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>

        <Script
          src="/stats/script.js"
          data-website-id="cd47a42b-95db-4fae-a72e-1b6737411074"
          data-host-url="/stats"
          data-domains="texavor.com,www.texavor.com"
          strategy="afterInteractive"
        />
        <Analytics />
        <UmamiEngagement />

        {/* AI Tracker Component - Captures Full URL */}
        <Suspense fallback={null}>
          <AiTracker trackingId="tid_35e5c1c2d9fb712821686996" />
        </Suspense>

        {/* Fallback for non-JS bots (still good to have) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.api.texavor.com/api/v1/pixel?id=tid_35e5c1c2d9fb712821686996"
            width="1"
            height="1"
            style={{ display: "none" }}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
