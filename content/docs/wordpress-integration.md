---
title: "WordPress Integration"
date: "2024-12-08"
description: "Connect your WordPress site to EasyWrite for seamless content publishing"
category: "integrations"
order: 3
---

# WordPress Integration

Integrate your WordPress site with EasyWrite to publish and manage your blog content directly.

## Overview

The WordPress integration allows you to:

- ✅ Publish articles directly to your WordPress site
- ✅ Update existing posts
- ✅ Manage categories and tags
- ✅ Set featured images
- ✅ Control post status (draft, published, scheduled)
- ✅ Support for custom post types

---

## Prerequisites

Before you begin, ensure you have:

- A WordPress website (self-hosted or WordPress.com)
- Administrative access to your WordPress site
- WordPress REST API enabled (enabled by default in WordPress 4.7+)
- Application password or API credentials

---

## Step 1: Enable WordPress REST API

### 1.1 Check API Availability

The WordPress REST API is enabled by default in WordPress 4.7 and later. To verify:

1. Visit: `https://yoursite.com/wp-json/`
2. You should see JSON output with API information
3. If you see an error, contact your hosting provider

### 1.2 Check Permalink Settings

1. Log in to **WordPress Admin**
2. Go to **Settings** → **Permalinks**
3. Ensure permalinks are **not** set to "Plain"
4. Recommended: **Post name** structure
5. Click **Save Changes**

![Permalink Settings]
_Placeholder: Screenshot of WordPress permalink settings_

---

## Step 2: Generate Application Password

### For WordPress 5.6+

#### 2.1 Access User Profile

1. Log in to WordPress Admin
2. Go to **Users** → **Profile**
3. Or visit: `https://yoursite.com/wp-admin/profile.php`

#### 2.2 Create Application Password

1. Scroll down to the **Application Passwords** section
2. Enter a name: `EasyWrite Integration`
3. Click **Add New Application Password**

![Application Passwords Section]
_Placeholder: Screenshot of application passwords section_

#### 2.3 Copy Password

1. WordPress will generate a password
2. **Copy it immediately** - it's shown only once
3. Format: `xxxx xxxx xxxx xxxx xxxx xxxx`
4. Store it securely

![Generated Password]
_Placeholder: Screenshot showing generated password_

> **⚠️ Important:** Remove spaces when using the password in EasyWrite. Copy as: `xxxxxxxxxxxxxxxxxxxxxxxx`

### For Older WordPress Versions

If Application Passwords aren't available, you'll need to use a plugin:

**Option 1: Application Passwords Plugin**

