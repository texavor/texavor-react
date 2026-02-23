import React from "react";
import { cn } from "@/lib/utils";

interface AEOHealthGridProps {
  checks: {
    schema_found: boolean;
    syntax_valid: boolean;
    aeo_type_found: boolean;
    entity_linking: string;
    voice_ready: boolean;
    identity_verified: boolean;
  };
}

const HealthItem = ({
  label,
  value,
  subtext,
  icon,
  status,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  status: "good" | "warning" | "error";
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border shadow-none transition-colors hover:border-primary/20">
      <div
        className={cn(
          "w-10 h-10 rounded-md flex items-center justify-center shrink-0",
          status === "good"
            ? "bg-emerald-500/10 text-emerald-500"
            : status === "warning"
              ? "bg-amber-500/10 text-amber-500"
              : "bg-red-500/10 text-red-500",
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground truncate">
          {label}
        </p>
        <p className="text-lg font-bold text-foreground font-poppins truncate">
          {value}
        </p>
      </div>
      {subtext && (
        <div className="shrink-0 text-right">
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-md font-medium inline-block",
              status === "good"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : status === "warning"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400",
            )}
          >
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
};

const AEOHealthGrid = ({ checks }: AEOHealthGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* 1. Schema Presence */}
      <HealthItem
        label="Schema Found"
        value={checks.schema_found ? "Detected" : "Missing"}
        status={checks.schema_found ? "good" : "error"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10 13l-2 2 2 2" />
            <path d="M14 17l2-2-2-2" />
          </svg>
        }
        subtext={
          checks.schema_found ? "JSON-LD Detected" : "No Structured Data"
        }
      />

      {/* 2. Syntax Validation */}
      <HealthItem
        label="Syntax Validity"
        value={checks.syntax_valid ? "Valid" : "Invalid"}
        status={checks.syntax_valid ? "good" : "error"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        }
        subtext={checks.syntax_valid ? "No Errors" : "Parsing Errors"}
      />

      {/* 3. AEO Specific Types */}
      <HealthItem
        label="GEO Optimization"
        value={checks.aeo_type_found ? "Optimized" : "Basic"}
        status={checks.aeo_type_found ? "good" : "warning"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        }
        subtext={checks.aeo_type_found ? "FAQ/HowTo Found" : "No GEO Types"}
      />

      {/* 4. Voice Readiness */}
      <HealthItem
        label="Voice Readiness"
        value={checks.voice_ready ? "Ready" : "Not Optimized"}
        status={checks.voice_ready ? "good" : "warning"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        }
        subtext="Speakable Schema"
      />

      {/* 5. Entity Linking */}
      <HealthItem
        label="Entity Depth"
        value={checks.entity_linking.includes("Strong") ? "Strong" : "Weak"}
        status={checks.entity_linking.includes("Strong") ? "good" : "warning"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        }
        subtext={checks.entity_linking}
      />

      {/* 6. Identity Verification */}
      <HealthItem
        label="Identity"
        value={checks.identity_verified ? "Verified" : "Unverified"}
        status={checks.identity_verified ? "good" : "warning"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
        subtext={
          checks.identity_verified ? "Organization/Person" : "Unknown Publisher"
        }
      />
    </div>
  );
};

export default AEOHealthGrid;
