"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { useState } from "react";
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

export default function TopicalAuthorityPage() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");

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
      await mutation.mutateAsync(value);
    },
  });

  const result = mutation.data;
  const loading = mutation.isPending;
  const error = mutation.error
    ? (mutation.error as any)?.response?.data?.message ||
      mutation.error?.message
    : null;

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            Topical Authority Map
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Visualize your topical authority. Enter a keyword to generate a
            complete topic cluster map and content strategy.
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-16 bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none mx-auto overflow-visible ring-1 ring-border/50">
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
                          className="h-12 pl-10 text-lg bg-white dark:bg-zinc-950/50 border-input"
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
                  size="lg"
                  className="h-12 px-8 min-w-[140px] font-semibold text-lg bg-[#104127] hover:bg-[#0c311d] text-white shadow-lg hover:shadow-xl transition-all"
                  disabled={loading || !turnstileToken}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Generate Map"
                  )}
                </Button>
              </div>
              <div className="flex justify-start">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onSuccess={(token) => setTurnstileToken(token)}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <TopicalAuthoritySkeleton />}

        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto opacity-90">
            {/* Feature 1: Cluster Visualization */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50 overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
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
                    <div className="bg-blue-100 rounded-lg h-16 w-full"></div>
                    <div className="bg-blue-100 rounded-lg h-16 w-full"></div>
                    <div className="bg-blue-100 rounded-lg h-16 w-full col-span-2"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Authority Score */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50 overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
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
                  <div className="h-32 w-32 rounded-full border-8 border-purple-100 flex items-center justify-center">
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
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left: Authority Score Gauge */}
              <div className="md:col-span-4">
                <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
                  <div
                    className="absolute inset-0 opacity-100 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                    }}
                  />
                  <div className="relative z-10 text-center space-y-2">
                    <h3 className="text-xl font-medium text-green-100">
                      Authority Score
                    </h3>
                    <div className="h-[200px] w-[200px] mx-auto relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          innerRadius="80%"
                          outerRadius="100%"
                          barSize={15}
                          data={[
                            {
                              name: "score",
                              value: result.authority_score,
                              fill: "#34d399",
                            },
                          ]}
                          startAngle={180}
                          endAngle={0}
                          cy="70%"
                        >
                          <RadialBar
                            background={{ fill: "rgba(255,255,255,0.1)" }}
                            dataKey="value"
                            cornerRadius={30}
                          />
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%] text-center">
                        <span className="text-5xl font-bold text-white block">
                          {result.authority_score}
                        </span>
                        <span className="text-sm text-green-200">/ 100</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right: Stats & Overview */}
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                <MetricCard
                  label="Analyzed Topic"
                  value={result.topic}
                  type="secondary"
                  icon={<Layers className="w-4 h-4" />}
                  className="capitalize"
                />
                <MetricCard
                  label="Total Subtopics"
                  value={result.total_subtopics}
                  type="secondary"
                  icon={<Network className="w-4 h-4" />}
                />
                <Card className="sm:col-span-2 bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none rounded-2xl p-6 ring-1 ring-border/50 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Content Gaps Detected
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.content_gaps.map((gap, i) => (
                        <span
                          key={i}
                          className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-md border border-orange-100 font-medium"
                        >
                          {gap}
                        </span>
                      ))}
                      {result.content_gaps.length === 0 && (
                        <span className="text-sm text-slate-500">
                          No major gaps found. Great job!
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Main Tabs Interface */}
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl h-12">
                <TabsTrigger
                  value="visual"
                  className="rounded-lg text-base font-medium"
                >
                  Visual Map
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="rounded-lg text-base font-medium"
                >
                  Cluster Strategy
                </TabsTrigger>
                <TabsTrigger
                  value="gaps"
                  className="rounded-lg text-base font-medium"
                >
                  Content Gaps
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="visual"
                className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <Card className="bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50 rounded-xl overflow-hidden p-1">
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
                <Card className="bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50">
                  <CardHeader>
                    <CardTitle className="text-orange-700 dark:text-orange-400">
                      Missing Pillars
                    </CardTitle>
                    <CardDescription>
                      To achieve 100% topical authority, you must cover these
                      missing areas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
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
              <div className="relative rounded-2xl overflow-hidden bg-[#0A1A12] text-white p-8 md:p-12 text-center shadow-2xl mt-12">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, #10B981 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm mb-4">
                    <Lock className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {result.upsell?.message}
                  </h3>
                  <p className="text-lg text-emerald-100/80">
                    Get the complete semantic map for this topic with Texavor
                    Pro.
                  </p>

                  <Button
                    size="lg"
                    className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A12] font-semibold text-lg rounded-xl transition-all w-full sm:w-auto"
                    asChild
                  >
                    <Link href={result.upsell?.cta_link || "/pricing"}>
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
