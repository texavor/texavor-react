import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Integration from "@/components/Integration";
import SocialProof from "@/components/SocialProof";
import ProductPreview from "@/components/ProductPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA"; // Final CTA section
// Footer is in layout.tsx? No, layout has Footer. CTA is typically before footer.

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center w-full pt-0">
        <Hero />
        {/* <SocialProof /> */}
        <Features />
        <Integration />
        <HowItWorks />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </PageTransition>
  );
}
