import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface GoodExample {
  src: string;
  alt: string;
  reason: string;
}

interface GoodExamplesProps {
  examples: GoodExample[];
}

export default function GoodExamples({ examples }: GoodExamplesProps) {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card border border-border shadow-none rounded-xl">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-green-500/10 text-green-500">
            <CheckCircle2 className="w-5 h-5 text-current" />
          </span>
          Well-Optimized Images ({examples.length})
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {examples.map((example, idx) => (
          <div
            key={idx}
            className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
          >
            {/* Image Source */}
            <div className="mb-2">
              <span className="font-mono text-xs text-muted-foreground break-all">
                {example.src}
              </span>
            </div>

            {/* Alt Text */}
            <div className="bg-background/80 p-2 rounded mb-2">
              <p className="text-sm font-medium text-foreground">
                "{example.alt}"
              </p>
            </div>

            {/* Reason */}
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-300">
                {example.reason}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
