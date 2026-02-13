import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CitationAuthoritySkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Score Column */}
        <div className="md:col-span-1">
          <Card className="h-full bg-secondary shadow-none border-none">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Skeleton className="h-32 w-32 rounded-full mb-4" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
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

      {/* Table Skeleton */}
      <Card className="bg-secondary shadow-none border-none">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
