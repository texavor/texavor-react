import { Metadata } from "next";
import AEOSchemaValidatorClient from "./AEOSchemaValidatorClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "AI Schema Validator | AI Search Readiness & Entity Content Audit | Texavor",
  description:
    "Validate your Schema Markup for the Generative Engine era. Audit content for LLM understanding, entity density, and readiness to appear in AI search results.",
  alternates: {
    canonical: "/tools/aeo-schema-validator",
  },
};

export default function Page() {
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
        name: "AI Schema Validator",
        item: "https://www.texavor.com/tools/aeo-schema-validator",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/aeo-schema-validator",
    url: "https://www.texavor.com/tools/aeo-schema-validator",
    name: "AI Schema Validator - AI Readiness Tool",
    description:
      "Validate your Schema Markup for AI Search readiness. Analyze your content for AI search engines and get optimization recommendations.",
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
      <Schema script={breadcrumbSchema} />
      <AEOSchemaValidatorClient />
    </>
  );
}
