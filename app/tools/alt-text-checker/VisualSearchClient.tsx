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
    <div className="min-h-screen dark:bg-zinc-950 font-sans">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Alt Text Checker
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Audit images for WCAG accessibility compliance and Google Lens
              visual search optimization. Find missing alt text, duplicates, and
              get actionable suggestions.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-4 mx-auto pb-20 pt-10 md:pt-16">
        {/* Search Input Card */}
        <Card className="mb-16 bg-card border border-border shadow-none rounded-lg mx-auto overflow-hidden">
          <CardContent className="px-6 py-5">
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
                          className="h-11 pl-10 text-base bg-background border-input"
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
                  size="default"
                  variant="brand"
                  className="h-11 w-40 font-semibold text-base shrink-0 rounded-md"
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
                    "Analyze"
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
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1 */}
            <div className="relative group">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    WCAG Compliance
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Detect missing alt text and accessibility violations
                    instantly.
                  </p>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 p-2 bg-background border border-border/50 rounded-lg">
                      <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      </div>
                      <div className="h-2 bg-red-100 dark:bg-red-900/30 rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-50/50 dark:bg-cyan-900/20 flex items-center justify-center mb-3">
                    <ImageIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    Visual Search SEO
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Optimize for Google Lens with keyword-rich, descriptive alt
                    text.
                  </p>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="bg-card border border-border rounded-lg p-3 mt-2 flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded shrink-0"></div>
                    <div className="space-y-2 flex-1 pt-1 opacity-60">
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-2 bg-primary/20 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            {/* Score + Total Images */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-4 h-full">
                <ScoreDisplay
                  score={result.score}
                  grade={result.grade}
                  type="primary"
                />
              </div>

              {/* Total Images Card */}
              <div className="md:col-span-8 h-full">
                <div className="rounded-xl p-8 bg-card border border-border shadow-none h-full flex flex-col justify-center items-center text-center">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-semibold font-poppins text-foreground">
                      Images Analyzed
                    </h3>
                  </div>
                  <div>
                    <div className="text-6xl font-bold tracking-tight mb-2 font-inter text-foreground">
                      {result.total_images}
                    </div>
                    <div className="text-sm font-medium font-inter text-muted-foreground">
                      Total images found on page
                    </div>
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
              <Card className="bg-card shadow-none border border-border rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground mb-4">
                  <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
                    <svg
                      className="w-5 h-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </span>
                  Optimization Opportunities
                </h3>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    {result.opportunities.map((opp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-background p-3 rounded-lg border border-border"
                      >
                        <svg
                          className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Upsell */}
            {shouldShowUpsell && result.upsell && (
              <Card className="bg-primary/5 border border-primary/20 shadow-none rounded-xl">
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
                      variant="brand"
                      className="px-8 shrink-0 rounded-md"
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
