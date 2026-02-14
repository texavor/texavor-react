# Tool Guide: Citation Opportunities Finder

**Target Audience**: Content Marketers, SEO Specialists, Editors, Fact-Checkers.
**Goal**: Identify WHERE citations should be added to improve E-E-A-T and credibility.

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/citation_opportunities
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
  "citation_score": 68,
  "grade": "C",
  "total_opportunities": 12,
  "opportunity_breakdown": {
    "uncited_statistics": 5,
    "expert_claims": 3,
    "assertions": 2,
    "product_claims": 2
  },
  "opportunities": [
    {
      "type": "uncited_statistic",
      "severity": "critical",
      "text": "60% of search traffic will shift to AI by 2026",
      "context": "...according to industry analysis. 60% of search traffic will shift to AI by 2026, requiring new optimization...",
      "location": "paragraph 3",
      "suggestion": "Add citation to Gartner, Forrester, or recent SEO study",
      "suggested_sources": [
        "Gartner AI Search Report",
        "Forrester Search Trends 2026",
        "BrightEdge AI Search Study"
      ]
    },
    {
      "type": "expert_claim",
      "severity": "high",
      "text": "Experts recommend updating content monthly",
      "context": "...for best results. Experts recommend updating content monthly to maintain rankings...",
      "location": "paragraph 7",
      "suggestion": "Cite specific SEO authority or research paper"
    },
    {
      "type": "assertion",
      "severity": "medium",
      "text": "Google prioritizes fresh content",
      "context": "Recent algorithm updates show Google prioritizes fresh content over older articles.",
      "location": "paragraph 2",
      "suggestion": "Link to Google Search Central documentation or official blog post"
    },
    {
      "type": "product_claim",
      "severity": "medium",
      "text": "ChatGPT has 100 million users",
      "context": "ChatGPT has 100 million users making it the fastest-growing app in history.",
      "location": "paragraph 5",
      "suggestion": "Cite official OpenAI announcement or verified news source"
    }
  ],
  "e_e_a_t_impact": {
    "current_level": "Medium",
    "missing_citations": 12,
    "potential_level": "High",
    "message": "Adding 12 citations could significantly improve E-E-A-T score"
  },
  "recommendations": [
    "Prioritize citing the 5 uncited statistics",
    "Add sources for all expert recommendations",
    "Link product claims to official company announcements"
  ],
  "upsell": {
    "message": "Auto-find citation sources with Texavor Pro's AI Research Assistant.",
    "cta_link": "/pricing"
  }
}
```

---

## Frontend Implementation

### 1. API Call (React/TypeScript)

```typescript
interface CitationOpportunity {
  type: string;
  severity: "critical" | "high" | "medium";
  text: string;
  context: string;
  location: string;
  suggestion: string;
  suggested_sources?: string[];
}

interface CitationOpportunitiesResult {
  citation_score: number;
  grade: string;
  total_opportunities: number;
  opportunities: CitationOpportunity[];
  e_e_a_t_impact: {
    current_level: string;
    potential_level: string;
  };
}

