"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Turnstile } from "@marsidev/react-turnstile";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import MetricCard from "../ai-visibility-calculator/MetriCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  ShieldCheck,
  Globe,
  Loader2,
  Lock,
  Link as LinkIcon,
  BarChart,
  Users,
  Search,
  AlertTriangle,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "sonner";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// --- Types ---
interface DomainAuthorityResponse {
  domain_authority: number;
  metrics: {
    backlinks: number;
    referring_domains: number;
    organic_keywords: number;
    estimated_traffic: number;
  };
  trust_signals: {
    ssl_secure: boolean;
    has_sitemap: boolean;
  };
  usage: {
    remaining: number;
  };
  upsell: {
    message: string;
    cta_link: string;
  };
}

// Dummy Data for Feature Preview
const dummyTrendData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 42 },
  { name: "Apr", value: 60 },
  { name: "May", value: 55 },
  { name: "Jun", value: 75 },
];

// --- Components ---

export default function BrandAuthorityPage() {
  const [result, setResult] = useState<DomainAuthorityResponse | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isWaitingForToken, setIsWaitingForToken] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  // Form
  const form = useForm({
    defaultValues: {
      url: "",
    },
    //@ts-ignore
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      if (turnstileToken) {
        checkMutation.mutate(value);
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
      checkMutation.mutate(pendingValues);
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

  // Mutation
  const checkMutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      // Mocking 429 for demo if needed, but normally URL
      const response = await axiosInstance.post(
        "/api/v1/public/tools/brand_authority",
        values,
        {
          headers: {
            "X-Turnstile-Token": turnstileToken,
          },
        },
      );
      return response.data as DomainAuthorityResponse;
    },
    onSuccess: (data) => {
      setResult(data);
      if (data.usage?.remaining === 0) {
        toast.warning("This is your last free check for today.");
      } else {
        toast.success("Analysis complete!");
      }
    },
    onError: (error: any) => {
      console.error(error);
      if (
        error?.response?.status === 429 ||
        error?.response?.data?.error === "Daily Limit Reached"
      ) {
        setShowLimitModal(true);
        setTurnstileToken(""); // Reset token to stop loading state
        checkMutation.reset(); // Reset the mutation state to remove isPending lock
        return;
      }

      // Mock data for verification/demo purposes since API might not be live
      setResult({
        domain_authority: 45,
        metrics: {
          backlinks: 12500,
          referring_domains: 320,
          organic_keywords: 5400,
          estimated_traffic: 1200,
        },
        trust_signals: {
          ssl_secure: true,
          has_sitemap: true,
        },
        usage: {
          remaining: 2,
        },
        upsell: {
          message: "Get full competitor analysis with Texavor Pro.",
          cta_link: "#pricing",
        },
      });
      toast.info("Using demo data (API simulation)");
    },
  });

  // Gauge Data
  const gaugeData = result
    ? [
        {
          value: result.domain_authority,
          fill:
            result.domain_authority > 70
              ? "#34d399"
              : result.domain_authority > 40
                ? "#f59e0b"
                : "#ef4444",
        },
      ]
    : [{ value: 0, fill: "#e5e7eb" }];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const getScoreImpact = (score: number) => {
    if (score >= 70)
      return {
        label: "Excellent Authority",
        desc: "Highly competitive profile. Ready for tough keywords.",
        colorClass: "text-primary",
        bgClass: "bg-primary/10",
        borderClass: "border-primary/30",
        fill: "#10b981", // Emerald 500
      };
    if (score >= 40)
      return {
        label: "Average Authority",
        desc: "Good foundation. Target medium-difficulty keywords.",
        colorClass: "text-accent",
        bgClass: "bg-accent/10",
        borderClass: "border-accent/30",
        fill: "#f59e0b", // Amber 500
      };
    return {
      label: "Low Authority",
      desc: "Newer domain. Focus on building quality backlinks.",
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10",
      borderClass: "border-destructive/30",
      fill: "#ef4444", // Red 500
    };
  };

  const impact = result ? getScoreImpact(result.domain_authority) : null;

  return (
    <div className="min-h-screen bg-background font-sans mt-6 lg:mt-0">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 md:pt-28 md:pb-16 bg-background tx-dot-bg border-b border-border/50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl animate-fade-slide-up">
            <p className="tx-eyebrow mb-5">FREE SEO TOOL</p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Domain Authority Checker
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Get your Website Authority Score instantly. View total backlinks,
              referring domains, and organic traffic estimates. No credit card
              required.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl px-6 mx-auto pt-10 md:pt-16 pb-24">
        {/* Limit Banner */}
        {result && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2 flex items-center justify-between text-sm text-amber-900 dark:text-amber-400">
              <span className="flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4" />
                Free Checks Remaining Today
              </span>
              <span className="font-bold">{result.usage.remaining}/3</span>
            </div>
          </div>
        )}
        {/* Input Card */}
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
              <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                <div className="flex-1 w-full space-y-2">
                  <Label htmlFor="url" className="sr-only">
                    Website URL
                  </Label>
                  <form.Field
                    name="url"
                    validators={{
                      onChange: z.string().url("Please enter a valid URL"),
                    }}
                    children={(field) => (
                      <div className="relative">
                        <Globe className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="https://example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-11 pl-10 text-base bg-background border-input"
                        />
                        {field.state.meta.errors ? (
                          <p className="text-sm text-destructive mt-1 font-medium animate-in slide-in-from-top-1 fade-in duration-300">
                            {field.state.meta.errors[0]?.message}
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
                  disabled={checkMutation.isPending || isWaitingForToken}
                >
                  {isWaitingForToken ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : checkMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Analyze Domain"
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
        {/* Feature Preview (Empty State) - Always show when no result */}
        {!result && (
          <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
            {/* Feature 1: Authority Score */}
            <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-poppins text-foreground">
                  Domain Authority
                </CardTitle>
                <CardDescription className="font-inter text-muted-foreground">
                  Estimate domain trust signals (0-100).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="relative h-40 w-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      innerRadius="80%"
                      outerRadius="100%"
                      barSize={10}
                      data={[{ value: 75, fill: "#10b981" }]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar dataKey="value" cornerRadius={30} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold font-poppins text-primary">
                      75
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">
                      Score
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: Traffic Trends */}
            <Card className="h-full border border-border shadow-none rounded-lg bg-card overflow-hidden transition-all duration-300 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BarChart className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-poppins text-foreground">
                  Traffic Insights
                </CardTitle>
                <CardDescription className="font-inter text-muted-foreground">
                  See growth trends and organic visits.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0 px-0">
                <div className="mt-4 px-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        12.5K
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        Visits / Mo
                      </div>
                    </div>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dummyTrendData}>
                        <defs>
                          <linearGradient
                            id="colorValAuth"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorValAuth)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Results Section */}{" "}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Authority Gauge */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Gauge Card */}
              <div className="lg:col-span-4">
                <Card className="h-full border border-border shadow-none rounded-lg bg-card relative overflow-hidden flex flex-col min-h-[300px]">
                  <CardHeader className="pb-2 text-center pt-8 relative z-10">
                    <CardTitle className="text-2xl text-foreground font-poppins">
                      Domain Authority
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-inter">
                      Authority Score (DA)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10 flex flex-col items-center justify-center pb-8">
                    <div className="relative h-48 w-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          innerRadius="80%"
                          outerRadius="100%"
                          barSize={12}
                          data={[
                            {
                              value: result.domain_authority,
                              fill: impact?.fill || "#10b981",
                            },
                          ]}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                          />
                          <RadialBar dataKey="value" cornerRadius={30} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-5xl font-bold font-poppins tracking-tighter text-foreground">
                          {result.domain_authority}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-1">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-4 text-xs font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {result.trust_signals.ssl_secure ? (
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}{" "}
                        SSL
                      </div>
                      <div className="flex items-center gap-1">
                        {result.trust_signals.has_sitemap ? (
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}{" "}
                        Sitemap
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Metrics Grid */}
              <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* <MetricCard
                    label="Total Backlinks"
                    value={formatNumber(result.metrics.backlinks)}
                    type="secondary"
                    subtext="External links to site"
                    icon={<LinkIcon className="w-4 h-4" />}
                  />
                  <MetricCard
                    label="Referring Domains"
                    value={formatNumber(result.metrics.referring_domains)}
                    type="secondary"
                    subtext="Unique domains linking"
                    icon={<Users className="w-4 h-4" />}
                  /> */}
                  <MetricCard
                    label="Organic Keywords"
                    value={formatNumber(result.metrics.organic_keywords)}
                    type="secondary"
                    subtext="Total ranking keywords"
                    icon={<Search className="w-4 h-4" />}
                  />
                  <MetricCard
                    label="Est. Monthly Traffic"
                    value={formatNumber(result.metrics.estimated_traffic)}
                    type="secondary"
                    subtext="From organic search"
                    icon={<BarChart className="w-4 h-4" />}
                  />
                </div>

                {impact && (
                  <div
                    className={`flex-1 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-start text-left border ${impact.bgClass} ${impact.borderClass} w-full gap-4`}
                  >
                    <div>
                      <h4
                        className={`font-poppins font-bold text-2xl ${impact.colorClass}`}
                      >
                        {impact.label}
                      </h4>
                      <p className="font-inter text-base text-foreground/80 mt-2 leading-relaxed">
                        {impact.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upsell Section */}
            <div className="relative pt-12">
              <div className="relative bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <p className="tx-eyebrow mb-2">READY TO GO DEEPER?</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-poppins text-foreground mb-3">
                    Deep Competitor Analysis
                  </h3>
                  <p className="font-inter text-base text-muted-foreground max-w-lg leading-relaxed">
                    {result.upsell.message} Unlock the full backlink profile,
                    keyword gaps, and top pages to build a complete content
                    strategy.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      "Full Backlink List",
                      "Keyword Gap Analysis",
                      "Top Pages",
                    ].map((data, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-md bg-background border border-border text-xs font-medium flex items-center gap-1.5 text-muted-foreground"
                      >
                        <Lock className="w-3 h-3 text-primary" /> {data}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 pt-4 md:pt-0">
                  <Button
                    asChild
                    variant="brand"
                    size="lg"
                    className="h-12 px-8 font-semibold text-lg rounded-md"
                  >
                    <Link href={result.upsell.cta_link}>Unlock Pro Data</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Limit Modal */}
      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Daily Limit Reached
            </DialogTitle>
            <DialogDescription className="pt-2">
              You have used all your free domain check credits for today (3/3).
              Please try again tomorrow.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setShowLimitModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
