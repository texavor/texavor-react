"use client";

import React from "react";
import PageTransition from "@/components/PageTransition";
import { cn } from "@/lib/utils";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalLayout({
  title,
  lastUpdated,
  children,
  className,
}: LegalLayoutProps) {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Header Section — left-aligned editorial like tools page */}
        <section className="w-full pt-20 pb-16 md:pt-28 md:pb-24 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
          <div className="container px-6 mx-auto max-w-7xl">
            <div className="max-w-3xl animate-fade-slide-up">
              <p className="tx-eyebrow mb-5 uppercase tracking-widest text-primary/80 font-bold text-[11px]">
                TEXAVOR POLICIES
              </p>
              <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
                {title}
              </h1>
              {lastUpdated && (
                <p className="font-inter text-sm text-muted-foreground">
                  Last Updated:{" "}
                  <span className="font-semibold text-foreground">
                    {lastUpdated}
                  </span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Content Area — No card wrapper, centered max-w-3xl like blog articles */}
        <div className="container mx-auto px-6 pt-6 pb-16 md:pt-10 md:pb-24 max-w-7xl">
          <div className={cn("max-w-3xl mx-auto", className)}>
            <div
              className="prose prose-zinc dark:prose-invert max-w-none 
              prose-headings:font-poppins prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:first:mt-0 prose-h2:mb-6 prose-h2:text-foreground
              prose-p:font-inter prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
              prose-p:first:mt-0
              prose-li:font-inter prose-li:text-muted-foreground prose-li:text-base
              prose-strong:text-foreground prose-strong:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2
            "
            >
              {children}
            </div>

            {/* Contact Footer */}
            <div className="mt-20 pt-10 border-t border-border/50 text-muted-foreground font-inter text-sm">
              Questions? Contact us at{" "}
              <a
                href="mailto:hello@texavor.com"
                className="text-primary font-bold hover:underline"
              >
                hello@texavor.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
