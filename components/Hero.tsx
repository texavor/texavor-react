"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   TODO [PRODUCTION]: Replace team count & article count with
   real numbers from your analytics / database
   ─────────────────────────────────────────────────────────────*/
const TRUST_STATS = {
  teams: 127,
  articles: "14,300+",
};

/* AI engines for step ticker */
const AI_ENGINES = [
  { name: "ChatGPT", src: "/ai/chatgpt.png" },
  { name: "Perplexity", src: "/ai/perplexity.png" },
  { name: "Claude", src: "/ai/claude.jpg" },
  { name: "Gemini", src: "/ai/gemini.jpg" },
  { name: "Grok", src: "/ai/grok.jpg" },
];

export default function Hero() {
  const [engineIndex, setEngineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEngineIndex((prev) => (prev + 1) % AI_ENGINES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const current = AI_ENGINES[engineIndex];
  return (
    <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-background tx-dot-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* ── Split Layout: Left text / Right product ── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-start text-left animate-fade-slide-up">
            {/* Badge — conversational, no jargon */}
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1 h-5 rounded-full bg-accent inline-block flex-shrink-0" />
              <span className="text-xs font-semibold font-inter text-foreground/70 uppercase tracking-widest">
                People are asking AI, not Google
              </span>
            </div>

            {/* H1 — human, creates a felt need */}
            <h1 className="font-poppins font-bold text-foreground leading-[1.05] tracking-tight mb-5 text-4xl sm:text-5xl lg:text-[56px]">
              Your next customer <br className="hidden sm:block" />
              is asking AI.
            </h1>

            {/* Sub-headline — humanized, no jargon, no 'GEO' */}
            <p className="text-base md:text-lg text-muted-foreground font-inter leading-relaxed mb-4 max-w-md">
              Millions of people now skip Google and ask ChatGPT, Perplexity, or
              Claude directly. Texavor helps your content show up in those
              answers — and alerts you when it stops.
            </p>

            {/* AI ticker — shows which engines Texavor tracks */}
            <div className="flex items-center gap-1.5 mb-10 flex-wrap">
              <span className="text-xs font-inter text-muted-foreground">
                Tracks your visibility in
              </span>

              {/* Height-clipped ticker — no fixed width, no absolute positioning */}
              <div className="relative h-6 overflow-hidden flex-shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={engineIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-border bg-card flex-shrink-0">
                      <Image
                        src={current.src}
                        alt={current.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold font-inter text-foreground whitespace-nowrap">
                      {current.name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <span className="text-xs font-inter text-muted-foreground">
                & more
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-8 animate-fade-slide-up [animation-delay:150ms]">
              <Button
                asChild
                variant="brand"
                size="lg"
                className="rounded-md h-11 px-6"
                aria-label="Start Free Trial"
              >
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                  target="_blank"
                  data-umami-event="hero_start_trial_click"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-md h-11 px-6 border-border text-foreground font-medium"
                aria-label="Test Your Website"
              >
                <Link
                  href="/tools/website-auditor"
                  data-umami-event="hero_website_audit_click"
                >
                  Test Your Website (Free)
                </Link>
              </Button>
            </div>

            {/* Trust signal — no avatars */}
            {/* TODO [PRODUCTION]: Verify these numbers before going live */}
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-inter animate-fade-slide-up [animation-delay:250ms]">
              <span className="text-amber-400 text-base tracking-tight">
                ★★★★★
              </span>
              <span>
                Trusted by{" "}
                <strong className="text-foreground font-semibold">
                  {TRUST_STATS.teams} teams
                </strong>
              </span>
              <span className="w-1 h-1 rounded-full bg-border inline-block" />
              <span>
                <strong className="text-foreground font-semibold">
                  {TRUST_STATS.articles}
                </strong>{" "}
                articles optimized
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Product Screenshot ── */}
          <div className="relative animate-fade-slide-up [animation-delay:200ms]">
            {/* Ambient glow */}
            <div className="absolute inset-4 -z-10 bg-primary/10 dark:bg-primary/15 blur-3xl rounded-full" />

            {/* macOS window frame */}
            <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-tx-lg">
              {/* Chrome header */}
              <div className="h-9 bg-muted border-b border-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="ml-3 bg-background border border-border rounded px-3 py-0.5 text-[10px] text-muted-foreground font-medium font-inter flex items-center gap-1.5 min-w-[160px] justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  app.texavor.com
                </div>
              </div>

              {/* Product screenshot */}
              <Image
                src="/screenshots/hero.webp"
                alt="Texavor GEO Dashboard — AI Visibility Score and Content Decay tracking"
                width={1400}
                height={900}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                className="w-full h-auto block"
              />
            </div>

            {/* Floating stat badge */}
            {/* TODO [PRODUCTION]: Replace 87 with real average score */}
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg px-4 py-2.5 shadow-tx-md hidden md:flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-muted-foreground text-xs font-inter">
                AI Visibility Score
              </span>
              <span className="font-bold font-poppins text-primary text-base">
                87
                <span className="text-xs font-normal text-muted-foreground">
                  /100
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
