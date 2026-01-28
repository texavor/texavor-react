# Frontend Guide: Content Audit Tool (Tool 2)

## 1. SEO Strategy

Targeting "Content Audit" and "SEO Check" intent.

- **Primary Keyword:** "Content Audit Tool"
- **Secondary Keywords:** "Free SEO Checker", "Website Content Scan", "Page Health Check"
- **Meta Title:** Free Content Audit Tool | Check SEO Health & Quality Instantly
- **Meta Description:** Scan any URL to identify technical errors, thin content, and missing metadata. Get a free health score and 100% actionable fix list.

## 2. API Integration

**Endpoint:** `POST /api/v1/public/tools/content_audit`

**Request:**

```json
{
  "url": "https://example.com/blog/my-post"
}
```

**Response:**

```json
{
  "url": "https://example.com/blog/my-post",
  "health_score": 85,
  "analysis": {
    "technical": {
      "load_time_seconds": 0.45,
      "html_size_kb": 22.5,
      "title_present": true,
      "meta_description_present": true
    },
    "on_page": {
      "title": { "value": "My Post", "status": "Too Short" },
      "h1_match_title": "Exact Match"
    },
    "content_quality": {
      "word_count": 1200,
      "content_status": "Comprehensive",
      "readability_check": "Good"
    },
    "structure": {
      "header_count": 8,
      "missing_alt_tags": 2,
      "internal_links": 5
    }
  },
  "upsell": {
    "message": "Get automated weekly audits for your entire site.",
    "cta_link": "/pricing"
  }
}
```

## 3. UI Implementation

- **Score Card:** Large radial gauge for `health_score`. Color code:
  - 0-50: Red (Critical)
  - 51-80: Orange (Needs Improvement)
  - 81-100: Green (Healthy)
- **Fix List:** Display items with "Negative" status (e.g., "Title Too Short", "Missing Alt Tags") as a todo list.
- **Visuals:** Use icons for checks (✅) and warnings (⚠️).

## 4. Schema Markup (JSON-LD)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Texavor Content Audit Tool",
  "applicationCategory": "SEO Application",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free SEO content audit tool to analyze on-page factors, technical health, and content quality."
}
</script>
```
