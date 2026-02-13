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
  Code,
  Check,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import SemanticStructureSkeleton from "./SemanticStructureSkeleton";
import HierarchyTree from "./components/HierarchyTree";
import IssueAlerts from "./components/IssueAlerts";
import ScoreDisplay from "../aeo-schema-validator/components/ScoreDisplay";
import Link from "next/link";

// --- Types ---
const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

interface HierarchyNode {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}

interface SemanticStructureResult {
  url: string;
  score: number;
  hierarchy_tree: HierarchyNode[];
  issues: string[];
  upsell?: {
    message: string;
    cta_link: string;
  };
}

export default function SemanticStructureClient() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/semantic_structure",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as SemanticStructureResult;
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

  const error = mutation.error
    ? (mutation.error as any)?.response?.data?.message ||
      mutation.error?.message
    : null;

  const shouldShowUpsell = result?.upsell;

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            GEO Heading Structure Validator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Search engines and Screen Readers rely on a logical heading
            hierarchy to understand your content. Skipped levels confuse AI
            crawlers and hurt your Generative Engine Optimization (GEO).
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
                          placeholder="https://example.com/article"
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
                  className="h-12 px-8 min-w-[140px] font-semibold text-lg bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all rounded-xl"
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
        {loading && <SemanticStructureSkeleton />}

        {/* Empty State Feature Preview */}
        {!result && !loading && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto opacity-90">
            {/* Feature 1: Visual Hierarchy */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Visual Hierarchy Tree
                  </CardTitle>
                  <CardDescription className="font-inter">
                    See your content outline exactly how Google and AI search
                    engines see it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-80">
                      <div className="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded w-10 text-center">
                        H1
                      </div>
                      <div className="h-2 bg-primary/5 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-60 pl-8">
                      <div className="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded w-10 text-center">
                        H2
                      </div>
                      <div className="h-2 bg-primary/5 rounded w-28"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-40 pl-14">
                      <div className="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded w-10 text-center">
                        H3
                      </div>
                      <div className="h-2 bg-primary/5 rounded w-24"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2: Error Detection */}
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-purple-100/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <Card className="relative h-full border border-border/20 shadow-none rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transform rotate-1 group-hover:rotate-2 transition-transform duration-500">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">
                    Error Detection
                  </CardTitle>
                  <CardDescription className="font-inter">
                    Instantly spot missing H1s or illogical jumps (H2 → H4) that
                    hurt your GEO score.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-500/10 rounded-lg opacity-80">
                      <Check className="w-4 h-4 text-green-500" />
                      <div className="h-2 bg-green-200 dark:bg-green-500/20 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-500/10 rounded-lg opacity-60">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <div className="h-2 bg-red-200 dark:bg-red-500/20 rounded w-28"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg opacity-40">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <div className="h-2 bg-yellow-200 dark:bg-yellow-500/20 rounded w-24"></div>
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
            <div className="grid md:grid-cols-12 gap-6">
              {/* Score Column */}
              <div className="md:col-span-4">
                <ScoreDisplay
                  score={result.score}
                  type="primary"
                  className="h-full"
                />
              </div>

              {/* Hierarchy Tree Column */}
              <div className="md:col-span-8">
                <HierarchyTree nodes={result.hierarchy_tree} />
              </div>
            </div>

            {/* Issues */}
            {result.issues && result.issues.length > 0 && (
              <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground font-poppins flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Issues Detected
                  </h3>
                  <ul className="space-y-2">
                    {result.issues.map((issue, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm font-medium text-foreground bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg border border-amber-200 dark:border-amber-500/20"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800 dark:text-amber-300">
                          {issue}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Upsell Section */}
            {shouldShowUpsell && (
              <Card className="bg-gradient-to-r from-primary/10 to-green-600/10 border-primary/20 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2 font-poppins">
                        {shouldShowUpsell.message ||
                          "Want perfectly structured content?"}
                      </h3>
                      <p className="text-muted-foreground">
                        Texavor Pro automatically generates perfectly structured
                        outlines optimized for Google SGE and AI search engines.
                      </p>
                    </div>
                    <Link href={shouldShowUpsell.cta_link || "/pricing"}>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl transition-all font-semibold"
                      >
                        Generate Optimized Outline
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
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
