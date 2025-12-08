"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { ArticleContent } from "../../blog/[slug]/ArticleContent";
import Link from "next/link";
import { TableOfContents } from "../../blog/[slug]/TableOfContents";
import { DocData, DocCategory } from "@/lib/docs";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import "../../dracula.css";

// Interfaces
interface Heading {
  id: string;
  level: number;
  text: string;
  children?: Heading[];
}

interface DocsViewProps {
  docData: DocData;
  html: string;
  allDocs: DocCategory[];
}

export function DocsView({ docData, html, allDocs }: DocsViewProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isTocLoaded, setIsTocLoaded] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (docHeight > 0) {
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrolled);
    } else {
      setScrollPercentage(0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const toggleCategory = (categorySlug: string) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categorySlug)) {
        newSet.delete(categorySlug);
      } else {
        newSet.add(categorySlug);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 mt- left-0 w-full h-1 z-100 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-[#0F3D2E] via-[#25A66A] to-[#A8F0C4] transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${scrollPercentage / 100})`,
            transformOrigin: "left",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-0 lg:max-w-7xl mt-30">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 bg-[#0F3D2E] text-white rounded-xl"
          >
            <span className="font-semibold flex items-center gap-2">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
              Menu
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isMobileMenuOpen && (
            <div className="mt-2 p-4 bg-[#0F3D2E] text-white rounded-xl shadow-xl max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="flex flex-col gap-3">
                {allDocs.map((category) => (
                  <div key={category.slug}>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      {category.name}
                    </div>
                    <div className="flex flex-col gap-1">
                      {category.items.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/docs/${doc.slug}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            doc.slug === docData.slug
                              ? "bg-[#25A66A] text-white font-medium"
                              : "text-gray-300 hover:bg-[#1a5442] hover:text-white"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {doc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Left Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar bg-[#0F3D2E] rounded-xl p-4">
              <nav className="flex flex-col gap-2">
                {allDocs.map((category) => {
                  const isCollapsed = collapsedCategories.has(category.slug);
                  const hasActiveDoc = category.items.some(
                    (doc) => doc.slug === docData.slug
                  );

                  return (
                    <div key={category.slug} className="mb-2">
                      <button
                        onClick={() => toggleCategory(category.slug)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-[#A8F0C4] transition-colors rounded-lg hover:bg-[#1a5442]"
                      >
                        <span>{category.name}</span>
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      {!isCollapsed && (
                        <div className="flex flex-col gap-0.5 mt-1">
                          {category.items.map((doc) => (
                            <Link
                              key={doc.slug}
                              href={`/docs/${doc.slug}`}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                doc.slug === docData.slug
                                  ? "bg-[#25A66A] text-white font-medium"
                                  : "text-gray-300 hover:bg-[#1a5442] hover:text-white"
                              }`}
                            >
                              {doc.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article>
              <header className="mb-8">
                <h1 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {docData.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
                  <span>
                    Last Updated:{" "}
                    {docData.date
                      ? format(new Date(docData.date), "MMM dd, yyyy")
                      : "Recently"}
                  </span>
                </div>
              </header>

              <div ref={articleContentRef}>
                <ArticleContent
                  html={html}
                  relatedArticles={[]}
                  setHeadings={setHeadings}
                  setIsTocLoaded={setIsTocLoaded}
                />
              </div>
            </article>
          </main>

          {/* Right Sidebar - TOC */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {headings.length > 0 && (
                <div className="mb-8">
                  <TableOfContents headings={headings} />
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">
                  Need Help?
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Can't find what you're looking for?
                </p>
                <Link
                  href="mailto:support@easywrite.com"
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(37, 166, 106, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(37, 166, 106, 0.5);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
