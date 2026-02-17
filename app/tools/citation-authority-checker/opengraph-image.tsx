import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { FileCode } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Citation Authority Checker - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Citation Authority Checker",
    description: "Audit .edu/.gov Links & Boost E-E-A-T",
    icon: <FileCode size={64} color="#4ade80" />,
  });
}
