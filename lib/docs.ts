"use strict";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content/docs");

export interface DocData {
  slug: string;
  title: string;
  date: string;
  content: string;
  category?: string;
  order?: number;
  [key: string]: any;
}

export interface DocCategory {
  name: string;
  slug: string;
  order: number;
  items: DocData[];
}

// Define the documentation structure with categories
export const docsStructure: DocCategory[] = [
  {
    name: "Getting Started",
    slug: "getting-started",
    order: 1,
    items: [],
  },
  {
    name: "Research Tools",
    slug: "research-tools",
    order: 2,
    items: [],
  },
  {
    name: "Creation Suite",
    slug: "creation-suite",
    order: 3,
    items: [],
  },
  {
    name: "Intelligence Engine",
    slug: "intelligence-engine",
    order: 4,
    items: [],
  },
  {
    name: "Integration Platforms",
    slug: "platforms",
    order: 5,
    items: [],
  },
];

export function getAllDocs(): DocData[] {
  // Check if directory exists
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      } as DocData;
    })
    .sort((a, b) => {
      // Sort by order if specified, otherwise by title
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return (a.title || "").localeCompare(b.title || "");
    });

  return allDocsData;
}

export function getDocData(slug: string): DocData | null {
  const fullPath = path.join(docsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
  } as DocData;
}

export function getDocsByCategory(): DocCategory[] {
  const allDocs = getAllDocs();
  const categorizedDocs = JSON.parse(
    JSON.stringify(docsStructure)
  ) as DocCategory[];

  // Organize docs into categories
  allDocs.forEach((doc) => {
    const category = categorizedDocs.find((cat) => cat.slug === doc.category);
    if (category) {
      category.items.push(doc);
    } else {
      // If no category specified or category not found, add to "Getting Started"
      const defaultCategory = categorizedDocs.find(
        (cat) => cat.slug === "getting-started"
      );
      if (defaultCategory) {
        defaultCategory.items.push(doc);
      }
    }
  });

  // Filter out empty categories
  return categorizedDocs.filter((cat) => cat.items.length > 0);
}

export function getFirstDoc(): DocData | null {
  const categories = getDocsByCategory();
  if (categories.length > 0 && categories[0].items.length > 0) {
    return categories[0].items[0];
  }
  return null;
}
