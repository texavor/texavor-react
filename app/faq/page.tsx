import PageTransition from "@/components/PageTransition";
import FAQ, { faqData } from "@/components/FAQ";
import Schema from "@/components/Schema";

export const metadata = {
  title: "FAQ | Texavor",
  description:
    "Find answers to frequently asked questions about Texavor, Generative Engine Optimization (GEO), content optimization features, and our AI-powered platform tools.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const faqSchema = Array.isArray(faqData)
    ? faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.texavor.com/#website",
        url: "https://www.texavor.com",
        name: "Texavor",
        publisher: {
          "@id": "https://www.texavor.com/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.texavor.com/#person",
        name: "Suraj Vishwakarma",
        url: "https://www.texavor.com",
        description:
          "Founder of Texavor, expert in AI visibility optimization and Generative Engine Optimization (GEO)",
        jobTitle: "Founder & CEO",
        worksFor: {
          "@type": "Organization",
          name: "Texavor",
          url: "https://www.texavor.com",
        },
        sameAs: [
          "https://x.com/texavor",
          "https://www.linkedin.com/company/texavor",
          "https://github.com/texavor",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.texavor.com/faq/#webpage",
        url: "https://www.texavor.com/faq",
        name: "FAQ - Texavor",
        description:
          "Frequently asked questions about Texavor, GEO, content optimization, and more.",
        isPartOf: { "@id": "https://www.texavor.com/#website" },
        about: { "@id": "https://www.texavor.com/#person" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.texavor.com/faq/#faq",
        mainEntity: faqSchema,
        isPartOf: { "@id": "https://www.texavor.com/faq/#webpage" },
      },
    ],
  };

  return (
    <PageTransition>
      <Schema script={schema} />
      <main className="flex min-h-screen flex-col items-center w-full pt-20">
        <FAQ />
      </main>
    </PageTransition>
  );
}
