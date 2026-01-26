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

  const parsedHtml = marked.parse(docData.content || "") as string;
  const categorizedDocs = getDocsByCategory();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: docData.title,
    description: docData.description,
    image: ["https://www.texavor.com/default-docs.jpg"],
    datePublished: new Date().toISOString(), // Ideal if we had actual dates
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Texavor Team",
      url: "https://www.texavor.com",
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
    url: `https://www.texavor.com/docs/${slug}`,
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
