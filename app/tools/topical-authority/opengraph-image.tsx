import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { Activity } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Topical Authority - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Topical Authority",
    description: "Map Generator",
    icon: <Activity size={64} color="#4ade80" />,
  });
}
