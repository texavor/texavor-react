"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const CrispChat = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Only load in browser
    if (typeof window === "undefined") return;

    // Set Website ID
    const WEBSITE_ID =
      process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || "PLACEHOLDER_ID";

    if (WEBSITE_ID === "PLACEHOLDER_ID") {
      console.warn("Crisp Chat: NEXT_PUBLIC_CRISP_WEBSITE_ID is not set.");
    }

    // Initialize Crisp
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = WEBSITE_ID;

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  // Sync theme with Crisp
  useEffect(() => {
    if (theme && (window as any).$crisp) {
      const mode = theme === "dark" ? "dark" : "light";
      (window as any).$crisp.push(["config", "color:mode", [mode]]);
    }
  }, [theme]);

  return null;
};

export default CrispChat;
