"use client";

import { cn } from "@/lib/utils";

interface TexavorLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

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
        <path
          d="M3 6L14 3L21 10L14 21L3 18V6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M14 3L8 10M14 21L8 10M3 10H21M3 6L8 10M3 18L8 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="opacity-40"
        />
        <rect x="7" y="9" width="2" height="2" fill="currentColor" />
      </svg>

      {showText && (
        <span className="font-poppins font-bold text-lg tracking-tight text-foreground transition-colors">
          Texavor
        </span>
      )}
    </div>
  );
}
