"use client";

import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HeroImage from "@/components/HeroImage";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChoose from "@/components/WhyChoose";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const searchParams = useSearchParams();
  const heroParam = searchParams.get("hero");

  return (
    <div className="min-h-screen">
      <Navigation />
      {heroParam === "image" ? <HeroImage /> : <Hero />}
      <Stats />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
