import React from "react";
import {
  IconDomainAuthority,
  IconAIVisibility,
  IconWebsiteAuditor,
  IconFAQSchema,
  IconTopicalAuthority,
  IconContentQuality,
  IconGEOSchema,
  IconHeadingChecker,
  IconCitationAuthority,
  IconSchemaMarkup,
  IconAltText,
  IconFreshness,
  IconEntityDensity,
  IconCitationOpps,
  IconDirectAnswer,
} from "@/components/icons/ToolIcons";

export interface ToolCategory {
  name: string;
  slug: string;
}

export interface Tool {
  title: string;
  description: string;
  href: string;
  iconName: string;
  category: string;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export const categories: ToolCategory[] = [
  { name: "All Tools", slug: "all" },
  { name: "AI Visibility & GEO", slug: "ai-aeo" },
  { name: "Authority & E-E-A-T", slug: "authority" },
  { name: "Content Optimization", slug: "content" },
  { name: "Technical & Schema", slug: "technical" },
];

export const tools: Tool[] = [
  {
    title: "Domain Authority Checker",
    description:
      "Check your Domain Authority (DA), Backlinks, and Organic Traffic estimates instantly.",
    href: "/tools/brand-authority",
    iconName: "Globe",
    category: "authority",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "AI Visibility Calculator",
    description:
      "Analyze keyword rankings in AI Overviews (SGE) and optimize for Large Language Models.",
    href: "/tools/ai-visibility-calculator",
    iconName: "Sparkles",
    category: "ai-aeo",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Website AI Auditor",
    description:
      "Technical audit for the AI era. Check Robots.txt, Sitemap, and Schema health.",
    href: "/tools/website-auditor",
    iconName: "MonitorCheck",
    category: "technical",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "FAQ Schema Generator",
    description:
      "Boost CTR instantly by generating valid JSON-LD FAQ Schema markup.",
    href: "/tools/faq-schema-generator",
    iconName: "FileCode",
    category: "technical",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Topical Authority Map",
    description:
      "Visualize contextual relationships and build semantic authority for your niche.",
    href: "/tools/topical-authority",
    iconName: "Network",
    category: "ai-aeo",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Content Quality Audit",
    description:
      "Analyze your content depth, keyword usage, and optimization score.",
    href: "/tools/content-audit",
    iconName: "FileText",
    category: "content",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "GEO Schema Validator",
    description:
      "Validate your Schema Markup for Generative Engine Optimization (GEO) and AI Search readiness.",
    href: "/tools/aeo-schema-validator",
    iconName: "Sparkles",
    category: "technical",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "GEO Heading Structure Checker",
    description:
      "Validate HTML heading hierarchy (H1-H6). Fix skipped levels and missing H1s to improve GEO & accessibility.",
    href: "/tools/geo-heading-structure-checker",
    iconName: "LayoutDashboard",
    category: "content",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Citation Authority Checker",
    description:
      "Audit external links, score citation authority (.edu/.gov), detect weak claims, and boost E-E-A-T compliance.",
    href: "/tools/citation-authority-checker",
    iconName: "FileCode",
    category: "authority",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Schema Markup Validator",
    description:
      "Validate structured data (JSON-LD, Microdata) for Google Search Console errors. Test Article, Product, FAQ, and more.",
    href: "/tools/schema-validator",
    iconName: "Code2",
    category: "technical",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Alt Text Checker",
    description:
      "Audit images for WCAG compliance and Google Lens optimization. Find missing alt text, duplicates, and get AI suggestions.",
    href: "/tools/alt-text-checker",
    iconName: "Search",
    category: "content",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Content Freshness Checker",
    description:
      "Detect content decay, find outdated statistics and get update recommendations. Check publish dates and freshness signals.",
    href: "/tools/content-freshness-checker",
    iconName: "Clock",
    category: "content",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Entity Density Analyzer",
    description:
      "Analyze entity salience and optimize for semantic SEO. Detect knowledge graph opportunities and get schema markup tips.",
    href: "/tools/entity-density-analyzer",
    iconName: "Network",
    category: "ai-aeo",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Citation Opportunities Finder",
    description:
      "Identify where citations should be added to improve E-E-A-T and content credibility.",
    href: "/tools/citation-opportunities",
    iconName: "FileText",
    category: "authority",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Direct Answer Optimizer",
    description:
      "Win the featured snippet and rank for Position Zero. Optimize structure for direct answers and AI search snippets.",
    href: "/tools/featured-snippet-optimizer",
    iconName: "MessageSquareText",
    category: "ai-aeo",
    priority: 0.9,
    changeFrequency: "weekly",
  },
];

export const getIconByTitle = (title: string): React.ElementType => {
  const customMap: Record<string, React.ElementType> = {
    "Domain Authority Checker": IconDomainAuthority,
    "AI Visibility Calculator": IconAIVisibility,
    "Website AI Auditor": IconWebsiteAuditor,
    "FAQ Schema Generator": IconFAQSchema,
    "Topical Authority Map": IconTopicalAuthority,
    "Content Quality Audit": IconContentQuality,
    "GEO Schema Validator": IconGEOSchema,
    "GEO Heading Structure Checker": IconHeadingChecker,
    "Citation Authority Checker": IconCitationAuthority,
    "Schema Markup Validator": IconSchemaMarkup,
    "Alt Text Checker": IconAltText,
    "Content Freshness Checker": IconFreshness,
    "Entity Density Analyzer": IconEntityDensity,
    "Citation Opportunities Finder": IconCitationOpps,
    "Direct Answer Optimizer": IconDirectAnswer,
  };

  return customMap[title] || IconDomainAuthority;
};
