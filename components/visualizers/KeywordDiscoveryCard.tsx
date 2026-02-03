"use client";

import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";

const keywords = [
  { term: "aeo optimization tools", vol: "2.4k", difficulty: "Easy" },
  { term: "how to rank in chatgpt", vol: "1.8k", difficulty: "Med" },
  { term: "perplexity seo strategy", vol: "5.2k", difficulty: "Hard" },
  { term: "answer engine optimization", vol: "12k", difficulty: "Easy" },
];

export function KeywordDiscoveryCard() {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl flex flex-col gap-3 shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
        <span className="flex items-center gap-1.5">
          <Search className="w-3 h-3" /> Keyword Gap
        </span>
        <span>KD %</span>
      </div>

      <div className="flex flex-col gap-2">
        {keywords.map((kw, idx) => (
          <motion.div
            key={kw.term}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.5 + 0.5 }}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${kw.difficulty === "Easy" ? "bg-green-500" : kw.difficulty === "Med" ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <span className="text-sm font-medium text-gray-700">
                {kw.term}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{kw.vol}</span>
              {kw.difficulty === "Easy" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.5 + 0.8 }}
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="w-3 h-3" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
