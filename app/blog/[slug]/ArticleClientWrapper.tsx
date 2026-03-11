"use client";

import React from "react";

interface ArticleClientWrapperProps {
  children: React.ReactNode;
}

export function ArticleClientWrapper({ children }: ArticleClientWrapperProps) {
  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest(".copy-button") as HTMLButtonElement;

    if (button) {
      const container = button.closest(".code-block-container");
      const codeElement = container?.querySelector("code");

      if (codeElement) {
        const codeToCopy = codeElement.innerText;
        navigator.clipboard.writeText(codeToCopy).then(() => {
          const originalText = button.innerText;
          button.innerText = "Copied!";
          button.classList.add("bg-primary/20", "text-primary");

          setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove("bg-primary/20", "text-primary");
          }, 2000);
        });
      }
    }
  };

  return (
    <article
      onClick={handleCopy}
      className="prose dark:prose-invert max-w-none font-inter
      prose-headings:font-poppins
      prose-p:text-foreground/90 dark:prose-p:text-muted-foreground
      prose-strong:text-foreground dark:prose-strong:text-foreground
      prose-li:text-foreground/90 dark:prose-li:text-muted-foreground
      prose-code:font-semibold break-words w-full"
    >
      {children}
    </article>
  );
}
