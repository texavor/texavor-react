import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Code } from "lucide-react";

interface SchemaStatusData {
  has_mentions: boolean;
  has_about: boolean;
  has_same_as: boolean;
  message: string;
}

interface SchemaStatusProps {
  status: SchemaStatusData;
}

export default function SchemaStatus({ status }: SchemaStatusProps) {
  const hasAnySchema =
    status.has_mentions || status.has_about || status.has_same_as;

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-foreground font-poppins mb-4 flex items-center gap-2">
          <span
            className={`p-1.5 rounded-md flex items-center justify-center ${
              hasAnySchema
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-orange-500/10 text-orange-500"
            }`}
          >
            <Code className="w-5 h-5 text-current" />
          </span>
          Schema Markup Status
        </h3>

        <div className="bg-background border border-border p-4 rounded-lg">
          <p
            className={`text-sm font-medium mb-4 ${
              hasAnySchema
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-orange-600 dark:text-orange-400"
            }`}
          >
            {status.message}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              {status.has_mentions ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span
                className={`font-medium ${
                  status.has_mentions
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                "mentions" property
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              {status.has_about ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span
                className={`font-medium ${
                  status.has_about ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                "about" property
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              {status.has_same_as ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground/50" />
              )}
              <span
                className={`font-medium ${
                  status.has_same_as
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                "sameAs" property
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
