"use client";

import { HelpCircle, Plus, X } from "lucide-react";

import { faqData } from "@/lib/faq-data";

export default function FAQ() {
  const faqs = faqData;

  return (
    <section
      id="faq"
      className="w-full py-24 md:py-32 bg-gray-50 dark:bg-zinc-950"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-full text-xs font-medium text-primary dark:text-emerald-400 mb-6 shadow-xs">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Answers to common questions before you get started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs hover:shadow-sm transition-all duration-300 open:ring-1 open:ring-primary/5 dark:open:ring-emerald-400/10"
            >
              <summary className="flex items-center justify-between w-full px-6 py-5 text-left font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-emerald-400 transition-colors font-poppins text-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{faq.question}</span>
                {/* Custom Toggle Icon */}
                <div className="flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-primary/10 dark:bg-emerald-400/10 flex items-center justify-center transition-all duration-300 group-open:bg-primary/20 dark:group-open:bg-emerald-400/20">
                  <Plus
                    className="w-3.5 h-3.5 text-primary dark:text-emerald-400 group-open:hidden"
                    strokeWidth={3}
                  />
                  <X
                    className="w-3.5 h-3.5 text-primary dark:text-emerald-400 hidden group-open:block"
                    strokeWidth={3}
                  />
                </div>
              </summary>
              <div className="px-6 pb-5 text-gray-600 dark:text-zinc-400 font-inter text-sm leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                {faq.answer}
              </div>
            </details>
          ))}

          {/* Contact Us Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs p-6 flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-white font-poppins text-sm">
              Can't find what you're looking for?
            </span>
            <a
              href="mailto:hello@texavor.com"
              className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
