"use client";

import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AiVisibilitySkeleton from "./AiVisibilitySkeleton";
import MetricCard from "./MetriCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Loader2,
  Share2,
  AlertCircle,
  Copy,
  Search,
  TrendingUp,
  CheckCircle,
  Lock,
  Sparkles,
  BarChart2,
  Bot,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LandingNav from "@/components/LandingNav";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Types based on Guide ---

const formSchema = z.object({
  keyword: z.string().min(2, "Keyword must be at least 2 characters."),
  website: z.string().optional(),
});

interface RadarPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface MetricStats {
  search_volume: string;
  search_volume_label: string;
  seo_difficulty: number;
  seo_difficulty_label: string;
  backlinks: string;
  cost_per_click: string;
}

interface AdvancedScores {
  ranking_probability: number;
  topic_authority: number;
  click_potential: number;
}

interface KeywordIdea {
  term: string;
  vol: string;
}

interface UpsellData {
  title: string;
  cta: string;
  locked_data: string[];
}

interface AnalysisResult {
  keyword: string;
  website: string;
  overall_score: number;
  grade: string;

  // New Fields
  metrics: MetricStats;
  radar_chart_data: RadarPoint[];
  ai_summary: string;
  prompt_ideas: string[];
  keyword_ideas: KeywordIdea[];
  advanced_scores: AdvancedScores;
  upsell?: UpsellData;

  viral_hook: {
    share_text: string;
    url: string;
  };
}

// Dummy data for Feature Preview
const dummyRadarData = [
  { subject: "Informational", A: 80, fullMark: 100 },
  { subject: "Commercial", A: 45, fullMark: 100 },
  { subject: "Navigational", A: 30, fullMark: 100 },
  { subject: "Transactional", A: 90, fullMark: 100 },
];
const dummyTrendData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

