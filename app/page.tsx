import PageTransition from "@/components/PageTransition";
import Chart from "./Chart";
import Faq from "./Faq";
import Feature from "./Feature";
import Hero from "./Hero";
import WhyDifferent from "./WhyDifferent";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full md:max-w-[1200px] mx-auto py-2 px-4">
        <Hero />
        <Feature />
        <WhyDifferent />
        <Chart />
        <Faq />
      </main>
    </PageTransition>
  );
}
