---
title: "Medium Integration"
description: "Cross-post your technical content to Medium safely using canonical tags. Reach a wider audience without risking SEO penalties or duplicate content issues now."
category: "platforms"
order: 3
---

**Don't build your house on rented land. But do invite guests.**

Medium is an excellent "Distribution Channel". Texavor allows you to push content there while keeping 100% of the SEO credit on your own domain.

![Medium Integration](/docs/medium-integration.png)

## Features

- **Canonical Safety:** We set the `canonicalUrl` field to your primary blog post. This tells Google: _"The original version is here. The Medium post is just a copy."_
- **Publication Support:** Submit drafts directly to Publications you are a writer for.
- **Tag Mapping:** We map your first 3 Texavor tags to Medium (API Limit).

## 1. Get Integration Token

1.  Go to **[Medium Settings > Security and apps](https://medium.com/me/settings/security)**.
2.  Scroll to "Integration tokens".
3.  Type a description (e.g., "Texavor") and click **Get integration token**.
4.  Copy the token.

## 2. Connect in Texavor

1.  Navigate to **Integrations**.
2.  Click **Connect** on the Medium card.
3.  Paste your token.
4.  Click **Verify**. We will fetch your user profile.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Medium**.
2.  **Publication:** Choose a publication if you want to submit it to one (e.g., "Towards Data Science").
3.  **Status:**
    - **Public:** Live immediately.
    - **Draft:** Sent to your drafts folder (safest option).
    - **Unlisted:** Accessible only via link.

## FAQ

**Q: Can I put it behind the Paywall?**
A: Yes. Use the **[x] Member-only** checkbox in the Deploy modal.

**Q: Why only 3 tags?**
A: The Medium API strictly limits automated posts to 3 tags. We use your first 3 tags. You can add 2 more manually if you push as a Draft.
