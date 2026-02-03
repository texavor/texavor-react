"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Globe } from "lucide-react";

export function CompetitorSpyCard() {
  return (
    <div className="w-full h-full p-4 bg-gray-900 rounded-xl flex flex-col justify-between text-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      ></div>

      <div className="flex items-center gap-3 z-10">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <Globe className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <div className="text-xs text-gray-400">Target Competitor</div>
          <div className="text-sm font-medium">competitor.com</div>
        </div>
      </div>

      <div className="space-y-2 z-10 mt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Content Gaps</span>
          <span className="text-red-400 font-bold">12 Critical</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-3 bg-red-500/20 border border-red-500/30 rounded-lg p-2.5 flex items-start gap-2 backdrop-blur-sm"
      >
        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <div className="text-xs text-red-100 leading-snug">
          <span className="font-semibold text-white">Example Warning:</span>{" "}
          Missing AEO schema markup on 45% of blog posts.
        </div>
      </motion.div>
    </div>
  );
}
