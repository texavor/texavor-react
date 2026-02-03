import type { Metadata } from "next";
import BrandAuthorityPage from "./BrandAuthorityPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free Brand Authority Checker | Test Your Social & Schema Signals | Texavor",
  description:
    "Calculate your Brand Authority Score instantly. We analyze your Social Links, Knowledge Graph Schema, and SSL Security to verify your E-E-A-T.",
  alternates: {
    canonical: "/tools/brand-authority",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/brand-authority",
    url: "https://www.texavor.com/tools/brand-authority",
    name: "Domain Authority Checker - Free SEO Tool",
    description:
      "Check your Domain Authority (DA), Backlinks, and Organic Traffic estimates instantly. Calculate your Brand Authority Score with analysis of Social Links, Knowledge Graph Schema, and SSL Security.",
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
      <BrandAuthorityPage />
    </>
  );
}
