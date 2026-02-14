import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ShieldAlert, Info } from "lucide-react";

interface WcagComplianceData {
  level: string;
  missing_count: number;
  status: string;
}

interface WcagComplianceProps {
  compliance: WcagComplianceData;
}

export default function WcagCompliance({ compliance }: WcagComplianceProps) {
  const isCompliant = compliance.missing_count === 0;
  const isNA = compliance.level === "N/A";

  return (
    <Card className="bg-secondary shadow-none border-none">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isNA
                ? "bg-gray-100 dark:bg-gray-800"
                : isCompliant
                  ? "bg-green-100 dark:bg-green-950/20"
                  : "bg-red-100 dark:bg-red-950/20"
            }`}
          >
            {isNA ? (
              <Info className="w-6 h-6 text-gray-600" />
            ) : isCompliant ? (
              <ShieldCheck className="w-6 h-6 text-green-600" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-red-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground font-poppins mb-1">
              WCAG Compliance
            </h3>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isNA
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    : isCompliant
                      ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300"
                }`}
              >
                {compliance.level}
              </span>
              {compliance.missing_count > 0 && (
                <span className="text-sm text-muted-foreground">
                  {compliance.missing_count} missing alt{" "}
                  {compliance.missing_count === 1 ? "text" : "texts"}
                </span>
              )}
            </div>
            <p className="text-sm text-foreground">{compliance.status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