export default function AiScorePage() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { keyword: string; website?: string }) => {
      const response = await axiosInstance.get(
        "/api/v1/public/tools/analyze_keyword",
        {
          params: values,
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as AnalysisResult;
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
    defaultValues: { keyword: "", website: "" },
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

  const getDifficultyColor = (score: number) => {
    if (score <= 40) return "text-green-600 bg-green-50 border-green-200";
    if (score <= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              AI Topic Analyzer
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Test how well your topic performs in AI search results with our
              advanced 5-point analysis.
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
                  <Label htmlFor="keyword" className="sr-only">
                    Keyword
                  </Label>
                  <form.Field
                    name="keyword"
                    children={(field) => (
                      <div className="relative">
                        <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g. how to bake sourdough"
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
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>

              <div className="flex justify-start">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  injectScript={false}
                  onSuccess={(token) => setTurnstileToken(token)}
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
            <AlertCircle className="h-4 w-4 dark:text-red-400" />
            <AlertTitle className="dark:text-red-400">Error</AlertTitle>
            <AlertDescription className="dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <AiVisibilitySkeleton />}

        {/* Empty State Feature Preview - Shows when no result and not loading */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16 opacity-90">
            {/* Feature 1: Keyword Research */}
            <div className="relative group">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Find secret SEO gems
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Search and find suggestions of high-potential keywords.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0 px-0">
                  <div className="mt-4 px-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-slate-800">
                          9.9M
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="text-green-500 font-medium">
                            HIGH
                          </span>{" "}
                          Search Volume
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">88</p>
                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <span className="text-yellow-500 font-medium">
                            MED
                          </span>{" "}
                          Difficulty
                        </div>
                      </div>
                    </div>
                    <div className="h-32 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dummyTrendData}>
                          <defs>
                            <linearGradient
                              id="colorVal"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorVal)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: AI Radar */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Research AI Search Intent
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Stay relevant by checking what users are asking AI.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="h-48 w-full max-w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={dummyRadarData}
                      >
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#9ca3af", fontSize: 10 }}
                        />
                        <Radar
                          name="AI"
                          dataKey="A"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Important Metrics & Radar */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column: Metrics Grid */}
              <div className="lg:col-span-8 space-y-6">
                {/* Summary Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Search Volume */}
                  <MetricCard
                    label="Search Volume"
                    value={result?.metrics?.search_volume}
                    subtext={
                      <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                        {result?.metrics?.search_volume_label}
                      </span>
                    }
                    type="primary"
                  />

                  {/* Difficulty */}
                  <MetricCard
                    label="Difficulty"
                    value={result?.metrics?.seo_difficulty}
                    subtext={
                      <div className="flex items-center gap-1">
                        <span
                          className={cn(
                            "inline-flex items-center rounded text-xs font-bold uppercase",
                            getDifficultyColor(
                              result?.metrics?.seo_difficulty || 0,
                            )
                              .replace("text-", "text-")
                              .replace("bg-", "text-")
                              .replace("border-", ""),
                          )}
                        >
                          {result?.metrics?.seo_difficulty_label}
                        </span>
                        <span>Competition</span>
                      </div>
                    }
                    type="secondary"
                  />

                  {/* CPC */}
                  <MetricCard
                    label="CPC"
                    value={result?.metrics?.cost_per_click}
                    subtext="Cost Per Click"
                    type="secondary"
                  />
                </div>

                {/* AI Summary (Widget 3) */}
                <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden">
                  <CardHeader className="pb-2 pt-5 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2 font-poppins text-foreground">
                      AI Field Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-inter leading-relaxed">
                      {result?.ai_summary}
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <MetricCard
                        label="Topic Relevancy"
                        value={`${result?.advanced_scores?.ranking_probability}%`}
                        type="secondary"
                        className="h-auto p-4"
                        labelClassName="text-sm"
                      />
                      <MetricCard
                        label="Topic Auth."
                        value={`${result?.advanced_scores?.topic_authority}/100`}
                        type="secondary"
                        className="h-auto p-4"
                        labelClassName="text-sm"
                      />
                      <MetricCard
                        label="Click Potential"
                        value={`${result?.advanced_scores?.click_potential}/100`}
                        type="secondary"
                        className="h-auto p-4"
                        labelClassName="text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Radar Chart (Widget 2) */}
              <div className="lg:col-span-4">
                <Card className="h-full bg-card border border-border shadow-none rounded-lg relative overflow-hidden">
                  <CardHeader className="pb-2 text-center pt-5 relative z-10">
                    <CardTitle className="text-2xl text-foreground font-poppins">
                      Visibility Radar
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      AI Search Intent Analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[320px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="60%"
                        data={result?.radar_chart_data}
                      >
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#6b7280", fontSize: 12, dy: 3 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="AI Score"
                          dataKey="A"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-0 right-0 p-4 text-center">
                      <div className="text-3xl font-bold text-foreground">
                        {result?.grade}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Grade
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Row: Prompts & Keywords */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prompt Ideas (Widget 4) */}
              <Card className="bg-card border border-border shadow-none rounded-lg h-full">
                <CardHeader className="pb-3 ">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2 font-poppins text-foreground">
                    AI Prompt Ideas
                  </CardTitle>
                  <CardDescription className="text-inter text-muted-foreground">
                    Copy-paste these into ChatGPT/Claude
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result?.prompt_ideas?.map((prompt, i) => (
                      <li
                        key={i}
                        className="flex items-center min-h-[4rem] h-auto gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/40 transition-all group relative"
                      >
                        {/* Content with Tooltip */}
                        <div className="flex-1 min-w-0 relative">
                          <p className="text-sm font-medium text-foreground break-words whitespace-normal leading-tight cursor-help">
                            {prompt}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            AI Generated Prompt
                          </p>

                          {/* Custom Tooltip */}
                          <div className="absolute bottom-full left-0 mb-2 w-max max-w-[250px] hidden group-hover:block z-50">
                            <div className="bg-popover text-popover-foreground text-xs rounded-lg py-2 px-3 shadow-xl border border-border">
                              {prompt}
                              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-popover"></div>
                            </div>
                          </div>
                        </div>

                        {/* Action */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                          onClick={() => copyToClipboard(prompt)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Keyword Ideas (Widget 5) */}
              <Card className="bg-card border border-border shadow-none rounded-lg h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2 font-poppins text-foreground">
                    Keyword Ideas
                  </CardTitle>
                  <CardDescription className="text-inter text-muted-foreground">
                    Google Autocomplete Suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result?.keyword_ideas?.map((idea, i) => (
                      <li
                        key={i}
                        className="flex items-center min-h-[4rem] h-auto gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/40 transition-all group relative"
                      >
                        {/* Content with Tooltip */}
                        <div className="flex-1 min-w-0 relative">
                          <p className="text-sm font-medium text-foreground break-words whitespace-normal leading-tight cursor-help">
                            {idea?.term}
                          </p>
                          {idea?.vol &&
                            idea.vol.toLowerCase() !== "unknown" && (
                              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                                {idea.vol}
                              </p>
                            )}

                          {/* Custom Tooltip */}
                          <div className="absolute bottom-full left-0 mb-2 w-max max-w-[250px] hidden group-hover:block z-50">
                            <div className="bg-popover text-popover-foreground text-xs rounded-lg py-2 px-3 shadow-xl border border-border">
                              {idea?.term}
                              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-popover"></div>
                            </div>
                          </div>
                        </div>

                        {/* Action */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                          onClick={() => copyToClipboard(idea?.term)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Upsell Section - Standardized Pattern */}
            <div className="relative mt-12 bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                  Try Texavor for Deep Insights
                </h3>
                <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed mb-6">
                  {result.upsell?.title ||
                    "Unlock precise data on competitors, backlinks, and more."}{" "}
                  Stay ahead in AI content discovery.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Search Volume",
                    "Keyword Difficulty",
                    "CPC Cost",
                    "Competitor List",
                  ].map((data, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-background border border-border text-sm text-foreground font-medium flex items-center gap-2"
                    >
                      <Lock className="w-3 h-3 text-muted-foreground" /> {data}
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
                    href={process.env.NEXT_PUBLIC_APP_URL || "#pricing"}
                    target="_blank"
                  >
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </div>

            {/* Share & Copy Link */}
            {result?.viral_hook && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${result.viral_hook.share_text} ${result.viral_hook.url}`,
                    );
                    toast.success("Link copied!");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share this score
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
