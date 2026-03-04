import type { Metadata } from "next";
import CitationOpportunitiesClient from "./CitationOpportunitiesClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Citation Opportunity Finder | Improve E-E-A-T & AI Trust | Texavor",
  description:
    "Audit your content for uncited claims and expert advice. Improve E-E-A-T signals and establish authority in AI search engines through better citation coverage.",
  alternates: {
    canonical: "/tools/citation-opportunities",
  },
};

export default function CitationOpportunitiesPage() {
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
        name: "Citation Opportunity Finder",
        item: "https://www.texavor.com/tools/citation-opportunities",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/citation-opportunities",
    url: "https://www.texavor.com/tools/citation-opportunities",
    name: "Citation Opportunities Finder - AI Trust Tool",
    description:
      "Identify where citations should be added to improve E-E-A-T and content credibility for AI search workflows.",
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
      <CitationOpportunitiesClient />
    </>
  );
}
