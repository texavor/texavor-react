"use client";

import { HelpCircle, Plus, X } from "lucide-react";
import { faqData } from "@/lib/faq-data";
import Link from "next/link";

export default function FAQ() {
  const faqs = faqData;

  return (
    <section
      id="faq"
      className="w-full py-24 md:py-32 bg-muted/40 tx-dot-bg border-b border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Left-Aligned Section Header */}
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

        {/* Flat Accordion List */}
        <div className="w-full space-y-0 border-t border-border/60">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border-b border-border/60 transition-colors duration-300"
            >
              <summary className="flex items-center justify-between w-full py-6 md:py-8 text-left font-medium text-foreground hover:text-accent transition-colors font-poppins text-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="flex-1 pr-8 text-lg">{faq.question}</span>
                <div className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                  <Plus
                    className="w-6 h-6 text-muted-foreground group-open:text-accent transition-colors"
                    strokeWidth={2.5}
                  />
                </div>
              </summary>
              <div className="pb-8 text-muted-foreground font-inter text-base md:text-lg leading-relaxed max-w-3xl animate-in slide-in-from-top-2 fade-in duration-200">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Flat Contact Bar */}
        <div className="mt-16 bg-muted/30 rounded-xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="block font-bold text-foreground font-poppins text-lg mb-1">
              Still have questions?
            </span>
            <span className="text-muted-foreground font-inter text-sm">
              We are here to help you get the most out of Texavor.
            </span>
          </div>
          <Link
            href="mailto:hello@texavor.com"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-inter text-sm rounded-lg transition-colors inline-flex items-center justify-center whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
