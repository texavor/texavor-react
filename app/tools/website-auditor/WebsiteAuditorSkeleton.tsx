import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function WebsiteAuditorSkeleton() {
  return (
    <div className="space-y-6 animate-pulse mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics & Checks */}
        <div className="lg:col-span-8 space-y-6">
          {/* Score Card */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card
                key={i}
                className="border border-border/50 shadow-sm bg-card"
              >
                <CardContent className="p-4 space-y-3 flex flex-col justify-between h-[120px]">
                  <Skeleton className="h-4 w-24 rounded-full" />
                  <Skeleton className="h-10 w-20 rounded-lg" />
                  <Skeleton className="h-3 w-32 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Checks List */}
          <Card className="border border-border/50 shadow-none rounded-2xl bg-primary/5 dark:bg-card overflow-hidden">
            <CardHeader className="pb-4">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                  >
                    <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16 rounded" />
                      </div>
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Radar Chart */}
        <div className="lg:col-span-4">
          <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] opacity-20 relative overflow-hidden flex flex-col items-center justify-center p-6 min-h-[400px]">
            <Skeleton className="w-[180px] h-[180px] rounded-full bg-white/10" />
            <div className="mt-8 space-y-3 w-full flex flex-col items-center">
              <Skeleton className="h-6 w-40 bg-white/10" />
              <Skeleton className="h-3 w-56 bg-white/10" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
