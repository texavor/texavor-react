---
title: "Hashnode Integration"
description: "Sync articles to your custom domain on Hashnode."
category: "platforms"
order: 2
---

**Your blog, your domain, our editor.**

Hashnode is the preferred platform for developers who want a custom domain (e.g., `blog.texavor.com`) without the headache of hosting. Texavor connects via their GraphQL API to push content instantly.

![Placeholder for Screenshot: Hashnode Connect Modal]

## Features

- **Canonical Safety:** We set the `originalArticleURL` field in Hashnode's database to your primary domain.
- **Custom Domains:** Works seamlessly with standard (`hashnode.dev`) or custom domains.
- **Series Support:** Link articles to a Hashnode Series.

## 1. Get Settings from Hashnode

1.  Go to **[Hashnode Developer Settings](https://hashnode.com/settings/developer)**.
2.  **Access Token:** Click "Generate New Token". Copy it.
3.  **Publication ID:**
    - Go to your Blog Dashboard.
    - The ID is in the URL: `hashnode.com/{PUBLICATION_ID}/dashboard`.
    - Copy this ID.

## 2. Connect in Texavor

1.  Navigate to **Settings** > **Integrations**.
2.  Click **Connect** on the Hashnode card.
3.  Enter your **Access Token** and **Publication ID**.
4.  Click **Verify**. We will fetch your blog title to confirm access.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Hashnode**.
2.  **(Optional) Series:** Select an existing Series from the dropdown (we fetch these live).
3.  **Slug:** You can override the URL slug if needed.

## FAQ

**Q: Does it support Team Publications?**
A: Yes. Just use the Publication ID of your Team Blog. The Access Token must belong to an Admin of that publication.

**Q: Do images transfer?**
A: Yes. We upload your images to Hashnode's CDN automatically so they load fast.
