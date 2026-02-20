"use client";

import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import BlogHero from "./components/BlogHero";
import ArticleSearch from "./components/ArticleSearch";
import NewsletterSignup from "./components/NewsletterSignup";

interface Article {
  slug: string;
  title: string;
  description: string;
  created_at: string;
  tags: string[];
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

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    initialArticles.forEach((article) => {
      article.tags?.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || article.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [initialArticles, searchQuery, selectedTag]);

  const featuredArticle = filteredArticles[0];
  const restArticles = filteredArticles.slice(1);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background mt-6 lg:mt-0">
        <BlogHero articleCount={initialArticles.length} />

        <div className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
          {filteredArticles.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative w-64 h-64 opacity-40">
                <Image
                  src="/empty-state.png"
                  alt="No articles found"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xl text-muted-foreground font-inter font-medium">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Featured Article — full-width horizontal card */}
              {featuredArticle && (
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="group block"
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300 shadow-tx-sm grid md:grid-cols-2">
                    {/* Image */}
                    <div className="relative aspect-[16/9] md:aspect-auto w-full overflow-hidden bg-muted min-h-[260px]">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex flex-wrap gap-1.5">
                          {featuredArticle.tags?.slice(0, 2).map((item) => (
                            <span
                              key={item}
                              className="bg-accent/15 text-accent text-[11px] font-medium px-2.5 py-0.5 rounded-sm font-mono border border-accent/30 uppercase tracking-wide"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-inter">
                          {format(
                            new Date(featuredArticle.created_at || new Date()),
                            "MMM dd, yyyy",
                          )}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-3">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-muted-foreground font-inter leading-relaxed line-clamp-3 mb-6">
                        {featuredArticle.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-primary font-inter">
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining Articles Grid */}
              {restArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restArticles.map((article) => (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      description={article.description}
                      date={article.created_at}
                      tags={article.tags}
                      slug={article.slug}
                      image={article.image}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* <NewsletterSignup /> */}
      </div>
    </PageTransition>
  );
}
