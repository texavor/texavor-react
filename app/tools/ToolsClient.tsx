"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  FileCode,
  Network,
  FileText,
  ArrowRight,
  MonitorCheck,
  Search,
  Code2,
  Clock,
  MessageSquareText,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Schema from "@/components/Schema";

import { categories, tools, getIconByName } from "@/lib/tools-config";
import { MoveUpRight } from "lucide-react";

export default function ToolsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category") || "all";

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredTools = tools.filter(
    (tool) => currentCategory === "all" || tool.category === currentCategory,
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.texavor.com/tools",
    url: "https://www.texavor.com/tools",
    name: "Free GEO Tools - Texavor",
    description:
      "Professional-grade free SEO and GEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
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
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <Schema script={schema} />
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/5 border border-primary/10">
            <span className="text-sm font-medium text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Professional GEO Utility Belt
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-poppins">
            Free{" "}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              GEO Tools
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-inter leading-relaxed">
            Professional-grade tools to audit, optimize, and grow your search
            presence. No credit card required.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative border border-transparent cursor-pointer",
                currentCategory === cat.slug
                  ? "bg-[#104127] text-white shadow-lg scale-105"
                  : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground",
              )}
            >
              {cat.name}
              {currentCategory === cat.slug && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#104127] -z-10 rounded-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const IconComponent = getIconByName(tool.iconName);
              return (
                <motion.div
                  key={tool.href}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={tool.href} className="group h-full block">
                    <Card className="h-full border-none shadow-lg bg-[#104127] text-white rounded-2xl relative overflow-hidden flex flex-col transition-all duration-300">
                      <div
                        className="absolute inset-0 opacity-100 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                        }}
                      />

                      <CardHeader className="pb-2 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-white/20 transition-transform group-hover:scale-110 duration-300">
                            <IconComponent className="w-6 h-6 text-emerald-100" />
                          </div>
                          <div className="p-2 rounded-full bg-white text-[#104127] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 hover:bg-emerald-50">
                            <MoveUpRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                            {
                              categories
                                .find((c) => c.slug === tool.category)
                                ?.name.split(" & ")[0]
                            }
                          </span>
                          <CardTitle className="text-xl font-bold font-poppins text-white">
                            {tool.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <CardDescription className="text-base font-inter line-clamp-3 text-emerald-100/80">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="relative z-10 pt-0 mt-auto">
                        <span className="text-sm font-semibold text-white flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Launch Tool <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="relative rounded-3xl overflow-hidden bg-[#104127] text-white p-12 md:p-16 text-center shadow-2xl w-full mx-auto">
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
              <Link href="/#pricing">
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
