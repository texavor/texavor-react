import PageTransition from "@/components/PageTransition";
import Pricing from "@/components/Pricing";
import Schema from "@/components/Schema";

export const metadata = {
  title: "Pricing | Texavor",
  description:
    "Simple, transparent pricing for AI content optimization. Choose the flexible plan that fits your team's needs. Start optimizing for ChatGPT and Perplexity today.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.texavor.com/pricing",
    url: "https://www.texavor.com/pricing",
    name: "Pricing - Texavor",
    description: "Simple, transparent pricing for AI content optimization.",
  };

  return (
    <PageTransition>
      <Schema script={schema} />
      <main className="flex min-h-screen flex-col items-center w-full">
        <Pricing />
      </main>
    </PageTransition>
  );
}
