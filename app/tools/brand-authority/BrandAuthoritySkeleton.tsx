import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BrandAuthoritySkeleton() {
  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto" />
          <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-sm bg-white dark:bg-zinc-900">
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Score */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-white dark:bg-zinc-900 h-64">
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <Skeleton className="h-40 w-40 rounded-full" />
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-white dark:bg-zinc-900">
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
