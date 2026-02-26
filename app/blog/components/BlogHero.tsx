import Link from "next/link";

interface BlogHeroProps {
  articleCount?: number;
}

export default function BlogHero({ articleCount }: BlogHeroProps) {
  return (
    <section className="w-full py-20 md:py-28 bg-background tx-dot-bg border-b border-border relative overflow-hidden">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="max-w-3xl animate-fade-slide-up">
          {/* Eyebrow */}
          <p className="tx-eyebrow mb-5">THE BLOG</p>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-foreground tracking-tight leading-[1.05] mb-6">
            Insights on AI <span className="text-primary">Content Strategy.</span>
          </h1>

          {/* Description */}
          <p className="text-xl font-inter text-muted-foreground leading-relaxed max-w-2xl mb-8">
            Guides, research, and strategy for creating structured content that
            audiences and AI engines (ChatGPT, Perplexity, Claude) actually trust.
          </p>

          {/* Article count stat — amber accent */}
          {articleCount !== undefined && articleCount > 0 && (
            <div className="flex items-center gap-2 text-sm font-inter text-muted-foreground">
              <span className="text-accent font-mono font-bold text-base">
                {articleCount}
              </span>
              <span>articles published</span>
              <span className="text-border">·</span>
              <span>growing weekly</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
