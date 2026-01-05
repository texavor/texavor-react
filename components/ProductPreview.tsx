"use client";

import { Sparkles } from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="w-full py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4 tracking-tight">
            See EasyWrite in <span className="text-primary">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            A powerful, intuitive interface designed for content creators
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white p-2 sm:p-4 border border-border animate-fade-in-up">
            {/* Browser-like frame */}
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-muted/50 border-b border-border rounded-t-xl flex items-center px-4 gap-2 z-20">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4 max-w-md">
                <div className="bg-white rounded px-3 py-0.5 text-[10px] sm:text-xs text-muted-foreground border border-border text-center shadow-sm">
                  app.easywrite.dev/dashboard
                </div>
              </div>
            </div>

            <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden border border-border/50 pt-10 relative">
              {/* Mock Dashboard Layout */}
              <div className="w-full h-full flex">
                {/* Sidebar */}
                <div className="hidden md:flex w-64 bg-white border-r border-border flex-col p-4 z-10">
                  <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">E</span>
                    </div>
                    <span className="font-bold text-sm">EasyWrite</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-8 bg-primary/10 text-primary rounded-md flex items-center px-3 text-xs font-medium gap-2">
                      <Sparkles className="w-3 h-3" /> Dashboard
                    </div>
                    <div className="h-8 hover:bg-gray-100 rounded-md flex items-center px-3 text-gray-500 text-xs gap-2 cursor-pointer">
                      <div className="w-3 h-3 border border-current rounded-sm" />{" "}
                      Articles
                    </div>
                    <div className="h-8 hover:bg-gray-100 rounded-md flex items-center px-3 text-gray-500 text-xs gap-2 cursor-pointer">
                      <div className="w-3 h-3 border border-current rounded-sm" />{" "}
                      Settings
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-hidden relative">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-8 w-24 bg-primary rounded-md shadow-sm"></div>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-white rounded-lg border border-border p-3 shadow-sm"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded mb-2"></div>
                        <div className="h-4 w-16 bg-gray-100 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="h-64 bg-white rounded-lg border border-border p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent"></div>
                    <div className="absolute bottom-0 left-4 right-4 h-24 flex items-end justify-between gap-2">
                      {[40, 60, 45, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div
                          key={i}
                          className="bg-primary/80 w-full rounded-t-sm hover:bg-primary transition-colors"
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlays / Callouts */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-2xl rounded-xl p-6 border border-white/50 text-center max-w-sm hidden md:block animate-fade-in delay-500 hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <h3 className="font-bold text-lg mb-1">AI Magic Writer</h3>
                <p className="text-sm text-muted-foreground">
                  Generating optimized content...
                </p>
                <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
