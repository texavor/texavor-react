"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function Integration() {
  const integrations = [
    {
      name: "Medium",
      image: "/integration/medium.png",
      position: "top-[15%] left-[5%]",
      delay: 0,
    },
    {
      name: "Hashnode",
      image: "/integration/hashnode.png",
      position: "top-[40%] left-[15%]",
      delay: 1,
    },
    {
      name: "WordPress",
      image: "/integration/wordpress.png",
      position: "bottom-[25%] left-[25%]",
      delay: 2,
    },
    {
      name: "Webflow",
      image: "/integration/webflow.png",
      position: "bottom-[20%] left-[45%]",
      delay: 0.5,
    },
    {
      name: "Webhook",
      image: "/integration/webhook.png",
      position: "bottom-[25%] right-[25%]",
      delay: 1.5,
    },
    {
      name: "Dev.to",
      image: "/integration/devto.png",
      position: "top-[40%] right-[15%]",
      delay: 2.5,
    },
    {
      name: "Shopify",
      image: "/integration/shopify.png",
      position: "top-[15%] right-[5%]",
      delay: 3,
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-primary/20 rounded-full text-xs font-medium text-primary mb-6 shadow-sm">
            <Zap className="w-3 h-3 fill-primary" />
            Integrations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6 tracking-tight">
            Publish Everywhere, <br />
            Manage From One Place
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            Seamlessly manage and schedule your articles across all major
            platforms from a single dashboard.
          </p>
        </div>

        {/* Floating Integration Icons */}
        <div className="relative h-[350px] flex items-center justify-center">
          {/* Central glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
          </div>

          {/* Integration icons */}
          {integrations.map((integration, i) => (
            <motion.div
              key={i}
              className={`absolute ${integration.position}`}
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
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-[0_10px_50px_rgba(16,65,39,0.25)] hover:shadow-[0_15px_60px_rgba(16,65,39,0.35)] transition-all duration-300 hover:scale-110 flex items-center justify-center p-0 overflow-hidden">
                  <Image
                    src={integration.image}
                    alt={integration.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
