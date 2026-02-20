"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MidArticleCTA() {
  return (
    <div className="my-10 not-prose">
      <div className="relative bg-muted/60 border border-border rounded-xl px-8 py-10 overflow-hidden flex flex-col sm:flex-row items-center sm:items-end gap-6">
        {/* Decorative dots — top right */}
        <div className="absolute top-4 right-6 flex gap-1.5 opacity-30 pointer-events-none select-none">
          <span className="text-accent text-2xl leading-none">✦</span>
          <span className="text-primary text-base leading-none mt-2">✦</span>
        </div>
        {/* Decorative dot — bottom left */}
        <div className="absolute bottom-4 left-6 opacity-20 pointer-events-none select-none">
          <span className="text-accent text-xl leading-none">✦</span>
        </div>

        {/* Headline */}
        <div className="flex-1">
          <p className="font-poppins text-3xl font-bold text-foreground leading-tight">
            Get cited. <span className="text-primary">Not just</span>
            <br />
            ranked.
          </p>
          <p className="font-inter text-sm text-muted-foreground mt-2">
            Write content that ChatGPT, Perplexity &amp; Claude actually cite.
          </p>
        </div>

        {/* CTA */}
        <Button
          asChild
          variant="brand"
          size="default"
          className="shrink-0 rounded-md"
        >
          <Link href="/">Try Texavor Free</Link>
        </Button>
      </div>
    </div>
  );
}
