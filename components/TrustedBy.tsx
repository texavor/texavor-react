"use client";

import React from "react";
import { cn } from "@/lib/utils";

const BRANDS = [
  {
    name: "Zappush",
    logo: "https://www.zappush.com/favicon.ico",
  },
  {
    name: "Statewatch.in",
    logo: "https://statewatch.in/favicon.ico",
  },
  {
    name: "Surajondev",
    logo: "https://surajon.dev/favicon.ico",
  },
  {
    name: "Withorbit",
    logo: "https://withorbit.io/favicon.ico",
  },
  {
    name: "Ojasara",
    logo: "https://www.ojasara.com/favicon.ico",
  },
  {
    name: "Zbyneksvoboda",
    logo: "https://www.zbyneksvoboda.cz/favicon.ico",
  },
  {
    name: "Thecareer.io",
    logo: "https://thecareer.io/favicon.ico",
  },
  {
    name: "Okck.net",
    logo: "https://www.okck.net/favicon.ico",
  },
  {
    name: "Shop-orchestra.com",
    logo: "https://fr.shop-orchestra.com/favicon.ico",
  },
  // Doubling brands for infinite marquee effect
  {
    name: "Zappush",
    logo: "https://www.zappush.com/favicon.ico",
  },
  {
    name: "Statewatch.in",
    logo: "https://statewatch.in/favicon.ico",
  },
  {
    name: "Surajondev",
    logo: "https://surajon.dev/favicon.ico",
  },
  {
    name: "Withorbit",
    logo: "https://withorbit.io/favicon.ico",
  },
  {
    name: "Ojasara",
    logo: "https://www.ojasara.com/favicon.ico",
  },
  {
    name: "Zbyneksvoboda",
    logo: "https://www.zbyneksvoboda.cz/favicon.ico",
  },
  {
    name: "Thecareer.io",
    logo: "https://thecareer.io/favicon.ico",
  },
  {
    name: "Okck.net",
    logo: "https://www.okck.net/favicon.ico",
  },
  {
    name: "Shop-orchestra.com",
    logo: "https://fr.shop-orchestra.com/favicon.ico",
  },
];

export function TrustedBy() {
  return (
    <div className="w-full py-10 border-y border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden group">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="tx-container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <p className="z-10 bg-background/50 pr-8 text-[10px] font-poppins font-bold text-primary uppercase tracking-[0.3em] whitespace-nowrap">
            Used by teams at
          </p>

          <div className="relative flex-1 overflow-hidden pointer-events-none md:pointer-events-auto">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex items-center gap-x-16 animate-marquee whitespace-nowrap">
              {BRANDS.map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="flex-shrink-0 flex items-center gap-2 group/item opacity-50 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                >
                  <div className="h-8 w-8 rounded-md overflow-hidden bg-muted/20 flex items-center justify-center border border-border/20 p-1">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-poppins font-bold text-muted-foreground group-hover/item:text-foreground transition-colors uppercase tracking-widest">
                    {brand.name.split(".")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
