# Public Stats API — Frontend Integration Guide

A **no-auth, publicly accessible** endpoint that returns live platform-wide statistics. Ideal for powering social-proof sections on the landing page, hero sections, or marketing pages.

---

## Endpoint

```
GET /api/v1/public/stats
```

| Property          | Value                   |
| ----------------- | ----------------------- |
| Auth required     | ❌ None                 |
| Rate limited      | ❌ No                   |
| Turnstile captcha | ❌ No                   |
| Cache TTL         | ✅ 1 hour (server-side) |
| Response format   | `application/json`      |

---

## Full Response Shape

```json
{
  "articles_created": 1240,
  "articles_analyzed": 873,
  "words_processed": 5423100,
  "reading_minutes_generated": 27115,
  "outlines_generated": 642,
  "keywords_discovered": 318,
  "competitor_analyses_run": 204,
  "ai_visibility_scans": 95,
  "public_tool_uses": 14870,
  "countries_reached": 62,
  "avg_seo_score": 77,
  "avg_readability_score": 72,
  "cached_at": "2026-02-20T11:00:00.000Z",
  "cache_ttl_seconds": 3600
}
```

### Field Reference

| Field                       | Type     | Description                                                    |
| --------------------------- | -------- | -------------------------------------------------------------- |
| `articles_created`          | `number` | Total articles ever created on the platform                    |
| `articles_analyzed`         | `number` | Articles that went through AI SEO analysis                     |
| `words_processed`           | `number` | Sum of `word_count` across all articles                        |
| `reading_minutes_generated` | `number` | Sum of `reading_time` (minutes) across all articles            |
| `outlines_generated`        | `number` | AI content outlines generated                                  |
| `keywords_discovered`       | `number` | Completed keyword discovery sessions                           |
| `competitor_analyses_run`   | `number` | Deep competitor analyses performed                             |
| `ai_visibility_scans`       | `number` | GEO / AI visibility scans performed                            |
| `public_tool_uses`          | `number` | Total free public tool uses (all tools)                        |
| `countries_reached`         | `number` | Distinct countries using any public tool                       |
| `avg_seo_score`             | `number` | Average SEO score across all analyzed articles (0–100)         |
| `avg_readability_score`     | `number` | Average readability score across all analyzed articles (0–100) |
| `cached_at`                 | `string` | ISO 8601 timestamp of when the cache was last refreshed        |
| `cache_ttl_seconds`         | `number` | Cache lifetime in seconds (currently `3600`)                   |

---

## Integration — TanStack Query (Next.js / React)

### 1. Axios call (add to your existing `axiosInstance` or use `fetch`)

```ts
// lib/api/public-stats.ts
import axiosInstance from "@/lib/axios";

export interface PlatformStats {
  articles_created: number;
  articles_analyzed: number;
  words_processed: number;
  reading_minutes_generated: number;
  outlines_generated: number;
  keywords_discovered: number;
  competitor_analyses_run: number;
  ai_visibility_scans: number;
  public_tool_uses: number;
  countries_reached: number;
  avg_seo_score: number;
  avg_readability_score: number;
  cached_at: string;
  cache_ttl_seconds: number;
}

export const fetchPlatformStats = async (): Promise<PlatformStats> => {
  const { data } = await axiosInstance.get<PlatformStats>(
    "/api/v1/public/stats",
  );
  return data;
};
```

### 2. TanStack Query hook

```ts
// hooks/use-platform-stats.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPlatformStats } from "@/lib/api/public-stats";

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: fetchPlatformStats,
    // Re-fetch every hour — matches server cache TTL
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
```

### 3. Usage in a component

```tsx
// components/landing/StatsSection.tsx
import { usePlatformStats } from "@/hooks/use-platform-stats";

const formatNumber = (n: number) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export function StatsSection() {
  const { data: stats, isLoading } = usePlatformStats();

  const highlights = [
    {
      label: "Articles Analyzed",
      value: stats?.articles_analyzed,
      suffix: "+",
    },
    {
      label: "Words Processed",
      value: stats?.words_processed,
      suffix: "+",
    },
    {
      label: "Public Tool Uses",
      value: stats?.public_tool_uses,
      suffix: "+",
    },
    {
      label: "Countries Reached",
      value: stats?.countries_reached,
      suffix: "",
    },
    {
      label: "Avg SEO Score",
      value: stats?.avg_seo_score,
      suffix: "/100",
    },
    {
      label: "AI Visibility Scans",
      value: stats?.ai_visibility_scans,
      suffix: "+",
    },
  ];

  if (isLoading) {
    return <div className="animate-pulse ...">Loading stats...</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {highlights.map(({ label, value, suffix }) => (
          <div key={label} className="text-center">
            <p className="text-3xl font-bold">
              {value !== undefined ? `${formatNumber(value)}${suffix}` : "—"}
            </p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Display Tips

- **Format large numbers** with `Intl.NumberFormat` using `notation: "compact"` so `5,423,100` → `5.4M`.
- **Best stats to highlight publicly** (highest psychological impact):
  - `words_processed` — very large number, shows scale
  - `public_tool_uses` — shows traction
  - `articles_analyzed` — the core value prop
  - `countries_reached` — global reach / trust signal
  - `avg_seo_score` — quality signal (shows results)
- **Don't** show `cached_at` or `cache_ttl_seconds` to end users — those are internal meta fields.
- Use `skeleton` loaders while `isLoading` is `true`. Since the server caches for 1 hour, real users will almost never see a slow response.

---

## Notes

- This endpoint is **fully public** — no JWT, no cookies, no CORS issues.
- Server refreshes the cache every **1 hour**, so numbers update automatically without any frontend work.
- Numbers reflect **live production data** — not seeded or mocked.
