import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Code2 } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt =
  "Schema Markup Validator - Validate JSON-LD & Get AEO Insights";

export default async function Image() {
  return generateOgImage({
    title: "Schema Markup Validator",
    description: "Validate JSON-LD & Get GEO Insights",
    icon: <Code2 size={64} color="#4ade80" />,
  });
}
