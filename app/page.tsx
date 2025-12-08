import PageTransition from "@/components/PageTransition";
import LandingNav from "./LandingNav";
import NewHero from "./NewHero";
import NewTrustBar from "./NewTrustBar";
import NewFeatures from "./NewFeatures";
import NewProductPreview from "./NewProductPreview";
import NewHowItWorks from "./NewHowItWorks";
import NewTestimonials from "./NewTestimonials";
import PricingPreview from "./PricingPreview";
import NewFAQ from "./NewFAQ";
import NewFinalCTA from "./NewFinalCTA";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center w-full pt-20">
        <NewHero />
        <NewTrustBar />
        <NewFeatures />
        <NewProductPreview />
        <NewHowItWorks />
        <NewTestimonials />
        <PricingPreview />
        <NewFAQ />
        <NewFinalCTA />
      </main>
    </PageTransition>
  );
}
