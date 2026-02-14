"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import * as z from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Loader2, TrendingUp, ArrowRight, Calendar } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import ContentFreshnessSkeleton from "./ContentFreshnessSkeleton";
import ScoreDisplay from "@/app/tools/aeo-schema-validator/components/ScoreDisplay";
import DatesCard from "./components/DatesCard";
import DecaySignals from "./components/DecaySignals";
import PositivesList from "./components/PositivesList";
import CompetitiveFreshness from "./components/CompetitiveFreshness";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface DecaySignal {
  type: string;
  severity: "critical" | "warning" | "minor";
  examples?: string[];
  message: string;
}

interface DatesFound {
  published: string | null;
  last_modified: string | null;
  age_days: number | null;
  last_update_days: number | null;
}

interface CompetitiveFreshnessData {
  avg_competitor_age: string;
  your_advantage: string;
}

interface ContentFreshnessResult {
  url: string;
  freshness_score: number;
  grade: string;
  dates_found: DatesFound;
  decay_signals: DecaySignal[];
  positives: string[];
  recommendations: string[];
  competitive_freshness?: CompetitiveFreshnessData;
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function ContentFreshnessClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/content_freshness",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as ContentFreshnessResult;
    },
    onError: (error: any) => {
      console.error("Content freshness error:", error);
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
    (result?.freshness_score ?? 0) < 70 ||
    (result?.dates_found?.age_days ?? 0) > 180 ||
    (result?.decay_signals && result.decay_signals.length > 3);

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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2 font-poppins">
            Content Freshness Checker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Detect content decay signals, find outdated statistics, and get
            actionable update recommendations to keep your content fresh and
            SEO-friendly.
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
                        <Clock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com/article"
                          className="h-12 pl-10 text-lg bg-slate-50 dark:bg-zinc-950/50 border-input"
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
                  className="h-12 px-8 min-w-[180px] font-semibold text-lg bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all rounded-xl"
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
                    "Check Freshness"
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
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <ContentFreshnessSkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    Date Detection
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Extract publish and modified dates from schema markup and
                    meta tags.
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    Decay Detection
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Find outdated statistics, deprecated tools, and stale
                    content signals.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            {/* Score + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreDisplay
                score={result.freshness_score}
                grade={result.grade}
                type="primary"
                className="h-full"
              />

              <DatesCard dates={result.dates_found} />
            </div>

            {/* Positives and Decay Signals */}
            {result.positives && result.positives.length > 0 && (
              <PositivesList positives={result.positives} />
            )}

            {result.decay_signals && result.decay_signals.length > 0 && (
              <DecaySignals signals={result.decay_signals} />
            )}

            {/* Competitive Freshness */}
            {result.competitive_freshness && (
              <CompetitiveFreshness data={result.competitive_freshness} />
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
                    💡 Update Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Upsell */}
            {shouldShowUpsell && result.upsell && (
              <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-none shadow-none">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">
                        {result.upsell.message}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Get alerts when content becomes stale and auto-generate
                        update suggestions.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 px-8"
                      asChild
                    >
                      <a href={result.upsell.cta_link}>
                        Upgrade Now
                        <ArrowRight className="ml-2 w-4 h-4" />
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
