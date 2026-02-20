import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label above the heading — uses tx-eyebrow style */
  eyebrow?: string;
  /** The main h2 heading text */
  heading: string;
  /** Optional description paragraph below the heading */
  description?: string;
  /** Alignment of the entire block */
  align?: "left" | "center";
  /** Apply tx-gradient-text to the heading */
  gradient?: boolean;
  /** Use amber accent eyebrow instead of green */
  accentEyebrow?: boolean;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

/**
 * SectionHeading — canonical heading block for all Texavor landing page sections.
 *
 * RULE: Every section that has a heading MUST use this component.
 * Enforces: eyebrow → heading → description hierarchy.
 * Never write raw h2/p tags inside a section — use this component.
 *
 * Usage:
 *   <SectionHeading
 *     eyebrow="How It Works"
 *     heading="Write once. Rank everywhere."
 *     description="Texavor handles the research, optimization, and monitoring."
 *   />
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  gradient = false,
  accentEyebrow = false,
  className,
  headingClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3",
            accentEyebrow ? "tx-eyebrow-accent" : "tx-eyebrow",
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "font-poppins font-bold text-foreground",
          "text-3xl sm:text-4xl md:text-5xl",
          "leading-[1.1] tracking-tight",
          gradient && "tx-gradient-text",
          headingClassName,
        )}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-muted-foreground font-inter leading-relaxed",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
