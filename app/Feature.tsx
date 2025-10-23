import React from "react";

const featureList = [
  {
    title: "Data-Driven Topic Recommendations",
    description:
      "Go beyond basic keywords. Get title suggestions based on competitor analysis, ranking difficulty, and Generative Engine Optimization (GEO) metrics to ensure your content is seen by both humans and AI.",
  },
  {
    title: "Strategic Outline Builders",
    description:
      "Transform a winning title into a strategic blueprint. Our AI generates comprehensive outlines structured for E-E-A-T and machine-readability, prompting you to add the human expertise that search engines reward.",
  },
  {
    title: "Performance & Gap Analysis",
    description:
      "Connect your RSS feed and let our AI analyze your entire content library. Discover hidden topical gaps, identify performance patterns, and receive actionable suggestions to build your authority and improve your ranking strategy.",
  },
];

const Feature = () => {
  return (
    <div className="rounded-lg bg-white px-10 pt-10 pb-14 mt-40 shadow-md">
      <div className="text-center">
        <p className="font-semibold text-[#0A2918] text-[52px]">Features</p>
        <p className="font-semibold text-[#0A2918]">Features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {featureList?.map((feature) => {
          return (
            <div className="rounded-[24px] bg-[#F9F9F9] border border-[#E6E6E6] space-y-2 rounded-lg py-4 px-6 flex flex-col justify-center text-center">
              <div></div>
              <p className="font-medium text-base text-[#1A1A1A]">
                {feature?.title}
              </p>
              <p className="font-medium text-sm text-[#9A9A9A]">
                {feature?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
