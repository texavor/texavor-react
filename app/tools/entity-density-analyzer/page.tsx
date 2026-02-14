import type { Metadata } from "next";
import EntityDensityClient from "./EntityDensityClient";

export const metadata: Metadata = {
  title: "Free Entity Density Analyzer - Entity SEO Tool | Texavor",
  description:
    "Analyze entity salience, detect knowledge graph opportunities, and optimize for semantic SEO. Check entity distribution and get schema markup recommendations. Free tool.",
  keywords: [
    "entity density",
    "entity SEO tool",
    "entity analysis",
    "named entity recognition",
    "knowledge graph seo",
    "semantic seo checker",
    "check entity density online",
    "entity salience analyzer",
  ],
  openGraph: {
    title: "Free Entity Density Analyzer - Entity SEO Tool",
    description:
      "Analyze entity salience and optimize for semantic SEO instantly.",
    type: "website",
    url: "https://www.texavor.com/tools/entity-density-analyzer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Entity Density Analyzer - Entity SEO Tool",
    description: "Analyze entity salience and optimize for semantic SEO.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/entity-density-analyzer",
  },
};

export default function EntityDensityAnalyzerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Entity Density Analyzer",
    description:
      "Analyze entity salience, detect knowledge graph opportunities, and optimize content for semantic SEO",
    url: "https://www.texavor.com/tools/entity-density-analyzer",
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
      <EntityDensityClient />
    </>
  );
}
