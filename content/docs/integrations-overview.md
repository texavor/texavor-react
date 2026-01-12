---
title: "The Content Orchestrator"
description: "Write once. Deploy to your Blog, Dev.to, and Medium in a single click."
date: "2026-01-08"
category: "platforms"
order: 0
---

Texavor's specialized **"Deploy"** engine treats your content like code. You push to multiple destinations, and we handle the SEO canonicals, image hosting, and formatting quirks for each platform.

![Placeholder for Screenshot: Deploy Modal showing multiple platforms selected]

## Supported Platforms

We currently support direct API integration with:

### 🟢 Zero-Config Platforms

- **[Dev.to](/docs/platforms/devto):** Native markdown support. (Tags, Collections).
- **[Hashnode](/docs/platforms/hashnode):** Full API support. (Custom Domain, Series).
- **[Medium](/docs/platforms/medium):** Content distribution. (Publications, Tags).

### � CMS Integrations

- **[WordPress](/docs/platforms/wordpress):** Post to your self-hosted WP site.
- **[Shopify](/docs/platforms/shopify):** Post to your e-commerce blog.
- **[Webflow](/docs/platforms/webflow):** Post to CMS Collections.

### 🔴 Advanced

- **[Custom Webhooks](/docs/platforms/custom-webhooks):** Trigger a specialized JSON payload to your own Next.js/Remix API.

## The "Canonical" Strategy

A major fear of cross-posting is **Duplicate Content Penalties**. Texavor solves this automatically.

1.  **Primary Destination:** You select one platform (usually your own blog) as "Primary".
2.  **Canonical Tag Injection:** When we push to Dev.to and Medium, we inject `<link rel="canonical" href="YOUR_PRIMARY_URL" />`.
3.  **Result:** Google attributes all SEO credit to _your_ website, even if the Dev.to article gets more views.

## How to Configure

1.  Go to **Settings** > **Integrations**.
2.  Click **Connect** on your desired platform.
3.  Enter your API Key (found in your platform's developer settings).
4.  Detailed setup guides are available in the sidebar under "Platforms".

## Deployment Workflow

1.  Draft your article in Texavor.
2.  Click **Deploy**.
3.  Select destinations (e.g., [x] My Blog, [x] Dev.to).
4.  **Customize:** You can override the title/cover image for specific platforms if needed.
5.  **Push:** Texavor deploys the content asynchronously and returns a "Live URL" for each.
