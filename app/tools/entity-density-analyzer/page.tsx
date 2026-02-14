import type { Metadata } from "next";
import EntityDensityClient from "./EntityDensityClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Entity Density Analyzer | LLM Understanding & GEO Audit | Texavor",
  description:
    "Analyze your content for entity density and LLM readiness. See how AI search engines extract entities and improve your GEO (Generative Engine Optimization) performance.",
  alternates: {
    canonical: "/tools/entity-density-analyzer",
  },
};

export default function EntityDensityPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.texavor.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.texavor.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Entity Density Analyzer",
        item: "https://www.texavor.com/tools/entity-density-analyzer",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/entity-density-analyzer",
    url: "https://www.texavor.com/tools/entity-density-analyzer",
    name: "Entity Density Analyzer - LLM Readiness Tool",
    description:
      "Identify key entities and analyze their density for improved entity-based SEO and Generative Engine Optimization.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.texavor.com",
      url: "https://www.texavor.com",
      name: "Texavor",
    },
  };

  return (
    <>
      <Schema script={jsonLd} />
      <Schema script={breadcrumbSchema} />
      <EntityDensityClient />
    </>
  );
}
