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
import { Network, Loader2, TrendingUp, ArrowRight, Brain } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import EntityDensitySkeleton from "./EntityDensitySkeleton";
import MetricCard from "@/app/tools/ai-visibility-calculator/MetriCard";
import TopEntitiesTable from "./components/TopEntitiesTable";
import EntitySignals from "./components/EntitySignals";
import SchemaStatus from "./components/SchemaStatus";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface EntityBreakdown {
  organizations: number;
  people: number;
  products: number;
  locations: number;
}

interface TopEntity {
  name: string;
  type: string;
  mentions: number;
  salience: number;
  first_mention_position: string;
  in_title: boolean;
  in_headings: boolean;
}

interface EntitySignal {
  type: string;
  severity: "positive" | "warning";
  message: string;
}

interface SchemaStatusData {
  has_mentions: boolean;
  has_about: boolean;
  has_same_as: boolean;
  message: string;
}

interface EntityDensityResult {
  url: string;
  entity_score: number;
  grade: string;
  total_entities: number;
  entity_breakdown: EntityBreakdown;
  top_entities: TopEntity[];
  entity_signals: EntitySignal[];
  recommendations: string[];
  schema_status: SchemaStatusData;
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function EntityDensityClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/entity_density",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as EntityDensityResult;
    },
    onError: (error: any) => {
      console.error("Entity density error:", error);
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
    (result?.entity_score ?? 0) < 70 ||
    !result?.schema_status?.has_mentions ||
    (result?.top_entities?.[0]?.salience ?? 1) < 0.5;

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
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Entity Density Analyzer
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Analyze entity salience, detect knowledge graph opportunities, and
              optimize your content for semantic SEO with AI-powered entity
              recognition.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-4 mx-auto pb-20 pt-10 md:pt-16">
        {/* Search Input Card */}
        <Card className="mb-16 bg-card border border-border rounded-lg shadow-none mx-auto overflow-visible">
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
                        <Network className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
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
                    "Analyze Entities"
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
        {loading && <EntityDensitySkeleton />}

        {/* Empty State: Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1 */}
            <div className="relative group">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-50/50 dark:bg-indigo-900/20 flex items-center justify-center mb-3">
                    <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Entity Recognition
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Identify organizations, people, products, and locations with
                    AI-powered analysis.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-purple-50/50 dark:bg-purple-900/20 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground font-poppins mb-2">
                    Salience Scoring
                  </h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    Measure entity importance and detect knowledge graph
                    opportunities.
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
                label="Entity Salience Grade"
                value={result.grade}
                subtext={`Based on ${result.total_entities} detected entities`}
                type="primary"
                className="h-full"
              />

              <MetricCard
                label="Entity Score"
                value={result.entity_score}
                subtext="Overall entity optimization rating"
                type="secondary"
                className="h-full"
              />
            </div>

            {/* Entity Breakdown */}
            <Card className="bg-card border border-border shadow-none rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium font-poppins text-foreground mb-4">
                  Entity Distribution ({result.total_entities} Total)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="font-bold text-3xl text-blue-600 dark:text-blue-400 font-inter mb-1">
                      {result.entity_breakdown.organizations}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      Organizations
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="font-bold text-3xl text-green-600 dark:text-green-400 font-inter mb-1">
                      {result.entity_breakdown.people}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      People
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="font-bold text-3xl text-orange-600 dark:text-orange-400 font-inter mb-1">
                      {result.entity_breakdown.products}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      Products
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="font-bold text-3xl text-red-600 dark:text-red-400 font-inter mb-1">
                      {result.entity_breakdown.locations}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      Locations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Entities Table */}
            {result.top_entities && result.top_entities.length > 0 && (
              <TopEntitiesTable entities={result.top_entities} />
            )}

            {/* Entity Signals */}
            {result.entity_signals && result.entity_signals.length > 0 && (
              <EntitySignals signals={result.entity_signals} />
            )}

            {/* Schema Status */}
            {result.schema_status && (
              <SchemaStatus status={result.schema_status} />
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <Card className="bg-card border border-border shadow-none rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium font-poppins text-foreground flex items-center gap-2 mb-4">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-background p-3 rounded-lg border border-border"
                      >
                        <span className="text-primary mt-0.5 whitespace-nowrap">
                          💡
                        </span>
                        <span>{rec}</span>
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
                        Connect your content to the knowledge graph with
                        entity-rich schema markup.
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
