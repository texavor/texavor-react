import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { FileText } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Texavor Blog - AEO Insights";

export default async function Image() {
  return generateOgImage({
    title: "Texavor Blog",
    description: "AEO Insights & Guides",
    icon: <FileText size={64} color="#4ade80" />,
  });
}
