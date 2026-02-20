"use client";

import { motion } from "framer-motion";
import {
  Zap,
  FileText,
  CheckCircle2,
  PenTool,
  Lightbulb,
  TrendingUp,
  BarChart,
  Activity,
  Globe,
  Network,
  AlertTriangle,
} from "lucide-react";

// --- Custom SVG Icons ---

const SvgVisibility = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4Z" />
    <circle cx="12" cy="11.5" r="3" />
    <path
      d="M12 4V2M12 21V19M4.5 4.5L6 6M19.5 18.5L18 17M19.5 4.5L18 6M4.5 18.5L6 17"
      opacity="0.5"
    />
  </svg>
);

const SvgStructure = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M10.5 7.5L6.5 16.5" />
    <path d="M13.5 7.5L17.5 16.5" />
    <path d="M7.5 19H16.5" strokeDasharray="2 3" />
  </svg>
);

const SvgResearch = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6H16" />
    <path d="M8 10H16" />
    <path d="M8 14H12" />
    <circle cx="15" cy="15" r="3" />
    <path d="M17 17L20 20" />
  </svg>
);

const SvgMonitoring = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V12" />
    <path d="M22 7L14 15L10 11L2 19" />
    <path d="M16 7H22V13" />
    <line x1="2" y1="2" x2="22" y2="22" strokeDasharray="3 3" opacity="0.4" />
  </svg>
);

// --- Component Injections from OldFeatures ---

