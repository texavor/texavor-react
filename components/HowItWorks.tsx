"use client";

import Image from "next/image";
import { Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "Step 1",
      title: "Analyze AEO Intent & Competitor Gaps",
      description:
        "Understand exactly what questions your audience is asking AI. Research competitor visibility in Perplexity and Google SGE.",
      image: "/screenshots/step1.png", // You'll add this image
    },
    {
      number: "Step 2",
      title: "Generate Data-Backed Content",
      description:
        "Create E-E-A-T optimized briefs and articles that answer user queries directly and authoritatively.",
      image: "/screenshots/step2.png", // You'll add this image
    },
    {
      number: "Step 3",
      title: "Track & Fix AI Visibility",
      description:
        "Monitor your 'Share of Voice' in LLMs. Get alerts when your content decays or competitors outrank you.",
      image: "/screenshots/step3.png", // You'll add this image
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
            <Zap className="w-3 h-3 fill-primary" />
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Three steps to set up Texavor and get your content workflow moving.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#f9f4f0] rounded-3xl p-6 shadow-none transition-all duration-300 border-none"
            >
              {/* Image Preview Area */}
              <div className="relative bg-[#f9f4f0] rounded-2xl mb-6 h-[320px] border-none overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                {/* Bottom fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f9f4f0] via-[#f9f4f0]/10 to-transparent pointer-events-none" />
              </div>

              {/* Step Number */}
              <div className="text-xs font-semibold text-primary mb-2">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed font-inter">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
