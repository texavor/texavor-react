"use client";

import { motion } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Search,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BeforeAfterProof() {
  return (
    <section className="w-full py-24 bg-background tx-dot-bg relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 animate-fade-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-xs font-inter font-semibold uppercase tracking-widest text-muted-foreground">
              The Difference
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground leading-tight mb-6">
            Stop guessing. <br />
            Start getting cited.
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl">
            Traditional SEO tools track where you sit on a page. Texavor ensures
            your content actually has the entity depth and structure that AI
            engines trust.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-px md:bg-border border border-border overflow-hidden rounded-xl">
          {/* BEFORE: Traditional Strategy */}
          <div className="bg-background p-8 md:p-12 flex flex-col h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-md bg-muted text-muted-foreground">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-inter font-semibold text-sm text-foreground">
                Traditional Content Strategy
              </span>
            </div>

            <div className="space-y-12 flex-grow">
              {/* Simulated "Generic Tool" Screenshot */}
              <div className="w-full relative rounded-xl overflow-hidden border border-border bg-card opacity-60">
                <div className="h-6 bg-muted border-b border-border flex items-center px-2">
                  <div className="text-[9px] font-inter text-muted-foreground uppercase tracking-widest">
                    Rank Tracker V1
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Fake keyword rows */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0"
                    >
                      <div className="w-1/2 h-2.5 bg-muted rounded" />
                      <div className="w-8 h-4 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-data rounded flex items-center justify-center">
                        #{i}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 border-t border-border pt-8">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-inter text-muted-foreground">
                    Citation Readiness
                  </span>
                  <div className="flex items-center gap-1.5 text-destructive font-inter font-medium text-sm">
                    <X className="w-4 h-4" />
                    <span>0% (Ignored)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-inter text-muted-foreground">
                    Google Rank
                  </span>
                  <span className="text-sm font-mono tabular-nums tracking-tight font-medium text-foreground">
                    #1
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-12 text-sm font-inter text-muted-foreground italic">
              "We're ranking #1 on Google, but Perplexity doesn't even know we
              exist."
            </p>
          </div>

          {/* AFTER: Texavor Strategy */}
          <div className="bg-muted/30 p-8 md:p-12 flex flex-col h-full border-t md:border-t-0 border-border">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-inter font-semibold text-sm text-foreground">
                Texavor GEO Strategy
              </span>
            </div>

            <div className="space-y-12 flex-grow">
              {/* Actual Product Screenshot Area */}
              <div className="w-full relative rounded-xl overflow-hidden border border-border bg-card group">
                {/* Fake Chrome Bar */}
                <div className="h-8 bg-muted border-b border-border flex items-center px-3 gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
                {/* Dashboard wireframe/screenshot container */}
                <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-4 flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="text-[10px] text-muted-foreground font-inter uppercase tracking-widest">
                          Visibility Score
                        </div>
                        <div className="text-4xl font-mono tabular-nums tracking-tight font-bold text-foreground">
                          91
                          <span className="text-xl text-muted-foreground">
                            /100
                          </span>
                        </div>
                      </div>
                      <div className="h-10 w-24 bg-primary/20 rounded-t border-t border-x border-primary/30 relative overflow-hidden">
                        <motion.div
                          className="absolute bottom-0 left-0 w-full bg-primary"
                          initial={{ height: 0 }}
                          whileInView={{ height: "91%" }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <div className="h-14 bg-card border border-border rounded flex flex-col justify-center px-3">
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Entities
                        </span>
                        <span className="text-sm font-mono tabular-nums tracking-tight font-bold">
                          42 Found
                        </span>
                      </div>
                      <div className="h-14 bg-card border border-border rounded flex flex-col justify-center px-3">
                        <span className="text-[10px] text-muted-foreground uppercase">
                          Schema
                        </span>
                        <span className="text-sm font-mono tabular-nums tracking-tight font-bold text-primary">
                          Valid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 border-t border-border pt-8">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-inter text-muted-foreground">
                    Citation Readiness
                  </span>
                  <div className="flex items-center gap-1.5 text-primary font-inter font-medium text-sm">
                    <Check className="w-4 h-4" />
                    <span>94% (Optimized)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-inter text-muted-foreground">
                    Topical Authority
                  </span>
                  <span className="text-sm font-data font-medium text-foreground">
                    Extreme (Top 1%)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 rounded-lg bg-background border border-border">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-inter text-muted-foreground leading-none">
                    ChatGPT Response Snippet
                  </p>
                  <p className="text-xs font-inter text-foreground leading-snug">
                    "According to{" "}
                    <span className="font-semibold text-primary underline decoration-primary/30 underline-offset-2">
                      Texavor's research data
                    </span>
                    , the shift to GEO requires..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA shim */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-4 bg-muted/50 border border-border rounded-full px-5 py-2">
            <span className="text-sm font-inter text-muted-foreground">
              Ready to see your current score?
            </span>
            <button className="flex items-center gap-1 text-sm font-inter font-bold text-foreground group">
              Run free AI audit{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
