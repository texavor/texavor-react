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
  Sparkles,
  Lightbulb,
  Code,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import AEOHealthGrid from "./components/AEOHealthGrid";
import ScoreDisplay from "./components/ScoreDisplay";
import AEOSchemaValidatorSkeleton from "./AEOSchemaValidatorSkeleton";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface AEOAnalysisResult {
  url: string;
  domain: string;
  score: number;
  grade: string;
  detected_types: string[];
  schema_health: string;
  schemas: any[];
  aeo_checks: {
    schema_found: boolean;
    syntax_valid: boolean;
    aeo_type_found: boolean;
    entity_linking: string;
    voice_ready: boolean;
    identity_verified: boolean;
  };
  opportunities: string[];
}

export default function AEOSchemaValidatorClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState(0);
  const [pendingValues, setPendingValues] = useState<any>(null);

  // Reset index when result changes
  useEffect(() => {
    setCurrentSchemaIndex(0);
  }, [turnstileToken]);

  // Syntax Highlighting Effect
  useEffect(() => {
    // Small delay to ensure DOM is ready after result update
    const timer = setTimeout(() => {
      document.querySelectorAll("pre code").forEach((el) => {
        hljs.highlightElement(el as HTMLElement);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.get(
        "/api/v1/public/tools/analyze_aeo",
        {
          params: values,
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as AEOAnalysisResult;
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

  useEffect(() => {
    if (result) {
      setCurrentSchemaIndex(0); // Reset index on new result
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((el) => {
          hljs.highlightElement(el as HTMLElement);
        });
      }, 50);
    }
  }, [result]);

  // Re-highlight when index changes
  useEffect(() => {
    if (result && result.schemas.length > 0) {
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((el) => {
          hljs.highlightElement(el as HTMLElement);
        });
      }, 50);
    }
  }, [currentSchemaIndex, result]);

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
              AI Schema Validator
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Is your content ready for AI search? Analyze your Schema Markup
              for AI visibility readiness.
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
                          placeholder="https://texavor.com/blog/what-is-aeo"
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
        {loading && <AEOSchemaValidatorSkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1: GEO Health Checks */}
            <div className="relative group">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3 7 7 1-5 5 1.5 7-6.5-4-6.5 4 1.5-7-5-5 7-1z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-poppins text-foreground">
                    AI Schema Health Analysis
                  </CardTitle>
                  <CardDescription className="font-inter text-muted-foreground">
                    Comprehensive checks for AI search readiness and structured
                    data optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 p-2 bg-background border border-border/50 rounded-lg opacity-80">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <div className="h-2 bg-emerald-100 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-background border border-border/50 rounded-lg opacity-60">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <div className="h-2 bg-emerald-100 rounded w-28"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-40">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <div className="h-2 bg-primary/5 rounded w-24"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Schema Detection */}
            <div className="relative group mt-8 md:mt-0">
              <Card className="relative h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-purple-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-poppins text-foreground">
                    Schema Markup Detection
                  </CardTitle>
                  <CardDescription className="font-inter text-muted-foreground">
                    Automatically detect and validate JSON-LD structured data
                    for voice search optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="bg-card border border-border rounded-lg p-4 mt-2">
                    <div className="space-y-2 opacity-60">
                      <div className="h-2 bg-muted rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-2 bg-muted rounded w-5/6"></div>
                      <div className="h-2 bg-muted rounded w-2/3"></div>
                      <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                        <div className="h-2 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="grid md:grid-cols-12 gap-6 items-start">
              {/* Score Column */}
              <div className="md:col-span-4">
                <ScoreDisplay
                  score={result.score}
                  grade={result.grade}
                  type="primary"
                />
              </div>

              {/* Health Checks Column */}
              <div className="md:col-span-8">
                <AEOHealthGrid checks={result.aeo_checks} />
              </div>
            </div>

            {/* Opportunities */}
            {result.opportunities && result.opportunities.length > 0 && (
              <Card className="bg-card shadow-none border border-border rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground mb-4">
                  <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </span>
                  Optimization Opportunities
                </h3>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    {result.opportunities.map((opp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-background p-3 rounded-lg border border-border"
                      >
                        <svg
                          className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Schema Viewer (Carousel) */}
            {result.schemas && result.schemas.length > 0 && (
              <Card className="border-border shadow-none bg-card mt-8 overflow-hidden rounded-lg">
                <CardHeader className="border-b border-border py-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground">
                      Detected JSON-LD
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 bg-background border border-border px-2 py-0.5 rounded-full">
                      {currentSchemaIndex + 1} of {result.schemas.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.schemas.length > 1 && (
                      <div className="flex items-center gap-1 mr-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCurrentSchemaIndex((prev) =>
                              Math.max(0, prev - 1),
                            )
                          }
                          disabled={currentSchemaIndex === 0}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background border border-border"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCurrentSchemaIndex((prev) =>
                              Math.min(result.schemas.length - 1, prev + 1),
                            )
                          }
                          disabled={
                            currentSchemaIndex === result.schemas.length - 1
                          }
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background border border-border"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 gap-2 transition-all"
                      onClick={() =>
                        handleCopy(
                          JSON.stringify(
                            result.schemas[currentSchemaIndex],
                            null,
                            2,
                          ),
                        )
                      }
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span className="text-xs">Copy JSON</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative group">
                  <div className="max-h-[500px] overflow-auto custom-scrollbar bg-[#0d1117]">
                    <pre className="p-4 text-xs md:text-sm font-mono leading-relaxed text-gray-300">
                      <code className="language-json">
                        {JSON.stringify(
                          result.schemas[currentSchemaIndex],
                          null,
                          2,
                        )}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Schema Helper */}
            {result.detected_types && result.detected_types.length > 0 && (
              <Card className="bg-card shadow-none border border-border rounded-xl p-6 mt-8 flex flex-col justify-center">
                <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground mb-4">
                  <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  Detected Types Summary
                </h3>
                <CardContent className="p-0">
                  <div className="flex flex-wrap gap-3">
                    {result.detected_types.map((type, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-primary/5 text-primary text-sm font-semibold border border-primary/20"
                      >
                        {type}
                      </span>
                    ))}
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
