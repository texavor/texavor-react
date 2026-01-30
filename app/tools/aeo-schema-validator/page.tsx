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
import UsageSchema from "./components/UsageSchema";
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

export default function AEOSchemaValidatorPage() {
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
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <UsageSchema />
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            AEO Schema Validator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Is your content ready for AI search? Analyze your Schema Markup for
            Answer Engine Optimization (AEO) readiness.
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
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Score Column */}
              <div className="md:col-span-4">
                <ScoreDisplay
                  score={result.score}
                  grade={result.grade}
                  type="primary"
                  className="h-full"
                />
              </div>

              {/* Health Checks Column */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <AEOHealthGrid checks={result.aeo_checks} />
              </div>
            </div>

            {/* Opportunities */}
            {result.opportunities && result.opportunities.length > 0 && (
              <Card className="bg-primary/5 shadow-none dark:bg-zinc-900 border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-slate-600 dark:text-slate-400 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Optimization Opportunities
                </h3>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    {result.opportunities.map((opp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-white dark:bg-black/20 p-3 rounded-lg border border-border/50"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Schema Viewer (Carousel) */}
            {result.schemas && result.schemas.length > 0 && (
              <Card className="border-gray-800 shadow-xl bg-[#0d1117] text-gray-300 mt-8 overflow-hidden rounded-2xl">
                <CardHeader className="border-b border-gray-800 py-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-emerald-400" />
                    <span className="font-mono text-sm font-semibold text-white">
                      Detected JSON-LD
                    </span>
                    <span className="text-xs text-gray-500 ml-2 bg-gray-800 px-2 py-0.5 rounded-full">
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
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
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
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 bg-gray-800 hover:bg-gray-700 text-white gap-2 transition-all"
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
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span className="text-xs">Copy JSON</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative group">
                  <div className="max-h-[500px] overflow-auto custom-scrollbar">
                    <pre className="p-4 text-xs md:text-sm font-mono leading-relaxed">
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
            <div className="text-center pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Detected Types Summary
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.detected_types.map((type, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
