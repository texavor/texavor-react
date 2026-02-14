import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface DecaySignal {
  type: string;
  severity: "critical" | "warning" | "minor";
  examples?: string[];
  message: string;
}

interface DecaySignalsProps {
  signals: DecaySignal[];
}

export default function DecaySignals({ signals }: DecaySignalsProps) {
  if (!signals || signals.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    if (severity === "critical") {
      return {
        border: "border-red-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
      };
    }
    if (severity === "warning") {
      return {
        border: "border-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        badge:
          "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
      };
    }
    return {
      border: "border-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/20",
      badge:
        "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
    };
  };

  return (
    <Card className="bg-secondary shadow-none border-none">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-foreground font-poppins flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Decay Signals ({signals.length})
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {signals.map((signal, idx) => {
          const colors = getSeverityColor(signal.severity);
          return (
            <div
              key={idx}
              className={`border-l-4 ${colors.border} ${colors.bg} p-4 rounded-r-lg`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 ${colors.badge} text-xs rounded font-semibold uppercase`}
                >
                  {signal.severity}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {signal.type.replace(/_/g, " ")}
                </span>
              </div>

              {/* Message */}
              <p className="text-sm text-foreground mb-2">{signal.message}</p>

              {/* Examples */}
              {signal.examples && signal.examples.length > 0 && (
                <div className="bg-background/80 p-2 rounded">
                  <strong className="text-xs text-muted-foreground block mb-1">
                    Examples:
                  </strong>
                  <ul className="list-disc list-inside space-y-1">
                    {signal.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-foreground">
                        "{ex}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
