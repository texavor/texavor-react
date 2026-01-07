# API Guide: Feature 6 - Website AI Auditor

**Endpoint:** `GET /api/v1/public/tools/analyze_website`
**Auth:** None (Public)
**Description:** A "Health Check" tool that specifically audits a domain's technical readiness for AI Search Agents (Crawlers, RAG, and Entity Understanding).

---

## 1. Request Parameters

| Param | Type     | Required | Description                                            |
| :---- | :------- | :------- | :----------------------------------------------------- |
| `url` | `string` | **Yes**  | The full URL or domain to audit (e.g., `texavor.com`). |

### cURL Example

```bash
curl "https://api.easywrite.com/api/v1/public/tools/analyze_website?url=texavor.com"
```

---

## 2. Response Structure

The response provides a composite "Readiness Score", a Letter Grade, and distinct checks for 4 key areas: **Safety** (Robots), **Discovery** (Sitemap/RSS), **Semantics** (Schema), and **Freshness** (Content Age).

```json
{
  "domain": "texavor.com",
  "ai_readiness_score": 88,
  "grade": "A",

  // SECTION 1: Traffic Light Checks (Use Icons: Green/Yellow/Red)
  "checks": {
    "robots_txt": {
      "status": "pass",
      "message": "Open for AI Crawlers"
    },
    "sitemap": {
      "status": "pass",
      "message": "Sitemap Found"
    },
    "rss_feed": {
      "status": "warning",
      "message": "No RSS Feed found"
    },
    "content_density": {
      "status": "pass",
      "value": "45%",
      "message": "Good text-to-code ratio"
    },
    "schema_health": {
      "status": "pass",
      "message": "Found Date/Author schema on 10/10 articles."
    }
  },

  // SECTION 2: Radar Chart Data (0-100 Scale)
  "radar_chart": [
    { "subject": "Crawlability", "A": 100, "fullMark": 100 }, // Is robots.txt open?
    { "subject": "Discovery", "A": 50, "fullMark": 100 }, // Are sitemap/RSS present?
    { "subject": "Semantics", "A": 100, "fullMark": 100 }, // Is Schema.org used?
    { "subject": "Freshness", "A": 90, "fullMark": 100 } // Are dates recent?
  ],

  "samples_analyzed": 10
}
```

---

## 3. Frontend Implementation Guide (React)

### A. The "Traffic Light" Check List

Display the `checks` object as a list of status items.

**Logic:**

- `status: 'pass'` -> Green Check Icon
- `status: 'warning'` -> Yellow Alert Icon
- `status: 'fail'` -> Red X Icon

```tsx
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const StatusIcon = ({ status }) => {
  if (status === "pass") return <CheckCircle className="text-green-500" />;
  if (status === "fail") return <XCircle className="text-red-500" />;
  return <AlertTriangle className="text-yellow-500" />;
};

const AuditList = ({ checks }) => (
  <div className="space-y-4">
    {Object.entries(checks).map(([key, check]) => (
      <div
        key={key}
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
      >
        <StatusIcon status={check.status} />
        <div className="flex-1">
          <span className="font-medium capitalize">
            {key.replace("_", " ")}
          </span>
          <p className="text-sm text-gray-500">{check.message}</p>
        </div>
        {check.value && <span className="font-bold">{check.value}</span>}
      </div>
    ))}
  </div>
);
```

### B. The Readiness Radar

Use the same `RadarChart` component used in the Keyword Tool. The data format is identical (`subject`, `A`, `fullMark`).

```tsx
<RadarChart outerRadius={90} width={300} height={250} data={data.radar_chart}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={30} domain={[0, 100]} />
  <Radar
    name="AI Readiness"
    dataKey="A"
    stroke="#10b981"
    fill="#10b981"
    fillOpacity={0.6}
  />
</RadarChart>
```
