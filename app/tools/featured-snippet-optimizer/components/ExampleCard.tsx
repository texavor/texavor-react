import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Quote } from "lucide-react";

interface GoodExample {
  header: string;
  answer?: string;
  status: string;
  type: string;
}

interface ExampleCardProps {
  example: GoodExample;
}

export default function ExampleCard({ example }: ExampleCardProps) {
  return (
    <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
        <Sparkles className="w-16 h-16 text-[#104127]" />
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#104127] dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-black text-[#104127] dark:text-emerald-400 uppercase tracking-widest mb-0.5">
              Optimized Pattern
            </div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              Type: {example.type}
            </h4>
          </div>
        </div>

        <div className="bg-background/80 dark:bg-zinc-800 p-5 rounded-2xl border border-border/40 shadow-sm mb-4">
          <div className="text-xs font-bold text-[#104127] dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Quote className="w-3 h-3" />
            Target Header
          </div>
          <p className="font-poppins font-bold text-slate-800 dark:text-white leading-tight">
            "{example.header}"
          </p>
        </div>

        {example.answer && (
          <div className="bg-emerald-50/30 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {example.answer}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <span className="text-[10px] font-black text-[#104127] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50 uppercase tracking-tighter">
            {example.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
