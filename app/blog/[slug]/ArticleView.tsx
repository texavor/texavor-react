"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { ArticleContent } from "./ArticleContent";
import Link from "next/link";
import Image from "next/image";
import { ShareButtons } from "./ShareButtons";
import { TableOfContents } from "./TableOfContents";
import { SidebarVisual } from "@/components/SidebarVisual";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit } from "lucide-react";

// Interfaces
interface Heading {
  id: string;
  level: number;
  text: string;
  children?: Heading[];
}

interface ArticleData {
  image: string;
  title: string;
  profile_pic: string;
  created_at: string;
  updated_at: string;
  description: string;
  tags: Array<String>;
  relatedArticles: any;
  easywrite_author: {
    username: string;
    name: string;
    profile_pic: string;
  };
  canonical_url: string;
}

interface ArticleViewProps {
  articleData: ArticleData;
  html: string;
}

export function ArticleView({ articleData, html }: ArticleViewProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showFloatingShare, setShowFloatingShare] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isTocLoaded, setIsTocLoaded] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);

  function extractDomain(url: string) {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, "");
    } catch (e) {
      return null;
    }
  }

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

    if (articleContentRef.current && isTocLoaded) {
      const { top, bottom } = articleContentRef.current.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 800) {
        setShowFloatingShare(true);
      } else {
        setShowFloatingShare(false);
      }
    }
  }, [isTocLoaded]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Scroll progress bar — matched with Docs behavior */}
      <div className="fixed top-0 left-0 w-full h-1 z-[200] bg-muted/30">
        <div
          className="h-full bg-primary origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollPercentage / 100})` }}
        />
      </div>

      <div className="container mx-auto lg:w-[1200px] md:w-8/12 w-11/12 mt-32">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="lg:w-[72%] xl:w-3/4">
            {/* Cover Image */}
            <div className="relative w-full max-w-4xl aspect-[1000/420] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-muted flex justify-center items-center z-0">
                <p className="font-poppins text-muted-foreground font-semibold text-center text-xl md:text-3xl px-4">
                  {articleData?.title}
                </p>
              </div>
              {articleData?.image && (
                <Image
                  src={articleData?.image}
                  alt={`Cover image for ${articleData?.title}`}
                  fill
                  className="object-cover z-10"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                />
              )}
            </div>

            {/* Title */}
            <h1 className="font-poppins mt-6 text-3xl font-bold text-foreground leading-tight">
              {articleData.title}
            </h1>

            {/* Tags — amber pills matching blog listing */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {articleData?.tags?.map((item, index) => (
                <span
                  key={index}
                  className="bg-accent/15 text-accent text-[11px] font-medium px-2.5 py-0.5 rounded-sm font-mono border border-accent/30 uppercase tracking-wide"
                >
                  {item as string}
                </span>
              ))}
            </div>

            {/* Author */}
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={articleData?.easywrite_author?.profile_pic}
                alt={articleData?.easywrite_author?.name || "Author"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-inter text-sm font-medium text-foreground">
                  {articleData?.easywrite_author?.name ||
                    articleData?.easywrite_author?.username}
                </p>
                <div className="flex gap-2">
                  <p className="font-inter text-xs text-muted-foreground">
                    Published on{" "}
                    {format(
                      new Date(articleData.created_at || new Date()),
                      "dd MMM, yyyy",
                    )}
                  </p>
                  <p className="font-inter text-xs text-muted-foreground border-l border-border pl-2">
                    Updated{" "}
                    {format(
                      new Date(articleData.updated_at || new Date()),
                      "dd MMM, yyyy",
                    )}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-border mt-6 mb-8" />

            {headings.length > 0 && <TableOfContents headings={headings} />}

            {articleData?.canonical_url &&
              extractDomain(articleData?.canonical_url) !== "texavor.com" && (
                <p className="font-inter italic text-sm text-muted-foreground mb-2">
                  Originally published at{" "}
                  <Link
                    href={articleData?.canonical_url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {extractDomain(articleData?.canonical_url)}
                  </Link>
                </p>
              )}

            <div ref={articleContentRef} className="pb-6">
              <ArticleContent
                html={html}
                relatedArticles={articleData.relatedArticles}
                setHeadings={setHeadings}
                setIsTocLoaded={setIsTocLoaded}
              />
            </div>

            {/* Share buttons removed — moved to end of article flow */}
          </div>

          {/* Sidebar */}
          <div className="mb-12 mt-8 lg:mt-0 lg:sticky lg:top-28 self-start h-fit">
            <div className="lg:max-w-[260px]">
              <div className="bg-muted/40 border border-border rounded-xl p-6">
                <div className="relative w-full rounded-lg overflow-hidden mb-4 border border-border bg-background">
                  <SidebarVisual />
                </div>
                <h4 className="font-poppins text-base font-bold text-foreground mb-2">
                  Build Topical Authority
                </h4>
                <p className="font-inter text-sm text-muted-foreground mb-4 leading-relaxed">
                  Texavor gives serious writers the research depth to build{" "}
                  <span className="font-semibold text-foreground">authority</span>{" "}
                  across AI search engines.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary font-inter hover:gap-2 transition-all duration-200"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {articleData?.relatedArticles?.length > 2 && (
          <div className="mt-10 lg:mt-20 border-t border-border pt-8">
            <p className="font-poppins text-xl font-bold text-foreground mb-6">
              Related Articles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articleData?.relatedArticles
                ?.slice(2, 5)
                ?.map((relatedArticle: any) => (
                  <Link
                    key={relatedArticle?.slug}
                    href={`/blog/${relatedArticle?.slug}`}
                    className="group block"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300 shadow-tx-sm">
                      <div className="relative overflow-hidden h-[160px]">
                        <Image
                          src={relatedArticle?.image}
                          alt={relatedArticle?.title}
                          fill
                          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <p className="font-poppins text-base font-semibold text-foreground px-4 py-3 line-clamp-2">
                        {relatedArticle?.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* End-of-article CTA — reader is warm, trust established */}
        <div className="mt-12 border-t border-border pt-10 mb-16">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-poppins text-xl font-bold text-foreground mb-2">
                Ready to build real topical authority?
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                Texavor structures your expertise into content that both audiences and
                AI engines trust. Join writers who&apos;ve
                stopped guessing and started building real authority.
              </p>
            </div>
            <Button
              asChild
              variant="brand"
              size="default"
              className="shrink-0 rounded-md"
            >
              <Link href="/">Start Free — No Credit Card</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
