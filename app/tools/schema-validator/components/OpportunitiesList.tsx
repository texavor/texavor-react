import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb, CheckCircle2 } from "lucide-react";

interface OpportunitiesListProps {
  opportunities: string[];
}

export default function OpportunitiesList({
  opportunities,
}: OpportunitiesListProps) {
  return (
    <Card className="bg-card shadow-none border border-border rounded-xl h-full">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
            <Lightbulb className="w-5 h-5 text-current" />
          </span>
          Optimization Opportunities
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Actionable recommendations to improve your schema score
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {!opportunities || opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[160px]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3 opacity-80" />
            <p className="text-foreground font-medium font-poppins">
              Excellent work!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your schema markup looks great. No further optimizations found.
            </p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-border/50">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-background/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground flex-1">
                  {opportunity}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
