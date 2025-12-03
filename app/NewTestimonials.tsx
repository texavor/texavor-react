"use client";

import TestimonialCard from "@/components/landing/TestimonialCard";

export default function NewTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Manager",
      company: "TechCorp",
      image: "",
      quote:
        "EasyWrite has transformed our content creation process. We're producing 3x more content in half the time. The AI is incredibly accurate and saves us hours of research.",
    },
    {
      name: "Michael Chen",
      role: "Freelance Writer",
      company: "",
      image: "",
      quote:
        "As a freelancer, time is money. EasyWrite helps me deliver high-quality articles to my clients faster than ever. The SEO optimization features are a game-changer.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthLabs",
      image: "",
      quote:
        "The keyword research and competitor analysis tools are phenomenal. We've seen a 150% increase in organic traffic since we started using EasyWrite.",
    },
    {
      name: "David Park",
      role: "Blogger",
      company: "",
      image: "",
      quote:
        "I was skeptical about AI writing, but EasyWrite proved me wrong. The content is natural, engaging, and requires minimal editing. It's like having a writing assistant 24/7.",
    },
    {
      name: "Lisa Thompson",
      role: "SEO Specialist",
      company: "Digital Boost",
      image: "",
      quote:
        "The built-in SEO tools are incredibly powerful. EasyWrite doesn't just write content—it helps you rank. Our clients are seeing real results.",
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      company: "InnovateTech",
      image: "",
      quote:
        "As a small team, we needed a solution that could scale with us. EasyWrite delivers enterprise-level content creation at a fraction of the cost.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full py-20 md:py-32 bg-gradient-to-b from-[var(--background)] to-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Loved by{" "}
            <span className="text-[var(--green-primary)]">
              Content Creators
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Join thousands of writers, marketers, and businesses who trust
            EasyWrite
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
