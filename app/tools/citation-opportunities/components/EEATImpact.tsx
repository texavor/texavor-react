import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EEATImpactData {
  current_level: string;
  missing_citations: number;
  potential_level: string;
  message: string;
}

interface EEATImpactProps {
  impact: EEATImpactData;
}

export default function EEATImpact({ impact }: EEATImpactProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-orange-500 dark:text-orange-400";
      default:
        return "text-red-500 dark:text-red-400";
    }
  };

  return (
    <Card className="bg-card border border-border shadow-none rounded-xl overflow-hidden relative group transition-all duration-300 hover:border-primary/40">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-[0.04]">
        <ShieldCheck className="w-40 h-40 text-foreground" />
      </div>

      <CardContent className="p-8 relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
              <ShieldCheck className="w-5 h-5 text-current" />
            </span>
            <h3 className="text-xl font-semibold font-poppins text-foreground">
              E-E-A-T Impact Analysis
            </h3>
          </div>
          <p className="text-muted-foreground font-inter text-base leading-relaxed">
            {impact.message}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between lg:justify-end gap-6 w-full lg:w-auto bg-background/50 rounded-xl border border-border p-6">
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Current
            </span>
            <span
              className={cn(
                "text-2xl font-bold font-inter",
                getLevelColor(impact.current_level),
              )}
            >
              {impact.current_level}
            </span>
          </div>

          <div className="flex flex-col items-center px-4 md:px-6 border-x border-border">
            <span className="text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider mb-1">
              To Fix
            </span>
            <span className="text-2xl font-black text-foreground font-inter">
              {impact.missing_citations}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-accent" />
              Potential
            </span>
            <span
              className={cn(
                "text-2xl font-bold font-inter flex items-center gap-1.5",
                getLevelColor(impact.potential_level),
              )}
            >
              <TrendingUp className="w-5 h-5" />
              {impact.potential_level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
