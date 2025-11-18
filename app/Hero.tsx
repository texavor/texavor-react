"use client";
import Image from "next/image";
import { ChartContainer } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstace";
import { toast } from "sonner";
//@ts-ignore
import ct from "countries-and-timezones";

interface ChartData {
  month: string;
  desktop: number;
}

interface LineWidth {
  value: number;
}

const Hero = () => {
  const [email, setEmail] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [lineWidth, setLineWidth] = useState<LineWidth[]>([
    { value: Math.floor(Math.random() * 99) + 10 },
    { value: Math.floor(Math.random() * 99) + 10 },
    { value: Math.floor(Math.random() * 99) + 10 },
  ]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#D5E0FC",
    },
  };

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzInfo = ct.getTimezone(timezone);
  // 🧠 Generate random chart data every 5 seconds
  const FetchData = () => {
    setChartData([
      { month: "January", desktop: Math.floor(Math.random() * 99) + 10 },
      { month: "February", desktop: Math.floor(Math.random() * 99) + 10 },
      { month: "March", desktop: Math.floor(Math.random() * 99) + 10 },
      { month: "April", desktop: Math.floor(Math.random() * 99) + 10 },
      { month: "May", desktop: Math.floor(Math.random() * 99) + 10 },
      { month: "June", desktop: Math.floor(Math.random() * 99) + 10 },
    ]);
    setLineWidth([
      { value: Math.floor(Math.random() * 99) + 10 },
      { value: Math.floor(Math.random() * 99) + 10 },
      { value: Math.floor(Math.random() * 99) + 10 },
    ]);
    setTimeout(FetchData, 5000);
  };

  useEffect(() => {
    FetchData();
  }, []);

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
      console.log(tzInfo);
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
    <div className="space-y-6 mt-16 relative">
      <div className="md:w-[70%] md:mx-auto text-center space-y-6">
        <div className="text-[#0A2918] text-5xl md:text-[76px] font-bold leading-tight">
          <div className="relative inline-block font-poppins">
            <div className="absolute -bottom-30 -left-10 w-40 h-20 mr-4 hidden md:block">
              <Image
                src="/curved-dashed-line-left.svg"
                alt="curved dashed line"
                layout="fill"
              />
            </div>
            Stop Guessing. Start{" "}
          </div>
          <div className="relative inline-block">
            <span className="relative z-10">Ranking</span>
            <div className="absolute -bottom-20 left-full w-60 h-20 ml-4 hidden md:block">
              <Image
                src="/curved-dashed-line.svg"
                alt="curved dashed line"
                layout="fill"
              />
            </div>
            <div className="absolute inset-0 top-4 w-full flex justify-center items-center z-0">
              <Image
                src="/icons/circle.png"
                alt="circle"
                width={600}
                height={200}
                className="p-4"
              />
            </div>
          </div>
        </div>

        <div className="text-center w-full flex justify-center">
          <h1 className="text-gray-700 font-medium font-xl w-full md:w-[60%] font-inter">
            The AI content strategist for developers. Generate high-impact
            article ideas optimized for Google, AI Chatbots, and E-E-A-T. Built
            for technical content that gets discovered.
          </h1>
        </div>
      </div>

      {/* Animated Google Chart */}
      <div className="absolute rounded-full bg-[#D5E0FC] bottom-0 hidden md:block">
        <div className="bg-black py-2 rounded-sm absolute w-full -top-6 -right-20">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <Image
          src="/icons/google.png"
          alt="google"
          width={100}
          height={100}
          className="p-4"
        />
      </div>

      {/* Animated ChatGPT Lines */}
      <div className="absolute rounded-full bg-[#D5E0FC] -bottom-10 right-0 hidden md:block">
        <div className="bg-black py-3 px-4 space-y-2 rounded-sm absolute w-full -top-6 -left-18">
          {lineWidth?.slice(0, 3)?.map((line, index) => (
            <div
              key={index}
              className="rounded-full h-[2px] bg-[#D5E0FC] transition-all duration-500 ease-in-out"
              style={{ width: `${line?.value}%` }}
            />
          ))}
        </div>
        <Image
          src="/icons/chatgpt.png"
          alt="chatgpt"
          width={100}
          height={100}
          className="p-4"
        />
      </div>

      {/* Email Input + Country Hidden Field */}
      <div className="w-full flex justify-center">
        <div className="relative w-full md:w-6/12">
          <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-5 shadow-md font-medium w-full focus-visible:ring-0 border-0 placeholder:text-[#AAAAAA] bg-white h-14 rounded-full"
          />

          <Button
            onClick={joinWaitlist}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#104127] hover:bg-[#104127] rounded-full h-10 w-10 p-2 md:w-auto md:px-4"
          >
            <span className="hidden md:inline">Join Waitlist</span>{" "}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
