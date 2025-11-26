"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstace";
import { toast } from "sonner";
//@ts-ignore
import ct from "countries-and-timezones";

const FinalCTA = () => {
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
    <div className="w-full mt-32 mb-20">
      <div className="bg-white rounded-xl p-12 md:p-16 text-center shadow-md border border-[#E6E6E6]">
        <h2 className="text-[#0A2918] font-bold text-3xl md:text-[42px] font-poppins mb-4">
          Stop Guessing. Start Ranking.
        </h2>
        <p className="text-[#7A7A7A] font-normal font-inter text-lg max-w-2xl mx-auto mb-8">
          Join thousands of technical content creators who are already using
          data-driven strategies to dominate search results.
        </p>

        {/* Email input */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-5 shadow-md font-medium w-full focus-visible:ring-0 border-0 placeholder:text-[#AAAAAA] bg-[#F9F9F9] h-14 rounded-xl transition-all duration-300 hover:shadow-lg"
            />
            <Button
              onClick={joinWaitlist}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#104127] hover:bg-[#0d3620] rounded-xl h-10 px-6 transition-all duration-300 hover:shadow-md"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
