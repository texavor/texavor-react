import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface OpportunitiesListProps {
  opportunities: string[];
}

export default function OpportunitiesList({
  opportunities,
}: OpportunitiesListProps) {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  return (
    <Card className="bg-secondary shadow-none border-none">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-foreground font-poppins flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Optimization Opportunities
        </h3>
        <p className="text-sm text-muted-foreground">
          Actionable recommendations to improve your schema score
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-400"
          >
            <span className="text-lg mt-0.5">💡</span>
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium flex-1">
              {opportunity}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
