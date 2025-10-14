
import { MessageSquare, Box, Sparkles, CheckCircle } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Share Your Idea",
      description: "Sketch, design, or reference - we work with what you have",
    },
    {
      icon: Box,
      title: "3D Modelling",
      description: "Creating a detailed digital model with precision",
    },
    {
      icon: Sparkles,
      title: "Rendering",
      description: "High-quality visuals with revisions included",
    },
    {
      icon: CheckCircle,
      title: "Final Delivery",
      description: "CADs, images, videos ready for production or marketing",
    },
  ];

  return (
    <section id="process" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold mb-4">
            From Idea to Reality
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures perfection at every step
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center p-8 rounded-lg bg-card border border-border hover-lift">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="mb-6 inline-block p-4 rounded-full bg-primary/10 mt-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
