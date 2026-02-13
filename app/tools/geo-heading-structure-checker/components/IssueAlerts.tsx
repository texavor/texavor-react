import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface Issue {
  type: "missing_h1" | "multiple_h1" | "skipped_level" | "empty_heading";
  severity: "error" | "warning";
  message: string;
}

interface IssueAlertsProps {
  issues: Issue[];
}

export default function IssueAlerts({ issues }: IssueAlertsProps) {
  if (!issues || issues.length === 0) return null;

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <Alert
          variant="destructive"
          className="dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
        >
          <AlertTriangle className="h-4 w-4 dark:text-red-400" />
          <AlertTitle className="dark:text-red-400 font-semibold">
            {errors.length} Critical {errors.length === 1 ? "Issue" : "Issues"}{" "}
            Detected
          </AlertTitle>
          <AlertDescription className="dark:text-red-300 mt-2">
            <ul className="space-y-1 list-disc pl-4">
              {errors.map((error, i) => (
                <li key={i} className="text-sm">
                  {error.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {warnings.length > 0 && (
        <Alert className="dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-400 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 dark:text-yellow-400 text-yellow-600" />
          <AlertTitle className="dark:text-yellow-400 text-yellow-700 font-semibold">
            {warnings.length} {warnings.length === 1 ? "Warning" : "Warnings"}
          </AlertTitle>
          <AlertDescription className="dark:text-yellow-300 text-yellow-600 mt-2">
            <ul className="space-y-1 list-disc pl-4">
              {warnings.map((warning, i) => (
                <li key={i} className="text-sm">
                  {warning.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
