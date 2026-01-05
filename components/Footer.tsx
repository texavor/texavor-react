"use client";

import Link from "next/link";
import Image from "next/image";
// import { Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 pt-20 pb-12 relative overflow-hidden">
      {/* Large Watermark Text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[15vw] font-bold text-gray-200/40 font-poppins tracking-tighter leading-none">
          Texavor
        </h1>
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-0 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-24">
          {/* Brand Column */}
          <div className="max-w-xs space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/texavor.png"
                  alt="EasyWrite"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-poppins text-gray-900">
                Texavor
              </span>
            </Link>
            <p className="text-gray-500 font-inter text-sm leading-relaxed">
              Texavor helps teams work smarter, stay aligned, and get things
              done with AI-powered content creation.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 md:gap-24">
            {/* Features */}
            <div>
              <h4 className="font-semibold text-gray-900 font-poppins mb-6">
                Features
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 font-inter">
                <li>
                  <Link
                    href="#integrations"
                    className="hover:text-primary transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="hover:text-primary transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="font-semibold text-gray-900 font-poppins mb-6">
                About Us
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 font-inter">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    Recourse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 font-poppins mb-6">
                Faq
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 font-inter">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-semibold text-gray-900 font-poppins mb-6">
                Follow Our Socials:
              </h4>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-transparent">
          <p className="text-xs text-gray-500 font-inter">
            &copy; {currentYear} Texavor Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms-and-conditions"
              className="text-xs text-gray-500 hover:text-primary transition-colors font-inter"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 hover:text-primary transition-colors font-inter"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-gray-500 hover:text-primary transition-colors font-inter"
            >
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
