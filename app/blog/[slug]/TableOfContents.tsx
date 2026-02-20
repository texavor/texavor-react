"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  level: number;
  text: string;
  children?: Heading[];
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  // Flatten headings for easier scroll tracking
  const flattenHeadings = (nodes: Heading[]): Heading[] => {
    return nodes.reduce((acc: Heading[], heading) => {
      acc.push(heading);
      if (heading.children) {
        acc.push(...flattenHeadings(heading.children));
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      const allHeadings = flattenHeadings(headings);

      // Find the last heading that is above the "reading line" (approx 100px from top)
      for (const heading of allHeadings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element is above the threshold (scrolled past or just arriving), it's the candidate
          if (rect.top < 150) {
            currentId = heading.id;
          } else {
            // Since headings are in order, once we find one below the threshold, we stop.
            // But actually, we shouldn't stop if we want to be robust against layout quirks,
            // though structurally they should be in order.
            // For simplicity and correctness with the "last one wins" logic:
            // We just keep checking. The loop continues, and 'currentId' gets updated
            // only if the next one is *also* above the threshold.
            // If we hit one that is NOT above (< 150), we simply don't update currentId,
            // preserving the previous one as the "active" section.
            break;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for top navbar + progress bar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderHeadings = (headings: Heading[]) => {
    return (
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
              className={`transition-colors font-inter duration-300 ${
                activeId === heading.id
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {heading.text}
            </a>
            {heading.children && renderHeadings(heading.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-muted/40 p-6 rounded-xl mb-8 border border-border">
      <h2 className="font-poppins text-base font-bold text-foreground mb-4">
        Table of Contents
      </h2>
      {renderHeadings(headings)}
    </div>
  );
}
