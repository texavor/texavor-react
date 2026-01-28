# Frontend Guide: Brand Authority Checker (Tool 5)

## 1. SEO Strategy

Targeting "Free Domain Authority Checker" and high-value "Backlink Checker" intent.

- **Primary Keyword:** "Free Domain Authority Checker"
- **Secondary Keywords:** "Backlink Checker", "Website Traffic Estimator", "Domain Rank"
- **Meta Title:** Free Domain Authority Checker | Check DA, Backlinks & Traffic
- **Meta Description:** Get your Website Authority Score instantly. View total backlinks, referring domains, and organic traffic estimates. Powered by DataForSEO. (Limit: 3/Day).

## 2. API Integration

**Endpoint:** `POST /api/v1/public/tools/brand_authority`

**Request:**

```json
{
  "url": "https://www.texavor.com"
}
```

**Response (Success):**

```json
{
  "url": "https://www.texavor.com",
  "domain_authority": 45, // The 0-100 Score
  "metrics": {
    "backlinks": 12500, // Real Data
    "referring_domains": 320, // Real Data
    "organic_keywords": 5400, // Real Data
    "estimated_traffic": 1200 // Real Data
  },
  "trust_signals": {
    "ssl_secure": true,
    "has_sitemap": true
  },
  "usage": {
    "remaining": 2 // Countdown for user
  },
  "upsell": {
    "message": "Get full competitor analysis with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

**Response (Limit Reached - 429 Too Many Requests):**

```json
{
  "error": "Daily Limit Reached",
  "message": "You can only perform 3 Free Brand Authority checks per day. Please try again tomorrow or upgrade."
}
```

## 3. UI Implementation

- **Data Cards:** 4 Big Cards for the metrics:
  - **Authority Score:** (Radial Gauge)
  - **Backlinks:** (Number with icon)
  - **Keywords:** (Number with icon)
  - **Traffic:** (Number with icon)
- **Limit Counter:** Show a subtle banner: "Free Checks Remaining Today: 2/3".
- **Error State:** If 429 is returned, show a "Limit Exceeded" modal with a "Get Unlimited Access" button leading to `/pricing`.

## 4. Schema Markup

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Texavor Domain Authority Checker",
  "applicationCategory": "SEO Application",
  "description": "Free tool to check Domain Authority, Backlinks, and Traffic. Powered by DataForSEO."
}
</script>
```
