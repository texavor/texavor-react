---
title: "Headless Mode (Custom Webhooks)"
description: "Use Texavor as the CMS for your Next.js, Astro, or Remix blog."
category: "platforms"
order: 7
---

**Love your own stack?** Keep it.

You can use Texavor as your **Writing Environment** and **Authority Engine**, then push content to your own custom website via a secure Webhook.

![Placeholder for Screenshot: Webhook Configuration Panel]

## How It Works

1.  **Write:** Create your article in Texavor (use our AI tools, AEO outlines, etc).
2.  **Deploy:** Select "Custom Webhook" as the destination.
3.  **Receive:** We POST a JSON payload to your endpoint.
4.  **Publish:** Your API route saves the Markdown to your DB or triggers a Vercel rebuild.

## 1. Setting Up the Receiver

Your endpoint must accept a `POST` request.

### The Payload Structure

```json
{
  "event": "article.published",
  "payload": {
    "title": "My Article Title",
    "slug_suggestion": "my-article-title",
    "content_markdown": "# My Article Title\n\nHere is the body...",
    "content_html": "<h1>My Article Title</h1><p>Here is the body...</p>",
    "metadata": {
      "tags": ["react", "tutorial"],
      "cover_image": "https://assets.texavor.com/..."
    },
    "seo": {
      "meta_description": "A generated description.",
      "canonical_url": "https://texavor.com/..."
    }
  }
}
```

## 2. Security (Verifying the Signature)

To prevent anyone else from posting to your blog, we sign every request with an HMAC SHA-256 signature in the `X-Texavor-Signature` header.

### Next.js API Route Example (`/app/api/webhook/route.ts`)

```typescript
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-texavor-signature");
  const secret = process.env.TEXAVOR_WEBHOOK_SECRET;

  // 1. Verify Signature
  const expectedSignature = crypto
    .createHmac("sha256", secret!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
  }

  // 2. Process Content
  const data = JSON.parse(body);
  const { title, content_markdown } = data.payload;

  // ... Save to Database or CMS ...
  console.log(`Received article: ${title}`);

  return NextResponse.json({ status: "success" });
}
```

## 3. Configuring in Dashboard

1.  Go to **Settings** > **Integrations**.
2.  Select **Custom Webhook**.
3.  **Endpoint URL:** `https://your-site.com/api/webhook`.
4.  **Secret:** Copy the generated secret to your `.env` file (e.g., `TEXAVOR_WEBHOOK_SECRET`).

## Use Cases

- **Static Site Generators:** Trigger a rebuild hook on Vercel/Netlify.
- **Custom CMS:** Push content into a Postgres/Supabase database.
- **Newsletter:** Forward the content to a ConvertKit/Substack email wrapper.
