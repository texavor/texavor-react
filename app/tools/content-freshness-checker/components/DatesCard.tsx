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
    <Card className="bg-card border border-border shadow-none h-full rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium font-poppins text-foreground flex items-center gap-2 mb-4">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
            <Calendar className="w-5 h-5 text-current" />
          </span>
          Date Information
        </h3>

        {hasNoDates ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No publish or modified dates found
            </p>
          </div>
        ) : (
          <div className="space-y-5 mt-2">
            {/* Published Date */}
            {dates.published && (
              <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background">
                <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Published
                  </div>
                  <div className="text-base font-semibold text-foreground font-inter">
                    {formatDate(dates.published)}
                  </div>
                  {dates.age_days !== null && (
                    <div className="text-sm font-medium text-muted-foreground mt-0.5">
                      {dates.age_days} days ago
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Last Modified */}
            {dates.last_modified && (
              <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background">
                <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Last Updated
                  </div>
                  <div className="text-base font-semibold text-foreground font-inter">
                    {formatDate(dates.last_modified)}
                  </div>
                  {dates.last_update_days !== null && (
                    <div className="text-sm font-medium text-muted-foreground mt-0.5">
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
