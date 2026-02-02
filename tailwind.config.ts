/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ["var(--font-arcade)"],
        raleway: ["var(--font-raleway)"],
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.zinc.700"),
            maxWidth: "none",
            h1: {
              color: theme("colors.zinc.900"),
            },
            h2: {
              color: theme("colors.zinc.900"),
            },
            h3: {
              color: theme("colors.zinc.900"),
            },
            h4: {
              color: theme("colors.zinc.900"),
            },
            strong: {
              color: theme("colors.zinc.900"),
            },
            blockquote: {
              color: theme("colors.zinc.900"),
              borderLeftColor: theme("colors.zinc.200"),
            },
            a: {
              color: theme("colors.green.600"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.green.700"),
              },
            },
            code: {
              color: theme("colors.zinc.800"),
              // backgroundColor: theme("colors.zinc.100"),
              borderRadius: theme("borderRadius.md"),
              paddingLeft: theme("padding[1.5]"),
              paddingRight: theme("padding[1.5]"),
              paddingTop: theme("padding[0.5]"),
              paddingBottom: theme("padding[0.5]"),
              fontWeight: "500",
            },
            // Remove the default backticks forcefully
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            th: {
              color: theme("colors.zinc.900"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
