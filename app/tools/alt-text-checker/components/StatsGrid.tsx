import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingDown,
  Copy,
  Palette,
} from "lucide-react";

interface StatsGridProps {
  stats: {
    with_alt: number;
    without_alt: number;
    too_short: number;
    too_long: number;
    duplicate_alt: number;
    keyword_stuffed: number;
    decorative: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statsData = [
    {
      label: "With Alt Text",
      value: stats.with_alt,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Missing Alt",
      value: stats.without_alt,
      icon: XCircle,
      color: "text-red-600",
    },
    {
      label: "Too Short",
      value: stats.too_short,
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      label: "Too Long",
      value: stats.too_long,
      icon: TrendingDown,
      color: "text-orange-600",
    },
    {
      label: "Duplicates",
      value: stats.duplicate_alt,
      icon: Copy,
      color: "text-amber-600",
    },
    {
      label: "Decorative",
      value: stats.decorative,
      icon: Palette,
      color: "text-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1 font-inter text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs font-medium font-inter text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
