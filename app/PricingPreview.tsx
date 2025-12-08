"use client";

import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPreview() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 articles per month",
        "Basic AI writing",
        "Standard templates",
        "Community support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Most popular for content creators",
      features: [
        "Unlimited articles",
        "Advanced AI writing",
        "All templates & themes",
        "SEO optimization tools",
        "Priority support",
        "Team collaboration"
      ],
      cta: "Start Pro Trial",
      popular: true,
      savings: "Save 20% annually"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and large organizations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-[var(--background)] to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--green-light)] rounded-full text-sm font-medium text-[var(--green-primary)] w-fit mx-auto mb-4">
            <Star className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI writing features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-card border-2 transition-all duration-300 hover:shadow-card-hover animate-fade-in-up ${
                plan.popular
                  ? "border-[var(--green-primary)] scale-105"
                  : "border-border hover:border-[var(--green-primary)]/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[var(--green-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground font-poppins mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[var(--green-primary)] font-poppins">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
                {plan.savings && (
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {plan.savings}
                  </p>
                )}
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  plan.popular
                    ? "bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white"
                    : "bg-white border-2 border-[var(--green-primary)] text-[var(--green-primary)] hover:bg-[var(--green-light)]"
                }`}
                size="lg"
              >
                <Link href={plan.name === "Free" ? "/blog/new" : plan.name === "Enterprise" ? "/contact" : "/signup"}>
                  {plan.cta}
                  {plan.name === "Pro" && <Zap className="ml-2 w-4 h-4" />}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <Button
            asChild
            variant="ghost"
            className="text-[var(--green-primary)] hover:text-[var(--green-dark)]"
          >
            <Link href="/pricing">
              View detailed pricing →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
