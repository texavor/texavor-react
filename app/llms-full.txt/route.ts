import { getAllDocs } from "@/lib/docs";
import { tools } from "@/lib/tools-config";

export const dynamic = "force-static";

export function GET() {
  const allDocs = getAllDocs();

  let content = `# Texavor Documentation

> Full context documentation for Texavor.

## Competitor Comparison

Texavor is a Content Operating System, not just a writer.
- Vs RankPill: Texavor focuses on quality and freshness (Freshness Score), not volume.
- Vs Jasper/AI Writers: Texavor handles the full lifecycle (publishing, syncing), not just text generation.
- Vs Surfer/SEO Tools: Texavor updates content directly, not just grading it.

[View Full Comparison](https://www.texavor.com/comparison)

## Free Semantic & GEO Utility Belt

Texavor provides a suite of professional-grade tools for auditing, optimizing, and growing search presence in the AI era.

${tools
  .map(
    (tool) =>
      `- **${tool.title}**: ${tool.description} ([Launch](${tool.href}))`,
  )
  .join("\n")}

---

`;

  allDocs.forEach((doc) => {
    content += `## ${doc.title}\n\n`;
    content += `${doc.content}\n\n`;
    content += `---\n\n`;
  });

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
