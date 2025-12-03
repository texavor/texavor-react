"use client";

import StepCard from "@/components/landing/StepCard";
import { FileText, Sparkles, Rocket } from "lucide-react";

export default function NewHowItWorks() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Choose Your Topic",
      description:
        "Select from templates or enter your own topic. Our AI will help you brainstorm ideas and structure your content.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Generates Content",
      description:
        "Watch as our advanced AI creates high-quality, SEO-optimized content in seconds. Edit and refine as needed.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Publish & Grow",
      description:
        "Publish directly to your blog or export to your favorite platform. Track performance and optimize for better results.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Start Creating in{" "}
            <span className="text-[var(--green-primary)]">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            From idea to published content in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--green-primary)]/30 to-transparent -translate-y-1/2 -z-10" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <StepCard
                stepNumber={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
