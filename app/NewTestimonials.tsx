"use client";

import TestimonialCard from "@/components/landing/TestimonialCard";

export default function NewTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Manager",
      company: "TechCorp Inc.",
      image: "",
      quote:
        "Texavor has transformed our content creation process. We're now producing 3x more content in half the time. The AI accuracy is incredible—saved us 40+ hours of research per month.",
      metrics: "3x more content, 150% traffic increase"
    },
    {
      name: "Michael Chen",
      role: "Freelance Writer",
      company: "Self-employed",
      image: "",
      quote:
        "As a freelancer, time equals money. Texavor lets me deliver high-quality articles to clients 5x faster. I've increased my rates by 40% since using the SEO optimization features.",
      metrics: "5x faster delivery, 40% rate increase"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthLabs",
      image: "",
      quote:
        "The keyword research tools are phenomenal. We've seen a 150% increase in organic traffic in just 6 months. Texavor pays for itself through improved rankings alone.",
      metrics: "150% organic traffic growth, 6 months"
    },
    {
      name: "David Park",
      role: "Tech Blogger",
      company: "DevInsights",
      image: "",
      quote:
        "I was skeptical about AI writing, but Texavor proved me wrong. The content is natural, engaging, and requires minimal editing. My blog's readership doubled in 3 months.",
      metrics: "2x readership growth, 50+ articles published"
    },
    {
      name: "Lisa Thompson",
      role: "SEO Specialist",
      company: "Digital Boost Agency",
      image: "",
      quote:
        "Texavor doesn't just write content—it helps you rank. Our clients' average keyword ranking improved from 47th to 8th position within 60 days. Game-changing results.",
      metrics: "39-position ranking improvement, 60 days"
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      company: "InnovateTech",
      image: "",
      quote:
        "As a bootstrapped startup, we needed quality content without breaking the bank. Texavor delivers enterprise-level features at startup prices. Our blog traffic increased 300%.",
      metrics: "300% blog traffic, 80% cost savings"
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
            Texavor
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
