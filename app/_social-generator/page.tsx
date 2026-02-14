"use client";

import React, { useRef, useCallback } from "react";
import {
  MoveUpRight,
  Activity,
  Search,
  BarChart3,
  FileText,
  CheckCircle2,
  MessageSquare,
  Download,
} from "lucide-react";
import { toPng } from "html-to-image";

// ----------------------------------------------------------------------
// Sub-component for individual card logic
// ----------------------------------------------------------------------
const SocialCard = ({ card }: { card: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (ref.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${card.type.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  }, [ref, card.type]);

  return (
    <div className="relative group flex flex-col items-center gap-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between w-[1200px] mb-2">
        <div className="text-zinc-500 font-mono text-sm">
          {card.type} (1200 x 630)
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
      </div>

      {/* The Card Container - Exactly 1200x630 */}
      {/* We attach the ref here to capture THIS specific div */}
      <div
        ref={ref}
        className="relative overflow-hidden bg-[#104127] text-white flex flex-col items-center justify-center text-center p-16"
        style={{
          width: "1200px",
          height: "630px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-100"
          style={{
            background:
              "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-5xl px-4">
          <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {card.icon}
          </div>

          <div className="text-9xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg mb-6">
            {card.title}
          </div>

          <p className="text-5xl text-green-50 font-semibold leading-tight max-w-5xl opacity-100 drop-shadow-sm">
            {card.description}
          </p>
        </div>

        {/* Branding Bottom Right */}
        <div className="absolute bottom-10 right-10 flex items-center gap-3 opacity-80">
          <span className="text-2xl font-bold tracking-wider">TEXAVOR</span>
        </div>

        {/* Decorative Element Top Right - Styled like MetricCard */}
        <div className="absolute top-12 right-12 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
          <MoveUpRight className="w-12 h-12 text-[#104127]" />
        </div>
      </div>
    </div>
  );
};

export default function SocialGeneratorPage() {
  const cards = [
    {
      title: "Texavor",
      subtitle: "Optimize for AI Search (GEO) & ChatGPT",
      description:
        "Boost your brand's visibility in ChatGPT, Perplexity, and Gemini.",
      icon: <Activity className="w-12 h-12 text-green-400" />,
      type: "Home",
    },
    {
      title: "Free GEO Tools",
      subtitle: "AI Visibility, Audits & Schema",
      description:
        "Analyze your AI visibility, audit content for LLMs, and generate schema.",
      icon: <Search className="w-12 h-12 text-green-400" />,
      type: "Tools Index",
    },
    {
      title: "AI Visibility Calculator",
      subtitle: "Free Score & Action Plan",
      description:
        "How visible is your brand in ChatGPT and Perplexity? Test it now.",
      icon: <BarChart3 className="w-12 h-12 text-green-400" />,
      type: "Visibility Tool",
    },
    {
      title: "Website Auditor",
      subtitle: "Technical Audit for AI Crawlers",
      description:
        "Check if ChatGPT and Google Gemini can properly read and index your site.",
      icon: <CheckCircle2 className="w-12 h-12 text-green-400" />,
      type: "Auditor Tool",
    },
    {
      title: "Texavor Blog",
      subtitle: "GEO Insights & Guides",
      description:
        "Expert guides on Generative Engine Optimization and ranking in AI overviews.",
      icon: <FileText className="w-12 h-12 text-green-400" />,
      type: "Blog",
    },
    {
      title: "Brand Authority",
      subtitle: "Check Your Entity Strength",
      description: "Measure your reputation across Large Language Models.",
      icon: <Activity className="w-12 h-12 text-green-400" />,
      type: "Brand Authority",
    },
    {
      title: "FAQ Schema Generator",
      subtitle: "JSON-LD for AI Answers",
      description:
        "Create schema to help AI answer engines understand your content directly.",
      icon: <MessageSquare className="w-12 h-12 text-green-400" />,
      type: "FAQ Schema",
    },
    {
      title: "Topical Authority",
      subtitle: "Map Generator",
      description:
        "Visualize your content clusters. Build the semantic authority needed to dominate specific topics.",
      icon: <Activity className="w-12 h-12 text-green-400" />,
      type: "Topical Authority",
    },
    {
      title: "GEO Schema Validator",
      subtitle: "Validate Your Markup",
      description:
        "Validate your structured data for Generative Engines. Ensure you have the right markup.",
      icon: <CheckCircle2 className="w-12 h-12 text-green-400" />,
      type: "GEO Schema Validator",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 p-10 font-sans">
      <h1 className="text-white text-3xl mb-10 text-center font-bold">
        Social Preview Generator
      </h1>

      <div className="flex flex-col items-center gap-20">
        {cards.map((card, idx) => (
          <SocialCard key={idx} card={card} />
        ))}
      </div>
    </div>
  );
}
