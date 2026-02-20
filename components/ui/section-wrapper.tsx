import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /**
   * size controls vertical padding rhythm.
   * - sm  → py-14 md:py-20
   * - md  → py-20 md:py-28  (default)
   * - lg  → py-28 md:py-36
   */
  size?: "sm" | "md" | "lg";
  /**
   * background controls the section fill.
   * - default → bg-background
   * - muted   → bg-muted/50
   * - primary → bg-primary text-primary-foreground
   * - card    → bg-card
   */
  background?: "default" | "muted" | "primary" | "card";
  /** Adds the subtle dot grid texture to the bg */
  withGrid?: boolean;
  id?: string;
}

const sizeMap = {
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-36",
} as const;

const bgMap = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary text-primary-foreground",
  card: "bg-card",
} as const;

/**
 * SectionWrapper — canonical section container for Texavor landing page.
 *
 * RULE: Every landing page section MUST use this instead of ad-hoc `py-*` padding.
 * Ensures consistent vertical rhythm across the entire page.
 *
 * Usage:
 *   <SectionWrapper size="md" background="muted">
 *     <div className="tx-container"> ... </div>
 *   </SectionWrapper>
 */
export function SectionWrapper({
  children,
  className,
  size = "md",
  background = "default",
  withGrid = false,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden px-4",
        sizeMap[size],
        bgMap[background],
        withGrid && "tx-grid-bg",
        className,
      )}
    >
      {children}
    </section>
  );
}
