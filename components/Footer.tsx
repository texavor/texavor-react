"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background pt-20 pb-12 relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
          {/* Brand Column */}
          <div className="max-w-xs space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded flex items-center justify-center">
                <Image
                  src="/texavor.png"
                  alt="Texavor"
                  fill
                  className="object-contain dark:brightness-0 dark:invert"
                />
              </div>
              <span className="text-2xl font-bold font-poppins text-foreground tracking-tight">
                Texavor
              </span>
            </Link>
            <p className="text-muted-foreground font-inter text-sm leading-relaxed">
              Stop guessing what AI engines want. Dominate Perplexity, ChatGPT,
              and Google with data-driven Semantic SEO.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 md:gap-24">
            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground font-poppins mb-6">
                Product
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-inter">
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/comparison"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Compare
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#integrations"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold text-foreground font-poppins mb-6">
                Free Tools
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-inter">
                <li>
                  <Link
                    href="/tools/ai-visibility-calculator"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    AI Visibility Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/website-auditor"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Website Auditor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/brand-authority"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Brand Authority
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/content-audit"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Content Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/faq-schema-generator"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    FAQ Schema Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/topical-authority"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Topical Authority Finder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/aeo-schema-validator"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    GEO Schema Validator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground font-poppins mb-6">
                Resources
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-inter">
                <li>
                  <Link
                    href="/docs/introduction"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Blog & Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-foreground hover:underline transition-all"
                  >
                    Help Center (FAQ)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-semibold text-foreground font-poppins mb-6">
                Socials
              </h4>
              <div className="flex items-center gap-4">
                <Link
                  href="https://x.com/texavor"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/60">
          <p className="text-[13px] text-muted-foreground font-inter">
            &copy; {currentYear} Texavor. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              href="/terms-and-conditions"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-inter"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-inter"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-inter"
            >
              Cookie Policy
            </Link>
            <Link
              href="/refund-policy"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-inter"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
