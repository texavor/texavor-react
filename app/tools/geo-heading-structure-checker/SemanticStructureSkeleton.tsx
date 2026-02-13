import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SemanticStructureSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Score Column */}
        <div className="md:col-span-4">
          <Card className="h-full bg-primary/5 dark:bg-zinc-900 border border-border/50">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Skeleton className="h-32 w-32 rounded-full mb-4" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        </div>

        {/* Hierarchy Tree Skeleton */}
        <div className="md:col-span-8">
          <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              {/* H1 */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-5 w-64" />
              </div>
              {/* H2 */}
              <div className="flex items-center gap-3 pl-6">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-5 w-56" />
              </div>
              {/* H3 */}
              <div className="flex items-center gap-3 pl-12">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-5 w-48" />
              </div>
              {/* H2 */}
              <div className="flex items-center gap-3 pl-6">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-5 w-52" />
              </div>
              {/* H3 */}
              <div className="flex items-center gap-3 pl-12">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-5 w-44" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
