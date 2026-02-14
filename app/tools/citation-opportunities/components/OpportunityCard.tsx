import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CitationOpportunity {
  type: string;
  severity: "critical" | "high" | "medium";
  text: string;
  context: string;
  location: string;
  suggestion: string;
  suggested_sources?: string[];
}

interface OpportunityCardProps {
  opportunity: CitationOpportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50/30 dark:bg-red-950/20",
          border: "border-red-500/30",
          badge:
            "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          ),
        };
      case "high":
        return {
          bg: "bg-orange-50/30 dark:bg-orange-950/20",
          border: "border-orange-500/30",
          badge:
            "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
          icon: (
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          ),
        };
      default:
        return {
          bg: "bg-yellow-50/30 dark:bg-yellow-950/20",
          border: "border-yellow-500/30",
          badge:
            "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
          icon: (
            <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          ),
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
                  {opportunity.type.replace(/_/g, " ")}
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {opportunity.location}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background/80 dark:bg-zinc-800 p-5 rounded-2xl mb-6 border border-border/40 shadow-sm">
          <p className="text-base font-semibold text-slate-800 dark:text-white leading-relaxed italic mb-3">
            "{opportunity.text}"
          </p>
          <div className="flex gap-2">
            <div className="w-1 h-auto bg-primary/20 rounded-full" />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
              {opportunity.context}
            </p>
          </div>
        </div>
        <div className="bg-[#104127]/5 dark:bg-[#104127]/20 p-5 rounded-2xl border border-[#104127]/10 dark:border-[#104127]/30">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#104127] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#104127] dark:text-emerald-400 uppercase tracking-widest mb-1">
                Strategic Recommendation
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed">
                {opportunity.suggestion}
              </p>
            </div>
          </div>

          {opportunity.suggested_sources &&
            opportunity.suggested_sources.length > 0 && (
              <div className="mt-4 ml-11 flex flex-wrap gap-2 pt-4 border-t border-[#104127]/10">
                {opportunity.suggested_sources.map((source, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-white dark:bg-zinc-800 text-[#104127] dark:text-emerald-400 border-border/50 text-[10px] font-bold shadow-sm"
                  >
                    {source}
                  </Badge>
                ))}
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
