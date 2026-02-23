"use client";

import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function OptOutPage() {
  const [isOptedOut, setIsOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const disabled = localStorage.getItem("umami.disabled");
      setIsOptedOut(disabled === "1");
    }
  }, []);

  const handleToggle = () => {
    if (isOptedOut) {
      localStorage.removeItem("umami.disabled");
      setIsOptedOut(false);
      toast.success("Tracking Enabled", {
        description: "Your visits will now be recorded.",
      });
      window.location.reload();
    } else {
      localStorage.setItem("umami.disabled", "1");
      setIsOptedOut(true);
      toast.success("Tracking Disabled", {
        description: "Your visits will no longer be recorded on this browser.",
      });
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <LegalLayout title="Analytics Opt-Out" lastUpdated="February 23, 2026">
      <section className="animate-fade-slide-up">
        <p className="text-muted-foreground font-inter text-lg leading-relaxed mb-10">
          As a user or administrator, you can disable tracking for this specific
          browser session. This helps us ensure that testing activities or
          internal visits don't skew our analytics data.
        </p>

        <div className="relative group p-0.5 rounded-[2rem] bg-gradient-to-b from-border/50 to-transparent mb-12">
          <div className="bg-card border border-border/10 rounded-[1.95rem] p-8 md:p-12 overflow-hidden relative">
            {/* Background Accent */}
            <div
              className={cn(
                "absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 transition-colors duration-500",
                isOptedOut ? "bg-red-500" : "bg-primary",
              )}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  {isOptedOut ? (
                    <XCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  )}
                  <h3 className="text-2xl font-poppins font-bold text-foreground">
                    Current Status:{" "}
                    <span
                      className={isOptedOut ? "text-red-500" : "text-primary"}
                    >
                      {isOptedOut ? "Opted Out" : "Tracking Active"}
                    </span>
                  </h3>
                </div>
                <p className="text-muted-foreground font-inter text-base">
                  {isOptedOut
                    ? "Your visits on this browser are currently hidden from our analytics. No usage data is being recorded."
                    : "Standard analytics tracking is enabled. We use this to improve the platform based on usage patterns."}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button
                  onClick={handleToggle}
                  variant={isOptedOut ? "outline" : "default"}
                  size="lg"
                  className={cn(
                    "w-full md:w-auto h-14 px-8 rounded-xl font-bold font-inter text-sm transition-all hover:scale-105 active:scale-95 shadow-tx-lg",
                    !isOptedOut &&
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                  )}
                >
                  {isOptedOut ? "Enable Tracking" : "Disable Tracking"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-muted/30 border border-border/50 rounded-2xl p-6 md:p-8">
          <h4 className="font-poppins font-bold text-foreground mb-3">
            Important Notes
          </h4>
          <ul className="space-y-3 font-inter text-muted-foreground text-sm list-none p-0">
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>
                This setting is saved in your browser's{" "}
                <strong>Local Storage</strong> and is specific to this device
                and browser.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>
                Clearing your browser cache or using Incognito mode will reset
                this choice.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>
                The platform will reload once to properly disconnect or
                reconnect the analytics script.
              </span>
            </li>
          </ul>
        </section>
      </section>
    </LegalLayout>
  );
}
