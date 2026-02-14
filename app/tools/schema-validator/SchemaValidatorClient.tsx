"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
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
  Code2,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Sparkles,
  MoveUpRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import SchemaValidatorSkeleton from "./SchemaValidatorSkeleton";
import ScoreDisplay from "@/app/tools/aeo-schema-validator/components/ScoreDisplay";
import SchemaTypeBadges from "./components/SchemaTypeBadges";
import AeoChecksTable from "./components/AeoChecksTable";
import SchemaJsonViewer from "./components/SchemaJsonViewer";
import OpportunitiesList from "./components/OpportunitiesList";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface AeoChecks {
  schema_found: boolean;
  syntax_valid?: boolean;
  aeo_type_found?: boolean;
  entity_linking?: string;
  voice_ready?: boolean;
  identity_verified?: boolean;
  hub_content?: boolean;
}

interface SchemaValidatorResult {
  url: string;
  domain: string;
  score: number;
  grade: string;
  detected_types: string[];
  schema_health: "good" | "fair" | "critical";
  schemas: any[];
  aeo_checks: AeoChecks;
  opportunities: string[];
  upsell?: {
    message: string;
    cta_link: string;
  };
}

// --- Component ---
export default function SchemaValidatorClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/schema_validator",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as SchemaValidatorResult;
    },
    onError: (error: any) => {
      console.error("Schema validation error:", error);
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

  // Calculate stats from result
  const stats = result
    ? {
        types_count: result.detected_types?.length || 0,
        checks_passed: Object.values(result.aeo_checks || {}).filter(
          (v) => v === true || (typeof v === "string" && v.includes("Strong")),
        ).length,
        syntax_status: result.aeo_checks?.syntax_valid ? "Valid" : "Invalid",
        health: result.schema_health || "unknown",
      }
    : null;

  const shouldShowUpsell =
    (result?.score ?? 0) < 70 ||
    !result?.aeo_checks?.aeo_type_found ||
    (result?.opportunities && result.opportunities.length > 2);

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
            Schema Markup Validator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Validate JSON-LD schema markup, check syntax errors, and get GEO
            optimization recommendations for Article, FAQPage, HowTo schemas.
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
                        <Code2 className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
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
                      Validating...
                    </>
                  ) : (
                    "Validate Schema"
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
        {loading && <SchemaValidatorSkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1: Schema Detection */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <FileCode className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    Schema Detection
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Automatically detect and validate all JSON-LD schemas on
                    your page including Article, FAQPage, HowTo, and more.
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 2: AEO Analysis */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-indigo-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border-none shadow-none rounded-2xl bg-secondary overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins">
                    GEO Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Get detailed GEO compliance checks including entity linking,
                    voice readiness, and syntax validation.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            {/* Score + Health Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Card */}
              <ScoreDisplay
                score={result.score}
                grade={result.grade}
                type="primary"
                className="h-full"
              />

              {/* Health Status Card */}
              <div className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 shadow-none h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400">
                    Schema Health
                  </h3>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-border text-slate-800 dark:bg-zinc-800 dark:text-slate-200 transition-transform hover:-translate-y-1 hover:translate-x-1">
                    <MoveUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div
                    className={`text-5xl font-bold tracking-tight mb-2 font-inter capitalize ${
                      result.schema_health === "good"
                        ? "text-green-600"
                        : result.schema_health === "fair"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {result.schema_health}
                  </div>
                  <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                    Overall Status
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Schema Types */}
              <div className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 text-foreground shadow-none h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400">
                    <Code2 className="w-5 h-5" />
                  </h3>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-border text-slate-800 dark:bg-zinc-800 dark:text-slate-200 transition-transform hover:-translate-y-1 hover:translate-x-1">
                    <MoveUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold tracking-tight mb-2 font-inter text-slate-900 dark:text-white">
                    {result.detected_types?.length || 0}
                  </div>
                  <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                    Schema Types
                  </div>
                </div>
              </div>

              {/* AEO Checks Passed */}
              <div className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 text-foreground shadow-none h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </h3>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-border text-slate-800 dark:bg-zinc-800 dark:text-slate-200 transition-transform hover:-translate-y-1 hover:translate-x-1">
                    <MoveUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold tracking-tight mb-2 font-inter text-slate-900 dark:text-white">
                    {stats?.checks_passed || 0}
                  </div>
                  <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                    GEO Checks Passed
                  </div>
                </div>
              </div>

              {/* Syntax Status */}
              <div className="rounded-2xl p-6 bg-primary/5 dark:bg-zinc-900 border border-border/50 text-foreground shadow-none h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium font-poppins text-slate-600 dark:text-slate-400">
                    <FileCode className="w-5 h-5" />
                  </h3>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-border text-slate-800 dark:bg-zinc-800 dark:text-slate-200 transition-transform hover:-translate-y-1 hover:translate-x-1">
                    <MoveUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight mb-2 font-inter text-slate-900 dark:text-white">
                    {stats?.syntax_status || "Unknown"}
                  </div>
                  <div className="text-sm font-medium font-inter text-slate-500 dark:text-slate-400">
                    JSON Syntax
                  </div>
                </div>
              </div>
            </div>

            {/* Detected Types */}
            {result.detected_types && result.detected_types.length > 0 && (
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
                    Detected Schema Types
                  </h3>
                  <SchemaTypeBadges types={result.detected_types} />
                </CardContent>
              </Card>
            )}

            {/* Two Column Layout for Checks and Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AEO Checks */}
              <Card className="bg-secondary shadow-none border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
                    GEO Validation Checks
                  </h3>
                  <AeoChecksTable checks={result.aeo_checks} />
                </CardContent>
              </Card>

              {/* Opportunities */}
              {result.opportunities && result.opportunities.length > 0 && (
                <OpportunitiesList opportunities={result.opportunities} />
              )}
            </div>

            {/* Raw Schema JSON - Collapsible */}
            {result.schemas && result.schemas.length > 0 && (
              <SchemaJsonViewer schemas={result.schemas} />
            )}

            {/* Upsell */}
            {shouldShowUpsell && result.upsell && (
              <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-none shadow-none">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">
                        {result.upsell.message}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Get Article, FAQPage, and HowTo schemas in one click.
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
