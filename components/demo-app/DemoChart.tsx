"use client";

import React, { useState } from "react";
import { ChartContainer } from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  ReferenceLine,
  ReferenceDot,
  Label,
  ResponsiveContainer,
} from "recharts";

const DemoChart = () => {
  const [chartData] = useState<any>([
    { month: "January", easywrite: 10, alone: 10 },
    { month: "February", easywrite: 15, alone: 12 },
    { month: "March", easywrite: 20, alone: 14 },
    { month: "April", easywrite: 25, alone: 16 },
    { month: "May", easywrite: 40, alone: 20 },
    { month: "June", easywrite: 50, alone: 25 },
    { month: "July", easywrite: 85, alone: 28 },
    { month: "August", easywrite: 110, alone: 30 },
  ]);

  const chartConfig = {
    easywrite: {
      label: "Texavor",
      color: "#104127",
    },
    alone: {
      label: "Alone",
      color: "#00000014",
    },
  };

  const CustomTooltip = ({ viewBox, value }: any) => {
    const { x, y } = viewBox;
    return (
      <foreignObject x={x - 60} y={y - 35} width="120" height="30">
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: 500,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {value}
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="w-full text-center space-y-0 pt-10 pb-10 px-8 bg-white h-full overflow-y-auto">
      <p className="text-[#0A2918] font-bold text-3xl md:text-[42px] leading-tight mb-4">
        Achieve Authority in Weeks, Not Quarters
      </p>
      <div className="flex justify-center mb-8">
        <p className="w-[80%] md:w-[60%] text-[#7A7A7A] font-normal font-inter text-sm md:text-base leading-relaxed">
          Stop the SEO guesswork. Our AI analyzes top-ranking content,
          identifies strategic gaps, and generates a data-driven plan so you can
          focus on what you do best: writing expert content that ranks.
        </p>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm py-6 rounded-[16px] relative px-4 mx-auto max-w-4xl">
        {/* Legend */}
        <div className="absolute left-6 top-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-1.5 bg-[#104127] rounded-full w-8" />
            <p className="text-gray-900 font-medium text-xs">With Texavor</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1.5 bg-[#EBEBEB] rounded-full w-8" />
            <p className="text-gray-500 font-medium text-xs">Without Texavor</p>
          </div>
        </div>

        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 40,
                left: 12,
                right: 12,
                bottom: 10,
              }}
            >
              <XAxis dataKey="month" hide />
              <ReferenceLine x="May" stroke="#e5e7eb" strokeDasharray="4 4">
                <Label
                  value="Start Using Texavor"
                  position="top"
                  fill="#6b7280"
                  fontSize={10}
                  dy={-15}
                  fontWeight={500}
                />
              </ReferenceLine>
              <ReferenceDot
                x="June"
                y={50}
                r={6}
                fill="#104127"
                stroke="white"
                strokeWidth={3}
              >
                <Label
                  content={<CustomTooltip value="🚀 First Page 1 Ranking" />}
                />
              </ReferenceDot>
              <Line
                dataKey="easywrite"
                type="monotone"
                stroke="#104127"
                strokeWidth={4}
                dot={false}
              />
              <Line
                dataKey="alone"
                type="monotone"
                stroke="#e5e5e5"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DemoChart;
