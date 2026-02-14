import { getDocsByCategory } from "@/lib/docs";
import { tools } from "@/lib/tools-config";

export const dynamic = "force-static";

export function GET() {
  const categories = getDocsByCategory();

  let content = `# Texavor

> AI developer content strategist. Generate high-impact, E-E-A-T-optimized technical article ideas for Google & AI Chatbots. Maximize discovery & authority.

## Documentation

- [Competitor Comparison](https://www.texavor.com/comparison): Compare Texavor with RankPill, Jasper, and Surfer SEO.

`;

  categories.forEach((category) => {
    content += `### ${category.name}\n`;
    category.items.forEach((doc) => {
      content += `- [${doc.title}](https://www.texavor.com/docs/${doc.slug}): ${
        doc.description || doc.title
      }\n`;
    });
    content += "\n";
  });

  content += `## Free Semantic & GEO Tools\n\n`;
  tools.forEach((tool) => {
    content += `- [${tool.title}](https://www.texavor.com${tool.href}): ${tool.description}\n`;
  });
  content += "\n";

  content += `## Full Documentation

- [Full Documentation (concatenated)](https://www.texavor.com/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