const ProgressStats = () => {
  const stats = [
    {
      label: "Total Articles",
      value: 118,
      change: "+20%",
      icon: <FileText className="w-5 h-5 text-primary" />,
      bgColor: "bg-primary/5",
      trend: "up",
    },
    {
      label: "Published",
      value: 7,
      change: "+40%",
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      bgColor: "bg-primary/5",
      trend: "up",
    },
    {
      label: "Decaying",
      value: 3,
      change: "+2",
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
      bgColor: "bg-destructive/5",
      trend: "down",
    },
    {
      label: "Topic Ideas",
      value: 10,
      change: "+15%",
      icon: <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-500/5",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-background rounded-2xl border border-border/50 p-5 hover:border-border transition-colors flex flex-col justify-between h-full"
        >
          <div className="flex items-start justify-between mb-8">
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <span
              className={`text-[11px] font-inter font-bold px-2.5 py-1 rounded-full ${
                stat.trend === "up"
                  ? "text-primary bg-primary/10"
                  : "text-orange-600 bg-orange-500/10 dark:text-orange-400"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <div>
            <div className="text-[10px] font-inter font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              {stat.label}
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-mono tabular-nums tracking-tight font-bold text-foreground">
                {stat.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TopicGeneration = () => {
  const topics = [
    {
      title: "Data-Backed Brief: Optimizing for Google SGE",
      description:
        "Based on analysis of top 10 SERP results. Recommended word count: 1800. Key entities to include: 'Zero-Click Searches', 'AI Overviews'.",
      badge: "High Potential",
      badgeColor:
        "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
    },
    {
      title: "Content Gap: Missing 'Pricing' Comparisons",
      description:
        "Competitors rank for 'Texavor vs others' but your site lacks a direct comparison page. High intent opportunity.",
      badge: "Gap Analysis",
      badgeColor:
        "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50",
    },
  ];

  return (
    <div className="w-full space-y-3">
      {topics.map((topic, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm p-4 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {topic.title}
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 mb-3">
                {topic.description}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold border ${topic.badgeColor}`}
                >
                  {topic.badge}
                </span>
              </div>
            </div>
            <button
              aria-label="Add topic"
              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const OutlineGeneration = () => {
  const sections = [
    {
      title: "Why Choose Vercel for React Projects?",
      keyPoints: [
        "Overview of Vercel's features and benefits",
        "Comparison with other deployment platforms",
      ],
    },
    {
      title: "Prerequisites for Deployment",
      keyPoints: [
        "Setting up a React project (basic structure and tools)",
        "Creating a GitHub repository for your project",
      ],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {sections.map((section, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm p-4 transition-all"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1">
              <svg
                className="w-4 h-4 text-gray-400 dark:text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white flex-1 line-clamp-2">
              {section.title}
            </div>
          </div>

          <div className="space-y-2 ml-7">
            {section.keyPoints.map((point, j) => (
              <div
                key={j}
                className="flex items-start gap-2 text-xs text-gray-700 dark:text-zinc-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span className="line-clamp-2">{point}</span>
              </div>
            ))}
            <button
              aria-label="Add key point"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium mt-2"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Key Point
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const CompetitorAnalysis = () => {
  return (
    <div className="w-full space-y-4 z-10 relative px-4">
      {/* Profile Header */}
      <div className="bg-background rounded-xl border border-border/50 p-5 shadow-sm">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center text-background font-bold text-xl flex-shrink-0 shadow-sm">
            TX
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h4 className="text-base font-poppins font-bold text-foreground truncate">
                Texavor Blog Analysis
              </h4>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold rounded uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                Live Sync
              </div>
            </div>
            <p className="text-xs font-inter text-muted-foreground">
              Analysis based on 24 recent GEO-optimized articles.
            </p>
          </div>
          <button
            aria-label="Run Analysis"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Activity className="w-3.5 h-3.5" />
            Scan Now
          </button>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-muted/30 rounded-lg p-3.5 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-inter text-muted-foreground uppercase tracking-widest font-semibold">
                AI Auth
              </div>
              <BarChart className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="text-3xl font-mono tabular-nums tracking-tight font-bold text-foreground">
              94
              <span className="text-sm font-inter text-muted-foreground/60">
                /100
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3.5 border border-border/50 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-inter text-muted-foreground uppercase tracking-widest font-semibold">
                SEO Score
              </div>
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-3xl font-mono tabular-nums tracking-tight font-bold text-foreground">
              82
              <span className="text-sm font-inter text-muted-foreground/60">
                /100
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3.5 border border-border/50 hover:border-amber-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-inter text-muted-foreground uppercase tracking-widest font-semibold">
                Entities
              </div>
              <Network className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-3xl font-mono tabular-nums tracking-tight font-bold text-foreground">
              1,204
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3.5 border border-border/50 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-inter text-muted-foreground uppercase tracking-widest font-semibold">
                Growth
              </div>
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="text-3xl font-mono tabular-nums tracking-tight font-bold text-foreground text-primary">
              +48
              <span className="text-sm font-inter font-bold opacity-60">%</span>
            </div>
          </div>
        </div>

        {/* Mobile Action Button */}
        <button
          aria-label="Run Analysis"
          className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Activity className="w-3.5 h-3.5" />
          Scan Now
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-24 md:py-32 bg-background tx-dot-bg border-t border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16 animate-fade-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-xs font-inter font-semibold uppercase tracking-widest text-muted-foreground">
              The Texavor Engine
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground leading-tight mb-6">
            Everything you need to <br className="hidden md:block" />{" "}
            reverse-engineer AI search.
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl leading-relaxed">
            Forget generic 'AI writers'. Texavor is a precision research and
            analysis engine designed to build the entity depth and factual
            density that LLMs cite.
          </p>
        </div>

        {/* Bento Grid — 1px borders, no shadows on the grid itself */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {/* Card 1: SERP & LLM Analysis (2 cols) */}
          <div className="col-span-1 md:col-span-2 bg-card p-8 md:p-12 flex flex-col group relative overflow-hidden transition-colors hover:bg-muted/30 min-h-[500px]">
            <div className="flex items-center gap-2 mb-6">
              <SvgVisibility className="w-6 h-6 text-primary" />
              <span className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                Analysis
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-3">
              SERP & LLM Analysis
            </h3>
            <p className="text-muted-foreground font-inter max-w-md mb-10">
              Track where your competitors appear in Perplexity and Google SGE.
              Analyze intent and spot topical gaps instantly before you write.
            </p>
            <div className="mt-8 relative rounded-xl border border-border bg-muted/20 overflow-hidden pt-8 pb-8 -mx-4 -mb-12 flex flex-col justify-center isolate">
              {/* Decorative background pulse for the component */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-primary/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CompetitorAnalysis />
            </div>
          </div>

          {/* Card 2: Entity Outlines (1 col) */}
          <div className="col-span-1 bg-card p-8 md:p-12 flex flex-col group relative overflow-hidden transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-2 mb-6">
              <SvgStructure className="w-6 h-6 text-amber-500" />
              <span className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                Strategy
              </span>
            </div>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-3">
              Entity Outlines
            </h3>
            <p className="text-muted-foreground font-inter mb-8">
              We scan top AI responses to build structural outlines packed with
              the exact entities required to rank.
            </p>
            <div className="mt-auto -mx-2 bg-muted/10 rounded-xl p-4 border border-border/50">
              <OutlineGeneration />
            </div>
          </div>

          {/* Card 3: Data-Backed Briefs (1 col) */}
          <div className="col-span-1 bg-card p-8 md:p-12 flex flex-col group relative overflow-hidden transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-2 mb-6">
              <SvgResearch className="w-6 h-6 text-emerald-500" />
              <span className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                Research
              </span>
            </div>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-3">
              Data-Backed Briefs
            </h3>
            <p className="text-muted-foreground font-inter mb-8 text-sm">
              Generate content briefs based on live SERP and LLM data to ensure
              your writers never miss a critical topical gap.
            </p>
            <div className="mt-auto -mx-2 bg-muted/10 rounded-xl p-4 border border-border/50">
              <TopicGeneration />
            </div>
          </div>

          {/* Card 4: Content Decay Monitoring (2 cols) */}
          <div className="col-span-1 md:col-span-2 bg-card p-8 md:p-12 flex flex-col group relative overflow-hidden transition-colors hover:bg-muted/30 min-h-[500px]">
            <div className="flex items-center gap-2 mb-6">
              <SvgMonitoring className="w-6 h-6 text-destructive" />
              <span className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
                Monitoring
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-3">
              Stale Content is Invisible Content
            </h3>
            <p className="text-muted-foreground font-inter max-w-md mb-10">
              LLMs hallucinate when data is old. Our Decay Risk Engine scans
              your articles 24/7. We alert you to update before AIs stop citing
              you.
            </p>
            <div className="mt-8 relative rounded-xl border border-border bg-muted/20 overflow-hidden py-8 px-2 -mx-4 -mb-8 lg:-mb-12 isolate flex items-center">
              <ProgressStats />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
