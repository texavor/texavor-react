"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.25)", // Primary green-ish
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden bg-white border border-gray-200 ${className}`}
    >
      {/* Spotlight Effect - moves with mouse */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content wrapper - ensures content stays above spotlight background if needed, 
          though typically spotlight sits behind or over with mix-blend-mode. 
          Here we put it behind (z-0) or just let standard stacking work.
      */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
