import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Clock } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Content Freshness Checker - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Content Freshness Checker",
    description: "Detect content decay and get update recommendations",
    icon: <Clock size={64} color="#4ade80" />,
  });
}
