# Texavor: Product Identity & Strategy Guide

This document defines Texavor's core identity, our stance against mass AI content generation, and how our feature set (reflected in our routing and architecture) supports our mission: **to help writers build true, lasting authority in the AI search era (GEO).**

---

## 1. The Core Problem & Motivation

The shift from traditional search (Google) to AI-driven search (ChatGPT, Gemini, Perplexity) has changed how content is discovered.

- Traditional SEO relied on volume, backlinks, and keyword density.
- Generative Engine Optimization (GEO) relies on **citations, factual depth, entity density, and semantic credibility**.

**The Reddit Feedback Validation:**
Early feedback from founders and marketers (IndieHackers, SaaS subreddits) highlights a critical issue: people know traffic is changing, but "GEO" feels abstract. They don't just want an "AI tool"—they want proof that their content will be cited and drive traffic. They are highly skeptical of tools that "look completely AI written."

**Our Motivation:**
Texavor exists to bridge this gap. We provide the deeply analytical, research-heavy tools required to make content "citation-worthy" for AI engines, without replacing the human writer's unique voice.

---

## 2. Our Stance: We Are Not a Mass-Content Generator

There are hundreds of tools that will spin up 100 generic blog posts from a single keyword. **Texavor is explicitly not one of them.**

- **We do NOT:** Offer "1-click blog generation" that bypasses human review.
- **We do NOT:** Encourage spamming databases with low-quality, generic text.
- **We do NOT:** Act as a citation tracker. While we optimize your content to _get_ cited by AI engines, we do not currently provide a dashboard that proves exactly which AI cited you and when.
- **We DO:** Provide intensive research, structuring, and analysis tools so _humans_ can write content that AI engines trust enough to cite.

Our platform is an **Authority Engine**, not a content spinner. We act as an exoskeleton for serious writers.

---

## 3. How Our Architecture Supports This Stance

A review of our `config/routes.rb` reveals exactly how we approach content creation. Our toolset is split into discrete, research-focused phases:

### Phase 1: Discovery & Strategy (Not Blind Generation)

Instead of just guessing keywords, we provide deep discovery tools to find where authority can be built:

- `keyword_discoveries`
- `competitors` & `competitors/analyses` (Deep dives into what the competition is missing)
- **Public Free Tools:** Keyword analyzers, AEO audits, and Website audits to act as top-of-funnel proof points.

### Phase 2: Structuring & Research

Before a single word of the final article is written, we help build the skeleton:

- `topic_generation` & `outline_generation`
- `recent_searches` & `saved_results` (to build a library of research)

### Phase 3: The "Analytic" Writing Process

When an article is being drafted (`articles` resource), we surround it with analytical tools to ensure it meets GEO standards. This is where the magic happens:

- **Article Analyses:** Scoring content on readability, grammar, and SEO depth.
- **Link Suggestions:** Semantically matching internal/external links to build credibility.
- **Micro-Tools:** (Available via `/api/v1/public/tools/`)
  - `topical_authority` & `brand_authority`
  - `content_audit` & `content_freshness`
  - `schema_validator` & `faq_schema_generator`
  - `direct_answer` & `citation_validator`
  - `entity_density` & `table_scanner`
  - `fact_check_scanner` & `social_credibility`

These tools prove our stance: we care about the _anatomy_ of the article (entities, schemas, facts, citations) much more than just the word count.

### Phase 4: Distribution & Repurposing

Once the high-quality, human-driven piece is ready, we help maximize its ROI:

- `repurposing` (Transforming the core piece for LinkedIn, Twitter, Reddit)
- `integrations` (Shopify, etc.) and `publications`

---

## 4. Addressing the "Trust Deficit" (Next Steps based on Feedback)

To overcome the skepticism highlighted by Reddit users, we must align our marketing with our technical reality:

1.  **Concrete Value over Abstract Concepts:** Stop selling "The GEO Era" and start selling "Get your startup cited by ChatGPT." (Be transparent that while we help achieve this, we don't _track_ the citations yet—we are the engine that gets you there).
2.  **Show the Anatomy:** Use our micro-tools (like `entity_density` or `citation_validator`) visibly on the landing page to _prove_ we aren't just a generic text wrapper. Show a "Before and After" of a plain article vs. a Texavor-optimized article.
3.  **Deploy the Stats:** We recently built a `/api/v1/public/stats` endpoint. We must use this data (Articles Analyzed, Avg Content Score, Public Tool Uses) prominently to build immediate trust and social proof.
4.  **UI/UX:** Move away from generic, "AI-generated" aesthetics to a rigorous, data-heavy, professional interface that says "Analysis & Research," not "Magic Output."
