"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TopicalAuthoritySkeleton from "./TopicalAuthoritySkeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Loader2,
  Search,
  Lock,
  Network,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import MetricCard from "../ai-visibility-calculator/MetriCard";
import TopicVisualGraph from "./TopicVisualGraph";
import ClusterTable from "./ClusterTable";

// --- Types ---

const formSchema = z.object({
  topic: z.string().min(2, "Topic must be at least 2 characters."),
});

interface Keyword {
  term: string;
  volume: number;
  intent: string;
  difficulty: string;
}

interface Cluster {
  name: string;
  count: number;
  total_volume: number;
  keywords: Keyword[];
}

interface AuthorityResult {
  topic: string;
  authority_score: number;
  total_subtopics: number;
  visual_graph: {
    nodes: any[];
    edges: any[];
  };
  content_gaps: string[];
  clusters: Cluster[];
  upsell: {
    message: string;
    cta_link: string;
  };
}

const getScoreStyles = (score: number) => {
  if (score >= 70)
    return {
      text: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      hex: "#10b981",
      label: "Excellent Coverage",
      desc: "Comprehensive topical map. Ready to dominate search results.",
    };
  if (score >= 40)
    return {
      text: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/30",
      hex: "#f59e0b",
      label: "Average Coverage",
      desc: "Good foundation. Fill content gaps to improve visibility.",
    };
  return {
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    hex: "#ef4444",
    label: "Low Coverage",
    desc: "Missing core pillars. Significant gaps detected.",
  };
};

