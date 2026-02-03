"use client";

import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children?: React.ReactNode;
  className?: string;
  url?: string;
}

export function BrowserFrame({
  children,
  className,
  url = "app.texavor.com",
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-xl border border-white/20 bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden",
        className,
      )}
    >
      {/* Browser Chrome - Dark Theme like reference */}
      <div className="h-11 border-b border-white/5 bg-[#0e101a] flex items-center px-4 gap-4 select-none rounded-t-xl">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 transition-all" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[500px] mx-auto h-7 rounded-md bg-[#1c1e29] flex items-center justify-center text-[11px] text-[#A1A1AA] font-medium font-inter group hover:bg-[#272935] transition-colors cursor-pointer">
          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#A1A1AA]"
            >
              <path
                d="M9.5 5.5H9V3.5C9 2.11875 7.88125 1 6.5 1C5.11875 1 4 2.11875 4 3.5V5.5H3.5C2.94687 5.5 2.5 5.94687 2.5 6.5V10C2.5 10.5531 2.94687 11 3.5 11H9.5C10.0531 11 10.5 10.5531 10.5 10V6.5C10.5 5.94687 10.0531 5.5 9.5 5.5ZM6.5 8.25C6.15937 8.25 5.875 7.96562 5.875 7.625C5.875 7.28438 6.15937 7 6.5 7C6.84062 7 7.125 7.28438 7.125 7.625C7.125 7.96562 6.84062 8.25 6.5 8.25ZM7.75 5.5H5.25V3.5C5.25 2.80937 5.80937 2.25 6.5 2.25C7.19063 2.25 7.75 2.80937 7.75 3.5V5.5Z"
                fill="currentColor"
              />
            </svg>
            <span>{url}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full h-[calc(100%-2.5rem)] bg-background/50">
        {children}
      </div>
    </div>
  );
}
