import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { CallToAction } from "@/components/sections/CallToAction";
import { EmbeddedBid } from "@/components/sections/EmbeddedBid";
import { Faq } from "@/components/sections/Faq";
import { Goals } from "@/components/sections/Goals";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SimulatorSection } from "@/components/sections/SimulatorSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { SimulatorProvider } from "@/features/simulator";
import { initUTMTracking, trackPageView } from "@/lib/tracking";

const Index = () => {
  useEffect(() => {
    initUTMTracking();
    trackPageView();
  }, []);

  return (
    <SimulatorProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="overflow-x-clip">
        <Hero />
        <SimulatorSection />
        <About />
        <Benefits />
        <HowItWorks />
        <EmbeddedBid />
        <Goals />
        <CallToAction />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </SimulatorProvider>
  );
};

export default Index;
