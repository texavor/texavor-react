"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 100,
      });
    }
  };

  return (
    <div className="flex justify-center w-full fixed top-6 z-50 px-4 pointer-events-none">
      <nav
        className={cn(
          "w-full max-w-5xl rounded-full bg-white shadow-xl shadow-black/5 transition-all duration-300 flex items-center justify-between py-2 sm:py-3 px-6 pointer-events-auto border border-black/5",
          isScrolled &&
            "py-2 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 overflow-hidden">
            <Image
              src="/texavor.png"
              alt="EasyWrite"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-secondary-foreground font-bold text-xl font-poppins tracking-tight">
            Texavor
          </span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-8">
          {[
            // { label: "Features", id: "features" },
            // { label: "How it Works", id: "how-it-works" },
            // { label: "Reviews", id: "testimonials" },
            // { label: "Pricing", id: "pricing" },
            // { label: "FAQ", id: "faq" },
            { label: "Blog", id: "blog", href: "/blog" },
            { label: "Docs", id: "docs", href: "/docs" },
          ].map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-poppins"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-poppins"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-poppins"
          >
            Login
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg hover:shadow-xl px-6 h-10 font-poppins transition-all hover:scale-105"
          >
            <Link href="/blog/new">Get Started</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
