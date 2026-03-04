import { Metadata } from "next";
import SemanticStructureClient from "./SemanticStructureClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Semantic Heading Structure Checker | HTML H1-H6 Hierarchy Validator | Texavor",
  description:
    "Instantly validate your HTML heading hierarchy for the AI era. Fix skipped H2/H3 levels, missing H1 tags, and improve semantic depth for AI search.",
  alternates: {
    canonical: "/tools/geo-heading-structure-checker",
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
        name: "Semantic Heading Structure Checker",
        item: "https://www.texavor.com/tools/geo-heading-structure-checker",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/geo-heading-structure-checker",
    url: "https://www.texavor.com/tools/geo-heading-structure-checker",
    name: "Semantic Heading Structure Checker - AI Validator",
    description:
      "Instantly validate your HTML heading hierarchy. Fix skipped H2/H3 levels, missing H1 tags, and improve semantic structure for AI search tools.",
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
      <SemanticStructureClient />
    </>
  );
}
