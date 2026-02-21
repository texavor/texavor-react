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

const EMPTY_ARTICLES: any[] = [];

export function DocsView({ docData, html, allDocs }: DocsViewProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isTocLoaded, setIsTocLoaded] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = React.useMemo(() => {
    if (!searchTerm.trim()) return allDocs;

    const term = searchTerm.toLowerCase();
    return allDocs
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.title.toLowerCase().includes(term),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [allDocs, searchTerm]);

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

  // Scroll active nav item into view within sidebar
  useEffect(() => {
    const activeItem = document.getElementById("active-docs-nav-item");
    const sidebar = sidebarRef.current;

    if (activeItem && sidebar) {
      // Use block: 'center' to ensure the active item is positioned prominently
      // behavior: 'smooth' for professional, non-jarring transitions
      activeItem.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [docData?.slug]);

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
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-muted/30">
        <div
          className="h-full bg-primary transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${scrollPercentage / 100})`,
            transformOrigin: "left",
          }}
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row min-h-screen pt-16">
        {/* Mobile Menu Button - Fixed under header */}
        <div className="lg:hidden p-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-16 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-lg"
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
            <div className="mt-2 p-4 bg-card border border-border text-foreground rounded-lg shadow-tx-md max-h-[70vh] overflow-y-auto no-scrollbar">
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-muted-foreground/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 border border-border rounded-md bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-inter"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {filteredDocs.map((category) => (
                  <div key={category.slug}>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 font-inter">
                      {category.name}
                    </div>
                    <div className="flex flex-col gap-1">
                      {category.items.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/docs/${doc.slug}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors font-inter ${
                            doc.slug === docData.slug
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {doc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredDocs.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground text-sm font-inter">
                    No documentation found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Left Sidebar - Desktop (Pinned to extreme left, under header) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-border/50 bg-background/50 backdrop-blur-md">
          <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar z-30 p-6 py-10">
            <div ref={sidebarRef}>
              <nav className="flex flex-col gap-2">
                {/* Search Bar */}
                <div className="px-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 text-muted-foreground/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Documentation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2 border border-border rounded-md bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-inter"
                    />
                  </div>
                </div>

                {filteredDocs.map((category) => {
                  const isCollapsed =
                    collapsedCategories.has(category.slug) && !searchTerm;
                  const hasActiveDoc = category.items.some(
                    (doc) => doc.slug === docData.slug,
                  );

                  return (
                    <div key={category.slug} className="mb-2">
                      <button
                        onClick={() => toggleCategory(category.slug)}
                        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-foreground/80 uppercase tracking-[0.1em] hover:text-primary transition-colors rounded-md hover:bg-muted font-inter"
                      >
                        <span>{category.name}</span>
                        {isCollapsed ? (
                          <ChevronRight className="w-3 h-3 opacity-90" />
                        ) : (
                          <ChevronDown className="w-3 h-3 opacity-90" />
                        )}
                      </button>
                      {!isCollapsed && (
                        <div className="flex flex-col gap-0.5 mt-1">
                          {category.items.map((doc) => (
                            <Link
                              key={doc.slug}
                              id={
                                doc?.slug === docData?.slug
                                  ? "active-docs-nav-item"
                                  : undefined
                              }
                              href={`/docs/${doc.slug}`}
                              className={`block px-4 py-2.5 text-sm transition-all duration-200 font-inter relative group border-l-2 ${
                                doc?.slug === docData?.slug
                                  ? "bg-primary/[0.04] text-primary font-bold border-primary"
                                  : "text-muted-foreground/90 font-medium hover:bg-muted/30 hover:text-foreground border-transparent"
                              }`}
                            >
                              <span>{doc.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredDocs.length === 0 && (
                  <div className="py-10 text-center px-4">
                    <p className="text-xs text-muted-foreground font-inter">
                      No results for "{searchTerm}"
                    </p>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content (Centered column) */}
        <main className="flex-1 min-w-0 bg-background flex flex-col">
          <div className="flex-1 max-w-3xl mx-auto px-8 md:px-16 py-16 w-full">
            <article>
              {/* Hero Section Integrated into Column */}
              <div className="mb-12 animate-fade-slide-up">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 font-inter mb-6">
                  <Link
                    href="/docs"
                    className="hover:text-primary transition-colors"
                  >
                    DOCS
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-muted-foreground/40">
                    {docData.category?.replace(/-/g, " ").toUpperCase()}
                  </span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary/80">
                    {docData?.title?.toUpperCase() || "DOCUMENTATION"}
                  </span>
                </div>

                <h1 className="font-poppins text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                  {docData?.title || "Untitled Document"}
                </h1>
                <p className="font-inter text-base text-muted-foreground max-w-2xl leading-relaxed mb-8">
                  {docData?.description ||
                    "No description available for this document."}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border/50">
                  <span>
                    Last Updated:{" "}
                    {docData?.date
                      ? format(new Date(docData.date), "MMM dd, yyyy")
                      : "Recently"}
                  </span>
                </div>
              </div>

              <div ref={articleContentRef} className="min-h-[400px]">
                {/* @ts-ignore */}
                <ArticleContent
                  html={html}
                  relatedArticles={EMPTY_ARTICLES}
                  setHeadings={setHeadings}
                  setIsTocLoaded={setIsTocLoaded}
                />
              </div>
            </article>
          </div>

          {/* Next / Previous Navigation - Full Width Area to merge with sidebars */}
          <div className="mt-auto border-t border-border/30 w-full bg-background/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-8 md:px-16 py-12">
              <div className="flex flex-col sm:flex-row gap-6 justify-between">
                {(() => {
                  const flattened = allDocs.flatMap((c) => c.items);
                  const currentIndex = flattened.findIndex(
                    (d) => d.slug === docData?.slug,
                  );
                  const prev =
                    currentIndex > 0 ? flattened[currentIndex - 1] : null;
                  const next =
                    currentIndex < flattened.length - 1
                      ? flattened[currentIndex + 1]
                      : null;

                  return (
                    <>
                      {prev ? (
                        <Link
                          href={`/docs/${prev.slug}`}
                          className="flex-1 p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all group shadow-none hover:shadow-tx-md"
                        >
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                            Previous
                          </p>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {prev.title}
                          </p>
                        </Link>
                      ) : (
                        <div className="flex-1" />
                      )}

                      {next ? (
                        <Link
                          href={`/docs/${next.slug}`}
                          className="flex-1 p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all group text-right shadow-none hover:shadow-tx-md"
                        >
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                            Next
                          </p>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {next.title}
                          </p>
                        </Link>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Desktop (Pinned to extreme right, under header) */}
        <aside className="hidden xl:block w-72 flex-shrink-0 border-l border-border/50 bg-background/50 backdrop-blur-md">
          <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar z-30 p-6 py-10">
            {headings.length > 0 && (
              <div className="mb-10">
                <TableOfContents headings={headings} />
              </div>
            )}

            <div className="bg-muted/30 p-5 rounded-lg border border-border/50 shadow-none">
              <h4 className="font-semibold text-foreground text-sm mb-2 font-poppins">
                Technical Support
              </h4>
              <p className="text-xs text-muted-foreground mb-4 font-inter leading-relaxed">
                Need assistance with GEO implementation or citation analysis?
              </p>
              <Link
                href="mailto:hello@texavor.com"
                className="inline-flex items-center text-xs text-primary hover:underline font-semibold font-inter gap-1"
              >
                Contact Docs Team <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
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

        /* Table Responsiveness */
        article table {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-collapse: collapse;
          margin-bottom: 2rem;
        }

        article table::-webkit-scrollbar {
          height: 6px;
        }
        article table::-webkit-scrollbar-track {
          background: transparent;
        }
        article table::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb, 37, 166, 106), 0.2);
          border-radius: 3px;
        }
      `}</style>
    </>
  );
}
