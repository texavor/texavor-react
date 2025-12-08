"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import NewsletterSignup from "@/components/landing/NewsletterSignup";

export default function NewFinalCTA() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-hero border border-white/20">
          <div className="text-center space-y-8">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full text-sm font-medium text-orange-200 w-fit mx-auto mb-4 animate-pulse">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Limited Time: Free Pro Trial for 14 Days
            </div>

            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white w-fit mx-auto">
              <Check className="w-4 h-4" />
              Join 10,000+ Content Creators
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight tracking-tight">
              🚀 Ready to Transform Your Content Creation?
            </h2>

            <p className="text-lg md:text-xl text-white/90 font-inter max-w-2xl mx-auto">
              Start writing better content 10x faster. Free Pro trial ends soon. No credit card required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
              >
                <Link href="/blog/new">
                  🚀 Claim Free Pro Trial (14 Days)
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-8 border-t border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 font-poppins">
                Subscribe for Updates
              </h3>
              <NewsletterSignup />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Free forever plan available
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
