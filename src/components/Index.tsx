"use client";

import { Suspense } from "react";
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

const IndexContent = () => {
  const searchParams = useSearchParams();
  const heroParam = searchParams.get("hero");

  return (
    <>
      <Navigation />
      {heroParam === "image" ? <HeroImage /> : <Hero />}
      <Stats />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Process />
      <Contact />
      <Footer />
    </>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <IndexContent />
      </Suspense>
    </div>
  );
};

export default Index;
