"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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

// --- Components ---

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  className,
}: {
  icon: any;
  label: string;
  value: string | number;
  subtext: string;
  className?: string;
}) {
  return (
    <Card
      className={`border-border/50 shadow-sm bg-white dark:bg-zinc-900 ${className}`}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground font-inter">
            {label}
          </p>
          <div className="text-3xl font-bold mt-1 font-poppins">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function BrandAuthorityPage() {
  const [result, setResult] = useState<DomainAuthorityResponse | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Form
  const form = useForm({
    defaultValues: {
      url: "",
    },
    //@ts-ignore
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      checkMutation.mutate(value);
    },
  });

  // Mutation
  const checkMutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      // Mocking 429 for demo if needed, but normally URL
      const response = await axiosInstance.post(
        "/api/v1/public/tools/brand_authority",
        values,
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
          cta_link: "/pricing",
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

  return (
    <div className="min-h-screen dark:bg-zinc-950 font-sans mt-32">
      <div className="container max-w-7xl px-4 mx-auto pb-20">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pb-2 font-poppins">
            Free Domain Authority Checker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Get your Website Authority Score instantly. View total backlinks,
            referring domains, and organic traffic estimates.
          </p>
        </div>

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
        <Card className="mb-16 bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none mx-auto overflow-visible ring-1 ring-border/50 max-w-3xl">
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
                        className="h-12 pl-10 text-lg bg-slate-50 dark:bg-zinc-950/50 border-input"
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
                size="lg"
                className="h-12 px-8 min-w-[140px] font-semibold text-lg bg-[#104127] hover:bg-[#0c311d] text-white shadow-lg hover:shadow-xl transition-all"
                disabled={checkMutation.isPending}
              >
                {checkMutation.isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Check Authority"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Authority Gauge */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Gauge Card */}
              <div className="lg:col-span-4">
                <Card className="h-full border-none shadow-lg rounded-xl bg-[#104127] text-white relative overflow-hidden flex flex-col min-h-[300px]">
                  {/* Dynamic Background */}
                  <div
                    className="absolute inset-0 opacity-100 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
                    }}
                  />
                  <CardHeader className="pb-2 text-center pt-8 relative z-10">
                    <CardTitle className="text-2xl text-white font-poppins">
                      Domain Authority
                    </CardTitle>
                    <CardDescription className="text-emerald-100/80 font-inter">
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
                          data={gaugeData}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                          />
                          <RadialBar
                            background={{ fill: "rgba(255,255,255,0.1)" }}
                            dataKey="value"
                            cornerRadius={30}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-5xl font-bold font-poppins tracking-tighter shadow-sm">
                          {result.domain_authority}
                        </span>
                        <span className="text-sm text-emerald-200/80 font-medium uppercase tracking-widest mt-1">
                          / 100
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs font-medium text-emerald-100/90">
                      <div className="flex items-center gap-1">
                        {result.trust_signals.ssl_secure ? (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}{" "}
                        SSL
                      </div>
                      <div className="flex items-center gap-1">
                        {result.trust_signals.has_sitemap ? (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}{" "}
                        Sitemap
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Metrics Grid */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-6 h-full">
                  <StatCard
                    icon={LinkIcon}
                    label="Total Backlinks"
                    value={formatNumber(result.metrics.backlinks)}
                    subtext="External links to site"
                  />
                  <StatCard
                    icon={Users}
                    label="Referring Domains"
                    value={formatNumber(result.metrics.referring_domains)}
                    subtext="Unique domains linking"
                  />
                  <StatCard
                    icon={Search}
                    label="Organic Keywords"
                    value={formatNumber(result.metrics.organic_keywords)}
                    subtext="Ranking in Top 100"
                  />
                  <StatCard
                    icon={BarChart}
                    label="Est. Monthly Traffic"
                    value={formatNumber(result.metrics.estimated_traffic)}
                    subtext="From organic search"
                  />
                </div>
              </div>
            </div>

            {/* Upsell Section */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0A1A12] text-white p-8 md:p-12 text-center shadow-2xl mt-8">
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
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-poppins">
                  Deep Competitor Analysis
                </h3>
                <p className="text-lg text-emerald-100/80 font-inter">
                  {result.upsell.message}
                </p>

                <div className="flex flex-wrap justify-center gap-3 py-4">
                  {[
                    "Full Backlink List",
                    "Keyword Gap Analysis",
                    "Top Pages",
                  ].map((data, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium flex items-center gap-2"
                    >
                      <Lock className="w-3 h-3 text-emerald-500" /> {data}
                    </span>
                  ))}
                </div>

                <Link href={result.upsell.cta_link} className="inline-block">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A12] font-semibold text-lg rounded-xl transition-all min-w-[200px]"
                  >
                    Unlock Pro Data
                  </Button>
                </Link>
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
              Please try again tomorrow or upgrade to Pro for unlimited checks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-2">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Get Unlimited Access
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setShowLimitModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
