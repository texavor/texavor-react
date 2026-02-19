"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OptOutPage() {
  const [isOptedOut, setIsOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if localStorage has "umami.disabled"
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
      // Optionally reload to apply
      window.location.reload();
    } else {
      localStorage.setItem("umami.disabled", "1");
      setIsOptedOut(true);
      toast.success("Tracking Disabled", {
        description: "Your visits will no longer be recorded on this browser.",
      });
      // Optionally reload to apply
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold font-poppins">Analytics Opt-Out</h1>
        <p className="text-muted-foreground font-inter">
          As an admin/owner, you can disable tracking for this browser to avoid
          skewing your analytics data.
        </p>

        <div className="p-6 border rounded-xl bg-card shadow-sm space-y-4 mt-8">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-sm">Current Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isOptedOut
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {isOptedOut
                ? "Tracking Disabled (Hidden)"
                : "Tracking Enabled (Visible)"}
            </span>
          </div>

          <Button
            onClick={handleToggle}
            variant={isOptedOut ? "outline" : "default"}
            className="w-full"
          >
            {isOptedOut ? "Enable Tracking" : "Disable Tracking"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Note: This setting is saved in your browser's Local Storage. If you
          clear your cache or use a different browser/device, you will need to
          set this again.
        </p>
      </div>
    </div>
  );
}
