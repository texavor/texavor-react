# Frontend Guide: GEO Schema Validator (Tool 6)

## 1. SEO Strategy

Targeting the emerging market of "Generative Engine Optimization" and "AI Search Optimization".

- **Primary Keyword:** "GEO Schema Validator"
- **Secondary Keywords:** "Optimize for ChatGPT", "Generative Engine Optimization Tools", "Voice Search Schema Check"
- **Meta Title:** Free GEO Schema Validator | Optimize for ChatGPT & SGE
- **Meta Description:** Is your content ready for AI search? Analyze your Schema Markup for Generative Engine Optimization (GEO) readiness. Test for Voice, Entities, and JSON-LD health.

## 2. API Integration

**Endpoint:** `GET /api/v1/public/tools/analyze_aeo`
**Protection:** Requires `X-Turnstile-Token` header.

**Request:**

```http
GET /api/v1/public/tools/analyze_aeo?url=https://texavor.com/blog/what-is-aeo
X-Turnstile-Token: <token>
```

**Response (200 OK):**

```json
{
  "url": "https://texavor.com/blog/what-is-aeo",
  "domain": "texavor.com",
  "score": 85,
  "grade": "A",
  "detected_types": ["Article", "Organization", "FAQPage"],
  "schema_health": "good",
  "aeo_checks": {
    "schema_found": true,
    "syntax_valid": true,
    "aeo_type_found": true,
    "entity_linking": "Strong (4 props)",
    "voice_ready": false,
    "identity_verified": true
  },
  "opportunities": [
    "Add 'speakable' property to target Voice Search / Smart Assistants."
  ]
}
```

**Error Response:**

```json
{ "error": "Analysis failed: Could not fetch URL" }
```

## 3. UI Implementation

- **Hero Input:** Large URL input field with "Analyze Readiness" button.
- **Score Gauge:**
  - Visual circle gauge for `score` (0-100).
  - Color coded: Red (0-49), Yellow (50-79), Green (80-100).
  - Display `grade` ("A", "B", etc.) prominently.
- **Health Grid:** Display `aeo_checks` as a grid of cards.
  - ✅ **Schema Found**
  - ✅ **Entity Depth:** "Strong"
  - ❌ **Voice Ready:** "Missing"
- **Opportunity List:** "AI Improvement Plan"
  - Map `opportunities` string array to a checklist of suggested fixes.
- **Schema Helper (Bottom):** "Detected JSON-LD Types: [Badge] [Badge]..."

## 4. Schema Helper

Self-referential schema to describe the tool itself as a SoftwareApplication.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Texavor GEO Validator",
  "applicationCategory": "SEOApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript"
}
</script>
```
