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
        bg: "bg-red-50/50 dark:bg-red-950/10",
        badge: "bg-red-500/10 text-red-500",
      };
    }
    if (severity === "warning") {
      return {
        border: "border-amber-500",
        bg: "bg-amber-50/50 dark:bg-amber-950/10",
        badge: "bg-amber-500/10 text-amber-500",
      };
    }
    return {
      border: "border-orange-500",
      bg: "bg-orange-50/50 dark:bg-orange-950/10",
      badge: "bg-orange-500/10 text-orange-500",
    };
  };

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-red-500/10 text-red-500">
            <AlertCircle className="w-5 h-5 text-current" />
          </span>
          Decay Signals ({signals.length})
        </h3>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
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
