import PageTransition from "@/components/PageTransition";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import dynamic from "next/dynamic";
import Schema from "@/components/Schema";

const Integration = dynamic(() => import("@/components/Integration"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProductPreview = dynamic(() => import("@/components/ProductPreview"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.texavor.com/#website",
        url: "https://www.texavor.com",
        name: "Texavor",
        description: "AI-powered content creation and optimization platform.",
        publisher: {
          "@id": "https://www.texavor.com/#organization",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.texavor.com/#product",
        name: "Texavor",
        applicationCategory: "ContentOptimizationApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        image: "https://www.texavor.com/texavor.png",
      },
      {
        "@type": "Organization",
        "@id": "https://www.texavor.com/#organization",
        name: "Texavor",
        url: "https://www.texavor.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.texavor.com/texavor.png",
        },
        sameAs: ["https://twitter.com/texavor"],
      },
    ],
  };

  return (
    <PageTransition>
      <Schema script={schema} />
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
