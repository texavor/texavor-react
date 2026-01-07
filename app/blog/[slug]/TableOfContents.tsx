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

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            currentId = heading.id;
          }
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
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
              className={`transition-colors duration-300 ${
                activeId === heading.id
                  ? "text-primary font-bold scale-105 origin-left"
                  : "text-gray-600 hover:text-gray-900"
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
    <div className="bg-gray-200 p-6 rounded-2xl mb-8 backdrop-blur-sm">
      <h2 className="font-raleway text-xl font-bold text-gray-900 mb-4">
        Table of Contents
      </h2>
      {renderHeadings(headings)}
    </div>
  );
}
