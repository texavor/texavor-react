import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TopicalAuthoritySkeleton() {
  return (
    <div className="space-y-6 animate-pulse mx-auto">
      {/* Top Section: Gauge & Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-full border-none shadow-sm bg-card">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <Skeleton className="w-[200px] h-[200px] rounded-full" />
            <Skeleton className="h-8 w-32 mt-6" />
          </CardContent>
        </Card>

        <div className="grid grid-rows-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="border border-border/50 shadow-sm bg-card">
              <CardContent className="p-6 flex flex-col justify-center h-full space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Clusters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border border-border/50 shadow-sm bg-card">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-8 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
