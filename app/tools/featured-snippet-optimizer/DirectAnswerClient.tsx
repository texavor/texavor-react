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
  MessageSquareText,
  Loader2,
  Link2,
  ArrowRight,
  Sparkles,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import DirectAnswerSkeleton from "./DirectAnswerSkeleton";
import MetricCard from "@/app/tools/ai-visibility-calculator/MetriCard";
import OpportunityCard from "./components/OpportunityCard";
import ExampleCard from "./components/ExampleCard";
import SchemaHealth from "./components/SchemaHealth";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface Opportunity {
  header: string;
  issue: string;
  severity: "critical" | "high" | "medium";
  suggestion: string;
}

interface GoodExample {
  header: string;
  answer?: string;
  status: string;
  type: string;
}

interface DirectAnswerResult {
  url: string;
  score: number;
  grade: string;
  opportunities: Opportunity[];
  good_examples: GoodExample[];
  schema_status: {
    has_faq: boolean;
    has_howto: boolean;
    has_speakable: boolean;
    recommendation: string;
  };
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function DirectAnswerClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/direct_answer",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as DirectAnswerResult;
    },
    onError: (error: any) => {
      console.error("Direct answer error:", error);
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
    (result?.score ?? 0) < 80 || (result?.opportunities?.length ?? 0) > 3;

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
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Direct Answer Optimizer
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Win "Position Zero" and AI-driven direct answers. Detect headers
              missing concise answers, validate answer structures, and optimize
              your schema for rich results.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto pt-10 md:pt-16 pb-24">
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
                        <Link2 className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com/article"
                          className="h-11 pl-10 text-base bg-background border-input font-inter"
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
                  className="h-11 w-48 font-semibold text-base shrink-0 rounded-md"
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
                    "Optimize Snippets"
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
        {loading && <DirectAnswerSkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16 opacity-90">
            {/* Feature 1 */}
            <div className="relative group">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center mb-3">
                    <MessageSquareText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Header-Answer Validation
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                    Automatically detect headers that ask questions and validate
                    if the following content provides a concise direct answer.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Rich Snippet Eligibility
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                    Ensure your content is formatted correctly for list and
                    paragraph snippets with specialized schema health checks.
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
                label="Answer Grade"
                value={result.grade}
                subtext="Overall direct answer readiness"
                type="primary"
                className="h-full"
              />

              <MetricCard
                label="Snapshot Score"
                value={result.score}
                subtext="Optimization rating for Position Zero"
                type="secondary"
                className="h-full"
              />
            </div>

            {/* Opportunities List */}
            {result.opportunities && result.opportunities.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-poppins text-foreground flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-red-600 dark:text-red-400 rotate-45" />
                  </div>
                  Optimization Opportunities
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {result.opportunities.map((opp, idx) => (
                    <OpportunityCard key={idx} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {/* Good Examples */}
            {result.good_examples && result.good_examples.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-poppins text-foreground flex items-center gap-3 mb-8 pt-8">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Optimized Snippets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.good_examples.map((example, idx) => (
                    <ExampleCard key={idx} example={example} />
                  ))}
                </div>
              </div>
            )}

            {/* Schema Health */}
            <SchemaHealth data={result.schema_status} />

            {/* Upsell */}
            {shouldShowUpsell && result.upsell && (
              <div className="relative pt-12">
                <div className="relative bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-1">
                    <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                      {result.upsell.message}
                    </h3>
                    <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed mb-6">
                      Rank higher in AI search engines and win the featured
                      snippet with auto-generated optimized answers.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button
                      asChild
                      variant="brand"
                      size="lg"
                      className="h-12 px-8 font-semibold text-lg rounded-md"
                    >
                      <a href={result.upsell.cta_link}>
                        Try Texavor Pro
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
