---
title: "Substack Integration"
description: "Publish newsletters seamlessly to Substack."
category: "platforms"
order: 7
---

**The simplified newsletter workflow.**

Texavor connects to your Substack account to create drafts and publish content instantly. Since Substack doesn't have a public API, we use a secure cookie-based connection that mimics your browser session.

![Substack Integration](/docs/substack-integration.png)

## Features

- **Smart Auth:** We automatically detect your User ID, so you don't have to find it manually.
- **Markdown Support:** We send high-fidelity Markdown directly, preserving your formatting.
- **Instant Publishing:** Choose to save as a draft or go live immediately.
- **Cover Images:** We automatically prepend your article's cover image to the post.

## 1. Get Your Session Cookie

Substack requires a valid session cookie (`substack.sid`) to authenticate.

1.  Open **[Substack.com](https://substack.com)** in your browser and log in.
2.  **Open Developer Tools:**
    - Right-click anywhere and select **Inspect**.
    - Or press `F12` (Windows) / `Cmd+Option+I` (Mac).
3.  **Find the Cookie:**
    - Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox).
    - Expand **Cookies** in the sidebar.
    - Click on `https://your-subdomain.substack.com`.
    - Find the cookie named `substack.sid`.
4.  **Copy the Value:** It’s a long string starting with `s%3A...`. Copy the entire value.

> [!NOTE]
> Cookies expire periodically (usually every 30 days). If publishing fails with "403 Not Authorized", simply repeat this step to update your cookie.

## 2. Connect in Texavor

1.  Navigate to **Integrations**.
2.  Click **Connect** on the Substack card.
3.  **Subdomain:** Enter just the name (e.g., `texavor` for `texavor.substack.com`).
4.  **Session Cookie:** Paste the `substack.sid` value you copied.
5.  Click **Connect**.

> We will automatically fetch and verify your User ID when you save. You should see a success message: _"Connected! Found User ID: 12345..."_

## 3. Publishing Workflow

When you click **Deploy**:

1.  Select **[x] Substack**.
2.  **Save as Draft:**
    - **Yes (Default):** Creates a draft in Substack for you to review.
    - **No:** Publishes the post **immediately** to your live newsletter.
3.  **Audience:** Choose "Everyone", "Paid Subscribers", or "Founders".
4.  **Send Email:** Check this if you want to email the post immediately (only works if publishing immediately).

Your article will appear in your **Substack Dashboard**!

## Support & Resources

Need help publishing your content strategy?

- 📧 **Email Support**: hello@texavor.com
- 📚 **Documentation**: Browse the full guide
