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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import React from "react";
import Image from "next/image";

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
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            FAQ Schema Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Boost your visibility in search results. Create FAQ schema manually
            or extract it from any page instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Input */}
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl h-12">
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-black transition-all rounded-lg"
                >
                  Manual Input
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="data-[state=active]:!bg-primary data-[state=active]:!text-black transition-all rounded-lg"
                >
                  Import from URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <Card className="bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50">
                  <CardHeader>
                    <CardTitle>Questions & Answers</CardTitle>
                    <CardDescription>
                      Add your FAQ items below. The schema updates in real-time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {qaPairs.map((pair, index) => (
                      <div
                        key={index}
                        className="relative p-4 rounded-xl bg-white dark:bg-zinc-950/50 border border-border/50 space-y-3 group"
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
                              className="bg-slate-50 dark:bg-zinc-900"
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
                            className="bg-slate-50 dark:bg-zinc-900 min-h-[80px]"
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
                <Card className="bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50">
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
                                className="flex-1 bg-white dark:bg-zinc-950/50 h-12"
                              />
                              <Button
                                type="submit"
                                disabled={
                                  extractMutation.isPending || isWaitingForToken
                                }
                                className="bg-primary hover:bg-primary/90 text-zinc-950 shadow-md transition-all w-32 shrink-0 self-start rounded-xl h-12"
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
                      <Alert className="bg-primary/5 dark:bg-zinc-900 border border-primary/10 dark:border-white/10 text-foreground">
                        <Globe className="w-4 h-4 text-primary" />
                        <AlertDescription className="text-muted-foreground">
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
            <Card className="bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50 overflow-hidden">
              <CardHeader className="bg-slate-50/50 dark:bg-zinc-950/50 border-b-2 border-[#104127] py-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Image
                    src="/icons/google.png"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Google Search Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {generatedSchema ? (
                  <Accordion type="single" collapsible className="w-full">
                    {generatedSchema.mainEntity.map((item: any, i: number) => (
                      <AccordionItem
                        value={`item-${i}`}
                        key={i}
                        className="px-4 border-b last:border-0 border-border/40"
                      >
                        <AccordionTrigger className="hover:no-underline hover:text-primary text-left">
                          {item.name}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.acceptedAnswer.text}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Add questions to see a preview.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Code Output Card */}
            <Card className="border-gray-800 shadow-xl bg-[#0d1117] text-gray-300">
              <CardHeader className="border-b border-gray-800 py-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-sm font-semibold text-white">
                    {showMicrodata
                      ? "Microdata (HTML)"
                      : "JSON-LD (Recommended)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMicrodata(!showMicrodata)}
                    className="h-7 text-xs text-gray-400 hover:text-white hover:bg-transparent"
                  >
                    Switch to {showMicrodata ? "JSON-LD" : "Microdata"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative group">
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 bg-gray-800 hover:bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
                    <pre className="p-4 text-xs md:text-sm font-mono leading-relaxed">
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
                    <div className="p-8 text-center text-gray-600 text-sm">
                      Generate schema to view code.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild className="hover:bg-slate-100">
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test in Google
                </a>
              </Button>
              <Button
                onClick={() =>
                  handleCopy(
                    showMicrodata
                      ? generatedMicrodata
                      : JSON.stringify(generatedSchema, null, 2),
                  )
                }
                disabled={!generatedSchema}
                className="bg-primary hover:bg-primary/90 text-zinc-950 shadow-lg transition-all rounded-xl"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
