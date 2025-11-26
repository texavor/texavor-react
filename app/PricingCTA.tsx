"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstace";
import { toast } from "sonner";
//@ts-ignore
import ct from "countries-and-timezones";

const PricingCTA = () => {
  const [email, setEmail] = useState("");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzInfo = ct.getTimezone(timezone);

  const joinWaitlist = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await axiosInstance.post("/waitlists", {
        email,
        country: ct?.getCountry(tzInfo?.countries?.[0])?.name,
      });
      setEmail("");
      toast?.success("You have been added to the waitlist!");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-32">
      <div className="bg-gradient-to-br from-[#104127] to-[#0d3620] rounded-xl p-12 md:p-16 text-center shadow-2xl">
        <h2 className="text-white font-bold text-4xl md:text-[48px] font-poppins mb-6">
          Ready to Dominate Search Rankings?
        </h2>
        <p className="text-white/90 font-normal font-inter text-lg max-w-2xl mx-auto mb-8">
          Join the waitlist and be among the first to access our AI-powered
          content strategy platform
        </p>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {[
            "Data-driven topic recommendations",
            "GEO & E-E-A-T optimization",
            "Competitor analysis included",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white">
              <Check className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-inter">{feature}</p>
            </div>
          ))}
        </div>

        {/* Email input */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-5 shadow-lg font-medium w-full focus-visible:ring-0 border-0 placeholder:text-[#AAAAAA] bg-white h-14 rounded-xl transition-all duration-300 hover:shadow-xl"
            />
            <Button
              onClick={joinWaitlist}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#104127] hover:bg-[#0d3620] rounded-xl h-10 px-6 transition-all duration-300 hover:shadow-md"
            >
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-white/70 text-xs font-inter mt-4">
            No credit card required • Early access pricing
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCTA;
