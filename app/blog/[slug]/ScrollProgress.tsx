// components/blog/ScrollProgress.tsx
"use client";
import { useState, useEffect } from "react";

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollPercentage(
        docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0,
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[200] bg-muted/30">
      <div
        className="h-full bg-primary origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${scrollPercentage / 100})` }}
      />
    </div>
  );
}
