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
    <Card className="bg-primary/5 dark:bg-zinc-900/50 border border-border/50 shadow-none overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05]">
        <ShieldCheck className="w-32 h-32 text-blue-600" />
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#104127] flex items-center justify-center shadow-md">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h3 className="text-2xl font-bold font-poppins text-[#104127] dark:text-white uppercase tracking-tight">
            Snippet Schema Health
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {schemas.map((s, idx) => (
            <div
              key={idx}
              className="bg-background dark:bg-zinc-900 p-5 rounded-2xl border border-border/50 flex items-center justify-between group hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                {s.label}
              </span>
              {s.status ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500/20 group-hover:text-red-500/50 transition-colors" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-border/50 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">
            Schema Recommendation
          </div>
          <p className="text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
