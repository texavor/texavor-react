"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstace";
import { toast } from "sonner";
//@ts-ignore
import ct from "countries-and-timezones";
import { motion } from "framer-motion";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      toast.error("Something went wrong. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative w-full overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#104127]/5 blur-[120px] rounded-full mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#D5E0FC]/20 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-emerald-50/50 blur-[80px] rounded-full mix-blend-multiply" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-emerald-100 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
              <Sparkles className="w-4 h-4 text-[#104127]" />
              <span className="text-sm font-semibold text-[#104127] tracking-wide">
                AI-Powered Content Strategy
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A2918] leading-[1.1]">
              Stop Guessing. <br className="hidden md:block" />
              <span className="relative inline-block text-[#104127]">
                Start Ranking
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#D5E0FC]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="opacity-60"
                  />
                </svg>
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              The AI content strategist for developers. Generate high-impact
              article ideas optimized for Google, AI Chatbots, and E-E-A-T.
            </p>
          </motion.div>

          {/* Input & CTA */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-md mx-auto pt-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#104127]/20 to-[#D5E0FC] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-white rounded-xl shadow-xl shadow-emerald-900/5 p-2 border border-emerald-50">
                <Input
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-none shadow-none focus-visible:ring-0 text-base h-12 bg-transparent placeholder:text-gray-400"
                />
                <Button
                  onClick={joinWaitlist}
                  className="h-12 px-6 bg-[#104127] hover:bg-[#0d3620] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#104127]" />
              No credit card required
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              Early access pricing
            </p>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="pt-12 flex flex-col items-center gap-4"
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Trusted by 10,000+ developers
            </p>
            <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder logos - replacing with simple circles for now if no assets */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Sparkles
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
