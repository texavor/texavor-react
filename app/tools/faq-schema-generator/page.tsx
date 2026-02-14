import type { Metadata } from "next";
import FaqSchemaPage from "./FaqSchemaPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title:
    "Free FAQ Schema Generator | JSON-LD & GEO Rich Snippet Tool | Texavor",
  description:
    "Instantly generate AI-ready FAQ Schema. Type your questions or auto-extract for better GEO (Generative Engine Optimization) and Google Rich Snippet visibility.",
  alternates: {
    canonical: "/tools/faq-schema-generator",
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
        name: "FAQ Schema Generator",
        item: "https://www.texavor.com/tools/faq-schema-generator",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/faq-schema-generator",
    url: "https://www.texavor.com/tools/faq-schema-generator",
    name: "FAQ Schema Generator - GEO Rich Snippet Tool",
    description:
      "Boost CTR and AI visibility instantly by generating valid JSON-LD FAQ Schema markup. Optimized for generative engines and Google search.",
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
      <FaqSchemaPage />
    </>
  );
}
