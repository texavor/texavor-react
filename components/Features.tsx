"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

// Simple bar chart component matching reference design
const SimpleBarChart = () => {
  const bars = [
    { height: 40, active: false },
    { height: 75, active: false },
    { height: 55, active: false },
    { height: 30, active: false },
    { height: 65, active: true },
    { height: 90, active: false },
    { height: 50, active: false },
    { height: 70, active: false },
    { height: 60, active: false },
    { height: 80, active: false },
  ];

  return (
    <div className="relative w-full h-[200px] flex items-end justify-between gap-2 px-4">
      {/* Dashed line */}
      <div className="absolute top-1/3 left-0 right-0 border-t-2 border-dashed border-gray-200" />

      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 flex flex-col items-center justify-end h-full"
        >
          <div
            className={`w-full rounded-t-lg transition-all ${
              bar.active
                ? "bg-gradient-to-b from-primary to-primary/90 shadow-lg"
                : "bg-gradient-to-b from-gray-200 to-gray-300"
            }`}
            style={{ height: `${bar.height}%` }}
          />
        </div>
      ))}

      {/* Progress badge */}
      {bars.findIndex((b) => b.active) >= 0 && (
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
          65% Progress
        </div>
      )}
    </div>
  );
};

// Progress Stats component
const ProgressStats = () => {
  const stats = [
    {
      label: "Total Articles",
      value: 118,
      change: 20,
      icon: "📄",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Published",
      value: 7,
      change: 40,
      icon: "✓",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Drafts",
      value: 111,
      change: 10,
      icon: "📝",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Topic Ideas",
      value: 10,
      change: 10,
      icon: "💡",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl border-none p-4">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center text-xl`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400 mb-1">≈ {stat.change}%</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Calendar view component for Article Management
const CalendarView = () => {
  const articles = [
    {
      day: 15,
      title: "The 4 Best ReactJS UI Fra...",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      day: 15,
      title: "Free Awesome Notion Te...",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      day: 15,
      title: "A Guide to Coding Stand...",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      day: 16,
      title: "Optimizing for AI-Powere...",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      day: 2417,
      title: "Why Developers Struggle...",
      color: "bg-green-100 text-green-800 border-green-200",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border-none overflow-hidden">
      {/* Calendar Grid */}
      <div className="grid grid-cols-3 border-none divide-x divide-gray-200">
        {/* Day 15 */}
        <div className="p-3 min-h-[220px] bg-gray-50/30">
          <div className="text-sm font-semibold text-gray-700 mb-2">15</div>
          <div className="space-y-2">
            {articles
              .filter((a) => a.day === 15)
              .map((article, i) => (
                <div
                  key={i}
                  className={`text-[10px] px-2 py-1.5 rounded-md border ${article.color} font-medium truncate`}
                >
                  {article.title}
                </div>
              ))}
            <div className="text-[10px] text-gray-500 px-2">+104 more</div>
          </div>
        </div>
        {/* Day 23 */}
        <div className="p-3 min-h-[140px]">
          <div className="text-sm font-semibold text-gray-700 mb-2">16</div>
          <div className="space-y-2">
            {articles
              .filter((a) => a.day === 16)
              .map((article, i) => (
                <div
                  key={i}
                  className={`text-[10px] px-2 py-1.5 rounded-md border ${article.color} font-medium truncate`}
                >
                  {article.title}
                </div>
              ))}
          </div>
        </div>
        <div className="p-3 min-h-[140px]">
          <div className="text-sm font-semibold text-gray-700 mb-2">17</div>
          <div className="space-y-2">
            {articles
              .filter((a) => a.day === 17)
              .map((article, i) => (
                <div
                  key={i}
                  className={`text-[10px] px-2 py-1.5 rounded-md border ${article.color} font-medium truncate`}
                >
                  {article.title}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Keyword Research component
const KeywordResearch = () => {
  const keywords = [
    {
      keyword: "AI content writing tools",
      volume: 2400,
      cpc: "$3.20",
      competition: 75,
      difficulty: 45,
    },
    {
      keyword: "SEO article generator",
      volume: 1800,
      cpc: "$2.80",
      competition: 60,
      difficulty: 38,
    },
    {
      keyword: "blog post automation",
      volume: 980,
      cpc: "$2.10",
      competition: 45,
      difficulty: 28,
    },
  ];

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-green-500";
    if (difficulty < 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="w-full bg-white rounded-xl border-none">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
        <div className="col-span-5">Keyword</div>
        <div className="col-span-2 text-center">Volume</div>
        <div className="col-span-2 text-center">CPC</div>
        <div className="col-span-2 text-center">Competition</div>
        <div className="col-span-1 text-center">Diff</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {keywords.map((kw, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50/50 transition-colors items-center"
          >
            <div className="col-span-5 text-sm text-gray-800 font-medium truncate">
              {kw.keyword}
            </div>
            <div className="col-span-2 text-center text-sm text-gray-600">
              {kw.volume.toLocaleString()}
            </div>
            <div className="col-span-2 text-center text-sm text-blue-600 font-semibold">
              {kw.cpc}
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="w-full max-w-[80px] h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  style={{ width: `${kw.competition}%` }}
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <div
                className={`w-7 h-7 rounded-full ${getDifficultyColor(
                  kw.difficulty
                )} text-white text-xs font-bold flex items-center justify-center`}
              >
                {kw.difficulty}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Showing 5 of 1,247 keywords
        </span>
        <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

// Topic Generation component
const TopicGeneration = () => {
  const topics = [
    {
      title:
        "Step-by-Step Guide: Building a Modern React Dashboard with TypeScript",
      description:
        "Learn how to create a production-ready React dashboard using TypeScript, Tailwind CSS, and best practices.",
      badge: "Tutorial",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
    },
    {
      title: "Advanced React Patterns: Custom Hooks for State Management",
      description:
        "Master advanced React patterns with custom hooks to simplify complex state management scenarios.",
      badge: "Guide",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    },
  ];

  return (
    <div className="w-full space-y-3">
      {topics.map((topic, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border-none p-4  transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {topic.title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
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
            <button className="flex-shrink-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm">
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

// Outline Generation component
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
          className="bg-white rounded-xl border-none p-4 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1">
              <svg
                className="w-4 h-4 text-gray-400"
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
            <h5 className="flex-1 text-sm font-bold text-gray-900">
              {section.title}
            </h5>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2 ml-7">
            {section.keyPoints.map((point, j) => (
              <div
                key={j}
                className="flex items-start gap-2 text-xs text-gray-700"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium mt-2">
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

// Competitor Analysis component
const CompetitorAnalysis = () => {
  const articles = [
    {
      title: "A Five-Minute UI Feature That Became an...",
      date: "12/17/2025",
      tags: ["webdev", "javascript", "security"],
    },
    {
      title: "Will WebAssembly Kill JavaScript? Let's Find",
      date: "12/9/2025",
      tags: ["webdev", "rust", "javascript"],
    },
    {
      title: "Nobody Writes Clean Code. We All Just Prefe",
      date: "12/1/2025",
      tags: ["webdev", "programming", "productivity"],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border-none p-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
            DEV
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-bold text-gray-900">Jacob Brown</h4>
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                Completed
              </span>
            </div>
            <p className="text-xs text-gray-500">No description available.</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
              <span className="flex items-center gap-1">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                5 Analyses
              </span>
              <button className="flex items-center gap-1 text-primary hover:text-primary/80">
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit Website
              </button>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Run Analysis
          </button>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <div className="text-[10px] text-green-700 font-medium mb-1">
              Content Score
            </div>
            <div className="text-2xl font-bold text-green-900">100.0</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="text-[10px] text-orange-700 font-medium mb-1">
              SEO Score
            </div>
            <div className="text-2xl font-bold text-orange-900">50.0</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="text-[10px] text-blue-700 font-medium mb-1">
              Overall Score
            </div>
            <div className="text-2xl font-bold text-blue-900">75.0</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <div className="text-[10px] text-green-700 font-medium mb-1">
              New Articles
            </div>
            <div className="text-2xl font-bold text-green-900">10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Platform Integration component
const PlatformIntegration = () => {
  const platforms = [
    {
      name: "Medium",
      type: "Rss Integration",
      logo: "M",
      bgColor: "bg-black",
      connected: true,
      description:
        "Connect your Medium account to automatically import and sync articles.",
    },
    {
      name: "WordPress",
      type: "Api Integration",
      logo: "W",
      bgColor: "bg-blue-600",
      connected: false,
      description:
        "Connect your WordPress account to automatically import and sync articles.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {platforms.map((platform, i) => (
        <div
          key={i}
          className={`rounded-xl p-4 border transition-all ${
            platform.connected
              ? "bg-green-50/50 border-none"
              : "bg-white border-none"
          }`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
            >
              {platform.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="text-sm font-bold text-gray-900">
                  {platform.name}
                </h5>
                {platform.connected && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] font-semibold">Connected</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 font-medium">
                {platform.type}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            {platform.description}
          </p>

          <button
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
              platform.connected
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {platform.connected ? "Manage" : "Connect"}
          </button>
        </div>
      ))}
    </div>
  );
};

// Thumbnail Generation component
const ThumbnailGeneration = () => {
  const styles = [
    {
      name: "Codeburst Spectrum",
      description:
        "A dynamic and asymmetric layout with cascading code snippets in the background, overlaid with bold typography that mixes...",
      selected: true,
      gradient: "from-cyan-500 via-blue-600 to-purple-700",
      icon: "🔥",
      badge: "Minimal",
      colors: ["bg-cyan-400", "bg-gray-900", "bg-gray-700"],
    },
    {
      name: "React Orbit",
      description:
        "A circular composition with a bold central title surrounded by orbiting React and JavaScript symbols. The design uses a clea...",
      selected: false,
      gradient: "from-gray-900 via-blue-900 to-black",
      icon: "⚛️",
      badge: "Minimal",
      colors: ["bg-cyan-400", "bg-orange-500", "bg-gray-900", "bg-gray-800"],
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border-none overflow-hidden"
          >
            {/* Thumbnail Preview */}
            <div
              className={`relative h-32 bg-gradient-to-br ${style.gradient} flex items-center justify-center`}
            >
              {style.selected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="text-center px-4">
                <div className="text-2xl mb-2">{style.icon}</div>
                <h5 className="text-white font-bold text-sm">
                  React Article Title
                </h5>
                <p className="text-white/70 text-[10px] mt-1">ARTICLE STYLE</p>
              </div>
            </div>

            {/* Style Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-bold text-gray-900">
                  {style.name}
                </h5>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-semibold rounded-full flex items-center gap-1">
                  🔥 {style.badge}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {style.description}
              </p>

              {/* Color Palette */}
              <div className="flex items-center gap-2 mb-3">
                {style.colors.map((color, j) => (
                  <div
                    key={j}
                    className={`w-6 h-6 rounded ${color} border border-gray-200`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                  style.selected
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {style.selected ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected
                  </span>
                ) : (
                  "Select Style"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Author Management component
const AuthorManagement = () => {
  const members = [
    {
      name: "Suraj Vishwakarma",
      email: "suraj@texavor.com",
      role: "Admin",
      initial: "S",
      you: true,
      platform: "Medium",
    },
    {
      name: "Akash Vishwakarma",
      email: "akash@texavor.com",
      role: "Editor",
      initial: "A",
      you: false,
      platform: "WordPress",
    },
    {
      name: "Sarah Jenkins",
      email: "sarah@tech.io",
      role: "Viewer",
      initial: "S",
      you: false,
      platform: "Dev.to",
    },
    {
      name: "David Chen",
      email: "david@code.com",
      role: "Writer",
      initial: "D",
      you: false,
      platform: "Hashnode",
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-green-100 text-green-700 border-green-200";
      case "Editor":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Viewer":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Writer":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}

      {/* Team Members Table */}
      <div className="bg-white rounded-xl border-none overflow-hidden">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h5 className="text-xs font-semibold text-gray-700">
            Author Profiles
          </h5>
          <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            ● All Synced
          </span>
        </div>

        <div className="bg-gray-50/50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] font-semibold text-gray-600">
            <div className="col-span-6">Author</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3 text-right">Sync Source</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {members.map((member, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50/50 transition-colors items-center"
            >
              <div className="col-span-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xs border border-gray-200 flex-shrink-0">
                  {member.initial}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {member.name}
                    </p>
                    {member.you && (
                      <span className="text-[10px] text-gray-500">(You)</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="col-span-3">
                <span
                  className={`inline-flex px-2 py-1 rounded-md text-[10px] font-semibold border ${getRoleBadgeColor(
                    member.role
                  )}`}
                >
                  {member.role}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-[10px] text-gray-400 font-medium">
                  {member.platform}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      title: "Content Command Center",
      description:
        "Plan, write, and command your entire editorial calendar from one premium workspace.",
      component: <CalendarView />,
    },
    {
      title: "Strategic Keyword Intelligence",
      description:
        "Don't just write. Target high-volume opportunities with built-in difficulty analysis.",
      component: <KeywordResearch />,
    },
    {
      title: "Smart Topic Generation",
      description:
        "Convert basic ideas into E-E-A-T optimized article concepts instantly.",
      component: <TopicGeneration />,
    },
    {
      title: "AI-Powered Outlining",
      description:
        "Generate structured, technically accurate outlines that respect your tone of voice.",
      component: <OutlineGeneration />,
    },
    {
      title: "Competitor Intelligence",
      description:
        "Track competitor content velocity and quality. Know exactly where to outperform them.",
      component: <CompetitorAnalysis />,
    },
    {
      title: "Precision Orchestration",
      description:
        "One-click publishing to Dev.to, Hashnode, and Medium with perfect code block formatting.",
      component: <PlatformIntegration />,
    },
    {
      title: "Asset Generation",
      description:
        "Auto-generate code-styled thumbnails and cover images for every article.",
      component: <ThumbnailGeneration />,
    },
    {
      title: "Unified Author Identity",
      description:
        "Sync and manage author profiles across platforms. Build personal authority for every team member.",
      component: <AuthorManagement />,
    },
    {
      title: "Authority Tracking",
      description:
        "Visualize your domain authority growth. Track how your content strategy translates to real metrics.",
      component: <ProgressStats />,
      large: true,
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-24 md:py-32 relative overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-primary/20 rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
            <Zap className="w-3 h-3 fill-primary" />
            The Content Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            The Complete Authority Engine
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Everything you need to plan, track, and deliver on all your tasks
          </p>
        </div>

        {/* Feature Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <StaggerItem
              key={index}
              className={`
                ${
                  feature.large ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                } h-full`}
            >
              <Card className="border-[1px] border-gray-100 rounded-[32px] p-3 h-full">
                <div
                  className="shadow-none h-full overflow-hidden
                  bg-gradient-to-tr from-gray-50 to-[#f9f4f0]
                  p-4 rounded-3xl border-[1px] border-gray-100 cursor-pointer"
                >
                  <div
                    className={`${
                      feature.large
                        ? "grid md:grid-cols-2 gap-8 items-center"
                        : "col-span-2"
                    }`}
                  >
                    <div>
                      {/* Feature Visual */}
                      <div className="mb-6 bg-transparent rounded-2xl overflow-hidden">
                        {feature.component ? (
                          feature.component
                        ) : (
                          <div className="min-h-[180px] flex items-center justify-center bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6">
                            <p className="text-sm text-gray-400 font-inter">
                              Visual placeholder - {feature.title}
                            </p>
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold font-poppins mb-3 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground font-inter leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {feature.large && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 font-medium mb-1">
                            Project
                          </p>
                          <p className="text-sm font-semibold">
                            Surajondev Marketing Campaign
                          </p>
                        </div>
                        <SimpleBarChart />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
