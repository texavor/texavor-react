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


const renderer = {
  link({ href, title, text }: { href: string; title?: string | null; text: string }) {
    const isExternal = href.startsWith("http") && !href.includes("texavor.com");
    if (isExternal) {
      return `<a href="${href}" title="${title || ""}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    return `<a href="${href}" title="${title || ""}">${text}</a>`;
  },
  code({ text, lang }: { text: string; lang?: string }) {
    const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
    const highlighted = hljs.highlight(text, { language }).value;

    return `
      <div class="code-block-container" style="position: relative;">
        <button class="copy-button absolute top-2 right-2 px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-muted text-foreground hover:bg-muted/80 border border-border/50 backdrop-blur-sm transition-colors">
          Copy
        </button>
        <pre><code class="hljs language-${language}">${highlighted}</code></pre>
      </div>
    `;
  },
};

const marked = new Marked(
  markedHighlight({
    langPrefix: "```",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

marked.use({ renderer });

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

  const rawHtml = marked.parse(docData.content || "") as string;
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
