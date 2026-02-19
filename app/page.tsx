import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Texavor - GEO & Content Optimization Platform for Developers",
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
import { faqData } from "@/lib/faq-data";

const Integration = dynamic(() => import("@/components/Integration"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProductPreview = dynamic(() => import("@/components/ProductPreview"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));

import { ComparisonTable } from "@/components/ComparisonTable";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Dynamically compile FAQ schema from FAQ component data
  const faqSchemaRows = Array.isArray(faqData)
    ? faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    : [];

  const mainSchema = {
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

      // PRIMARY: WebSite Schema
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
        // Knowledge Graph connections
        about: [
          {
            "@type": "Thing",
            name: "Generative Engine Optimization",
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

      // SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.texavor.com/#software",
        name: "Texavor",
        description:
          "Generate high-impact, E-E-A-T optimized technical articles. Monitor Share of Voice on ChatGPT, Perplexity & Claude.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "ContentOptimizationApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@id": "https://www.texavor.com/#person",
        },
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "@id": "https://www.texavor.com/#faq",
        mainEntity: faqSchemaRows,
      },

      // SiteNavigationElement
      {
        "@type": "SiteNavigationElement",
        "@id": "https://www.texavor.com/#navigation",
        hasPart: [
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/login",
            name: "Login",
            url: "https://www.app.texavor.com/login",
            description: "Sign in to your Texavor account",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/register",
            name: "Register",
            url: "https://www.app.texavor.com/register",
            description: "Create a new Texavor account",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/#pricing",
            name: "Pricing",
            url: "https://www.texavor.com/#pricing",
            description: "View Texavor pricing plans and features",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.texavor.com/tools",
            name: "Free Tools",
            url: "https://www.texavor.com/tools",
            description: "Free SEO and GEO tools",
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
            description: "Insights on AI content creation and GEO",
          },
        ],
      },

      // WebPage Schema for the homepage
      {
        "@type": "WebPage",
        "@id": "https://www.texavor.com/#webpage",
        url: "https://www.texavor.com",
        name: "Texavor - Best AI Visibility Optimization / GEO Tool",
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
      <Schema script={mainSchema} />
      <main className="flex min-h-screen flex-col items-center w-full pt-0">
        <Hero />
        {/* <SocialProof /> */}
        <Features />
        <Integration />
        <HowItWorks />
        {/* <Testimonials /> */}

        {/* Comparison Section */}
        <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="container px-4 mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 mb-4">
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                  Compare
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white font-poppins">
                Don't settle for a <span className="text-zinc-500">tool</span>.
                <br />
                Build with an{" "}
                <span className="text-emerald-600 dark:text-emerald-500">
                  Operating System
                </span>
                .
              </h2>
            </div>
            <ComparisonTable />
            <div className="mt-12 text-center">
              <Link
                href="/comparison"
                className="inline-flex items-center gap-2 text-primary dark:text-emerald-400 hover:text-primary/80 dark:hover:text-emerald-300 font-medium transition-colors"
              >
                See Full Comparison <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </PageTransition>
  );
}
