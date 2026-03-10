"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Download, CheckCircle2 } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const success = await onSubmit(email);
    if (!success) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none bg-card shadow-2xl">
        <div className="relative h-2 bg-primary w-full" />
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-poppins text-center font-bold">
              Download Your Report
            </DialogTitle>
            <DialogDescription className="text-center font-inter text-muted-foreground mt-2">
              Enter your email to receive this analysis and stay updated with
              the latest SEO & GEO optimization tips.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 bg-background border-input focus:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <p className="text-xs text-destructive font-medium">{error}</p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full h-11 font-semibold text-base rounded-md"
                variant="brand"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Get My Report
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 justify-center">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>No credit card required</span>
                  <span className="opacity-30">•</span>
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
