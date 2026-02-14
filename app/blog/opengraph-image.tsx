import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { FileText } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Texavor Blog - GEO Insights";

export default async function Image() {
  return generateOgImage({
    title: "Texavor Blog",
    description: "GEO Insights & Guides",
    icon: <FileText size={64} color="#4ade80" />,
  });
}
