import type { Metadata } from "next";
import CitationOpportunitiesClient from "./CitationOpportunitiesClient";

export const metadata: Metadata = {
  title: "Free Citation Opportunity Finder - Improve E-E-A-T | Texavor",
  description:
    "Find uncited claims, statistics, and expert advice that need sources. Improve E-E-A-T and credibility with citation suggestions. Free tool.",
  keywords: [
    "citation opportunities",
    "where to add citations",
    "uncited claims checker",
    "e-e-a-t checker",
    "content credibility tool",
    "fact check helper",
    "find claims that need sources",
    "improve content citations seo",
  ],
  openGraph: {
    title: "Free Citation Opportunity Finder - Improve E-E-A-T",
    description:
      "Find uncited claims and improve your content's credibility instantly.",
    type: "website",
    url: "https://www.texavor.com/tools/citation-opportunities",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Citation Opportunity Finder - Improve E-E-A-T",
    description: "Find uncited claims and improve content credibility.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/citation-opportunities",
  },
};

export default function CitationOpportunitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Citation Opportunities Finder",
    description:
      "Identify where citations should be added to improve E-E-A-T and content credibility",
    url: "https://www.texavor.com/tools/citation-opportunities",
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
      <CitationOpportunitiesClient />
    </>
  );
}
