import React from "react";
import { X, Check } from "lucide-react";

export function ComparisonTable() {
  const features = [
    {
      category: "Primary Goal",
      rankpill: "Automated SEO Content",
      jasper: "Content Generation",
      texavor: "Lifecycle Management",
    },
    {
      category: "Target Audience",
      rankpill: "Beginners, Small Biz",
      jasper: "General Marketers",
      texavor: "Devs, Tech Companies, Saas",
    },
    {
      category: "Publishing",
      rankpill: "CMS Only",
      jasper: "Manual Copy-Paste",
      texavor: "Multi-Platform Sync",
      texavorSub: "Dev.to, Medium, Shopify...",
    },
    {
      category: "Maintenance",
      rankpill: false,
      jasper: false,
      texavor: "Freshness Score (Decay tracking)",
    },
    {
      category: "Research",
      rankpill: "Basic Keywords",
      jasper: "Outdated Training Data",
      texavor: "Live Web & Semantic Agent",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-tx-sm">
      <table className="w-full min-w-[900px] text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            {/* 1. Category */}
            <th className="p-6 md:px-8 md:py-8 text-sm font-semibold font-inter text-muted-foreground w-1/4 align-bottom">
              Feature Category
            </th>
            {/* 2. Mass SEO */}
            <th className="p-6 md:px-8 md:py-8 border-x border-border w-1/4 align-bottom">
              <span className="block text-[11px] font-bold font-inter uppercase tracking-widest text-muted-foreground mb-1.5">
                Legacy Tools
              </span>
              <span className="text-xl font-bold font-poppins text-foreground opacity-80">
                Mass SEO Automation
              </span>
            </th>
            {/* 3. AI Writers */}
            <th className="p-6 md:px-8 md:py-8 w-1/4 align-bottom">
              <span className="block text-[11px] font-bold font-inter uppercase tracking-widest text-muted-foreground mb-1.5">
                Writing Assistants
              </span>
              <span className="text-xl font-bold font-poppins text-foreground opacity-80">
                Generic AI Chatbots
              </span>
            </th>
            {/* 4. Texavor */}
            <th className="p-6 md:px-8 md:py-8 border-l border-border w-1/4 relative align-bottom bg-primary/[0.04]">
              {/* Thick Yellow Accent Border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
              <span className="block text-[11px] font-bold font-inter uppercase tracking-widest text-accent mb-1.5">
                The Content OS
              </span>
              <span className="text-2xl font-bold font-poppins text-primary block">
                Texavor
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {features.map((feature, idx) => (
            <tr
              key={idx}
              className="hover:bg-muted/30 transition-colors duration-200"
            >
              {/* Category */}
              <td className="p-6 md:px-8 md:py-6 font-semibold font-inter text-foreground border-r border-border/50">
                {feature.category}
              </td>

              {/* RankPill */}
              <td className="p-6 md:px-8 md:py-6 font-inter text-muted-foreground text-sm border-r border-border/50 bg-background/50">
                {typeof feature.rankpill === "string" ? (
                  feature.rankpill
                ) : (
                  <X className="w-5 h-5 text-muted-foreground/40" />
                )}
              </td>

              {/* Jasper */}
              <td className="p-6 md:px-8 md:py-6 font-inter text-muted-foreground text-sm bg-background/50">
                {typeof feature.jasper === "string" ? (
                  feature.jasper
                ) : (
                  <X className="w-5 h-5 text-muted-foreground/40" />
                )}
              </td>

              {/* Texavor */}
              <td className="p-6 md:px-8 md:py-6 font-bold font-inter text-primary bg-primary/[0.04] border-l border-border border-b-border relative">
                {typeof feature.texavor === "string" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                      {feature.texavor}
                    </div>
                    {feature.texavorSub && (
                      <span className="block text-[11px] font-semibold text-primary/70 mt-1 pl-6">
                        {feature.texavorSub}
                      </span>
                    )}
                  </>
                ) : (
                  <Check className="w-6 h-6 text-accent" strokeWidth={3} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
