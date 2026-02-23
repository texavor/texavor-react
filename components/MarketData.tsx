"use client";

import { ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MarketData() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Double rAF ensures the browser paints the 0% state first
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-muted/40 relative overflow-hidden border-b border-border"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              THE SHIFT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-[1.1] max-w-4xl">
            Search is shifting. Traditional SEO is no longer enough.
          </h2>
          <p className="text-xl font-inter text-muted-foreground max-w-2xl leading-relaxed">
            AI Answer Engines are taking over how people discover information.
            Brands that aren't optimizing for LLMs are already being left
            behind.
          </p>
        </div>

        {/* 3-Column Data Bento */}
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: AI Search Growth */}
          <div className="bg-card border border-border shadow-tx-sm rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-primary/50 group">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">
                  AI Search Growth
                </h3>
                <p className="text-sm font-inter text-muted-foreground">
                  Weekly Active Users, 2025
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ArrowUpRight className="text-accent w-5 h-5" strokeWidth={3} />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end min-h-[160px]">
              {/* Bar chart: bars use scaleY with origin-bottom for reliable animation */}
              <div
                className="flex items-end gap-2 w-full"
                style={{ height: "144px" }}
              >
                {/* 2022 */}
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                  <div
                    className="w-full bg-muted border border-border/50 rounded-t transition-transform duration-700 ease-out origin-bottom"
                    style={{
                      height: "26px",
                      transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    22
                  </span>
                </div>
                {/* 2023 */}
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                  <div
                    className="w-full bg-foreground/15 border border-border/50 rounded-t transition-transform duration-700 delay-150 ease-out origin-bottom"
                    style={{
                      height: "52px",
                      transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    23
                  </span>
                </div>
                {/* 2024 */}
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                  <div
                    className="w-full bg-foreground/35 border border-border/50 rounded-t transition-transform duration-700 delay-300 ease-out origin-bottom"
                    style={{
                      height: "84px",
                      transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    24
                  </span>
                </div>
                {/* 2025 */}
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                  <div
                    className="w-full bg-primary rounded-t transition-transform duration-700 delay-500 ease-out origin-bottom"
                    style={{
                      height: "116px",
                      transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    25
                  </span>
                </div>
                {/* 2026 — Prediction */}
                <div className="flex-1 flex flex-col items-center justify-end gap-1 h-full relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-bold font-inter text-accent uppercase tracking-wider whitespace-nowrap">
                    Proj.
                  </div>
                  <div
                    className="w-full bg-accent/20 border-2 border-dashed border-accent rounded-t transition-transform duration-700 delay-700 ease-out origin-bottom"
                    style={{
                      height: "140px",
                      transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                    }}
                  />
                  <span className="text-[10px] font-mono text-accent font-bold">
                    26
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/60">
              <p className="text-sm font-inter text-muted-foreground leading-relaxed mb-2">
                ChatGPT reached{" "}
                <strong className="text-foreground">
                  800M+ weekly active users
                </strong>{" "}
                in 2025. Gartner predicts traditional search volume will drop
                25% by 2026.
              </p>
              {/* <a
                href="https://backlinko.com/chatgpt-stats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-inter text-muted-foreground/60 hover:text-accent transition-colors underline underline-offset-2"
              >
                Source: Backlinko, 2025 · Gartner
              </a> */}
            </div>
          </div>

          {/* Card 2: Traditional CTR Drop */}
          <div className="bg-card border border-border shadow-tx-sm rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-primary/50 group">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">
                  Zero-Click Searches
                </h3>
                <p className="text-sm font-inter text-muted-foreground">
                  Google US, 2025
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <ArrowDownRight
                  className="text-destructive w-5 h-5"
                  strokeWidth={3}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center min-h-[160px] relative">
              <div className="text-center w-full">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-7xl font-poppins font-black text-foreground tracking-tighter">
                    58
                  </span>
                  <span className="text-3xl font-poppins font-bold text-destructive">
                    %
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-destructive rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "58%" : "0%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/60">
              <p className="text-sm font-inter text-muted-foreground leading-relaxed mb-2">
                <strong className="text-foreground">58.5%</strong> of US Google
                searches end without a click — rising to{" "}
                <strong className="text-foreground">83%</strong> when AI
                Overviews are shown.
              </p>
              {/* <a
                href="https://sparktoro.com/blog/2024-zero-click-search-study-58-5-of-google-searches-end-without-clicking-anywhere/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-inter text-muted-foreground/60 hover:text-accent transition-colors underline underline-offset-2"
              >
                Source: SparkToro × Datos, State of Search 2025
              </a> */}
            </div>
          </div>

          {/* Card 3: Brand Visibility Gap */}
          <div className="bg-card border border-border shadow-tx-sm rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-primary/50 group">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">
                  LLM Brand Visibility
                </h3>
                <p className="text-sm font-inter text-muted-foreground">
                  Top brands cited by AI
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Search className="text-accent w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center min-h-[160px]">
              {/* CSS Pie Chart alternative - Circular Progress */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 pointer-events-none">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    className="text-muted"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="var(--accent)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="351.86"
                    strokeDashoffset={
                      isVisible ? 351.86 - 351.86 * 0.08 : 351.86
                    }
                    className="transition-all duration-1500 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-poppins font-black text-foreground">
                    8<span className="text-xl text-muted-foreground">%</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/60">
              <p className="text-sm font-inter text-muted-foreground leading-relaxed mb-2">
                Only <strong className="text-foreground">8% of users</strong>{" "}
                click through to source websites when Google AI Overviews are
                shown on the results page.
              </p>
              {/* <a
                href="https://www.seerinteractive.com/insights/ai-visibility-research-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-inter text-muted-foreground/60 hover:text-accent transition-colors underline underline-offset-2"
              >
                Source: Seer Interactive, AI Visibility Report 2025
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
