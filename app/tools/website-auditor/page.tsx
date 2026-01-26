import { Metadata } from "next";
import WebsiteAuditorPage from "./WebsiteAuditorPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Website AI Auditor",
  description:
    "Is your website ready for the AI era? Check your specialized readiness for Crawlers, RAG, and Entity Understanding.",
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Website AI Auditor",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Schema script={schema} />
      <WebsiteAuditorPage />
    </>
  );
}
