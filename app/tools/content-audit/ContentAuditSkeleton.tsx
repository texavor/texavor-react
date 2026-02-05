import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ContentAuditSkeleton() {
  return (
    <div className="space-y-6 animate-pulse mx-auto opacity-90">
      {/* Top Section: Score & Basic Stats */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Score Gauge Skeleton */}
        <div className="md:col-span-4">
          <Card className="h-full border-none shadow-sm bg-card border border-border/50">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
              <Skeleton className="w-[180px] h-[180px] rounded-full" />
              <Skeleton className="h-8 w-32 mt-6" />
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-border/50 shadow-sm bg-card">
              <CardContent className="p-6 flex flex-col justify-center h-full space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Analysis Sections Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="border border-border/50 shadow-sm bg-card">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
