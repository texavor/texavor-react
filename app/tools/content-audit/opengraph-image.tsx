import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { FileText } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Content Audit - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Content Audit",
    description: "Audit Content for AI",
    icon: <FileText size={64} color="#4ade80" />,
  });
}
