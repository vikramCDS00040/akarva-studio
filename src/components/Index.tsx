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

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="flex flex-col items-center">
      {/* Gold Spinner */}
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      {/* Loading text */}
      <p className="mt-4 text-yellow-400 text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  </div>
);
const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <IndexContent />
      </Suspense>
    </div>
  );
};

export default Index;
