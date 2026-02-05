"use client";

import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Adam Kings",
      role: "Head of Engineering, Kingsy",
      quote:
        "Texavor replaced our janky notion-to-markdown scripts. Now we publish technical deep-dives to Dev.to and our blog in one click.",
    },
    {
      name: "John Deo",
      role: "DevRel Manager, Tripe",
      quote:
        "The competitor intelligence is scary good. I spotted a gap in 'React Server Components' content and we ranked #1 in two weeks.",
    },
    {
      name: "Leila Matt",
      role: "CTO, Senkt",
      quote:
        "Finally, an AI writer that understands code blocks. I don't have to fix indentation manually every time I generate a tutorial.",
    },
    {
      name: "Omar Stefan",
      role: "Senior Developer, Tripe",
      quote:
        "The author syncing is a lifesaver. I can build my personal brand on Hashnode while contributing to the company blog seamlessly.",
    },
    {
      name: "Maya Stone",
      role: "Technical Writer, Bard",
      quote:
        "Texavor helps me maintain a consistent tone across 20+ documentation pages. It's not just writing, it's strategy.",
    },
    {
      name: "Brima May",
      role: "VP of Content, Coptech",
      quote:
        "We scaled from 2 to 10 articles a week without losing quality. The E-E-A-T checks ensure we never publish fluff.",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
            <MessageSquare className="w-3 h-3" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            Why Teams Love Working With Texavor
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Real feedback from teams who simplified their workflow with Texavor.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
            >
              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed font-inter mb-6 text-sm">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center text-muted-foreground font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground font-poppins">
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
