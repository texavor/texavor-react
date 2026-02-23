// removed Card/CardContent
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingDown,
  Copy,
  Palette,
  MoveUpRight,
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
          <div
            key={index}
            className="bg-card border border-border/50 shadow-none rounded-xl p-6 group hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-foreground">
                  <span
                    className={`p-1.5 rounded-md flex items-center justify-center bg-accent/10 ${stat.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  {stat.label}
                </h3>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 border border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground">
                  <MoveUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="text-4xl font-bold tracking-tight font-inter text-foreground">
                {stat.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
