import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface Issue {
  type: string;
  severity: "critical" | "warning";
  image_src: string;
  message: string;
  current_alt?: string;
  suggestion?: string;
  images?: string[];
  duplicate_text?: string;
}

interface IssuesListProps {
  issues: Issue[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (!issues || issues.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card border border-border shadow-none rounded-xl">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-red-500/10 text-red-500">
            <AlertCircle className="w-5 h-5 text-current" />
          </span>
          Issues Found ({issues.length})
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {issues.map((issue, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-4 rounded-r-lg ${
              issue.severity === "critical"
                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {issue.severity === "critical" ? (
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs rounded font-semibold">
                    Critical
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 text-xs rounded font-semibold">
                    Warning
                  </span>
                )}
              </div>
            </div>

            {/* Image Source */}
            {issue.image_src && (
              <div className="mb-2">
                <span className="font-mono text-xs text-muted-foreground break-all">
                  {issue.image_src}
                </span>
              </div>
            )}

            {/* Multiple Images (for duplicates) */}
            {issue.images && issue.images.length > 0 && (
              <div className="mb-2">
                {issue.images.map((img, i) => (
                  <div
                    key={i}
                    className="font-mono text-xs text-muted-foreground break-all"
                  >
                    {img}
                  </div>
                ))}
              </div>
            )}

            {/* Message */}
            <p className="text-sm text-foreground mb-2">{issue.message}</p>

            {/* Current Alt */}
            {issue.current_alt && (
              <div className="bg-background/80 p-2 rounded mb-2">
                <strong className="text-xs text-muted-foreground block mb-1">
                  Current:
                </strong>
                <p className="text-sm text-foreground">"{issue.current_alt}"</p>
              </div>
            )}

            {/* Duplicate Text */}
            {issue.duplicate_text && (
              <div className="bg-background/80 p-2 rounded mb-2">
                <strong className="text-xs text-muted-foreground block mb-1">
                  Duplicate Text:
                </strong>
                <p className="text-sm text-foreground">
                  "{issue.duplicate_text}"
                </p>
              </div>
            )}

            {/* Suggestion */}
            {issue.suggestion && (
              <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded border border-green-200 dark:border-green-800">
                <strong className="text-xs text-green-700 dark:text-green-300 block mb-1">
                  💡 Suggested:
                </strong>
                <p className="text-sm text-green-800 dark:text-green-200">
                  "{issue.suggestion}"
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
