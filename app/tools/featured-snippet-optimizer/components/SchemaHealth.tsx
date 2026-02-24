import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, XCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SchemaHealthData {
  has_faq: boolean;
  has_howto: boolean;
  has_speakable: boolean;
  recommendation: string;
}

interface SchemaHealthProps {
  data: SchemaHealthData;
}

export default function SchemaHealth({ data }: SchemaHealthProps) {
  const schemas = [
    { label: "FAQ Schema", status: data.has_faq },
    { label: "HowTo Schema", status: data.has_howto },
    { label: "Speakable", status: data.has_speakable },
  ];

  return (
    <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05]">
        <ShieldCheck className="w-32 h-32 text-primary" />
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary fill-primary" />
          </div>
          <h3 className="text-2xl font-bold font-poppins text-foreground uppercase tracking-tight">
            Snippet Schema Health
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {schemas.map((s, idx) => (
            <div
              key={idx}
              className="bg-muted/30 p-5 rounded-lg border border-border flex items-center justify-between group hover:border-primary/40 transition-colors"
            >
              <span className="text-sm font-bold text-foreground uppercase tracking-widest">
                {s.label}
              </span>
              {s.status ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive/50 group-hover:text-destructive/80 transition-colors" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-primary/5 p-6 rounded-lg border border-border shadow-none border-l-4 border-l-primary">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
            Schema Recommendation
          </div>
          <p className="text-base font-medium text-foreground leading-relaxed">
            {data.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
