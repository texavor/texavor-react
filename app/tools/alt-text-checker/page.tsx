import type { Metadata } from "next";
import VisualSearchClient from "./VisualSearchClient";

export const metadata: Metadata = {
  title:
    "Free Alt Text Checker - Audit Images for SEO & Accessibility | Texavor",
  description:
    "Instantly audit alt text for WCAG compliance and Google Lens optimization. Find missing alt text, duplicates, and get AI-powered suggestions. Free tool.",
  keywords: [
    "alt text checker",
    "alt text validator",
    "image accessibility checker",
    "check alt text online",
    "google lens optimization",
    "visual search seo",
    "wcag compliance checker",
    "image seo audit",
  ],
  openGraph: {
    title: "Free Alt Text Checker - Audit Images for SEO & Accessibility",
    description:
      "Instantly audit alt text for WCAG compliance and Google Lens optimization. Find missing alt text, duplicates, and get AI-powered suggestions.",
    type: "website",
    url: "https://www.texavor.com/tools/alt-text-checker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Alt Text Checker - Audit Images for SEO & Accessibility",
    description:
      "Instantly audit alt text for WCAG compliance and Google Lens optimization.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/alt-text-checker",
  },
};

export default function AltTextCheckerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Alt Text Checker",
    description:
      "Audit image alt text for WCAG compliance and Google Lens visual search optimization",
    url: "https://www.texavor.com/tools/alt-text-checker",
    applicationCategory: "SEOApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisualSearchClient />
    </>
  );
}
