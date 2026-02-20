import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Texavor Button — Design System Variants
 *
 * RULE: Always use a named variant. Never override with ad-hoc className color classes.
 *
 * Variants:
 *   default        — Standard primary action (forest green)
 *   brand          — Strongest CTA: deep green + glow shadow (hero, section CTAs)
 *   accent         — Amber CTA: for contrast-heavy placements or emphasis
 *   outline        — Bordered, transparent background
 *   ghost-brand    — Subtle green ghost — for secondary actions on light bg
 *   secondary      — Muted fill — tertiary actions
 *   ghost          — No background — low-emphasis
 *   link           — Inline text link style
 *   destructive    — Red — destructive actions only
 */
const buttonVariants = cva(
  "inline-flex items-center font-inter justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Standard primary — uses design system primary token
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-tx-sm",

        // Brand CTA — strongest call to action, glow effect
        brand:
          "bg-primary text-primary-foreground font-semibold shadow-tx-glow-primary hover:opacity-90 hover:shadow-tx-lg active:scale-[0.98]",

        // Amber accent CTA — use for secondary emphasis / contrast against green sections
        accent:
          "bg-accent text-accent-foreground font-semibold shadow-tx-glow-accent hover:opacity-90 hover:shadow-tx-lg active:scale-[0.98]",

        // Outlined — transparent fill with border
        outline:
          "border border-border bg-background shadow-tx-sm hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        // Ghost brand — subtle green tint on hover, no border
        "ghost-brand":
          "text-primary hover:bg-primary/8 hover:text-primary dark:text-primary dark:hover:bg-primary/10",

        // Secondary — muted fill
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // Ghost — no background, minimal
        ghost:
          "hover:bg-accent/10 hover:text-foreground dark:hover:bg-accent/10",

        // Inline link
        link: "text-primary underline-offset-4 hover:underline",

        // Destructive
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-11 rounded-lg px-7 text-base has-[>svg]:px-5",
        xl: "h-13 rounded-xl px-8 text-base font-semibold has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
