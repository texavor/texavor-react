"use client";
import Image from "next/image";
import { ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [chartData, setChartDate] = useState<any>([]);
  const [lineWidth, setLineWidth] = useState<any>([
    { value: Math.floor(Math.random() * 99) + 10 },
    { value: Math.floor(Math.random() * 99) + 10 },
    { value: Math.floor(Math.random() * 99) + 10 },
  ]);

  const chartConfig = {
    desktop: {
      lable: "Desktop",
      color: "#D5E0FC",
    },
  };

  const FetchData = () => {
    setChartDate([
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
    setTimeout(() => {
      FetchData();
    }, 5000);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="space-y-6 mt-16 relative">
      <div className="md:w-[70%] md:mx-auto text-center space-y-6">
        <div className="text-[#0A2918] text-[76px] font-bold leading-18">
          <div className="relative inline-block">
            <div className="absolute -bottom-30 -left-10 w-40 h-20 mr-4">
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
            <div className="absolute -bottom-20 left-full w-60 h-20 ml-4">
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
          <p className="text-[#000000] font-medium font-xl w-full md:w-[60%]">
            The AI content strategist for developers. Generate high-impact
            article ideas optimized for Google, AI Chatbots, and E-E-A-T. Built
            for technical content that gets discovered.
          </p>
        </div>
      </div>
      <div className="absolute rounded-full bg-[#D5E0FC] -bottom-10">
        <div className="bg-black py-2 rounded-sm absolute w-full -top-6 -right-20">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
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
      <div className="absolute rounded-full bg-[#D5E0FC] -bottom-20 right-0">
        <div className="bg-black py-3 px-4 space-y-2 rounded-sm absolute w-full -top-6 -left-18">
          {lineWidth?.map((line: any) => {
            return (
              <div
                className="rounded-full h-[2px] bg-[#D5E0FC] transition-all duration-500 ease-in-out"
                style={{
                  width: `${line?.value}%`,
                }}
              />
            );
          })}
        </div>
        <Image
          src="/icons/chatgpt.png"
          alt="google"
          width={100}
          height={100}
          className="p-4"
        />
      </div>
    </div>
  );
};

export default Hero;
