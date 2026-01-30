import React from "react";
import MetricCard from "../../ai-visibility-calculator/MetriCard";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Mic,
  FileJson,
  Code,
  Search,
} from "lucide-react";

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

const AEOHealthGrid = ({ checks }: AEOHealthGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* 1. Schema Presence */}
      <MetricCard
        label="Schema Found"
        value={checks.schema_found ? "Detected" : "Missing"}
        icon={<FileJson className="w-5 h-5 text-emerald-500" />}
        subtext={
          checks.schema_found ? "JSON-LD Detected" : "No Structured Data"
        }
        type="secondary"
      />

      {/* 2. Syntax Validation */}
      <MetricCard
        label="Syntax Validity"
        value={checks.syntax_valid ? "Valid" : "Invalid"}
        icon={<Code className="w-5 h-5 text-emerald-500" />}
        subtext={checks.syntax_valid ? "No Errors" : "Parsing Errors"}
        type="secondary"
      />

      {/* 3. AEO Specific Types */}
      <MetricCard
        label="AEO Optimization"
        value={checks.aeo_type_found ? "Optimized" : "Basic"}
        icon={<Search className="w-5 h-5 text-emerald-500" />}
        subtext={checks.aeo_type_found ? "FAQ/HowTo Found" : "No AEO Types"}
        type="secondary"
      />

      {/* 4. Voice Readiness */}
      <MetricCard
        label="Voice Readiness"
        value={checks.voice_ready ? "Ready" : "Not Optimized"}
        icon={<Mic className="w-5 h-5 text-emerald-500" />}
        subtext="Speakable Schema"
        type="secondary"
      />

      {/* 5. Entity Linking */}
      <MetricCard
        label="Entity Depth"
        value={checks.entity_linking.includes("Strong") ? "Strong" : "Weak"}
        icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
        subtext={checks.entity_linking}
        type="secondary"
      />

      {/* 6. Identity Verification */}
      <MetricCard
        label="Identity"
        value={checks.identity_verified ? "Verified" : "Unverified"}
        icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
        subtext={
          checks.identity_verified ? "Organization/Person" : "Unknown Publisher"
        }
        type="secondary"
      />
    </div>
  );
};

export default AEOHealthGrid;
