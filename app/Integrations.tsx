"use client";

import React from "react";
import Image from "next/image";

const integrations = [
  {
    name: "WordPress",
    logo: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
  },
  {
    name: "Medium",
    logo: "https://cdn.worldvectorlogo.com/logos/medium-1.svg",
  },
  {
    name: "Ghost",
    logo: "https://cdn.worldvectorlogo.com/logos/ghost-logo.svg",
  },
  {
    name: "Shopify",
    logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
  },
  {
    name: "Webflow",
    logo: "https://cdn.worldvectorlogo.com/logos/webflow-logo.svg",
  },
  {
    name: "Custom API",
    logo: "https://cdn.worldvectorlogo.com/logos/webhooks.svg",
  },
];

const Integrations = () => {
  return (
    <div className="w-full mt-32">
      <div className="text-center mb-16">
        <h2 className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
          Works With Your Favorite Platforms
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          Seamlessly integrate with the tools you already use
        </p>
      </div>

      <div className="bg-white rounded-xl p-12 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-600 font-inter font-medium">
                {integration.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
