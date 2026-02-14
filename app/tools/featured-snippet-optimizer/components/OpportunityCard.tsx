import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Heading,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Opportunity {
  header: string;
  issue: string;
  severity: "critical" | "high" | "medium";
  suggestion: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50/30 dark:bg-red-950/20",
          icon: (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          ),
          badge:
            "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
        };
      case "high":
        return {
          bg: "bg-orange-50/30 dark:bg-orange-950/20",
          icon: (
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          ),
          badge:
            "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
        };
      default:
        return {
          bg: "bg-yellow-50/30 dark:bg-yellow-950/20",
          icon: (
            <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          ),
          badge:
            "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
        };
    }
  };

  const styles = getSeverityStyles(opportunity.severity);

  return (
    <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none overflow-hidden hover:bg-primary/10 transition-colors duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", styles.bg)}>{styles.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Badge
                  variant="outline"
                  className={cn(
                    "uppercase font-bold tracking-widest text-[9px] h-4",
                    styles.badge,
                  )}
                >
                  {opportunity.severity}
                </Badge>
                <span className="text-[10px] font-bold text-[#104127] dark:text-emerald-400 uppercase tracking-widest">
                  Snippet Opportunity
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Heading className="w-3 h-3" />
                In Header: {opportunity.header}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background/80 dark:bg-zinc-800 p-5 rounded-2xl mb-6 border border-border/40 shadow-sm relative">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter opacity-50">
              Issue Detected
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed mb-1">
            {opportunity.issue}
          </p>
        </div>

        <div className="bg-[#104127]/5 dark:bg-[#104127]/20 p-5 rounded-2xl border border-[#104127]/10 dark:border-[#104127]/30">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#104127] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#104127] dark:text-emerald-400 uppercase tracking-widest mb-1">
                Optimization Fix
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed">
                {opportunity.suggestion}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
