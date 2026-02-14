import type { Metadata } from "next";
import DirectAnswerClient from "./DirectAnswerClient";
import Schema from "@/components/Schema"; // Assuming a Schema component for structured data

export const metadata: Metadata = {
  title:
    "Free Featured Snippet Optimizer | Win Position Zero in AI Search | Texavor",
  description:
    "Optimize your content for Position Zero and AI direct answers. Detect featured snippet opportunities, analyze answer structure, and improve your GEO (Generative Engine Optimization) performance.",
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
