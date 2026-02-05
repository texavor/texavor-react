"use client";

import {
  LayoutDashboardIcon,
  Paperclip,
  Binoculars,
  Microscope,
  ListTree,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarVisual() {
  const items = [
    { icon: LayoutDashboardIcon, label: "Dashboard", active: true },
    { icon: Paperclip, label: "Article" },
    { icon: Binoculars, label: "Keyword Research" },
    { icon: Microscope, label: "Topic Generation" },
    { icon: ListTree, label: "Outline Generator" },
    { icon: Target, label: "Competitor " },
  ];

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-950 p-3 flex flex-col gap-1.5 overflow-hidden select-none cursor-default">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors font-poppins",
            item.active
              ? "bg-[#E6F4EA] dark:bg-primary/20 text-[#104127] dark:text-primary"
              : "text-slate-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white",
          )}
        >
          <item.icon
            className={cn(
              "w-4 h-4 shrink-0",
              item.active
                ? "text-[#104127] dark:text-primary"
                : "text-gray-400 dark:text-zinc-600",
            )}
            strokeWidth={2}
          />
          <span className="font-poppins font-base">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
