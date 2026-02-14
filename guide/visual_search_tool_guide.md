# Tool Guide: Alt Text Checker (Visual Search Optimizer)

**Target Audience**: SEO Specialists, Web Developers, Content Marketers, Accessibility Advocates.
**Goal**: Audit image alt text for accessibility (WCAG) and visual search optimization (Google Lens).

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/visual_search
```

### Request Body

```json
{
  "url": "https://example.com/blog/article"
}
```

### Response (Success - 200 OK)

```json
{
  "url": "https://www.texavor.com/blog/7-steps-to-transition-from-seo-to-geo-2026",
  "score": 72,
  "grade": "B",
  "total_images": 15,
  "stats": {
    "with_alt": 12,
    "without_alt": 3,
    "too_short": 2,
    "too_long": 1,
    "duplicate_alt": 2,
    "keyword_stuffed": 0,
    "decorative": 1
  },
  "issues": [
    {
      "type": "missing_alt",
      "severity": "critical",
      "image_src": "/images/hero-banner.jpg",
      "message": "Missing alt text - violates WCAG 2.1"
    },
    {
      "type": "too_short",
      "severity": "warning",
      "image_src": "/images/chart.png",
      "current_alt": "chart",
      "message": "Alt text too short (5 chars). Recommended: 15-125 characters.",
      "suggestion": "Bar chart showing 25% decline in organic search traffic by 2026"
    },
    {
      "type": "duplicate_alt",
      "severity": "warning",
      "images": ["/img1.jpg", "/img2.jpg"],
      "duplicate_text": "blog post image",
      "message": "2 images share the same alt text"
    }
  ],
  "good_examples": [
    {
      "src": "/images/geo-workflow.png",
      "alt": "Step-by-step workflow diagram for implementing Generative Engine Optimization in 2026",
      "reason": "Descriptive, keyword-rich, appropriate length (89 chars)"
    }
  ],
  "opportunities": [
    "Add alt text to 3 images",
    "Improve 2 short alt texts with more detail",
    "Fix 2 duplicate alt texts to be unique"
  ],
  "wcag_compliance": {
    "level": "AA (Partial)",
    "missing_count": 3,
    "status": "Non-compliant - missing alt text detected"
  },
  "upsell": {
    "message": "Auto-generate AI-powered alt text with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

### Response (No Images Found)

```json
{
  "url": "https://example.com/text-only-page",
  "score": 100,
  "grade": "A+",
  "total_images": 0,
  "stats": {
    "with_alt": 0,
    "without_alt": 0,
    "too_short": 0,
    "too_long": 0,
    "duplicate_alt": 0,
    "keyword_stuffed": 0,
    "decorative": 0
  },
  "issues": [],
  "good_examples": [],
  "opportunities": [],
  "wcag_compliance": {
    "level": "N/A",
    "missing_count": 0,
    "status": "No images to audit"
  }
}
```

---

## Frontend Implementation

### 1. API Call (React/TypeScript)

```typescript
interface AltTextAuditResult {
  score: number;
  grade: string;
  total_images: number;
  stats: {
    with_alt: number;
    without_alt: number;
    too_short: number;
    too_long: number;
    duplicate_alt: number;
  };
  issues: Array<{
    type: string;
    severity: "critical" | "warning";
    image_src: string;
    message: string;
    current_alt?: string;
    suggestion?: string;
  }>;
  opportunities: string[];
}

const auditAltText = async (url: string): Promise<AltTextAuditResult> => {
  const response = await axios.post("/api/v1/public/tools/visual_search", {
    url,
  });
  return response.data;
};
```

### 2. UI Components

#### Score Card with Stats

```tsx
const AltTextScoreCard = ({ data }: { data: AltTextAuditResult }) => {
  const { score, grade, stats } = data;

  const getColor = (s: number) => {
    if (s >= 80) return "green";
    if (s >= 60) return "yellow";
    return "red";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-6xl font-bold text-${getColor(score)}-600`}>
            {score}
          </div>
          <div className="text-sm text-gray-500">Grade: {grade}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-green-600 font-bold">{stats.with_alt}</span>
            <span className="text-gray-600"> With Alt</span>
          </div>
          <div>
            <span className="text-red-600 font-bold">{stats.without_alt}</span>
            <span className="text-gray-600"> Missing</span>
          </div>
          <div>
            <span className="text-yellow-600 font-bold">{stats.too_short}</span>
            <span className="text-gray-600"> Too Short</span>
          </div>
          <div>
            <span className="text-orange-600 font-bold">
              {stats.duplicate_alt}
            </span>
            <span className="text-gray-600"> Duplicates</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Issues List with Fix Suggestions

```tsx
const IssuesList = ({ issues }: { issues: any[] }) => {
  const getSeverityBadge = (severity: string) => {
    if (severity === "critical") {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
          Critical
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
        Warning
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {issues.map((issue, idx) => (
        <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getSeverityBadge(issue.severity)}
              <span className="font-mono text-xs text-gray-600">
                {issue.image_src}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{issue.message}</p>
          {issue.current_alt && (
            <div className="bg-white p-2 rounded mb-2">
              <strong className="text-xs text-gray-500">Current:</strong>
              <p className="text-sm">"{issue.current_alt}"</p>
            </div>
          )}
          {issue.suggestion && (
            <div className="bg-green-50 p-2 rounded">
              <strong className="text-xs text-green-700">💡 Suggested:</strong>
              <p className="text-sm text-green-800">"{issue.suggestion}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

#### Good Examples Showcase

```tsx
const GoodExamples = ({ examples }: { examples: any[] }) => (
  <div className="bg-green-50 p-4 rounded-lg">
    <h3 className="font-semibold text-green-800 mb-3">
      ✓ Well-Optimized Images
    </h3>
    {examples.map((ex, idx) => (
      <div key={idx} className="bg-white p-3 rounded mb-2">
        <div className="text-xs text-gray-500 mb-1">{ex.src}</div>
        <div className="text-sm font-medium text-gray-800">"{ex.alt}"</div>
        <div className="text-xs text-green-600 mt-1">{ex.reason}</div>
      </div>
    ))}
  </div>
);
```

---

## SEO Strategy

### Primary Keywords

- **Primary**: "alt text checker", "alt text validator", "image accessibility checker"
- **Secondary**: "check alt text online", "google lens optimization", "visual search seo"
- **Long-tail**: "how to check alt text on website", "free alt text audit tool"

### Meta Tags

- **Title**: `Free Alt Text Checker - Audit Images for SEO & Accessibility | Texavor`
- **Description**: `Instantly audit alt text for WCAG compliance and Google Lens optimization. Find missing alt text, duplicates, and get AI-powered suggestions. Free tool.`

### URL

- `/tools/alt-text-checker`

---

## Validation Rules

### 1. Missing Alt Text (Critical)

```ruby
if image['alt'].blank? && !image['role']&.include?('presentation')
  issues << {
    type: 'missing_alt',
    severity: 'critical',
    message: 'Missing alt text - violates WCAG 2.1'
  }
  score -= 10
end
```

### 2. Too Short (<15 characters)

```ruby
if alt_text.length > 0 && alt_text.length < 15
  issues << {
    type: 'too_short',
    severity: 'warning',
    current_alt: alt_text,
    message: 'Alt text too short. Recommended: 15-125 characters.'
  }
  score -= 3
end
```

### 3. Too Long (>125 characters)

```ruby
if alt_text.length > 125
  issues << {
    type: 'too_long',
    severity: 'warning',
    message: 'Alt text too long. Screen readers may truncate.'
  }
  score -= 2
end
```

### 4. Duplicate Alt Text

```ruby
alt_texts = images.map { |img| img['alt'] }.compact
duplicates = alt_texts.group_by(&:itself).select { |_, v| v.size > 1 }

duplicates.each do |text, occurrences|
  issues << {
    type: 'duplicate_alt',
    severity: 'warning',
    duplicate_text: text,
    message: "#{occurrences.size} images share the same alt text"
  }
  score -= 5
end
```

### 5. Keyword Stuffing Detection

```ruby
if alt_text.scan(/\b(seo|keyword|best|top|buy)\b/i).size > 2
  issues << {
    type: 'keyword_stuffing',
    severity: 'warning',
    message: 'Potential keyword stuffing detected'
  }
  score -= 5
end
```

---

## Competitive Advantages

### vs Basic Alt Text Checkers

- ✅ **AI-Powered Suggestions** (not just detection)
- ✅ **Visual Search Optimization** (Google Lens specific tips)
- ✅ **Severity Ratings** (critical vs warning)

### vs Accessibility-Only Tools

- ✅ **SEO Scoring** (not just pass/fail)
- ✅ **Keyword Analysis** (balanced vs stuffing)
- ✅ **Good Examples** (learn from your own site)

---

## Upsell Triggers

Show upgrade CTA when:

- `stats.without_alt > 5`
- `score < 70`
- `issues.length > 10`

**Message**: "Auto-generate AI-powered alt text with Texavor Pro. Describe images in seconds, optimized for SEO and accessibility."
