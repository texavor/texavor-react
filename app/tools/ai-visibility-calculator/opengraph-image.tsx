import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { BarChart3 } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "AI Visibility Calculator - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "AI Visibility Calculator",
    description: "Free Score & Action Plan",
    icon: <BarChart3 size={64} color="#4ade80" />,
  });
}
