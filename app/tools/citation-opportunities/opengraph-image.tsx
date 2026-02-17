import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { FileText } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Citation Opportunities Finder - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Citation Opportunities Finder",
    description: "Find uncited claims and improve your E-E-A-T instantly",
    icon: <FileText size={64} color="#4ade80" />,
  });
}
