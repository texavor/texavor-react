"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
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
    return <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />;
  if (status === "fail")
    return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />;
};

const AuditList = ({ checks }: { checks: AuditResult["checks"] }) => (
  <div className="space-y-3">
    {Object.entries(checks).map(([key, check]) => (
      <div
        key={key}
        className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-800/50 rounded-lg border border-gray-100 dark:border-zinc-800"
        style={{
          background:
            "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
        }}
      >
        <div className="mt-0.5">
          <StatusIcon status={check.status} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm capitalize text-white dark:text-gray-100">
              {key.replace("_", " ")}
            </span>
            {check.value && (
              <span className="text-xs font-bold bg-primary/5 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                {check.value}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-200 dark:text-gray-400 mt-0.5 leading-snug">
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
  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      // For now, let's stick to the real API call if requested, but user said "do this" based on doc.
      // Assuming endpoint exists or we mock it. The prompt implies implementing based on doc.
      const response = await axiosInstance.get(
        "/api/v1/public/tools/analyze_website",
        { params: values }
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
      <div className="container px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            Website AI Auditor
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Is your website ready for the AI era? Check your specialized
            readiness for Crawlers, RAG, and Entity Understanding.
          </p>
        </div>

        {/* Search Input Card */}
        <Card className="mb-16 bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none mx-auto overflow-visible ring-1 ring-border/50">
          <CardContent className="px-4 py-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col md:flex-row gap-4 items-center md:items-start"
            >
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
                className="h-12 px-8 min-w-[140px] font-semibold text-lg bg-[#104127] hover:bg-[#0c311d] text-white shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Audit"
                )}
              </Button>
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

        {/* Loading Skeleton */}
        {loading && <WebsiteAuditorSkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1: Traffic Light Checks */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
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
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
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
                  <Card className="border-none shadow-lg bg-[#104127] text-white rounded-2xl relative overflow-hidden p-6 transition-all duration-300">
                    {/* Dynamic Background */}
                    <div
                      className="absolute inset-0 opacity-100 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                      }}
                    />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      {/* Top Row: Icon & Arrow */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${result.domain}&sz=128`}
                            alt="Favicon"
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#104127] transition-transform hover:-translate-y-1 hover:translate-x-1">
                          <MoveUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Bottom Row: Text */}
                      <div>
                        <h3
                          className="text-2xl font-bold text-white mb-2 truncate w-full font-inter"
                          title={result.domain}
                        >
                          {result.domain}
                        </h3>
                        <div className="text-sm font-medium flex items-center gap-1.5 font-inter text-green-100">
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
                <Card className="border border-border/50 shadow-none rounded-2xl bg-primary/5 dark:bg-zinc-900 overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-2 font-poppins">
                      Technical Deep Dive
                    </CardTitle>
                    <CardDescription>
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
                <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] text-white relative overflow-hidden flex flex-col">
                  {/* Dynamic Background */}
                  <div
                    className="absolute inset-0 opacity-100 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                    }}
                  />
                  <CardHeader className="pb-2 text-center pt-5 relative z-10">
                    <CardTitle className="text-2xl text-white">
                      Readiness Radar
                    </CardTitle>
                    <CardDescription className="text-green-100/80">
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
                        <PolarGrid stroke="rgba(255,255,255,0.2)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#d1fae5", fontSize: 11, dy: 3 }}
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
                          stroke="#34d399"
                          fill="#34d399"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Upsell Section - Standardized */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0A1A12] text-white p-8 md:p-12 text-center shadow-2xl mt-8">
              {/* Background Pattern */}
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
                  Try Texavor for Deep Insights
                </h3>
                <p className="text-lg text-emerald-100/80">
                  Unlock precise data on competitors, backlinks, and more.
                </p>

                <div className="flex flex-wrap justify-center gap-3 py-4">
                  {[
                    "Search Volume",
                    "Keyword Difficulty",
                    "CPC Cost",
                    "Competitor List",
                  ].map((data, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium flex items-center gap-2"
                    >
                      <Lock className="w-3 h-3 text-emerald-500" /> {data}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A12] font-semibold text-lg rounded-xl transition-all w-full sm:w-auto"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <p className="text-sm text-gray-500">
                Analysis based on {result.samples_analyzed} sample pages.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
