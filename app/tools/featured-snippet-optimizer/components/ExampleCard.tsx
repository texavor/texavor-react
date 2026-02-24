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
    <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden relative group transition-all duration-300 hover:border-primary/40">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
        <Sparkles className="w-16 h-16 text-primary" />
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">
              Optimized Pattern
            </div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              Type: {example.type}
            </h4>
          </div>
        </div>

        <div className="bg-muted/30 p-5 rounded-lg border border-border shadow-none mb-4">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
            <Quote className="w-3 h-3" />
            Target Header
          </div>
          <p className="font-poppins font-medium text-foreground leading-tight">
            "{example.header}"
          </p>
        </div>

        {example.answer && (
          <div className="bg-primary/5 p-5 rounded-lg border border-border/60">
            <p className="text-sm font-normal text-muted-foreground leading-relaxed italic">
              {example.answer}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20 uppercase tracking-tight">
            {example.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
