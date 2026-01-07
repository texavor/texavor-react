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
    <div className="w-full h-full bg-white p-3 flex flex-col gap-1.5 overflow-hidden select-none cursor-default">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors font-poppins",
            item.active
              ? "bg-[#E6F4EA] text-[#104127]" // Light green bg, dark green text matching primary theme approximately
              : "text-black-800"
          )}
        >
          <item.icon
            className={cn(
              "w-4 h-4 shrink-0",
              item.active ? "text-[#104127]" : "text-gray-500"
            )}
            strokeWidth={2}
          />
          <span className="font-poppins font-base">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
