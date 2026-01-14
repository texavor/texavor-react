"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-24 px-4 bg-white flex justify-center">
      <div className="w-full max-w-6xl relative overflow-hidden bg-primary rounded-[40px] px-6 py-20 text-center shadow-xl">
        {/* Background Texture/Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight tracking-tight">
            Ready to Supercharge <br />
            Your Team's Productivity?
          </h2>

          <p className="text-lg md:text-xl text-white/90 font-inter leading-relaxed">
            Start today and see how easy teamwork can be with Texavor.
            <br />
            <span className="font-bold text-white mt-2 block">
              Launch Offer: Get a 14-day free trial!
            </span>
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-xl font-bold shadow-lg transition-transform hover:scale-105"
          >
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
