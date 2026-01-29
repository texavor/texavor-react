# Integration Guide: Cloudflare Turnstile (Frontend)

To protect our free tools, we use Cloudflare Turnstile. Here is how to add it to your React forms.

## 1. Install Component

We use the lightweight wrapper `@marsidev/react-turnstile` (or similar, or just raw JS).
_Recommendation:_ Use the official/popular wrapper for easier state management.

```bash
npm install @marsidev/react-turnstile
```

## 2. Implementation in Form

Add the widget to your form. It handles the loading and verification interaction.

```tsx
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export default function KeywordTool() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!turnstileToken) {
      alert("Please verify you are human");
      return;
    }

    // 2. Send API Request
    const res = await fetch("/api/v1/public/tools/analyze_keyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // PASS TOKEN IN HEADER
        "X-Turnstile-Token": turnstileToken,
      },
      body: JSON.stringify({ keyword: "example" }),
    });

    const data = await res.json();
    // ... handle response ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Tool Inputs ... */}

      {/* Turnstile Widget */}
      <div className="my-4">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={(token) => setTurnstileToken(token)}
        />
      </div>

      <button type="submit" disabled={!turnstileToken}>
        Analyze
      </button>
    </form>
  );
}
```

## 3. Environment Variables

You need the **Site Key** (public) in your frontend `.env.local`:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAA...
```

(For development/testing, you can use Cloudflare's dummy site keys: `1x00000000000000000000AA`)
