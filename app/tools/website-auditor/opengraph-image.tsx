import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { CheckCircle2 } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Website Auditor - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Website Auditor",
    description: "Technical Audit for AI Crawlers",
    icon: <CheckCircle2 size={64} color="#4ade80" />,
  });
}
