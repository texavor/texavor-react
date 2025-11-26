import React from "react";
import { Users, TrendingUp, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Developers Trust Us",
  },
  {
    icon: TrendingUp,
    value: "50,000+",
    label: "Articles Analyzed",
  },
  {
    icon: Zap,
    value: "3x Faster",
    label: "Time to Page 1",
  },
];

const TrustBar = () => {
  return (
    <div className="w-full mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-xl px-6 py-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-[#104127] rounded-xl p-4 mb-4">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#104127] font-poppins">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 font-inter mt-2">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustBar;
