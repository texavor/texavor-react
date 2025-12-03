"use client";

import FeatureCard from "@/components/landing/FeatureCard";
import { FileText, Search, Zap, TrendingUp, Users, Shield } from "lucide-react";

export default function NewFeatures() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Writing",
      description:
        "Generate high-quality, SEO-optimized content in seconds with our advanced AI engine. Save hours of writing time.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            AI
          </div>
        </div>
      ),
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Keyword Research",
      description:
        "Discover trending keywords and topics with built-in research tools. Stay ahead of your competition.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            SEO
          </div>
        </div>
      ),
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Content Templates",
      description:
        "Choose from dozens of proven templates for blogs, articles, social media, and more. Start writing instantly.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            DOCS
          </div>
        </div>
      ),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "SEO Optimization",
      description:
        "Built-in SEO tools ensure your content ranks higher. Get real-time suggestions as you write.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            RANK
          </div>
        </div>
      ),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with your team. Share drafts, leave comments, and manage workflows.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            TEAM
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Plagiarism Check",
      description:
        "Ensure originality with integrated plagiarism detection. Publish with confidence every time.",
      visual: (
        <div className="w-full h-40 bg-[var(--green-light)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--green-primary)]/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
            SAFE
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4 tracking-tight">
            Everything You Need to{" "}
            <span className="text-gradient">Create Amazing Content</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Powerful features designed to streamline your content creation
            workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                visual={feature.visual}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
