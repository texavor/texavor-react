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
    <Card className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3 font-poppins flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Positive Signals
        </h3>
        <ul className="space-y-2">
          {positives.map((positive, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-green-700 dark:text-green-200"
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{positive}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
