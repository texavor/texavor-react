"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { ArticleContent } from "./ArticleContent";
import Link from "next/link";
import Image from "next/image";
import { ShareButtons } from "./ShareButtons";
import { TableOfContents } from "./TableOfContents";

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
      // invalid URL
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
      <div className="fixed top-0 left-0 w-full h-1.5 z-[200] backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-[#0F3D2E] via-[#25A66A] to-[#A8F0C4] origin-left transition-transform duration-250 ease-out"
          style={{ transform: `scaleX(${scrollPercentage / 100})` }}
        />
      </div>

      <div className="container mx-auto lg:w-[1200px] md:w-8/12 w-11/12 mt-32">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="lg:w-[72%] xl:w-3/4">
            <div className="relative w-full max-w-4xl aspect-[1000/420] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-zinc-900 flex justify-center items-center z-0">
                <p className="font-poppins text-gray-200 font-semibold text-center text-xl md:text-3xl px-4">
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

            <h1 className="font-poppins heading1 mt-6 text-3xl font-medium">
              {articleData.title}
            </h1>
            <div className="flex flex-wrap">
              {articleData?.tags?.map((item, index) => (
                <span
                  className="font-inter font-light underline mr-2 decoration-green-600 decoration-2"
                  key={index}
                >
                  #{item}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div>
                <Image
                  src={articleData?.easywrite_author?.profile_pic}
                  alt={articleData?.easywrite_author?.name || "Author"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-inter text-base">
                  {articleData?.easywrite_author?.name ||
                    articleData?.easywrite_author?.username}
                </p>
                <p className="font-inter text-sm text-gray-400">
                  Updated on{` `}
                  {format(
                    new Date(articleData.updated_at || new Date()),
                    "dd MMM, yyyy"
                  )}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 mt-6 mb-8" />
            {headings.length > 0 && <TableOfContents headings={headings} />}
            {articleData?.canonical_url &&
              extractDomain(articleData?.canonical_url) !== "texavor.com" && (
                <p className="font-inter italic text-base mb-2">
                  This article is originally published at{" "}
                  <Link
                    href={articleData?.canonical_url}
                    target="_blank"
                    className="font-inter italic text-base text-blue-300"
                  >
                    {extractDomain(articleData?.canonical_url)}
                  </Link>
                </p>
              )}
            <div ref={articleContentRef}>
              <ArticleContent
                html={html}
                relatedArticles={articleData.relatedArticles}
                setHeadings={setHeadings}
                setIsTocLoaded={setIsTocLoaded}
              />
            </div>
            <div
              className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all ease-out duration-300 ${
                showFloatingShare
                  ? "opacity-100 scale-100 bottom-10"
                  : "opacity-0 scale-0 bottom-0"
              }`}
            >
              <ShareButtons
                title={articleData.title}
                url={typeof window !== "undefined" ? window.location.href : ""}
                description={articleData.description}
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:sticky lg:top-28 self-start h-fit">
            <div className="lg:max-w-[260px]">
              <div className="bg-primary/5 rounded-2xl border-none shadow-none backdrop-blur-sm p-6">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-sm border border-primary/10">
                  <Image
                    src="/screenshots/articleManagement.png"
                    alt="Texavor Dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-poppins text-lg font-bold text-gray-900 mb-2">
                  Write Faster & Better
                </h4>
                <p className="font-inter text-sm text-gray-600 mb-6 leading-relaxed">
                  Streamline your content workflow. Plan, draft, and publish
                  SEO-optimized articles in seconds.
                </p>
                <Link
                  href="/"
                  className="block w-full text-center font-poppins bg-[#104127] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#0A2918] transition-all duration-200 text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  Get Started 🚀
                </Link>
              </div>
            </div>
          </div>
        </div>

        {articleData?.relatedArticles?.length > 2 && (
          <div className="mt-10 lg:mt-[80px] border-t-[1px] border-gray-400 pt-4 md:transform">
            <p className="font-poppins text-[24px] font-semibold text-gray-800 mb-4 font-inter">
              Related Articles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 pt-4">
              {articleData?.relatedArticles
                ?.slice(2, 5)
                ?.map((relatedArticle: any) => (
                  <Link
                    key={relatedArticle?.slug}
                    href={`/${relatedArticle?.slug}`}
                    passHref
                  >
                    <div className="bg-[#EEDED3] rounded-2xl overflow-hidden h-full">
                      <div className="relative overflow-hidden h-[150px] lg:h-[200px]">
                        <Image
                          src={relatedArticle?.image}
                          alt={relatedArticle?.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-[1.1]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <p className="font-poppins text-[24px] text-black font-medium px-2 pb-2">
                        {relatedArticle?.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
