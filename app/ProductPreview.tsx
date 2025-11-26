"use client";

import React from "react";
import Image from "next/image";

const ProductPreview = () => {
  return (
    <div className="w-full mt-32">
      <div className="text-center mb-12">
        <h2 className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
          See Texavor in Action
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          Get instant insights into what topics will rank, complete with
          competitor analysis and AI-optimized outlines.
        </p>
      </div>

      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E6E6E6]">
        {/* Placeholder for product screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-[#104127]/10 to-[#D5E0FC]/20">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop"
            alt="Texavor Dashboard Preview"
            fill
            className="object-cover"
          />
          {/* Overlay with feature highlights */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <div className="text-white">
              <p className="text-2xl font-bold font-poppins">
                AI-Powered Topic Generation
              </p>
              <p className="text-sm font-inter mt-2 opacity-90">
                Analyze competitors, discover gaps, and generate winning topics
                in seconds
              </p>
            </div>
          </div>
        </div>

        {/* Feature annotations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#F9F9F9]">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#104127] rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-sm text-[#1A1A1A] font-poppins">
                Real-time Analysis
              </p>
              <p className="text-xs text-gray-600 font-inter">
                Live competitor data
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#104127] rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-sm text-[#1A1A1A] font-poppins">
                GEO Optimization
              </p>
              <p className="text-xs text-gray-600 font-inter">
                AI chatbot ready
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#104127] rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-sm text-[#1A1A1A] font-poppins">
                E-E-A-T Framework
              </p>
              <p className="text-xs text-gray-600 font-inter">
                Google-approved structure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
