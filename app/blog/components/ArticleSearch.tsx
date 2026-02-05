"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ArticleSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  uniqueTags: string[];
}

export default function ArticleSearch({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  uniqueTags,
}: ArticleSearchProps) {
  return (
    <div className="w-full max-w-4xl mx-auto -mt-12 relative z-20 px-4 mb-16">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 dark:border-white/10 p-6 md:p-8 space-y-6 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60">
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search for articles, guides, or tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 h-12 bg-gray-50/50 dark:bg-zinc-800/50 border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-zinc-800 transition-all font-inter text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <button
            onClick={() => setSelectedTag("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-inter ${
              selectedTag === "All"
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All Posts
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-inter ${
                selectedTag === tag
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
