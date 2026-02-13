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
    <Card className="bg-secondary shadow-none border-none">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-foreground font-poppins flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          AI-Powered Suggestions
        </h3>
        <p className="text-sm text-muted-foreground">
          Add citations to these claims to improve your E-E-A-T score
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-background/50 space-y-3"
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
