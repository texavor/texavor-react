# Tool Guide: Citation Authority Checker

**Target Audience**: Content Marketers, SEO Writers, Bloggers, Digital PR professionals.
**Goal**: Help users validate outbound links, improve E-E-A-T signals, and identify weak citations.

## 1. SEO & Metadata Strategy

### Primary Keywords (Validated)

- **Primary**: "citation checker free", "check citations in article", "outbound link validator"
- **Secondary**: "authoritative sources checker", "link authority checker", "verify sources for seo"
- **Long-tail**: "how to check if sources are credible", "find authoritative sources for blog", "e-e-a-t checker free"

### Meta Tags

- **Meta Title**: `Free Citation Authority Checker - Validate Sources & Links for SEO | Texavor`
  - _Why_: Combines "citation checker free" with "SEO" for dual intent capture.
- **Meta Description**: `Audit external links, score citation authority (.edu/.gov), detect weak claims, and boost E-E-A-T compliance. Free citation validator for content marketers.`
  - _Length_: ~158 characters (Optimal).

### URL Slug

- `/tools/citation-authority-checker` OR `/tools/free-citation-validator`

---

## 2. On-Page Content & Copy

### H1: Free Citation Authority Checker for SEO

**Intro**: "Google's E-E-A-T guidelines require content to cite authoritative sources. Our Citation Authority Checker analyzes your outbound links, scores them by domain authority (.edu/.gov = highest), and identifies uncited claims that could hurt your rankings."

### Features List (Benefits)

- **Authority Scoring**: Instantly see which citations are from .edu/.gov (100pts) vs random blogs (20pts).
- **Broken Link Detection**: Find and fix 404 errors before they damage user trust.
- **Uncited Claim Finder**: AI detects statistics and research mentions without hyperlinks.
- **E-E-A-T Report**: Get actionable suggestions to improve Expertise, Authority, and Trustworthiness.

### FAQ Section (for Rich Snippets)

- **Q: What are authoritative sources for SEO?**
  - A: Authoritative sources include .edu (educational), .gov (government), reputable news sites (NYT, WSJ), and peer-reviewed journals. These boost your E-E-A-T score.
- **Q: Why do citations matter for Google rankings?**
  - A: Google's algorithms prioritize content backed by credible sources. Proper citations signal expertise and trustworthiness, improving rankings for informational queries.
- **Q: How many citations should a blog post have?**
  - A: Aim for 3-5 high-authority citations per 1,000 words. Focus on quality over quantity.

---

## 3. Frontend Implementation Guide

### UI Components

#### 1. **Input Section**

- Large URL input field
- "Analyze Citations" CTA button
- Example placeholder: "https://example.com/article"

#### 2. **Citation Score Card** (Hero Metric)

- Display overall `citation_score` (0-100)
- **Color Coding**:
  - Red (<50): "Poor Citation Quality"
  - Yellow (50-75): "Needs Improvement"
  - Green (>75): "Strong Citations"
- **Sub-metrics**:
  - Total Citations: 15
  - High Authority: 8 (.edu/.gov)
  - Broken Links: 1

#### 3. **Authority Breakdown Table**

Display categorized citations:

| Domain          | Anchor Text         | Authority Tier | Status    |
| --------------- | ------------------- | -------------- | --------- |
| nih.gov         | "cancer statistics" | 🟢 High (Gov)  | ✅ Live   |
| wikipedia.org   | "history of AI"     | 🟡 Medium      | ✅ Live   |
| randomblogs.com | "study shows"       | 🔴 Low         | ✅ Live   |
| example.com/404 | "broken citation"   | -              | ❌ Broken |

**Visual**: Use badge components for tier colors.

#### 4. **Issues Panel** (Alert Cards)

Display warnings:

- ⚠️ "Found 3 statistics without any citations"
- 🔴 "1 broken link detected - Fix to prevent 404 errors"
- 💡 "Consider replacing 5 low-authority citations with .edu/.gov sources"

#### 5. **Suggestions List** (AI-powered)

- "Add citation for: '60% of marketers use AI'"
  - **Suggested Source**: [HubSpot State of Marketing 2024](hubspot.com)
  - CTA: "Copy Link"

### API Integration

- **Endpoint**: `POST /api/v1/public/tools/citation_validator`
- **Payload**: `{ "url": "https://target-site.com" }`
- **Response**:

```json
{
  "citation_score": 75,
  "stats": {
    "total_citations": 15,
    "high_authority": 8,
    "medium_authority": 4,
    "low_authority": 3,
    "broken": 1
  },
  "high_authority_sources": [
    {
      "domain": "nih.gov",
      "anchor": "cancer statistics",
      "tier": "Government",
      "url": "https://nih.gov/study"
    }
  ],
  "issues": [
    "Found 3 statistics without any citations",
    "1 broken link detected"
  ],
  "suggestions": [
    {
      "uncited_claim": "60% of marketers use AI",
      "suggested_source": "HubSpot State of Marketing",
      "url": "https://hubspot.com/marketing-stats"
    }
  ]
}
```

### Sample Frontend Code (React/Tailwind)

```tsx
const AuthorityBadge = ({ tier }) => {
  const colors = {
    high: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${colors[tier]}`}>
      {tier === "high"
        ? "🟢 High Authority"
        : tier === "medium"
          ? "🟡 Medium"
          : "🔴 Low"}
    </span>
  );
};

const CitationRow = ({ citation }) => (
  <div className="flex items-center justify-between p-3 border-b">
    <div className="flex-1">
      <p className="font-medium text-sm">{citation.domain}</p>
      <p className="text-xs text-gray-500">"{citation.anchor}"</p>
    </div>
    <AuthorityBadge tier={citation.authority_tier} />
    {citation.is_broken && <span className="ml-2 text-red-500">❌ Broken</span>}
  </div>
);
```

---

## 4. Upsell Strategy

### Trigger Conditions

- `citation_score < 70`
- `broken > 0`
- `uncited_claims.length > 2`

### Message

"Found citation issues? Texavor Pro automatically suggests high-authority replacements and monitors link health 24/7."

### CTA

- Primary: "Upgrade to Pro" → `/pricing`
- Secondary: "Generate Optimized Article" → `/dashboard/article-generation`

---

## 5. Competitive Positioning

### What Makes Us Better Than Ahrefs Toolbar?

- ✅ **Authority Scoring** (Ahrefs only lists links, doesn't score them)
- ✅ **Uncited Claim Detection** (Unique to Texavor)
- ✅ **AI Suggestions** (Recommends better sources)

### What Makes Us Better Than Academic Tools?

- ✅ **Built for SEO Content** (not research papers)
- ✅ **E-E-A-T Focus** (Google-specific signals)
- ✅ **Real-time Web Scraping** (not static databases)
