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
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pb-2 font-poppins">
            Direct Answer Optimizer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Win the "Position Zero" and AI-driven direct answers. Detect headers
            missing concise answers, validate answer structures, and optimize
            your schema for rich results.
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
                  className="h-12 px-8 min-w-[200px] font-semibold text-lg bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all rounded-xl transform active:scale-95 transition-transform"
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center mb-3">
                    <MessageSquareText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Header-Answer Validation
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Automatically detect headers that ask questions and validate
                    if the following content provides a concise direct answer.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-indigo-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Rich Snippet Eligibility
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
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
                <h3 className="text-2xl font-bold font-poppins text-[#104127] dark:text-white flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6 text-white rotate-45" />
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
                <h3 className="text-2xl font-bold font-poppins text-[#104127] dark:text-white flex items-center gap-3 mb-8 pt-8">
                  <div className="w-10 h-10 rounded-xl bg-[#104127] flex items-center justify-center shadow-lg">
                    <CheckSquare className="w-6 h-6 text-white" />
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
              <Card className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-none shadow-none overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles className="w-32 h-32" />
                </div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-foreground mb-3 font-poppins text-[#104127] dark:text-blue-400">
                        {result.upsell.message}
                      </h3>
                      <p className="text-base text-muted-foreground font-medium max-w-xl">
                        Rank higher in AI search engines and win the featured
                        snippet with auto-generated optimized answers.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 px-10 h-14 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                      asChild
                    >
                      <a href={result.upsell.cta_link}>
                        Try Texavor Pro
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
