import { Metadata } from "next";
import CitationAuthorityClient from "./CitationAuthorityClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Citation Authority Checker - Validate Sources & Links for SEO | Texavor",
  description:
    "Audit external links, score citation authority (.edu/.gov), detect weak claims, and boost E-E-A-T compliance. Free citation validator for content marketers.",
  alternates: {
    canonical: "/tools/citation-authority-checker",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/citation-authority-checker",
    url: "https://www.texavor.com/tools/citation-authority-checker",
    name: "Citation Authority Checker - Free Source Validator",
    description:
      "Audit external links, score citation authority (.edu/.gov), detect weak claims, and boost E-E-A-T compliance. Free citation validator for content marketers.",
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
      <CitationAuthorityClient />
    </>
  );
}
