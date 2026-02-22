"use client";

import { cn } from "@/lib/utils";

interface TexavorLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Texavor Logo — "The Aperture"
 *
 * DESIGN RATIONALE:
 * - Geometric Focus: Sharp, offset blades representing refraction and editorial focus.
 * - Non-Generic: Distinctive angular geometry that avoids standard tech tropes.
 * - Precision Contrast: 2px main strokes with 1px internal detail.
 * - Theme Awareness: Pure SVG using currentColor for seamless dark/light mode transition.
 */
export function TexavorLogo({
  className,
  size = 28,
  showText = false,
}: TexavorLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary transition-colors flex-shrink-0"
      >
        {/* Main Aperture Frame - Sharp angular blades */}
        <path
          d="M12 4L19 11M5 11L12 18M12 4L5 11M19 11L12 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />

        {/* Internal Precision Lines - Core Focus */}
        <path
          d="M12 8L15 11M9 11L12 14"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-40"
        />

        {/* The Technical Anchor */}
        <rect x="11.5" y="10.5" width="1" height="1" fill="currentColor" />
      </svg>

      {showText && (
        <span className="font-poppins font-bold text-lg tracking-tight text-foreground transition-colors">
          Texavor
        </span>
      )}
    </div>
  );
}
