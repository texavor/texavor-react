import { getAllPosts } from "@/lib/posts";

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://www.texavor.com";

  const feedItems = posts
    .map((post: any) => {
      const pubDate = new Date(
        post.updated_at || post.published_at || post.date
      ).toUTCString();
      const link = `${siteUrl}/blog/${post.slug}`;
      const description =
        post.content_html || post.description || post.excerpt || "";
      const categories = (post.tags || [])
        .map((tag: string) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <dc:creator>${escapeXml(post.author?.name || "Texavor Team")}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(description)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Texavor Blog</title>
    <description>Latest articles and updates from Texavor.</description>
    <link>${siteUrl}</link>
    <image>
      <url>${siteUrl}/texavor.png</url>
      <title>Texavor Blog</title>
      <link>${siteUrl}</link>
    </image>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
