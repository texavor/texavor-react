"use client";

import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Image from "next/image";
import ArticleCard from "./ArticleCard";
import BlogHero from "./components/BlogHero";
import ArticleSearch from "./components/ArticleSearch";
import NewsletterSignup from "./components/NewsletterSignup";

interface Article {
  slug: string;
  title: string;
  description: string;
  created_at: string;
  tag: string[];
  image: string;
}

interface BlogClientWrapperProps {
  initialArticles: Article[];
}

export default function BlogClientWrapper({
  initialArticles,
}: BlogClientWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Derive unique tags from articles
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    initialArticles.forEach((article) => {
      article.tag?.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [initialArticles]);

  // Filter articles based on search query and selected tag
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || article.tag?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [initialArticles, searchQuery, selectedTag]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background mt-6 lg:mt-0">
        {/* Hero Section */}
        <BlogHero />
        {/* Article Grid */}
        <div className="container mx-auto px-4 md:px-6 pb-20 max-w-7xl">
          {filteredArticles.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center space-y-6">
              <div className="relative w-64 h-64 opacity-50">
                <Image
                  src="/empty-state.png"
                  alt="No articles found"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xl text-gray-500 font-inter font-medium">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  date={article.created_at}
                  tag={article.tag}
                  slug={article.slug}
                  image={article.image}
                />
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        {/* <NewsletterSignup /> */}
      </div>
    </PageTransition>
  );
}
