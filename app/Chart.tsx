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

const Chart = () => {
  const [chartData] = useState<any>([
    { month: "Week 1", texavor: 10, alone: 10 },
    { month: "Week 2", texavor: 15, alone: 12 },
    { month: "Week 3", texavor: 20, alone: 14 },
    { month: "Week 4", texavor: 25, alone: 16 },
    { month: "Week 5", texavor: 40, alone: 20 },
    { month: "Week 6", texavor: 50, alone: 25 },
  ]);

  const chartConfig = {
    texavor: {
      label: "With Texavor",
      color: "#104127",
    },
    alone: {
      label: "Without Texavor",
      color: "#E0E0E0",
    },
  };

  const CustomTooltip = ({ viewBox, value }: any) => {
    const { x, y } = viewBox;
    return (
      <foreignObject x={x - 70} y={y - 40} width="140" height="35">
        <div
          style={{
            backgroundColor: "#104127",
            color: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "11px",
            fontWeight: "600",
          }}
          className="font-inter shadow-lg"
        >
          {value}
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="w-full text-center space-y-0 mt-32">
      <p className="text-[#0A2918] font-bold text-4xl md:text-[48px] font-poppins">
        Achieve Authority in Weeks, Not Quarters
      </p>
      <div className="flex justify-center">
        <p className="w-full md:w-[70%] text-[#7A7A7A] font-normal font-inter mt-4">
          Stop the SEO guesswork. Our AI analyzes top-ranking content,
          identifies strategic gaps, and generates a data-driven plan so you can
          focus on what you do best: writing expert content that ranks.
        </p>
      </div>

      <div className="bg-white py-8 px-4 md:px-8 rounded-xl mt-8 relative shadow-lg border border-[#E6E6E6]">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-1 bg-[#104127] rounded-full w-12" />
            <p className="text-black font-medium text-sm md:text-base font-inter">
              With Texavor
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1 bg-[#E0E0E0] rounded-full w-12" />
            <p className="text-black font-medium text-sm md:text-base font-inter">
              Building it Alone
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                stroke="#9A9A9A"
                style={{ fontSize: "12px" }}
              />
              <ReferenceLine
                x="Week 4"
                stroke="#104127"
                strokeDasharray="8 8"
                strokeWidth={2}
              >
                <Label
                  position="top"
                  fill="#104127"
                  fontSize={12}
                  fontWeight="600"
                  dy={-10}
                />
              </ReferenceLine>
              <ReferenceDot
                x="Week 4"
                y={25}
                r={6}
                fill="#104127"
                stroke="white"
                strokeWidth={3}
              >
                <Label
                  content={<CustomTooltip value="First Article Hits Page 1" />}
                />
              </ReferenceDot>
              <Line
                dataKey="texavor"
                type="monotone"
                stroke="var(--color-texavor)"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                dataKey="alone"
                type="monotone"
                stroke="var(--color-alone)"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats below chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#E6E6E6]">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#104127] font-poppins">3x</p>
            <p className="text-sm text-gray-600 font-inter mt-1">
              Faster to Page 1
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#104127] font-poppins">
              50%
            </p>
            <p className="text-sm text-gray-600 font-inter mt-1">
              Higher Rankings
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#104127] font-poppins">2x</p>
            <p className="text-sm text-gray-600 font-inter mt-1">
              More Organic Traffic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
