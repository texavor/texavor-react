import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ContentFreshnessSkeleton() {
  return (
    <div className="space-y-8 mx-auto">
      {/* Score + Dates Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>

      {/* Positives */}
      <Skeleton className="h-32 rounded-2xl" />

      {/* Decay Signals */}
      <Card className="bg-secondary shadow-none border-none">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>

      {/* Competitive Freshness */}
      <Skeleton className="h-32 rounded-2xl" />

      {/* Recommendations */}
      <Skeleton className="h-40 rounded-2xl" />
    </div>
  );
}
