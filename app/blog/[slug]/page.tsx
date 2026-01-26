// app/articles/[slug]/page.tsx

import React from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

import Link from "next/link";
import { baseURL } from "@/lib/axiosInstance";
import { ArticleView } from "./ArticleView";
import Schema from "@/components/Schema";

import "../../dracula.css";

interface ArticleData {
  image: string;
  title: string;
  created_at: string;
  updated_at: string;
  profile_pic: string;
  content: string;
  description: string;
  relatedArticles: any;
  tags: Array<String>;
  easywrite_author: {
    username: string;
    name: string;
    profile_pic: string;
  };
  canonical_url: string;
}

// Create a server-side axios instance
const getServerAxiosInstance = () => {
  const axios = require("axios");
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

function extractDomain(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch (e) {
    // invalid URL
    return null;
  }
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "```",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

// This function now runs at BUILD TIME for each slug
async function getArticleData(slug: string): Promise<ArticleData | null> {
  try {
    const axiosInstance = getServerAxiosInstance();
    const response = await axiosInstance.get(
      `${baseURL}/easywrite_articles/${slug}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching article: ${slug}`, error);
    return null;
  }
}

// -------------------------------------------------------------------
// NEW: Function to fetch all slugs for SSG
// -------------------------------------------------------------------
async function getAllArticlesForStaticGen(): Promise<{ slug: string }[] | []> {
  try {
    const axiosInstance = getServerAxiosInstance();
    const response = await axiosInstance.get(`${baseURL}/easywrite_articles`);
    return response.data; // e.g., [{ slug: "my-first-post" }, { slug: "another-post" }]
  } catch (error) {
    console.error("Error fetching article list for static generation:", error);
    return [];
  }
}

// -------------------------------------------------------------------
// NEW: The core of SSG for dynamic routes
// -------------------------------------------------------------------
export async function generateStaticParams() {
  const articles = await getAllArticlesForStaticGen();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// This function also runs at BUILD TIME for each slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const articleData = await getArticleData(params.slug);
  return {
    title: articleData?.title || "Article Not Found",
    description: articleData?.description || "Read this interesting article",
    openGraph: {
      title: articleData?.title || "Article Not Found",
      description: articleData?.description || "Read this interesting article",
      images: articleData?.image ? [{ url: articleData.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: articleData?.title || "Article Not Found",
      description: articleData?.description || "Read this interesting article",
      images: articleData?.image ? [articleData.image] : [],
    },
    ...(articleData?.canonical_url &&
      extractDomain(articleData?.canonical_url) !== "texavor.com" && {
        alternates: {
          canonical: articleData.canonical_url,
        },
      }),
  };
}

// This component now runs at BUILD TIME for each slug
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articleData = await getArticleData(params.slug);
  // This check is still useful for handling build errors for a specific page
  if (!articleData) {
    // You could return a notFound() call here as well
    // import { notFound } from 'next/navigation';
    // notFound();
    return (
      <>
        <div className="container mx-auto flex justify-center lg:w-[1200px] md:w-8/12 w-11/12 mt-10 lg:mt-32">
          <img src="/empty-state.png" className="md:size-[500px]" />
        </div>
        <div className="container mx-auto flex justify-center lg:w-[1200px] md:w-8/12 w-11/12 mt-10 lg:mt-28">
          <Link href="/" className="flex items-center gap-2">
            <p className="font-arcade text-[32px] -mt-[200px] flex hover:underline">
              Go to HomePage
            </p>
          </Link>
        </div>
      </>
    );
  }

  const parsedHtml = marked.parse(articleData?.content || "") as string;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleData.title,
    description: articleData.description,
    image: articleData.image
      ? [articleData.image]
      : ["https://www.texavor.com/default-blog.jpg"],
    datePublished: articleData.created_at,
    dateModified: articleData.updated_at,
    author: {
      "@type": "Person",
      name: articleData.easywrite_author?.name || "Texavor Team",
      url: `https://www.texavor.com/author/${articleData.easywrite_author?.username}`,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.texavor.com/#organization",
      name: "Texavor",
      logo: {
        "@type": "ImageObject",
        url: "https://www.texavor.com/logo.png",
      },
    },
    url: `https://www.texavor.com/blog/${params.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.texavor.com/blog/${params.slug}`,
    },
  };

  return (
    <>
      <div className="hidden">
        <Schema script={schema} />
      </div>
      <ArticleView articleData={articleData} html={parsedHtml} />
    </>
  );
}
