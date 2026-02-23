"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Features", id: "features", href: "/#features" },
  { label: "Tools", id: "free-tools", href: "/tools" },
  { label: "Blog", id: "blog", href: "/blog" },
  { label: "Docs", id: "docs", href: "/docs" },
];

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fullWidth = false; // Reverted to standard width behavior

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-background border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto px-6 h-16 flex items-center justify-between",
          fullWidth ? "w-full max-w-none" : "max-w-7xl",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-7 h-7 overflow-hidden">
            <Image
              src="/texavor.png"
              alt="Texavor"
              fill
              className="object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <span className="font-bold text-lg font-poppins tracking-tight text-foreground">
            Texavor
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "text-sm font-medium font-inter transition-colors",
                item.id === "free-tools"
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {item.id === "free-tools" && (
                <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent align-super">
                  Free
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL || ""}/login`}
            target="_blank"
            className="hidden sm:inline-block text-sm font-medium font-inter text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>

          <Button
            asChild
            variant="brand"
            size="sm"
            className="rounded-md px-4 h-9 hidden sm:inline-flex"
          >
            <Link href={process.env.NEXT_PUBLIC_APP_URL || "/"} target="_blank">
              Start Free →
            </Link>
          </Button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-md text-sm font-medium font-inter transition-colors",
                    item.id === "free-tools"
                      ? "text-primary hover:bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {item.label}
                  {item.id === "free-tools" && (
                    <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                      Free
                    </span>
                  )}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL || ""}/login`}
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium font-inter text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                Login
              </Link>

              <Button
                asChild
                variant="brand"
                size="sm"
                className="rounded-md mt-1"
              >
                <Link
                  href={process.env.NEXT_PUBLIC_APP_URL || "/"}
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Free →
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
