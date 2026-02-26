import type { Metadata } from "next";
import BrandAuthorityPage from "./BrandAuthorityPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free Brand Authority Checker | AI & E-E-A-T Audit | Texavor",
  description:
    "Audit your Brand Authority for the AI era. Analyze Social Links, Knowledge Graph Schema, and E-E-A-T to verify readiness for AI search engines like Perplexity.",
  alternates: {
    canonical: "/tools/brand-authority",
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
        name: "Brand Authority Checker",
        item: "https://www.texavor.com/tools/brand-authority",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/brand-authority",
    url: "https://www.texavor.com/tools/brand-authority",
    name: "Brand Authority Checker - E-E-A-T & Trust Audit Tool",
    description:
      "Calculate your Brand Authority Score instantly. Analyze Social Links, Knowledge Graph Schema, and AI visibility signals.",
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
      <BrandAuthorityPage />
    </>
  );
}
