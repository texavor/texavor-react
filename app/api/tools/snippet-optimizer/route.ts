import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { message: "Content text is required" },
        { status: 400 },
      );
    }

    const cleanContent = text.trim();
    const lowerContent = cleanContent.toLowerCase();
    const lowerKeyword = (keyword || "").toLowerCase().trim();

    // 1. Detect Type
    // Heuristic: Lists usually have numbers or bullets at start of lines, or multiple newlines
    const isList =
      /^\d+\.|^[-*•]\s/m.test(cleanContent) ||
      (cleanContent.match(/\n/g) || []).length > 2;
    const type = isList ? "List" : "Paragraph";

    // 2. Metrics
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
    const sentenceCount =
      cleanContent.split(/[.!?]+/).filter(Boolean).length || 1;
    const avgSentenceLen = wordCount / sentenceCount;

    // 3. Status Checks
    const checks = {
      keywordFound: lowerKeyword ? lowerContent.includes(lowerKeyword) : false,
      keywordEarly: lowerKeyword
        ? lowerContent.indexOf(lowerKeyword) < 100 &&
          lowerContent.indexOf(lowerKeyword) !== -1
        : false,
      lengthStatus: "bad",
      readabilityStatus: "bad",
    };

    // Length Logic
    if (type === "Paragraph") {
      if (wordCount >= 40 && wordCount <= 60) checks.lengthStatus = "good";
      else if (wordCount >= 35 && wordCount <= 70)
        checks.lengthStatus = "warning";
      else checks.lengthStatus = "bad";
    } else {
      // List logic
      if (wordCount >= 40 && wordCount <= 100) checks.lengthStatus = "good";
      else if (wordCount >= 30 && wordCount <= 120)
        checks.lengthStatus = "warning";
      else checks.lengthStatus = "bad";
    }

    // Readability Logic
    let gradeLevel = "College";
    if (avgSentenceLen <= 15) {
      checks.readabilityStatus = "good";
      gradeLevel = "Middle School (Perfect)";
    } else if (avgSentenceLen <= 20) {
      checks.readabilityStatus = "warning";
      gradeLevel = "High School";
    } else {
      checks.readabilityStatus = "bad";
      gradeLevel = "College (Too Complex)";
    }

    // 4. Scoring
    let score = 0;
    if (checks.keywordFound) score += 20;
    if (checks.keywordEarly) score += 20;
    if (checks.lengthStatus === "good") score += 30;
    else if (checks.lengthStatus === "warning") score += 15;
    if (checks.readabilityStatus === "good") score += 30;
    else if (checks.readabilityStatus === "warning") score += 15;

    // Structure tip
    let structureTip =
      "Ensure the answer starts immediately in the first sentence.";
    if (type === "List" && wordCount < 40)
      structureTip = "Expand your list items to provide more value.";
    if (checks.lengthStatus === "bad")
      structureTip =
        type === "Paragraph" ? "Aim for 40-60 words." : "Aim for 5-8 items.";

    return NextResponse.json({
      detected_type: type,
      score,
      readability: {
        grade_level: gradeLevel,
        avg_sentence_length: Math.round(avgSentenceLen * 10) / 10,
      },
      keyword_found: checks.keywordFound,
      keyword_early: checks.keywordEarly,
      analysis: {
        type,
        word_count: wordCount,
        length_status:
          checks.lengthStatus === "good"
            ? "Perfect Length"
            : checks.lengthStatus === "warning"
              ? "Okay"
              : "Needs Improvement",
        structure_tip: structureTip,
        checks, // Passing raw checks for UI helper
      },
      upsell: {
        message: "Use our AI Writer to auto-generate perfect snippets.",
        cta_link: "#pricing",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Analysis failed" }, { status: 500 });
  }
}
