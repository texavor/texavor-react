import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface DatesFound {
  published: string | null;
  last_modified: string | null;
  age_days: number | null;
  last_update_days: number | null;
}

interface DatesCardProps {
  dates: DatesFound;
}

// Format date to "23rd July, 2026"
function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Get ordinal suffix (st, nd, rd, th)
    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(day)} ${month}, ${year}`;
  } catch (error) {
    return dateString;
  }
}

export default function DatesCard({ dates }: DatesCardProps) {
  const hasNoDates = !dates.published && !dates.last_modified;

  return (
    <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400 mb-4">
          Date Information
        </h3>

        {hasNoDates ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No publish or modified dates found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Published Date */}
            {dates.published && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Published
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatDate(dates.published)}
                  </div>
                  {dates.age_days !== null && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {dates.age_days} days ago
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Last Modified */}
            {dates.last_modified && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatDate(dates.last_modified)}
                  </div>
                  {dates.last_update_days !== null && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {dates.last_update_days} days ago
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
