---
title: "Custom Webhooks"
date: "2024-12-08"
description: "Send article data to any custom endpoint using webhooks"
category: "integrations"
order: 7
---

# Custom Webhooks

Create custom webhook integrations to send your content to any HTTP endpoint when articles are published.

## Overview

Custom webhooks allow you to:

- ✅ Send data to any HTTP endpoint
- ✅ Trigger custom workflows
- ✅ Integrate with internal systems
- ✅ Build custom publishing pipelines
- ✅ Connect to unsupported platforms

---

## Use Cases

### Automation

- Trigger CI/CD pipelines
- Update static site generators
- Rebuild websites on publish
- Sync with databases
- Notify team channels (Slack, Discord)

### Custom Platforms

- Internal CMS systems
- Custom blog platforms
- Headless CMS integration
- Microservices architecture
- Custom APIs

### Workflows

- Content approval systems
- Multi-stage deployments
- Quality assurance checks
- Analytics triggers
- Backup systems

---

## Step 1: Prepare Your Endpoint

### 1.1 Endpoint Requirements

Your webhook endpoint must:

- **Accept POST requests**
- **Return 2xx status code** (200, 201, 204)
- **Respond within 10 seconds** (timeout)
- **Handle JSON payload**
- **(Optional) Verify webhook signature**

### 1.2 Example Endpoints

**Simple Node.js/Express:**

```javascript
app.post("/webhook/easywrite", (req, res) => {
  const article = req.body;

  console.log("Article received:", article.title);

  // Process article data
  // ... your custom logic ...

  res.status(200).json({ success: true });
});
```

**Python/Flask:**

```python
@app.route('/webhook/easywrite', methods=['POST'])
def handle_webhook():
    article = request.json

    print(f'Article received: {article["title"]}')

    # Process article data
    # ... your custom logic ...

    return jsonify({'success': True}), 200
```

**PHP:**

```php
$article = json_decode(file_get_contents('php://input'), true);

error_log('Article received: ' . $article['title']);

// Process article data
// ... your custom logic ...

http_response_code(200);
echo json_encode(['success' => true]);
```

---

## Step 2: Create Webhook in EasyWrite

### 2.1 Navigate to Integrations

1. EasyWrite → **Settings** → **Integrations**
2. Scroll to bottom
3. Click **Add Custom Webhook**

### 2.2 Configure Webhook

**Basic Settings:**

- **Webhook Name:** Descriptive name (e.g., "Deploy to Vercel")
- **Endpoint URL:** Your webhook URL
- **HTTP Method:** POST (default) / PUT / PATCH

**Authentication:**

Choose authentication method:

**None (Public endpoint)**

- No authentication
- Not recommended for production

**Basic Auth**

- Username
- Password

**Bearer Token**

- Authorization token
- Header: `Authorization: Bearer YOUR_TOKEN`

**API Key**

- Custom header name
- API key value
- Example: `X-API-Key: your-api-key`

**Custom Headers**

- Add any custom headers
- Multiple key-value pairs
- Example: `X-Custom-Header: value`

![Webhook Configuration]
_Placeholder: Webhook configuration form_

### 2.3 Select Events

Choose when to trigger webhook:

**Events:**

- ☑ Article Published
- ☑ Article Updated
- ☑ Article Deleted (Draft)
- ☑ Article Scheduled

**Filters:**

- Specific categories only
- Specific tags only
- Minimum word count

### 2.4 Test Webhook

1. Click **Send Test Payload**
2. EasyWrite sends sample data
3. Verify endpoint receives data
4. Check response status

**Sample Test Payload:**

```json
{
  "event": "article.published",
  "timestamp": "2024-12-08T12:00:00Z",
  "test": true,
  "article": {
    "id": "test-123",
    "title": "Test Article",
    "content": "This is a test..."
  }
}
```

---

## Step 3: Webhook Payload Structure

### 3.1 Standard Payload

```json
{
  "event": "article.published",
  "timestamp": "2024-12-08T12:00:00Z",
  "webhook_id": "webhook_abc123",
  "article": {
    "id": "article_xyz789",
    "title": "Article Title",
    "slug": "article-title",
    "content": "<p>Article content in HTML</p>",
    "markdown_content": "Article content in Markdown",
    "excerpt": "Short summary...",
    "author": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "featured_image": {
      "url": "https://...",
      "alt": "Image description",
      "width": 1200,
      "height": 630
    },
    "tags": ["javascript", "tutorial"],
    "category": "Development",
    "seo": {
      "title": "SEO Title",
      "description": "Meta description",
      "keywords": ["keyword1", "keyword2"]
    },
    "published_at": "2024-12-08T12:00:00Z",
    "updated_at": "2024-12-08T12:05:00Z",
    "word_count": 1250,
    "reading_time": 5,
    "status": "published"
  },
  "metadata": {
    "source": "easywrite",
    "version": "1.0"
  }
}
```

### 3.2 Event Types

**article.published**

- New article published
- First-time publication

**article.updated**

- Existing article updated
- Content or metadata changed

**article.deleted**

- Article deleted (draft only)
- Published articles archived instead

**article.scheduled**

- Article scheduled for future
- publish date set

---

## Security Best Practices

### 3.1 Verify Webhook Signatures

EasyWrite includes signature in headers:

**Header:**

```
X-EasyWrite-Signature: sha256=abc123...
```

**Verification (Node.js):**

```javascript
const crypto = require("crypto");

function verifySignature(payload, signature, secret) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `sha256=${hash}` === signature;
}

app.post("/webhook", (req, res) => {
  const signature = req.headers["x-easywrite-signature"];
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature, YOUR_SECRET)) {
    return res.status(401).send("Invalid signature");
  }

  // Process webhook...
});
```

### 3.2 Use HTTPS

