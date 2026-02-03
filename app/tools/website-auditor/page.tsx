import { Metadata } from "next";
import WebsiteAuditorPage from "./WebsiteAuditorPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Website AI Auditor",
  description:
    "Is your website ready for the AI era? Check your specialized readiness for Crawlers, RAG, and Entity Understanding.",
  alternates: {
    canonical: "/tools/website-auditor",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/website-auditor",
    url: "https://www.texavor.com/tools/website-auditor",
    name: "Website AI Auditor - Free Technical SEO Tool",
    description:
      "Technical audit for the AI era. Check Robots.txt, Sitemap, and Schema health. Is your website ready for AI Crawlers, RAG, and Entity Understanding?",
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
      <WebsiteAuditorPage />
    </>
  );
}
