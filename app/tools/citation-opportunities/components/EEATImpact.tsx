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
    <Card className="bg-primary/5 dark:bg-zinc-900/50 border border-border/50 shadow-none overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05]">
        <ShieldCheck className="w-32 h-32 text-indigo-600" />
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#104127] flex items-center justify-center shadow-md">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h3 className="text-2xl font-bold font-poppins text-[#104127] dark:text-white uppercase tracking-tight">
            E-E-A-T Impact Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
              Current Status
            </div>
            <div
              className={cn(
                "text-3xl font-black font-inter",
                getLevelColor(impact.current_level),
              )}
            >
              {impact.current_level}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-4 bg-background dark:bg-zinc-900 p-5 rounded-2xl border border-border/50 shadow-none">
              <div className="text-center">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                  Fix
                </div>
                <div className="text-3xl font-black text-[#104127] dark:text-white">
                  {impact.missing_citations}
                </div>
              </div>
              <div className="h-10 w-px bg-border/50" />
              <div className="text-xs font-bold text-muted-foreground max-w-[80px] leading-tight text-left uppercase tracking-tighter">
                Missing Citations Found
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              Potential Level
            </div>
            <div
              className={cn(
                "text-4xl font-black font-inter flex items-center justify-center md:justify-end gap-2",
                getLevelColor(impact.potential_level),
              )}
            >
              <TrendingUp className="w-8 h-8 font-black" />
              {impact.potential_level}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-background/50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-border/50 shadow-none">
          <p className="text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed text-center italic">
            "{impact.message}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
