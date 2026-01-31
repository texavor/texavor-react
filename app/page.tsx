import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import dynamic from "next/dynamic";
import Schema from "@/components/Schema";
import { faqData } from "@/components/FAQ";

const Integration = dynamic(() => import("@/components/Integration"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProductPreview = dynamic(() => import("@/components/ProductPreview"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));

export default function Home() {
  // Dynamically compile FAQ schema from FAQ component data
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
      // PRIMARY: WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://www.texavor.com/#website",
        url: "https://www.texavor.com",
        name: "Texavor",
        description:
          "AI-powered content creation and optimization platform for Answer Engine Optimization (AEO) and SEO.",
        publisher: {
          "@type": "Person",
          name: "Suraj Vishwakarma",
          url: "https://www.texavor.com",
        },
      },

      // Enhanced SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.texavor.com/#features",
        name: "Texavor",
        description:
          "AI-powered content creation and optimization platform. Track your visibility across ChatGPT, Perplexity, and other AI/LLMs. Get mentioned in AI with Texavor.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "ContentOptimizationApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          description: "Free trial available. Paid plans start from $29/month.",
        },
        featureList: [
          "AI Visibility Tracking",
          "Answer Engine Optimization (AEO)",
          "Content Generation",
          "SEO Optimization",
          "Multi-platform Publishing",
          "Analytics Dashboard",
          "Team Collaboration",
        ],
        screenshot: "https://www.texavor.com/texavor.png",
        softwareVersion: "2.0",
        author: {
          "@type": "Person",
          name: "Suraj Vishwakarma",
          url: "https://www.texavor.com",
        },
      },

      // FAQPage Schema - Only if FAQs exist
      ...(faqSchema.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": "https://www.texavor.com/#faq",
              mainEntity: faqSchema,
            },
          ]
        : []),

      // WebPage Schema for the homepage
      {
        "@type": "WebPage",
        "@id": "https://www.texavor.com/#webpage",
        url: "https://www.texavor.com",
        name: "Texavor - Best AI Visibility Optimization / AEO Tool",
        description:
          "Texavor helps you track and optimize your company's visibility across ChatGPT, Perplexity, and other AI/LLMs. Get mentioned in AI with Texavor.",
        author: {
          "@type": "Person",
          name: "Suraj Vishwakarma",
          url: "https://www.texavor.com",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.texavor.com/texavor.png",
        },
      },
    ],
  };

  return (
    <PageTransition>
      <Schema script={schema} />
      <main className="flex min-h-screen flex-col items-center w-full pt-0">
        <Hero />
        {/* <SocialProof /> */}
        <Features />
        <Integration />
        <HowItWorks />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </PageTransition>
  );
}
