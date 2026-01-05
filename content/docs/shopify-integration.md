---
title: "Shopify Blog Integration"
date: "2024-12-08"
description: "Publish blog content to your Shopify store"
category: "integrations"
order: 6
---

# Shopify Blog Integration

Connect your Shopify store to manage blog content and boost your e-commerce SEO.

## Overview

✅ Publish to Shopify blog  
✅ Update existing articles  
✅ Manage tags and authors  
✅ Set featured images  
✅ Optimize for e-commerce SEO

---

## Prerequisites

- Shopify store (any plan)
- Admin access to Shopify
- Blog created in Shopify (default: "News")

---

## Step 1: Create Shopify Private App

### 1.1 Access Admin

1. Log in to your [Shopify store admin](https://accounts.shopify.com)
2. Navigate to your store dashboard

### 1.2 Create Custom App

**For Shopify 2022 and later:**

1. Go to **Settings** (bottom-left)
2. Click **Apps and sales channels**
3. Click **Develop apps**
4. Click **Allow custom app development** (if first time)
5. Click **Create an app**

![Shopify Apps Settings]
_Placeholder: Apps settings page_

### 1.3 Configure App

1. **App name:** `EasyWrite Integration`
2. Click **Create app**
3. Go to **Configuration** tab
4. Under **Admin API**, click **Configure**

![App Configuration]
_Placeholder: App configuration screen_

### 1.4 Set Permissions

Enable these scopes:

**Required Scopes:**

- ✅ `write_content` - Create and edit blog posts
- ✅ `read_content` - Read blog posts and blogs
- ✅ `write_files` - Upload images
- ✅ `read_files` - Read uploaded files

**Optional:**

- `read_themes` - Access theme data
- `write_themes` - Modify themes (if needed)

![API Scopes]
_Placeholder: API scopes selection_

### 1.5 Install App

1. Click **Save**
2. Go to **API credentials** tab
3. Click **Install app**
4. Confirm installation

---

## Step 2: Get API Credentials

### 2.1 Access Tokens

After installing the app:

1. **API credentials** tab
2. Copy the **Admin API access token**
   - Format: `shpat_xxxxx...`
   - Shown only once - store securely!

![API Token]
_Placeholder: API token display_

### 2.2 Get Shop Domain

Your Shopify shop domain:

- Format: `yourstore.myshopify.com`
- Found in store URL or settings

### 2.3 Get Blog ID (Optional)

**Method 1: From API**
Visit: `https://yourstore.myshopify.com/admin/api/2024-01/blogs.json`
(Requires authentication)

**Method 2: Let EasyWrite Fetch**
EasyWrite can auto-detect your blog(s)

---

## Step 3: Connect to EasyWrite

### 3.1 Navigate to Integrations

1. EasyWrite → **Settings** → **Integrations**
2. Find **Shopify** card
3. Click **Connect**

### 3.2 Enter Credentials

**Required:**

- **Shop Domain:** `yourstore.myshopify.com`
- **API Access Token:** Your admin API token

**Optional:**

- **Blog ID:** Specific blog (or select from list)
- **Default Author:** Author name

![Connection Form]
_Placeholder: Shopify connection modal_

### 3.3 Verify Connection

1. Click **Verify & Connect**
2. EasyWrite will:

   - Test API credentials
   - Fetch shop information
   - Load available blogs
   - Verify permissions

3. Success:
   - ✅ Status: **Connected**
   - Shop name displayed
   - Blog(s) listed

---

## Step 4: Configure Settings

### 4.1 Blog Selection

If you have multiple blogs:

- **Online Store Blog** (default)
- **News**
- Custom blogs

Select target blog for publishing.

### 4.2 Publishing Defaults

**Article Settings:**

- **Status:** Draft / Published
- **Enable Comments:** Yes / No
- **Publish Date:** Now / Custom
- **Author:** Your name or custom

**SEO Settings:**

- **Meta Title:** Auto / Custom
- **Meta Description:** Auto-generate / Custom
- **URL Handle:** Auto / Custom slug

**Content:**

- **Summary:** Auto-excerpt / Manual
- **Template Suffix:** Default / Custom template

### 4.3 Tag Management

- **Default Tags:** Comma-separated
- **Tag Sync:** Keep tags in sync
- **Auto-create Tags:** Yes / No

---

## Step 5: Publishing to Shopify

### 5.1 Prepare Article

Required:

- Title
- Content
- Featured image (recommended)

Optional:

- Custom URL handle (slug)
- Summary/excerpt
- Tags
- Publish date

### 5.2 Publish

1. Editor → **Publish** → **Shopify**
2. Configure:

**Article Details:**

- Title
- URL Handle (slug)
- Author
- Blog (if multiple)

**Content:**

- Body HTML
- Summary (excerpt)

**Media:**

- Fea

tured Image

- Alt text

**SEO:**

- Meta Title
- Meta Description

**Publishing:**

- Status (Draft/Published)
- Publish Date
- Comments enabled

3. Click **Publish to Shopify**

![Publishing Interface]
_Placeholder: Shopify publish modal_

### 5.3 Verify

- Click **View on Shopify**
- Check in Shopify Admin → Content → Blog posts
- View on storefront if published

---

## Understanding Shopify Blogs

### Article Status

**Published:**

- Live on your store
- Visible to customers
- Indexed by search engines

**Draft:**

- Saved but not visible
- Only visible in admin
- Can preview before publishing

### URL Structure

Default format:

```
yourstore.com/blogs/news/article-title
```

Custom:

```
yourstore.com/blogs/custom-blog/your-article
```

### Featured Images

- Displays at top of article
- Shown in blog listings
- Used in social shares
- Recommended: 1200x628 pixels

### Tags

- Help organize content
- Filter articles by tag
- Improve internal navigation
- SEO benefits

---

## E-commerce Blog Best Practices

### Content Strategy

- 📝 **Product-focused:** Feature your products naturally
- 📝 **How-to guides:** Use your products
- 📝 **Customer stories:** Share testimonials
- 📝 **Industry insights:** Build authority

### SEO Optimization

- 🔍 **Product keywords:** Include in titles
- 🔍 **Internal links:** Link to product pages
- 🔍 **Long-form content:** 1500+ words
- 🔍 **Rich media:** Images, videos of products

### Conversion Optimization

- 💰 **CTAs:** Link to products
- 💰 **Product mentions:** Naturally integrate
- 💰 **Related products:** Add at end
- 💰 **Discount codes:** Mention in posts

### Content Types

- How-to guides using your products
- Product comparisons
- Customer success stories
- Industry trends and insights
- Behind-the-scenes content
- Gift guides and recommendations

---

## Troubleshooting

### ❌ "Invalid Access Token"

**Solutions:**

1. Recreate custom app
2. Ensure all required scopes enabled
3. Regenerate API token
4. Check token format (`shpat_...`)

### ❌ "Cannot Publish Article"

**Issues:**

- Missing required fields (title, body)
- Invalid blog ID
- Insufficient permissions
- Content contains unsupported HTML

**Solutions:**

1. Fill all required fields
2. Select correct blog
3. Verify API scopes
4. Clean up HTML content

### ❌ "Image Not Uploading"

**Solutions:**

- Check image size (< 20MB)
- Verify `write_files` scope enabled
- Ensure valid image format (JPG, PNG, GIF, WebP)
- Check Shopify file storage limits

### ❌ "Tags Not Creating"

**Check:**

- Tag format (comma-separated)
- No special characters
- Not exceeding Shopify limits
- Auto-create enabled in settings

---

## Shopify API Limits

Be aware of rate limits:

- **REST API:** 2 requests/second (burst up to 40)
- **GraphQL:** 1000 points/second
- **Throttled:** Wait and retry with backoff

**Best Practices:**

- Spread out bulk operations
- Implement exponential backoff
- Monitor rate limit headers

---

## Managing Integration

### Update Credentials

1. **Settings** → **Integrations** → **Shopify**
2. **Update** credentials
3. Enter new access token if needed
4. Save

### Import Existing Posts

1. Click **Import from Shopify**
2. Select blog
3. Choose articles to import
4. Import to EasyWrite

### Test Connection

1. **Test Connection** button
2. Verifies current credentials
3. Checks API accessibility
4. Updates blog list

### Disconnect

1. Find Shopify integration
2. **Disconnect**
3. Confirm

**Note:** Blog posts remain on Shopify.

### Remove Custom App from Shopify

1. Shopify Admin → **Settings** → **Apps and sales channels**
2. Find **EasyWrite Integration**
3. Click **Uninstall**

---

## Advanced Features

### Multiple Blogs

If you have multiple blogs:

1. Configure default blog
2. Select blog per article
3. Route content appropriately

### Theme Integration

Link articles to:

- Product pages
- Collection pages
- Custom pages

### Liquid Tags

Use Shopify Liquid in content:

```liquid
{{ product.title }}
{{ collection.url }}
```

### Metafields

Add custom metafields via API for:

- Extended SEO data
- Custom article data
- Theme-specific fields

---

## Next Steps

Connected to Shopify? Now:

1. **Optimize e-commerce content:** [SEO Guide](./keyword-research)
2. **Use AI for product descriptions:** [AI Writing](./ai-writing)
3. **Plan content calendar:** [Platform Guide](./platform-guide)
4. **Track performance:** [Analytics](./insights-guide)

---

## Additional Resources

- [Shopify Blog Best Practices](https://www.shopify.com/blog/topics/blogging)
- [Shopify API Documentation](https://shopify.dev/docs/api/admin-rest)
- [Shopify Help Center](https://help.shopify.com/)
- [Texavor Support](mailto:hello@texavor.com)

**Questions?** Contact our support team!
