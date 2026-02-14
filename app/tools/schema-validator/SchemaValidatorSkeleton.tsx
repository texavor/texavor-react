import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SchemaValidatorSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Score Column */}
        <div className="md:col-span-1">
          <div className="rounded-2xl p-6 bg-[#104127] shadow-lg h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-6 w-20 bg-green-700/30" />
              <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
            </div>
            <div>
              <Skeleton className="h-16 w-20 mb-2 bg-white/20" />
              <Skeleton className="h-4 w-32 bg-green-100/30" />
            </div>
          </div>
        </div>

        {/* Stats Grid - Individual Cards */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none h-full flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-12 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Schema Types Badges Skeleton */}
      <Card className="bg-secondary shadow-none border-none">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AEO Checks Table Skeleton */}
      <Card className="bg-secondary shadow-none border-none">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* JSON Viewer Skeleton */}
      <Card className="bg-secondary shadow-none border-none">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
