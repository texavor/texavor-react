"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        top: element.offsetTop - 80,
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Animated Logo with EasyWrite branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-[62px] h-[36px] overflow-hidden absolute">
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute opacity-0 group-hover:opacity-100 top-0 left-1/2 -translate-x-1/2 rotate-180 transition-transform duration-300 ease-in-out -translate-y-10 group-hover:translate-y-0"
              />
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute opacity-0 group-hover:opacity-100 top-[13px] left-[10px] transition-transform duration-300 delay-100 ease-in-out translate-y-10 group-hover:translate-y-0"
              />
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute opacity-0 group-hover:opacity-100 top-[13px] left-[29px] transition-transform duration-300 ease-in-out translate-y-10 group-hover:translate-y-0"
              />
            </div>
            <div className="relative w-[62px] h-[36px] overflow-hidden group-hover:opacity-0">
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute top-0 left-1/2 -translate-x-1/2 rotate-180"
              />
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute top-[13px] left-[10px]"
              />
              <Image
                src="/singlelogo.png"
                alt="EasyWrite"
                height={24}
                width={24}
                className="absolute top-[13px] left-[29px]"
              />
            </div>
            <p className="text-[#104127] font-bold text-[24px]">
              EasyWrite<span className="text-normal text-black">.dev</span>
            </p>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              Features
            </button>
            <Link
              href="/blog"
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/docs"
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              Docs
            </Link>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-[var(--green-primary)] transition-colors font-medium"
            >
              FAQ
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="hidden sm:inline-flex hover:text-[#104127] transition-colors"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-[#104127] hover:bg-[#0F3D2E] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 px-6"
            >
              <Link href="/blog/new">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
