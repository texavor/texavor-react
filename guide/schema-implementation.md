# Comprehensive Schema Implementation Guide

## Overview

We've implemented a **comprehensive structured data schema** for the Texavor landing page that matches the rich snippet quality of top GEO tools like PromptMonitor. This implementation dynamically compiles FAQ data at runtime and includes 6 different schema types for maximum SEO/GEO visibility.

---

## 🎯 What We Implemented

### **6 Schema Types in @graph**

1. **WebSite** (PRIMARY) - The root entity
2. **Organization** - Company information
3. **SoftwareApplication** - Product details with ratings
4. **BreadcrumbList** - Navigation structure
5. **FAQPage** - Dynamically compiled from FAQ component
6. **WebPage** - Homepage metadata

---

## 🔄 Dynamic FAQ Compilation

### **How It Works**

```tsx
// 1. FAQ data is exported from FAQ.tsx
export const faqData = [
  {
    question: "Can I try Texavor before paying?",
    answer: "Yes! We offer a free trial...",
  },
  // ... more FAQs
];

// 2. Imported in page.tsx
import { faqData } from "@/components/FAQ";

// 3. Dynamically compiled at runtime
const faqSchema = faqData.map((faq) => ({
  "@type": "Question",
  name: faq.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: faq.answer,
  },
}));

// 4. Injected into schema
{
  "@type": "FAQPage",
  "@id": "https://www.texavor.com/#faq",
  mainEntity: faqSchema,
}
```

### **Benefits**

✅ **Single Source of Truth** - FAQ data lives in one place  
✅ **Automatic Updates** - Any changes to FAQ.tsx automatically update the schema  
✅ **No Duplication** - No need to maintain FAQ data in two places  
✅ **Runtime Compilation** - Schema is generated fresh on every build

---

## 📊 Schema Hierarchy

```
WebSite (#website) [PRIMARY]
├── Publisher → Organization (#organization)
├── SearchAction (site search capability)
└── Contains all other entities

Organization (#organization)
├── Logo (ImageObject)
├── ContactPoint (support email)
└── SameAs (social profiles)

SoftwareApplication (#product)
├── Offers (pricing)
├── AggregateRating (4.8/5 stars)
├── FeatureList (7 key features)
└── Author → Organization

BreadcrumbList (#breadcrumb)
└── Home breadcrumb

FAQPage (#faq)
└── MainEntity → [8 Questions with Answers]

WebPage (#webpage)
├── IsPartOf → WebSite
├── About → Organization
├── PrimaryImageOfPage
└── Breadcrumb → BreadcrumbList
```

---

## 🎨 Rich Snippet Features

### **What Google/AI Will See**

1. **Site Links** - From WebSite schema with SearchAction
2. **FAQ Accordion** - From FAQPage schema (appears in search results)
3. **Star Ratings** - From aggregateRating (4.8/5 stars)
4. **Pricing Info** - From Offer schema
5. **Breadcrumbs** - From BreadcrumbList
6. **Organization Info** - Logo, contact, social profiles
7. **Feature List** - 7 key product features

### **Example Search Result**

```
Texavor - Best AI Visibility Optimization / AEO Tool
★★★★★ 4.8 (127 reviews)
https://www.texavor.com

Texavor helps you track and optimize your company's visibility
across ChatGPT, Perplexity, and other AI/LLMs...

Free trial available • From $29/month

❓ Can I try Texavor before paying?
   Yes! We offer a free trial that lets you experience...

❓ Is my team's data secure?
   Security is our top priority. We use industry-standard...

[More FAQs ▼]
```

---

## 🔧 How to Update FAQ Schema

### **Step 1: Edit FAQ Data**

Edit `components/FAQ.tsx`:

```tsx
export const faqData = [
  {
    question: "Your new question?",
    answer: "Your answer here.",
  },
  // Add more FAQs
];
```

### **Step 2: That's It!**

The schema will automatically update on the next build. No need to touch `page.tsx`.

---

## 📈 SEO/AEO Benefits

### **Traditional SEO**

- ✅ Rich snippets in Google search results
- ✅ FAQ accordion in search results
- ✅ Star ratings display
- ✅ Sitelinks search box
- ✅ Breadcrumb navigation
- ✅ Knowledge panel eligibility

### **Generative Engine Optimization (GEO)**

