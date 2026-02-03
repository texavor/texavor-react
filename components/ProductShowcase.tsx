"use client";

import { BrowserFrame } from "@/components/BrowserFrame";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProductShowcase() {
  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] perspective-[2000px]">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      </div>

      {/* Live Demo Container */}
      <motion.div
        className="w-full h-full relative z-10"
        initial={{ opacity: 0, scale: 0.95, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <BrowserFrame
          className="h-full border-[#333954] bg-[#0e101a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          url="app.texavor.com/dashboard"
        >
          <iframe
            src="http://localhost:3030/share/demo/dashboard"
            className="w-full h-full border-none bg-white"
            title="Texavor Application Demo"
            loading="eager"
            allow="clipboard-write"
          />
        </BrowserFrame>
      </motion.div>
    </div>
  );
}
