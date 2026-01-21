"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />

      <div className="container px-4 md:px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-inter mb-4">
            The Texavor Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-gray-900 tracking-tight leading-tight">
            Insights for <br className="hidden md:block" />
            <span className="text-primary relative inline-block">
              Content Creators
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-inter leading-relaxed max-w-2xl mx-auto">
            Master AI-powered content strategy, SEO optimization, and audience
            growth—whether you're a marketer, writer, or entrepreneur.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