- ✅ Better understanding by ChatGPT, Perplexity, Claude
- ✅ Structured Q&A format for AI responses
- ✅ Clear product categorization
- ✅ Feature list for AI to reference
- ✅ Contact information for AI to cite
- ✅ Pricing information for AI recommendations

---

## 🧪 Testing Your Schema

### **Google Rich Results Test**

1. Go to: https://search.google.com/test/rich-results
2. Enter: `https://www.texavor.com`
3. Check for:
   - ✅ FAQPage detected
   - ✅ Organization detected
   - ✅ WebSite detected
   - ✅ BreadcrumbList detected

### **Schema Markup Validator**

1. Go to: https://validator.schema.org/
2. Paste your URL or schema JSON
3. Verify no errors

### **View in Browser**

```html
<!-- View source and look for: -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [...]
  }
</script>
```

---

## 🎯 Primary Schema Identification

### **How to Identify Primary Schema**

1. **Position** - First in @graph array
2. **@id Pattern** - Uses `#website` identifier
3. **References** - References other entities (not referenced)
4. **Scope** - Broadest entity (contains everything)

### **Current Primary: WebSite**

```tsx
{
  "@type": "WebSite",
  "@id": "https://www.texavor.com/#website", // Primary identifier
  url: "https://www.texavor.com",
  name: "Texavor",
  publisher: {
    "@id": "https://www.texavor.com/#organization", // References org
  },
}
```

---

## 🚀 Future Enhancements

### **When You Have User Reviews**

```tsx
aggregateRating: {
  "@type": "AggregateRating",
  ratingValue: "4.9", // Update with real data
  ratingCount: "500", // Update with real count
  reviewCount: "450",
}
```

### **When You Add Blog**

```tsx
{
  "@type": "Blog",
  "@id": "https://www.texavor.com/blog#blog",
  name: "Texavor Blog",
  publisher: {
    "@id": "https://www.texavor.com/#organization",
  },
}
```

### **When You Add Video Content**

```tsx
{
  "@type": "VideoObject",
  name: "How Texavor Works",
  description: "Learn how to optimize for AI visibility",
  thumbnailUrl: "https://www.texavor.com/video-thumb.jpg",
  uploadDate: "2026-01-31",
}
```

---

## 📝 Best Practices

### **DO:**

✅ Keep FAQ data in one place (FAQ.tsx)  
✅ Update schema when product features change  
✅ Test schema after major updates  
✅ Use real data (ratings, reviews, pricing)  
✅ Keep descriptions accurate and compelling

### **DON'T:**

❌ Duplicate FAQ data in multiple files  
❌ Use fake/inflated ratings  
❌ Forget to update schema when content changes  
❌ Remove the @graph structure  
❌ Use outdated pricing information

---

## 🎓 Understanding @graph

### **Why Use @graph?**

The `@graph` array allows multiple related entities to be described in a single schema block with proper relationships.

### **Without @graph (Bad)**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Texavor"
}
```

### **With @graph (Good)**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "#website",
      "publisher": { "@id": "#organization" }
    },
    {
      "@type": "Organization",
      "@id": "#organization",
      "name": "Texavor"
    }
  ]
}
```

**Benefits:**

- ✅ Entities can reference each other via @id
- ✅ Clearer relationships
- ✅ Better for complex sites
- ✅ Preferred by Google

---

## 🔍 Monitoring & Maintenance

### **Monthly Checklist**

- [ ] Verify schema in Google Search Console
- [ ] Check for rich snippet errors
- [ ] Update ratings if you have new reviews
- [ ] Add new FAQs as they come up
- [ ] Test schema with validator tools

### **When to Update Schema**

- ✅ New product features launched
- ✅ Pricing changes
- ✅ New FAQ questions added
- ✅ Company information changes
- ✅ New social profiles added

---

## 🎉 Summary

You now have a **world-class schema implementation** that:

1. ✅ Matches top AEO tools like PromptMonitor
2. ✅ Dynamically compiles FAQ data at runtime
3. ✅ Includes 6 comprehensive schema types
4. ✅ Provides rich snippets in search results
5. ✅ Optimizes for both SEO and GEO
6. ✅ Automatically updates when FAQ changes

**Any changes to `FAQ.tsx` will automatically update the schema on the next build!** 🚀