const findCitationOpportunities = async (url: string) => {
  const response = await axios.post(
    "/api/v1/public/tools/citation_opportunities",
    { url },
  );
  return response.data;
};
```

### 2. UI Components

#### Opportunity Card

```tsx
const OpportunityCard = ({ opp }: { opp: CitationOpportunity }) => {
  const getSeverityColor = (severity: string) => {
    if (severity === "critical") return "red";
    if (severity === "high") return "orange";
    return "yellow";
  };

  const color = getSeverityColor(opp.severity);

  return (
    <div
      className={`border-l-4 border-${color}-500 bg-${color}-50 p-4 rounded`}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={`px-2 py-1 bg-${color}-100 text-${color}-700 text-xs rounded uppercase font-bold`}
        >
          {opp.severity}
        </span>
        <span className="text-xs text-gray-500">{opp.location}</span>
      </div>

      <div className="bg-white p-3 rounded mb-2">
        <p className="text-sm font-medium text-gray-800">"{opp.text}"</p>
        <p className="text-xs text-gray-500 mt-1">{opp.context}</p>
      </div>

      <div className="bg-blue-50 p-2 rounded">
        <strong className="text-xs text-blue-700">💡 Suggestion:</strong>
        <p className="text-sm text-blue-800">{opp.suggestion}</p>

        {opp.suggested_sources && opp.suggested_sources.length > 0 && (
          <ul className="mt-2 space-y-1">
            {opp.suggested_sources.map((source, idx) => (
              <li key={idx} className="text-xs text-blue-600">
                → {source}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
```

#### E-E-A-T Impact Meter

```tsx
const EEATImpactMeter = ({ impact }: { impact: any }) => {
  const levels = ["Low", "Medium", "High"];
  const getCurrentIndex = (level: string) => levels.indexOf(level);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
      <h3 className="font-semibold text-indigo-800 mb-4">
        E-E-A-T Impact Analysis
      </h3>

      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm text-gray-600">Current Level</div>
          <div className="text-2xl font-bold text-orange-600">
            {impact.current_level}
          </div>
        </div>
        <div className="text-3xl">→</div>
        <div>
          <div className="text-sm text-gray-600">Potential Level</div>
          <div className="text-2xl font-bold text-green-600">
            {impact.potential_level}
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded mt-4">
        <p className="text-sm text-gray-700">{impact.message}</p>
      </div>
    </div>
  );
};
```

---

## SEO Strategy

### Primary Keywords

- **Primary**: "citation opportunities", "where to add citations", "uncited claims checker"
- **Secondary**: "e-e-a-t checker", "content credibility tool", "fact check helper"
- **Long-tail**: "find claims that need sources", "improve content citations seo"

### Meta Tags

- **Title**: `Free Citation Opportunity Finder - Improve E-E-A-T | Texavor`
- **Description**: `Find uncited claims, statistics, and expert advice that need sources. Improve E-E-A-T and credibility with citation suggestions. Free tool.`

### URL

- `/tools/citation-opportunities`

---

## Detection Patterns

### 1. Uncited Statistics

```ruby
# Percentages without links
text.scan(/(\d+(?:\.\d+)?%[^.!?]{10,120}[.!?])/) do |match|
  sentence = match[0]
  # Check if sentence contains a link
  unless nearby_has_link?(sentence, content)
    opportunities << {
      type: 'uncited_statistic',
      severity: 'critical',
      text: sentence.strip
    }
  end
end

# "X out of Y" patterns
text.scan(/(\d+\s+(?:out of|in)\s+\d+[^.!?]{10,100}[.!?])/)
```

### 2. Expert Claims

```ruby
EXPERT_PHRASES = [
  'experts say',
  'experts recommend',
  'according to experts',
  'industry experts',
  'researchers found',
  'studies show',
  'research shows'
]

EXPERT_PHRASES.each do |phrase|
  text.scan(/(#{Regexp.escape(phrase)}[^.!?]{10,100}[.!?])/i) do |match|
    unless nearby_has_link?(match[0], content)
      opportunities << {
        type: 'expert_claim',
        severity: 'high',
        text: match[0].strip
      }
    end
  end
end
```

### 3. Assertions (Needs Verification)

```ruby
ASSERTION_VERBS = [
  'proves',
  'demonstrates',
  'shows that',
  'indicates',
  'confirms',
  'reveals'
]

ASSERTION_VERBS.each do |verb|
  text.scan(/((?:This|That|Research|Data)\s+#{Regexp.escape(verb)}[^.!?]{10,100}[.!?])/i)
end
```

### 4. Product/Company Claims

```ruby
# Numerical claims about products
text.scan(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+has\s+\d+(?:million|billion|k)[^.!?]{10,100}[.!?])/)

# Superlatives
text.scan(/((?:fastest|largest|most popular|best-selling)[^.!?]{10,100}[.!?])/i)
```

---

## Citation Score Algorithm

```
Base Score: 100

Deductions:
- Critical (uncited stat): -10 points each
- High (expert claim): -5 points each
- Medium (assertion): -3 points each
- Low (product claim): -2 points each

Bonuses:
+ All critical items cited: +15 points
+ <5 total opportunities: +10 points
```

---

## Competitive Advantages

### vs Manual Fact-Checking

- ✅ **Automated detection** (no manual review needed)
- ✅ **Severity ranking** (prioritize critical items)
- ✅ **Source suggestions** (actionable recommendations)

### vs Citation Validator

- ✅ **Proactive** (finds MISSING citations)
- ✅ **E-E-A-T focused** (not just link checking)
- ✅ **Content-specific** (understands claim types)

---

## Upsell Triggers

Show upgrade CTA when:

- `total_opportunities > 10`
- `opportunity_breakdown.uncited_statistics > 5`
- `citation_score < 70`

**Message**: "Auto-find citation sources with Texavor Pro's AI Research Assistant. Get verified sources for every claim in seconds."
