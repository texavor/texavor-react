import React from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import Link from "next/link";
import { DocsView } from "./DocsView";
import { getAllDocs, getDocData, getDocsByCategory, DocData } from "@/lib/docs";
import Schema from "@/components/Schema";
import "../../dracula.css";

const marked = new Marked(
  markedHighlight({
    langPrefix: "```",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const docData = getDocData(slug);

  return {
    title: docData?.title || "Document Not Found",
    description: docData?.description || "Texavor Documentation",
    twitter: {
      card: "summary_large_image",
      title: docData?.title || "Texavor Documentation",
      description: docData?.description || "Optimize for AI Search (AEO)",
    },
    alternates: {
      canonical: `/docs/${slug}`,
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const docData = getDocData(slug);

  if (!docData) {
    return (
      <>
        <div className="container mx-auto flex justify-center lg:w-[1200px] md:w-8/12 w-11/12 mt-10 lg:mt-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl">Document not found.</p>
          </div>
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

  const rawHtml = marked.parse(docData.content || "") as string;
  // Shift heading levels: h1 -> h2, h2 -> h3, etc.
  const parsedHtml = rawHtml
    .replace(/<h([1-5])/g, (m, c) => `<h${parseInt(c) + 1}`)
    .replace(/<\/h([1-5])>/g, (m, c) => `</h${parseInt(c) + 1}>`);
  const categorizedDocs = getDocsByCategory();

  // Detect if this is a How-To guide
  const isHowTo =
    docData.title?.toLowerCase().includes("how to") ||
    docData.title?.toLowerCase().includes("guide") ||
    docData.title?.toLowerCase().includes("quick start") ||
    docData.category === "getting-started" ||
    docData.slug?.includes("guide");

  // Enhanced step extraction from markdown
  const extractSteps = (content: string) => {
    // Match ## headers that look like steps (e.g., "## Step 1:", "## 1.", "## Register Account")
    const stepRegex = /^##\s+(?:Step\s+)?(\d+[:.)]?\s*)?(.+)$/gim;
    const matches = [...content.matchAll(stepRegex)];

    return matches
      .filter((match) => {
        const text = match[2].trim().toLowerCase();
        // Filter out common non-step headers
        return (
          !text.includes("why") &&
          !text.includes("what is") &&
          !text.includes("key capabilities") &&
          !text.includes("support") &&
          !text.includes("resources")
        );
      })
      .map((match, index) => {
        const stepNumber = match[1]
          ? match[1].trim().replace(/[:.)]$/, "")
          : String(index + 1);
        const stepName = match[2].trim();

        // Try to extract description from content after this header
        const headerIndex = content.indexOf(match[0]);
        const nextHeaderIndex = content.indexOf("\n## ", headerIndex + 1);
        const sectionContent =
          nextHeaderIndex > -1
            ? content.substring(headerIndex, nextHeaderIndex)
            : content.substring(headerIndex);

        // Get first paragraph as description
        const descMatch = sectionContent.match(/\n\n([^\n]+)/);
        const description = descMatch ? descMatch[1].trim() : stepName;

        return {
          "@type": "HowToStep",
          position: parseInt(stepNumber) || index + 1,
          name: stepName,
          text: description.substring(0, 200), // Limit description length
        };
      });
  };

  const steps = isHowTo ? extractSteps(docData.content || "") : [];

  // Choose schema type based on content
  const schema =
    isHowTo && steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `https://www.texavor.com/docs/${slug}`,
          url: `https://www.texavor.com/docs/${slug}`,
          name: docData.title,
          description: docData.description,
          image: ["https://www.texavor.com/texavor.png"],
          step: steps,
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
        }
      : {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "@id": `https://www.texavor.com/docs/${slug}`,
          url: `https://www.texavor.com/docs/${slug}`,
          headline: docData.title,
          description: docData.description,
          image: ["https://www.texavor.com/texavor.png"],
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
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
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.texavor.com/docs/${slug}`,
          },
        };

  return (
    <>
      <Schema script={schema} />
      <DocsView docData={docData} html={parsedHtml} allDocs={categorizedDocs} />
    </>
  );
}
