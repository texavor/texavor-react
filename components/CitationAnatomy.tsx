"use client";

import { motion } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  Database,
  Layout,
  Search,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "./ui/section-wrapper";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";

export function CitationAnatomy() {
  return (
    <SectionWrapper
      id="anatomy"
      background="default"
      withGrid={false}
      className="tx-dot-bg"
    >
      <div className="tx-container">
        <SectionHeading
          eyebrow="Case Study"
          accentEyebrow
          heading="The Anatomy of Authority"
          description="See why AI engines cite Texavor-optimized content while generic copy-pasted text gets ignored."
          align="left"
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          {/* --- LEFT: Generic AI Content --- */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                <X className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-foreground/70">
                Basic Copy-Pasting (Ignored by AI)
              </h3>
            </div>

            <div className="flex-1 rounded-xl border border-destructive/20 dark:border-destructive/40 bg-destructive/[0.01] dark:bg-destructive/[0.05] p-6 md:p-8 opacity-60 dark:opacity-80 hover:border-destructive/40 transition-all duration-300">
              <div className="space-y-6">
                {/* Buried Answer */}
                <div className="p-4 rounded border border-destructive/10 dark:border-destructive/20 bg-destructive/[0.02] dark:bg-destructive/10">
                  <p className="text-xs font-mono text-destructive dark:text-destructive/90 mb-2 uppercase tracking-tight font-bold">
                    Incomplete Distribution Structure
                  </p>
                  <div className="space-y-2 opacity-30 dark:opacity-50">
                    <div className="h-2 w-full bg-destructive/20 dark:bg-destructive/40 rounded-full" />
                    <div className="h-2 w-3/4 bg-destructive/20 dark:bg-destructive/40 rounded-full" />
                  </div>
                </div>

                {/* Vague Entities */}
                <div className="space-y-3">
                  <p className="text-sm font-inter text-muted-foreground leading-relaxed">
                    The{" "}
                    <span className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive/90 line-through decoration-destructive/50">
                      software solution
                    </span>{" "}
                    helps companies scale their{" "}
                    <span className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive/90 line-through decoration-destructive/50">
                      marketing efforts
                    </span>{" "}
                    by providing automated tools for{" "}
                    <span className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive/90 line-through decoration-destructive/50">
                      online search
                    </span>
                    ...
                  </p>
                  <p className="text-[10px] font-mono text-destructive dark:text-destructive/90 uppercase font-bold">
                    Error: Vague entities. LLMs cannot verify authority.
                  </p>
                </div>

                {/* Flat Structure */}
                <div className="mt-8 pt-6 border-t border-destructive/10 dark:border-destructive/20 space-y-3">
                  <div className="flex items-center gap-2 text-destructive/50 dark:text-destructive/70">
                    <Layout className="w-4 h-4" />
                    <span className="text-xs font-inter uppercase tracking-wide font-bold">
                      Flat semantic hierarchy
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive/50 dark:text-destructive/70">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-inter uppercase tracking-wide font-bold">
                      Missing JSON-LD Schema
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Texavor Optimized --- */}
          <div className="flex flex-col space-y-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-foreground">
                Data-Backed Authority
              </h3>
            </div>

            <div className="flex-1 rounded-xl border border-primary/20 bg-primary/[0.01] p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              {/* Highlight Overlay */}
              <div className="absolute top-0 right-0 p-3">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                  Citation-Ready
                </span>
              </div>

              <div className="space-y-8">
                {/* Answer Capsule */}
                <div className="p-5 rounded-lg border border-primary/20 bg-primary/[0.02] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                  <p className="text-xs font-mono text-primary mb-3 uppercase tracking-widest font-bold flex items-center gap-2">
                    <MessageSquareIcon className="w-3 h-3" />
                    Answer Capsule (Direct Hit)
                  </p>
                  <p className="text-base font-inter text-foreground font-medium leading-relaxed">
                    "Texavor streamlines your{" "}
                    <span className="text-primary font-bold">
                      Content Workflow
                    </span>{" "}
                    by discovering topical gaps and verifying fact integrity
                    through custom JSON-LD schema, resulting in comprehensive,
                    highly-structured articles."
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-primary/60 font-mono font-bold uppercase tracking-tighter">
                    <Check className="w-3 h-3 text-accent" /> 48 words . High
                    Extraction Probability
                  </div>
                </div>

                {/* Explicit Entities */}
                <div className="space-y-4">
                  <div className="text-sm font-inter text-foreground leading-relaxed">
                    The{" "}
                    <span className="bg-muted px-1.5 py-0.5 rounded font-bold border border-border">
                      Texavor Engine
                    </span>{" "}
                    bridges the trust gap between{" "}
                    <span className="bg-muted px-1.5 py-0.5 rounded font-bold border border-border">
                      Google SGE
                    </span>{" "}
                    and{" "}
                    <span className="bg-muted px-1.5 py-0.5 rounded font-bold border border-border">
                      Claude AI
                    </span>{" "}
                    by prioritizing{" "}
                    <span className="bg-muted px-1.5 py-0.5 rounded font-bold border border-border">
                      Semantic Authority Maps
                    </span>
                    ...
                  </div>

                  {/* Entity Relationship Map */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-background border border-border px-2 py-1 rounded flex items-center gap-1 text-muted-foreground">
                      <Database className="w-3 h-3" /> Entity Mapping: Active
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-background border border-border px-2 py-1 rounded flex items-center gap-1 text-muted-foreground">
                      <ShieldCheck className="w-3 h-3 text-accent" />{" "}
                      Fact-Check: Verified
                    </span>
                  </div>
                </div>

                {/* Schema & Structure */}
                <div className="pt-6 border-t border-border flex items-center justify-between text-[11px] font-mono">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-tight">
                      <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                      FAQ Schema Injected
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-tight">
                      <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                      Machine-Readable Summmary
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="px-2 py-1 rounded bg-muted border border-border text-foreground font-bold font-mono">
                      RANK: 94%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-muted/20 border border-border rounded-2xl p-6 sm:p-2 sm:pr-6 max-w-2xl w-full">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary flex-shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div className="flex-grow text-center sm:text-left space-y-0.5">
              <p className="text-sm font-inter text-foreground font-bold">
                Ready to stop guessing?
              </p>
              <p className="text-xs font-inter text-muted-foreground font-medium">
                Find the exact topics your competitors are missing today.
              </p>
            </div>
            <button
              className="flex items-center gap-2 text-sm font-inter font-bold text-primary hover:text-primary/80 transition-colors group whitespace-nowrap cursor-pointer"
              onClick={() => (window.location.href = "/tools/content-audit")}
            >
              Scan Your Site
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function MessageSquareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
