---
title: "Dev.to Integration"
description: "Sync your tech blog to the largest developer community."
category: "platforms"
order: 1
---

**Expand your reach to millions of developers.**

Texavor connects directly to the Forem API (the engine behind Dev.to) to publish your Markdown content as native Dev.to posts.

![Devto Integration](/docs/devto-integration.png)

## Features

- **Canonical Safety:** We automatically inject `canonical_url` pointing to your primary blog.
- **Organization Support:** Publish to your personal profile OR your Company Blog.
- **Series Sync:** Group articles into Dev.to Series.
- **Tag Mapping:** We map your metadata to Dev.to's maximum of 4 tags.

## 1. Setup

1.  Go to **[Dev.to Settings > Extensions](https://dev.to/settings/extensions)**.
2.  Scroll to "DEV Community API Keys".
3.  Generate a new key named "Texavor".
4.  Copy the key.

## 2. Connect in Texavor

1.  Navigate to **Settings** > **Integrations**.
2.  Click **Connect** on the Dev.to card.
3.  Paste your API Key.
4.  **(Optional) Organization ID:** If you want to publish under a company brand (e.g. "Stripe Developers"), enter your Org ID here. If left blank, it defaults to your personal profile.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Dev.to**.
2.  **Cover Image:** We upload your thumbnail to dev-to-uploads.s3.amazonaws.com.
3.  **Draft vs Public:** You can choose to push as a "Draft" (so you can preview it on Dev.to first) or "Public" (live immediately).

## FAQ

**Q: Does this hurt my SEO?**
A: **No.** Because we set the canonical link to _your_ site, Google attributes 100% of the authority to you. Dev.to is simply a distribution channel.

**Q: Can I update the post later?**
A: Yes. If you edit the article in Texavor and click **Deploy** again, we update the existing Dev.to post instead of creating a duplicate.
