import React from "react";
import ContentAuditPage from "./ContentAuditPage";
import { Metadata } from "next";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free Content Audit Tool | Check SEO Health & Quality Instantly",
  description:
    "Scan any URL to identify technical errors, thin content, and missing metadata. Get a free health score and 100% actionable fix list.",
  alternates: {
    canonical: "/tools/content-audit",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/content-audit",
    url: "https://www.texavor.com/tools/content-audit",
    name: "Content Quality Audit - Free SEO Analysis Tool",
    description:
      "Analyze your content depth, keyword usage, and optimization score. Scan any URL to identify technical errors, thin content, and missing metadata.",
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
      <ContentAuditPage />
    </>
  );
}
