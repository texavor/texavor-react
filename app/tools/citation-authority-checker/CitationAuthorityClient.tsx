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
import ScoreDisplay from "../aeo-schema-validator/components/ScoreDisplay";
import Link from "next/link";

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

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            Citation Authority Checker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Google&apos;s E-E-A-T guidelines require content to cite
            authoritative sources. Analyze your outbound links, score them by
            domain authority, and identify uncited claims.
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
                          className="h-12 pl-10 text-lg bg-slate-50 dark:bg-zinc-950/50 border-input"
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1: Authority Scoring */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-green-600" />
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
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <FileCheck className="w-5 h-5 text-purple-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Score Column */}
              <div className="md:col-span-1">
                <ScoreDisplay
                  score={result.citation_score}
                  type="primary"
                  className="h-full"
                />
              </div>

              {/* Stats Grid - Individual Cards */}
              <CitationStatsGrid stats={result.stats} />
            </div>

            {/* Citations Table */}
            <CitationsTable citations={allCitations} />

            {/* Issues */}
            {result.issues && result.issues.length > 0 && (
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground font-poppins flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Issues Detected
                  </h3>
                  <ul className="space-y-2">
                    {result.issues.map((issue, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg border border-amber-200 dark:border-amber-500/20"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800 dark:text-amber-300">
                          {issue}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Suggestions */}
            {result.suggestions && result.suggestions.length > 0 && (
              <SuggestionsList suggestions={result.suggestions} />
            )}

            {/* Upsell Section */}
            {shouldShowUpsell && (
              <Card className="bg-gradient-to-r from-primary/10 to-green-600/10 border-none shadow-none">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2 font-poppins">
                        {shouldShowUpsell.message ||
                          "Want better citation management?"}
                      </h3>
                      <p className="text-muted-foreground">
                        Texavor Pro automatically suggests high-authority
                        replacements and monitors link health 24/7.
                      </p>
                    </div>
                    <Link href={shouldShowUpsell.cta_link || "/pricing"}>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all font-semibold"
                      >
                        Upgrade to Pro
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
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
