# Frontend Guide: Featured Snippet Optimizer (Tool 4)

## 1. SEO Strategy

Targeting "Featured Snippet Tool" and "Position Zero" intent.

- **Primary Keyword:** "Featured Snippet Optimization Tool"
- **Secondary Keywords:** "Rank Zero Checker", "Snippet Length Checker", "Google Answer Box Tool"
- **Meta Title:** Free Featured Snippet Optimizer | Win Google's Position Zero
- **Meta Description:** Check if your content is optimized for Google Featured Snippets. Auto-detects Paragraph vs List format and checks length, readability, and question matching.

## 2. API Integration

**Endpoint:** `POST /api/v1/public/tools/snippet_optimizer`

**Request:**

```json
{
  "keyword": "how to bake a cake",
  "text": "To bake a cake, first preheat your oven. Then mix flour and sugar..."
}
```

**Response:**

```json
{
  "detected_type": "Paragraph",
  "score": 85,
  "readability": {
    "grade_level": "Middle School (Perfect)",
    "avg_sentence_length": 14.5
  },
  "keyword_found": true,
  "analysis": {
    "type": "Paragraph",
    "word_count": 45,
    "length_status": "Perfect Length",
    "structure_tip": "Ensure the answer starts immediately in the first sentence."
  },
  "upsell": {
    "message": "Use our AI Writer to auto-generate perfect snippets.",
    "cta_link": "/pricing"
  }
}
```

## 3. UI Implementation

- **Score Card:** Radial Gauge (0-100).
- **Type Badge:** Show "Detected Type: Paragraph" (or List/Table) prominently.
- **Traffic Light System:**
  - **Length:** Green if 40-60 words (Paragraph) or 4-8 items (List). Red otherwise.
  - **Readability:** Green if "Middle School". Red if "College".
  - **Keyword:** Green checkmark if "Keyword found in text".
- **Visual Preview:** Render the text inside a mock "Google Search Result Box" to show the user how it looks.

## 4. Schema Markup

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Texavor Featured Snippet Optimizer",
  "applicationCategory": "SEO Application",
  "description": "Analyze and optimize content to win Google Featured Snippets."
}
</script>
```
