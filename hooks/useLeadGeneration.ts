"use client";

import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";

const STORAGE_KEY = "texavor_user_email";

export type DownloadFormat = "pdf" | "json" | "toon" | "md";

export function useLeadGeneration(publicId: string | undefined) {
  const [email, setEmail] = useState<string | null>(null);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingFormat, setPendingFormat] = useState<DownloadFormat | null>(
    null,
  );

  // Load email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const submitEmail = useCallback(
    async (submittedEmail: string): Promise<boolean> => {
      if (!publicId) return false;

      setIsSubmitting(true);
      try {
        await axiosInstance.patch(`/api/v1/public/tools/${publicId}`, {
          email: submittedEmail,
        });

        localStorage.setItem(STORAGE_KEY, submittedEmail);
        setEmail(submittedEmail);
        setIsEmailSubmitted(true);
        setShowModal(false);

        // If there was a pending download, trigger it
        if (pendingFormat) {
          triggerDownload(pendingFormat);
          setPendingFormat(null);
        }

        return true;
      } catch (error: any) {
        console.error("Error submitting email:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to submit email. Please try again.",
        );
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [publicId, pendingFormat],
  );

  const triggerDownload = useCallback(
    (format: DownloadFormat) => {
      if (!publicId) return;

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.texavor.com";
      const url = `${baseUrl}/api/v1/public/tools/${publicId}/download?format=${format}`;

      // Open in new tab or use window.location.assign as per guide
      window.location.assign(url);
      toast.success(`Preparing your ${format.toUpperCase()} report...`);
    },
    [publicId],
  );

  const handleDownloadClick = useCallback(
    (format: DownloadFormat) => {
      if (email || isEmailSubmitted) {
        // If we have an email, we should still ensure the backend knows about it for THIS publicId
        // but the guide says "email_provided" in GET response handles this.
        // For now, if we have it in localStorage, we can try to auto-patch if needed,
        // or just trigger download if the tool was already initialized with it.
        triggerDownload(format);
      } else {
        setPendingFormat(format);
        setShowModal(true);
      }
    },
    [email, isEmailSubmitted, triggerDownload],
  );

  return {
    email,
    isSubmitting,
    showModal,
    setShowModal,
    submitEmail,
    handleDownloadClick,
    triggerDownload,
  };
}
