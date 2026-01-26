import React from "react";
import { baseURL } from "@/lib/axiosInstance";
import BlogClientWrapper from "./BlogClientWrapper";
import Schema from "@/components/Schema";

export const revalidate = 60; // Revalidate every 60 seconds

async function getArticles() {
  const axios = require("axios");
  try {
    const response = await axios.get(`${baseURL}/easywrite_articles`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function Blog() {
  const articles = await getArticles();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.texavor.com/blog",
    name: "Texavor Blog",
    description: "Insights and guides on AI content creation and optimization.",
    url: "https://www.texavor.com/blog",
    organization: {
      "@id": "https://www.texavor.com/#organization",
    },
    blogPost: articles.map((article: any) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://www.texavor.com/blog/${article.slug}`,
      datePublished: article.created_at,
      dateModified: article.updated_at,
      image: article.image
        ? [article.image]
        : ["https://www.texavor.com/default-blog.jpg"],
    })),
  };

  return (
    <>
      <Schema script={schema} />
      <BlogClientWrapper initialArticles={articles} />
    </>
  );
}
