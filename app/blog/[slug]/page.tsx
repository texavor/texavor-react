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
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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
    alternates: {
      canonical: articleData?.canonical_url || `/blog/${params.slug}`,
    },
  };
}

// This component now runs at BUILD TIME for each slug
export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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

  // Extract FAQs from content (looking for Q&A patterns)
  // Extract FAQs from content (looking for Q&A patterns)
  const extractFAQs = (content: string) => {
    const faqs: Array<{ question: string; answer: string }> = [];

    // 1. Identify the FAQ section
    // Match:
    // - ## FAQ / FAQs / FAQ's
    // - ## Frequently Asked Questions (with potential typos like "Frequenty", "Quesiton")
    // - ## People also asked / People also ask
    // - Surround with markdown bold **...** option
    const faqHeaderRegex =
      /^##\s+(?:(?:\*\*|)(?:FAQs?|Freq[a-z]*\s+Asked\s+Que[a-z]*|People\s+also\s+ask(?:ed)?s?)(?:\*\*|))/im;
    const match = content.match(faqHeaderRegex);

    if (match) {
      const startIndex = match.index! + match[0].length;

      // Find the next H2 to determine the end of the FAQ section
      const remainingContent = content.substring(startIndex);
      const nextHeadingIndex = remainingContent.search(/^##\s+/m);

      const faqSectionText =
        nextHeadingIndex === -1
          ? remainingContent
          : remainingContent.substring(0, nextHeadingIndex);

      // 2. Parse questions (1. Question...)
      const questionRegex = /(?:^|\n)\s*\d+\.\s+(.*?)(?:\r?\n|$)/g;

      let qMatch;
      let lastIndex = 0;
      let lastQuestion = null;

      // Loop through matches
      while ((qMatch = questionRegex.exec(faqSectionText)) !== null) {
        if (lastQuestion) {
          const answer = faqSectionText
            .substring(lastIndex, qMatch.index)
            .trim();
          faqs.push({ question: lastQuestion, answer });
        }

        lastQuestion = qMatch[1].trim();
        lastIndex = questionRegex.lastIndex;
      }

      // Capture the last answer
      if (lastQuestion) {
        const answer = faqSectionText.substring(lastIndex).trim();
        faqs.push({ question: lastQuestion, answer });
      }
    }

    // Fallback logic for legacy patterns (if no numbered list found in FAQ section)
    if (faqs.length === 0) {
      // Pattern 1: ## Question?
      const qaPattern =
        /^##\s+(.+\?)\s*[\r\n]+[\r\n]+(.+?)(?=[\r\n]+##|[\r\n]+---|[\r\n]+[\r\n]+##|$)/gim;
      let matches = [...content.matchAll(qaPattern)];

      matches.forEach((match) => {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim().substring(0, 500), // Limit answer length
        });
      });

      // Pattern 2: **Q:** or **Question:** format
      const boldQAPattern =
        /\*\*(?:Q|Question):\*\*\s*(.+?)[\r\n]+\*\*(?:A|Answer):\*\*\s*(.+?)(?=[\r\n]+\*\*(?:Q|Question):|$)/gi;
      matches = [...content.matchAll(boldQAPattern)];

      matches.forEach((match) => {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim().substring(0, 500),
        });
      });
    }

    return faqs;
  };

  const faqs = extractFAQs(articleData?.content || "");

  // BlogPosting schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.texavor.com/blog/${params.slug}`,
    url: `https://www.texavor.com/blog/${params.slug}`,
    headline: articleData.title,
    description: articleData.description,
    image: articleData.image
      ? [articleData.image]
      : ["https://www.texavor.com/texavor.png"],
    datePublished: articleData.created_at,
    dateModified: articleData.updated_at,
    author: {
      "@type": "Person",
      name: articleData.easywrite_author?.name || "Suraj Vishwakarma",
      url: articleData.easywrite_author?.username
        ? `https://www.texavor.com/author/${articleData.easywrite_author.username}`
        : "https://www.texavor.com",
    },
    publisher: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://www.texavor.com/blog",
      name: "Texavor Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.texavor.com/blog/${params.slug}`,
    },
  };

  // FAQPage schema (only if FAQs found)
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `https://www.texavor.com/blog/${params.slug}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Schema script={blogSchema} />
      {faqSchema && <Schema script={faqSchema} />}
      <ArticleView articleData={articleData} html={parsedHtml} />
    </>
  );
}
