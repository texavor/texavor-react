import {
  FileText,
  Award,
  Link2,
  AlertTriangle,
  MoveUpRight,
} from "lucide-react";

interface CitationStats {
  total_citations: number;
  high_authority: number;
  medium_authority: number;
  low_authority: number;
  broken: number;
}

interface CitationStatsGridProps {
  stats: CitationStats;
}

export default function CitationStatsGrid({ stats }: CitationStatsGridProps) {
  const statItems = [
    {
      label: "Total Citations",
      value: stats.total_citations,
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "High Authority",
      value: stats.high_authority,
      icon: Award,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-500/10",
    },
    {
      label: "Medium/Low",
      value: stats.medium_authority + stats.low_authority,
      icon: Link2,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      label: "Broken Links",
      value: stats.broken,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-500/10",
    },
  ];

  return (
    <>
      {statItems.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 text-foreground shadow-none h-full flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400">
              <item.icon className="w-5 h-5" />
            </h3>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-border text-slate-800 dark:bg-zinc-800 dark:text-slate-200 transition-transform hover:-translate-y-1 hover:translate-x-1">
              <MoveUpRight className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold tracking-tight mb-2 font-inter text-slate-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
