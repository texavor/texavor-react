"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Shield, Code2 } from "lucide-react";

const whyDifferentList = [
  {
    id: 1,
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    title: "Optimize for Generative Engines (GEO)",
    description:
      "Search is no longer just a list of links. Our platform is designed to help your content become the cited source in AI-generated answers on platforms like ChatGPT, Perplexity, and Google's AI Overviews.",
  },
  {
    id: 2,
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    title: "Champion Your E-E-A-T",
    description:
      "We don't write articles for you. Instead, our strategic outlines prompt you to add the genuine, first-hand experience and expertise that Google's quality guidelines reward, setting you apart from low-quality AI content.",
  },
  {
    id: 3,
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    title: "A Developer-First Approach",
    description:
      "We're not a generic marketing tool. We understand the difference between a tutorial and a technical deep-dive. Our analysis is tailored to the content formats and quality signals that resonate with a technical audience.",
  },
];

const WhyDifferent = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full text-center space-y-0 mt-32">
      <p className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
        Built for the New Era of Search
      </p>
      <div className="flex justify-center">
        <p className="w-full md:w-[70%] text-[#7A7A7A] font-normal font-inter mt-4">
          Generic AI writers and outdated SEO tools are losing the battle for
          visibility. We focus on what's next.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between mt-12 gap-6">
        {/* Buttons */}
        <div className="flex flex-col gap-4 lg:w-2/5">
          {whyDifferentList.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() => setSelected(index)}
                className={`${
                  selected === index
                    ? "bg-[#104127] hover:bg-[#0d3620] text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-black shadow-md hover:shadow-lg"
                } font-semibold text-base md:text-lg border-none px-6 py-6 md:py-8 rounded-xl transition-all duration-300 text-left flex items-center gap-4`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selected === index ? "bg-white/20" : "bg-[#104127]/10"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      selected === index ? "text-white" : "text-[#104127]"
                    }`}
                  />
                </div>
                <span className="flex-1">{item.title}</span>
              </Button>
            );
          })}
        </div>

        {/* Content with image */}
        <div className="lg:w-3/5 bg-[#104127] rounded-xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#104127]/10 to-[#D5E0FC]/20">
                <Image
                  src={whyDifferentList[selected].image}
                  alt={whyDifferentList[selected].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#104127] via-[#104127]/50 to-transparent"></div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-8 flex-grow">
                <p className="text-base md:text-lg font-medium text-gray-700 font-inter leading-relaxed">
                  {whyDifferentList[selected].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WhyDifferent;
