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
    <Card className="bg-secondary shadow-none border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
          Entity Signals
        </h3>
        <div className="space-y-3">
          {signals.map((signal, idx) => {
            const isPositive = signal.severity === "positive";
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  isPositive
                    ? "bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500"
                    : "bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500"
                }`}
              >
                {isPositive ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isPositive
                        ? "text-green-800 dark:text-green-300"
                        : "text-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {signal.type.replace(/_/g, " ").toUpperCase()}
                  </div>
                  <p
                    className={`text-sm ${
                      isPositive
                        ? "text-green-700 dark:text-green-200"
                        : "text-yellow-700 dark:text-yellow-200"
                    }`}
                  >
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
