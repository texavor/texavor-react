# Tool Guide: Schema Markup Validator

**Target Audience**: SEO Specialists, Web Developers, Content Marketers.
**Goal**: Validate JSON-LD schema markup and get GEO optimization recommendations.

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/schema_validator
```

### Request Headers

```
Content-Type: application/json
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
  "domain": "www.texavor.com",
  "score": 80,
  "grade": "A",
  "detected_types": ["Article", "BreadcrumbList", "Organization", "WebSite"],
  "schema_health": "good",
  "schemas": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "7 Steps to Transition from SEO to GEO in 2026",
      "author": {
        "@type": "Person",
        "name": "John Doe"
      },
      "datePublished": "2024-02-13",
      "image": "https://example.com/image.jpg",
      "publisher": {
        "@type": "Organization",
        "name": "Texavor",
        "logo": {
          "@type": "ImageObject",
          "url": "https://texavor.com/logo.png"
        }
      }
    }
  ],
  "aeo_checks": {
    "schema_found": true,
    "syntax_valid": true,
    "aeo_type_found": true,
    "entity_linking": "Strong (3 props)",
    "voice_ready": false,
    "identity_verified": true,
    "hub_content": true
  },
  "opportunities": [
    "Add 'speakable' property to target Voice Search / Smart Assistants."
  ],
  "upsell": {
    "message": "Automatically generate optimized schema with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

### Response (No Schema Found - 200 OK)

```json
{
  "url": "https://example.com/page-without-schema",
  "domain": "example.com",
  "score": 0,
  "grade": "D",
  "detected_types": [],
  "schema_health": "critical",
  "schemas": [],
  "aeo_checks": {
    "schema_found": false
  },
  "opportunities": ["Add JSON-LD Schema to facilitate AI understanding."],
  "upsell": {
    "message": "Automatically generate optimized schema with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

### Response (Error - 422 Unprocessable Entity)

```json
{
  "error": "Could not fetch URL: 404"
}
```

---

## Frontend Implementation

### 1. API Call (React/Axios)

```typescript
import axios from "axios";

const validateSchema = async (url: string) => {
  try {
    const response = await axios.post("/api/v1/public/tools/schema_validator", {
      url: url,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
```

### 2. UI Components

#### Score Card

```tsx
const SchemaScoreCard = ({
  score,
  grade,
}: {
  score: number;
  grade: string;
}) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600 bg-green-50";
    if (s >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className={`p-6 rounded-lg ${getScoreColor(score)}`}>
      <div className="text-5xl font-bold">{score}</div>
      <div className="text-sm uppercase tracking-wide">Grade: {grade}</div>
    </div>
  );
};
```

#### Schema Types Badge List

```tsx
const SchemaTypeBadges = ({ types }: { types: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {types.map((type) => (
      <span
        key={type}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
      >
        {type}
      </span>
    ))}
  </div>
);
```

#### GEO Checks Table

```tsx
const AeoChecksTable = ({ checks }: { checks: Record<string, any> }) => {
  const checkItems = [
    { key: "schema_found", label: "Schema Present" },
    { key: "syntax_valid", label: "Valid JSON Syntax" },
    { key: "aeo_type_found", label: "GEO-Friendly Type" },
    { key: "entity_linking", label: "Entity Linking" },
    { key: "voice_ready", label: "Voice Search Ready" },
    { key: "identity_verified", label: "Organization/Author" },
  ];

  return (
    <div className="space-y-2">
      {checkItems.map((item) => {
        const value = checks[item.key];
        const isPass =
          value === true ||
          (typeof value === "string" && value.includes("Strong"));

        return (
          <div
            key={item.key}
            className="flex items-center justify-between p-3 border-b"
          >
            <span className="text-sm font-medium">{item.label}</span>
            {typeof value === "boolean" ? (
              <span className={isPass ? "text-green-600" : "text-red-600"}>
                {isPass ? "✓ Pass" : "✗ Missing"}
              </span>
            ) : (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

#### Opportunities List

```tsx
const OpportunitiesList = ({ opportunities }: { opportunities: string[] }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <h3 className="font-semibold text-yellow-800 mb-2">
      Optimization Opportunities
    </h3>
    <ul className="space-y-1">
      {opportunities.map((opp, idx) => (
        <li key={idx} className="text-sm text-yellow-700 flex items-start">
          <span className="mr-2">💡</span>
          {opp}
        </li>
      ))}
    </ul>
  </div>
);
```

---

## SEO Strategy

### Primary Keywords

- **Primary**: "schema markup validator", "json-ld validator", "schema validator free"
- **Secondary**: "test schema markup", "validate structured data", "check schema org"
- **Long-tail**: "how to validate json-ld schema", "free schema markup checker"

### Meta Tags

- **Title**: `Free Schema Markup Validator + GEO Audit | Texavor`
- **Description**: `Validate JSON-LD schema, check syntax errors, and get GEO optimization tips. Test Article, FAQPage, HowTo schemas instantly. Free tool for SEO.`

### URL

- `/tools/schema-validator`

---

## Key Response Fields Explained

| Field                          | Type     | Description                                                      |
| ------------------------------ | -------- | ---------------------------------------------------------------- |
| `score`                        | number   | Overall schema quality (0-100)                                   |
| `grade`                        | string   | Letter grade (A+ to D)                                           |
| `detected_types`               | string[] | List of schema types found (Article, FAQPage, etc.)              |
| `schema_health`                | string   | Overall health: "good", "fair", or "critical"                    |
| `schemas`                      | object[] | Raw JSON-LD objects extracted from page                          |
| `aeo_checks`                   | object   | Detailed validation results                                      |
| `aeo_checks.schema_found`      | boolean  | At least one schema present                                      |
| `aeo_checks.syntax_valid`      | boolean  | All schemas are valid JSON                                       |
| `aeo_checks.aeo_type_found`    | boolean  | Has FAQPage, HowTo, or Article type (GEO-Friendly)               |
| `aeo_checks.entity_linking`    | string   | Strength of entity connections ("Strong (3 props)" or "Missing") |
| `aeo_checks.voice_ready`       | boolean  | Has 'speakable' property for voice search                        |
| `aeo_checks.identity_verified` | boolean  | Has Organization or Person schema                                |
| `opportunities`                | string[] | Actionable suggestions to improve score                          |

---

## Competitive Advantages

### vs Google Rich Results Test

- ✅ **We show ALL schemas**, not just rich result eligible ones
- ✅ **Entity linking analysis** (unique to Texavor)
- ✅ **Voice search readiness** check

### vs Schema.org Validator

- ✅ **GEO scoring algorithm** (not just pass/fail)
- ✅ **Actionable opportunities** (what to add next)
- ✅ **Free, no signup required**

---

## Upsell Triggers

Show upgrade CTA when:

- `score < 70`
- `aeo_checks.aeo_type_found === false`
- `opportunities.length > 2`

**Message**: "Automatically generate optimized schema with Texavor Pro. Get Article, FAQPage, and HowTo schemas in one click."
