import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight, CornerDownRight } from "lucide-react";
import LandingNav from "@/components/LandingNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 flex flex-col">
      <LandingNav />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none z-50" />

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden tx-dot-bg px-6">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-xl w-full relative z-10 animate-fade-slide-up">
          <div className="bg-card border border-border shadow-tx-lg rounded-[2rem] overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              {/* Icon / Decor */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted border border-border mb-8 relative group">
                <Search className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-card flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Text content */}
              <h1 className="text-5xl md:text-6xl font-black font-poppins text-foreground tracking-tighter mb-4">
                404
              </h1>
              <h2 className="text-xl md:text-2xl font-bold font-poppins text-foreground mb-4">
                The content has shifted.
              </h2>
              <p className="text-base text-muted-foreground font-inter leading-relaxed mb-10 max-w-[320px] mx-auto">
                The requested resource could not be found or has been moved to a
                new semantic node.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="brand"
                  size="xl"
                  className="w-full sm:w-auto min-w-[180px]"
                >
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto bg-transparent border-border hover:bg-muted"
                >
                  <Link href="/tools">
                    Free SEO Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom links - semantic list */}
            <div className="bg-muted/50 border-t border-border p-6 md:px-12 flex flex-col gap-3 items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Quick Navigation
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { name: "Documentation", href: "/docs" },
                  { name: "Blog Articles", href: "/blog" },
                  { name: "Pricing", href: "/#pricing" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3 h-3 opacity-40" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Subheader feedback */}
          <p className="mt-8 text-center text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
            &copy; 2026 Texavor Labs. Optimized for Generative Search.
          </p>
        </div>
      </main>
    </div>
  );
}
