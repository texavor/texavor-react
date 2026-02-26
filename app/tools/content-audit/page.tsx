import React from "react";
import ContentAuditPage from "./ContentAuditPage";
import { Metadata } from "next";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free Content Audit Tool | AI Search Quality Audit | Texavor",
  description:
    "Scan any URL for technical errors, thin content, and AI search readiness. Get a free health score and actionable fix list to improve your visibility in generative engines.",
  alternates: {
    canonical: "/tools/content-audit",
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
        name: "Content Quality Audit",
        item: "https://www.texavor.com/tools/content-audit",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/content-audit",
    url: "https://www.texavor.com/tools/content-audit",
    name: "Content Quality Audit - AI Readiness Tool",
    description:
      "Analyze your content depth, keyword usage, and AI optimization score. Scan any URL to identify technical errors and AI readiness signals.",
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
      <ContentAuditPage />
    </>
  );
}
