import type { Metadata } from "next";
import DirectAnswerClient from "./DirectAnswerClient";
import Schema from "@/components/Schema"; // Assuming a Schema component for structured data

export const metadata: Metadata = {
  title: "Free Featured Snippet Optimizer | Win AI Direct Answers | Texavor",
  description:
    "Optimize your content structure for AI direct answers. Detect featured snippet opportunities, analyze answer structure, and improve your knowledge graph presence.",
  alternates: {
    canonical: "/tools/featured-snippet-optimizer",
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
