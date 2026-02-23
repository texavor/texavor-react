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
    <div className="min-h-screen dark:bg-zinc-950 font-sans">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Schema Markup Validator
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Validate JSON-LD schema markup, check syntax errors, and get GEO
              optimization recommendations for Article, FAQPage, HowTo schemas.
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
              <div className="flex flex-col md:flex-row gap-4 items-center w-full">
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
                  className="h-11 min-w-[160px] font-semibold text-base shrink-0 rounded-md"
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
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1: Schema Detection */}
            <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <FileCode className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground font-poppins">
                  Schema Detection
                </h3>
                <p className="text-sm text-muted-foreground font-inter">
                  Automatically detect and validate all JSON-LD schemas on your
                  page including Article, FAQPage, HowTo, and more.
                </p>
              </CardHeader>
            </Card>

            {/* Feature 2: AEO Analysis */}
            <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
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
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="grid md:grid-cols-12 gap-6 items-stretch">
              {/* Score Column */}
              <div className="md:col-span-4 h-full">
                <ScoreDisplay
                  score={result.score}
                  grade={result.grade}
                  type="primary"
                  className="h-full border border-border bg-card shadow-none rounded-xl"
                />
              </div>

              {/* Stats Grid */}
              <div className="md:col-span-8 h-full">
                <div className="grid sm:grid-cols-2 gap-4 h-full">
                  {/* Schema Health */}
                  <div className="group rounded-xl p-6 bg-card border border-border shadow-none flex flex-col justify-between transition-colors hover:border-primary/20 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                        Schema Health
                      </h3>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
                        <MoveUpRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div
                        className={`text-4xl font-bold tracking-tight mb-1 font-inter capitalize ${
                          result.schema_health === "good"
                            ? "text-emerald-600 dark:text-emerald-500"
                            : result.schema_health === "fair"
                              ? "text-amber-600 dark:text-amber-500"
                              : "text-rose-600 dark:text-rose-500"
                        }`}
                      >
                        {result.schema_health}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Overall Status
                      </div>
                    </div>
                  </div>

                  {/* Schema Types */}
                  <div className="group rounded-xl p-6 bg-card border border-border shadow-none flex flex-col justify-between transition-colors hover:border-primary/20 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                          <Code2 className="w-4 h-4" />
                        </span>
                        Schema Types
                      </h3>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
                        <MoveUpRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold tracking-tight mb-1 font-inter text-foreground">
                        {result.detected_types?.length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Detected on page
                      </div>
                    </div>
                  </div>

                  {/* AEO Checks Passed */}
                  <div className="group rounded-xl p-6 bg-card border border-border shadow-none flex flex-col justify-between transition-colors hover:border-primary/20 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                        GEO Checks Passed
                      </h3>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
                        <MoveUpRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold tracking-tight mb-1 font-inter text-foreground">
                        {stats?.checks_passed || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Successful validations
                      </div>
                    </div>
                  </div>

                  {/* Syntax Status */}
                  <div className="group rounded-xl p-6 bg-card border border-border shadow-none flex flex-col justify-between transition-colors hover:border-primary/20 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 font-poppins text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                          <FileCode className="w-4 h-4" />
                        </span>
                        JSON Syntax
                      </h3>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
                        <MoveUpRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold tracking-tight mb-1 font-inter text-foreground">
                        {stats?.syntax_status || "Unknown"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Parsing status
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detected Types */}
            {result.detected_types && result.detected_types.length > 0 && (
              <Card className="bg-card shadow-none border border-border rounded-xl">
                <CardHeader className="pb-3 border-b border-border/30">
                  <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground">
                    <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                      <Code2 className="w-5 h-5 text-current" />
                    </span>
                    Detected Schema Types
                  </h3>
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  <SchemaTypeBadges types={result.detected_types} />
                </CardContent>
              </Card>
            )}

            {/* Two Column Layout for Checks and Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* AEO Checks */}
              <Card className="bg-card shadow-none border border-border rounded-xl h-full">
                <CardHeader className="pb-3 border-b border-border/30">
                  <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground">
                    <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                      <CheckCircle2 className="w-5 h-5 text-current" />
                    </span>
                    GEO Validation Checks
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <AeoChecksTable checks={result.aeo_checks} />
                </CardContent>
              </Card>

              {/* Opportunities */}
              <OpportunitiesList opportunities={result.opportunities || []} />
            </div>

            {/* Raw Schema JSON - Collapsible */}
            {result.schemas && result.schemas.length > 0 && (
              <SchemaJsonViewer schemas={result.schemas} />
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
                        Get Article, FAQPage, and HowTo schemas in one click.
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
