import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CitationOpportunitiesSkeleton() {
  return (
    <div className="space-y-8 mx-auto">
      {/* Grade + Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>

      {/* Opportunity Breakdown */}
      <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 mb-4" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>

      {/* E-E-A-T Impact */}
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}