1. Install the [Application Passwords](https://wordpress.org/plugins/application-passwords/) plugin
2. Follow the same steps as above

**Option 2: JWT Authentication**

1. Install a JWT authentication plugin
2. Configure API authentication
3. Generate JWT token

---

## Step 3: Get Your WordPress Site Information

### 3.1 Site URL

Your WordPress site URL (without trailing slash):

- Example: `https://yourblog.com`
- Example: `https://myblog.wordpress.com`

### 3.2 Username

Your WordPress admin username:

- The username you use to log in
- **Not** your display name or email

### 3.3 REST API Endpoint

Usually:

- `https://yoursite.com/wp-json/wp/v2/`

To verify, visit:

- `https://yoursite.com/wp-json/`

---

## Step 4: Connect to EasyWrite

### 4.1 Navigate to Integrations

1. Log in to EasyWrite
2. Go to **Settings** → **Integrations**
3. Find the **WordPress** card
4. Click **Connect** or **Add Integration**

### 4.2 Enter Credentials

Fill in the connection form:

**Required Fields:**

- **Site URL:** Your WordPress site URL
- **Username:** Your WordPress username
- **Application Password:** Generated password (no spaces)

**Optional Fields:**

- **REST API Endpoint:** Leave default unless custom
- **Default Author:** Author ID (default: your user ID)

![WordPress Connection Form]
_Placeholder: Screenshot of WordPress connection modal_

### 4.3 Verify Connection

1. Click **Verify & Connect**
2. EasyWrite will test by:

   - Pinging your WordPress site
   - Authenticating with credentials
   - Fetching categories and tags
   - Checking API permissions

3. Success indicators:
   - ✅ Connection status: **Active**
   - Site name and URL displayed
   - Available categories loaded

![Successful Connection]
_Placeholder: Screenshot of successful WordPress connection_

---

## Step 5: Configure Integration Settings

### 5.1 Publishing Defaults

**Post Settings:**

- **Default Status:** Published / Draft / Pending
- **Default Category:** Select from site categories
- **Default Tags:** Comma-separated list
- **Enable Comments:** Yes / No
- **Ping Status:** Open / Closed

**Content Settings:**

- **Post Format:** Standard / Aside / Gallery / Link / etc.
- **Sticky Post:** Pin to top of blog
- **Featured Image:** Auto-upload / Manual / None

**SEO Settings:**

- **Custom Slug:** Auto-generate / Custom
- **Excerpt:** Auto-generate / Manual
- **Meta Description:** From excerpt / Custom

![WordPress Settings]
_Placeholder: Screenshot of WordPress integration settings_

### 5.2 Category & Tag Mapping

Map EasyWrite categories to WordPress:

| EasyWrite Category | WordPress Category |
| ------------------ | ------------------ |
| Technology         | Tech News          |
| Tutorials          | How-To Guides      |
| Reviews            | Product Reviews    |

**Auto-create:**

- ☑ Create new categories if they don't exist
- ☑ Create new tags automatically

### 5.3 Advanced Options

**Custom Fields:**

- Add custom field mappings
- Useful for SEO plugins (Yoast, RankMath)

**Post Types:**

- Default: `post`
- Custom: `portfolio`, `case-study`, etc.

**Author Mapping:**

- Map EasyWrite authors to WordPress users
- Default author for guest posts

---

## Step 6: Publishing Your First Article

### 6.1 Prepare Article

Ensure your article has:

- ✅ Title and content
- ✅ At least one category or tag
- ✅ Featured image (optional)
- ✅ Custom excerpt (optional)

### 6.2 Publish to WordPress

**From Article Editor:**

1. Click **Publish** dropdown
2. Select **WordPress**
3. Configure post-specific settings:

**Post Details:**

- **Title:** Article title
- **Slug:** Custom URL slug
- **Status:** Draft / Published / Scheduled
- **Publish Date:** Now / Custom date

**Categorization:**

- **Categories:** Select one or more
- **Tags:** Add tags (comma-separated)

**Media:**

- **Featured Image:** Upload or select from library
- **Alt Text:** For accessibility

**SEO:**

- **Excerpt:** Custom excerpt or auto-generate
- **Focus Keyword:** Primary SEO keyword (if Yoast installed)

4. Click **Publish to WordPress**

![Publishing Modal]
_Placeholder: Screenshot of WordPress publishing interface_

### 6.3 Verify Publication

After publishing:

1. Check article status - should show WordPress icon
2. Click **View on WordPress** to see live post
3. Verify in WordPress Admin → Posts

---

## Understanding WordPress Features

### Post Status

- **Published:** Live and visible to public
- **Draft:** Saved but not published
- **Pending Review:** Awaiting approval
- **Private:** Visible only to admins/editors
- **Scheduled:** Publishes at future date/time

### Categories vs Tags

**Categories:**

- Hierarchical organization
- Posts must have at least one category
- Broad topics (e.g., "Technology", "Tutorials")

**Tags:**

- Non-hierarchical keywords
- Optional but recommended
- Specific topics (e.g., "React", "JavaScript", "API")

### Featured Images

- Recommended size: **1200x630 pixels**
- Formats: JPG, PNG, WebP
- Displays in: Post header, archives, social shares
- SEO impact: Improves social sharing

### Custom Post Types

Beyond standard posts:

- **Pages:** Static content
- **Portfolio:** Project showcases
- **Products:** WooCommerce items
- **Custom:** Defined by themes/plugins

---

## Troubleshooting

### Common Issues

#### ❌ "Connection Failed" Error

**Possible Causes:**

- Incorrect site URL
- Wrong username or password
- REST API disabled
- Firewall blocking requests

**Solutions:**

1. Verify site URL (no trailing slash)
2. Check username (not email)
3. Regenerate application password
4. Remove spaces from password
5. Test API: `https://yoursite.com/wp-json/`
6. Contact hosting provider about API access

#### ❌ "Unauthorized" Error

**Causes:**

- Invalid credentials
- Insufficient user permissions
- Password expired or revoked

**Solutions:**

1. Verify username and password
2. Ensure user has `edit_posts` capability
3. Generate new application password
4. Check user role (must be Author or higher)

#### ❌ "Cannot Publish" Error

**Possible Issues:**

1. **Missing Required Fields**

   - Title cannot be empty
   - Content must not be blank

2. **Permission Issues**

   - User lacks publish permission
   - Role: Contributor (can't publish)
   - Solution: Use Author, Editor, or Admin role

3. **Category Not Found**

   - Category doesn't exist on WordPress
   - Solution: Enable auto-create categories

4. **Slug Already Exists**
   - Another post uses the same slug
   - Solution: Use different slug or auto-generate

#### ❌ "Featured Image Not Uploading"

**Solutions:**

- Check image file size (hosting limits)
- Verify image format (JPG, PNG, WebP)
- Ensure sufficient upload permissions
- Check WordPress media library quota

#### ❌ "Formatting Issues"

**Common Problems:**

- HTML stripping
- Shortcodes not rendering
- Images not displaying

**Solutions:**

1. Check WordPress editor settings (Classic vs Gutenberg)
2. Verify content format compatibility
3. Use markdown-to-HTML converter
4. Enable shortcode processing in settings

---

## Security Best Practices

### Application Passwords

- 🔒 Use **unique passwords** for each integration
- 🔒 **Revoke unused** passwords regularly
- 🔒 **Never share** passwords publicly
- 🔒 **Monitor usage** in WordPress admin

### User Permissions

- 👤 Create **dedicated user** for API access
- 👤 Use **minimum required role** (Author or Editor)
- 👤 **Avoid Admin** role for integrations
- 👤 **Audit access** periodically

### WordPress Security

- 🛡️ Keep WordPress **updated**
- 🛡️ Use **security plugins** (Wordfence, Sucuri)
- 🛡️ Enable **two-factor authentication**
- 🛡️ Use **strong passwords**
- 🛡️ Regular **backups**

---

## WordPress.com vs Self-Hosted

### WordPress.com

**Business Plan or Higher Required:**

- REST API access available
- Application passwords supported
- Limited plugin support

**Setup:**

1. Upgrade to Business plan
2. Enable API in settings
3. Follow standard connection process

### Self-Hosted WordPress

**Full Control:**

- Complete API access
- All plugin support
- Custom configurations
- No plan limitations

**Requirements:**

- WordPress 4.7+ installed
- PHP 7.4+ recommended
- HTTPS recommended
- Permalinks enabled

---

## SEO Plugin Integration

### Yoast SEO

EasyWrite supports Yoast fields:

**Automatic:**

- Focus keyword
- Meta description
- SEO title
- Social metadata

**Setup:**

1. Install Yoast SEO plugin
2. Enable API endpoints in Yoast settings
3. Configure in EasyWrite integration

### Rank Math

Similar support for:

- Focus keywords
- Meta fields
- Schema markup
- Social previews

### All in One SEO

Compatible with:

- Meta descriptions
- Keywords
- Social settings

---

## Managing Your Integration

### Update Credentials

1. **Settings** → **Integrations** → **WordPress**
2. Click **Update** or three-dot menu
3. Enter new application password
4. Save changes

### Test Connection

1. Click **Test Connection** button
2. Verifies current credentials
3. Checks API accessibility
4. Updates category/tag cache

### Disconnect Integration

1. Find WordPress integration
2. Click **Disconnect**
3. Confirm action

> **Note:** Existing posts on WordPress remain untouched.

### Revoke in WordPress

1. WordPress Admin → **Users** → **Profile**
2. **Application Passwords** section
3. Find EasyWrite password
4. Click **Revoke**

---

## Best Practices

### Content Publishing

- 📝 **Preview before publishing**
- 📝 **Use featured images** for better engagement
- 📝 **Categorize properly** for site navigation
- 📝 **Add relevant tags** for SEO
- 📝 **Write custom excerpts** for better control

### Content Organization

- 📁 **Consistent category structure**
- 📁 **Meaningful tag names**
- 📁 **Logical post hierarchy**
- 📁 **Regular content audits**

### Performance

- ⚡ **Optimize images** before upload
- ⚡ **Use caching plugins** (WP Rocket, W3 Total Cache)
- ⚡ **CDN for media** files
- ⚡ **Regular database** optimization

### Maintenance

- 🔧 **Regular WordPress updates**
- 🔧 **Plugin compatibility** checks
- 🔧 **Backup before** major changes
- 🔧 **Monitor site** performance

---

## API Limitations

WordPress API considerations:

- **Rate Limits:** Depends on hosting
- **Upload Size:** Per hosting configuration (typically 2-64MB)
- **Concurrent Requests:** Usually 5-10 per second
- **Content Length:** No strict limit (MySQL LONGTEXT)
- **Meta Fields:** Up to 65,535 characters per field

---

## Troubleshooting by Hosting Provider

### Common Hosting Issues

**Shared Hosting:**

- May have API restrictions
- Contact support to enable
- Rate limits may apply

**Managed WordPress:**

- Usually API-friendly
- May have security rules
- Check with provider (WP Engine, Kinsta)

**Cloud Hosting:**

- Full control available
- Configure firewall rules
- Manage rate limiting

---

## Next Steps

Now that WordPress is connected:

1. **Explore other integrations:** [Webflow](./webflow-integration) | [Shopify](./shopify-integration)
2. **Optimize content:** [AI Writing Assistant](./ai-writing)
3. **Improve SEO:** [Keyword Research](./keyword-research)
4. **Track performance:** [Analytics Guide](./insights-guide)

---

## Additional Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Application Passwords Guide](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
- [WordPress.org Support](https://wordpress.org/support/)
- [Texavor Support](mailto:hello@texavor.com)

**Need help?** Contact our support team or visit the WordPress forums!
