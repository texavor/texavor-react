## Introduction

As a technical blogger who hosts their own blog, one of the most frustrating things is that Google and Bing's crawlers take their own time to crawl and index the latest articles. They mention that they will crawl daily, but often they don't, and new articles don't get indexed instantly.

Initially, when I published content on my websites, [surajon.dev](https://www.surajon.dev/) and [easywrite.dev](https://easywrite.dev/), the articles were visible on the site, but there was a delay before they were indexed by search engines. This can be detrimental, as you might miss out on trending topics, or the page might not get indexed at all.

That's where **IndexNow** comes in. It's a simple protocol that has fundamentally changed my publishing workflow. Instead of waiting for search engines to come to me, I now *tell them* the instant a new article is live.

Here’s a breakdown of what it is, why you need it, and how I implemented it.

---

## What is [IndexNow](https://www.bing.com/indexnow)?

IndexNow is an open-source protocol that lets website owners instantly notify search engines about new or updated content. It replaces the old method of waiting for a crawler like Googlebot to visit our site to find new pages. With IndexNow, you send a ping request to an IndexNow API endpoint. This simple ping tells the search engine that there is a new page on your website. Search engines that support the protocol receive this ping and add the URL to their priority crawl queue. This is a **push** system.

It was originally developed by Microsoft Bing and Yandex. The list of search engines supporting IndexNow includes:

- Microsoft Bing
- Yandex
- Yep
- Amazon Bot

See the complete [list of search engines supporting IndexNow](https://www.indexnow.org/search-engines).

While Google does not officially support it, they have tested it in the past and might implement it in the future. By setting up IndexNow, you might also benefit from Google's support if they adopt it.

---

## Setting Up IndexNow

Setting up IndexNow can be divided into three steps:

**Step 1: Generate a Host API Key**
First, we need to generate a unique API key. You can generate one from [Bing’s IndexNow](https://www.bing.com/indexnow/getstarted) Page.

![Generating an IndexNow API Key from Bing Webmaster Tools](https://paper-attachments.dropboxusercontent.com/s_C08C8974B897135275725DF32E90328F224C9240806B13FBBA4E70EA25413835_1762257731603_image.png)

**Step 2: Add the Key to Your Public Directory**
Next, create a text file named after your API key (e.g., `1dbae541077243b791cf94132d24bdc0.txt`). This file must contain **only** the key itself:

```
1dbae541077243b791cf94132d24bdc0
```

Placing this file in your website's root or public directory makes it accessible at a URL like `https://www.example.com/1dbae541077243b791cf94132d24bdc0.txt`, which is required for verification.

**Step 3: Send the Ping**
Whenever you publish new content, you need to make an API call to `https://api.indexnow.org/indexnow` with a list of the newly added URLs. You can also send a complete list of your site's URLs, including the new one.

Here is a `cURL` example:

```bash
curl -X POST "[https://api.indexnow.org/indexnow](https://api.indexnow.org/indexnow)" \
-H "Content-Type: application/json; charset=utf-8" \
-d '{
  "host": "www.surajon.dev",
  "key": "3f2f5c8c4f8adfadf8c4f8c4f5c8c4f8c",
  "keyLocation": "[https://surajon.dev/3f2f5c8c4f8adfadf8c4f8c4f5c8c4f8c.txt](https://surajon.dev/3f2f5c8c4f8adfadf8c4f8c4f5c8c4f8c.txt)",
  "urlList": [
    "[https://surajon.dev/blog/new-react-hooks-guide](https://surajon.dev/blog/new-react-hooks-guide)",
    "[https://surajon.dev/blog/updated-adonisjs-tutorial](https://surajon.dev/blog/updated-adonisjs-tutorial)"
  ]
}'
```

The fields in the JSON payload are:

| Field | Description |
|---|---|
| **host** | The domain of your website. |
| **key** | The API key you generated in Step 1. |
| **keyLocation** | The public URL of your API key file. |
| **urlList** | An array of the new or updated webpage URLs. |

You can automate this process in your backend so that this API call is made whenever an article is added or updated. If you are using a CMS, you can trigger the IndexNow call using a webhook.

Here’s a general setup for a webhook:

- Grab the URL of the new post from the webhook data.
- Fetch the secret IndexNow key from environment variables (never hard-code it!).
- Build the JSON payload (as shown in the `cURL` example).
- Use `fetch` to send the POST request to `https://api.indexnow.org/indexnow`.

If you are using Next.js, you can use API routes to easily create a webhook endpoint for this process.

---

## My Experience After Implementing IndexNow

I set this up for `surajon.dev` a few months ago. Before, I'd publish a post and immediately go to Google Search Console and Bing Webmaster Tools to manually request indexing. Even then, it was a gamble.

**After implementing IndexNow, I've seen my new articles get indexed on Bing within a few hours, sometimes faster.** It's incredibly satisfying to see a post go live and appear in search results the same day.

---

## Conclusion

In short, IndexNow is a no-brainer. It's a simple, free protocol that puts you back in control of your content's lifecycle. For `surajon.dev`, it has meant faster indexing and less wasted crawl budget. Even without official Google adoption yet, it's an essential, easy win for any publisher who takes SEO and timeliness seriously.

I hope this article has helped you learn something new. Thanks for reading.

---

### EasyWrite.dev

We are building a platform that lets you manage

- Your blog strategies🚀
- Keyword research🔥
- Topic generation🧾
- AI Automation🤖
- SEO and GEO focus articles📈

You can join it from [easywrite.dev](https://www.easywrite.dev/).

![Screenshot of the Easywrite.dev application](https://paper-attachments.dropboxusercontent.com/s_C08C8974B897135275725DF32E90328F224C9240806B13FBBA4E70EA25413835_1762258880467_image.png)