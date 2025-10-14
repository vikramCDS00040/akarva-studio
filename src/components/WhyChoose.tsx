import { Sparkles, Clock, Lightbulb, Star } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Precision & Realism",
      description:
        "Every gemstone sparkles naturally with meticulous attention to detail",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "On-time project completion without compromising quality",
    },
    {
      icon: Lightbulb,
      title: "Creative Excellence",
      description: "Designs that stand out and captivate your audience",
    },
    {
      icon: Star,
      title: "Client Satisfaction",
      description: "5-star trusted reviews from jewelers worldwide",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold pb-4">
            Why Choose Akarva
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Excellence delivered with every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-lg bg-card border border-border hover-lift"
              >
                <div className="mb-6 inline-block p-4 rounded-full bg-primary/10">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
