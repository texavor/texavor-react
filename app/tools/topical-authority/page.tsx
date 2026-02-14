import React from "react";
import TopicalAuthorityPage from "./TopicalAuthorityPage";
import { Metadata } from "next";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Topical Authority Map Generator | AI Content Cluster Strategy Tool | Texavor",
  description:
    "Visualise your topical authority for AI search readiness. Enter a keyword to generate a complete topic cluster map and GEO content strategy for free.",
  alternates: {
    canonical: "/tools/topical-authority",
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
        name: "Topical Authority Map",
        item: "https://www.texavor.com/tools/topical-authority",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/topical-authority",
    url: "https://www.texavor.com/tools/topical-authority",
    name: "Topical Authority Map - GEO Topic Cluster Tool",
    description:
      "Visualize contextual relationships and build semantic authority for your niche. Generate complete topic cluster maps and content strategy for the AI era.",
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
      <TopicalAuthorityPage />
    </>
  );
}
