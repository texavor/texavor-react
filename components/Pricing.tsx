"use client";

import { Button } from "@/components/ui/button";
import { Check, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/pricing";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false); // Monthly is default

  return (
    <section
      id="pricing"
      className="w-full py-24 md:py-32 bg-white dark:bg-zinc-950 relative"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-full text-xs font-medium text-primary dark:text-emerald-400 mb-6 shadow-sm">
            <CreditCard className="w-3 h-3" />
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            Choose The Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto mb-8 leading-relaxed">
            Flexible options designed to match every team's workflow.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100/50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2">
              ✨ Start with a 14-day free trial
            </span>
          </div>

          {/* Monthly/Annual Checkbox using Tabs */}
          <div className="mb-2">
            <Tabs
              defaultValue="monthly"
              className="w-full max-w-[400px] flex flex-col items-center"
              onValueChange={(value) => setIsAnnual(value === "annual")}
            >
              <TabsList className="grid w-full grid-cols-2 rounded-full h-12 p-1 bg-gray-100 dark:bg-zinc-800">
                <TabsTrigger
                  value="monthly"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-primary dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm text-sm font-medium transition-all"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annual"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-primary dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm text-sm font-medium transition-all"
                >
                  Annual
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isAnnual && (
            <p className="text-xs text-primary dark:text-emerald-400 font-bold mt-2 animate-in fade-in slide-in-from-top-1">
              -20% off on annual payments
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto items-center">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => {
            const period = isAnnual ? tier.yearly : tier.monthly;
            const isRecommended = tier.recommended;

            return (
              <div
                key={key}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  isRecommended
                    ? "bg-white dark:bg-zinc-900 border-2 border-primary shadow-2xl md:scale-110 z-10"
                    : "bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-10 bg-primary rounded-t-[22px] flex items-center justify-center">
                    <span className="text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider">
                      Most Popular Plan
                    </span>
                  </div>
                )}

                {/* Adjust padding for recommended card due to header */}
                <div className={isRecommended ? "mt-4" : ""}>
                  {/* Plan Name */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-poppins mb-2 text-gray-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-sm font-inter text-gray-500 dark:text-zinc-400 min-h-[40px]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-poppins text-gray-900 dark:text-white">
                        ${period.price}
                      </span>
                      <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                        per month
                      </span>
                    </div>
                    {isAnnual && period.savings && (
                      <p className="text-xs font-medium mt-1 text-primary dark:text-emerald-400">
                        Save ${period.savings}/year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full py-6 rounded-xl font-semibold mb-8 transition-all shadow-none ${
                      isRecommended
                        ? "bg-primary text-white dark:text-zinc-950 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <Link
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                    >
                      {`Get ${tier.name}`}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  {/* Features */}
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                      What's included in {tier.name.toLowerCase()} plan:
                    </p>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2.5"
                        >
                          <div
                            className={`rounded-full p-0.5 mt-0.5 ${
                              isRecommended
                                ? "bg-primary/10 dark:bg-emerald-950/30 text-primary dark:text-emerald-400"
                                : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-500"
                            }`}
                          >
                            <Check
                              className={`w-3 h-3 ${
                                isRecommended
                                  ? "text-primary dark:text-emerald-400"
                                  : "text-gray-600 dark:text-zinc-400 font-bold"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-inter text-gray-600 dark:text-zinc-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
