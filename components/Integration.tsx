"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Integration() {
  const integrations = [
    {
      name: "Medium",
      image: "/integration/medium.png",
      position: "md:top-[15%] md:left-[5%]",
      delay: 0,
    },
    {
      name: "Hashnode",
      image: "/integration/hashnode.png",
      position: "md:top-[40%] md:left-[15%]",
      delay: 1,
    },
    {
      name: "WordPress",
      image: "/integration/wordpress.png",
      position: "md:bottom-[25%] md:left-[25%]",
      delay: 2,
    },
    {
      name: "Webflow",
      image: "/integration/webflow.png",
      position: "md:bottom-[20%] md:left-[45%]",
      delay: 0.5,
    },
    {
      name: "Webhook",
      image: "/integration/webhook.png",
      position: "md:bottom-[25%] md:right-[25%]",
      delay: 1.5,
    },
    {
      name: "Dev.to",
      image: "/integration/devto.png",
      position: "md:top-[40%] md:right-[15%]",
      delay: 2.5,
    },
    {
      name: "Shopify",
      image: "/integration/shopify.png",
      position: "md:top-[15%] md:right-[5%]",
      delay: 3,
    },
    {
      name: "Substack",
      image: "/integration/substack.png",
      position: "md:top-[5%] md:left-[45%]",
      delay: 0.25,
    },
  ];

  return (
    <section
      id="integrations"
      className="w-full py-24 md:py-32 relative overflow-hidden bg-background tx-dot-bg border-y border-border"
    >
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <span className="text-xs font-inter font-semibold uppercase tracking-widest text-muted-foreground">
              Ecosystem
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 leading-tight">
            Publish Everywhere, <br className="hidden md:block" />
            Manage From One Place
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
            Seamlessly manage and schedule your articles across all major
            platforms from a single dashboard.
          </p>
        </div>

        {/* Floating Integration Icons */}
        <div className="relative min-h-[400px] md:h-[350px] flex flex-col md:block items-center justify-center">
          {/* Integration icons grid/floating */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:block gap-6 w-full md:w-auto">
            {integrations.map((integration, i) => (
              <motion.div
                key={i}
                className={`flex items-center justify-center md:absolute ${integration.position}`}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: integration.delay,
                }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-card rounded-2xl flex items-center justify-center p-0 overflow-hidden border border-border transition-all duration-300 hover:scale-110 hover:border-border/80 group">
                    <Image
                      src={integration.image}
                      alt={integration.name}
                      width={80}
                      height={80}
                      className={`w-full h-full object-cover transition-opacity ${
                        integration.name === "Medium"
                          ? "dark:invert dark:brightness-200"
                          : "dark:opacity-80 dark:hover:opacity-100"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
