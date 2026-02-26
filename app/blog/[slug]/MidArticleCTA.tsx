"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MidArticleCTA() {
  return (
    <div className="my-10 not-prose">
      <div className="relative bg-card border border-border rounded-lg px-8 py-10 overflow-hidden flex flex-col sm:flex-row items-center sm:items-end gap-6 shadow-tx-sm">
        {/* Headline */}
        <div className="flex-1">
          <p className="tx-eyebrow mb-2">AI WORKFLOW</p>
          <h4 className="font-poppins text-2xl font-bold text-foreground leading-tight">
            Build authority. <span className="text-primary">Not just</span> traffic.
          </h4>
          <p className="font-inter text-sm text-muted-foreground mt-2 max-w-md">
            Implement the citation patterns that AI search engines like ChatGPT
            &amp; Claude prioritize.
          </p>
        </div>

        {/* CTA */}
        <Button
          asChild
          variant="brand"
          size="default"
          className="shrink-0 rounded-md h-11 px-8 font-semibold"
        >
          <Link href="/">Try Texavor Free</Link>
        </Button>
      </div>
    </div>
  );
}
