"use client";

import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-white/10 rounded-full text-sm font-medium text-slate-600 dark:text-zinc-400 mb-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)] animate-fade-in font-inter hover:border-primary/20 transition-colors cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-primary fill-primary/20" />
          <span className="text-slate-500 dark:text-zinc-500">New</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700 mx-1" />
          <span className="text-foreground">Content Decay Engine is live</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-foreground font-poppins leading-[1.1] tracking-tight max-w-5xl mx-auto mb-6 animate-fade-slide-up">
          The Research-First CMS <br className="hidden md:block" />
          for the GEO Era.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed max-w-3xl mx-auto mb-10 animate-fade-slide-up [animation-delay:100ms]">
          Texavor is the complete platform for managing articles and{" "}
          <span className="text-foreground font-medium">
            Generative Engine Optimization (GEO)
          </span>
          . Monitor visibility, fix content decay, and rank in ChatGPT,
          Perplexity, and Claude.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-slide-up [animation-delay:200ms] mb-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-6 rounded-lg bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-foreground font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-foreground font-poppins text-base min-w-[160px]"
            aria-label="Start Free Trial"
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}`}
              target="_blank"
              data-umami-event="hero_start_trial_click"
            >
              Start Free
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white dark:text-black font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl font-poppins text-base min-w-[160px]"
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

        {/* Background Glows */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-40 left-[10%] w-[30rem] h-[30rem] bg-green-400/10 rounded-full blur-[100px] animate-blob" />
          <div className="absolute top-20 right-[10%] w-[35rem] h-[35rem] bg-emerald-400/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-[40%] left-[30%] w-[40rem] h-[40rem] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        </div>

        {/* Hero Visual */}
        <div className="relative w-full max-w-6xl mx-auto animate-fade-slide-up [animation-delay:300ms]">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-zinc-950">
            {/* Browser Header */}
            <div className="h-10 bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
              </div>
              <div className="ml-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 rounded-md px-3 py-0.5 text-[10px] text-gray-500 dark:text-zinc-400 font-medium font-inter flex items-center gap-1 min-w-[150px] justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                texavor.com
              </div>
            </div>

            {/* Screenshot */}
            <Image
              src="/screenshots/hero.webp"
              alt="Texavor Dashboard Interface"
              width={1400}
              height={900}
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
