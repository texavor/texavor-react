"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/pricing";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false); // Monthly is default

  return (
    <section
      id="pricing"
      className="w-full py-24 md:py-32 bg-muted/40 border-b border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Left-Aligned Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-muted-foreground">
              PRICING
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight">
            Invest in your AI Visibility.
          </h2>
          <p className="text-lg font-inter text-muted-foreground leading-relaxed">
            Transparent scaling for teams serious about Semantic SEO and
            Generative Engine Optimization.
          </p>
        </div>

        {/* Centered Toggle Above Cards */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center">
            <Tabs
              defaultValue="monthly"
              className="w-[280px]"
              onValueChange={(value) => setIsAnnual(value === "annual")}
            >
              <TabsList className="grid w-full grid-cols-2 rounded-lg h-12 p-1.5 bg-background border border-border">
                <TabsTrigger
                  value="monthly"
                  className="rounded-md data-[state=active]:bg-[#1d533f] dark:data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-sm font-bold font-inter transition-all text-muted-foreground"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annual"
                  className="rounded-md data-[state=active]:bg-[#1d533f] dark:data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-sm font-bold font-inter transition-all text-muted-foreground"
                >
                  Annually
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div
              className={`mt-3 text-[11px] font-bold font-inter text-[#1d533f] dark:text-emerald-400 uppercase tracking-widest bg-[#1d533f]/10 dark:bg-emerald-400/10 px-3 py-1 rounded transition-opacity duration-300 ${isAnnual ? "opacity-100" : "opacity-0"}`}
            >
              Save 20% on Annual
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => {
            const period = isAnnual ? tier.yearly : tier.monthly;
            const isRecommended = tier.recommended;

            return (
              <div
                key={key}
                className={`flex flex-col relative transition-all duration-300 bg-card rounded-xl ${isRecommended ? "" : "pt-[2px] mt-10 border border-border/60"}`}
              >
                {/* Most Popular Hat */}
                {isRecommended && (
                  <div className="h-10 w-full bg-[#1d533f] dark:bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold uppercase tracking-widest rounded-t-xl transition-colors duration-300">
                    Most Popular
                  </div>
                )}

                <div
                  className={`flex-1 p-6 md:p-8 flex flex-col transition-all duration-300 ${
                    isRecommended
                      ? "border-x border-b border-[#1d533f] dark:border-emerald-600 rounded-b-xl shadow-tx-md"
                      : ""
                  }`}
                >
                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm font-inter text-muted-foreground min-h-[40px] max-w-[200px] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black font-poppins text-foreground tracking-tight">
                        ${period.price}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground font-inter mb-1">
                        /mo
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full h-11 rounded font-bold font-inter mb-10 transition-all ${
                      isRecommended
                        ? "bg-[#1d533f] dark:bg-emerald-600 text-white hover:bg-[#1d533f]/90 dark:hover:bg-emerald-600/90"
                        : "bg-muted/60 text-foreground hover:bg-muted"
                    }`}
                    variant={isRecommended ? "default" : "secondary"}
                  >
                    <Link
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/register?plan=${tier.name.toLowerCase()}`}
                      target="_blank"
                      data-umami-event="pricing_select_plan"
                      data-umami-event-plan={tier.name}
                    >
                      {`Get ${tier.name}`}
                    </Link>
                  </Button>

                  {/* Features list */}
                  <ul className="space-y-4 pt-8 border-t border-border/60">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check
                          className="w-[16px] h-[16px] text-amber-500 shrink-0 mt-[2px]"
                          strokeWidth={3}
                        />
                        <span className="text-[14px] font-inter text-foreground/80 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
