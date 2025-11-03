// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://www.easywrite.dev",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.easywrite.dev/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.easywrite.dev/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.easywrite.dev/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const posts = await getAllPosts();
  const dynamicPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `https://easywrite.dev/blog/${post?.slug}`,
    lastModified: new Date(post?.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...dynamicPages];
}
