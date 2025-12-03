"use client";

import { Sparkles } from "lucide-react";

export default function NewProductPreview() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-[var(--background)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            See EasyWrite in{" "}
            <span className="text-[var(--green-primary)]">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            A powerful, intuitive interface designed for content creators
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-hero bg-white p-6 animate-fade-in-up">
            <div className="w-full h-full bg-gradient-to-br from-[var(--green-light)] via-white to-[var(--background)] rounded-xl flex items-center justify-center border-2 border-border/30">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-[var(--green-primary)] rounded-3xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
                <p className="text-3xl font-bold text-foreground font-poppins mb-2">
                  Dashboard Preview
                </p>
                <p className="text-muted-foreground text-lg">
                  Replace with actual product screenshot or demo video
                </p>
              </div>
            </div>
          </div>

          {/* Feature Callouts */}
          <div
            className="absolute -left-4 top-1/4 bg-white shadow-card rounded-xl p-4 hidden xl:block animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--green-light)] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--green-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">
                  Lightning Fast
                </p>
                <p className="text-xs text-muted-foreground">
                  Generate in seconds
                </p>
              </div>
            </div>
          </div>

          <div
            className="absolute -right-4 top-1/3 bg-white shadow-card rounded-xl p-4 hidden xl:block animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--green-light)] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--green-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">
                  SEO Optimized
                </p>
                <p className="text-xs text-muted-foreground">
                  Rank higher on Google
                </p>
              </div>
            </div>
          </div>

          <div
            className="absolute -left-4 bottom-1/4 bg-white shadow-card rounded-xl p-4 hidden xl:block animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--green-light)] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--green-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">
                  Customizable
                </p>
                <p className="text-xs text-muted-foreground">
                  Tailor to your needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

