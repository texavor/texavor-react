"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Schema from "@/components/Schema";

import { categories, tools, getIconByTitle } from "@/lib/tools-config";

export default function ToolsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams?.get("category") || "all";

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString());
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
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      <Schema script={schema} />

      {/* Hero — left-aligned editorial */}
      <section className="w-full pt-20 pb-16 md:pt-28 md:pb-24 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE TOOLS</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              GEO & SEO Tools, <span className="text-primary">no paywall</span>
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Professional-grade tools to audit, optimize, and grow your search
              presence. No credit card required.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto py-16 md:py-20 pb-24">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={cn(
                "relative px-5 py-1.5 rounded-sm text-sm font-medium transition-colors duration-200 cursor-pointer border",
                currentCategory === cat.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30",
              )}
            >
              {cat.name}
              {currentCategory === cat.slug && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary -z-10 rounded-sm"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const IconComponent = getIconByTitle(tool?.title);
              return (
                <motion.div
                  key={tool.href}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={tool.href} className="group h-full block">
                    <div className="h-full bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300">
                      {/* Icon + arrow row */}
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-200">
                          <IconComponent className="w-5 h-5 text-primary group-hover:text-foreground transition-colors duration-200" />
                        </div>
                        <MoveUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <h3 className="font-poppins text-base font-bold text-foreground">
                          {tool?.title}
                        </h3>
                        <p className="font-inter text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {tool?.description}
                        </p>
                      </div>

                      {/* Footer — always visible */}
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground tracking-wide font-inter transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full max-w-max">
                        Open tool{" "}
                        <ArrowRight className="w-3.5 h-3.5 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-20">
          <div className="relative bg-primary/5 border border-primary/20 rounded-xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
              <h2 className="font-poppins text-2xl md:text-3xl font-bold text-foreground mb-3">
                These tools are just the start.
              </h2>
              <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed">
                Texavor gives you the full research stack — competitor analysis,
                content scoring, link suggestions, and GEO-optimized article
                drafts. All in one workspace.
              </p>
            </div>
            <Button
              asChild
              variant="brand"
              size="lg"
              className="shrink-0 rounded-md"
            >
              <Link href="/#pricing">See Plans →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
