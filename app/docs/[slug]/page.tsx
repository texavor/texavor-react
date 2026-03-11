import React from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import Link from "next/link";
import { DocsView, type Heading } from "./DocsView";
import { getAllDocs, getDocData, getDocsByCategory, DocData } from "@/lib/docs";
import Schema from "@/components/Schema";
import "../../dracula.css";
import "../../blog/[slug]/blog.css";

const markdownParser = new Marked();
markdownParser.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = {
  link(token: { href: string; title?: string | null; text: string }) {
    const { href, title, text } = token;
    // Use the initialized markdownParser instance to parse nested inline content
    const parsedText = markdownParser.parseInline(text) as string;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const targetAttr = isInternal ? "" : 'target="_blank" rel="noopener noreferrer"';
    const titleAttr = title ? `title="${title}"` : "";

    return `<a href="${href}" ${titleAttr} ${targetAttr} class="text-primary hover:underline font-medium transition-colors duration-200">${parsedText}</a>`;
  },
  code(token: { text: string; lang?: string }) {
    const { text, lang } = token;
    let highlighted;
    let language;

    if (lang && hljs.getLanguage(lang)) {
      language = lang;
      highlighted = hljs.highlight(text, { language }).value;
    } else {
      const result = hljs.highlightAuto(text);
      language = result.language || "plaintext";
      highlighted = result.value;
    }

    return `
      <div class="code-block-container" style="position: relative; margin-top: 1.5rem; margin-bottom: 1.5rem;">
        <button class="copy-button absolute top-3 right-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded bg-slate-200 text-slate-900 hover:bg-slate-300 transition-all duration-200">
          COPY
        </button>
        <pre><code class="hljs language-${language}">${highlighted}</code></pre>
      </div>
    `;
  },
};

markdownParser.use({ renderer });

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
      description: docData?.description || "Optimize for AI Search (GEO)",
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

  const rawHtml = markdownParser.parse(docData.content || "") as string;
  // Shift heading levels: h1 -> h2, h2 -> h3, etc. for better semantic structure in the app
  const parsedHtml = rawHtml
    .replace(/<h([1-5])/g, (m, c) => `<h${parseInt(c) + 1}`)
    .replace(/<\/h([1-5])>/g, (m, c) => `</h${parseInt(c) + 1}>`);
  
  const categorizedDocs = getDocsByCategory();

  const extractHeadings = (markdown: string): Heading[] => {
    const headings: Heading[] = [];
    const stack: Heading[] = [];

    // Match #, ##, ### (h1, h2, h3)
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length + 1; // +1 to match the HTML shift (h1->h2, etc)
      const text = match[2].trim().replace(/\*\*/g, ""); 
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      const newHeading: Heading = { id, level, text };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        if (!parent.children) parent.children = [];
        parent.children.push(newHeading);
      } else {
        headings.push(newHeading);
      }

      stack.push(newHeading);
    }

    return headings;
  };

  const splitHtmlByH2 = (html: string) => {
    // Regex matches <h2> tags and keeps them as part of the split result
    const sections = html.split(/(?=<h2)/i);
    return sections;
  };

  const headings = extractHeadings(docData.content || "");
  const htmlSections = splitHtmlByH2(parsedHtml);

  // Detect if this is a How-To guide
  const isHowTo =
    docData.title?.toLowerCase().includes("how to") ||
    docData.title?.toLowerCase().includes("guide") ||
    docData.title?.toLowerCase().includes("quick start") ||
    docData?.category === "getting-started" ||
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
          name: docData?.title || "Texavor Documentation",
          description: docData?.description || "Texavor Documentation",
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
          headline: docData?.title || "Texavor Documentation",
          description: docData?.description || "Texavor Documentation",
          image: ["https://www.texavor.com/texavor.png"],
          datePublished: docData?.date
            ? new Date(docData.date).toISOString()
            : new Date().toISOString(),
          dateModified: docData?.date
            ? new Date(docData.date).toISOString()
            : new Date().toISOString(),
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
    <div className="min-h-screen bg-background font-sans">
      <Schema script={schema} />

      <DocsView 
        docData={docData} 
        htmlSections={htmlSections} 
        headings={headings}
        allDocs={categorizedDocs} 
      />
    </div>
  );
}
