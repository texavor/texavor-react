import { Hash, BarChart3, Users, Factory, FileText } from "lucide-react";
import MetricCard from "@/app/tools/ai-visibility-calculator/MetriCard";

interface OpportunityBreakdownData {
  uncited_statistics: number;
  expert_claims: number;
  assertions: number;
  product_claims: number;
}

interface OpportunityBreakdownProps {
  breakdown: OpportunityBreakdownData;
  total: number;
}

export default function OpportunityBreakdown({
  breakdown,
  total,
}: OpportunityBreakdownProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-xl font-semibold font-poppins text-foreground flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
            <BarChart3 className="w-5 h-5 text-current" />
          </span>
          Citation Opportunities
        </h3>
        <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase bg-background px-3 py-1 rounded-full border border-border">
          {total} Total Detected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Statistics"
          value={breakdown.uncited_statistics}
          icon={<Hash className="w-5 h-5 text-current" />}
        />
        <MetricCard
          label="Expert Claims"
          value={breakdown.expert_claims}
          icon={<Users className="w-5 h-5 text-current" />}
        />
        <MetricCard
          label="Assertions"
          value={breakdown.assertions}
          icon={<FileText className="w-5 h-5 text-current" />}
        />
        <MetricCard
          label="Product Claims"
          value={breakdown.product_claims}
          icon={<Factory className="w-5 h-5 text-current" />}
        />
      </div>
    </div>
  );
}
