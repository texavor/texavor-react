import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Content Workflow & Topic Discovery | Texavor",
  description:
    "Discover exactly what your audience asks AI. Generate data-backed briefs and publish perfectly formatted content to your CMS with Texavor.",
  alternates: {
    canonical: "/",
  },
};

import Hero from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import Features from "@/components/Features";
import PlatformStatsStrip from "@/components/PlatformStatsStrip";
// import BeforeAfterProof from "@/components/BeforeAfterProof";
import { CitationAnatomy } from "@/components/CitationAnatomy";
import dynamic from "next/dynamic";
import Schema from "@/components/Schema";

const Integration = dynamic(() => import("@/components/Integration"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProductPreview = dynamic(() => import("@/components/ProductPreview"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const MarketData = dynamic(() => import("@/components/MarketData"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));
const AIPitfalls = dynamic(() => import("@/components/AIPitfalls"));

import { ComparisonTable } from "@/components/ComparisonTable";
import { faqData as homepageFaqData } from "@/lib/faq-data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Dynamically compile FAQ schema from FAQ component data
  const faqSchemaRows =
    homepageFaqData && Array.isArray(homepageFaqData)
      ? homepageFaqData.map((faq) => ({
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
          "Find missing topics in AI search, generate data-backed briefs, and publish seamlessly to your blog.",
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
          "Turn AI searches into published content. Find missing topics, generate data-backed briefs, and sync directly to your CMS.",
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
        name: "Texavor - AI Content Workflow & Topic Discovery",
        description:
          "Texavor helps you discover exactly what your audience asks AI. Generate data-backed briefs and publish perfectly formatted content directly to your CMS.",
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
        <TrustedBy />
        <PlatformStatsStrip />
        {/* <BeforeAfterProof /> */}
        <CitationAnatomy />
        <Features />
        <Integration />
        <HowItWorks />
        {/* <Testimonials /> */}
        <AIPitfalls />
        <MarketData />

        {/* Comparison Section */}
        <section className="w-full py-24 md:py-32 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-start text-left mb-16 md:mb-20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-accent" />
                <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
                  MARKET COMPARISON
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight max-w-2xl">
                Stop guessing what <br />
                your audience wants.
              </h2>
              <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
                Most AI tools just rewrite existing articles. We help you find{" "}
                <span className="text-foreground font-semibold italic">
                  untapped questions
                </span>{" "}
                and build content workflows that actually drive value. Compare
                the depth of Texavor vs legacy AI generators.
              </p>
            </div>

            <ComparisonTable />
          </div>
        </section>

        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </PageTransition>
  );
}
