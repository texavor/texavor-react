"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Developer Advocate",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?img=5",
    quote:
      "Texavor completely changed how we approach content strategy. We went from publishing articles into the void to hitting page 1 for competitive keywords in under a month.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Technical Writer",
    company: "DevTools Inc",
    image: "https://i.pravatar.cc/150?img=12",
    quote:
      "The GEO optimization features are game-changing. Our content now gets cited by ChatGPT and Perplexity regularly, driving tons of organic traffic.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Content Lead",
    company: "CloudStart",
    image: "https://i.pravatar.cc/150?img=9",
    quote:
      "Finally, a tool that understands technical content. The E-E-A-T framework helps us create authoritative content that actually ranks.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="w-full mt-32">
      <div className="text-center mb-16">
        <h2 className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
          Loved by Technical Content Creators
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter mt-4 max-w-2xl mx-auto">
          Join thousands of developers and technical writers who trust Texavor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#104127] text-[#104127]"
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 font-inter text-sm leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] font-poppins">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600 font-inter">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
