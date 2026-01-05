---
title: "Webflow Integration"
date: "2024-12-08"
description: "Publish blog content to your Webflow CMS"
category: "integrations"
order: 5
---

# Webflow Integration

Connect your Webflow site to publish and manage blog content through the Webflow CMS.

## Overview

✅ Publish to Webflow CMS collections  
✅ Update existing items  
✅ Manage custom fields  
✅ Set featured images  
✅ Control publish status

---

## Prerequisites

- Webflow account with CMS access
- A Webflow site with blog collection
- API access (available on CMS plan or higher)

---

## Step 1: Get Webflow API Token

### 1.1 Access Account Settings

1. Log in to [webflow.com](https://webflow.com)
2. Click **Account** (profile icon, top-right)
3. Select **Account Settings**

### 1.2 Generate API Token

1. Navigate to **Integrations** tab
2. Scroll to **API Access**
3. Click **Generate API Token**
4. Name it: `EasyWrite Integration`
5. Copy the token (shown only once!)

![Webflow API Token]
_Placeholder: API token generation_

> **⚠️ Security:** Store token securely - never share publicly

---

## Step 2: Get Site ID and Collection ID

### 2.1 Find Site ID

**Method 1: From Site Settings**

1. Open your Webflow site
2. Site Settings → **General**
3. Copy **Site ID** from URL or settings

**Method 2: From Dashboard URL**

- URL format: `https://webflow.com/dashboard/sites/[SITE_ID]`
- Copy the ID from URL

### 2.2 Find Collection ID

1. Open your Webflow site
2. Go to **CMS** tab
3. Click on your **Blog Posts** collection
4. Look at the URL: `...collections/[COLLECTION_ID]`
5. Copy the collection ID

![Webflow CMS]
_Placeholder: CMS collections view_

**Tip:** Common blog collection names:

- `Blog Posts`
- `Articles`
- `News`

---

## Step 3: Connect to EasyWrite

### 3.1 Navigate to Integrations

1. EasyWrite → **Settings** → **Integrations**
2. Find **Webflow** card
3. Click **Connect**

### 3.2 Enter Credentials

**Required Fields:**

- **API Token:** Your Webflow API token
- **Site ID:** Your Webflow site ID
- **Collection ID:** Your blog collection ID

**Optional:**

- **Default Author:** Author field value
- **Default Status:** Draft / Published

![Connection Form]
_Placeholder: Webflow connection modal_

### 3.3 Verify Connection

1. Click **Verify & Connect**
2. EasyWrite will:

   - Test API token validity
   - Fetch site information
   - Load collection schema
   - Verify permissions

3. Success indicators:
   - ✅ Connection **Active**
   - Site name displayed
   - Collection fields loaded

---

## Step 4: Field Mapping

### 4.1 Map Required Fields

Webflow CMS fields → EasyWrite content:

| Webflow Field | EasyWrite Field | Required |
| ------------- | --------------- | -------- |
| Name          | Title           | Yes      |
| Slug          | URL Slug        | Yes      |
| Post Body     | Content         | Yes      |
| Main Image    | Featured Image  | No       |
| Post Summary  | Excerpt         | No       |

### 4.2 Custom Field Mapping

Map additional fields:

- **Author:** Author name
- **Category:** Blog category
- **Tags:** Multi-reference field
- **Publish Date:** Date field
- **SEO Title:** Meta title
- **SEO Description:** Meta description

![Field Mapping]
_Placeholder: Field mapping interface_

---

## Step 5: Publishing to Webflow

### 5.1 Prepare Content

Ensure article has:

- Title and content
- Slug (auto-generated if not provided)
- Featured image (if collection requires)

### 5.2 Publish

1. Article Editor → **Publish** → **Webflow**
2. Configure:

**Basic Settings:**

- Title
- Slug
- Post Body

**Media:**

- Main Image (featured image)

**Metadata:**

- Post Summary (excerpt)
- Author
- Category/Tags

**Status:**

- Draft (staged)
- Published (live)

3. Click **Publish to Webflow**

### 5.3 Verify

- Click **View on Webflow**
- Check in Webflow CMS dashboard
- View live site if published

---

## Understanding Webflow CMS

### Collection Items

- **Staged:** Saved but not live
- **Published:** Live on website
- **Archived:** Hidden from site

### Image Fields

- Uploaded to Webflow hosting
- Automatic optimization
- Responsive image sets

### Rich Text Fields

- Supports formatting
- Embedded content
- Custom classes

### Reference Fields

- Link to other collections
- Multi-reference supported
- Example: Tags, Categories, Authors

---

## Troubleshooting

### ❌ "Invalid API Token"

**Solutions:**

1. Regenerate token in Webflow
2. Ensure copying entire token
3. Check API access on your plan
4. Verify token not revoked

### ❌ "Collection Not Found"

**Solutions:**

1. Verify collection ID is correct
2. Ensure collection exists in site
3. Check collection hasn't been deleted
4. Try getting ID again from CMS

### ❌ "Cannot Publish Item"

**Common Issues:**

- Required fields missing
- Slug already exists
- Image upload failed
- Exceeds CMS item limit

**Solutions:**

1. Fill all required fields
2. Use unique slug
3. Check image size/format
4. Verify CMS plan limits

### ❌ "Field Mapping Issues"

**Check:**

- Field names match exactly
- Field types compatible
- Required fields mapped
- Custom fields exist in collection

---

## Best Practices

### Content Structure

- 📝 Use clear field names in Webflow
- 📝 Set appropriate field requirements
- 📝 Organize with categories/tags
- 📝 Maintain consistent structure

### Performance

- 🚀 Optimize images before upload
- 🚀 Limit rich text content size
- 🚀 Use image CDN efficiently
- 🚀 Monitor CMS item count

### SEO

- 🔍 Set meta titles and descriptions
- 🔍 Use SEO-friendly slugs
- 🔍 Add alt text to images
- 🔍 Structure content with headings

---

## Webflow CMS Limits

Be aware of plan limits:

| Plan       | CMS Items | File Size | Bandwidth    |
| ---------- | --------- | --------- | ------------ |
| CMS        | 2,000     | 4 MB      | 200 GB/month |
| Business   | 10,000    | 4 MB      | 400 GB/month |
| Enterprise | Custom    | 4 MB      | Custom       |

---

## Managing Integration

### Update Settings

1. **Settings** → **Integrations** → **Webflow**
2. Update token, site, or collection ID
3. Remap fields if collection changed
4. Save changes

### Sync Existing Items

1. Click **Import from Webflow**
2. Select items to import
3. Continue editing in EasyWrite

### Disconnect

1. Find Webflow integration
2. Click **Disconnect**
3. Confirm

**Note:** CMS items remain in Webflow.

---

## Additional Resources

- [Webflow CMS API Docs](https://developers.webflow.com/)
- [Webflow University](https://university.webflow.com/)
- [Webflow Forum](https://forum.webflow.com/)
- [Texavor Support](mailto:hello@texavor.com)

**Need help?** Contact support or Webflow community!
