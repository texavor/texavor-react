import ToolsClient from "./ToolsClient";
import { Suspense } from "react";

export const metadata = {
  title: "Free GEO & SEO Tools | Texavor",
  description:
    "Professional-grade free SEO and GEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
  openGraph: {
    title: "Free GEO & SEO Tools | Texavor",
    description:
      "Professional-grade free SEO and GEO tools including Domain Authority Checker, AI Visibility Calculator, Website Auditor, FAQ Schema Generator, and more.",
  },
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen animate-pulse bg-primary/5" />}
    >
      <ToolsClient />
    </Suspense>
  );
}
