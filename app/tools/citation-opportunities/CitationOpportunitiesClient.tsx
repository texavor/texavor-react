"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Loader2,
  Link2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import CitationOpportunitiesSkeleton from "./CitationOpportunitiesSkeleton";
import MetricCard from "@/app/tools/ai-visibility-calculator/MetriCard";
import OpportunityCard from "./components/OpportunityCard";
import EEATImpact from "./components/EEATImpact";
import OpportunityBreakdown from "./components/OpportunityBreakdown";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface CitationOpportunity {
  type: string;
  severity: "critical" | "high" | "medium";
  text: string;
  context: string;
  location: string;
  suggestion: string;
  suggested_sources?: string[];
}

interface CitationResult {
  url: string;
  citation_score: number;
  grade: string;
  total_opportunities: number;
  opportunity_breakdown: {
    uncited_statistics: number;
    expert_claims: number;
    assertions: number;
    product_claims: number;
  };
  opportunities: CitationOpportunity[];
  e_e_a_t_impact: {
    current_level: string;
    missing_citations: number;
    potential_level: string;
    message: string;
  };
  recommendations: string[];
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function CitationOpportunitiesClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/citation_opportunities",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as CitationResult;
    },
    onError: (error: any) => {
      console.error("Citation opportunities error:", error);
    },
  });

  const form = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (turnstileToken) {
        await mutation.mutateAsync(value);
        return;
      }

      setIsWaitingForToken(true);
      setPendingValues(value);
      toast.info("Verifying security, please wait...");
    },
  });

  const result = mutation.data;
  const loading = mutation.isPending;

  const shouldShowUpsell =
    (result?.citation_score ?? 0) < 70 ||
    (result?.total_opportunities ?? 0) > 10 ||
    (result?.opportunity_breakdown?.uncited_statistics ?? 0) > 5;

  // Watch for token and pending values
  useEffect(() => {
    if (turnstileToken && isWaitingForToken && pendingValues) {
      setIsWaitingForToken(false);
      mutation.mutateAsync(pendingValues);
      setPendingValues(null);
    }
  }, [turnstileToken, isWaitingForToken, pendingValues]);

  // Auto-clear pending state after 15 seconds
  useEffect(() => {
    if (isWaitingForToken) {
      const timeout = setTimeout(() => {
        setIsWaitingForToken(false);
        setPendingValues(null);
        toast.error("Security verification timed out. Please try again.");
      }, 15000);
      return () => clearTimeout(timeout);
    }
  }, [isWaitingForToken]);

  const error = mutation.error
    ? (mutation.error as any)?.response?.data?.error ||
      mutation.error?.message ||
      "An unexpected error occurred"
    : null;

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent pb-2 font-poppins">
            Citation Opportunities Finder
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Improve your E-E-A-T and content credibility. Identify claims,
            statistics, and expert advice that need authoritative citations and
            get source suggestions.
          </p>
        </div>

        {/* Search Input Card */}
        <Card className="mb-16 bg-secondary shadow-none border-none mx-auto overflow-visible">
          <CardContent className="px-4 py-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
                <div className="flex-1 w-full space-y-2">
                  <Label htmlFor="url" className="sr-only">
                    Page URL
                  </Label>
                  <form.Field
                    name="url"
                    children={(field) => (
                      <div className="relative">
                        <Link2 className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com/article"
                          className="h-12 pl-10 text-lg bg-slate-50 dark:bg-zinc-950/50 border-input font-inter"
                        />
                        {field.state.meta.errors &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive mt-1 font-medium animate-in slide-in-from-top-1 fade-in duration-300">
                              {String(field.state.meta.errors[0])}
                            </p>
                          )}
                      </div>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 min-w-[180px] font-semibold text-lg bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all rounded-xl transform active:scale-95 transition-transform"
                  disabled={loading || isWaitingForToken}
                >
                  {isWaitingForToken ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Find Opportunities"
                  )}
                </Button>
              </div>
              <div className="flex justify-start">
                <Turnstile
                  siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                    "1x00000000000000000000AA"
                  }
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken("")}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert
            variant="destructive"
            className="mb-8 animate-in fade-in slide-in-from-top-4"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <CitationOpportunitiesSkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    E-E-A-T Optimizer
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Increase site authority by identifying where verifiable
                    citations are needed most.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-indigo-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Source Suggestions
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Get recommended authoritative sources like Gartner, Google,
                    and research journals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            {/* Grade + Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                label="Citation Grade"
                value={result.grade}
                subtext={`Based on ${result.total_opportunities} detected items`}
                type="primary"
                className="h-full"
              />

              <MetricCard
                label="Citation Score"
                value={result.citation_score}
                subtext="Overall content credibility rating"
                type="secondary"
                className="h-full"
              />
            </div>

            {/* Opportunity Breakdown */}
            <OpportunityBreakdown
              breakdown={result.opportunity_breakdown}
              total={result.total_opportunities}
            />

            {/* Opportunities List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-poppins text-[#104127] dark:text-white flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#104127] flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Detected Citation Opportunities
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {result.opportunities.map((opp, idx) => (
                  <OpportunityCard key={idx} opportunity={opp} />
                ))}
              </div>
            </div>

            {/* E-E-A-T Impact */}
            <EEATImpact impact={result.e_e_a_t_impact} />

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
                    💡 Strategic Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="font-medium">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Upsell */}
            {shouldShowUpsell && result.upsell && (
              <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-none shadow-none overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles className="w-32 h-32" />
                </div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-foreground mb-3 font-poppins">
                        {result.upsell.message}
                      </h3>
                      <p className="text-base text-muted-foreground font-medium max-w-xl">
                        Connect your content to the knowledge graph with
                        verified sources for every claim in seconds.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 px-10 h-14 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                      asChild
                    >
                      <a href={result.upsell.cta_link}>
                        Upgrade Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
