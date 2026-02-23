import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink, XCircle, CheckCircle } from "lucide-react";
import AuthorityBadge from "./AuthorityBadge";

interface Citation {
  domain: string;
  anchor: string;
  tier: "high" | "medium" | "low";
  tier_label: string;
  url: string;
  is_broken: boolean;
}

interface CitationsTableProps {
  citations: Citation[];
}

export default function CitationsTable({ citations }: CitationsTableProps) {
  if (!citations || citations.length === 0) {
    return (
      <Card className="bg-card shadow-none border border-border rounded-xl">
        <CardContent className="p-8 text-center text-muted-foreground">
          No citations detected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins">
          Citations Breakdown
        </h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="space-y-0">
            {citations?.map((citation, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-border/30 last:border-b-0 gap-3"
              >
                {/* Domain & Anchor */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm text-foreground break-words">
                      {citation.domain}
                    </p>
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground break-words">
                    &quot;{citation.anchor}&quot;
                  </p>
                </div>

                {/* Authority Badge */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <AuthorityBadge
                    tier={citation.tier}
                    label={citation.tier_label}
                  />

                  {/* Status */}
                  {citation.is_broken ? (
                    <div className="flex items-center gap-1 text-red-500 text-xs font-medium">
                      <XCircle className="w-4 h-4" />
                      <span>Broken</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Live</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
