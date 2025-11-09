import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./ReactQueryProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyWrite - Authority for you blog",
  description:
    "AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.",
  verification: {
    google: "WHjrUK7V1Y8n5aQ0gmeOk06LmzeSsadLBul9X_sQgTU",
  },
  openGraph: {
    title: "EasyWrite - Authority for you blog",
    description:
      "AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.",
    images: "/easywriteOpenGraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyWrite - Authority for you blog",
    description:
      "AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.",
    images: "/easywriteOpenGraph.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReactQueryProvider>
          <Navigation />
          {children}
          <Footer />
          <Toaster />
        </ReactQueryProvider>
      </body>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="c1a4ed5c-37ee-4742-9432-13a5cffedf7d"
        strategy="afterInteractive"
      />
    </html>
  );
}
