import type { Metadata } from "next";
import FaqSchemaPage from "./FaqSchemaPage";

export const metadata: Metadata = {
  title: "Free FAQ Schema Generator | JSON-LD & Microdata Creator | Texavor",
  description:
    "Instantly generate Google-compliant FAQ Schema. Type your questions or auto-extract them from any URL. 100% Free.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Texavor FAQ Schema Generator",
            applicationCategory: "SEOUtility",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <FaqSchemaPage />
    </>
  );
}
