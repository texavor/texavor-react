## Introduction

Blogs have always driven traffic to websites since the dawn of the internet. It is one of the most effective organic ways to get visits, build credibility, and expand backlinks for your website.

According to [DemandSage](https://www.demandsage.com/business-blogging-statistics/), 80% of businesses use blogs as a marketing tool, and blogging can boost web traffic by 55%. People might feel blogging is dead due to the rise of Generative AI, but this has actually opened up another source of website traffic. Research suggests that generative engine visitors are often more likely to convert.

So, having a blog is still a very valuable asset to any website, and for a developer-tools SaaS, it is essential. Today, we are going to look into some SEO strategies that a developer can use to improve the SEO (Search Engine Optimization) and GEO (Generative Engine Optimization) of a website. This is a developer-focused guide, and I have used all these methods on my website, [surajon.dev](https://www.surajon.dev/).

So, let’s get started.

## Structural Integrity: Semantic HTML for Search Engines

Using correct HTML tags allows crawlers and bots to better understand your webpage, which helps with ranking for relevant keywords. We are going to look into the tags that we should focus on.

1.  **`<div>`**
    Rather than spamming `<div>` tags everywhere on an article page, reserve them for when a specific semantic tag isn't available. Make full use of `<p>`, `<h1>`, and other semantic tags.

2.  **`<article>`**
    Place your blog post inside the `<article>` tag. It is used for a **self-contained, independent piece of content** (a blog post, forum comment, product card).

3.  **`<section>`**
    Use this tag to **group related content** within a document (e.g., chapters of an article, different feature sections on a homepage). A `<section>` should almost always have a heading (`<h1>` to `<h6>`).

4.  **`<code>`**
    Rather than using a `<span>` tag and styling it, use the `<code>` tag for **in-line technical code snippets**. This is crucial for content about programming.

On our website, we implement these semantic tags for each content type for better ranking. This can be achieved by writing in markdown and then converting it to HTML, ensuring proper styling and the correct HTML structure. I use [tailwindcss/typography](https://tailwindcss.com/blog/tailwindcss-typography) for proper styling of each element.

---

## Rendering Method to Use

Client-side rendering (CSR) should be avoided for blogs, as it can result in a blank HTML page for crawlers until the JavaScript executes. This poses a high SEO risk, as a blank page might get indexed.

Using **Server-Side Rendering (SSR)** is ideal for blog posts. The fully formed HTML document is generated on the server and then sent to the user. This ensures the full page is available to crawlers immediately and often results in a faster time-to-content.

We use the server-side capabilities of Next.js to load all our pages on the server side before displaying them to the user.

---

## Core Web Vitals

While this doesn't directly affect SEO in terms of content, it improves the performance of the article page and leads to a better user experience, which is a critical ranking factor.

Here are some of the core vitals you can improve:

1.  **Largest Contentful Paint (LCP)**
    This is the time it takes for the largest image or text block to become visible. Ensure the LCP element is loaded with the highest priority (e.g., using preload hints, not lazy-loaded).

2.  **Interaction to Next Paint (INP)**
    Break up long JavaScript tasks. Deferrable scripts can be loaded with `strategy="afterInteractive"`. This loads the script *after* the page becomes interactive, which can reduce initial load times and improve interactivity.

    We use this on our website with the Next.js Script tag:

    ```jsx
    <Script
      src="[https://cloud.umami.is/script.js](https://cloud.umami.is/script.js)"
      data-website-id="idddfadf-dfadfas"
      strategy="afterInteractive"
    />
    ```

3.  **Speed Index**
    Speed Index measures how quickly content is visually populated. It quantifies the effectiveness of your rendering strategy—the time the user spends staring at a blank or partial screen.

    For large SPAs (React, Vue), implement **code splitting** so the initial load only includes the JavaScript needed for the current route/view.

---

## Meta Tags and H1 tag

Meta tags, such as `title` and `description`, should be unique for each article to represent the content accurately. For SEO purposes, aim for a title between **50-60 characters** and a description between **150-160 characters**.

**H1 tags** should not be spammed on the webpage. One page should have **only one H1 tag**. On our website, we use the H1 tag for the article's main title; other headings inside the article use H2 and below. This helps crawlers and chatbots understand the article's structure correctly.

```javascript
// In your app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.headerImage], // Must be an absolute URL
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.headerImage], // Must be an absolute URL
    },
  };
}
```

---

## sitemap.xml and robots.txt

A `sitemap.xml` file is crucial for helping search engines discover all the pages on your website. It helps them identify new pages and index them automatically. Below is an example of a sitemap file.

```xml
<urlset
      xmlns="[http://www.sitemaps.org/schemas/sitemap/0.9](http://www.sitemaps.org/schemas/sitemap/0.9)">
      <url>
            <loc>https://www.easywrite.dev</loc>
            <lastmod>2025-11-04T06:06:30.177Z</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
      </url>
      <url>
            <loc>https://www.easywrite.dev/blog</loc>
            <lastmod>2025-11-04T06:06:30.177Z</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
      </url>
      <url>
            <loc>https://www.easywrite.dev/terms-and-conditions</loc>
            <lastmod>2025-11-04T06:06:30.177Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
      </url>
      <url>
            <loc>https://www.easywrite.dev/privacy-policy</loc>
            <lastmod>2025-11-04T06:06:30.177Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
      </url>
</urlset>
```

`robots.txt` defines rules for web crawlers, such as which pages to exclude from crawling or which bots are allowed or disallowed. I highly recommend letting generative AI crawl your website for GEO.

Here is an example of `robots.txt`:

```
# ===================================================================
# Rules for all crawlers, including standard search engines
# ===================================================================
User-agent: *
Allow: /
Disallow: /api/ # Disallow crawling of API routes, if you have any

# ===================================================================
# Specific rules for AI crawlers
# By explicitly allowing them, you signal that your content can be 
# used for their training sets, in accordance with their policies.
# ===================================================================

# For OpenAI's models (ChatGPT)
User-agent: GPTBot
Allow: /

# For Google's AI models (Gemini, etc.)
User-agent: Google-Extended
Allow: /

# For other AI crawlers (add more as they become known)
User-agent: PerplexityBot
Allow: /
User-agent: Claude-Web
Allow: /


# ===================================================================
# Location of the sitemap
# ===================================================================
Sitemap: [https://www.surajon.dev/sitemap.xml](https://www.surajon.dev/sitemap.xml)
```

---

## EasyWrite.dev

We are building a platform that lets you manage 

- Your blog strategies🚀
- Keyword research🔥
- Topic generation🧾
- AI Automation🤖
- SEO and GEO focus articles📈

You can join it from [easywrite.dev](https://www.easywrite.dev/).

---

## Conclusion

As a developer and technical writer, I highly recommend utilizing these techniques to improve the SEO and GEO of your articles to get more views from search engines and chatbots.

I hope this article has helped you learn more about the technical aspects of blog SEO. Thanks for reading the article.