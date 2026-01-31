import type { Metadata } from "next";
import FaqSchemaPage from "./FaqSchemaPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free FAQ Schema Generator | JSON-LD & Microdata Creator | Texavor",
  description:
    "Instantly generate Google-compliant FAQ Schema. Type your questions or auto-extract them from any URL. 100% Free.",
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/faq-schema-generator",
    url: "https://www.texavor.com/tools/faq-schema-generator",
    name: "FAQ Schema Generator - Free JSON-LD Tool",
    description:
      "Boost CTR instantly by generating valid JSON-LD FAQ Schema markup. Instantly generate Google-compliant FAQ Schema. Type your questions or auto-extract them from any URL.",
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
      <FaqSchemaPage />
    </>
  );
}
