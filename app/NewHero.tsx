"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewHero() {
  return (
    <section className="w-full py-20 md:py-32 animate-fade-in relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--green-light)] rounded-full blur-[120px] opacity-30 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--green-light)] rounded-full text-sm font-medium text-[var(--green-primary)] w-fit mx-auto lg:mx-0 animate-float">
              <Sparkles className="w-4 h-4" />
              AI-Powered Content Creation
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground font-poppins leading-tight tracking-tight">
              Write Better Content{" "}
              <span className="text-gradient">10x Faster</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your content creation with AI-powered tools. Generate
              SEO-optimized articles, research keywords, and publish directly to
              your blog—all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/blog/new">
                  Start Writing for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[var(--green-primary)] text-[var(--green-primary)] hover:bg-[var(--green-light)] px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Free forever plan
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:order-last">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-hero bg-white p-4 border border-white/50 backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-[var(--green-light)] to-white rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                <div className="text-center p-8 relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <div className="w-24 h-24 mx-auto mb-4 bg-[var(--green-primary)] rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-foreground font-poppins">
                    Your Product Screenshot
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Replace with actual dashboard preview
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div
              className="absolute -top-4 -right-4 bg-white shadow-card rounded-xl p-4 hidden lg:block animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI Writing Active</span>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-white shadow-card rounded-xl p-4 hidden lg:block animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-sm">
                <p className="font-bold text-foreground">2,500+ Articles</p>
                <p className="text-muted-foreground">Generated this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
