import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface Suggestion {
  uncited_claim: string;
  suggestion: string;
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl h-full">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-amber-500/10 text-amber-500">
            <Lightbulb className="w-5 h-5 text-current" />
          </span>
          AI-Powered Suggestions
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add citations to these claims to improve your E-E-A-T score
        </p>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6 pt-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="space-y-2 pb-6 border-b border-border/30 last:border-0 last:pb-0"
          >
            {/* Uncited Claim */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Uncited Claim:
              </p>
              <p className="text-sm font-medium text-foreground">
                &quot;{suggestion.uncited_claim}&quot;
              </p>
            </div>

            {/* Suggestion */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Recommendation:
              </p>
              <p className="text-sm text-primary font-medium break-words">
                {suggestion.suggestion}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
