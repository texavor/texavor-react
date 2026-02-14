import { Card, CardContent } from "@/components/ui/card";
import { Hash, BarChart3, Users, Factory, FileText } from "lucide-react";

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
  const items = [
    {
      label: "Statistics",
      value: breakdown.uncited_statistics,
      icon: <Hash className="w-4 h-4 text-red-500" />,
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Expert Claims",
      value: breakdown.expert_claims,
      icon: <Users className="w-4 h-4 text-orange-500" />,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Assertions",
      value: breakdown.assertions,
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Product Claims",
      value: breakdown.product_claims,
      icon: <Factory className="w-4 h-4 text-emerald-500" />,
      color: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Citation Opportunities ({total} Total)
          </h3>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-background/50 px-3 py-1 rounded-full">
            By Category
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-primary/5 dark:bg-zinc-900/50 rounded-2xl p-5 text-center border border-border/50 shadow-none transition-colors group"
            >
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-background dark:bg-zinc-800 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
              </div>
              <div
                className={`font-black text-4xl font-inter mb-1 ${item.color}`}
              >
                {item.value}
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
