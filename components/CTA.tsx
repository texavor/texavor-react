"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full py-24 md:py-32 bg-muted/40 tx-dot-bg flex justify-center px-6 border-t border-border">
      <div className="w-full max-w-5xl bg-muted/30 border border-border shadow-tx-sm rounded-2xl px-6 py-20 md:py-24 text-center flex flex-col items-center relative overflow-hidden">
        {/* Subtle decorative dot pattern purely inside the box */}
        <div className="absolute inset-0 tx-dot-bg opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              GET STARTED
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-poppins leading-[1.1] tracking-tight mb-6">
            Claim your Share of Voice.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto mb-10">
            Stop guessing what AI engines want. Dominate Perplexity, ChatGPT,
            and Google with data-driven Semantic SEO.
          </p>

          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg h-14 px-8 rounded font-bold font-inter transition-colors inline-flex items-center gap-2 group shadow-tx-sm"
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
              data-umami-event="bottom_cta_get_started_click"
            >
              Start free today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
