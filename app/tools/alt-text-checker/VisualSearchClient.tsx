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
import {
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import VisualSearchSkeleton from "./VisualSearchSkeleton";
import ScoreDisplay from "@/app/tools/aeo-schema-validator/components/ScoreDisplay";
import StatsGrid from "./components/StatsGrid";
import IssuesList from "./components/IssuesList";
import GoodExamples from "./components/GoodExamples";
import WcagCompliance from "./components/WcagCompliance";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface Issue {
  type: string;
  severity: "critical" | "warning";
  image_src: string;
  message: string;
  current_alt?: string;
  suggestion?: string;
  images?: string[];
  duplicate_text?: string;
}

interface GoodExample {
  src: string;
  alt: string;
  reason: string;
}

interface WcagComplianceData {
  level: string;
  missing_count: number;
  status: string;
}

interface VisualSearchResult {
  url: string;
  score: number;
  grade: string;
  total_images: number;
  stats: {
    with_alt: number;
    without_alt: number;
    too_short: number;
    too_long: number;
    duplicate_alt: number;
    keyword_stuffed: number;
    decorative: number;
  };
  issues: Issue[];
  good_examples: GoodExample[];
  opportunities: string[];
  wcag_compliance: WcagComplianceData;
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function VisualSearchClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/visual_search",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as VisualSearchResult;
    },
    onError: (error: any) => {
      console.error("Visual search error:", error);
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
    (result?.score ?? 0) < 70 ||
    (result?.stats?.without_alt ?? 0) > 5 ||
    (result?.issues && result.issues.length > 10);

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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent pb-2 font-poppins">
            Alt Text Checker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Audit images for WCAG accessibility compliance and Google Lens
            visual search optimization. Find missing alt text, duplicates, and
            get AI-powered suggestions.
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
                        <ImageIcon className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
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
                    "Check Alt Text"
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
        {loading && <VisualSearchSkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    WCAG Compliance
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Detect missing alt text and accessibility violations
                    instantly.
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-cyan-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center mb-3">
                    <ImageIcon className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    Visual Search SEO
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Optimize for Google Lens with keyword-rich, descriptive alt
                    text.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            {/* Score + Total Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreDisplay
                score={result.score}
                grade={result.grade}
                type="primary"
                className="h-full"
              />

              {/* Total Images Card */}
              <div className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400">
                    Total Images
                  </h3>
                </div>
                <div>
                  <div className="text-5xl font-bold tracking-tight mb-2 font-inter text-slate-900 dark:text-white">
                    {result.total_images}
                  </div>
                  <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                    Images Analyzed
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid stats={result.stats} />

            {/* WCAG Compliance + Issues/Examples - Combined Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* WCAG Compliance */}
              <WcagCompliance compliance={result.wcag_compliance} />

              {/* Good Examples or Issues (prioritize good examples if available) */}
              {result.good_examples && result.good_examples.length > 0 ? (
                <GoodExamples examples={result.good_examples} />
              ) : result.issues && result.issues.length > 0 ? (
                <IssuesList issues={result.issues} />
              ) : null}
            </div>

            {/* Issues (if good examples were shown above) */}
            {result.good_examples &&
              result.good_examples.length > 0 &&
              result.issues &&
              result.issues.length > 0 && <IssuesList issues={result.issues} />}

            {/* Opportunities */}
            {result.opportunities && result.opportunities.length > 0 && (
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
                    Optimization Opportunities
                  </h3>
                  <ul className="space-y-2">
                    {result.opportunities.map((opp, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{opp}</span>
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
                        Auto-generate descriptive, SEO-optimized alt text in
                        seconds.
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
