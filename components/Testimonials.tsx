"use client";

import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Adam Kings",
      role: "Founder, Kingsy",
      quote:
        "Texavor replaced three different tools we were using. Now our projects, chats, and tasks actually live in one place, my team loves it.",
    },
    {
      name: "John Deo",
      role: "Project Manager, Tripe",
      quote:
        "Onboarding was effortless. I invited my team and within minutes we were collaborating like we'd been using it for months.",
    },
    {
      name: "Leila Matt",
      role: "Marketing Director, Senkt",
      quote:
        "The app integrations are a game changer. We no longer have to change our workflow Texavor just made it flow better for the team.",
    },
    {
      name: "Omar Stefan",
      role: "Project Manager, Tripe",
      quote:
        "Our productivity jumped because Texavor brings all our tools into one place. No more hopping around tasks.",
    },
    {
      name: "Maya Stone",
      role: "Teacher, Bard",
      quote:
        "Finally, a tool that doesn't overwhelm my team. Texavor just works, clean, fast, and simple.",
    },
    {
      name: "Brima May",
      role: "Integrations, Coptech",
      quote:
        "Before Texavor, things slipped through the cracks. Now every task has an owner and nothing gets lost.",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
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
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Quote */}
              <p className="text-gray-700 leading-relaxed font-inter mb-6 text-sm">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900 font-poppins">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500 font-inter">
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
