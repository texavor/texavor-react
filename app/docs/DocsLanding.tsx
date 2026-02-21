"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  MoveUpRight,
  BookOpen,
  Sparkles,
  Star,
} from "lucide-react";
import { DocCategory } from "@/lib/docs";
import LandingNav from "@/components/LandingNav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocsLandingProps {
  categories: DocCategory[];
}

// --- Custom Technical Icons (Minimalist) ---

const SvgZap = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

const SvgSearch = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21L16.65 16.65" />
  </svg>
);

const SvgPen = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19L5 19L5 12L12 12L12 19Z" strokeDasharray="2 2" />
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const SvgBrain = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11v-1a3 3 0 0 1 3-3V7a5 5 0 0 1 5 5v1a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
    <path d="M9 13v1" />
    <path d="M13 13v1" />
    <path d="M6.5 10a2.5 2.5 0 1 1 5 0" />
  </svg>
);

const SvgNetwork = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l18 18" strokeDasharray="3 3" opacity="0.3" />
  </svg>
);

export default function DocsLanding({ categories = [] }: DocsLandingProps) {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "getting-started":
        return <SvgZap className="w-5 h-5 text-amber-500" />;
      case "research-tools":
        return <SvgSearch className="w-5 h-5 text-blue-500" />;
      case "creation-suite":
        return <SvgPen className="w-5 h-5 text-emerald-500" />;
      case "intelligence-engine":
        return <SvgBrain className="w-5 h-5 text-purple-500" />;
      case "platforms":
        return <SvgNetwork className="w-5 h-5 text-orange-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <LandingNav />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none z-50" />

      {/* Hero — left-aligned editorial (Aligned with Tools page) */}
      <section className="w-full pt-20 pb-16 md:pt-28 md:pb-24 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">DOCUMENTATION</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Build with <span className="text-primary italic">authority</span>.{" "}
              <br className="hidden md:block" />
              Master the Texavor Engine.
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Technical guides, API references, and strategic recipes designed
              to maximize your visibility in the generative search landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Main Bento Grid — Gap-free clinical layout */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {/* FEATURED: AI Research Overview (2/3 width) */}
            <div className="md:col-span-2 bg-card p-10 md:p-14 flex flex-col group transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                  AI Research Engine
                </h4>
              </div>

              <h3 className="text-3xl font-poppins font-bold text-foreground mb-4">
                Real-time visibility scoring and entity mapping for
                high-authority content.
              </h3>

              <p className="text-muted-foreground font-inter max-w-md mb-8 leading-relaxed">
                Expert insights on citation logic, entity mapping, and automated
                SEO workflows—integrated directly into your workspace.
              </p>

              <div className="mt-auto pt-8 border-t border-border/50 flex items-center gap-6">
                <Link
                  href="/docs/introduction"
                  className="text-sm font-bold text-primary inline-flex items-center gap-2 group/link"
                >
                  Get Started{" "}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/docs/introduction"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Reference
                </Link>
              </div>
            </div>

            {/* SIDEBAR: Popular Guides (1/3 width) */}
            <div className="md:col-span-1 bg-card p-10 md:p-14 flex flex-col transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                  Popular Guides
                </h4>
              </div>

              <div className="space-y-4">
                {[
                  "AI Visibility Monitoring",
                  "Automated Entity Mapping",
                  "Competitor Decay Risk",
                  "GEO Content Generation",
                  "Multi-Channel Authority",
                ].map((item, i) => (
                  <Link
                    key={i}
                    href="/docs/introduction"
                    className="flex items-center justify-between group/guide"
                  >
                    <span className="text-sm font-inter font-medium text-muted-foreground group-hover/guide:text-foreground transition-colors">
                      {item}
                    </span>
                    <MoveUpRight className="w-3 h-3 opacity-0 group-hover/guide:opacity-60 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CATEGORY GRID (Integrated for gap-free) */}
            {categories?.map((category) => (
              <div
                key={category?.slug}
                className="bg-card p-10 flex flex-col hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-muted/50 rounded-lg border border-border/50 group-hover:border-primary/20 transition-colors">
                    {category?.slug ? (
                      getCategoryIcon(category.slug)
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <h4 className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                    {category?.name}
                  </h4>
                </div>

                <div className="space-y-4 mb-10">
                  {category?.items?.slice(0, 5)?.map((doc) => (
                    <Link
                      key={doc?.slug}
                      href={`/docs/${doc?.slug}`}
                      className="flex items-center justify-between group/item"
                    >
                      <span className="text-sm font-inter text-foreground font-medium group-hover/item:text-primary transition-colors">
                        {doc?.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-primary" />
                    </Link>
                  ))}
                </div>

                <Link
                  href={
                    category?.items?.[0]
                      ? `/docs/${category.items[0]?.slug}`
                      : "#"
                  }
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-primary/80 hover:text-primary transition-colors uppercase tracking-wider"
                >
                  View full category <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA — Standard minimal block */}
          <div className="mt-12 bg-card border border-border rounded-[40px] p-10 md:p-14 text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/10 text-primary border-primary/20"
            >
              Support Ecosystem
            </Badge>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground font-inter max-w-xl mx-auto mb-10 leading-relaxed text-base">
              Our technical support team is available 24/7 to help you with
              custom integrations, domain analysis, or advanced GEO strategy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="brand"
                size="xl"
                asChild
                className="min-w-[200px]"
              >
                <Link href="mailto:hello@texavor.com">Email Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-poppins font-bold tracking-tight text-foreground uppercase text-xs">
              Texavor Docs
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-inter font-bold uppercase tracking-widest">
            &copy; 2026 Texavor Labs. Optimized for Generative Search.
          </p>
        </div>
      </footer>
    </div>
  );
}
