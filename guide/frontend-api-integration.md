# Frontend API Integration Guide: Free Tools

This guide explains how to integrate the enhanced Free Tools API into the EasyWrite frontend.

## 1. The Analysis Flow

### Initial Analysis

When a user submits content to a free tool (e.g., SEO Analyzer):

**Endpoint**: `POST /api/v1/tools/analyze`
**Payload**:

```json
{
  "title": "My Article Title",
  "content": "Full article content goes here..."
}
```

**Response**:

```json
{
  "public_id": "550e8400-e29b-4114-a503-44181140345",
  "results": {
    "seo_score": 85,
    "readability_score": 72,
    "stats": { ... },
    "seo_details": { ... }
  }
}
```

**Frontend Action**:

1. Display the results to the user.
2. Update the browser URL to ` /tools/seo-analyzer/[public_id]` without refreshing (using Next.js `pushState`). This allows the user to copy/share the link immediately.

---

## 2. Shareable Result Pages

When a user visits a shared link (e.g., from a friend or social media):

**Endpoint**: `GET /api/v1/tools/:public_id`

**Response**:

```json
{
  "public_id": "...",
  "title": "...",
  "content": "...",
  "results": { ... },
  "email_provided": false
}
```

**Frontend Action**:

- Render the `results` data.
- Use `email_provided` to determine if the download button should show the "Email Capture Modal" or trigger the download directly.

---

## 3. Lead Generation (Email Gating)

Users must provide an email before they can download any files.

### Step 1: Capture Email

If `email_provided` is `false`, show a modal/input when the user clicks "Download".

**Endpoint**: `PATCH /api/v1/tools/:public_id`
**Payload**:

```json
{
  "email": "user@example.com"
}
```

**Response**: `{ "success": true }`

### Step 2: Trigger Download

Immediately after the `PATCH` succeeds, trigger the download.

---

## 4. Multi-format Downloads

**Endpoint**: `GET /api/v1/tools/:public_id/download?format=[pdf|json|toon|md]`

**Frontend Handling**:
Since this is a file download, do not use `fetch`/`axios`. Instead, use a direct link or a temporary hidden anchor tag:

```javascript
const handleDownload = (format) => {
  const url = `${process.env.API_URL}/api/v1/tools/${publicId}/download?format=${format}`;
  window.location.assign(url);
};
```

---

## 5. UI/UX Recommendations (Design Guide)

- **Shareable Link**: Provide a "Copy Link" button with a success toast.
- **Loading States**: Show a "Generating Report..." state for PDF downloads, as Grover (Headless Chrome) can take 1-3 seconds to render.
- **Toon Format**: If displaying the TOON format option, mention it is "Optimized for AI/LLMs" for better marketing.
- **Footer**: Ensure the frontend UI also mentions "Analysis by Texavor" to match the exported PDF branding.
