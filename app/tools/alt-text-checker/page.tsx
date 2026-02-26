import type { Metadata } from "next";
import VisualSearchClient from "./VisualSearchClient";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
    "Free Alt Text Checker | AI Visual Search & Accessibility Audit | Texavor",
  description:
    "Instantly audit image alt text for WCAG compliance and AI Lens optimization. Improve image metadata for better visibility in visual search results.",
  alternates: {
    canonical: "/tools/alt-text-checker",
  },
};

export default function AltTextCheckerPage() {
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
        name: "Alt Text Checker",
        item: "https://www.texavor.com/tools/alt-text-checker",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/alt-text-checker",
    url: "https://www.texavor.com/tools/alt-text-checker",
    name: "Alt Text Checker - AI Visual Tool",
    description:
      "Audit image alt text for WCAG compliance and AI visual search optimization for generative engines.",
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
      <VisualSearchClient />
    </>
  );
}
