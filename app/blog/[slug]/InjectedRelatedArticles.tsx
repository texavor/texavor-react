// components/article/InjectedRelatedArticles.tsx
import Link from "next/link";
import React from "react";

interface RelatedArticle {
  slug: string;
  image: string;
  title: string;
}

interface InjectedRelatedArticlesProps {
  article: RelatedArticle;
}

export const InjectedRelatedArticles: React.FC<
  InjectedRelatedArticlesProps
> = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <div className="border-t border-b border-border/50 pb-10 w-full group">
      <h3
        className="font-poppins text-lg font-bold text-foreground"
        style={{ margin: "16px 0px" }}
      >
        TECHNICAL CONTEXT
      </h3>
      <div className="w-full">
        <Link
          href={`/${article.slug}`}
          key={article.slug}
          className="no-underline"
          passHref
        >
          <div
            className="bg-card border border-border rounded-lg overflow-hidden w-full md:flex gap-4 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-tx-sm"
            style={{ margin: "0px" }}
          >
            <div className="overflow-hidden md:w-[50%] bg-muted/20">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full m-0 opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                style={{ margin: "0px" }}
              />
            </div>
            <div className="md:w-[50%] mt-4 px-2 pb-4 md:p-6">
              <p
                className="font-poppins text-xl no-underline font-bold text-foreground md:pr-4"
                style={{ margin: "0px" }}
              >
                {article.title}
              </p>
              <p
                className="font-inter text-sm no-underline text-muted-foreground pt-2 md:pr-4 leading-relaxed"
                style={{ margin: "0px" }}
              >
                {/* @ts-ignore */}
                {article?.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
