import React from "react";
import TopicalAuthorityPage from "./TopicalAuthorityPage";
import { Metadata } from "next";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free Topical Authority Map Generator | Build SEO Clusters Instantly",
  description:
    "Visualise your topical authority. Enter a keyword to generate a complete topic cluster map and content strategy for free. No signup required.",
  alternates: {
    canonical: "/tools/topical-authority",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/topical-authority",
    url: "https://www.texavor.com/tools/topical-authority",
    name: "Topical Authority Map - Free SEO Cluster Tool",
    description:
      "Visualize contextual relationships and build semantic authority for your niche. Generate complete topic cluster maps and content strategy for free.",
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
      <TopicalAuthorityPage />
    </>
  );
}
