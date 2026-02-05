"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  description: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [rotated, setRotated] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setRotated(true);
    setTimeout(() => setRotated(false), 1000);
  };

  const shareText = `${title} 🚀 by @surajondev\n\n`;

  const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(shareText)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
    url,
  )}`;

  return (
    <div className="flex items-center gap-4 bg-primary/5 dark:bg-zinc-900/80 text-primary backdrop-blur-lg rounded-full px-4 py-2 shadow-sm border border-transparent dark:border-white/10">
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black dark:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <div className="border-l border-gray-700 dark:border-white/20 h-5"></div>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black dark:text-white"
      >
        <Linkedin size={20} />
      </a>
      <div className="border-l border-gray-700 h-5"></div>
      <button onClick={copyToClipboard} className="text-black dark:text-white">
        <Link
          size={20}
          className={`transition-transform duration-700 ${
            rotated ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
