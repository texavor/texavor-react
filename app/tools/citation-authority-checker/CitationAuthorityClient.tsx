"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  AlertTriangle,
  Globe,
  Shield,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import CitationAuthoritySkeleton from "./CitationAuthoritySkeleton";
import CitationStatsGrid from "./components/CitationStatsGrid";
import CitationsTable from "./components/CitationsTable";
import SuggestionsList from "./components/SuggestionsList";
import Link from "next/link";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface Citation {
  domain: string;
  anchor: string;
  authority_tier: "high" | "medium" | "low";
  url: string;
  is_broken: boolean;
}

interface Suggestion {
  uncited_claim: string;
  suggestion: string;
}

interface CitationValidatorResult {
  citation_score: number;
  stats: {
    total_citations: number;
    high_authority: number;
    medium_authority: number;
    low_authority: number;
    broken: number;
  };
  high_authority_sources: Citation[];
  medium_authority_sources: Citation[];
  low_authority_sources: Citation[];
  broken_links: Citation[];
  issues: string[];
  suggestions?: Suggestion[];
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function CitationAuthorityClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/citation_validator",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as CitationValidatorResult;
    },
    onError: (error: any) => {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const form = useForm({
    defaultValues: { url: "" },
    //@ts-ignore
    validatorAdapter: zodValidator(),
    //@ts-ignore
    validators: { onChange: formSchema },
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

  // Combine all citation sources into one array with tier_label for display
  const allCitations = result
    ? [
        ...(result.high_authority_sources || []).map((c) => ({
          ...c,
          tier: "high" as const,
          tier_label: "Government/Educational",
        })),
        ...(result.medium_authority_sources || []).map((c) => ({
          ...c,
          tier: "medium" as const,
          tier_label: "Medium Authority",
        })),
        ...(result.low_authority_sources || []).map((c) => ({
          ...c,
          tier: "low" as const,
          tier_label: "Low Authority",
        })),
      ]
    : [];

  // Watch for token and pending values
  useEffect(() => {
    if (turnstileToken && isWaitingForToken && pendingValues) {
      setIsWaitingForToken(false);
      mutation.mutateAsync(pendingValues);
      setPendingValues(null);
    }
  }, [turnstileToken, isWaitingForToken, pendingValues]);

  // Timeout safety
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isWaitingForToken) {
      timeout = setTimeout(() => {
        if (isWaitingForToken) {
          setIsWaitingForToken(false);
          setPendingValues(null);
          toast.error(
            "Security verification timeout. Please refresh and try again.",
          );
        }
      }, 15000);
    }
    return () => clearTimeout(timeout);
  }, [isWaitingForToken]);

  const error = mutation.error
    ? (mutation.error as any)?.response?.data?.message ||
      mutation.error?.message
    : null;

  const shouldShowUpsell = result?.upsell;

  const getScoreGrade = (score: number) => {
    if (score >= 90)
      return { letter: "A", color: "text-emerald-500", fill: "#10b981" };
    if (score >= 80)
      return { letter: "B", color: "text-emerald-500", fill: "#10b981" };
    if (score >= 70)
      return { letter: "C", color: "text-yellow-500", fill: "#eab308" };
    if (score >= 60)
      return { letter: "D", color: "text-yellow-500", fill: "#eab308" };
    return { letter: "F", color: "text-red-500", fill: "#ef4444" };
  };

  const gradeInfo = result ? getScoreGrade(result.citation_score) : null;

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Citation Authority Checker
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Google&apos;s E-E-A-T guidelines require content to cite
              authoritative sources. Analyze your outbound links, score them by
              domain authority, and identify uncited claims.
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
                    Article URL
                  </Label>
                  <form.Field
                    name="url"
                    children={(field) => (
                      <div className="relative">
                        <Globe className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com/article"
                          className="h-11 pl-10 text-base bg-background border-input"
                        />
                        {field.state.meta.errors ? (
                          <p className="text-sm text-destructive mt-1 font-medium animate-in slide-in-from-top-1 fade-in duration-300">
                            {field?.state?.meta?.errors[0]?.message}
                          </p>
                        ) : null}
                      </div>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="default"
                  variant="brand"
                  className="h-11 w-44 font-semibold text-base shrink-0 rounded-md"
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
                    "Analyze Citations"
                  )}
                </Button>
              </div>
              <div className="flex justify-start">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken("")}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert
            variant="destructive"
            className="mb-8 max-w-3xl mx-auto dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
          >
            <AlertTriangle className="h-4 w-4 dark:text-red-400" />
            <AlertTitle className="dark:text-red-400">Error</AlertTitle>
            <AlertDescription className="dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading Skeleton */}
        {loading && <CitationAuthoritySkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1: Authority Scoring */}
            <div className="relative group">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-primary"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Authority Scoring
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Instantly see which citations are from .edu/.gov (highest
                    authority) vs random blogs (low authority).
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 2: E-E-A-T Analysis */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-purple-600"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="m9 15 2 2 4-4" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    E-E-A-T Report
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Get actionable suggestions to improve Expertise, Authority,
                    and Trustworthiness signals.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="grid md:grid-cols-12 gap-6 items-stretch">
              {/* Score Column */}
              <div className="md:col-span-4 flex flex-col h-full">
                <Card className="h-full border border-border shadow-none rounded-xl bg-card relative overflow-hidden flex flex-col justify-between">
                  <CardHeader className="pb-0 text-center pt-8 relative z-10">
                    <CardTitle className="text-xl text-foreground font-poppins">
                      Citation Score
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      Overall Metric
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10 flex flex-col items-center justify-center pb-8 pt-4">
                    <div className="relative h-32 w-32 md:h-40 md:w-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          innerRadius="80%"
                          outerRadius="100%"
                          barSize={10}
                          data={[
                            {
                              value: result.citation_score,
                              fill: gradeInfo?.fill || "#ef4444",
                            },
                          ]}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                          />
                          <RadialBar dataKey="value" cornerRadius={30} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold font-poppins tracking-tighter text-foreground">
                          {result.citation_score}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline gap-2 text-sm font-medium">
                      <span className="text-muted-foreground">Grade:</span>
                      <span
                        className={`text-2xl font-bold font-poppins ${gradeInfo?.color}`}
                      >
                        {gradeInfo?.letter}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Grid - Individual Cards */}
              <div className="md:col-span-8 h-full">
                <CitationStatsGrid stats={result.stats} />
              </div>
            </div>

            {/* Citations Table */}
            <CitationsTable citations={allCitations} />

            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Issues */}
              {result.issues && result.issues.length > 0 && (
                <div className="h-full">
                  <Card className="bg-card shadow-none border border-border rounded-xl h-full">
                    <CardHeader className="pb-3 border-b border-border/30">
                      <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground">
                        <span className="p-1.5 rounded-md flex items-center justify-center bg-amber-500/10 text-amber-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                        </span>
                        Issues Detected
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Potential problems affecting your citation authority
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4 pt-4">
                      <ul className="flex flex-col gap-4">
                        {result.issues.map((issue, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm font-medium text-foreground pb-4 border-b border-border/30 last:border-0 last:pb-0"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
                            >
                              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                              <path d="M12 9v4" />
                              <path d="M12 17h.01" />
                            </svg>
                            <span className="leading-snug">{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="h-full">
                  <SuggestionsList suggestions={result.suggestions} />
                </div>
              )}
            </div>

            {/* Upsell Section */}
            {shouldShowUpsell && (
              <div className="relative pt-8">
                <div className="relative bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-1">
                    <p className="tx-eyebrow mb-2">TAKE IT TO THE NEXT LEVEL</p>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                      {shouldShowUpsell.message ||
                        "Want better citation management?"}
                    </h3>
                    <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed">
                      Texavor Pro automatically suggests high-authority
                      replacements and monitors link health 24/7.
                    </p>
                  </div>
                  <div className="shrink-0 pt-4 md:pt-0">
                    <Button
                      asChild
                      variant="brand"
                      size="lg"
                      className="h-12 px-8 font-semibold text-lg rounded-md"
                    >
                      <Link href={shouldShowUpsell.cta_link || "/pricing"}>
                        Upgrade to Pro
                        <ArrowRight className="ml-2 w-5 h-5 shrink-0 border-none bg-transparent hover:bg-transparent" />
                      </Link>
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
