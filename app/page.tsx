import Chart from "./Chart";
import Faq from "./Faq";
import Feature from "./Feature";
import Hero from "./Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Feature />
      <Chart />
      <Faq />
    </main>
  );
}
