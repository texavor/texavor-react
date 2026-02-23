import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface EntitySignal {
  type: string;
  severity: "positive" | "warning";
  message: string;
}

interface EntitySignalsProps {
  signals: EntitySignal[];
}

export default function EntitySignals({ signals }: EntitySignalsProps) {
  if (!signals || signals.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-foreground font-poppins mb-4 flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
            <AlertTriangle className="w-5 h-5 text-current" />
          </span>
          Entity Signals
        </h3>
        <div className="space-y-3">
          {signals.map((signal, idx) => {
            const isPositive = signal.severity === "positive";
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-lg border bg-background ${
                  isPositive ? "border-emerald-500/30" : "border-orange-500/30"
                }`}
              >
                <div
                  className={`p-2 rounded-md shrink-0 ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-orange-500/10 text-orange-500"
                  }`}
                >
                  {isPositive ? (
                    <CheckCircle2 className="w-4 h-4 text-current" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-current" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {signal.type.replace(/_/g, " ")}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {signal.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
