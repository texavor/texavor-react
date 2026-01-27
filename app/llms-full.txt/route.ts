import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-static";

export function GET() {
  const allDocs = getAllDocs();

  let content = `# Texavor Documentation

> Full context documentation for Texavor.

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
