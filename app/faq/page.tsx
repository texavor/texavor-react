import PageTransition from "@/components/PageTransition";
import dynamic from "next/dynamic";
import { faqData } from "@/lib/faq-data";
import Schema from "@/components/Schema";

const FAQ = dynamic(() => import("@/components/FAQ"));

export const metadata = {
  title: "FAQ | Texavor",
  description:
    "Find answers to frequently asked questions about Texavor, Generative Engine Optimization (GEO), content optimization features, and our AI-powered platform tools.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const faqSchemaRows =
    faqData && Array.isArray(faqData)
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
      // PRIMARY: Organization Schema for Knowledge Graph
      {
        "@type": "Organization",
        "@id": "https://www.texavor.com/#organization",
        name: "Texavor",
        url: "https://www.texavor.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.texavor.com/texavor.png",
        },
        sameAs: [
          "https://x.com/texavor",
          "https://www.linkedin.com/company/texavor",
          "https://github.com/texavor",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "",
          contactType: "customer service",
          email: "contact@texavor.com",
        },
      },
      // Person Schema for E-E-A-T
      {
        "@type": "Person",
        "@id": "https://www.texavor.com/#person",
        name: "Suraj Vishwakarma",
        url: "https://www.texavor.com",
        description:
          "Founder of Texavor, expert in AI visibility optimization and Generative Engine Optimization (GEO)",
        jobTitle: "Founder & CEO",
        worksFor: {
          "@id": "https://www.texavor.com/#organization",
        },
        // Social profiles for Knowledge Graph
        sameAs: [
          "https://x.com/texavor",
          "https://www.linkedin.com/company/texavor",
          "https://github.com/texavor",
        ],
        knowsAbout: [
          "Generative Engine Optimization",
          "AI Visibility Tracking",
          "Content Optimization",
          "SEO",
        ],
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://www.texavor.com/#website",
        url: "https://www.texavor.com",
        name: "Texavor",
        description:
          "AI-powered content creation and optimization platform for Generative Engine Optimization (GEO) and SEO.",
        publisher: {
          "@id": "https://www.texavor.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.texavor.com/faq/#webpage",
        url: "https://www.texavor.com/faq",
        name: "FAQ - Texavor",
        description:
          "Frequently asked questions about Texavor, GEO, content optimization, and more.",
        isPartOf: { "@id": "https://www.texavor.com/#website" },
        author: {
          "@id": "https://www.texavor.com/#person",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.texavor.com/texavor.png",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.texavor.com/faq/#faq",
        mainEntity: faqSchemaRows,
        isPartOf: { "@id": "https://www.texavor.com/faq/#webpage" },
      },
    ],
  };

  return (
    <PageTransition>
      <Schema script={schema} />
      <main className="min-h-screen">
        <FAQ fullPage={true} />
      </main>
    </PageTransition>
  );
}
