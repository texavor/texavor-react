import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Network } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Entity Density Analyzer - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Entity Density Analyzer",
    description: "Analyze entity salience and optimize for semantic SEO",
    icon: <Network size={64} color="#4ade80" />,
  });
}
