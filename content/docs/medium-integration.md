---
title: "Medium Integration"
date: "2024-12-08"
description: "Publish your articles to Medium and reach millions of readers"
category: "integrations"
order: 4
---

# Medium Integration

Connect Medium to EasyWrite and share your content with Medium's massive readership.

## Overview

The Medium integration enables:

- ✅ Publish articles to Medium
- ✅ Cross-post with canonical URLs
- ✅ Manage tags and publications
- ✅ Track views and earnings
- ✅ Import to your publication

---

## Prerequisites

- Active Medium account
- Access to Medium settings
- (Optional) Editor/Admin access to Medium publication

---

## Step 1: Get Your Medium Integration Token

### 1.1 Login to Medium

Navigate to [medium.com](https://medium.com) and sign in.

### 1.2 Access Settings

1. Click your **profile picture** (top-right)
2. Select **Settings**
3. Or visit: `https://medium.com/me/settings`

![Medium Settings]
_Placeholder: Medium settings navigation_

### 1.3 Navigate to Security & Apps

1. In the left sidebar, click **Security and apps**
2. Scroll down to **Integration tokens** section

![Security Settings]
_Placeholder: Security settings page_

### 1.4 Create Integration Token

1. Find **Integration tokens** section
2. Enter a description: `EasyWrite Integration`
3. Click **Get integration token**
4. Copy the token immediately - shown only once!

![Integration Token]
_Placeholder: Token generation interface_

> **📋 Token Format:** Looks like `2af3f4b1e9...` (long alphanumeric string)

> **⚠️ Security:** Never share your token publicly or commit to version control

---

## Step 2: Get Your Medium User ID (Optional)

### 2.1 Using the API

Visit in browser:

```
https://api.medium.com/v1/me?accessToken=YOUR_TOKEN
```

Response includes your `id`:

```json
{
  "data": {
    "id": "5303d74c64f66366f00cb9b2a94f3251bf5",
    "username": "yourhandle",
    "name": "Your Name"
  }
}
```

### 2.2 Or Let EasyWrite Fetch It

EasyWrite can automatically fetch your user ID when you connect.

---

## Step 3: Connect to EasyWrite

### 3.1 Navigate to Integrations

1. Log in to EasyWrite
2. **Settings** → **Integrations**
3. Find **Medium** card
4. Click **Connect**

### 3.2 Enter Integration Token

**Required:**

- **Integration Token:** Paste your Medium token

**Optional:**

- **User ID:** Auto-fetched or enter manually
- **Default Publication:** Select if you have one

![Connection Modal]
_Placeholder: Medium connection form_

### 3.3 Verify Connection

1. Click **Verify & Connect**
2. EasyWrite tests by:

   - Validating token
   - Fetching user profile
   - Loading publications (if any)

3. Success indicators:
   - ✅ Status: **Connected**
   - Your Medium username displayed
   - Publications listed (if applicable)

---

## Step 4: Configure Settings

### 4.1 Publishing Defaults

**Content Settings:**

- **Default Status:** Public / Unlisted / Draft
- **Default License:** All rights reserved / CC BY / CC BY-SA / etc.
- **Notify Followers:** Yes / No

**Publication Settings:**

- **Target Publication:** None / Select publication
- **Submit for Review:** Auto-submit to publication editors

**Cross-posting:**

- **Canonical URL:** Use original URL to avoid duplicate content penalties
- **Add Disclaimer:** Prefix with "Originally published at..."

### 4.2 Tag Management

- **Default Tags:** Up to 5 tags
- **Tag Mapping:** Map EasyWrite categories to Medium tags

---

## Step 5: Publishing to Medium

### 5.1 From Article Editor

1. Click **Publish** dropdown
2. Select **Medium**
3. Configure:

**Article Settings:**

- **Title:** Article title
- **Tags:** Up to 3 tags (Medium limit)
- **Status:** Draft / Public / Unlisted
- **License:** Copyright setting
- **Canonical URL:** Original URL if cross-posting

**Publication:**

- **Publish to:** Your profile / Publication
- **Submit for Review:** If publishing to publication

4. Click **Publish to Medium**

![Publishing Modal]
_Placeholder: Medium publishing interface_

### 5.2 Verify Publication

- Status shows Medium icon
- Click **View on Medium** to see story
- Check Medium dashboard for stats

---

## Understanding Medium Features

### Story Status

**Public:**

- Visible to everyone
- Appears in your profile
- Discoverable in Medium feed
- Can earn money (if in Partner Program)

**Unlisted:**

- Accessible via direct link
- Not in your profile
- Not in Medium distribution
- Good for sharing with specific audiences

**Draft:**

- Saved but not published
- Only you can see it
- Can edit and preview

### Tags

- **Maximum 3 tags** per story
- Help with discovery
- Choose popular, relevant tags
- Examples: `javascript`, `programming`, `productivity`

### Publications

- Group of writers/stories
- Apply to join publication
- Editors review submissions
- Wider reach than personal profile

### Canonical URLs

**Why Important:**

- Prevents duplicate content issues
- Maintains SEO value on original site
- Tells search engines where content originated

**When to Use:**

- Cross-posting from your blog
- Republishing older content
- Syndicating articles

---

## Troubleshooting

### ❌ "Invalid Token" Error

**Solutions:**

1. Generate new integration token
2. Ensure entire token copied (no spaces)
3. Check token wasn't revoked
4. Verify account status

### ❌ "Cannot Publish to Publication" Error

**Causes:**

- Not a member of publication
- Insufficient permissions
- Publication requires submission

**Solutions:**

1. Verify you're an approved writer
2. Use **Submit for Review** instead
3. Contact publication editor

### ❌ "Tags Not Saving"

**Remember:**

- Maximum **3 tags** per story
- Use existing popular tags when possible
- Avoid special characters

### ❌ "Story Not Appearing"

**Check:**

- Status is **Public** (not Unlisted or Draft)
- Story passed Medium's guidelines
- No content policy violations
- May take a few minutes to appear

---

## Medium Partner Program

### Earning Money

If you're in the Partner Program:

- Earn from member reading time
- Put stories behind paywall
- Track earnings in Medium dashboard

**In EasyWrite:**

- Set stories as "Member-only"
- View estimated earnings
- Track subscriber engagement

---

## Best Practices

### Content Strategy

- 📝 **Compelling headlines** (under 70 characters)
- 📝 **Strong opening** to hook readers
- 📝 **Engaging cover image**
- 📝 **Clear formatting** with headers and lists
- 📝 **Call-to-action** at the end

### Tag Selection

- 🏷️ **Use ALL 3 tags** for maximum reach
- 🏷️ **Mix popular and niche** tags
- 🏷️ **Relevant to content**
- 🏷️ Check tag followers count

### Timing

- ⏰ **Best times:** Tuesday-Thursday
- ⏰ **Best hours:** 7-9 AM EST, 7-9 PM EST
- ⏰ **Consistency:** Regular publishing schedule

### Engagement

- 💬 **Respond to comments** promptly
- 💬 **Engage with** other writers
- 💬 **Participate in** Medium community
- 💬 **Clap for** others' stories

---

## Managing Integration

### Update Token

1. **Settings** → **Integrations** → **Medium**
2. Click **Update Credentials**
3. Enter new token
4. Save changes

### Import Existing Stories

1. Use **Import** feature
2. EasyWrite fetches your Medium stories
3. Select stories to import
4. Continue editing in EasyWrite

### Disconnect

1. Find Medium integration
2. Click **Disconnect**
3. Confirm action

**Note:** Published stories remain on Medium.

### Revoke Token on Medium

1. Medium Settings → **Security and apps**
2. Find EasyWrite token
3. Click **Revoke**

---

## API Limitations

Medium API limits:

- **Rate Limit:** 1000 requests/hour per token
- **Tags:** Maximum 3 per story
- **Title Length:** Recommended under 80 characters
- **Content:** No strict limit
- **Images:** Hosted by Medium

---

## Additional Resources

- [Medium API Documentation](https://github.com/Medium/medium-api-docs)
- [Medium Partner Program](https://medium.com/earn)
- [Medium Writing Guide](https://medium.com/creators)
- [EasyWrite Support](mailto:support@easywrite.dev)

**Questions?** Contact our support team!
