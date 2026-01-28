# Frontend Guide: FAQ Schema Generator (Tool 3)

## 1. SEO Strategy

Targeting high-volume "Schema Generator" intent.

- **Primary Keyword:** "FAQ Schema Generator"
- **Secondary Keywords:** "JSON-LD Generator", "Schema Markup Tool"
- **Meta Title:** Free FAQ Schema Generator | JSON-LD & Microdata Creator
- **Meta Description:** Instantly generate Google-compliant FAQ Schema. Type your questions or auto-extract them from any URL. 100% Free.

## 2. API Integration

**Endpoint:** `POST /api/v1/public/tools/faq_schema_generator`

**Mode A: Manual Input**

```json
{
  "qa_pairs": [
    {
      "question": "What is SEO?",
      "answer": "SEO stands for Search Engine Optimization."
    },
    { "question": "Is it free?", "answer": "Yes, this tool is 100% free." }
  ]
}
```

**Mode B: Auto-Extract (The "Wow" Feature)**

```json
{
  "url": "https://example.com/my-faq-page"
}
```

**Response:**

```json
{
  "source": "URL Extraction",
  "qa_count": 2,
  "qa_pairs": [ ... ],
  "json_ld": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [ ... ]
  },
  "microdata": "<div itemscope...>",
  "validation_tool_url": "https://search.google.com/test/rich-results"
}
```

## 3. UI Implementation

- **Tabs:** Allow user to switch between "Manual Input" and "Import from URL".
- **Code Block:** Display `json_ld` in a syntax-highlighted code block (Prism.js).
- **Copy Button:** "Copy JSON-LD" button.
- **Microdata Toggle:** "Need HTML Microdata?" toggle to show the `microdata` string.
- **Preview:** Render the Q&A pairs in a Google-like accordion style to show "How it looks in search".
- **Validate:** "Test in Google" button that opens `validation_tool_url` in a new tab.

## 4. Schema Helper

We _use_ schema to _generate_ schema. Meta!

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Texavor FAQ Schema Generator",
  "applicationCategory": "SEOUtility",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```
