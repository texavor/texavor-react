# Frontend Guide: Topical Authority Map Tool

## 1. SEO Strategy

This page is designed to rank for rising "Topical Authority" keywords.

- **Primary Keyword:** "Topical Authority Map"
- **Secondary Keywords:** "Topical Authority Checker", "SEO Cluster Tool", "Topic Cluster Generator"
- **Meta Title:** Free Topical Authority Map Generator | Build SEO Clusters Instantly
- **Meta Description:** Visualise your topical authority. Enter a keyword to generate a complete topic cluster map and content strategy for free. No signup required.

## 2. API Integration

**Endpoint:** `POST /api/v1/public/tools/topical_authority`

**Request:**

```json
{
  "topic": "technical seo"
}
```

**Response (Enhanced):**

```json
{
  "topic": "technical seo",
  "authority_score": 85,
  "total_subtopics": 150,
  "visual_graph": {
    "nodes": [
      {
        "id": "root",
        "type": "input",
        "data": { "label": "TECHNICAL SEO" },
        "position": { "x": 0, "y": 0 }
      },
      {
        "id": "cluster_0",
        "data": { "label": "Guides (12)" },
        "position": { "x": 250, "y": 0 }
      }
    ],
    "edges": [
      {
        "id": "e-root-cluster_0",
        "source": "root",
        "target": "cluster_0",
        "animated": true
      }
    ]
  },
  "content_gaps": ["Missing 'Comparison' content for technical seo"],
  "clusters": [
    {
      "name": "Guides",
      "count": 12,
      "total_volume": 4500,
      "keywords": [
        {
          "term": "technical seo guide",
          "volume": 1200,
          "intent": "Informational",
          "difficulty": "Medium"
        },
        {
          "term": "how to do technical seo",
          "volume": 800,
          "intent": "Informational",
          "difficulty": "Hard"
        }
      ]
    }
  ],
  "upsell": {
    "message": "Unlock deep-tier clusters and 500+ keywords.",
    "cta_link": "/pricing"
  }
}
```

## 3. UI Implementation Tips

- **Visual Graph:** Pass `visual_graph.nodes` and `visual_graph.edges` directly into **React Flow** component.
- **Intent Badges:** Use color coding for `intent`:
  - `Informational`: Blue Badge
  - `Commercial`: Green Badge (High Value)
  - `Transactional`: Purple Badge
- **Content Gaps:** Display these in a "Warning" alert box: "You are missing these key pillars..."
- **Visuals:** Display the "Clusters" as a mind-map or bubble chart.
- **Score:** Show `authority_score` as a radial gauge (0-100).
- **Loader:** Use a skeleton loader that says "Analyzing Google Autocomplete relationships..." to indicate real work.

## 4. Schema Markup (JSON-LD)

Inject this into the `<head>` of the page to get a "Software App" rich snippet.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Texavor Topical Authority Map",
  "applicationCategory": "SEO Application",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free tool to generate topical authority maps and keyword clusters for SEO strategy.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "120"
  }
}
</script>
```
