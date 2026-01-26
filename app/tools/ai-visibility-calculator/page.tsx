import { Metadata } from "next";
import AiVisibilityPage from "./AiVisibilityPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "AI Visibility Calculator",
  description:
    "Test how well your content ranks in AI search results with our advanced 5-point analysis.",
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Visibility Calculator",
    applicationCategory: "BusinessApplication",
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
      <AiVisibilityPage />
    </>
  );
}
