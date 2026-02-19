"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function UmamiEngagement() {
  const pathname = usePathname();
  const trackedDepths = useRef<Set<number>>(new Set());

  // Reset tracked depths on path change
  useEffect(() => {
    trackedDepths.current = new Set();
  }, [pathname]);

  // Time Tracking
  useEffect(() => {
    const times = [10000, 30000, 60000, 120000]; // 10s, 30s, 60s, 2m
    const timers: NodeJS.Timeout[] = [];

    const trackTime = (ms: number) => {
      if (window.umami) {
        window.umami.track("engagement_time", { time: `${ms / 1000}s` });
      }
    };

    times.forEach((ms) => {
      timers.push(
        setTimeout(() => {
          trackTime(ms);
        }, ms),
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [pathname]);

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!window.umami) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const depths = [25, 50, 75, 90];

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          window.umami?.track("scroll_depth", { depth: `${depth}%` });
        }
      });
    };

    // Simple throttle
    let timeout: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        handleScroll();
        timeout = null;
      }, 200);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [pathname]);

  return null;
}
