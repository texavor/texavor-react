import { Check, X } from "lucide-react";

interface AeoChecks {
  schema_found: boolean;
  syntax_valid?: boolean;
  aeo_type_found?: boolean;
  entity_linking?: string;
  voice_ready?: boolean;
  identity_verified?: boolean;
  hub_content?: boolean;
}

interface AeoChecksTableProps {
  checks: AeoChecks;
}

export default function AeoChecksTable({ checks }: AeoChecksTableProps) {
  const checkItems = [
    { key: "schema_found" as const, label: "Schema Present" },
    { key: "syntax_valid" as const, label: "Valid JSON Syntax" },
    { key: "aeo_type_found" as const, label: "GEO-Friendly Type" },
    { key: "entity_linking" as const, label: "Entity Linking" },
    { key: "voice_ready" as const, label: "Voice Search Ready" },
    { key: "identity_verified" as const, label: "Organization/Author" },
    { key: "hub_content" as const, label: "Hub Content" },
  ];

  return (
    <div className="space-y-0 divide-y divide-border/50">
      {checkItems.map((item) => {
        const value = checks[item.key];

        // Skip if the check is not present in the response
        if (value === undefined) return null;

        const isPass =
          value === true ||
          (typeof value === "string" && value.includes("Strong"));

        return (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 hover:bg-background/50 transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
            {typeof value === "boolean" ? (
              <div className="flex items-center gap-2">
                {isPass ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Pass
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      Missing
                    </span>
                  </>
                )}
              </div>
            ) : (
              <span
                className={`text-sm font-medium ${
                  isPass ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
