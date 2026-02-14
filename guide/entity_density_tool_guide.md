# Tool Guide: Entity Density Analyzer

**Target Audience**: SEO Specialists, Content Strategists, Knowledge Graph Optimizers.
**Goal**: Analyze entity distribution and salience for modern semantic SEO.

---

## API Reference

### Endpoint

```
POST /api/v1/public/tools/entity_density
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
  "entity_score": 78,
  "grade": "B",
  "total_entities": 24,
  "entity_breakdown": {
    "organizations": 8,
    "people": 3,
    "products": 6,
    "locations": 7
  },
  "top_entities": [
    {
      "name": "Google",
      "type": "organization",
      "mentions": 12,
      "salience": 0.85,
      "first_mention_position": "early",
      "in_title": true,
      "in_headings": true
    },
    {
      "name": "ChatGPT",
      "type": "product",
      "mentions": 8,
      "salience": 0.72,
      "first_mention_position": "early",
      "in_title": false,
      "in_headings": true
    },
    {
      "name": "United States",
      "type": "location",
      "mentions": 3,
      "salience": 0.45,
      "first_mention_position": "middle",
      "in_title": false,
      "in_headings": false
    }
  ],
  "entity_signals": [
    {
      "type": "high_entity_diversity",
      "severity": "positive",
      "message": "Good variety of entity types (organizations, products, locations)"
    },
    {
      "type": "prominent_positioning",
      "severity": "positive",
      "message": "Key entities appear in title and headings"
    },
    {
      "type": "entity_stuffing_risk",
      "severity": "warning",
      "message": "'Google' mentioned 12 times (5% of content) - may appear over-optimized"
    }
  ],
  "recommendations": [
    "Add schema markup with 'mentions' and 'about' properties for top entities",
    "Link entity mentions to Wikipedia/Wikidata for knowledge graph connections",
    "Consider reducing 'Google' mentions to 8-10 for more natural distribution"
  ],
  "schema_status": {
    "has_mentions": false,
    "has_about": false,
    "has_same_as": false,
    "message": "No entity-linking schema detected"
  },
  "upsell": {
    "message": "Auto-generate entity-rich schema with Texavor Pro.",
    "cta_link": "/pricing"
  }
}
```

---

## Frontend Implementation

### 1. API Call (React/TypeScript)

```typescript
interface EntityDensityResult {
  entity_score: number;
  grade: string;
  total_entities: number;
  entity_breakdown: {
    organizations: number;
    people: number;
    products: number;
    locations: number;
  };
  top_entities: Array<{
    name: string;
    type: string;
    mentions: number;
    salience: number;
    in_title: boolean;
    in_headings: boolean;
  }>;
  recommendations: string[];
}

const analyzeEntityDensity = async (url: string) => {
  const response = await axios.post("/api/v1/public/tools/entity_density", {
    url,
  });
  return response.data;
};
```

### 2. UI Components

#### Entity Score Card

```tsx
const EntityScoreCard = ({ data }: { data: EntityDensityResult }) => {
  const { entity_score, grade, total_entities, entity_breakdown } = data;

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-5xl font-bold text-indigo-700">
            {entity_score}
          </div>
          <div className="text-sm text-gray-600">
            Entity Salience Grade: {grade}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">
            {total_entities}
          </div>
          <div className="text-xs text-gray-500">Total Entities</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4 text-center text-sm">
        <div>
          <div className="font-bold text-blue-600">
            {entity_breakdown.organizations}
          </div>
          <div className="text-xs text-gray-500">Orgs</div>
        </div>
        <div>
          <div className="font-bold text-green-600">
            {entity_breakdown.people}
          </div>
          <div className="text-xs text-gray-500">People</div>
        </div>
        <div>
          <div className="font-bold text-orange-600">
            {entity_breakdown.products}
          </div>
          <div className="text-xs text-gray-500">Products</div>
        </div>
        <div>
          <div className="font-bold text-red-600">
            {entity_breakdown.locations}
          </div>
          <div className="text-xs text-gray-500">Locations</div>
        </div>
      </div>
    </div>
  );
};
```

#### Top Entities Table

