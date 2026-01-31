import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AEOSchemaValidatorSkeleton() {
  return (
    <div className="space-y-8 animate-pulse mx-auto">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Score Column */}
        <div className="md:col-span-4">
          <Card className="border border-border/50 shadow-sm bg-white dark:bg-zinc-900 h-full">
            <CardContent className="p-6 space-y-4 flex flex-col justify-center items-center h-[300px]">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-full" />
            </CardContent>
          </Card>
        </div>

        {/* Health Checks Column */}
        <div className="md:col-span-8">
          <Card className="border border-border/50 shadow-none rounded-2xl bg-primary/5 dark:bg-zinc-900 overflow-hidden">
            <CardHeader className="pb-4">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800/50 rounded-lg border border-border/50"
                  >
                    <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Opportunities Skeleton */}
      <Card className="bg-primary/5 shadow-none dark:bg-zinc-900 border border-border/50 rounded-xl p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-white dark:bg-black/20 rounded-lg border border-border/50"
            >
              <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </Card>

      {/* Schema Viewer Skeleton */}
      <Card className="border-gray-800 shadow-xl bg-[#0d1117] text-gray-300 overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-800 py-4">
          <Skeleton className="h-5 w-40 bg-gray-800" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-4 w-full bg-gray-800" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
