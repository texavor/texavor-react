# Tool Guide: Direct Answer Optimizer (Featured Snippet Tool)

**Target Audience**: Content Marketers, SEO Specialists, Answer Engine Optimizers.
**Goal**: Help content rank for "Position Zero" (Featured Snippets) and AI-driven direct answers.

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/direct_answer
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
  "url": "https://www.texavor.com/blog/what-is-aeo",
  "score": 85,
  "grade": "A",
  "opportunities": [
    {
      "header": "What is Answer Engine Optimization?",
      "issue": "Answer is too long (85 words). Aim for 40-60 words for AI snippets.",
      "severity": "high",
      "suggestion": "Condense the definition into 2-3 concise sentences immediately following the header."
    },
    {
      "header": "How to optimize for AEO?",
      "issue": "No structured list detected immediately following this 'How-to' question.",
      "severity": "medium",
      "suggestion": "Use a numbered list (ol) or bullet points (ul) for step-by-step instructions."
    }
  ],
  "good_examples": [
    {
      "header": "Who uses AEO?",
      "answer": "Digital marketers, SEO specialists, and content creators use AEO to ensure their content is discoverable by AI engines like ChatGPT and Perplexity...",
      "status": "Perfect Length (48 words)",
      "type": "paragraph"
    }
  ],
  "schema_status": {
    "has_faq": true,
    "has_howto": false,
    "has_speakable": false,
    "recommendation": "Add HowTo schema for step-by-step answers to improve rich snippet eligibility."
  },
  "upsell": {
    "message": "Auto-generate Featured Snippet content with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

---

## Frontend Implementation

### 1. API Call (React/TypeScript)

```typescript
interface DirectAnswerResult {
  score: number;
  grade: string;
  opportunities: Array<{
    header: string;
    issue: string;
    severity: "critical" | "high" | "medium";
    suggestion: string;
  }>;
  good_examples: Array<{
    header: string;
    answer?: string;
    status: string;
    type: string;
  }>;
  schema_status: {
    has_faq: boolean;
    has_howto: boolean;
    has_speakable: boolean;
    recommendation: string;
  };
}

const analyzeDirectAnswers = async (url: string) => {
  const response = await axios.post("/api/v1/public/tools/direct_answer", {
    url,
  });
  return response.data;
};
```

### 2. UI Components

#### Direct Answer Score Card

```tsx
const DirectAnswerScore = ({ data }: { data: DirectAnswerResult }) => {
  return (
    <div className="p-6 rounded-lg bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
            {data.score}/100
          </h2>
          <p className="text-sm text-indigo-700/70 dark:text-indigo-300/70">
            Snippet Optimization Grade: {data.grade}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-indigo-200 dark:border-indigo-500/30">
          <span className="text-xl font-bold text-indigo-600">
            {data.grade}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-indigo-900/40 dark:text-indigo-100/40 uppercase tracking-wider">
          Schema Health
        </label>
        <div className="flex gap-2">
          <Badge variant={data.schema_status.has_faq ? "success" : "outline"}>
            FAQ
          </Badge>
          <Badge variant={data.schema_status.has_howto ? "success" : "outline"}>
            HowTo
          </Badge>
          <Badge
            variant={data.schema_status.has_speakable ? "success" : "outline"}
          >
            Speakable
          </Badge>
        </div>
        <p className="text-xs text-indigo-800 dark:text-indigo-200 mt-2">
          {data.schema_status.recommendation}
        </p>
      </div>
    </div>
  );
};
```

---

## Optimization Rules (Buried Answers)

The tool applies the following logic to identify "Position Zero" opportunities:

1. **Question Detection**: Scans for `<h2>` and `<h3>` tags that end in `?` or start with Who, What, Where, When, Why, How.
2. **Immediate Answer Rule**: The core answer should appear in the _next_ block level element.
3. **Word Count Focus**:
   - **Paragraph Snippets**: 40-60 words is the "Goldilocks Zone".
   - **List Snippets**: Detects if "How-to" questions lead to `<ol>` or `<ul>`.
4. **Keyword Proximity**: Checks if the answer contains relevant terminology from the header.

---

## SEO Strategy

### Primary Keywords

- **Target**: "featured snippet optimizer", "position zero tool", "direct answer checker"
- **GEO Angle**: "AI answer optimization", "generative engine direct answers"

### URL

- `/tools/featured-snippet-optimizer` (SEO friendly name)

---

## Competitive Advantage

Unlike generic SEO checkers, this tool focuses exclusively on the **Structure-Answer Relationship**.

- ✅ Detects "No Answer" headers.
- ✅ Analyzes formatting (List vs Paragraph).
- ✅ Validates schema types specifically for direct answers.
