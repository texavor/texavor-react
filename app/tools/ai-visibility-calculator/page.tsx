import { Metadata } from "next";
import AiVisibilityPage from "./AiVisibilityPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "AI Visibility Calculator",
  description:
    "Test how well your content ranks in AI search results with our advanced 5-point analysis.",
  alternates: {
    canonical: "/tools/ai-visibility-calculator",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/ai-visibility-calculator",
    url: "https://www.texavor.com/tools/ai-visibility-calculator",
    name: "AI Visibility Calculator - Free AEO Tool",
    description:
      "Analyze keyword rankings in AI Overviews (SGE) and optimize for Large Language Models. Test how well your content ranks in AI search results with our advanced 5-point analysis.",
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
      <AiVisibilityPage />
    </>
  );
}
