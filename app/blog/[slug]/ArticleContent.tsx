import { InjectedRelatedArticles } from "./InjectedRelatedArticles";
import { MidArticleCTA } from "./MidArticleCTA";
import { ArticleClientWrapper } from "./ArticleClientWrapper";

// Define the interface for a single related article
interface RelatedArticle {
  slug: string;
  image: string;
  title: string;
}

export function ArticleContent({
  htmlSections,
  relatedArticles,
}: {
  htmlSections: string[];
  relatedArticles: RelatedArticle[];
}) {
  // Mid-article CTA index (approx 60% through h2s)
  const h2Count = htmlSections.length - 1;
  const midIndex = h2Count >= 1 ? Math.max(1, Math.floor(h2Count * 0.6)) : -1;

  // Related articles indices
  const secondH2Index = h2Count >= 2 ? 1 : -1;
  const lastH2Index = h2Count >= 2 ? h2Count - 1 : -1;

  return (
    <ArticleClientWrapper>
      {htmlSections.map((html, index) => {
        const isBeforeSecondH2 = secondH2Index !== -1 && index === secondH2Index;
        const isBeforeLastH2 =
          lastH2Index !== -1 &&
          index === lastH2Index &&
          lastH2Index !== secondH2Index;
        const isBeforeMidH2 = midIndex !== -1 && index === midIndex;

        return (
          <div key={index}>
            {/* Injection Point: Before H2 (index starts at 1 for first H2) */}
            {isBeforeSecondH2 && relatedArticles?.[0] && (
              <InjectedRelatedArticles article={relatedArticles[0]} />
            )}

            {isBeforeMidH2 && index !== secondH2Index && <MidArticleCTA />}

            {isBeforeLastH2 && relatedArticles?.[1] && (
              <InjectedRelatedArticles article={relatedArticles[1]} />
            )}

            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      })}
    </ArticleClientWrapper>
  );
}
