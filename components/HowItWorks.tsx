import Image from "next/image";
import { Plus, CheckCircle2 } from "lucide-react";

const FormMockup = () => (
  // Outer gray container
  <div className="w-full max-w-[280px] bg-[#f8f9f8] dark:bg-zinc-900/50 rounded-2xl border border-border/60 shadow-tx-sm mx-auto text-left relative z-10 overflow-hidden">
    {/* Inner white container matching the screenshot */}
    <div className="bg-card w-[85%] mx-auto h-full px-5 py-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-inter text-muted-foreground font-semibold">
            Name
          </label>
          <div className="w-full h-8 bg-background rounded-md border border-border flex items-center px-3 text-[10px] text-muted-foreground/70">
            Your name or company name
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-inter text-muted-foreground font-semibold">
            Website URL
          </label>
          <div className="w-full h-8 bg-background rounded-md border border-border flex items-center px-3 text-[10px] text-muted-foreground/70">
            https://example.com
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-inter text-muted-foreground font-semibold">
            Sitemap URL
          </label>
          <div className="w-full h-8 bg-background rounded-md border border-border flex items-center px-3 text-[10px] text-muted-foreground/70">
            https://example.com/sitemap.xml
          </div>
        </div>
        <div className="w-full h-10 bg-[#598370] hover:bg-[#466959] transition-colors cursor-pointer rounded-md text-white flex items-center justify-center text-xs font-bold mt-2 shadow-sm">
          Next
        </div>
      </div>
    </div>
  </div>
);

const TopicsMockup = () => {
  const topics = [
    {
      title:
        "Generative Engine Optimization: A Developer's Guide to AI-Driven Search",
      tag: "Guide",
    },
    {
      title: "How Generative AI is Reshaping SEO: A Technical Perspective",
      tag: "Analysis",
    },
    {
      title:
        "Optimizing for AI-Powered Search Engines: Best Practices for Developers",
      tag: "Tutorial",
    },
  ];

  return (
    <div className="w-full max-w-[300px] mx-auto text-left relative z-10 space-y-2.5">
      {topics.map((t, i) => (
        <div
          key={i}
          className="w-full bg-background rounded-lg p-3 border border-border flex items-start gap-2 shadow-tx-sm"
        >
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1.5 gap-2">
              <h4 className="text-[11px] font-bold text-foreground font-inter leading-snug">
                {t.title}
              </h4>
              <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[8px] font-medium rounded-full border border-emerald-100 dark:border-emerald-500/20 whitespace-nowrap mt-0.5">
                {t.tag}
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground line-clamp-1">
              Explore how generative engine optimization transforms search...
            </p>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#104127] dark:bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
            <Plus className="w-3 h-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

const IntegrationsMockup = () => (
  <div className="w-full max-w-[280px] mx-auto text-left relative z-10 space-y-3">
    {/* Hashnode Connected */}
    <div className="w-full bg-[#e6fbf1] dark:bg-emerald-950/30 rounded-xl p-4 border border-[#bbf3d6] dark:border-emerald-900/50 shadow-tx-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-blue-600/10">
            <Image
              src="/integration/hashnode.png"
              alt="Hashnode"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground font-poppins leading-none mb-1">
              Hashnode
            </div>
            <div className="text-[10px] text-muted-foreground font-inter">
              Rss Integration
            </div>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-background text-emerald-700 dark:text-emerald-400 text-[9px] rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 font-medium shadow-sm">
          <CheckCircle2 className="w-3 h-3" /> Connected
        </div>
      </div>
      <p className="text-[10px] text-emerald-800/80 dark:text-emerald-300/80 mb-3 leading-relaxed">
        Connect your Hashnode account to automatically import and sync articles.
      </p>
      <div className="w-full h-8 bg-[#008A52] rounded-md flex items-center justify-center text-white text-[11px] font-semibold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm">
        Manage
      </div>
    </div>

    {/* WordPress Disabled */}
    <div className="w-full bg-background rounded-xl p-4 border border-border shadow-tx-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 z-10 pointer-events-none" />
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-border">
          <Image
            src="/integration/wordpress.png"
            alt="WordPress"
            width={40}
            height={40}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <div className="text-sm font-bold text-foreground font-poppins leading-none mb-1">
            WordPress
          </div>
          <div className="text-[10px] text-muted-foreground font-inter">
            Api Integration
          </div>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        Connect your WordPress account to automatically import and sync
        articles.
      </p>
    </div>
  </div>
);

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell Us What You Built",
      description:
        "Just drop in your sitemap and a quick sentence about what your tool does. Our semantic engine will instantly map out the exact topics your competitors are leaving behind.",
      mockup: <FormMockup />,
    },
    {
      number: "02",
      title: "Find Your Missing Traffic",
      description:
        "We show you the exact questions people are asking AI about your niche that no one has answered yet. Click a button to draft an expert, data-heavy brief in seconds.",
      mockup: <TopicsMockup />,
    },
    {
      number: "03",
      title: "Publish Where Your Audience Read",
      description:
        "Stop fighting with five different CMS dashboards. Hit sync once, and your article goes live across Hashnode, Medium, and your own blog simultaneously.",
      mockup: <IntegrationsMockup />,
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-muted/40 tx-dot-bg border-b border-border relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight">
            Get started in 3 simple steps
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
            From connecting your domain to automating your editorial workflow in
            minutes.
          </p>
        </div>

        {/* Steps Grid - Flat Editorial Style */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-start text-left group">
              {/* Mockup Container */}
              <div className="w-full relative bg-muted/30 rounded-2xl mb-8 border border-border overflow-hidden flex items-center justify-center p-8 h-[360px]">
                {step.mockup}
                {/* Bottom fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none z-20" />
              </div>

              {/* Step Info */}
              <div className="flex flex-col items-start pr-4">
                <div className="text-[11px] font-bold font-inter text-accent mb-3 uppercase tracking-widest">
                  STEP {step.number}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 font-poppins">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
