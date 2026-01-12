---
title: "WordPress Integration"
description: "Publish to self-hosted WordPress sites via the REST API."
category: "platforms"
order: 4
---

**The world runs on WordPress. So do we.**

Texavor connects to your self-hosted WordPress (or WP Engine/Kinsta) site via the native REST API. We support "Headless-style" publishing where we inject the content, set the SEO meta, and handle the media library uploads for you.

![Placeholder for Screenshot: WordPress Connect Modal]

## Features

- **Yoast & RankMath Support:** We automatically sync your Title/Meta Description to the custom fields used by these plugins.
- **Media Library Sync:** When you drag an image into Texavor, we upload it to your _WordPress Media Library_ and use the returned URL.
- **Categories & Tags:** We fetch your existing WP Categories so you can select them from a dropdown.

## 1. Get Application Password

_(Requires WordPress 5.6+)_

1.  Log in to your **WordPress Admin**.
2.  Go to **Users > Profile**.
3.  Scroll down to **Application Passwords**.
4.  Type a name (e.g., "Texavor") and click **Add New Application Password**.
5.  Copy the password (it looks like `xxxx xxxx xxxx xxxx`).

## 2. Connect in Texavor

1.  Navigate to **Settings** > **Integrations**.
2.  Click **Connect** on the WordPress card.
3.  **Site URL:** Enter your full URL (e.g., `https://myblog.com`).
4.  **Username:** Your WordPress username (NOT your email).
5.  **App Password:** Paste the password you generated.

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] WordPress**.
2.  **Categories:** Select from the dropdown.
3.  **Status:**
    - **Publish:** Live immediately.
    - **Draft:** Saved as a Draft Post.
    - **Pending:** Saved as "Pending Review" (good for editorial workflows).

## FAQ

**Q: Does it work with Custom Post Types (CPT)?**
A: Currently, we write to the standard `post` type. If you need CPT support (e.g., for a "Books" section), use the [Custom Webhook](/platforms/custom-webhooks) integration instead.

**Q: "JSON Error" or "Rest API Disabled"?**
A: Some security plugins (like Wordfence) block the REST API. You may need to whitelist the Texavor IP or enable the REST API in your security settings.
