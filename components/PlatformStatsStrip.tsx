"use client";

import { usePlatformStats } from "@/hooks/use-platform-stats";
import type { PlatformStats } from "@/lib/api/public-stats";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Compact number formatter: 5423100 → "5.4M" ─── */
const fmt = (n: number) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

/* ─── The 4 stats that hold up with real production numbers ─── */
function AnimatedCounter({
  value,
  formatFn,
  suffix,
}: {
  value: number;
  formatFn?: (n: number) => string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(
    formatFn ? formatFn(0) : fmt(0),
  );

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, value, {
      duration: 2, // 2-second count-up
      ease: "easeOut",
      onUpdate(current) {
        setDisplayValue(formatFn ? formatFn(current) : fmt(current));
      },
    });

    return () => controls.stop();
  }, [value, formatFn, isInView]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
const STAT_CONFIG: {
  key: keyof PlatformStats;
  label: string;
  suffix: string;
  format?: (n: number) => string;
  description: string;
}[] = [
  {
    key: "words_processed",
    label: "Words analyzed",
    suffix: "+",
    description: "Across every article on the platform",
  },
  {
    key: "articles_analyzed",
    label: "Articles scored",
    suffix: "+",
    description: "Run through full AI visibility analysis",
  },
  {
    key: "avg_content_score",
    label: "Avg content score",
    suffix: "/100",
    format: (n) => Math.round(n).toString(),
    description: "Average AI visibility score across all articles",
  },
  {
    key: "public_tool_uses",
    label: "Free tool uses",
    suffix: "+",
    description: "Writers using Texavor's free tools",
  },
];

function StatSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-6 md:py-8 px-6 md:px-8">
      <div className="h-8 w-20 rounded bg-muted animate-pulse" />
      <div className="h-4 w-28 rounded bg-muted animate-pulse mt-1" />
    </div>
  );
}

export default function PlatformStatsStrip() {
  const { data: stats, isLoading } = usePlatformStats();

  return (
    <section
      className="w-full border-y border-border bg-muted/40 tx-dot-bg relative overflow-hidden"
      aria-label="Live platform statistics"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <StatSkeleton key={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="col-span-full grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
              >
                {STAT_CONFIG.map(
                  ({ key, label, suffix, description, format }) => {
                    const raw = stats?.[key as keyof PlatformStats] as
                      | number
                      | undefined;
                    const formatted =
                      raw !== undefined
                        ? format
                          ? `${format(raw)}${suffix}`
                          : `${fmt(raw)}${suffix}`
                        : "—";

                    return (
                      <motion.div
                        key={String(key)}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={cn(
                          "flex flex-col gap-1 py-6 md:py-8 px-6 md:px-8",
                          "group",
                        )}
                      >
                        {/* Big number — counting up animation */}
                        <p className="font-mono font-bold text-3xl md:text-4xl text-foreground leading-none tabular-nums">
                          {raw !== undefined ? (
                            <AnimatedCounter
                              value={raw}
                              formatFn={format}
                              suffix={suffix}
                            />
                          ) : (
                            "—"
                          )}
                        </p>

                        {/* Stat name */}
                        <p className="text-sm font-semibold font-inter text-foreground/80 mt-1">
                          {label}
                        </p>

                        {/* Subtle description — hidden on mobile */}
                        <p className="text-xs font-inter text-muted-foreground leading-snug hidden md:block">
                          {description}
                        </p>
                      </motion.div>
                    );
                  },
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
