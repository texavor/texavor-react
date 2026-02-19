import React from "react";
import { baseURL } from "@/lib/axiosInstance";
import BlogClientWrapper from "./BlogClientWrapper";
import { Metadata } from "next";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Texavor Blog | Insights on GEO & AI Content Strategy",
  description:
    "Explore expert insights and guides on AI content creation, Generative Engine Optimization (GEO), and advanced SEO strategies tailored for the new AI search era.",
  alternates: {
    canonical: "/blog",
  },
};

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
    url: "https://www.texavor.com/blog",
    name: "Texavor Blog",
    description:
      "Insights and guides on AI content creation, Generative Engine Optimization (GEO), and SEO strategies for the AI era.",
    author: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    publisher: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.texavor.com",
      url: "https://www.texavor.com",
      name: "Texavor",
    },
    blogPost: articles.map((article: any) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://www.texavor.com/blog/${article.slug}`,
      datePublished: article.created_at,
      dateModified: article.updated_at,
      image: article.image
        ? [article.image]
        : ["https://www.texavor.com/texavor.png"],
      author: {
        "@type": "Person",
        name: "Suraj Vishwakarma",
        url: "https://www.texavor.com",
      },
    })),
  };

  return (
    <>
      <Schema script={schema} />
      <BlogClientWrapper initialArticles={articles} />
    </>
  );
}
