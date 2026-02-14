import type { Metadata } from "next";
import DirectAnswerClient from "./DirectAnswerClient";

export const metadata: Metadata = {
  title: "Free Featured Snippet Optimizer - Position Zero Tool | Texavor",
  description:
    "Optimize your content for Position Zero and AI-driven direct answers. Detect featured snippet opportunities, analyze answer structure, and validate schema markup.",
  keywords: [
    "featured snippet optimizer",
    "position zero tool",
    "direct answer checker",
    "ai answer optimization",
    "generative engine direct answers",
    "seo snippet checker",
  ],
  openGraph: {
    title: "Free Featured Snippet Optimizer - Rank for Position Zero",
    description:
      "Detect featured snippet opportunities and optimize your content for direct answers.",
    type: "website",
    url: "https://www.texavor.com/tools/featured-snippet-optimizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Featured Snippet Optimizer - Rank for Position Zero",
    description:
      "Optimize content structure for direct answers and AI snippets.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/featured-snippet-optimizer",
  },
};

export default function FeaturedSnippetOptimizerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Featured Snippet Optimizer",
    description:
      "Optimize content structure for direct answers and AI-driven featured snippets.",
    url: "https://www.texavor.com/tools/featured-snippet-optimizer",
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
      <DirectAnswerClient />
    </>
  );
}
