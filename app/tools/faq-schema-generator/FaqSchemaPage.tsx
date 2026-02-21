"use client";

import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Loader2,
  Plus,
  Trash2,
  Copy,
  Check,
  Code,
  Globe,
  RefreshCw,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// --- Types & Schemas ---

const manualSchema = z.object({
  qa_pairs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    }),
  ),
});

const autoSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

interface QaPair {
  question: string;
  answer: string;
}

interface ApiResponse {
  source: string;
  qa_count: number;
  qa_pairs: QaPair[];
  json_ld: any;
  microdata: string;
  validation_tool_url: string;
}

// --- Component ---

export default function FaqSchemaPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);
  const [qaPairs, setQaPairs] = useState<QaPair[]>([
    { question: "", answer: "" },
  ]);
  const [generatedSchema, setGeneratedSchema] = useState<any>(null);
  const [generatedMicrodata, setGeneratedMicrodata] = useState<string>("");
  const [showMicrodata, setShowMicrodata] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Auto-Extract Mutation ---
  const extractMutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosInstance.post(
        "/api/v1/public/tools/faq_schema_generator",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as ApiResponse;
    },
    onSuccess: (data) => {
      setQaPairs(data.qa_pairs);
      setGeneratedSchema(data.json_ld);
      setGeneratedMicrodata(data.microdata);
      toast.success(`Found ${data.qa_count} questions!`);
      // Switch to manual tab to show results in inputs
      setActiveTab("manual");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Extraction failed");
    },
  });

  // --- Forms ---
  const autoForm = useForm({
    defaultValues: { url: "" },
    //@ts-ignore
    validatorAdapter: zodValidator(),
    validators: { onChange: autoSchema },
    onSubmit: async ({ value }) => {
      if (turnstileToken) {
        await extractMutation.mutateAsync(value);
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
      extractMutation.mutateAsync(pendingValues);
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

  // --- Logic ---

  // Live Schema Generation (for manual edits)
  useEffect(() => {
    // Only generate if we have valid data
    const validPairs = qaPairs.filter((p) => p.question && p.answer);
    if (validPairs.length === 0) {
      setGeneratedSchema(null);
      return;
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validPairs.map((pair) => ({
        "@type": "Question",
        name: pair.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: pair.answer,
        },
      })),
    };

    const microdata = validPairs
      .map(
        (pair) => `
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">${pair.question}</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <div itemprop="text">
      ${pair.answer}
    </div>
  </div>
</div>`,
      )
      .join("\n");

    setGeneratedSchema(jsonLd);
    setGeneratedMicrodata(
      `<div itemscope itemtype="https://schema.org/FAQPage">\n${microdata}\n</div>`,
    );
  }, [qaPairs]);

  // Syntax Highlighting
  useEffect(() => {
    if (generatedSchema) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((el) => {
          hljs.highlightElement(el as HTMLElement);
        });
      }, 50);
    }
  }, [generatedSchema, showMicrodata]);

  const addPair = () => {
    setQaPairs([...qaPairs, { question: "", answer: "" }]);
  };

  const removePair = (index: number) => {
    const newPairs = [...qaPairs];
    newPairs.splice(index, 1);
    setQaPairs(newPairs);
  };

  const updatePair = (index: number, field: keyof QaPair, value: string) => {
    const newPairs = [...qaPairs];
    newPairs[index][field] = value;
    setQaPairs(newPairs);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              FAQ Schema Generator
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Boost your visibility in search results. Create FAQ schema
              manually or extract it from any page instantly.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto pt-10 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Input */}
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-lg h-11">
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all rounded-lg"
                >
                  Manual Input
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all rounded-lg"
                >
                  Import from URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <Card className="bg-card border border-border shadow-none rounded-lg">
                  <CardHeader>
                    <CardTitle>Questions & Answers</CardTitle>
                    <CardDescription>
                      Add your FAQ items below. The schema updates in real-time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {qaPairs.map((pair, index) => (
                      <div
                        key={index}
                        className="relative p-5 rounded-lg bg-background border border-border/60 space-y-4 group transition-all hover:border-primary/30"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2 w-full">
                            <Label>Question #{index + 1}</Label>
                            <Input
                              value={pair.question}
                              onChange={(e) =>
                                updatePair(index, "question", e.target.value)
                              }
                              placeholder="e.g., What is your return policy?"
                              className="h-10 bg-background border-input"
                            />
                          </div>
                          {qaPairs.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removePair(index)}
                              className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-8"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea
                            value={pair.answer}
                            onChange={(e) =>
                              updatePair(index, "answer", e.target.value)
                            }
                            placeholder="e.g., You can return items within 30 days..."
                            className="bg-background border-input min-h-[80px]"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={addPair}
                      variant="outline"
                      className="w-full border-dashed hover:bg-primary/5 hover:text-primary hover:border-primary/50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Question
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="auto" className="space-y-4">
                <Card className="bg-card border border-border shadow-none rounded-lg">
                  <CardHeader>
                    <CardTitle>Extract from URL</CardTitle>
                    <CardDescription>
                      Enter a page URL to automatically find and format
                      questions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        autoForm.handleSubmit();
                      }}
                      className="space-y-4"
                    >
                      <autoForm.Field
                        name="url"
                        children={(field) => (
                          <div className="space-y-2">
                            <Label>Page URL</Label>
                            <div className="flex gap-2">
                              <Input
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                                placeholder="https://example.com/faq"
                                className="flex-1 bg-background border-input h-11 text-base placeholder:text-muted-foreground/60"
                              />
                              <Button
                                type="submit"
                                variant="brand"
                                disabled={
                                  extractMutation.isPending || isWaitingForToken
                                }
                                className="h-11 w-32 shrink-0 rounded-md font-semibold text-base"
                              >
                                {isWaitingForToken ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                  </>
                                ) : extractMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Extract
                                  </>
                                )}
                              </Button>
                            </div>
                            <div className="flex justify-start">
                              <Turnstile
                                siteKey={
                                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                                  ""
                                }
                                onSuccess={(token) => setTurnstileToken(token)}
                                onExpire={() => setTurnstileToken("")}
                              />
                            </div>
                            {field.state.meta.errors ? (
                              <p className="text-sm text-red-500">
                                {field.state.meta.errors[0]?.message}
                              </p>
                            ) : null}
                          </div>
                        )}
                      />
                      <Alert className="bg-muted/30 border border-border text-foreground rounded-lg p-4">
                        <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <AlertDescription className="text-muted-foreground font-inter text-sm leading-relaxed">
                          This checks the URL for common FAQ patterns (H2/H3 +
                          Paragraphs) and converts them into schema
                          automatically.
                        </AlertDescription>
                      </Alert>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Preview & Output */}
          <div className="space-y-6 sticky top-8">
            {/* Preview Card */}
            <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 font-inter">
                  <Image
                    src="/icons/google.png"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  SERP Presentation Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {generatedSchema ? (
                  <div className="space-y-4">
                    {/* Google Result Mockup */}
                    <div className="space-y-1 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#202124] dark:text-zinc-400">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center border border-border">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs leading-none font-medium">
                            Texavor
                          </span>
                          <span className="text-[11px] leading-none opacity-60">
                            https://www.texavor.com › tools
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl text-[#1a0dab] dark:text-blue-400 font-medium hover:underline cursor-pointer">
                        FAQ Schema Generator - GEO Rich Snippet Tool
                      </h3>
                      <p className="text-sm text-[#4d5156] dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        Boost CTR and AI visibility instantly by generating
                        valid JSON-LD FAQ Schema markup. Optimized for
                        generative engines and Google search.
                      </p>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      className="w-full border-t border-border"
                    >
                      {generatedSchema.mainEntity.map(
                        (item: any, i: number) => (
                          <AccordionItem
                            value={`item-${i}`}
                            key={i}
                            className="border-b border-border/40"
                          >
                            <AccordionTrigger className="py-3 text-[14px] font-medium text-[#1a0dab] dark:text-blue-400 hover:no-underline text-left">
                              {item.name}
                            </AccordionTrigger>
                            <AccordionContent className="text-[14px] text-[#4d5156] dark:text-zinc-400 leading-relaxed pl-4 border-l-2 border-primary/20 bg-muted/20 p-4 rounded-r-md">
                              {item.acceptedAnswer.text}
                            </AccordionContent>
                          </AccordionItem>
                        ),
                      )}
                    </Accordion>
                  </div>
                ) : (
                  <div className="p-12 text-center text-muted-foreground font-inter italic border-2 border-dashed border-border rounded-lg">
                    Add questions to visualize the SERP snippet.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Code Output Card */}
            <Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border py-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <Code className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="font-poppins text-[13px] font-bold text-foreground">
                    {showMicrodata ? "MICRODATA HTML" : "JSON-LD SCHEMA"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMicrodata(!showMicrodata)}
                    className="h-8 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  >
                    Switch to {showMicrodata ? "JSON-LD" : "Microdata"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative group bg-background">
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-2 right-2 h-8 w-8 bg-background border-border hover:bg-muted/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() =>
                    handleCopy(
                      showMicrodata
                        ? generatedMicrodata
                        : JSON.stringify(generatedSchema, null, 2),
                    )
                  }
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <div className="max-h-[400px] overflow-auto custom-scrollbar">
                  {generatedSchema ? (
                    <pre className="p-5 text-xs md:text-sm font-mono leading-relaxed text-foreground">
                      <code
                        className={
                          showMicrodata ? "language-html" : "language-json"
                        }
                      >
                        {showMicrodata
                          ? generatedMicrodata
                          : JSON.stringify(generatedSchema, null, 2)}
                      </code>
                    </pre>
                  ) : (
                    <div className="p-10 text-center text-muted-foreground text-sm font-inter italic">
                      Generate schema to view code.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upsell Section - Standardized Pattern (Full Width) */}
        <div className="relative mt-20 bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8 animate-fade-slide-up">
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
    </div>
  );
}
