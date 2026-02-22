"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TexavorLogo } from "./TexavorLogo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", id: "home", href: "/" },
  { label: "Blog", id: "blog", href: "/blog" },
  {
    label: "Free Tools",
    id: "free-tools",
    href: "/tools",
  },
  { label: "Docs", id: "docs", href: "/docs/introduction" },
];

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 100,
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full fixed top-6 z-50 px-4 pointer-events-none">
      <nav
        className={cn(
          "w-full max-w-5xl rounded-full bg-white dark:bg-zinc-900/90 shadow-xl shadow-black/5 dark:shadow-white/5 transition-all duration-300 flex items-center justify-between py-2 sm:py-3 px-6 pointer-events-auto border border-black/5 dark:border-white/10 relative z-50",
          isScrolled &&
            "py-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <TexavorLogo size={28} showText />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors font-poppins flex items-center gap-1.5",
                  ["free-tools", "website-auditor"].includes(item.id)
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 hover:shadow-sm"
                    : "text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white",
                )}
              >
                {["free-tools", "website-auditor"].includes(item.id) && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white transition-colors font-poppins"
              >
                {item.label}
              </button>
            ),
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL || ""}/login`}
            target="_blank"
            className="hidden sm:inline-block text-sm font-medium text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white transition-colors font-poppins"
          >
            Login
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary hover:bg-primary/90 text-white dark:text-zinc-950 font-medium shadow-lg hover:shadow-xl px-4 sm:px-6 h-10 font-poppins transition-all"
          >
            <Link href={process.env.NEXT_PUBLIC_APP_URL || "/"} target="_blank">
              Get Started
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-[95%] md:hidden pointer-events-auto mt-2"
          >
            <div className="bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-white/10 overflow-hidden flex flex-col p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                        ["free-tools", "website-auditor"].includes(item.id)
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50"
                          : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {["free-tools", "website-auditor"].includes(
                          item.id,
                        ) && (
                          <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                        {item.label}
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />

              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL || ""}/login`}
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200 sm:hidden"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
