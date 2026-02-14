# Tool Guide: Content Freshness Analyzer (Content Decay Tool)

**Target Audience**: Content Marketers, SEO Specialists, Editorial Teams.
**Goal**: Detect content decay signals and identify pages needing updates for SEO freshness.

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/content_freshness
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
  "freshness_score": 85,
  "grade": "A",
  "dates_found": {
    "published": "2024-02-13",
    "last_modified": "202 6-01-15",
    "age_days": 32,
    "last_update_days": 29
  },
  "decay_signals": [
    {
      "type": "old_statistics",
      "severity": "warning",
      "examples": [
        "60% of marketers reported... (2022 study)",
        "According to a 2021 survey..."
      ],
      "message": "Found 2 statistics referencing 2021-2022 data"
    },
    {
      "type": "outdated_tools",
      "severity": "minor",
      "examples": ["Google Analytics Universal (deprecated)"],
      "message": "Mentions deprecated tools/platforms"
    }
  ],
  "positives": [
    "Content updated within last 30 days",
    "dateModified schema present",
    "References current year (2026)"
  ],
  "recommendations": [
    "Update 2 statistics with 2025-2026 data",
    "Replace mention of deprecated Google Analytics with GA4",
    "Add \"Last Updated\" badge to build trust"
  ],
  "competitive_freshness": {
    "avg_competitor_age": "45 days",
    "your_advantage": "You're 13 days fresher than average"
  },
  "upsell": {
    "message": "Monitor content decay automatically with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

### Response (No Dates Found - Freshness Unknown)

```json
{
  "url": "https://example.com/undated-page",
  "freshness_score": 50,
  "grade": "C",
  "dates_found": {
    "published": null,
    "last_modified": null,
    "age_days": null,
    "last_update_days": null
  },
  "decay_signals": [
    {
      "type": "missing_dates",
      "severity": "critical",
      "message": "No publish or modified dates found (schema or visible)"
    }
  ],
  "positives": [],
  "recommendations": [
    "Add datePublished and dateModified to Article schema",
    "Display last updated date visibly on page"
  ]
}
```

---

## Frontend Implementation

### 1. API Call (React/TypeScript)

```typescript
interface ContentFreshnessResult {
  freshness_score: number;
  grade: string;
  dates_found: {
    published: string | null;
    last_modified: string | null;
    age_days: number | null;
    last_update_days: number | null;
  };
  decay_signals: Array<{
    type: string;
    severity: "critical" | "warning" | "minor";
    examples?: string[];
    message: string;
  }>;
  recommendations: string[];
}

const analyzeFreshness = async (url: string) => {
  const response = await axios.post("/api/v1/public/tools/content_freshness", {
    url,
  });
  return response.data;
};
```

### 2. UI Components

#### Freshness Score Card

```tsx
const FreshnessScoreCard = ({ data }: { data: ContentFreshnessResult }) => {
  const { freshness_score, grade, dates_found } = data;

  const getColor = (score: number) => {
    if (score >= 80) return "green";
    if (score >= 60) return "yellow";
    return "red";
  };

  return (
    <div className={`p-6 rounded-lg bg-${getColor(freshness_score)}-50`}>
      <div className="text-5xl font-bold text-${getColor(freshness_score)}-700">
        {freshness_score}
      </div>
      <div className="text-sm text-gray-600">Grade: {grade}</div>

      {dates_found.age_days && (
        <div className="mt-4 space-y-1 text-sm">
          <div>
            Published: <strong>{dates_found.age_days} days ago</strong>
          </div>
          {dates_found.last_update_days && (
            <div>
              Last Updated:{" "}
              <strong>{dates_found.last_update_days} days ago</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

#### Decay Signals List

```tsx
const DecaySignalsList = ({ signals }: { signals: any[] }) => {
  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: "red",
      warning: "yellow",
      minor: "orange",
    };
    return colors[severity] || "gray";
  };

  return (
    <div className="space-y-3">
      {signals.map((signal, idx) => (
        <div
          key={idx}
          className={`border-l-4 border-${getSeverityColor(signal.severity)}-400 bg-${getSeverityColor(signal.severity)}-50 p-4`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 bg-${getSeverityColor(signal.severity)}-100 text-${getSeverityColor(signal.severity)}-700 text-xs rounded uppercase font-semibold`}
            >
              {signal.severity}
            </span>
            <span className="text-sm font-medium">
              {signal.type.replace(/_/g, " ")}
            </span>
          </div>
          <p className="text-sm text-gray-700">{signal.message}</p>
          {signal.examples && signal.examples.length > 0 && (
            <div className="mt-2 bg-white p-2 rounded">
              <strong className="text-xs text-gray-500">Examples:</strong>
              <ul className="list-disc list-inside text-sm mt-1">
                {signal.examples.map((ex, i) => (
                  <li key={i} className="text-gray-600">
                    "{ex}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

#### Recommendations Panel

```tsx
const RecommendationsPanel = ({
  recommendations,
}: {
  recommendations: string[];
}) => (
  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
    <h3 className="font-semibold text-blue-800 mb-3">
      💡 Update Recommendations
    </h3>
    <ul className="space-y-2">
      {recommendations.map((rec, idx) => (
        <li key={idx} className="flex items-start text-sm text-blue-700">
          <span className="mr-2">•</span>
          <span>{rec}</span>
        </li>
      ))}
    </ul>
  </div>
);
```

---

## SEO Strategy

### Primary Keywords

- **Primary**: "content decay tool", "content freshness checker", "seo freshness checker"
- **Secondary**: "find outdated content", "check publish date", "content audit tool"
- **Long-tail**: "how to check if content is outdated", "detect stale content seo"

### Meta Tags

- **Title**: `Free Content Freshness Checker - Detect Content Decay | Texavor`
- **Description**: `Analyze content freshness, find outdated statistics, and get update recommendations. Check publish dates, schema markup, and decay signals instantly. Free tool.`

### URL

- `/tools/content-freshness-checker`

---

## Freshness Scoring Algorithm

### Score Calculation (0-100)

```
Base Score: 100

Deductions:
- No publish date:           -20 points
- No last modified date:     -10 points
- Content age > 365 days:    -15 points
- Last update > 180 days:    -10 points
- Old statistics (2+ years): -5 points per instance
- Outdated tool mentions:    -3 points per instance
- Missing year references:   -5 points

Bonuses:
+ Updated within 30 days:    +10 points
+ dateModified in schema:    +5 points
+ Current year mentions:     +5 points
```

### Grade Mapping

- **90-100 (A+)**: Fresh, recently updated
- **80-89 (A)**: Good freshness
- **70-79 (B)**: Moderate, may need minor updates
- **60-69 (C)**: Aging, should update soon
- **<60 (D)**: Stale, update urgently

---

## Detection Logic

### 1. Date Extraction (Schema & Meta Tags)

```ruby
# Check schema.org Article schema
schema = doc.css('script[type="application/ld+json"]')
schema.each do |block|
  json = JSON.parse(block.text)
  published = json['datePublished']
  modified = json['dateModified']
end

# Fallback: meta tags
published ||= doc.at_css('meta[property="article:published_time"]')&.[]('content')
modified ||= doc.at_css('meta[property="article:modified_time"]')&.[]('content')
```

### 2. Old Statistics Detection

```ruby
text = content.text

# Find year references in statistical claims
text.scan(/(\d+%.*?\((\d{4})[^\)]*\))/) do |match|
  year = match[1].to_i
  if year < (Date.today.year - 2)
    decay_signals << {
      type: 'old_statistics',
      severity: 'warning',
      examples: [match[0]]
    }
  end
end
```

### 3. Deprecated Tool Detection

```ruby
DEPRECATED_TOOLS = [
  'Google Analytics Universal',
  'Google+ ',
  'Internet Explorer',
  'Flash Player'
]

DEPRECATED_TOOLS.each do |tool|
  if text.include?(tool)
    decay_signals << {
      type: 'outdated_tools',
      severity: 'minor',
      examples: [tool]
    }
  end
end
```

---

## Competitive Advantages

### vs Animalz Revive

- ✅ **No GA integration needed** (works with any URL)
- ✅ **Instant analysis** (no waiting for data processing)
- ✅ **Free tier available** (Animalz Revive is paid-only)

### vs Manual Audits

- ✅ **Automated detection** of old stats and deprecated references
- ✅ **Scoring algorithm** (not just date display)
- ✅ **Actionable recommendations** (specific fixes)

---

## Upsell Triggers

Show upgrade CTA when:

- `freshness_score < 70`
- `dates_found.age_days > 180`
- `decay_signals.length > 3`

**Message**: "Monitor content decay automatically with Texavor Pro. Get alerts when content becomes stale and auto-generate update suggestions."
