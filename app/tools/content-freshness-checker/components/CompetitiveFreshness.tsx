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
    <Card className="bg-secondary shadow-none border-none">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isAdvantage
                ? "bg-green-100 dark:bg-green-950/20"
                : "bg-orange-100 dark:bg-orange-950/20"
            }`}
          >
            {isAdvantage ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-orange-600" />
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
