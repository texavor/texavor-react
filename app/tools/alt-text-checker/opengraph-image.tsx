import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Search } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Alt Text Checker - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Alt Text Checker",
    description: "Audit images for WCAG compliance and visual search SEO",
    icon: <Search size={64} color="#4ade80" />,
  });
}
