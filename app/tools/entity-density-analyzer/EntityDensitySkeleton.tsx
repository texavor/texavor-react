import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function EntityDensitySkeleton() {
  return (
    <div className="space-y-8 mx-auto">
      {/* Score Card */}
      <Skeleton className="h-56 rounded-2xl" />

      {/* Top Entities Table */}
      <Card className="bg-secondary shadow-none border-none">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>

      {/* Entity Signals */}
      <Skeleton className="h-32 rounded-2xl" />

      {/* Schema Status */}
      <Skeleton className="h-24 rounded-2xl" />

      {/* Recommendations */}
      <Skeleton className="h-40 rounded-2xl" />
    </div>
  );
}
