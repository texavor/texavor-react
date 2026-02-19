"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-24 px-4 bg-white dark:bg-zinc-950 flex justify-center">
      <div className="w-full max-w-6xl relative overflow-hidden bg-primary dark:bg-zinc-900 rounded-[40px] px-6 py-20 text-center shadow-xl border border-white/5">
        {/* Background Texture/Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 dark:from-emerald-400/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-emerald-400 font-poppins leading-tight tracking-tight">
            Ready to Supercharge <br />
            Your Team's Productivity?
          </h2>

          <p className="text-lg md:text-xl text-white/90 dark:text-zinc-300 font-inter leading-relaxed">
            Start today and see how easy teamwork can be with Texavor.
            <br />
            <span className="font-bold text-white dark:text-white mt-2 block">
              Launch Offer: Get a 14-day free trial!
            </span>
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white dark:bg-emerald-400 text-primary dark:text-zinc-950 hover:bg-gray-100 dark:hover:bg-emerald-300 text-lg px-8 py-6 rounded-xl font-bold shadow-lg transition-transform hover:scale-105"
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
              data-umami-event="bottom_cta_get_started_click"
            >
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
