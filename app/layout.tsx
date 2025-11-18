import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./ReactQueryProvider";
import Script from "next/script";

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
  title: "Texavor - Authority for you blog",
  description:
    "AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.",
  verification: {
    google: "E4iB-NQGsBin8Lyn7z9uYrmUZR0YwVl4_FhB4bWaKzo",
  },
  openGraph: {
    title: "Texavor - Authority for you blog",
    description:
      "AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.",
    images: "/easywriteOpenGraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texavor - Authority for you blog",
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
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <Navigation />
          {children}
          <Footer />
          <Toaster />
        </ReactQueryProvider>
      </body>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="cd47a42b-95db-4fae-a72e-1b6737411074"
        strategy="afterInteractive"
      />
    </html>
  );
}
