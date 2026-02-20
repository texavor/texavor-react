"use client";

import { MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      stat: "312%",
      statLabel: "AI citations in 8 weeks",
      quote:
        "Texavor replaced our janky notion-to-markdown scripts. We fixed 3 articles and citations appeared in Perplexity within 2 weeks.",
      name: "Adam Kings",
      role: "Head of Engineering, Kingsy",
      avatarSeed: 11,
    },
    {
      stat: "#1",
      statLabel: "Rank in 14 days",
      quote:
        "The competitor intelligence is scary good. I spotted a gap in 'React Server Components' content and we ranked #1 in two weeks without backlinks.",
      name: "John Deo",
      role: "DevRel Manager, Tripe",
      avatarSeed: 22,
    },
    {
      stat: "0",
      statLabel: "Formatting errors",
      quote:
        "Finally, an AI writer that understands code blocks. I don't have to fix Markdown indentation manually every time I generate a tutorial.",
      name: "Leila Matt",
      role: "CTO, Senkt",
      avatarSeed: 33,
    },
    {
      stat: "5x",
      statLabel: "Faster publishing",
      quote:
        "The author syncing is a lifesaver. I can build my personal brand on Hashnode while contributing to the company blog seamlessly from one dashboard.",
      name: "Omar Stefan",
      role: "Senior Developer, Tripe",
      avatarSeed: 44,
    },
    {
      stat: "100%",
      statLabel: "Tone consistency",
      quote:
        "Texavor helps me maintain a consistent technical tone across 20+ documentation pages. It's not just an editor, it's an editorial strategy.",
      name: "Maya Stone",
      role: "Technical Writer, Bard",
      avatarSeed: 55,
    },
    {
      stat: "10x",
      statLabel: "Content velocity",
      quote:
        "We scaled from 2 to 10 technical guides a week without losing accuracy. The deep research checks ensure we never publish hallucinations.",
      name: "Brima May",
      role: "VP of Content, Coptech",
      avatarSeed: 65,
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full py-24 md:py-32 bg-background tx-dot-bg border-b border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              RESULTS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight max-w-2xl">
            Why Teams Choose Texavor
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
            Real outcomes from engineering and content teams who stopped
            fighting algorithms.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 border border-border shadow-tx-sm hover:bg-muted/20 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl font-bold font-poppins text-primary tracking-tight mb-2">
                  ↑ {testimonial.stat}
                </div>
                <div className="text-sm font-semibold text-muted-foreground font-inter tracking-wide mb-8">
                  {testimonial.statLabel}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-inter italic mb-8">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border shadow-sm">
                  <Image
                    src={`https://i.pravatar.cc/72?img=${testimonial.avatarSeed}`}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground font-poppins leading-tight">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-inter">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
