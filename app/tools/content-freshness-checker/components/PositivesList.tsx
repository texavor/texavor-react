import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PositivesListProps {
  positives: string[];
}

export default function PositivesList({ positives }: PositivesListProps) {
  if (!positives || positives.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-green-500/10 text-green-500">
            <CheckCircle2 className="w-5 h-5 text-current" />
          </span>
          Positive Signals
        </h3>
        <ul className="space-y-3">
          {positives.map((positive, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm font-medium text-foreground bg-background p-3 rounded-lg border border-border"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{positive}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
