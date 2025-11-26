"use client";

import React from "react";
import { Target, FileText, TrendingUp } from "lucide-react";
import Image from "next/image";

const featureList = [
  {
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    title: "Data-Driven Topic Recommendations",
    description:
      "Go beyond basic keywords. Get title suggestions based on competitor analysis, ranking difficulty, and Generative Engine Optimization (GEO) metrics to ensure your content is seen by both humans and AI.",
  },
  {
    icon: FileText,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
    title: "Strategic Outline Builders",
    description:
      "Transform a winning title into a strategic blueprint. Our AI generates comprehensive outlines structured for E-E-A-T and machine-readability, prompting you to add the human expertise that search engines reward.",
  },
  {
    icon: TrendingUp,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    title: "Performance & Gap Analysis",
    description:
      "Connect your RSS feed and let our AI analyze your entire content library. Discover hidden topical gaps, identify performance patterns, and receive actionable suggestions to build your authority and improve your ranking strategy.",
  },
];

const Feature = () => {
  return (
    <div className="rounded-xl bg-white px-6 md:px-10 pt-10 pb-14 mt-40 shadow-lg border border-[#E6E6E6]">
      <div className="text-center mb-12">
        <p className="font-bold font-poppins text-[#0A2918] text-4xl md:text-[52px]">
          Features
        </p>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          Everything you need to create content that ranks and converts
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {featureList?.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="rounded-xl bg-[#F9F9F9] border border-[#E6E6E6] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-[#104127]/20"
            >
              {/* Image header */}
              <div className="relative w-full h-40 bg-gradient-to-br from-[#104127]/10 to-[#D5E0FC]/20">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-md">
                  <Icon className="h-6 w-6 text-[#104127]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="font-semibold text-lg text-[#1A1A1A] font-poppins mb-3">
                  {feature?.title}
                </p>
                <p className="font-normal text-sm text-[#9A9A9A] font-inter leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
