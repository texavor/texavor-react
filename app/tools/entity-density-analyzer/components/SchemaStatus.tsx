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
    <Card
      className={`shadow-none border-none ${
        hasAnySchema
          ? "bg-green-50 dark:bg-green-950/20"
          : "bg-orange-50 dark:bg-orange-950/20"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              hasAnySchema
                ? "bg-green-100 dark:bg-green-900/50"
                : "bg-orange-100 dark:bg-orange-900/50"
            }`}
          >
            <Code
              className={`w-6 h-6 ${
                hasAnySchema
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground font-poppins mb-2">
              Schema Markup Status
            </h3>
            <p
              className={`text-sm mb-4 ${
                hasAnySchema
                  ? "text-green-700 dark:text-green-200"
                  : "text-orange-700 dark:text-orange-200"
              }`}
            >
              {status.message}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                {status.has_mentions ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                <span
                  className={
                    status.has_mentions
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  "mentions" property
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {status.has_about ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                <span
                  className={
                    status.has_about
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  "about" property
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {status.has_same_as ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                <span
                  className={
                    status.has_same_as
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  "sameAs" property
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
