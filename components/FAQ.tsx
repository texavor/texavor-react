"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Plus, X } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Can I try Texavor before paying?",
      answer:
        "Yes! We offer a free trial that lets you experience the platform.",
    },
    {
      question: "Is my team's data secure?",
      answer:
        "Security is our top priority. We use industry-standard encryption to protect your data, and we never share your content with third parties. Your content belongs to you, always.",
    },
    {
      question: "Do you offer solutions for large organizations?",
      answer:
        "Absolutely. Our Enterprise plan includes SSO, dedicated support, custom integrations, and unlimited workspaces. Contact sales for a demo.",
    },
    {
      question: "Is there a limit to how many members I can invite?",
      answer:
        "Our Starter plan supports up to 5 members, while Pro supports up to 20. The Business and Enterprise plans offer unlimited team seats.",
    },
    {
      question: "Can I migrate data from another tool into Texavor?",
      answer:
        "Yes, we offer one-click imports from Notion, WordPress, and CSV files. Our support team can also assist with custom migrations.",
    },
    {
      question: "Can I customize Texavor with my own branding?",
      answer:
        "Yes, Pro and Enterprise plans allow you to add your company logo, custom domain, and brand colors to your public pages and reports.",
    },
    {
      question: "Do all members need to pay?",
      answer:
        "No, billing is per workspace. You pay for the plan, and it covers all the members you invite up to the plan's limit.",
    },
    {
      question: "Does Texavor work offline?",
      answer:
        "Currently, Texavor requires an internet connection to sync your data and generate AI content. We are exploring offline capabilities for the future.",
    },
  ];

  return (
    <section id="faq" className="w-full py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
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
            <Accordion
              key={index}
              type="single"
              collapsible
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary transition-colors font-poppins py-5 text-sm hover:no-underline [&>svg]:hidden group">
                  <span className="flex-1">{faq.question}</span>
                  {/* Custom Toggle Icon */}
                  <div className="flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-data-[state=open]:bg-primary/20">
                    <Plus
                      className="w-3.5 h-3.5 text-primary group-data-[state=open]:hidden"
                      strokeWidth={3}
                    />
                    <X
                      className="w-3.5 h-3.5 text-primary hidden group-data-[state=open]:block"
                      strokeWidth={3}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-inter pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          {/* Contact Us Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
            <span className="font-semibold text-gray-900 font-poppins text-sm">
              Can't find what you're looking for?
            </span>
            <a
              href="mailto:hello@texavor.com"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
