# Texavor Typography System

> **Critical for all AI agents:** Read this before touching any font class.
> Violating this guide creates visual inconsistency across the product.

---

## The 3-Font Hierarchy

Texavor uses exactly **three fonts**. No others. Never add a fourth.

| Role                      | Font       | CSS Variable        | Tailwind Class                   |
| ------------------------- | ---------- | ------------------- | -------------------------------- |
| **Headings / Display**    | Poppins    | `--font-poppins`    | `font-poppins` or `font-display` |
| **Body / UI copy**        | Inter      | `--font-inter`      | `font-inter` or `font-body`      |
| **Data / Numbers / Code** | Geist Mono | `--font-geist-mono` | `font-mono` or `font-data`       |

All three are loaded in `app/layout.tsx` via `next/font/google` and injected as CSS variables on `<body>`.

---

## Usage Rules — Non-Negotiable

### `font-poppins` — Headings only

Use for: `h1`, `h2`, `h3`, `h4`, hero text, section titles, card titles, eyebrow labels

```tsx
// ✅ Correct
<h1 className="font-poppins font-bold text-4xl">Your content title</h1>
<h2 className="font-poppins font-semibold text-2xl">Section heading</h2>

// ❌ Never
<p className="font-poppins">Some body text</p>  // body text must use inter
```

### `font-inter` — Body & UI copy

Use for: paragraphs, descriptions, labels, nav links, button text, captions, form fields, tooltips

```tsx
// ✅ Correct
<p className="font-inter text-muted-foreground">Description text here.</p>
<span className="font-inter text-xs uppercase tracking-widest">Label</span>

// ❌ Never
<h1 className="font-inter font-bold">Section Title</h1>  // headings must use poppins
```

### `font-mono` / `font-data` — Numbers, stats, metrics

Use for: stat numbers, scores (/100), live counters, code blocks, metric displays

```tsx
// ✅ Correct
<p className="font-mono font-bold text-4xl">124K+</p>       // stat numbers
<span className="font-data text-primary">87/100</span>       // scores
<code className="font-mono text-sm">GET /api/v1/stats</code> // code

// ❌ Never use font-mono for prose or labels
```

---

## Quick Reference by Element

| Element        | Font       | Weight | Example class                                                |
| -------------- | ---------- | ------ | ------------------------------------------------------------ |
| Hero H1        | Poppins    | 700    | `font-poppins font-bold text-5xl`                            |
| Section H2     | Poppins    | 700    | `font-poppins font-bold text-3xl`                            |
| Card title H3  | Poppins    | 600    | `font-poppins font-semibold text-xl`                         |
| Eyebrow label  | Inter      | 600    | `font-inter font-semibold text-xs uppercase tracking-widest` |
| Body paragraph | Inter      | 400    | `font-inter text-base text-muted-foreground`                 |
| Nav link       | Inter      | 500    | `font-inter font-medium text-sm`                             |
| Button text    | Inter      | 600    | `font-inter font-semibold`                                   |
| Stat number    | Geist Mono | 700    | `font-mono font-bold text-4xl tabular-nums`                  |
| Score display  | Geist Mono | 600    | `font-data font-semibold text-2xl`                           |
| Code snippet   | Geist Mono | 400    | `font-mono text-sm`                                          |

---

## Where These Are Loaded

**`app/layout.tsx`** — loads all three fonts and sets CSS variables:

```ts
const poppins  = Poppins({ weight: [...], variable: "--font-poppins" })
const inter    = Inter({ weight: [...], variable: "--font-inter" })
const geistMono = Geist_Mono({ weight: [...], variable: "--font-geist-mono" })

// Applied to <body>:
className={`${poppins.variable} ${inter.variable} ${geistMono.variable}`}
```

**`tailwind.config.ts`** — maps CSS vars to Tailwind font utility classes:

```ts
fontFamily: {
  poppins: ["var(--font-poppins)", "ui-sans-serif", "system-ui"],
  display: ["var(--font-poppins)", ...],     // alias
  inter:   ["var(--font-inter)", "ui-sans-serif", "system-ui"],
  body:    ["var(--font-inter)", ...],        // alias
  mono:    ["var(--font-geist-mono)", "ui-monospace", "monospace"],
  data:    ["var(--font-geist-mono)", ...],   // alias, prefer for stat numbers
}
```

---

## Common Mistakes to Avoid

| Mistake                                                | Fix                                             |
| ------------------------------------------------------ | ----------------------------------------------- |
| Using `font-poppins` on `<p>` or `<span>` descriptions | Use `font-inter`                                |
| Using `font-inter` on `<h1>` or `<h2>`                 | Use `font-poppins`                              |
| Showing big stat numbers without `font-mono`           | Add `font-mono tabular-nums`                    |
| Adding a Google Font import anywhere else              | ❌ Never — all fonts live in `layout.tsx`       |
| Using Tailwind's built-in `font-sans` or `font-serif`  | ❌ Never — use our system classes               |
| Hardcoding `font-family` in CSS                        | ❌ Never — use `tailwind.config.ts` definitions |
