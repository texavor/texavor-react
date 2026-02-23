import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CompetitiveFreshnessData {
  avg_competitor_age: string;
  your_advantage: string;
}

interface CompetitiveFreshnessProps {
  data: CompetitiveFreshnessData;
}

export default function CompetitiveFreshness({
  data,
}: CompetitiveFreshnessProps) {
  const isAdvantage = data.your_advantage.toLowerCase().includes("fresher");

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isAdvantage
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-orange-500/10 text-orange-500"
            }`}
          >
            {isAdvantage ? (
              <TrendingUp className="w-6 h-6 text-current" />
            ) : (
              <TrendingDown className="w-6 h-6 text-current" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground font-poppins mb-1">
              Competitive Freshness
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Average competitor age: <strong>{data.avg_competitor_age}</strong>
            </p>
            <p
              className={`text-sm font-medium ${
                isAdvantage
                  ? "text-green-700 dark:text-green-300"
                  : "text-orange-700 dark:text-orange-300"
              }`}
            >
              {data.your_advantage}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
