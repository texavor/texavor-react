"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  FileCode,
  Network,
  FileText,
  ArrowRight,
  MonitorCheck,
  Search,
} from "lucide-react";
import { MoveUpRight } from "lucide-react";

const tools = [
  {
    title: "Domain Authority Checker",
    description:
      "Check your Domain Authority (DA), Backlinks, and Organic Traffic estimates instantly.",
    href: "/tools/brand-authority",
    icon: Globe,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "AI Visibility Calculator",
    description:
      "Measure your brand's visibility in AI Overviews (SGE) and Large Language Models.",
    href: "/tools/ai-visibility-calculator",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    gradient: "from-purple-500/20 to-indigo-500/5",
  },
  {
    title: "Website AI Auditor",
    description:
      "Technical audit for the AI era. Check Robots.txt, Sitemap, and Schema health.",
    href: "/tools/website-auditor",
    icon: MonitorCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    gradient: "from-blue-500/20 to-cyan-500/5",
  },
  {
    title: "FAQ Schema Generator",
    description:
      "Boost CTR instantly by generating valid JSON-LD FAQ Schema markup.",
    href: "/tools/faq-schema-generator",
    icon: FileCode,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    gradient: "from-orange-500/20 to-amber-500/5",
  },
  {
    title: "Topical Authority Map",
    description:
      "Visualize contextual relationships and build semantic authority for your niche.",
    href: "/tools/topical-authority",
    icon: Network,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    gradient: "from-pink-500/20 to-rose-500/5",
  },
  {
    title: "Content Quality Audit",
    description:
      "Analyze your content depth, keyword usage, and optimization score.",
    href: "/tools/content-audit",
    icon: FileText,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    gradient: "from-indigo-500/20 to-violet-500/5",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/5 border border-primary/10">
            <span className="text-sm font-medium text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Free SEO Utility Belt
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-poppins">
            Free{" "}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              AI SEO Tools
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-inter leading-relaxed">
            Professional-grade tools to audit, optimize, and grow your search
            presence. No credit card required.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group h-full">
              <Card className="h-full border-border/50 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 overflow-hidden relative group-hover:ring-1 group-hover:ring-primary/20">
                {/* Hover Gradient Background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${tool.gradient}`}
                />

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl ${tool.bg} ${tool.color} transition-transform group-hover:scale-110 duration-300`}
                    >
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="p-2 rounded-full bg-slate-50 dark:bg-zinc-800 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <MoveUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold font-poppins group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base font-inter line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="relative z-10 pt-0 mt-auto">
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Launch Tool <ArrowRight className="w-4 h-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="relative rounded-3xl overflow-hidden bg-[#104127] text-white p-12 md:p-16 text-center shadow-2xl max-w-4xl mx-auto">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, #34d399 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">
                Looking for deeper insights?
              </h2>
              <p className="text-lg text-emerald-100/90 max-w-xl mx-auto font-inter">
                Get access to advanced competitor analysis, unlimited checks,
                and historical data with Texavor Pro.
              </p>
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-emerald-800 hover:bg-emerald-50 text-lg h-12 px-8 shadow-xl mt-4"
                >
                  View Pricing Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
