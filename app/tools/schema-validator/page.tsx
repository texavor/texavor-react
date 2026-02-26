import type { Metadata } from "next";
import SchemaValidatorClient from "./SchemaValidatorClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free JSON-LD Schema Validator | AI Search Readiness Auditor | Texavor",
  description:
    "Validate your Schema Markup for Google and AI search engines. Audit JSON-LD snippets for technical correctness and AI Search readiness.",
  alternates: {
    canonical: "/tools/schema-validator",
  },
};

export default function SchemaValidatorPage() {
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
        name: "Schema Validator",
        item: "https://www.texavor.com/tools/schema-validator",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/schema-validator",
    url: "https://www.texavor.com/tools/schema-validator",
    name: "Advanced Schema Validator - AI Readiness Tool",
    description:
      "Validate JSON-LD schema markup for enhanced search results and generative AI engine readiness.",
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
      <SchemaValidatorClient />
    </>
  );
}
