"use client";

import { Sparkles } from "lucide-react";

export default function NewProductPreview() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-[var(--background)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            See Texavor in{" "}
            <span className="text-primary">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            A powerful, intuitive interface designed for content creators
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-hero bg-white p-6 animate-fade-in-up">
            {/* Browser-like frame */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 border-b border-gray-200 rounded-t-xl flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 border border-gray-200">
                  app.easywrite.com/dashboard
                </div>
              </div>
            </div>

            <div className="w-full h-full bg-gradient-to-br from-[var(--green-light)] via-white to-[var(--background)] rounded-xl flex items-center justify-center border-2 border-border/30 mt-10">
              {/* Mock Dashboard Layout */}
              <div className="w-full h-full relative">
                {/* Sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-[var(--green-primary)] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">E</span>
                    </div>
                    <span className="font-bold text-gray-900">Texavor</span>
                  </div>

                  <nav className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-[var(--green-light)] rounded-lg text-[var(--green-primary)] font-medium">
                      <Sparkles className="w-4 h-4" />
                      Dashboard
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Articles
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Analytics
                    </div>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="absolute left-64 right-0 top-0 bottom-0 p-6">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
                    <p className="text-gray-600">Ready to create amazing content?</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-10 h-10 bg-[var(--green-light)] rounded-lg flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5 text-[var(--green-primary)]" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">New Article</h3>
                      <p className="text-sm text-gray-600">Generate AI-powered content</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Keyword Research</h3>
                      <p className="text-sm text-gray-600">Find trending topics</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Templates</h3>
                      <p className="text-sm text-gray-600">Choose from 50+ templates</p>
                    </div>
                  </div>

                  {/* Recent Articles */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Articles</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">10 Tips for Better SEO in 2024</p>
                          <p className="text-sm text-gray-600">Published 2 days ago • 2,450 words</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">Published</div>
                          <div className="text-xs text-gray-500">4.8/5 SEO Score</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">How AI is Changing Content Creation</p>
                          <p className="text-sm text-gray-600">Draft • 1,200 words</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-orange-600">Draft</div>
                          <div className="text-xs text-gray-500">3.9/5 SEO Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

