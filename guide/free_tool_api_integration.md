# API Guide: AI Visibility Calculator (Rich Dashboard)

**Endpoint:** `GET /api/v1/public/tools/analyze_keyword`
**Auth:** None (Public)
**Description:** Returns a complete "Neil Patel-style" dashboard dataset used to render the Free Tool landing page.

## 1. Response Structure

The response is designed to power 5 distinct UI widgets:

1.  **Summary Cards:** Search Volume, SEO Difficulty, etc.
2.  **Intent Radar:** A 4-axis chart showing "AI Search Intent".
3.  **AI Summary:** A generated paragraph summarizing the strategy.
4.  **Prompt Ideas:** Preset prompts for users to try.
5.  **Keyword Ideas:** Real Google Autocomplete suggestions.

### JSON Example

```json
{
  "keyword": "seo",
  "website": "your-site.com",
  "overall_score": 85,
  "grade": "A",

  // WIDGET 1: Metric Cards
  "metrics": {
    "search_volume": "10K",
    "search_volume_label": "HIGH",
    "seo_difficulty": 45,
    "seo_difficulty_label": "EASY",
    "backlinks": "100+",
    "cost_per_click": "$2.50"
  },

  // WIDGET 2: Radar Chart (Recharts)
  "radar_chart_data": [
    { "subject": "Informational", "A": 100, "fullMark": 100 },
    { "subject": "Commercial", "A": 80, "fullMark": 100 },
    { "subject": "Navigational", "A": 60, "fullMark": 100 },
    { "subject": "Transactional", "A": 90, "fullMark": 100 }
  ],

  // WIDGET 3: Text Summary
  "ai_summary": "High competition with 10K monthly searches. Action: Develop detailed guides...",

  // WIDGET 4: Prompt Ideas List
  "prompt_ideas": [
    "Best SEO tools for...",
    "How to optimize for...",
    "SEO vs SEM comparison..."
  ],

  // WIDGET 5: Google Autocomplete Results
  "keyword_ideas": [
    { "term": "seo services", "vol": "Unknown" },
    { "term": "seo tools", "vol": "Unknown" }
  ],

  // EXTRA NUMBERS (User Preference: "More Numbers, Less Words")
  "advanced_scores": {
    "ranking_probability": 78, // % Chance to rank
    "topic_authority": 60, // 0-100
    "click_potential": 92 // 0-100
  },

  "upsell": {
    "title": "Try Texavor for Deep Insights",
    "cta": "Start Free Trial",
    "locked_data": [
      "Search Volume",
      "Keyword Difficulty",
      "CPC Cost",
      "Competitor List"
    ]
  }
}
```

---

## 2. Frontend Implementation (React)

### A. Radar Chart (Recharts)

Use the `radar_chart_data` array directly.

```tsx
<RadarChart
  outerRadius={90}
  width={730}
  height={250}
  data={data.radar_chart_data}
>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={30} domain={[0, 100]} />
  <Radar
    name="AI Score"
    dataKey="A"
    stroke="#8884d8"
    fill="#8884d8"
    fillOpacity={0.6}
  />
</RadarChart>
```

### B. Metric Cards (The "Numbers" View)

Score Difficulty relies on color coding:

- **0-40 (Green):** Easy
- **41-70 (Yellow):** Medium
- **71-100 (Red):** Hard

```tsx
<div className="grid grid-cols-3 gap-4">
  <MetricCard label="SEO Difficulty" value={data.metrics.seo_difficulty} />
  <MetricCard
    label="Ranking Probability"
    value={`${data.advanced_scores.ranking_probability}%`}
  />
  <MetricCard
    label="Click Potential"
    value={data.advanced_scores.click_potential}
  />
</div>
```

### C. Prompt Ideas

Render as a copy-paste list.

```tsx
<ul>
  {data.prompt_ideas.map((prompt) => (
    <li key={prompt}>
      {prompt} <button onClick={() => copy(prompt)}>Copy</button>
    </li>
  ))}
</ul>
```
