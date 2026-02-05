import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AiVisibilitySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Row: Metrics & Radar */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics Grid */}
        <div className="lg:col-span-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="border border-border/50 shadow-sm bg-card"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-32 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Summary (Widget 3) */}
          <Card className="border border-border/50 shadow-none rounded-2xl bg-primary/5 dark:bg-card overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
            <CardHeader className="pb-2 pt-5">
              <Skeleton className="h-8 w-48 rounded-lg" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Radar Chart */}
        <div className="lg:col-span-4">
          <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] opacity-20 relative overflow-hidden flex flex-col items-center justify-center p-6">
            <Skeleton className="w-[200px] h-[200px] rounded-full bg-white/10" />
            <div className="mt-6 space-y-2 w-full flex flex-col items-center">
              <Skeleton className="h-6 w-32 bg-white/10" />
              <Skeleton className="h-4 w-48 bg-white/10" />
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Row: Prompts & Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((card) => (
          <Card
            key={card}
            className="border border-border/50 shadow-none rounded-xl bg-primary/5 dark:bg-card h-full"
          >
            <CardHeader className="pb-3">
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center h-16 gap-3 p-3 rounded-2xl bg-muted/50 border border-border"
                  >
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
