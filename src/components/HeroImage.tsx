"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage1 from "@/assets/hero-jewelry-1.jpg";
import heroImage2 from "@/assets/hero-jewelry-2.jpg";
import Image from "next/image";
const HeroImage = () => {
  const images = [heroImage1, heroImage2];
  const [currentImage, setCurrentImage] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Luxury jewelry ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold pb-6 text-gradient-gold animate-fade-in">
          Crafting Dimensions in Jewellery
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto animate-fade-in">
          High-end 3D Rendering, Modelling & CAD solutions for jewelers
          worldwide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={() => scrollToSection("portfolio")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold text-lg px-8 py-6"
          >
            See Portfolio
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
          >
            Request a Quote
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("stats")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <ChevronDown size={32} className="text-primary" />
      </button>
    </section>
  );
};

export default HeroImage;
