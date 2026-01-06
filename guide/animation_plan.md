# Animation Implementation Plan

## Goal

Make the landing page "lively" but "subtle" using `framer-motion`.

## Strategy

1.  **Scroll Animations**: Use `motion.div` with `initial={{ opacity: 0, y: 20 }}` and `whileInView={{ opacity: 1, y: 0 }}` for sections as they enter the viewport.
2.  **Staggered Lists**: For the Features grid, stagger the entry of cards so they don't all pop in at once.
3.  **Floating Elements**: Refine the floating icons in `Integration.tsx` using `animate={{ y: [0, -10, 0] }}` with different durations/delays for natural movement.

## Component Updates

### 1. `components/ui/motion.tsx` (New Utility)

Create a reusable wrapper for consistent fade-up effects.

```tsx
"use client";
import { motion } from "framer-motion";

export const FadeInUp = ({ children, delay = 0, className }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
```

### 2. `components/Features.tsx`

- Wrap the main Feature Grid in a staggered parent.
- Wrap individual cards in motion children.

### 3. `components/Integration.tsx`

- Replace CSS `@keyframes float` with `framer-motion` for smoother control and less CSS boilerplate.

### 4. `components/HowItWorks.tsx`

- Animate the steps appearing sequentially.

## Execution Order

1.  Create `components/ui/fade-in.tsx`.
2.  Update `Features.tsx`.
3.  Update `Integration.tsx`.
4.  Update `HowItWorks.tsx`.
