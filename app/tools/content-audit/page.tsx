import React from "react";
import ContentAuditPage from "./ContentAuditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Content Audit Tool | Check SEO Health & Quality Instantly",
  description:
    "Scan any URL to identify technical errors, thin content, and missing metadata. Get a free health score and 100% actionable fix list.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Texavor Content Audit Tool",
            applicationCategory: "SEO Application",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free SEO content audit tool to analyze on-page factors, technical health, and content quality.",
          }),
        }}
      />
      <ContentAuditPage />
    </>
  );
}
