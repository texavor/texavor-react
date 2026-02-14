import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DirectAnswerSkeleton() {
  return (
    <div className="space-y-8 mx-auto">
      {/* Grade + Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 mb-4" />
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>

      {/* Examples Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-40 rounded-xl" />
      </div>

      {/* Schema Health */}
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}
