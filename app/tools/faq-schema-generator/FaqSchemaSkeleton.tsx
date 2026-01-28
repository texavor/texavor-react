import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FaqSchemaSkeleton() {
  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto" />
          <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="space-y-6">
            <Card className="border-none shadow-none bg-transparent">
              <Skeleton className="h-10 w-full mb-6" /> {/* Tabs */}
              <Card className="bg-white dark:bg-zinc-900 border border-border/50">
                <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Card>
          </div>

          {/* Right Column: Preview & Code */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-zinc-900 border border-border/50 h-full">
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
