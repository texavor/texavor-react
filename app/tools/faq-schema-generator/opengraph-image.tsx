import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { MessageSquare } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "FAQ Schema Generator - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "FAQ Schema Generator",
    description: "JSON-LD for AI Answers",
    icon: <MessageSquare size={64} color="#4ade80" />,
  });
}
