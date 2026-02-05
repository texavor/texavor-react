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
import Schema from "@/components/Schema";

const tools = [
  {
    title: "Domain Authority Checker",
    description:
      "Check your Domain Authority (DA), Backlinks, and Organic Traffic estimates instantly.",
    href: "/tools/brand-authority",
    icon: Globe,
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "AI Visibility Calculator",
    description:
      "Analyze keyword rankings in AI Overviews (SGE) and optimize for Large Language Models.",
    href: "/tools/ai-visibility-calculator",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-indigo-500/5",
  },
  {
    title: "Website AI Auditor",
    description:
      "Technical audit for the AI era. Check Robots.txt, Sitemap, and Schema health.",
    href: "/tools/website-auditor",
    icon: MonitorCheck,
    gradient: "from-blue-500/20 to-cyan-500/5",
  },
  {
    title: "FAQ Schema Generator",
    description:
      "Boost CTR instantly by generating valid JSON-LD FAQ Schema markup.",
    href: "/tools/faq-schema-generator",
    icon: FileCode,
    gradient: "from-orange-500/20 to-amber-500/5",
  },
  {
    title: "Topical Authority Map",
    description:
      "Visualize contextual relationships and build semantic authority for your niche.",
    href: "/tools/topical-authority",
    icon: Network,
    gradient: "from-pink-500/20 to-rose-500/5",
  },
  {
    title: "Content Quality Audit",
    description:
      "Analyze your content depth, keyword usage, and optimization score.",
    href: "/tools/content-audit",
    icon: FileText,
    gradient: "from-indigo-500/20 to-violet-500/5",
  },
  {
    title: "AEO Schema Validator",
    description:
      "Validate your Schema Markup for Answer Engine Optimization (AEO) and AI Search readiness.",
    href: "/tools/aeo-schema-validator",
    icon: Sparkles,
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
];

export const metadata = {
  title: "Free AEO & SEO Tools | Texavor",
  description:
    "Professional-grade free SEO and AEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
  openGraph: {
    title: "Free AEO & SEO Tools | Texavor",
    description:
      "Professional-grade free SEO and AEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
  },
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.texavor.com/tools",
    url: "https://www.texavor.com/tools",
    name: "Free AEO and SEO Tools - Texavor",
    description:
      "Professional-grade free SEO and AEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.texavor.com",
      url: "https://www.texavor.com",
      name: "Texavor",
    },
    author: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.description,
        url: `https://www.texavor.com${tool.href}`,
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    })),
  };

  return (
    <div className="min-h-screen font-sans mt-32">
      <Schema script={schema} />
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
              AEO and SEO Tools
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
              <Card className="h-full border-none shadow-lg bg-primary dark:bg-card text-white dark:text-foreground rounded-2xl relative overflow-hidden flex flex-col transition-all duration-300">
                {/* Dynamic Background */}
                <div
                  className="absolute inset-0 opacity-100 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                  }}
                />

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white/10 dark:bg-primary/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-white/20 dark:border-primary/30 transition-transform group-hover:scale-110 duration-300">
                      <tool.icon className="w-6 h-6 text-emerald-100 dark:text-primary" />
                    </div>
                    <div className="p-2 rounded-full bg-white dark:bg-primary text-[#104127] dark:text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 hover:bg-emerald-50">
                      <MoveUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold font-poppins text-white dark:text-foreground">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base font-inter line-clamp-3 text-emerald-100/80 dark:text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="relative z-10 pt-0 mt-auto">
                  <span className="text-sm font-semibold text-white dark:text-primary flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Launch Tool <ArrowRight className="w-4 h-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="relative rounded-3xl overflow-hidden bg-primary dark:bg-card text-white dark:text-foreground p-12 md:p-16 text-center shadow-2xl w-full mx-auto border border-primary/20">
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
              <p className="text-lg text-emerald-100/90 dark:text-muted-foreground max-w-xl mx-auto font-inter">
                Get access to advanced competitor analysis, unlimited checks,
                and historical data with Texavor Pro.
              </p>
              <Link href="/#pricing">
                <Button
                  size="lg"
                  className="bg-white dark:bg-primary text-emerald-800 dark:text-primary-foreground hover:bg-emerald-50 dark:hover:bg-primary/90 text-lg h-12 px-8 shadow-xl mt-4"
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
