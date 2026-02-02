import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Search } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Free AEO Tools - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Free AEO Tools",
    description: "AI Visibility, Audits & Schema",
    icon: <Search size={64} color="#4ade80" />, // green-400
  });
}
