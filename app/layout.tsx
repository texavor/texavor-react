import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Texavor - AEO & Content Optimization Platform for Developers",
  },
  description:
    "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
  verification: {
    google: "E4iB-NQGsBin8Lyn7z9uYrmUZR0YwVl4_FhB4bWaKzo",
  },
  openGraph: {
    title: "Texavor - AEO & Content Optimization Platform for Developers",
    description:
      "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
    // images: "/easywriteOpenGraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texavor - AEO & Content Optimization Platform for Developers",
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
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CrispChat />
            <LandingNav />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>

        {/* Scripts */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="cd47a42b-95db-4fae-a72e-1b6737411074"
          strategy="afterInteractive"
        />
        <Analytics />

        {/* AI Tracker Component - Captures Full URL */}
        <AiTracker trackingId="tid_35e5c1c2d9fb712821686996" />

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
