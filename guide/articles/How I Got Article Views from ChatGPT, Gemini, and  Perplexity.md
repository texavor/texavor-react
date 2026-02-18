## TL;DR

I run my technical blog on [surajon.dev](https://www.surajon.dev/). I get quite a decent amount of regular views. There are various platforms that drive my traffic, with Google and Bing being the top referrers. I also get views from the Answer Engines. ChatGPT, Gemini, and Perplexity are the only major platforms that drive traffic to my site.

I decided to get insight into the content that gets views from Answer Engines. There are some differences I find among these regarding "How do they cite the articles?" and "What are common themes among them?". Today, we are going to deep dive into those articles and each platform.

So, let's get started.

## Analyzing the Articles

I analyzed all my 114 articles against all the articles that have gotten the views from ChatGPT, Gemini, and Perplexity. The past 6 months of the data are only analyzed. I am only considering articles that has atleast 2 views from Answer Engine/AI.

### View Rate

| Metric | Value |
| --- | --- |
| **Total Articles Analyzed** | 114 |
| **Articles Getting AI Referers** | 9 (7.9%) |
| **Articles Getting ZERO Referers** | 105 (92.1%) |



![ChatGPT referes views](https://easywritestorage.blob.core.windows.net/images/1zd19z06hbfyaafff7xu2psw3xrc)


This shows that only 7.9% of the articles are getting AI referrals. This might be the case because these are the articles that were getting more citations, too. This shows that most of the articles are invisible to AI search engines.

### The Length Paradox

I can see some differences in the AI getting me the views based on the length. Here is the table describing the difference between viewed and non-viewed based on the article.

| Article Type | Avg. Word Count |
| --- | --- |
| **Viewed Articles** | 911 words |
| **Non-Viewed Articles** | 988 words |
| **Difference** | \-77 words (8% shorter) |

As you can see, **viewed articles are actually SHORTER**. This challenges the common belief that longer content gets more citations. This simply shows that an article that has Quality, strucutre and topic relevance will be cited and get views despite the length of the content.

### Platform Distribution

| AI Platform | Citations | Avg. Length | Content Preference |
| --- | --- | --- | --- |
| **ChatGPT** | 7 articles | \~850 words | Curated lists, practical guides |
| **Gemini** | 2 articles | \~1,275 words | Implementation tutorials, code-heavy |
| **Perplexity** | 2 articles | \~820 words | Tool lists, quick solutions |

The above results show that each platform has a preference for a certain type of article.

> Note: 2 articles were viewed by multiple platforms.

### Articles Getting AI Views(All 9)

**Multi-Platform Winners:**

1. **"Building a Kanban Board with Drag and Drop in React"** (ChatGPT, Gemini)

   - 1,637 words
   - Why: Step-by-step tutorial with code examples

2. **"🚀 20+ Java Open Source Projects to Contribute To"** (ChatGPT, Perplexity)

   - 631 words
   - Why: Curated list format, actionable resources

**ChatGPT-Only Views (5 articles):**

- "5 Best Free Notion Templates for Developers" (665 words)
- "4 Best Platforms for Free Web App Deployment" (932 words)
- "What are the best platforms to write technical articles?" (866 words)
- "Awesome Readme Examples for Writing better Readmes" (649 words)
- "How to Build a Custom Video Player in React" (776 words)

**Gemini-Only Views (1 article):**

- "How to Make Money with Technical Writing: A Comprehensive Guide" (1,149 words)

**Perplexity-Only Views (1 article):**

- "Top 5 Tools to Understand Any Codebase Faster" (893 words)

## Key Insights

**The 7.9% Citation Rate Crisis.** If only 1 in 13 articles is getting AI citations, traditional SEO strategies are failing. The data shows AI platforms favor:

**Curated lists** of individual tool reviews.

- **Practical tutorials** over theoretical explanations
- **Developer pain points** over generic advice
- **Broader frameworks** (React) over niche tools (Supabase).

**Tags Most Associated with Citations:**

- `webdev`: 100% citation rate among cited articles
- `react`: 60% citation rate
- `tutorial`: 50% citation rate
- `devtools`: 40% citation rate

**Tags with Poor Performance:**

- `supabase`: 0% citation rate (8 articles published)
- `css`: 5% citation rate
- `beginners`: 10% citation rate

This citation data directly informed the platform-specific strategies outlined below.

We have analyzed the articles in terms of the number. Let's look at the impact and understanding of each platform.

## Understanding the AI "Selection Bias"

Each platform has its own way of selecting the article. It can be due to "How users are using different platforms for different kinds of searches?" and the preference for a certain kind of articles that they trust more.

### ChatGPT: The "Definitive Guide" Specialist

ChatGPT favors **comprehensiveness**. It tends to pick articles that provide all the information in one article.

- **Favorite Format**: Definitive guides, "Everything you need to know" pieces.
- **Avg. Content Length**: \~900 words.
- **Key Signal**: Large listicles (e.g., "Top 20+ Resources for X") are favoured. This is also due to it providing rich data to the AI for easy summarization.

### Gemini: The "Action-Oriented" Builder

Gemini has a strong preference for a guide and implementation kind of article. It alos prefer articles that deep dive in the article covering a longer length among the others.

- **Favorite Format**: In-depth tutorials and code-heavy "How-to" guides.
- **Avg. Content Length**: \~1,400 words (deep-dive).
- **Key Signal**: High density of code blocks and GIFs. Gemini wants content that solves a specific user problem (e.g., "Building a Kanban Board from Scratch").

### Perplexity: The "Resource Hub" Researcher

Perplexity prefers articles that are listicles, providing a list of things. It has the lowest average word count for a view.

- **Favorite Format**: Curated tool lists and external resource hubs.
- **Avg. Content Length**: \~750 words (concise).
- **Key Signal**: High number of external links and specific entity labels (e.g., "Top 5 Tools to Understand Codebases").

## The Core AEO Ranking Factors

Despite thier differenct, all are AI that work on retrieving content from webpages. We can improve our content to allow them easy retrieval.

### 1. Structural Clarity

AI models rely on **Retrieval-Augmented Generation (RAG)**. They are not going to read the whole article; they will retrieve a specific part of the article based on the query.

- **The Fix**: Use strict `##` and `###` hierarchy. Every section should feel complete in its own way.

### 2. High Information Density

"Vague" is the enemy of AEO. AI will love the content density and structured content.

- **The Fix**: Use tables for comparisons and bullet points for features. Specificity signals to the AI that your content contains the "raw data" it needs.

### 3. Visual & Code Richness

For technical queries, "Show, Don't Just Tell" is a ranking factor.

- **The Fix**: Include functional code blocks and descriptive captions for your images. AI crawlers use alt-text and surrounding context to understand if a resource is truly helpful.

### 4. The "Authority" Signature

AI models are increasingly biased toward **first-person expertise**.

- **The Fix**: Use "I" and "My" to describe your experiences (e.g., "In my go-to tech stack, I always use..."). This signals AI that it is personal knowledge that can distinguish your content from generic AI articles

## Data-Driven Action Plan: From 7.9% to 30%+

Based on the analysis of 114 articles, here's the concrete action plan to improve your AI citation rate:

### Stop Doing (What Doesn't Work)

**Avoid These Content Types:**

- Generic beginner's guides that include "How to get Better at Coding."
- Providing only explaniation withou any practical application
- Writing around a single tool, Write a curated list instead
- In Dev, there is a decline in the CSS tutorials and search, too.

**The Data Says:**

- Generic beginner content get 10% citation rate
- Framework-specific tutorials like React gets 15% citation rate

### Start Doing (What Actually Works)

**Priority Content Formats:**

1. **Curated Lists (60% citation rate)**

   - "Top 10 X Tools for Y"
   - "20+ Resources for Z"
   - Include brief descriptions + links
   - Target: 600-900 words

2. **Practical Implementation Tutorials (50% citation rate)**

   - "How to Build X with Y"
   - Step-by-step with code examples
   - Include CodeSandbox/demo
   - Target: 1,200-1,600 words

3. **Developer Pain Point Solutions (40% citation rate)**

   - "Best Platforms for X"
   - "Tools to Solve Y Problem"
   - Comparison format
   - Target: 800-1,000 words

4. **Career/Meta Content (33% citation rate)**

   - "How to Make Money with X"
   - "Best Platforms to Y"
   - Target: 900-1,200 words

### Content Audit Checklist

For each existing article, ask:

1. **Is it a curated list?** → High citation potential
2. **Does it solve a specific developer pain point?** → Medium-high potential
3. **Is it framework-agnostic or uses React?** → Medium potential
4. **Is it niche/framework-specific?** → Low potential (consider consolidating)
5. **Is it generic beginner advice?** → Very low potential (archive or rewrite)

## **Frequently Asked Questions**

1. Why do only a small percentage of blog articles get cited by AI answer engines?

AI prioritizes content that is highly structured, information-dense, and directly solves a user query. Article lackcing clear data points are not likely to be picked by RAG-based indexing for AI.

2. Does article length matter for AI citations?

As per our analysis, Article length is less likely to affect citation. Content quality, clarity, and relevance matter the most.

3. What type of content do ChatGPT, Gemini, and Perplexity prefer?

Each platform has a different bias:

- **ChatGPT** favors comprehensive guides and large curated lists

- **Gemini** prefers in-depth, code-heavy implementation tutorials

- **Perplexity** prioritizes concise tool lists and resource hubs

4. How can I optimize my blog posts for Answer Engine Optimization (AEO)?

Use a clear heading structure, high content density, practical code for a tutorial, and first personal signal. These elements can get you more citations.

5. Which tags and topics perform best for AI-driven traffic?

Articles tagged with webdev, react, tutorial, and devtools have higher citation rates for Web Development-specific articles. Although tags are less likely to affect citation, but it can help in better summarization.

## Conclusion: Quality Over Quantity, Structure Over Length

The data clearly shows that 92% of the content is invisible to AI search engines. This does not indicate that we have to write more content, but it means we have to write smarter.

**Key Takeaways are:**

1. **Viewed articles are 8% shorter** → Quality beats length
2. **Curated lists outperform** → Actionable resources win
3. **Broader frameworks beat niche tools** → React &gt; Supabase
4. **Developer pain points get cited** → Solve real problems

It represents that the content is most useful and the structure will be more likely to get cited. By adopting this data driven approach and focusing on the proven content, you can move from 7.9% to the top 30%.

Thanks for reading the article.

## Resources

- [Retrieval-Augmented Generation for AI-Generated Content](https://link.springer.com/article/10.1007/s41019-025-00335-5)
- [OpenAI – Retrieval-Augmented Generation (RAG) Overview](https://platform.openai.com/docs/guides/retrieval)
- [Assessing AI Chatbots’ Bibliographic Reference Retrieval](https://arxiv.org/abs/2505.18059)
- [How Texavor Helps You Rank in ChatGPT, Perplexity, and AI Search Results](https://www.texavor.com/blog/how-texavor-helps-you-rank-in-chatgpt-perplexity-and-ai-search-results)
- [The Future of AI Search in 2026: Market Disruption, Citation Power & the New Rules of Visibility](https://higoodie.com/blog/ai-search-report-2026)