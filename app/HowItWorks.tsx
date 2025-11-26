import React from "react";
import { Search, Sparkles, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Enter Your Topic or Competitor",
    description:
      "Simply input your target keyword or competitor URL. Our AI will analyze the competitive landscape.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "AI Analyzes & Generates Insights",
    description:
      "Our engine processes thousands of data points, including ranking difficulty, GEO metrics, and content gaps.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Get Optimized Outlines",
    description:
      "Receive strategic, E-E-A-T-optimized outlines that prompt you to add your unique expertise.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Publish & Rank Faster",
    description:
      "Write with confidence knowing your content is optimized for both Google and AI search engines.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full mt-32">
      <div className="text-center mb-16">
        <h2 className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
          How It Works
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          From idea to published article in four simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 bg-[#104127] text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg font-poppins shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="bg-[#D5E0FC] rounded-xl p-4 w-fit mb-4 mt-4">
                <Icon className="h-8 w-8 text-[#104127]" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg text-[#1A1A1A] font-poppins mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 font-inter leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#E6E6E6]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
