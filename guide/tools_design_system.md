# Texavor Free Tools — Design System & UX Guidelines

This document outlines the strict UI, UX, and systematic styling patterns established for all specific free SEO tools (e.g., Domain Authority Checker, AI Visibility Calculator) on the Texavor platform.

The goal is to maintain a serious, editorial, "clinical dashboard" aesthetic that builds trust through clean data presentation, rather than relying on generic SaaS gradients and heavy shadows.

## 1. Core Principles

- **Flat Bento Over Skewed SaaS**: We prioritize flat 1px-border cards over skewed layouts, rotations, or heavy drop shadows. Data should feel structured and clinical.
- **Semantic Variables Only**: Never use hardcoded hex codes for structural elements. Always use global Tailwind variables (`bg-primary`, `bg-accent`) so light/dark mode handles color switching automatically.
- **Contextual Framing**: Don't just show a raw score (e.g., "40"). Always pair metrics with contextual strings (e.g., "Average Authority: Good foundation...").

## 2. Layout & Typography

### structural Containers

- **Page Wrapper**: Use `min-h-screen bg-background font-sans mt-6 lg:mt-0`.
- **Hero Alignment**: Left-align the hero text. Do not center it.
- **Hero Content**:
  - **Eyebrow**: `<p className="tx-eyebrow mb-5">FREE SEO TOOL</p>`
  - **H1**: `<h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">`
  - **Subtitle**: `<p className="font-inter text-lg text-muted-foreground max-w-2xl leading-relaxed">`
- **Grid Sizing**: Ensure columns naturally fill their space. Use `w-full` inside `grid` parents instead of artificially constraining container widths (`max-w-3xl`) which causes stacking imbalances.

### Inputs & Buttons

- Keep inputs and submit buttons proportional. Avoid oversized SaaS fields.
- **Input Field Pattern**: `<Input className="h-11 pl-10 text-base bg-background border-input" />`
- **Submit Button Pattern**: `<Button variant="brand" size="default" className="h-11 w-40 font-semibold text-base shrink-0 rounded-md">`
- Never hardcode button colors like `bg-emerald-500`. Always rely on `variant="brand"`.

## 3. Card Styling (The "Bento" Grid)

The fundamental building blocks are flat, border-based cards.

### Default Cards

- **Base Pattern**: `<Card className="bg-card border border-border shadow-none rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40">`
- **Prohibited**: Do NOT use `shadow-lg`, `shadow-2xl`, or manual gradient overlays like `bg-gradient-to-r` or `radial-gradient`.

### Empty-State Feature Previews

- Before a user enters a domain, show them exactly what they will get in a clean 2x2 grid.
- Use the **Default Card** base pattern.
- Do **NOT** rotate or skew these cards (`-rotate-1`, `group-hover:rotate-2`) as this violates the serious, dashboard methodology.

### `MetriCard` Pattern

- For small data readouts (like total backlinks or monthly traffic), use the global `MetriCard` component.
- **Primary Highlight**: Setting `type="primary"` on a `MetriCard` triggers the **Amber Accent** highlighting (`border-accent/30 shadow-[0_0_15px_rgba(251,191,36,0.05)] text-foreground`).
- **Secondary Standard**: The default `type="secondary"` provides a subtle `border-border hover:border-primary/40 text-muted-foreground` style.
- **Icons & Accents**: Use the Amber (`accent`) tokens for interactive accents. For instance, the top-right arrow uses:
  `className="border border-transparent bg-accent/10 text-accent group-hover:border-accent"`
- **Left Alignment**: If an element contains multiple lines of wrapping text, always use `justify-start text-left items-center`, avoiding centered text blocks.

## 4. Score Logic & Colors

When grading a domain or returning a gauge result, enforce the following exact threshold logic and token assignments to generate an instant psychological impact.

| Threshold | Label     | Text Color         | Soft Background     | Soft Border             | SVG Hex Literal (Recharts Only) |
| :-------- | :-------- | :----------------- | :------------------ | :---------------------- | :------------------------------ |
| **>= 70** | Excellent | `text-primary`     | `bg-primary/10`     | `border-primary/30`     | `#10b981` (Emerald 500)         |
| **>= 40** | Average   | `text-accent`      | `bg-accent/10`      | `border-accent/30`      | `#f59e0b` (Amber 500)           |
| **< 40**  | Low/Poor  | `text-destructive` | `bg-destructive/10` | `border-destructive/30` | `#ef4444` (Red 500)             |

> **⚠️ CRITICAL: SVG Gauge Rendering (`recharts`)**
> Recharts `<RadialBar>` cannot natively parse CSS variables nested in `hsl(var(...))` through its `fill` property natively in some environments.
> To prevent pitch-black charts, you **MUST** pass exact Hex literals (e.g., `fill: "#10b981"`) directly into the charting array, while using standard semantic variables (`bg-primary/10`) for the HTML wrapper divs.

## 5. Paywall / Upsell Blocks

Instead of hard, solid-black punishment blocks (`bg-[#0A1A12]`), present upsells as a natural progression below the free data.

- **Pattern**:
  ```tsx
  <div className="relative bg-primary/5 border border-primary/20 rounded-lg overflow-hidden p-10 md:p-14 tx-dot-bg flex flex-col md:flex-row items-start md:items-center gap-8">
  ```
- **Tone**: Frame it positively. "Ready to go deeper?" instead of "Locked Data."
- **Backgrounds**: Utilize the `.tx-dot-bg` class over extremely unoffensive background values (`bg-primary/5`) for depth rather than relying on opacity blocks and complex inline SVG insertions.

## 6. Daily Limit Overload Error

When the Turnstile token is consumed and the user receives an Axios `429` (Daily Limit Reached) trigger, ensure the frontend gracefully displays the warning modal without deadlocking the form.

1. Display the `Limit Modal`.
2. Do **NOT** display Pro Upsell buttons or text inside this standard rate-limit modal, since it's a hard blockade. Simply state: _"You have used all your free domain check credits for today. Please try again tomorrow."_
3. Change the limit modal button alignment to `sm:justify-end` so the Close button stays proportional.
4. Clean up mutation hanging states using:
   ```typescript
   setTurnstileToken(""); // Reset token handler
   checkMutation.reset(); // Clear isPending to unlock the checking button
   ```