export default function TopicalAuthorityPage() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { topic: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/topical_authority",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as AuthorityResult;
    },
    onError: (error: any) => {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      // toast.error(message);
    },
  });

  const form = useForm({
    defaultValues: { topic: "" },
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

  const result = mutation.data;
  const loading = mutation.isPending;
  const error = mutation.error
    ? (mutation.error as any)?.response?.data?.message ||
      mutation.error?.message
    : null;

  const scoreStyles = result ? getScoreStyles(result.authority_score) : null;

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Topical Authority Map
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Visualize your topical authority for AI search readiness. Enter a
              keyword to generate a complete topic cluster map and content
              strategy.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto pt-10 md:pt-16 pb-24">
        {/* Input Card */}
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
                  <Label htmlFor="topic" className="sr-only">
                    Topic
                  </Label>
                  <form.Field
                    name="topic"
                    children={(field) => (
                      <div className="relative">
                        <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. technical seo"
                          className="h-11 pl-10 text-base bg-background border-input"
                        />
                        {field.state.meta.errors ? (
                          <p className="text-sm text-destructive mt-1 font-medium animate-in slide-in-from-top-1 fade-in duration-300">
                            {/* @ts-ignore */}
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
                      Generating...
                    </>
                  ) : (
                    "Generate Map"
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

        {/* Loading State */}
        {loading && <TopicalAuthoritySkeleton />}

        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16 opacity-90">
            {/* Feature 1: Cluster Visualization */}
            <div className="relative group">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <Network className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Visualize Topic Clusters
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Instantly generate content hubs and subtopics.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="grid grid-cols-2 gap-2 w-full max-w-[200px] opacity-60">
                    <div className="bg-blue-100/50 border border-blue-200 rounded-lg h-16 w-full"></div>
                    <div className="bg-blue-100/50 border border-blue-200 rounded-lg h-16 w-full"></div>
                    <div className="bg-blue-100/50 border border-blue-200 rounded-lg h-16 w-full col-span-2"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Authority Score */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Measure Topical Authority
                  </CardTitle>
                  <CardDescription className="font-inter">
                    See your potential to dominate a niche.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="h-32 w-32 rounded-full border-[8px] border-purple-100 flex items-center justify-center bg-background">
                    <span className="text-2xl font-bold text-purple-600">
                      85+
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Authority Score & Stats */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left: Authority Score Gauge */}
              <div className="lg:col-span-4">
                <Card className="h-full border border-border shadow-none rounded-lg bg-card relative overflow-hidden flex flex-col min-h-[300px]">
                  <CardHeader className="pb-2 text-center pt-8 relative z-10">
                    <CardTitle className="text-2xl text-foreground font-poppins">
                      Authority Score
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      Based on Topic Completeness
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10 flex flex-col items-center justify-center pb-8">
                    <div className="relative h-48 w-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          innerRadius="80%"
                          outerRadius="100%"
                          barSize={12}
                          data={[
                            {
                              name: "score",
                              value: result.authority_score,
                              fill: scoreStyles?.hex,
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
                        <span className="text-5xl font-bold font-poppins tracking-tighter text-foreground">
                          {result.authority_score}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-1">
                          / 100
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Stats & Overview */}
              <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                <div className="grid sm:grid-cols-2 gap-6">
                  <MetricCard
                    label="Analyzed Topic"
                    value={result.topic}
                    type="primary"
                    className="capitalize"
                  />
                  <MetricCard
                    label="Total Subtopics"
                    value={result.total_subtopics}
                    type="secondary"
                  />
                  <Card className="sm:col-span-2 bg-card border border-border shadow-none rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-300 hover:border-primary/40">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2 font-poppins text-foreground">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        Content Gaps Detected
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.content_gaps.map((gap, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 text-accent text-sm font-medium"
                          >
                            {gap}
                          </span>
                        ))}
                        {result.content_gaps.length === 0 && (
                          <span className="text-sm text-foreground">
                            No major gaps found. Great job!
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                {scoreStyles && (
                  <div
                    className={cn(
                      "flex-1 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-start text-left border w-full gap-4",
                      scoreStyles.bg,
                      scoreStyles.border,
                    )}
                  >
                    <div>
                      <h4
                        className={cn(
                          "font-poppins font-bold text-2xl",
                          scoreStyles.text,
                        )}
                      >
                        {scoreStyles.label}
                      </h4>
                      <p className="font-inter text-base text-foreground/80 mt-2 leading-relaxed">
                        {scoreStyles.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Tabs Interface */}
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-lg h-11">
                <TabsTrigger
                  value="visual"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all rounded-lg"
                >
                  Visual Map
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all rounded-lg"
                >
                  Cluster Strategy
                </TabsTrigger>
                <TabsTrigger
                  value="gaps"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all rounded-lg"
                >
                  Content Gaps
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="visual"
                className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Card className="bg-card shadow-none border border-border rounded-xl overflow-hidden p-1 transition-all">
                  <TopicVisualGraph
                    initialNodes={result.visual_graph.nodes}
                    initialEdges={result.visual_graph.edges}
                  />
                </Card>
              </TabsContent>

              <TabsContent
                value="table"
                className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="grid gap-6">
                  {result.clusters.map((cluster, i) => (
                    <ClusterTable key={i} cluster={cluster} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="gaps"
                className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Card className="bg-card shadow-none border border-border rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-accent flex items-center gap-2">
                      Missing Pillars
                    </CardTitle>
                    <CardDescription>
                      To achieve 100% topical authority, you must cover these
                      missing areas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground font-inter">
                      {result.content_gaps.map((gap, i) => (
                        <li key={i}>{gap}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Upsell Section */}
            {result.upsell && (
              <div className="relative mt-12 bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                    {result.upsell.message}
                  </h3>
                  <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed mb-6">
                    Get the complete semantic map for this topic, analyze
                    competitor gaps, and build your content silo.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Complete Search Volume",
                      "Competitor URLs",
                      "Missing Subtopics",
                    ].map((data, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-background border border-border text-sm text-foreground font-medium flex items-center gap-2"
                      >
                        <Lock className="w-3 h-3 text-muted-foreground" />{" "}
                        {data}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <Button
                    size="default"
                    variant="brand"
                    className="w-full md:w-auto font-semibold text-base py-6 px-8 rounded-lg shadow-sm"
                    asChild
                  >
                    <Link
                      href={result.upsell.cta_link || "#pricing"}
                      target="_blank"
                    >
                      Unlock Full Map
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
