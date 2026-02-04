---
title: "Webflow Integration"
date: "2026-01-12"
description: "Seamlessly publish your optimized content to Webflow CMS collections. Maintain perfect clean code and structure while scaling your programmatic SEO campaigns."
category: "platforms"
order: 5
---

**Your design is modern. Your publishing workflow should be too.**

Texavor connects directly to your Webflow CMS Collection API.

![Webflow Connection Modal](/docs/webflow-integration.png)

## Features

- **Image Uploads:** We auto-upload your cover image to Webflow's Asset Manager.
- **Draft Support:** Stage content as "Draft" so your designers can review it first.

## 1. Get Settings from Webflow

You need three things:

1.  **API Token:**
    - Go to **[Site Settings > Integrations > API Access](https://webflow.com/dashboard/sites)**.
    - Generate a new V2 Token. Copy it.
2.  **Site ID:**
    - Found in your dashboard URL: `webflow.com/dashboard/sites/{SITE_ID}`.
3.  **Collection ID:**
    - Open the Designer.
    - Click the CMS Icon (Database).
    - Click the "Gear" icon next to your Blog Collection.
    - Copy the **Collection ID**.

## 2. Connect in Texavor

1.  Navigate to **Integrations**.
2.  Click **Connect** on the Webflow card.
3.  Paste the **API Token**.
4.  Paste the **Site ID** and **Collection ID**.
5.  Click **Connect**.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Webflow**.
2.  **Status:**
    - **Staged:** (Recommended) Sends it to Webflow as a Draft.
    - **Live:** Publishes immediately.

## FAQ

**Q: Does it support Custom Fields?**
A: We automatically map Title -> `name`, Slug -> `slug`, and Content -> `post-body`. Ensure your Collection uses these standard field names.

## Support & Resources

Need help publishing your content strategy?

- 📧 **Email Support**: hello@texavor.com
- 📚 **Documentation**: Browse the full guide
