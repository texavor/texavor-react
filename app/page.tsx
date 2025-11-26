import PageTransition from "@/components/PageTransition";
import Chart from "./Chart";
import Faq from "./Faq";
import Feature from "./Feature";
import Hero from "./Hero";
import WhyDifferent from "./WhyDifferent";
import TrustBar from "./TrustBar";
import ProductPreview from "./ProductPreview";
import HowItWorks from "./HowItWorks";
import UseCases from "./UseCases";
import Testimonials from "./Testimonials";
import Integrations from "./Integrations";
import PricingCTA from "./PricingCTA";
import FinalCTA from "./FinalCTA";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full md:max-w-[1200px] mx-auto py-2 px-4">
        <Hero />
        <TrustBar />
        <Feature />
        <ProductPreview />
        <HowItWorks />
        <WhyDifferent />
        <UseCases />
        <Chart />
        <Testimonials />
        <Integrations />
        <PricingCTA />
        <Faq />
        <FinalCTA />
      </main>
    </PageTransition>
  );
}
