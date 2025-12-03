"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstace";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/api/newsletter", { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    },
    onError: () => {
      // Error handled by axiosInstance global error handler
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      subscribeMutation.mutate(email);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            disabled={subscribeMutation.isPending}
          />
        </div>
        <Button
          type="submit"
          className="bg-[var(--green-primary)] hover:bg-[var(--green-hover)] text-white whitespace-nowrap"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">
        Get updates on new features and writing tips
      </p>
    </div>
  );
}
