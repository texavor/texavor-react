---
title: "Headless Mode (Custom Webhooks)"
description: "Use Texavor as the CMS for your Next.js, Astro, or Remix blog."
category: "platforms"
order: 8
---

**Love your own stack?** Keep it.

You can use Texavor as your **Writing Environment** and **Authority Engine**, then push content to your own custom website via a secure Webhook.

## 1. Field Mapping

By default, we send a standard JSON payload. However, your API might expect different keys (e.g., `body` instead of `content`).

Use the **Field Mapping** section to rename our keys to match your database schema.

![Field Mapping Configuration](/docs/custom-webhook-field-mapping.png)

- **Left Side:** The value we send (e.g., `{{title}}`).
- **Right Side:** The JSON key you want to receive (e.g., `title`).

**Example:**
If you map `Content` -> `markdown`, your payload will look like: `{"markdown": "# My Article..."}` instead of `{"content": "..."}`.

## 2. Advanced Configuration

We support full REST semantics for keeping your blog in sync.

![Advanced Configuration](/docs/custom-webhook-advanced.png)

### Content Format

- **Markdown:** Best for Next.js/Astro/Hugo. We send raw markdown.
- **HTML (Pre-rendered):** Best for legacy PHP/Rails apps. We convert the markdown to safe HTML before sending.

### Update & Delete (Syncing)

Does your API support editing articles?

- **Response ID Field:** When you first create an article, your API should return its ID (e.g., `{"id": 123}`). Tell us which field holds that ID (default: `id`).
- **Update URL (PATCH):** If we need to update that article later, we will send a `PATCH` request to this URL.
  - _Example:_ `https://api.mysite.com/articles`
- **Delete URL (DELETE):** If you delete an article in Texavor, we can delete it on your site too.
  - _Example:_ `https://api.mysite.com/articles/{id}`

## 3. The Base Payload (Reference)

If you don't use mapping, this is the default JSON:

```json
{
  "event": "article.published",
  "payload": {
    "title": "My Article Title",
    "slug_suggestion": "my-article-title",
    "content_markdown": "# My Article Title...",
    "metadata": {
      "tags": ["react", "tutorial"],
      "cover_image": "https://assets.texavor.com/..."
    }
  }
}
```

## 4. Security

We sign every request with an HMAC SHA-256 signature in the `X-Texavor-Signature` header. See the [Headless Starter Kit](https://github.com/texavor/headless-starter) for verification code.

## Support & Resources

Need help publishing your content strategy?

- 📧 **Email Support**: hello@texavor.com
- 📚 **Documentation**: Browse the full guide
