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
import WebsiteAuditorSkeleton from "./WebsiteAuditorSkeleton";
import MetricCard from "../ai-visibility-calculator/MetriCard";
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
} from "recharts";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Globe,
  Share2,
  Lock,
  MoveUpRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Types ---

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface CheckResult {
  status: "pass" | "fail" | "warning";
  message: string;
  value?: string;
}

interface RadarPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface AuditResult {
  domain: string;
  ai_readiness_score: number;
  grade: string;
  checks: {
    robots_txt: CheckResult;
    sitemap: CheckResult;
    rss_feed: CheckResult;
    content_density: CheckResult;
    schema_health: CheckResult;
  };
  radar_chart: RadarPoint[];
  samples_analyzed: number;
}

// --- Components ---

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "pass")
    return <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />;
  if (status === "fail")
    return <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />;
};

const AuditList = ({ checks }: { checks: AuditResult["checks"] }) => (
  <div className="space-y-3">
    {Object.entries(checks).map(([key, check]) => (
      <div
        key={key}
        className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-800/50 rounded-lg border border-gray-100 dark:border-zinc-800"
      >
        <div className="mt-0.5">
          <StatusIcon status={check.status} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm capitalize text-black dark:text-gray-100">
              {key.replace("_", " ")}
            </span>
            {check.value && (
              <span className="text-xs font-bold bg-primary/5 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                {check.value}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
            {check.message}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// Dummy Data for Preview
const dummyRadarData = [
  { subject: "Crawlability", A: 65, fullMark: 100 },
  { subject: "Discovery", A: 40, fullMark: 100 },
  { subject: "Semantics", A: 85, fullMark: 100 },
  { subject: "Freshness", A: 50, fullMark: 100 },
];

export default function WebsiteAuditorPage() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      // For now, let's stick to the real API call if requested, but user said "do this" based on doc.
      // Assuming endpoint exists or we mock it. The prompt implies implementing based on doc.
      const response = await axiosInstance.get(
        "/api/v1/public/tools/analyze_website",
        {
          params: values,
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as AuditResult;
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
      // If token already exists, submit immediately
      if (turnstileToken) {
        await mutation.mutateAsync(value);
        return;
      }

      // No token yet - wait for it
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

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Website AI Auditor
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Is your website ready for the AI era? Check your specialized
              readiness for Crawlers, RAG, and Entity Understanding.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto pt-10 md:pt-16 pb-24">
        {/* Search Input Card */}
        <Card className="mb-16 bg-card border border-border shadow-none rounded-lg mx-auto overflow-visible">
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
                    Website URL
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
                          placeholder="https://texavor.com"
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
                      Auditing...
                    </>
                  ) : (
                    "Audit"
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
        {loading && <WebsiteAuditorSkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16 opacity-90">
            {/* Feature 1: Traffic Light Checks */}
            <div className="relative group">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Technical Health Check
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Instant analysis of Robots.txt, Sitemaps, and Schema markup.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-80">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div className="h-2 bg-primary/5 rounded w-24"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-60">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <div className="h-2 bg-primary/5 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-40">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <div className="h-2 bg-primary/5 rounded w-20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Radar Preview */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <Share2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    AI Readiness Radar
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Visualize your scoring across 4 key AI-compatibility
                    dimensions.
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
                          name="Preview"
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
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column: Metrics & Checks */}
              <div className="lg:col-span-8 space-y-6">
                {/* Score Card */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Website Info Card */}
                  <Card className="bg-card border border-border shadow-none rounded-lg relative overflow-hidden p-6 transition-all duration-300 group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      {/* Top Row: Icon & Arrow */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${result.domain}&sz=128`}
                            alt="Favicon"
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background border border-border text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 hover:border-primary/50 hover:text-foreground">
                          <MoveUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Bottom Row: Text */}
                      <div>
                        <h3
                          className="text-2xl font-bold text-foreground mb-2 truncate w-full font-inter"
                          title={result.domain}
                        >
                          {result.domain}
                        </h3>
                        <div className="text-sm font-medium flex items-center gap-1.5 font-inter text-muted-foreground">
                          Analyzed Site
                        </div>
                      </div>
                    </div>
                  </Card>

                  <MetricCard
                    label="AI Readiness"
                    value={`${result.ai_readiness_score}/100`}
                    type="primary"
                    subtext="Composite Score"
                  />
                  <MetricCard
                    label="Grade"
                    value={result.grade}
                    type={
                      result.grade === "A" || result.grade === "B"
                        ? "primary"
                        : "secondary"
                    }
                    subtext="Overall Rating"
                  />
                </div>

                {/* Checks List */}
                <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-2 font-poppins text-foreground">
                      Technical Deep Dive
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      Detailed analysis of your site's infrastructure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuditList checks={result.checks} />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Radar Chart */}
              <div className="lg:col-span-4">
                <Card className="h-full bg-card border border-border shadow-none rounded-lg relative overflow-hidden flex flex-col">
                  <CardHeader className="pb-2 text-center pt-5 relative z-10">
                    <CardTitle className="text-2xl text-foreground font-poppins">
                      Readiness Radar
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      Crawlability • Discovery • Semantics • Freshness
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-[300px] relative z-10 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="65%"
                        data={result.radar_chart}
                      >
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#6b7280", fontSize: 11, dy: 3 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Score"
                          dataKey="A"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <p className="text-sm text-gray-500">
                Analysis based on {result.samples_analyzed} sample pages.
              </p>
            </div>

            {/* Upsell Section - Standardized Pattern */}
            <div className="relative mt-12 bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                  Write with Authority
                </h3>
                <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed mb-6">
                  Stop generating spam. Build citation-worthy content with deep
                  entity research, semantic link suggestions, and structured AI
                  analysis.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Entity Discovery",
                    "Competitor Content Gaps",
                    "Semantic Validations",
                    "AI Structure Scoring",
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
          </div>
        )}
      </div>
    </div>
  );
}
