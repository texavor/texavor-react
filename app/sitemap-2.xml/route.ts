export const dynamic = "force-static";

export function GET() {
  const baseUrl = "https://www.texavor.com";
  const lastMod = new Date().toISOString();

  const urls = [
    { url: baseUrl, priority: "1.0", changefreq: "daily" },
    { url: `${baseUrl}/blog`, priority: "0.8", changefreq: "daily" },
    { url: `${baseUrl}/tools`, priority: "0.9", changefreq: "weekly" },
    {
      url: `${baseUrl}/docs/introduction`,
      priority: "0.7",
      changefreq: "monthly",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
