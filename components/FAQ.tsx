"use client";

import { HelpCircle, Plus, X } from "lucide-react";
import { faqData } from "@/lib/faq-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FAQProps {
  fullPage?: boolean;
}

export default function FAQ({ fullPage = false }: FAQProps) {
  const faqs = faqData;

  return (
    <section
      id="faq"
      className={cn(
        "w-full bg-background relative overflow-hidden",
        !fullPage && "py-24 md:py-32 tx-dot-bg border-b border-border",
      )}
    >
      {/* Editorial Header — only shows on dedicated page */}
      {fullPage && (
        <section className="w-full pt-20 pb-12 md:pt-28 md:pb-20 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
          <div className="container px-6 mx-auto max-w-7xl">
            <div className="max-w-3xl animate-fade-slide-up">
              <p className="tx-eyebrow mb-5 uppercase tracking-widest text-primary/80 font-bold text-[11px]">
                SUPPORT & GUIDE
              </p>
              <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
                Frequently Asked{" "}
                <span className="text-primary">Questions.</span>
              </h1>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                Everything you need to know about Texavor, billing, and our
                content workflow engine.
              </p>
            </div>
          </div>
        </section>
      )}

      <div
        className={cn(
          "container mx-auto px-6 max-w-7xl relative z-10",
          fullPage ? "py-16 md:py-24" : "",
        )}
      >
        {/* Left-Aligned Section Header (for inline mode/homepage) */}
        {!fullPage && (
          <div className="flex flex-col items-start text-left mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-accent" />
              <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight">
              Frequently asked questions.
            </h2>
            <p className="text-lg font-inter text-muted-foreground leading-relaxed max-w-2xl">
              Everything you need to know about the product and billing.
            </p>
          </div>
        )}

        {/* Flat Accordion List */}
        <div
          className={cn(
            "w-full space-y-0",
            !fullPage && "border-t border-border/60",
          )}
        >
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border-b border-border/60 transition-colors duration-300 hover:border-primary/20"
            >
              <summary className="flex items-center justify-between w-full py-6 md:py-8 text-left font-medium text-foreground hover:text-primary transition-colors font-poppins text-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="flex-1 pr-8 text-lg font-bold tracking-tight">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 transition-all duration-300 group-open:rotate-45 group-hover:scale-110">
                  <Plus
                    className="w-5 h-5 text-muted-foreground group-open:text-primary group-hover:text-primary transition-colors"
                    strokeWidth={3}
                  />
                </div>
              </summary>
              <div className="pb-8 text-muted-foreground font-inter text-base md:text-lg leading-relaxed max-w-4xl animate-in slide-in-from-top-2 fade-in duration-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Flat Contact Bar */}
        <div className="mt-20 bg-primary/5 rounded-2xl border border-primary/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1">
            <span className="block font-bold text-foreground font-poppins text-2xl mb-2">
              Still have questions?
            </span>
            <span className="text-muted-foreground font-inter text-base">
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </span>
          </div>
          <Link
            href="mailto:hello@texavor.com"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-inter text-sm rounded-xl transition-all hover:scale-105 active:scale-95 shadow-tx-lg inline-flex items-center justify-center whitespace-nowrap"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
