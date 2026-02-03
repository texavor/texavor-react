"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function AIWriterCard() {
  const fullText =
    "The future of content is Answer Engine Optimization. Stop writing for 10 blue links and start writing for AI models like Perplexity and ChatGPT.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= fullText.length) {
          clearInterval(intervalId);
          return prev;
        }
        const nextChar = fullText.charAt(index);
        index++;
        return prev + nextChar;
      });
    }, 30); // Typing speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full p-5 bg-white rounded-xl flex flex-col gap-3 relative overflow-hidden group">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary font-medium text-sm">
        <div className="p-1.5 bg-primary/10 rounded-md">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        AI Draft In-Progress
      </div>

      {/* Typing Area */}
      <div className="flex-1 font-mono text-[13px] leading-relaxed text-gray-600">
        {displayedText}
        <span className="w-1.5 h-3.5 bg-primary/60 inline-block ml-0.5 animate-pulse align-middle" />
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-auto">
        <div
          className="h-full bg-primary ease-linear transition-all duration-[3000ms]"
          style={{ width: displayedText.length > 0 ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
}
