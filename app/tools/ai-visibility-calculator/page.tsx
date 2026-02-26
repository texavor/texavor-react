import { Metadata } from "next";
import AiVisibilityPage from "./AiVisibilityPage";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Free AI Topic Analyzer | AI Search Visibility Checker | Texavor",
  description:
    "Test how well your content covers topics for AI search results like ChatGPT and Perplexity. Improve visibility in generative engines with our advanced 5-point analysis.",
  alternates: {
    canonical: "/tools/ai-visibility-calculator",
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
        name: "AI Visibility Calculator",
        item: "https://www.texavor.com/tools/ai-visibility-calculator",
      },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.texavor.com/tools/ai-visibility-calculator",
    url: "https://www.texavor.com/tools/ai-visibility-calculator",
    name: "AI Topic Analyzer - Free Tool",
    description:
      "Analyze keyword relevance in AI Overviews (SGE) and optimize for Large Language Models. Test how well your content covers topics in AI search results with our advanced 5-point analysis.",
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
      <AiVisibilityPage />
    </>
  );
}
