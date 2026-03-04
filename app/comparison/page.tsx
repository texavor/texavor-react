import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Target,
  RefreshCw,
  Search,
  ShoppingCart,
  Shield,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";
import { ComparisonTable } from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "Texavor vs The Market | Competitor Comparison",
  description:
    "Compare Texavor against RankPill, AI Writers like Jasper, and SEO Tools like Surfer. Discover why we are the only Content Operating System designed for dev teams.",
};

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans mt-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 mb-4">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Texavor vs. The Market
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary dark:text-white font-poppins">
              Stop Buying <span className="text-emerald-600">Tools</span>.
              <br />
              Start Using an <span className="text-emerald-600">OS</span>.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-inter max-w-2xl mx-auto leading-relaxed">
              Most tools are just{" "}
              <span className="font-semibold text-primary dark:text-zinc-200">
                Writers
              </span>{" "}
              or{" "}
              <span className="font-semibold text-primary dark:text-zinc-200">
                Optimizers
              </span>
              . Texavor is the{" "}
              <span className="text-emerald-600 font-bold">
                Content Operating System
              </span>{" "}
              that manages the entire lifecycle.
            </p>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <ComparisonTable />
        </div>
      </section>

      {/* Detailed Breakdowns */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-6xl space-y-32">
          {/* Comparison 1: RankPill */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" /> vs. Mass Generators
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-poppins">
                Quality Over Quantity.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tools like RankPill optimize for <strong>volume</strong>—pumping
                out thousands of generic words to game Google. Texavor optimises
                for <strong>authority</strong>. We build technically accurate
                guides that developers actually respect.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      Developer Ecosystem
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      We post to Dev.to, Hashnode, and Medium. They only post to
                      WordPress.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      Anti-Decay System
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      They help you publish. We help you stay relevant with
                      Freshness Scores.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl dark:opacity-30" />
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <span className="font-semibold text-zinc-500">
                      The "Rot" Problem
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                      <div className="shrink-0">
                        <X className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 dark:text-red-300">
                          Competitors
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                          "How to use React" article written in 2022. <br />
                          <span className="italic opacity-80">
                            Result: 404 links, deprecated code, lost traffic.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                      <div className="shrink-0">
                        <RefreshCw className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-300">
                          Texavor
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                          Auto-scans for outdated libraries and broken links.{" "}
                          <br />
                          <span className="italic opacity-80">
                            Result: Content stays fresh, traffic stays high.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison 2: AI Writers */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl dark:opacity-30" />
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative h-full flex flex-col justify-center text-center">
                <div className="space-y-2">
                  <p className="text-zinc-500 font-medium tracking-wider uppercase text-sm">
                    Typical Workflow
                  </p>
                  <div className="flex items-center justify-center gap-4 text-zinc-400">
                    <span className="line-through">Copy</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="line-through">Format</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="line-through">Embed</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="line-through">Publish</span>
                  </div>
                </div>
                <div className="my-8 h-px bg-zinc-100 dark:bg-zinc-800 w-full" />
                <div className="space-y-2">
                  <p className="text-emerald-600 font-bold tracking-wider uppercase text-sm">
                    Texavor Workflow
                  </p>
                  <div className="text-2xl font-bold text-primary dark:text-white">
                    One Click Sync.
                  </div>
                  <p className="text-sm text-zinc-500">
                    To Shopify, Medium, Dev.to, Hashnode, WordPress.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" /> vs. AI Writers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-poppins">
                Don't Just Write. Deploy.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Generators like Jasper leave you with a text file. You still
                have the heavy lifting of distribution. Texavor is "Write Once,
                Publish Everywhere."
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      Fact-Checking Agent
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      We browse the live web for citations. LLMs hallucinate
                      based on 2023 data.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      Canonical Safety
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      We handle `canonical_url` tags automatically so you can
                      cross-post without SEO penalties.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison 3: SEO Tools */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                <Search className="w-4 h-4" /> vs. SEO Tools
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-poppins">
                Action, Not Just Scores.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                SEO tools give you a grade and tell you to fix it. Texavor{" "}
                <strong>is the fix</strong>. We actively monitor your published
                articles and provide the tools to update them directly.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      AI Content Workflows
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Specific tools for Brand Authority and FAQ Schema designed
                      for AI Search (Perplexity, ChatGPT), not just Google.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">
                      Direct Integration
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Update content from the dashboard. Don't copy-paste back
                      and forth between Surfer and WordPress.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl dark:opacity-30" />
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                      Content Assurance
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Automated monitoring
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Technical Accuracy
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      98%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Code Validity
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      Pass
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Schema Markup
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      Valid
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Killer Features - Bento Grid Redesign */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white font-poppins">
              The <span className="text-emerald-600">OS</span> Advantage
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Why technical teams choose an Operating System over disconnected
              tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {/* Feature 1: Freshness (Large Span) */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Freshness Score
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                  We don't just publish content; we keep it alive. Our engine
                  monitors your tutorials for broken links, deprecated npm
                  packages, and outdated screenshots 24/7.
                </p>
              </div>

              {/* Abstract UI Visualization */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:block pointer-events-none">
                <div className="absolute inset-y-8 right-8 w-64 bg-zinc-50 dark:bg-zinc-900 shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform duration-500 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-zinc-400">
                      HEALTH SCORE
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                      98/100
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%]"></div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Links Validated
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Code Blocks Run
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Validated Research (Tall) */}
            <div className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col hover:shadow-md transition-shadow">
              <div className="space-y-4 relative z-10 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Agentic Research
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No hallucinations. Our deep-research agents browse the live
                  web, read API documentation, and cite sources before writing a
                  single word.
                </p>
              </div>

              <div className="mt-auto relative w-full h-48 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50 p-4 overflow-hidden group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                    agent_browsing...
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                </div>
                <div className="mt-4 p-2 bg-white dark:bg-zinc-950 rounded border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-zinc-500">
                      SOURCE
                    </span>
                    <span className="text-[10px] text-zinc-400 truncate">
                      react.dev/reference/react/use
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Commerce (Medium) */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-shadow">
              <div className="space-y-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Native Commerce
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Turn your documentation into a sales channel. Embed live
                  Shopify products directly into your technical guides with zero
                  friction.
                </p>
              </div>

              <div className="flex-1 w-full max-w-xs">
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-sm transform group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-24 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-3 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-zinc-300" />
                  </div>
                  <div className="h-4 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded mb-2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-1/3 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                    <div className="h-6 w-16 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white font-poppins tracking-tight">
              Ready to upgrade your content stack?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Join the technical teams who have switched from flexible tools to
              a dedicated operating system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-14 px-8 shadow-xl shadow-emerald-500/20"
              >
                <Link
                  href={process.env.NEXT_PUBLIC_APP_URL || "/"}
                  target="_blank"
                >
                  Start Trial
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-zinc-200 dark:border-zinc-800 h-14 px-8 text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <Link href="/docs/introduction">Read the Docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
