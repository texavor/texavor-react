"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewHero() {
  return (
    <section className="w-full py-20 md:py-32 animate-fade-in relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-30 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary w-fit mx-auto lg:mx-0 animate-float">
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
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto min-h-[48px]"
              >
                <Link href="/blog/new">
                  Start Writing for Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl transition-all duration-300 w-full sm:w-auto min-h-[48px]"
              >
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>

            {/* Urgency and Guarantee Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center lg:justify-start mt-6 pt-6 border-t border-white/20 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 text-sm text-primary bg-primary/5 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-orange-700 bg-orange-50/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">Free premium features</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
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
                  className="w-5 h-5 text-primary"
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
              <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Mock Dashboard Interface */}
                <div className="w-full h-full relative">
                  {/* Header Bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-gray-200 flex items-center px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded"></div>
                      <span className="text-sm font-medium text-gray-900">Texavor Dashboard</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="absolute top-12 left-0 right-0 bottom-0 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                      {/* Left Panel - Editor */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-gray-900">AI Content Generator</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                          <div className="h-20 bg-primary/5 rounded border-2 border-dashed border-primary/20 flex items-center justify-center">
                            <span className="text-primary text-sm font-medium">AI Generated Content Here</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Panel - SEO Tools */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-gray-900">SEO Optimization</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Keyword Score</span>
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="w-12 h-full bg-primary rounded-full"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-primary/5 rounded">
                              <div className="text-lg font-bold text-primary">95</div>
                              <div className="text-xs text-gray-600">Readability</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="text-lg font-bold text-blue-600">8.2</div>
                              <div className="text-xs text-gray-600">SEO Score</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div
              className="absolute -top-4 -right-4 bg-white shadow-card rounded-xl p-4 hidden lg:block animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
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
