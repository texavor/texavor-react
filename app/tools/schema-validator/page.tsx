import { Metadata } from "next";
import SchemaValidatorClient from "./SchemaValidatorClient";
import { Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Schema Markup Validator + AEO Audit | Texavor",
  description:
    "Validate JSON-LD schema, check syntax errors, and get AEO optimization tips. Test Article, FAQPage, HowTo schemas instantly. Free tool for SEO.",
  keywords: [
    "schema markup validator",
    "json-ld validator",
    "schema validator free",
    "test schema markup",
    "validate structured data",
    "check schema org",
    "how to validate json-ld schema",
    "free schema markup checker",
  ],
  openGraph: {
    title: "Free Schema Markup Validator + AEO Audit | Texavor",
    description:
      "Validate JSON-LD schema, check syntax errors, and get AEO optimization tips. Test Article, FAQPage, HowTo schemas instantly.",
    type: "website",
    url: "https://www.texavor.com/tools/schema-validator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Schema Markup Validator + AEO Audit | Texavor",
    description:
      "Validate JSON-LD schema, check syntax errors, and get AEO optimization tips. Test Article, FAQPage, HowTo schemas instantly.",
  },
  alternates: {
    canonical: "https://www.texavor.com/tools/schema-validator",
  },
};

export default function SchemaValidatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Schema Markup Validator",
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free tool to validate JSON-LD schema markup, check syntax errors, and get AEO optimization recommendations for Article, FAQPage, HowTo schemas.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SchemaValidatorClient />
    </>
  );
}
