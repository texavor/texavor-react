import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { LayoutDashboard } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "GEO Heading Structure Checker - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "GEO Heading Structure Checker",
    description: "Free H1-H6 Validator for AI Search Optimization",
    icon: <LayoutDashboard size={64} color="#4ade80" />,
  });
}
