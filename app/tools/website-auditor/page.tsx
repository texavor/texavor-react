import { Metadata } from "next";
import WebsiteAuditorPage from "./WebsiteAuditorPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Website AI Auditor | Technical GEO & RAG Readiness Test | Texavor",
  description:
    "Audit your website for the AI era. Check technical readiness for crawlers (GPTBot, CCBot), RAG systems, and entity understanding for better GEO rankings.",
  alternates: {
    canonical: "/tools/website-auditor",
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
        name: "Website AI Auditor",
        item: "https://www.texavor.com/tools/website-auditor",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/website-auditor",
    url: "https://www.texavor.com/tools/website-auditor",
    name: "Website AI Auditor - Technical GEO Tool",
    description:
      "Technical audit for the generative engine era. Check Robots.txt, Sitemap, and Schema health for AI Crawlers and RAG systems.",
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
      <WebsiteAuditorPage />
    </>
  );
}
