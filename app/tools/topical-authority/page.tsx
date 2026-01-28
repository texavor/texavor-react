import React from "react";
import TopicalAuthorityPage from "./TopicalAuthorityPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Topical Authority Map Generator | Build SEO Clusters Instantly",
  description:
    "Visualise your topical authority. Enter a keyword to generate a complete topic cluster map and content strategy for free. No signup required.",
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
            name: "Texavor Topical Authority Map",
            applicationCategory: "SEO Application",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free tool to generate topical authority maps and keyword clusters for SEO strategy.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "120",
            },
          }),
        }}
      />
      <TopicalAuthorityPage />
    </>
  );
}
