---
title: "Hashnode Integration"
date: "2024-12-08"
description: "Complete guide to integrate your Hashnode blog with EasyWrite"
category: "integrations"
order: 2
---

# Hashnode Integration

Connect your Hashnode blog to EasyWrite for seamless article publishing and management.

## Overview

The Hashnode integration enables you to:

- ✅ Publish articles directly to your Hashnode blog
- ✅ Update existing articles
- ✅ Manage tags and series
- ✅ Set custom slugs and cover images
- ✅ Cross-post from other platforms

---

## Prerequisites

Before starting, ensure you have:

- An active Hashnode account
- A published Hashnode blog (publication)
- Access to your Hashnode account settings

---

## Step 1: Get Your Hashnode API Token

### 1.1 Login to Hashnode

Navigate to [hashnode.com](https://hashnode.com) and sign in to your account.

### 1.2 Access Developer Settings

1. Click on your **profile picture** in the top-right corner
2. Select **Account Settings** from the dropdown
3. In the left sidebar, click on **Developer**
4. Or visit directly: `https://hashnode.com/settings/developer`

![Hashnode Settings]
_Placeholder: Screenshot of Hashnode settings navigation_

### 1.3 Generate Personal Access Token

1. Scroll to the **Personal Access Tokens** section
2. Click on **Generate New Token** button
3. Enter a token name (e.g., "EasyWrite Integration")
4. Select the required scopes:
   - ✅ `read:user` - Read user information
   - ✅ `write:article` - Create and update articles
   - ✅ `read:article` - Read articles
   - ✅ `write:publication` - Manage publications

![Generate Token Form]
_Placeholder: Screenshot of token generation form_

### 1.4 Copy Your Token

1. Click **Generate Token**
2. Your token will be displayed **only once**
3. Click the **Copy** icon or select and copy the entire token
4. Store it securely - you won't see it again!

> **⚠️ Security Warning:** Treat your API token like a password. Never share it or commit it to public repositories.

![Token Display]
_Placeholder: Screenshot showing generated token_

---

## Step 2: Get Your Publication ID

### 2.1 Navigate to Your Blog Dashboard

1. From your Hashnode homepage, click on your blog
2. Go to **Blog Dashboard**
3. Or visit: `https://hashnode.com/[your-username]/dashboard`

### 2.2 Find Publication ID

**Method 1: From Dashboard URL**

1. Look at your dashboard URL
2. The publication ID is in the URL: `https://hashnode.com/[publication-id]/dashboard`
3. Copy the ID (it's a long hexadecimal string)

**Method 2: From Settings**

1. Go to **Blog Dashboard** → **Settings**
2. Scroll to **Advanced** section
3. Find **Publication ID**
4. Click **Copy ID**

![Publication ID Location]
_Placeholder: Screenshot showing where to find publication ID_

> **💡 Note:** Your publication ID looks like: `507f1f77bcf86cd799439011`

---

## Step 3: Connect to EasyWrite

### 3.1 Navigate to Integrations

1. Log in to EasyWrite
2. Go to **Settings** → **Integrations**
3. Find the **Hashnode** integration card

### 3.2 Enter Credentials

1. Click **Connect** on the Hashnode card
2. A configuration modal will appear
3. Fill in the required fields:

**Required Fields:**

- **Personal Access Token:** Paste your Hashnode API token
- **Publication ID:** Enter your publication ID
- **Publication URL:** Your blog URL (e.g., `yourblog.hashnode.dev`)

**Optional Fields:**

- **Default Author:** Your Hashnode username
- **Default Tags:** Comma-separated default tags

![Connection Modal]
_Placeholder: Screenshot of Hashnode connection form_

### 3.3 Verify Connection

1. Click **Verify & Connect**
2. EasyWrite will test the connection by:

   - Validating your API token
   - Checking publication access
   - Fetching publication details

3. On success, you'll see:
   - ✅ Connection status: **Active**
   - Your publication name and URL
   - Last sync timestamp

![Successful Connection]
_Placeholder: Screenshot of successful connection_

---

## Step 4: Configure Integration Settings

### 4.1 Publication Defaults

Set default publishing options:

**Visibility:**

- **Published:** Article goes live immediately
- **Draft:** Save as draft for review

**Content Options:**

- **Enable Table of Contents:** Auto-generate TOC
- **Disable Comments:** Yes / No
- **Hide from Hashnode Feed:** Yes / No

**SEO Settings:**

- **Custom Slug:** Auto-generate / Custom
- **Meta Description:** Auto / Custom
- **Canonical URL:** Self / Custom

![Publishing Defaults]
_Placeholder: Screenshot of default settings_

### 4.2 Advanced Configuration

**Series Management:**

- Create or link to existing series
- Auto-assign series based on categories

**Tag Mapping:**

- Map EasyWrite categories to Hashnode tags
- Set default tags for all articles
- Maximum 5 tags per article

**Image Handling:**

- **Cover Images:** Upload / Use URL
- **In-content Images:** Auto-upload / Keep URLs
- **Image Optimization:** Enable / Disable

---

## Step 5: Publishing Your First Article

### 5.1 Prepare Your Article

Ensure your article has:

- ✅ A compelling title
- ✅ Complete content (Markdown supported)
- ✅ At least one tag
- ✅ Optional: Cover image
- ✅ Optional: Custom slug

### 5.2 Publish to Hashnode

**From Article Editor:**

1. Click the **Publish** dropdown
2. Select **Hashnode**
3. Configure article settings:

**Article Settings:**

- **Title:** Article title (editable)
- **Slug:** Custom URL slug (optional)
- **Subtitle:** Short description
- **Tags:** Select up to 5 tags
- **Cover Image:** Upload or paste URL
- **Series:** Assign to series (optional)

**Publishing Options:**

- **Visibility:** Published / Draft
- **Publish Date:** Now / Schedule
- **Disable Comments:** Checkbox
- **Table of Contents:** Checkbox

4. Click **Publish to Hashnode**

![Publishing Interface]
_Placeholder: Screenshot of Hashnode publish modal_

### 5.3 Verify Publication

After publishing:

1. Status updates to **Published** with Hashnode icon
2. Click **View on Hashnode** to see live article
3. Check your Hashnode dashboard for the new post

---

## Understanding Hashnode Features

### Tags

- Maximum **5 tags** per article
- Tags help with discoverability
- Use existing popular tags when possible
- Create new tags sparingly
- Browse tags at: `https://hashnode.com/tags`

**Popular Tags:**

- `javascript`, `react`, `webdev`, `programming`
- `tutorial`, `beginners`, `productivity`, `aws`

### Series

- Group related articles together
- Create a series in Hashnode or EasyWrite
- Articles in a series are auto-linked
- Useful for multi-part tutorials

**Creating a Series:**

1. Go to your Hashnode dashboard
2. Click **Series** in sidebar
3. Create new series with name and description
4. Reference series when publishing from EasyWrite

### Custom Slugs

- Customize article URLs
- Format: `yourblog.hashnode.dev/your-custom-slug`
- Use hyphens, lowercase letters, numbers
- Auto-generated if not specified

**Best Practices:**

- Keep slugs short and descriptive
- Include primary keyword
- Use hyphens to separate words
- Avoid special characters

### Cover Images

- Recommended size: **1600x840 pixels**
- Formats: JPG, PNG, WebP
- Upload directly or use image URL
- Displays on article and in feeds

---

## Troubleshooting

### Common Issues

#### ❌ "Invalid Token" Error

**Causes:**

- Token is incorrect or expired
- Token was revoked
- Missing required scopes

**Solutions:**

1. Generate a new token from Hashnode settings
2. Ensure all required scopes are selected
3. Update token in EasyWrite
4. Verify no extra spaces when copying

#### ❌ "Publication Not Found"

**Causes:**

- Incorrect publication ID
- Account doesn't have access to publication
- Publication was deleted

**Solutions:**

1. Verify publication ID from dashboard URL
2. Ensure you're the owner or admin of the publication
3. Check if publication still exists

#### ❌ "Failed to Publish Article"

**Possible Causes & Solutions:**

1. **Content Too Long**

   - Hashnode has content size limits
   - Try reducing image sizes
   - Split into multiple articles

2. **Invalid Markdown**

   - Check for syntax errors
   - Test content in Hashnode editor
   - Remove unsupported HTML tags

3. **Duplicate Slug**

   - Slug already exists on your blog
   - Use a different custom slug
   - Let Hashnode auto-generate

4. **Rate Limiting**
   - Too many requests in short time
   - Wait 1-2 minutes before retrying

#### ❌ "Tags Not Saving"

**Solutions:**

- Maximum 5 tags allowed
- Use existing tags when possible
- Check tag spelling
- Avoid special characters in tags

### API Errors

| Error Code | Meaning      | Solution                  |
| ---------- | ------------ | ------------------------- |
| 401        | Unauthorized | Check API token           |
| 403        | Forbidden    | Verify publication access |
| 404        | Not Found    | Check publication ID      |
| 429        | Rate Limited | Wait before retrying      |
| 500        | Server Error | Contact Hashnode support  |

---

## Managing Your Integration

### Update Settings

1. Go to **Settings** → **Integrations**
2. Find Hashnode integration
3. Click **Configure** or three-dot menu
4. Update token, publication ID, or defaults
5. Save changes

### Re-sync Articles

1. Click **Sync Now** in integration settings
2. Choose sync direction:
   - **From Hashnode:** Import articles to EasyWrite
   - **To Hashnode:** Push EasyWrite articles
   - **Two-way:** Keep both platforms in sync

### Disconnect Integration

1. Settings → Integrations → Hashnode
2. Click **Disconnect**
3. Confirm action

> **Note:** Existing articles on Hashnode remain unaffected.

### Revoke Token on Hashnode

1. Hashnode Settings → Developer
2. Find your EasyWrite token
3. Click **Revoke**
4. Generate new token if reconnecting

---

## Best Practices

### Content Strategy

- 📝 **Write engaging titles** (60-80 characters)
- 📝 **Use compelling cover images** to boost clicks
- 📝 **Add table of contents** for long articles
- 📝 **Tag appropriately** for better reach
- 📝 **Engage with comments** to build community

### SEO Optimization

- 🔍 **Custom slugs** with target keywords
- 🔍 **Meta descriptions** (140-160 characters)
- 🔍 **Canonical URLs** for cross-posting
- 🔍 **Internal linking** between articles
- 🔍 **Alt text** for images

### Publication Schedule

- ⏰ **Consistency** is key - publish regularly
- ⏰ **Best times:** Tuesday-Thursday, 8-11 AM EST
- ⏰ **Use scheduling** to maintain consistency
- ⏰ **Monitor analytics** to find your optimal times

### Community Building

- 💬 **Respond to comments** promptly
- 💬 **Cross-promote** on social media
- 💬 **Participate in** Hashnode community
- 💬 **Join writing challenges** and events

---

## API Limitations

Hashnode API limits to be aware of:

- **Rate Limit:** 750 requests per hour per token
- **Article Length:** No strict limit (recommended < 100KB)
- **Tags:** Maximum 5 per article
- **Series:** Unlimited articles per series
- **Images:** Hosted by Hashnode CDN

---

## Next Steps

After connecting Hashnode:

1. **Try more integrations:** [Dev.to Integration](./devto-integration)
2. **Learn about scheduling:** [Content Scheduling](./content-scheduling)
3. **Optimize writing:** [AI Writing Assistant](./ai-writing)
4. **Master SEO:** [Keyword Research](./keyword-research)

---

## Additional Resources

- [Hashnode API Documentation](https://apidocs.hashnode.com/)
- [Hashnode Writing Guide](https://hashnode.com/writing-guide)
- [Hashnode Community](https://hashnode.com/community)
- [Hashnode GraphQL API](https://gql.hashnode.com/)
- [Texavor Support](mailto:hello@texavor.com)

**Questions?** Contact our support team or visit our community forum!
