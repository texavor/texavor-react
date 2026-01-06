"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

const steps = [
  {
    number: "01",
    title: "Connect Your Platforms",
    description:
      "Link your Medium, Dev.to, Hashnode, and WordPress accounts in seconds.",
    image: "/screenshots/step1.png", // Placeholder path
  },
  {
    number: "02",
    title: "Generate Content",
    description:
      "Use AI to create high-quality, SEO-optimized articles based on your keywords.",
    image: "/screenshots/step2.png",
  },
  {
    number: "03",
    title: "Orchestrate & Publish",
    description:
      "Receive competitor insights and publish perfectly formatted content to all your channels in one click.",
    image: "/screenshots/step3.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-poppins mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Streamline your content workflow in three simple steps.
          </p>
        </div>

        <StaggerContainer className="grid gap-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem key={index} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <div className="mb-6 inline-block">
                  <span className="text-5xl font-bold text-primary/10 font-poppins">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-poppins">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="relative h-48 rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                    Image Placeholder
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
