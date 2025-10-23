"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const whyDifferentList = [
  {
    id: 1,
    title: "Optimize for Generative Engines (GEO)",
    description:
      "Search is no longer just a list of links. Our platform is designed to help your content become the cited source in AI-generated answers on platforms like ChatGPT, Perplexity, and Google's AI Overviews.",
  },
  {
    id: 2,
    title: "Champion Your E-E-A-T",
    description:
      "We don't write articles for you. Instead, our strategic outlines prompt you to add the genuine, first-hand experience and expertise that Google's quality guidelines reward, setting you apart from low-quality AI content.",
  },
  {
    id: 3,
    title: "A Developer-First Approach",
    description:
      "We're not a generic marketing tool. We understand the difference between a tutorial and a technical deep-dive. Our analysis is tailored to the content formats and quality signals that resonate with a technical audience.",
  },
];

const WhyDifferent = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full text-center space-y-0 mt-30">
      <p className="text-[#0A2918] font-bold text-[48px]">
        Built for the New Era of Search
      </p>
      <div className="flex justify-center">
        <p className="w-[60%] text-[#7A7A7A] font-normal">
          Generic AI writers and outdated SEO tools are losing the battle for
          visibility. We focus on what's next.
        </p>
      </div>
      <div className="flex items-center justify-between mt-4 gap-4">
        <div className="flex flex-col gap-6">
          <Button
            onClick={() => setSelected(0)}
            className={`${
              selected === 0
                ? "bg-[#104127] hover:bg-[#104127] text-white"
                : "bg-white hover:bg-white text-black shadow-md"
            } font-semibold text-[24px] border-none px-6 py-8 rounded-xl`}
          >
            {whyDifferentList?.[0]?.title}
          </Button>
          <Button
            onClick={() => setSelected(1)}
            className={`${
              selected === 1
                ? "bg-[#104127] hover:bg-[#104127] text-white"
                : "bg-white hover:bg-white text-black shadow-md"
            } font-semibold text-[24px] border-none px-6 py-8 rounded-xl`}
          >
            {whyDifferentList?.[1]?.title}
          </Button>
          <Button
            onClick={() => setSelected(2)}
            className={`${
              selected === 2
                ? "bg-[#104127] hover:bg-[#104127] text-white"
                : "bg-white hover:bg-white text-black shadow-md"
            } font-semibold text-[24px] border-none px-6 py-8 rounded-xl`}
          >
            {whyDifferentList?.[2]?.title}
          </Button>
        </div>
        <div className="bg-[#104127] h-full rounded-xl px-4 py-6">
          <div className="bg-white rounded-xl px-4 py-6 shadow-md">
            <p className="text-base font-medium text-gray-700">
              {whyDifferentList?.[selected]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDifferent;
