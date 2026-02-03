import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Texavor - AEO & Content Optimization Platform for Developers",
  description:
    "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
  alternates: {
    canonical: "/",
  },
};

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
          "@id": "https://www.texavor.com/#person",
        },
        // Knowledge Graph connections
        about: [
          {
            "@type": "Thing",
            name: "Answer Engine Optimization",
            sameAs: "https://en.wikipedia.org/wiki/Search_engine_optimization",
          },
          {
            "@type": "Thing",
            name: "Artificial Intelligence",
            sameAs: "https://en.wikipedia.org/wiki/Artificial_intelligence",
          },
          {
            "@type": "Thing",
            name: "Content Marketing",
            sameAs: "https://en.wikipedia.org/wiki/Content_marketing",
          },
        ],
        // Voice Search optimization
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-title", ".hero-description"],
        },
      },

      // Person Schema for E-E-A-T (Expertise, Experience, Authoritativeness, Trust)
      {
        "@type": "Person",
        "@id": "https://www.texavor.com/#person",
        name: "Suraj Vishwakarma",
        url: "https://www.texavor.com",
        description:
          "Founder of Texavor, expert in AI visibility optimization and Answer Engine Optimization (AEO)",
        jobTitle: "Founder & CEO",
        worksFor: {
          "@type": "Organization",
          name: "Texavor",
          url: "https://www.texavor.com",
        },
        // Social profiles for Knowledge Graph
        sameAs: [
          "https://x.com/texavor",
          "https://www.linkedin.com/company/texavor",
          "https://github.com/texavor",
        ],
        knowsAbout: [
          "Answer Engine Optimization",
          "AI Visibility Tracking",
          "Content Optimization",
          "SEO",
          "Generative Engine Optimization",
        ],
      },

      // Enhanced SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.texavor.com/#features",
        name: "Texavor",
        description:
          "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude. Fix content decay before you lose rank.",
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
          "@id": "https://www.texavor.com/#person",
        },
        // Mentions of related technologies/platforms
        mentions: [
          {
            "@type": "SoftwareApplication",
            name: "ChatGPT",
            sameAs: "https://en.wikipedia.org/wiki/ChatGPT",
          },
          {
            "@type": "SoftwareApplication",
            name: "Perplexity AI",
            url: "https://www.perplexity.ai",
          },
          {
            "@type": "Thing",
            name: "Large Language Models",
            sameAs: "https://en.wikipedia.org/wiki/Large_language_model",
          },
        ],
        // What the software is about
        about: [
          {
            "@type": "Thing",
            name: "Answer Engine Optimization",
          },
          {
            "@type": "Thing",
            name: "AI Visibility",
          },
          {
            "@type": "Thing",
            name: "Content Optimization",
          },
        ],
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

      // SiteNavigationElement - Helps Google understand key pages for sitelinks
      {
        "@type": "SiteNavigationElement",
        "@id": "https://www.texavor.com/#navigation",
        name: "Main Navigation",
        url: "https://www.texavor.com",
        hasPart: [
          {
            "@type": "WebPage",
            "@id": "https://www.app.texavor.com/login",
            name: "Login",
            url: "https://www.app.texavor.com/login",
            description: "Sign in to your Texavor account",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.app.texavor.com/register",
            name: "Register",
            url: "https://www.app.texavor.com/register",
            description: "Create a new Texavor account",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com#pricing",
            name: "Pricing",
            url: "https://www.texavor.com/pricing",
            description: "View Texavor pricing plans and features",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/tools",
            name: "Free Tools",
            url: "https://www.texavor.com/tools",
            description: "Free SEO and AEO tools",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/docs",
            name: "Documentation",
            url: "https://www.texavor.com/docs",
            description: "Texavor documentation and guides",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/blog",
            name: "Blog",
            url: "https://www.texavor.com/blog",
            description: "Insights on AI content creation and AEO",
          },
        ],
      },

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
