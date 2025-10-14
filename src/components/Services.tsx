
import { Gem, Box, Ruler, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Gem,
      title: "3D Jewelry Rendering",
      description: "Photorealistic visuals for catalogs, advertisements, and e-commerce platforms",
    },
    {
      icon: Box,
      title: "3D Modelling",
      description: "Precise and detailed designs ready for manufacturing with exact specifications",
    },
    {
      icon: Ruler,
      title: "CAD Design",
      description: "Accurate CAD files for prototyping and production with technical precision",
    },
    {
      icon: Video,
      title: "360° Product Videos",
      description: "Interactive visuals to engage customers and showcase every angle",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold mb-4">
            Our Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive 3D solutions tailored for the jewelry industry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover-lift group cursor-pointer py-0"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-block p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="lucide lucide-gem w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