```tsx
const TopEntitiesTable = ({ entities }: { entities: any[] }) => {
  const getTypeColor = (type: string) => {
    const colors = {
      organization: "blue",
      person: "green",
      product: "orange",
      location: "red",
    };
    return colors[type] || "gray";
  };

  const getSalienceBar = (salience: number) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${salience > 0.7 ? "bg-green-500" : salience > 0.4 ? "bg-yellow-500" : "bg-gray-400"}`}
        style={{ width: `${salience * 100}%` }}
      />
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Entity</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-center">Mentions</th>
            <th className="px-4 py-2 text-left">Salience</th>
            <th className="px-4 py-2 text-center">Signals</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{entity.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 bg-${getTypeColor(entity.type)}-100 text-${getTypeColor(entity.type)}-700 rounded text-xs`}
                >
                  {entity.type}
                </span>
              </td>
              <td className="px-4 py-3 text-center font-bold">
                {entity.mentions}
              </td>
              <td className="px-4 py-3">
                {getSalienceBar(entity.salience)}
                <span className="text-xs text-gray-500 ml-2">
                  {(entity.salience * 100).toFixed(0)}%
                </span>
              </td>
              <td className="px-4 py-3 text-center space-x-1">
                {entity.in_title && <span title="In title">📄</span>}
                {entity.in_headings && <span title="In headings">📌</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## SEO Strategy

### Primary Keywords

- **Primary**: "entity density", "entity SEO tool", "entity analysis"
- **Secondary**: "named entity recognition", "knowledge graph seo", "semantic seo checker"
- **Long-tail**: "check entity density online", "entity salience analyzer"

### Meta Tags

- **Title**: `Free Entity Density Analyzer - Entity SEO Tool | Texavor`
- **Description**: `Analyze entity salience, detect knowledge graph opportunities, and optimize for semantic SEO. Check entity distribution and get schema markup recommendations. Free tool.`

### URL

- `/tools/entity-density-analyzer`

---

## Entity Salience Scoring Algorithm

### Salience Formula

```
Salience Score (0-1) =
  (0.30 × position_score) +      # Early mentions = higher salience
  (0.25 × frequency_score) +     # More mentions = higher salience
  (0.20 × title_bonus) +         # In title = significant boost
  (0.15 × heading_bonus) +       # In headings = moderate boost
  (0.10 × context_score)         # Surrounded by related entities
```

### Overall Entity Score (0-100)

```
Base Score: 70

Bonuses:
+ High diversity (4+ types):      +15 points
+ Top entity salience > 0.7:      +10 points
+ Entities in title/headings:     +10 points
+ Schema markup present:          +5 points

Deductions:
- Entity stuffing (>5% density): -15 points
- Low diversity (<2 types):      -10 points
- No prominent entities:         -10 points
```

---

## Entity Detection Logic

### 1. Organization Detection

```ruby
 KNOWN_ORGS = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'OpenAI', 'Anthropic']

# Capitalized multi-word phrases ending in org indicators
text.scan(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Inc|Corp|LLC|Ltd|Company|Co)\b)/)

# Known organizations
KNOWN_ORGS.each do |org|
  count = text.scan(/\b#{Regexp.escape(org)}\b/).size
  entities << { name: org, type: 'organization', mentions: count }
end
```

### 2. Person Detection

```ruby
# Title + Full Name pattern
text.scan(/\b((?:Mr|Ms|Dr|Prof)\.?\s+[A-Z][a-z]+\s+[A-Z][a-z]+)\b/)

# Capitalized first and last name
text.scan(/\b([A-Z][a-z]{2,}\s+[A-Z][a-z]{2,})\b/)
```

### 3. Product Detection

```ruby
KNOWN_PRODUCTS = ['ChatGPT', 'GPT-4', 'Gemini', 'Claude', 'Perplexity', 'WordPress', 'Shopify']

KNOWN_PRODUCTS.each do |product|
  count = text.scan(/\b#{Regexp.escape(product)}\b/i).size
  entities << { name: product, type: 'product', mentions: count }
end
```

### 4. Location Detection

```ruby
KNOWN_LOCATIONS = ['United States', 'USA', 'UK', 'Europe', 'Asia', 'California', 'New York', 'London']

KNOWN_LOCATIONS.each do |location|
  count = text.scan(/\b#{Regexp.escape(location)}\b/).size
  entities << { name: location, type: 'location', mentions: count }
end
```

---

## Competitive Advantages

### vs Manual NER Tools

- ✅ **URL-based analysis** (no copy/paste needed)
- ✅ **Salience scoring** (not just entity list)
- ✅ **SEO-specific recommendations** (schema markup, knowledge graph)

### vs Google NLP API

- ✅ **Free** (no API costs)
- ✅ **Instant results** (no API latency)
- ✅ **SEO context** (entity stuffing detection)

---

## Upsell Triggers

Show upgrade CTA when:

- `entity_score < 70`
- `schema_status.has_mentions === false`
- Top entity salience < 0.5

**Message**: "Auto-generate entity-rich schema with Texavor Pro. Add 'mentions', 'about', and 'sameAs' properties to connect your content to the knowledge graph."
