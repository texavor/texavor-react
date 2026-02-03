"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

const data = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 20 },
  { value: 25 },
  { value: 40 },
  { value: 60 },
  { value: 55 },
  { value: 80 },
  { value: 95 },
  { value: 120 },
];

export function TrafficGrowthCard() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-xl overflow-hidden relative">
      <div className="flex justify-between items-start z-10">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Organic Traffic
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="text-2xl font-bold text-[#104127] mt-1"
          >
            +124%
          </motion.div>
        </div>
        <div className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
          Last 30 days
        </div>
      </div>

      <div className="h-[100px] w-full absolute bottom-0 left-0 right-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTraffic)"
              isAnimationActive={true}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
