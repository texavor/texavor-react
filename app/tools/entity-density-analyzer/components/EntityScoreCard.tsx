import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EntityBreakdown {
  organizations: number;
  people: number;
  products: number;
  locations: number;
}

interface EntityScoreCardProps {
  score: number;
  grade: string;
  totalEntities: number;
  breakdown: EntityBreakdown;
}

export default function EntityScoreCard({
  score,
  grade,
  totalEntities,
  breakdown,
}: EntityScoreCardProps) {
  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-none shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-400 font-inter">
              {score}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
              Entity Salience Grade:{" "}
              <Badge
                variant="outline"
                className="ml-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
              >
                {grade}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 font-inter">
              {totalEntities}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Total Entities
            </div>
          </div>
        </div>

        {/* Entity Breakdown */}
        <div className="grid grid-cols-4 gap-4 text-center text-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-3">
            <div className="font-bold text-2xl text-blue-600 dark:text-blue-400 font-inter">
              {breakdown.organizations}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Organizations
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-3">
            <div className="font-bold text-2xl text-green-600 dark:text-green-400 font-inter">
              {breakdown.people}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              People
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-3">
            <div className="font-bold text-2xl text-orange-600 dark:text-orange-400 font-inter">
              {breakdown.products}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Products
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-3">
            <div className="font-bold text-2xl text-red-600 dark:text-red-400 font-inter">
              {breakdown.locations}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Locations
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
