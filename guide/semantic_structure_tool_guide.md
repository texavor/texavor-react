# Tool Guide: Semantic Structure Validator

**Target Audience**: Content Marketers, SEOs, Web Developers.
**Goal**: Help users fix "Skipped Heading Levels" and "Missing H1s" to improve GEO/SEO.

## 1. SEO & Metadata Strategy

### Primary Keywords (Validated)

- **Primary**: "h1 h2 h3 validator", "seo heading structure checker"
- **Secondary**: "html hierarchy checker", "fix skipped heading level", "semantic html validator"
- **Long-tail**: "how to fix heading structure for accessibility", "check h1 tag exists online"

### Meta Tags

- **Meta Title**: `Free SEO Heading Structure Checker (H1-H6 Validator) | Texavor`
  - _Why_: Directly addresses the primary keyword and promises a "Free" utility.
- **Meta Description**: `Instantly validate your HTML heading hierarchy. Fix skipped H2/H3 levels, missing H1 tags, and improve SEO & Accessibility with our free Semantic Structure tool.`
  - _Length_: ~155 characters (Optimal).

### URL Slug

- `/tools/seo-heading-structure-checker` OR `/tools/semantic-html-validator`

---

## 2. On-Page Content & Copy

_Use these sections on the landings page to rank for the keywords._

### H1: Free SEO Heading Structure Validator

**Intro**: "Search engines and Screen Readers rely on a logical heading hierarchy to understand your content. Skipped levels (like jumping from H2 to H4) confuse AI crawlers and hurt your Answer Engine Optimization (AEO)."

### Features List (Benefits)

- **Visual Hierarchy Tree**: See your content outline exactly how Google sees it.
- **Error Detection**: Instantly spot missing H1s or illogical jumps (H2 -> H4).
- **Competitor Analysis**: Paste a competitor's URL to steal their outline structure.

### FAQ Section (for Rich Snippets)

- **Q: Why is heading structure important for SEO?**
  - A: Google uses H1-H6 tags to understand the relative importance of content. A logical structure helps you rank for "Featured Snippets".
- **Q: Can I have multiple H1 tags?**
  - A: HTML5 allows it, but for SEO, it is best practice to have a single, descriptive H1 per page.

---

## 3. Frontend Implementation Guide

_Guidelines for the `SemanticStructure` React component._

### UI Components

1.  **Input Field**: Large URL input with "Analyze" button.
2.  **Score Card**:
    - Display the `score` (0-100) from the API.
    - Color Code: Red (<50), Yellow (50-80), Green (>80).
3.  **The Tree View (Critical)**:
    - Display `hierarchy_tree` response as a nested list or indented tree.
    - **Visual**: Use indentation (padding-left) to show depth.
    - **H1**: Bold, Large.
    - **H2**: Bold, Medium, Indented 20px.
    - **H3**: Regular, Indented 40px.
4.  **Issue Highlighter**:
    - Iterate through `issues` array.
    - Display alert banners (Red/Yellow) at the top.

### API Integration

- **Endpoint**: `POST /api/v1/public/tools/semantic_structure`
- **Payload**: `{ "url": "https://target-site.com" }`
- **Response Handling**:
  - `isLoading`: Show a skeleton loader mimicking a tree structure.
  - `error`: Handle 422 (Unprocessable) or 429 (Rate Limit).

### Sample Frontend Code (React/Tailwind)

```tsx
const HierarchyItem = ({ tag, text, level }) => (
  <div
    className={`flex items-center py-2 border-b border-gray-100 dark:border-gray-800`}
    style={{ paddingLeft: `${level * 1.5}rem` }}
  >
    <span className="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded mr-3 uppercase w-12 text-center">
      {tag}
    </span>
    <span
      className={`text-gray-700 dark:text-gray-300 ${tag === "h1" ? "font-bold text-lg" : "text-sm"}`}
    >
      {text}
    </span>
  </div>
);
```

---

## 4. Upsell Strategy

- **Trigger**: If `score < 80` or `issues.length > 0`.
- **Message**: "Found structural errors? Texavor Pro automatically generates perfectly structured outlines optimized for Google SGE."
- **CTA**: "Generate Optimized Outline" -> link to `/dashboard/outline-generation`.
