# API Guide: Free AI Visibility Calculator

**Endpoint:** `GET /api/v1/public/tools/analyze_keyword`
**Auth:** None (Public)
**Rate Limit:** 10 requests / IP / hour

## 1. Request

**Parameters:**

| Param     | Type     | Required | Description                                    |
| :-------- | :------- | :------- | :--------------------------------------------- |
| `keyword` | `string` | **Yes**  | The blog topic/keyword to analyze.             |
| `website` | `string` | No       | User's website URL (used for personalization). |

**Example:**

```bash
curl "https://api.easywrite.com/api/v1/public/tools/analyze_keyword?keyword=how+to+bake+sourdough&website=myblog.com"
```

---

## 2. Response Structure

The API returns a JSON object optimized for frontend rendering (Radar Charts).

```json
{
  "keyword": "how to bake sourdough",
  "website": "myblog.com",
  "overall_score": 85,
  "grade": "A",
  "radar_chart_data": [
    { "subject": "Question Intent", "A": 100, "fullMark": 100 },
    { "subject": "Format Power", "A": 80, "fullMark": 100 },
    { "subject": "Topic Depth", "A": 60, "fullMark": 100 },
    { "subject": "Authority Potential", "A": 100, "fullMark": 100 }
  ],
  "breakdown": [
    {
      "label": "Question Intent",
      "status": "pass", // "pass" | "fail" | "warning"
      "message": "Perfect! Questions are AI-candy."
    }
    // ... more items
  ],
  "viral_hook": {
    "share_text": "I scored 85/100 on the Neil Patel AI Visibility Test! Check yours:",
    "url": "https://easywrite.com/tools/ai-score"
  },
  "upsell": {
    "title": "Want accurate Search Volume & Difficulty Data?",
    "cta": "Unlock Full Dashboard",
    "locked_data": ["Search Volume", "Keyword Difficulty", "CPC Cost"]
  }
}
```

---

## 3. Frontend Integration (React/TypeScript)

### Types

```typescript
interface RadarPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface BreakdownItem {
  label: string;
  status: "pass" | "fail" | "warning";
  message: string;
}

interface AnalysisResult {
  keyword: string;
  website: string;
  overall_score: number;
  grade: string;
  radar_chart_data: RadarPoint[];
  breakdown: BreakdownItem[];
  viral_hook: {
    share_text: string;
    url: string;
  };
}
```

### Visualizing the Radar Chart (Recharts)

Install Recharts: `npm install recharts`

```tsx
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const AiScoreChart = ({ data }: { data: RadarPoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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
    </ResponsiveContainer>
  );
};
```
