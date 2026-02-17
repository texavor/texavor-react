import { generateOgImage, size, contentType } from "@/lib/og-generator";
import { MessageSquareText } from "lucide-react";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Featured Snippet Optimizer - Texavor";

export default async function Image() {
  return generateOgImage({
    title: "Featured Snippet Optimizer",
    description:
      "Rank for Position Zero. Optimize structure for direct answers and AI snippets.",
    icon: <MessageSquareText size={64} color="#4ade80" />,
  });
}
