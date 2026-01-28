import type { Metadata } from "next";
import BrandAuthorityPage from "./BrandAuthorityPage";

export const metadata: Metadata = {
  title:
    "Free Brand Authority Checker | Test Your Social & Schema Signals | Texavor",
  description:
    "Calculate your Brand Authority Score instantly. We analyze your Social Links, Knowledge Graph Schema, and SSL Security to verify your E-E-A-T.",
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
            name: "Texavor Brand Authority Checker",
            applicationCategory: "SEO Application",
            description:
              "Analyzer for website brand signals including Social, Schema, and Security.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <BrandAuthorityPage />
    </>
  );
}
