"use client";

import React from "react";
import { TrendingDown, MousePointer2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const PITFALLS = [
  {
    title: "The 'Zombie' Traffic Trap",
    subtitle: "High Impressions, Zero Clicks",
    description:
      "Mass AI content is easily synthesized into technical 'AI Overviews' (SGE). You provide the training data, but Google keeps the traffic. CTR for informational queries has dropped by up to 34% in 2024.",
    icon: MousePointer2,
    stat: "-34.5%",
    statLabel: "Avg. CTR Drop",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    title: "The Ranking Plateau",
    subtitle: "Volume ≠ Visibility",
    description:
      "Churning out 1,000 low-effort pages triggers Google's 'SpamBrain.' In the 2025 Quality Rater Guidelines, content lacking original insight receives the 'Lowest' ranking signal, regardless of keyword usage.",
    icon: TrendingDown,
    stat: "92%",
    statLabel: "AI Spam Failure Rate",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    title: "Algorithm Decay",
    subtitle: "The Future-Proofing Gap",
    description:
      "Google's 2025 Core Updates focus on 'Effort' and 'Personal Experience.' Mass-generated content lacks the unique E-E-A-T markers required to survive the next shift in search logic.",
    icon: ShieldAlert,
    stat: "High",
    statLabel: "Penalty Risk Level",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
];

export default function AIPitfalls() {
  return (
    <section
      id="ai-pitfalls"
      className="w-full py-24 md:py-32 bg-background tx-dot-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header - Matched to Testimonials.tsx */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              RISK ANALYSIS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight max-w-2xl">
            The Toxicity of Mass Generation
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
            In the generative era, volume is a liability. Precision is the only
            surviving strategy.
          </p>
        </div>

        {/* Pitfalls Grid - Matched to MarketData.tsx card style with border-only hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PITFALLS.map((pitfall, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 border border-border shadow-tx-sm transition-all duration-300 hover:border-primary/50 flex flex-col justify-between"
            >
              <div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-8",
                    pitfall.bg,
                    pitfall.color,
                  )}
                >
                  <pitfall.icon className="w-6 h-6" />
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-xl font-bold font-poppins text-foreground tracking-tight">
                    {pitfall.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[10px] font-poppins font-bold uppercase tracking-[0.2em]",
                      pitfall.color,
                    )}
                  >
                    {pitfall.subtitle}
                  </p>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed font-inter mb-8">
                  {pitfall.description}
                </p>
              </div>

              {/* Stats Block */}
              <div className="pt-6 border-t border-border/50 flex items-end gap-3 mt-auto">
                <div
                  className={cn(
                    "text-4xl font-bold font-poppins tracking-tighter",
                    pitfall.color,
                  )}
                >
                  {pitfall.stat}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 whitespace-nowrap">
                  {pitfall.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
