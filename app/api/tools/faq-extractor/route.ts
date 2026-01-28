import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    // 1. Fetch HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch page content" },
        { status: 422 },
      );
    }

    const html = await response.text();

    // 2. Parse Logic (Dependency-Free / Polyfill approach)
    // We look for common patterns:
    // - H1/H2/H3 containing "FAQ" or "Frequently Asked Questions"
    // - Definition Lists (<dl>)
    // - Ordered/Unordered Lists following the header
    // - Question mark headers followed by paragraphs

    const qa_pairs: { question: string; answer: string }[] = [];

    // Helper to cleanup text
    const cleanBox = (str: string) =>
      str
        ?.replace(/<[^>]*>?/gm, "") // Remove tags
        .replace(/\s+/g, " ") // Normalize whitespace
        .replace(/^[\d\W_]+/, "") // Remove leading numbers/bullets (e.g. "1. " or "Q: ")
        .trim();

    // SIMPLE PATTERN: Look for header "FAQ" and then capture numbered list items?
    // Regex is tricky for nested HTML. Let's try to locate the "window" of text around "FAQ".

    // Find index of "FAQ" header
    const faqHeaderRegex = /<h[1-6][^>]*>(.*?)faq(.*?)<\/h[1-6]>/i;
    const faqMatch = html.match(faqHeaderRegex);

    if (faqMatch && faqMatch.index !== undefined) {
      // Look at content AFTER the FAQ header
      const contentAfter = html.slice(faqMatch.index);

      // Strategy A: Numbered Lists (<ol>...<li>...</li></ol>)
      // This is what the user screenshot showed: "1. Question? Answer"
      const listRegex = /<ol[^>]*>([\s\S]*?)<\/ol>/;
      const listMatch = contentAfter.match(listRegex);

      if (listMatch) {
        const listContent = listMatch[1];
        // Split by <li>
        const items = listContent.split("</li>");

        for (const item of items) {
          if (!item.includes("<li")) continue;

          // Extract text from li
          const cleanItem = cleanBox(item);
          if (!cleanItem) continue;

          // Heuristic: If item has a "?" it's likely the question.
          // But wait, the screenshot showed "1. Question? Answer".
          // Using regex to split the question and answer within the list item

          // Split by first question mark? or specific formatting?
          // Let's assume the question ends with "?"
          const qMarkIndex = cleanItem.indexOf("?");
          if (qMarkIndex > -1) {
            const q = cleanItem.substring(0, qMarkIndex + 1).trim();
            const a = cleanItem.substring(qMarkIndex + 1).trim();
            if (q && a && q.length > 5 && a.length > 10) {
              qa_pairs.push({ question: q, answer: a });
            }
          }
        }
      }
    }

    // FALLBACK: Look for header + paragraph pairs if list method failed
    if (qa_pairs.length === 0) {
      // Find all H3/H2 followed by P
      const blockRegex =
        /<(h[2-4])[^>]*>([\s\S]*?)<\/\1>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
      let match;
      while ((match = blockRegex.exec(html)) !== null) {
        const q = cleanBox(match[2]);
        const a = cleanBox(match[3]);
        if (q.includes("?")) {
          // Only accept if it looks like a question
          qa_pairs.push({ question: q, answer: a });
        }
      }
    }

    // Mock response if scraping completely fails (to verify flow works)
    // In real prod, we would iterate on the parsing logic.
    if (qa_pairs.length === 0) {
      // Last resort try: Specific User Case "FAQ" 1. Question ? Answer
      const simpleListRegex =
        /(\d+\.\s+[\s\S]*?\?)\s+([\s\S]*?)(?=\d+\.\s+|$)/g;
      // Clean html of tags first for this pure text regex?
      // No, that's too heavy.

      // Let's just return what we have or a meaningful error
      if (qa_pairs.length === 0) {
        return NextResponse.json({
          message: "Could not detect FAQs. Try Manual Mode.",
          qa_count: 0,
          qa_pairs: [],
          json_ld: null,
          microdata: "",
        });
      }
    }

    return NextResponse.json({
      source: "Local Extraction",
      qa_count: qa_pairs.length,
      qa_pairs: qa_pairs,
      json_ld: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qa_pairs.map((p) => ({
          "@type": "Question",
          name: p.question,
          acceptedAnswer: { "@type": "Answer", text: p.answer },
        })),
      },
      microdata: "...", // Simplified for API response
      validation_tool_url: "https://search.google.com/test/rich-results",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error during extraction" },
      { status: 500 },
    );
  }
}
