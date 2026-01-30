// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

import { getAllDocs } from "@/lib/docs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://www.texavor.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.texavor.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.texavor.com/tools/ai-visibility-calculator",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/website-auditor",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/brand-authority",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/content-audit",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/faq-schema-generator",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/topical-authority",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/tools/aeo-schema-validator",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.texavor.com/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.texavor.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.texavor.com/refund-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.texavor.com/cookies",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const posts = await getAllPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `https://www.texavor.com/blog/${post?.slug}`,
    lastModified: new Date(post?.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const docs = getAllDocs();
  const docPages: MetadataRoute.Sitemap = docs.map((doc: any) => ({
    url: `https://www.texavor.com/docs/${doc?.slug}`,
    lastModified: new Date(), // Ideally this would come from git commit time or similar if available
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...docPages];
}
