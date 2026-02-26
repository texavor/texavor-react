import type { Metadata } from "next";
import ContentFreshnessClient from "./ContentFreshnessClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
    "Free Content Freshness Checker | AI Relevance Auditor | Texavor",
  description:
    "Audit your content freshness for the AI era. Detect content decay, analyze update frequency, and improve your relevance in AI search.",
  alternates: {
    canonical: "/tools/content-freshness-checker",
  },
};

export default function ContentFreshnessPage() {
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
        name: "Content Freshness Checker",
        item: "https://www.texavor.com/tools/content-freshness-checker",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/content-freshness-checker",
    url: "https://www.texavor.com/tools/content-freshness-checker",
    name: "Content Freshness Checker - AI Decay Tool",
    description:
      "Identify content decay and freshness signals to maintain visibility in AI search engines and modern workflows.",
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
      <ContentFreshnessClient />
    </>
  );
}
