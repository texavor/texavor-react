import type { Metadata } from "next";
import ContentFreshnessClient from "./ContentFreshnessClient";

export const metadata: Metadata = {
  title: "Free Content Freshness Checker - Detect Content Decay | Texavor",
  description:
    "Analyze content freshness, find outdated statistics, and get update recommendations. Check publish dates, schema markup, and decay signals instantly. Free tool.",
  keywords: [
    "content decay tool",
    "content freshness checker",
    "seo freshness checker",
    "find outdated content",
    "check publish date",
    "content audit tool",
    "detect stale content",
    "content decay analyzer",
  ],
  openGraph: {
    title: "Free Content Freshness Checker - Detect Content Decay",
    description:
      "Analyze content freshness, find outdated statistics, and get update recommendations instantly.",
    type: "website",
    url: "https://www.texavor.com/tools/content-freshness-checker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Content Freshness Checker - Detect Content Decay",
    description:
      "Analyze content freshness and find outdated statistics instantly.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/content-freshness-checker",
  },
};

export default function ContentFreshnessCheckerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Content Freshness Checker",
    description:
      "Detect content decay signals and identify pages needing updates for SEO freshness",
    url: "https://www.texavor.com/tools/content-freshness-checker",
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
      <ContentFreshnessClient />
    </>
  );
}