- Always use HTTPS endpoints
- Protects data in transit
- Prevents man-in-the-middle attacks

### 3.3 Validate Payload

```javascript
function validateArticle(article) {
  if (!article.id || !article.title) {
    throw new Error("Invalid article data");
  }

  if (article.status !== "published") {
    throw new Error("Article not published");
  }

  return true;
}
```

### 3.4 Implement Rate Limiting

Protect your endpoint:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/webhook", limiter);
```

---

## Advanced Configuration

### 4.1 Custom Payload Transform

Customize payload before sending:

**Template:**

```json
{
  "title": "{{article.title}}",
  "body": "{{article.markdown_content}}",
  "author": "{{article.author.name}}",
  "tags": {{article.tags}},
  "custom_field": "custom_value"
}
```

**Variables Available:**

- `{{article.*}}` - Any article field
- `{{timestamp}}` - Current timestamp
- `{{event}}` - Event type
- `{{webhook_id}}` - Webhook ID

### 4.2 Conditional Triggers

Set conditions for webhook firing:

**Examples:**

- Only if word count > 1000
- Only if has featured image
- Only specific categories
- Only during business hours

**Configuration:**

```json
{
  "conditions": {
    "word_count": { "min": 1000 },
    "has_featured_image": true,
    "categories": ["Technology", "Tutorial"],
    "tags": { "includes": ["featured"] }
  }
}
```

### 4.3 Retry Logic

EasyWrite automatically retries failed webhooks:

**Retry Schedule:**

1. Immediate
2. After 1 minute
3. After 5 minutes
4. After 30 minutes
5. After 2 hours

**Failure Conditions:**

- HTTP status 5xx
- Connection timeout
- No response

**Success:**

- HTTP status 2xx (200, 201, 204)

---

## Monitoring & Debugging

### 5.1 Webhook Logs

View webhook activity:

1. **Settings** → **Integrations** → **Custom Webhook**
2. Click **View Logs**

**Log Information:**

- Timestamp
- Event type
- HTTP status code
- Response time
- Error messages (if any)

![Webhook Logs]
_Placeholder: Webhook logs interface_

### 5.2 Recent Deliveries

See last 100 webhook deliveries:

- Success/failure status
- Payload sent
- Response received
- Retry attempts

### 5.3 Debugging Issues

**Quick Checks:**

1. **Endpoint accessible?** Test with cURL
2. **Returns 2 xx?** Check status code
3. **Response time < 10s?** Optimize endpoint
4. **Valid JSON response?** Check format

**Tools:**

- [RequestBin](https://requestbin.com) - Test endpoints
- [Webhook.site](https://webhook.site) - Inspect payloads
- [ngrok](https://ngrok.com) - Test local endpoints

---

## Example Integrations

### Slack Notification

```javascript
app.post("/webhook/slack", async (req, res) => {
  const { article } = req.body;

  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New article published: ${article.title}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${article.title}*\n${article.excerpt}`,
          },
        },
      ],
    }),
  });

  res.json({ success: true });
});
```

### Static Site Rebuild (Vercel)

```javascript
app.post("/webhook/deploy", async (req, res) => {
  // Trigger Vercel deployment
  await fetch(VERCEL_DEPLOY_HOOK, {
    method: "POST",
  });

  res.json({ success: true, message: "Deploy triggered" });
});
```

### Database Sync

```javascript
app.post("/webhook/db-sync", async (req, res) => {
  const { article } = req.body;

  await db.articles.upsert({
    where: { id: article.id },
    update: {
      title: article.title,
      content: article.content,
      updated_at: new Date(article.updated_at),
    },
    create: {
      id: article.id,
      title: article.title,
      content: article.content,
      created_at: new Date(article.published_at),
    },
  });

  res.json({ success: true });
});
```

---

## Managing Webhooks

### Edit Webhook

1. Find webhook in integrations list
2. Click **Edit** or three-dot menu
3. Update settings
4. Save changes

### Disable Webhook

1. Toggle webhook status to **Inactive**
2. Webhook remains configured but won't fire
3. Enable anytime

### Delete Webhook

1. Click **Delete** on webhook
2. Confirm deletion
3. Cannot be undone

### Duplicate Webhook

1. Click **Duplicate**
2. Creates copy with same settings
3. Modify as needed

---

## Troubleshooting

### ❌ Webhook Not Firing

**Check:**

- Webhook is **Active**
- Event filters match article
- Conditions are met
- Article actually published

### ❌ Getting Timeouts

**Solutions:**

- Optimize endpoint response time
- Use async processing
- Return 200 immediately
- Process in background

### ❌ Receiving Duplicates

**Possible:**

- Retry after temporary failure
- Multiple webhooks configured
- Client-side duplicate request

### ❌ Signature Validation Failing

**Check:**

- Using correct secret
- Hash algorithm matches (SHA256)
- Payload not modified
- Header name correct

---

## Best Practices

### Performance

- ⚡ Return 200 immediately
- ⚡ Process asynchronously
- ⚡ Use queue systems (Redis, RabbitMQ)
- ⚡ Optimize database queries

### Reliability

- 🔄 Implement idempotency
- 🔄 Handle duplicate deliveries
- 🔄 Log all webhook activity
- 🔄 Monitor failure rates

### Security

- 🔒 Always use HTTPS
- 🔒 Verify webhook signatures
- 🔒 Validate payload data
- 🔒 Rate limit endpoint
- 🔒 Use strong authentication

---

## Additional Resources

- [Webhook Best Practices](https://webhooks.fyi)
- [Testing Tools](https://webhook.site)
- [EasyWrite API Docs](https://api.easywrite.dev/docs)
- [Support](mailto:support@easywrite.dev)

**Need help?** Contact our support team or check the documentation!
