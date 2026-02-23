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
    <div className="grid sm:grid-cols-2 gap-4 h-full">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="group rounded-xl p-6 bg-card border border-border shadow-none flex flex-col justify-between transition-colors hover:border-primary/20 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                <item.icon className="w-4 h-4" />
              </span>
              {item.label}
            </h3>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
              <MoveUpRight className="w-3 h-3" />
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold tracking-tight mb-1 font-inter text-foreground">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
