import { Metadata } from "next";
import CitationAuthorityClient from "./CitationAuthorityClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Citation Authority Checker | Source Validation & E-E-A-T Audit | Texavor",
  description:
    "Audit external links and score citation authority (.edu/.gov) for the AI era. Boost E-E-A-T signals and establish credible data sources for AI content workflows.",
  alternates: {
    canonical: "/tools/citation-authority-checker",
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
        name: "Citation Authority Checker",
        item: "https://www.texavor.com/tools/citation-authority-checker",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/citation-authority-checker",
    url: "https://www.texavor.com/tools/citation-authority-checker",
    name: "Citation Authority Checker - AI Source Tool",
    description:
      "Audit external links, score citation authority, and boost E-E-A-T compliance for improved AI search relevance.",
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
      <CitationAuthorityClient />
    </>
  );
}
