import { Metadata } from "next";
import AEOSchemaValidatorClient from "./AEOSchemaValidatorClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "GEO Schema Validator | AI Search Readiness Checker | Texavor",
  description:
    "Validate your Schema Markup for Generative Engine Optimization (GEO) and AI Search readiness. Analyze your content for AI search engines and get optimization recommendations.",
  alternates: {
    canonical: "/tools/aeo-schema-validator",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/aeo-schema-validator",
    url: "https://www.texavor.com/tools/aeo-schema-validator",
    name: "GEO Schema Validator - Free AI Search Readiness Tool",
    description:
      "Validate your Schema Markup for Generative Engine Optimization (GEO) and AI Search readiness. Analyze your content for AI search engines and get optimization recommendations.",
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
      <Schema script={schema} />
      <AEOSchemaValidatorClient />
    </>
  );
}
