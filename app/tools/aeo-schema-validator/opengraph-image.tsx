import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { CheckCircle2 } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "AEO Schema Validator - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "AEO Schema Validator",
    description: "Validate Your Markup",
    icon: <CheckCircle2 size={64} color="#4ade80" />,
  });
}
