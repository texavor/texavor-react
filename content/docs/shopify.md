---
title: "Shopify Integration"
description: "Turn your e-commerce store into a traffic magnet."
category: "platforms"
order: 6
---

**Blog posts are cheaper than Instagram Ads.**

Texavor connects to your Shopify store to help you publish "Money Pages"—guides, comparisons, and stories that rank on Google and drive free traffic to your products.

![Placeholder for Screenshot: Shopify Connect Modal]

## Features

- **Product Embedding:** Easily link to your products.
- **Multiple Blogs:** Choose between your "News", "Guides", or any other blog handle you created in Shopify.
- **SEO Meta Sync:** We sync your Title Tag and Meta Description directly to Shopify's SEO fields.

## 1. Create a Custom App in Shopify

1.  Go to **Shopify Admin > Settings > Apps and sales channels**.
2.  Click **Develop apps** > **Create an app**.
3.  Name it "Texavor".
4.  **Configure Admin API Scopes:**
    - `write_content` (Required to publish articles)
    - `read_content`
5.  Click **Install App**.
6.  **Reveal Token:** Copy the "Admin API access token" (starts with `shpat_...`).

## 2. Connect in Texavor

1.  Navigate to **Settings** > **Integrations**.
2.  Click **Connect** on the Shopify card.
3.  **Shop Domain:** Enter your `myshopify.com` domain (e.g., `suraj-store.myshopify.com`).
4.  **Access Token:** Paste the `shpat_` token.
5.  Click **Verify**.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Shopify**.
2.  **Blog:** Select the destination blog (e.g., "News" or "Tutorials").
3.  **Handle:** (Optional) Customize the URL ending.
4.  **Tags:** Tags will appear as Shopify Blog Tags (useful for filtering on your storefront).

## FAQ

**Q: Can I embed products?**
A: Yes. In Texavor, paste your product URL. We convert it into a standard link. Your Shopify Theme handles the rest.

**Q: Does it work with Headless Shopify?**
A: Yes, because we write to the Storefront API backend. Your headless frontend just needs to fetch the blog data as usual.
