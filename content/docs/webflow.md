---
title: "Webflow Integration"
description: "Feed your pixel-perfect site with perfectly structured data."
category: "platforms"
order: 5
---

**Your design is modern. Your publishing workflow should be too.**

Webflow is structurally strict. Unlike a generic "Body" field, your CMS Collection might have "Summary", "Hero Image", "Category Reference", and "Rich Text". Texavor maps to them perfectly.

![Placeholder for Screenshot: Webflow Field Mapping]

## Features

- **Schema Mapping:** We detect your Collection Fields (Rich Text, Image, Reference) and allow you to map them.
- **Image Uploads:** We upload your cover image directly to Webflow's Asset Manager.
- **Draft Support:** Stage content as "Staged for Publish" so your designers can review it first.

## 1. Get Settings from Webflow

1.  **API Token:**
    - Go to **[Site Settings > Integrations > API Access](https://webflow.com/dashboard/sites)**.
    - Generate a new V2 Token. Copy it.
2.  **Site ID:** Found in your dashboard URL: `webflow.com/dashboard/sites/{SITE_ID}`.

## 2. Connect in Texavor

1.  Navigate to **Settings** > **Integrations**.
2.  Click **Connect** on the Webflow card.
3.  Paste the **API Token** and **Site ID**.
4.  **Select Collection:** We will fetch your Collections (e.g., "Blog Posts", "Team", "Case Studies"). Choose the one you want to write to.

## 3. Map Your Fields

Texavor needs to know where to put the data.

| Texavor Field | Webflow Field Type | Recommendation      |
| :------------ | :----------------- | :------------------ |
| **Title**     | Plain Text         | Map to `Name`       |
| **Content**   | Rich Text          | Map to `Post Body`  |
| **Slug**      | Slug               | Map to `Slug`       |
| **Cover**     | Image              | Map to `Main Image` |
| **Excerpt**   | Plain Text         | Map to `Summary`    |

## 4. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Webflow**.
2.  **Status:**
    - **Staged:** (Recommended) Sends it to Webflow as a Draft.
    - **Live:** Publishes immediately.

## FAQ

**Q: Does it support Multi-Reference fields (e.g., Tags)?**
A: Currently, we support single-choice categories. Multi-reference tag support is in Beta.

**Q: My Rich Text formatting is broken?**
A: Webflow's Rich Text field has strict HTML rules. Texavor automatically cleans your Markdown to ensure it complies (e.g., removing unsafe scripts).
