"use client";

import React from "react";
import Image from "next/image";
import { Code, PenTool, Building2 } from "lucide-react";

const useCases = [
  {
    icon: Code,
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    title: "Developer Advocates",
    description:
      "Build thought leadership and establish your voice in the developer community with data-driven content strategies.",
    benefit: "Increase engagement by 3x",
  },
  {
    icon: PenTool,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
    title: "Technical Bloggers",
    description:
      "Rank faster with topics optimized for both traditional search and AI-powered answers. Stop guessing, start ranking.",
    benefit: "Hit page 1 in weeks, not months",
  },
  {
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    title: "DevTool Companies",
    description:
      "Drive organic traffic and reduce CAC with strategic content that resonates with your technical audience.",
    benefit: "Lower acquisition costs by 40%",
  },
];

const UseCases = () => {
  return (
    <div className="w-full mt-32">
      <div className="text-center mb-16">
        <h2 className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
          Built for Technical Content Creators
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          Whether you're building a personal brand or growing a company blog,
          Texavor helps you create content that ranks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-[#104127]/10 to-[#D5E0FC]/20">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-md">
                  <Icon className="h-6 w-6 text-[#104127]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-[#1A1A1A] font-poppins mb-3">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-600 font-inter mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="flex items-center gap-2 text-[#104127]">
                  <div className="w-1.5 h-1.5 bg-[#104127] rounded-full"></div>
                  <p className="text-sm font-semibold font-inter">
                    {useCase.benefit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UseCases;
