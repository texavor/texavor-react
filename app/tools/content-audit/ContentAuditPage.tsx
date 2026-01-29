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
import ContentAuditSkeleton from "./ContentAuditSkeleton";
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
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Layout,
  FileText,
  Link as LinkIcon,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MetricCard from "../ai-visibility-calculator/MetriCard";

// --- Types ---

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface CheckResult {
  value?: string | number | boolean;
  status?: string;
}

interface AnalysisSection {
  [key: string]: CheckResult | string | number | boolean;
}

interface AuditResult {
  url: string;
  health_score: number;
  analysis: {
    technical: any;
    on_page: any;
    content_quality: any;
    structure: any;
  };
  upsell: {
    message: string;
    cta_link: string;
  };
}

export default function ContentAuditPage() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/content_audit",
        values,
        {
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
      // toast.error(message);
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // Green
    if (score >= 50) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  const StatusIcon = ({ status }: { status?: string }) => {
    if (!status) return null;
    const s = status.toLowerCase();
    if (
      s === "good" ||
      s === "comprehensive" ||
      s === "exact match" ||
      s === "present"
    )
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    if (s === "too short" || s === "missing")
      return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  };

  const AnalysisItem = ({
    label,
    value,
    status,
  }: {
    label: string;
    value: any;
    status?: string;
  }) => {
    const isRedundant =
      typeof value === "string" &&
      status &&
      value.toLowerCase() === status.toLowerCase();

    // For specific cases like "0" value and "Good" status, we want both.
    // The redundancy check mainly handles "Good" + "Good" cases.

    return (
      <div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-zinc-800 border border-border/50 shadow-none">
        <div className="flex items-center gap-3">
          <StatusIcon
            status={
              status ||
              (value === true
                ? "present"
                : value === false
                  ? "missing"
                  : undefined)
            }
          />
          <span className="font-medium text-sm text-foreground capitalize">
            {label.replace(/_/g, " ")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isRedundant && (
            <span className="text-sm font-mono text-muted-foreground">
              {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
            </span>
          )}
          {status && (
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded font-bold uppercase",
                status.toLowerCase() === "good" ||
                  status.toLowerCase() === "exact match" ||
                  status.toLowerCase() === "optimal" ||
                  status.toLowerCase() === "present"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : status.toLowerCase() === "too short" ||
                      status.toLowerCase() === "missing"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
              )}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            Content Audit Tool
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Scan any URL to identify technical errors, thin content, and missing
            metadata. Get a free health score instantly.
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
                  <Label htmlFor="url" className="sr-only">
                    URL
                  </Label>
                  <form.Field
                    name="url"
                    children={(field) => (
                      <div className="relative">
                        <Layout className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://example.com/blog/article"
                          className="h-12 pl-10 text-lg bg-slate-50 dark:bg-zinc-950/50 border-input"
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
                    "Audit URL"
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
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <ContentAuditSkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto opacity-90">
            {/* Feature 1: Technical Scan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Technical Scan
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Speed & Meta Check
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="space-y-2 w-full max-w-[150px] opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-emerald-500"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-emerald-500"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                        <div className="h-full w-[90%] bg-emerald-500"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Content Quality */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-blue-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Content Quality
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Depth & Readability
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="space-y-2 w-full max-w-[120px] opacity-60 p-3 border border-blue-100 rounded bg-white dark:bg-zinc-950">
                    <div className="h-2 w-full bg-blue-100 rounded"></div>
                    <div className="h-2 w-[80%] bg-blue-100 rounded"></div>
                    <div className="h-2 w-[90%] bg-blue-100 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 3: Structure Analysis */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <LinkIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Structure Analysis
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Links & Tags
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex flex-col items-center gap-1 opacity-60">
                    <div className="w-8 h-8 rounded-full border-2 border-purple-200"></div>
                    <div className="h-4 w-0.5 bg-purple-200"></div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full border-2 border-purple-200"></div>
                      <div className="w-6 h-6 rounded-full border-2 border-purple-200"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Gauge & Highlights */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Score Gauge */}
              <div className="lg:col-span-4">
                <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
                  <div
                    className="absolute inset-0 opacity-100 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                    }}
                  />
                  <div className="relative z-10 text-center space-y-4">
                    <h3 className="text-xl font-medium text-green-100">
                      Health Score
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
                              value: result.health_score,
                              fill: getScoreColor(result.health_score),
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
                        <span className="text-6xl font-bold text-white block">
                          {result.health_score}
                        </span>
                        <span className="text-sm font-medium uppercase tracking-wide opacity-80">
                          {result.health_score >= 80
                            ? "Healthy"
                            : result.health_score >= 50
                              ? "Needs Work"
                              : "Critical"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Technical Overview Cards */}
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 h-full">
                <MetricCard
                  label="Load Time"
                  value={`${result.analysis.technical.load_time_seconds}s`}
                  type="secondary"
                  icon={<Zap className="w-4 h-4" />}
                  subtext={
                    result.analysis.technical.load_time_seconds < 1
                      ? "Fast"
                      : "Slow"
                  }
                />
                <MetricCard
                  label="Word Count"
                  value={result.analysis.content_quality.word_count}
                  type="secondary"
                  icon={<FileText className="w-4 h-4" />}
                  subtext={result.analysis.content_quality.content_status}
                />
                <Card className="sm:col-span-2 bg-primary/5 shadow-none dark:bg-zinc-900 border border-border/50 rounded-xl p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Improvement Opportunities
                  </h3>
                  <div className="flex flex-col gap-3">
                    {Object.entries(result.analysis.on_page).map(
                      ([key, val]: any) => {
                        const status =
                          typeof val === "object"
                            ? val?.status
                            : typeof val === "string"
                              ? val
                              : "";

                        // Error State (Too Short, Missing, etc)
                        if (
                          status === "Too Short" ||
                          status === "Missing" ||
                          status === "Too Long" ||
                          (status && status.includes("Recommended"))
                        ) {
                          return (
                            <AnalysisItem
                              key={key}
                              label={key}
                              value=""
                              status={status}
                            />
                          );
                        }
                        return null;
                      },
                    )}

                    {result.analysis.structure.missing_alt_tags > 0 && (
                      <AnalysisItem
                        label="Images"
                        value=""
                        status={`Add Alt Tags (${result.analysis.structure.missing_alt_tags})`}
                      />
                    )}

                    {/* Empty State for Improvements */}
                    {Object.values(result.analysis.on_page).every(
                      (val: any) =>
                        !val?.status ||
                        (val.status !== "Too Short" &&
                          val.status !== "Missing" &&
                          val.status !== "Too Long" &&
                          !val.status.includes("Recommended")),
                    ) &&
                      result.analysis.structure.missing_alt_tags === 0 && (
                        <div className="w-full flex items-center gap-3 p-4 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span className="font-semibold text-sm">
                            Great job! No major issues found.
                          </span>
                        </div>
                      )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Analysis Detail Grids */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* On-Page & Technical */}
              <Card className="border border-border/50 shadow-none bg-primary/5 dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400">
                    <Layout className="w-5 h-5 text-blue-500" />
                    On-Page & Technical
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnalysisItem
                    label="Title Tag"
                    value={result.analysis.on_page.title.value}
                    status={result.analysis.on_page.title.status}
                  />
                  <AnalysisItem
                    label="H1 Match"
                    value={result.analysis.on_page.h1_match_title}
                    status={result.analysis.on_page.h1_match_title}
                  />
                  <AnalysisItem
                    label="Meta Description"
                    value={result.analysis.technical.meta_description_present}
                  />
                  <AnalysisItem
                    label="Canonical Tag"
                    value={result.analysis.technical.canonical_tag || "Missing"}
                    status={
                      result.analysis.technical.canonical_tag
                        ? "Good"
                        : "Missing"
                    }
                  />
                  <AnalysisItem
                    label="Viewport Tag"
                    value={result.analysis.technical.viewport_tag}
                  />
                  <AnalysisItem
                    label="HTML Size"
                    value={`${result.analysis.technical.html_size_kb} KB`}
                  />
                </CardContent>
              </Card>

              {/* Quality & Structure */}
              <Card className="border border-border/50 shadow-none bg-primary/5 dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400">
                    <FileText className="w-5 h-5 text-emerald-500" />
                    Quality & Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnalysisItem
                    label="Readability"
                    value={result.analysis.content_quality.readability_check}
                    status={result.analysis.content_quality.readability_check}
                  />
                  <AnalysisItem
                    label="Avg Sentence Length"
                    value={
                      result.analysis.content_quality.avg_sentence_length ||
                      "N/A"
                    }
                  />
                  <AnalysisItem
                    label="Header Count"
                    value={result.analysis.structure.header_count}
                  />
                  <AnalysisItem
                    label="Image Count"
                    value={result.analysis.structure.image_count || 0}
                  />
                  <AnalysisItem
                    label="Internal Links"
                    value={result.analysis.structure.internal_links}
                  />
                  <AnalysisItem
                    label="Missing Alt Tags"
                    value={result.analysis.structure.missing_alt_tags}
                    status={
                      result.analysis.structure.missing_alt_tags > 0
                        ? "Missing"
                        : "Good"
                    }
                  />
                </CardContent>
              </Card>
            </div>

            {/* Header Structure (New Section) */}
            {result.analysis.structure.header_structure &&
              result.analysis.structure.header_structure.length > 0 && (
                <Card className="border border-border/50 shadow-none bg-primary/5 dark:bg-zinc-900">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400">
                      <Layout className="w-5 h-5 text-purple-500" />
                      Header Structure
                    </CardTitle>
                    <CardDescription>
                      Overview of your content hierarchy (H1-H6).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {result.analysis.structure.header_structure.map(
                        (header: any, index: number) => (
                          <div
                            key={index}
                            className={cn(
                              "p-3 rounded-lg bg-white border border-gray-100 dark:border-zinc-800 text-sm flex items-start gap-4 transition-colors",
                            )}
                          >
                            <span
                              className={cn(
                                "font-mono font-bold uppercase text-xs px-2 py-1 rounded shrink-0",
                                header.tag === "h1"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-black/10 text-black",
                              )}
                            >
                              {header.tag}
                            </span>
                            <span className="text-black font-medium leading-relaxed">
                              {header.text}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

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
                    Get automated, site-wide audits and historical tracking with
                    Texavor Pro.
                  </p>

                  <Button
                    size="lg"
                    className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A12] font-semibold text-lg rounded-xl transition-all w-full sm:w-auto"
                    asChild
                  >
                    <Link href={result.upsell?.cta_link || "/pricing"}>
                      Start Site Audit
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
